import type { ThreeApp, ThreeAppParams, ThreeAppSize, ThreeAppState, ThreeCameraParams, ThreeRendererParams } from './types'
import { OrthographicCamera, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { getOnFullscreenModeChangeCallbacks, getOnRenderCallbacks, getOnResizeCallbacks, onFullscreenModeChange, onResize } from './hooks'
import { applyProps, getPixelRatio } from './utils'

/** */
export function createThreeCamera(cameraParams: ThreeCameraParams) {
  const { width, height, props, orthographic } = cameraParams

  const aspect = width / height
  const frustum = 6.71 // TODO: add to API?

  const camera = !orthographic
    ? new PerspectiveCamera(75, aspect, 0.1, 1000)
    : new OrthographicCamera(
      frustum * aspect / -2,
      frustum * aspect / 2,
      frustum / 2,
      frustum / -2,
    )

  camera.position.z = 5
  camera.lookAt(new Vector3())

  if (props)
    applyProps(camera, props)

  /** */
  function updateCamera({ width, height }: ThreeAppSize) {
    const updatedAspect = width / height

    if (camera.type === 'PerspectiveCamera' && camera instanceof PerspectiveCamera) {
      camera.aspect = updatedAspect
    }
    if (camera.type === 'OrthographicCamera' && camera instanceof OrthographicCamera) {
      camera.left = frustum * updatedAspect / -2
      camera.right = frustum * updatedAspect / 2
      camera.top = frustum / 2
      camera.bottom = frustum / -2
    }

    camera.updateProjectionMatrix()
    camera.updateMatrixWorld()
  }

  onResize(({ getContainerSizes }) => updateCamera(getContainerSizes()))
  onFullscreenModeChange(({ getContainerSizes }) => updateCamera(getContainerSizes()))

  return camera
}

/** */
export function createThreeRenderer(rendererParams: ThreeRendererParams) {
  const { width, height, props } = rendererParams

  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(getPixelRatio())

  // `ColorEncoding` & `ToneMapping`
  // renderer.toneMapping = ACESFilmicToneMapping
  // renderer.outputEncoding = sRGBEncoding
  // `shadows`
  // renderer.shadowMap.enabled = true
  // renderer.shadowMap.type = PCFShadowMap
  // renderer.shadowMap.type = PCFSoftShadowMap
  // renderer.physicallyCorrectLights = true

  if (props)
    applyProps(renderer, props)

  /** */
  function updateRenderer({ width, height }: ThreeAppSize) {
    renderer.setSize(width, height)
  }

  onResize(({ getContainerSizes }) => updateRenderer(getContainerSizes()))
  onFullscreenModeChange(({ getContainerSizes }) => updateRenderer(getContainerSizes()))

  return renderer
}

/** Create a `ThreeJs` app object */
export async function createThreeApp(params: ThreeAppParams): Promise<ThreeApp> {
  const { container, onInit, onRender, scene, camera, renderer, orthographic } = params

  //
  const { clientWidth: width, clientHeight: height } = container

  /** get camera from props */
  function getCamera() {
    if (!!camera && (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera))
      return camera
    return createThreeCamera({ width, height, orthographic, props: camera })
  }

  /** Three app API State */
  const state: ThreeAppState = {
    scene: scene instanceof Scene ? scene : applyProps(new Scene(), { ...scene }),
    camera: getCamera(),
    renderer: renderer instanceof WebGLRenderer ? renderer : createThreeRenderer({ width, height, props: renderer }),
    isOrthographic: orthographic ?? false,
    isFullscreenMode: false,

    getContainerSizes() {
      if (state.isFullscreenMode)
        return { width: window.innerWidth, height: window.innerHeight }
      return { width: container.clientWidth, height: container.clientHeight }
    },
    toggleFullscreenMode() {
      if (document.fullscreenElement !== null)
        document.exitFullscreen()
      else state.renderer.domElement.requestFullscreen()
    },
  }

  //
  container.append(state.renderer.domElement)

  /** Render fn */
  function render(time: number) {
    if (onRender)
      onRender({ time, ...state })

    // Run all `onRenderCallbacks` functions
    getOnRenderCallbacks().forEach(renderCb => renderCb({ time, ...state }))

    state.renderer.render(state.scene, state.camera)
  }

  /** Update `fullScreen` state and run all `` callbacks */
  function updateFullscreenMode() {
    state.isFullscreenMode = !!document.fullscreenElement
    getOnFullscreenModeChangeCallbacks()
      .forEach(fsModeCb => fsModeCb({ ...state }))
  }

  /** */
  await (async function () {
    // ColorManagement
    // THREE.ColorManagement.enabled = true

    // RESIZE
    const resizeObserver = new ResizeObserver(([entry]) => {
      getOnResizeCallbacks()
        .forEach(resizeCb => resizeCb({ entry, ...state }))
    })
    resizeObserver.observe(container) // TODO: disconnect

    // FULLSCREEN
    container.addEventListener('fullscreenchange', _ => updateFullscreenMode())

    if (onInit)
      await onInit(state)
  })()

  return {
    ...state,
    render,
    start: () => state.renderer.setAnimationLoop(render),
    stop: () => state.renderer.setAnimationLoop(null),
  }
}
