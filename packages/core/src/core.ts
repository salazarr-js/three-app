import type { ThreeApp, ThreeAppCameraParams, ThreeAppParams, ThreeAppRendererParams, ThreeAppSize, ThreeAppState } from './types'
import { OrthographicCamera, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { getFullscreenCallbacks, getRenderCallbacks, getResizeCallbacks, updateThreeAppState, useFullscreen, useResize } from './hooks'
import { applyProps, getPixelRatio } from './utils'

/** */
function createThreeAppCamera(cameraParams: ThreeAppCameraParams) {
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

  useResize(({ state: { getContainerSize } }) => updateCamera(getContainerSize()))
  useFullscreen(({ state: { getContainerSize } }) => updateCamera(getContainerSize()))

  return camera
}

/** */
function createThreeAppRenderer(rendererParams: ThreeAppRendererParams) {
  const { width, height, props } = rendererParams

  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(getPixelRatio())

  /* `ColorEncoding` & `ToneMapping` */
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

  useResize(({ state: { getContainerSize } }) => updateRenderer(getContainerSize()))
  useFullscreen(({ state: { getContainerSize } }) => updateRenderer(getContainerSize()))

  return renderer
}

/** Create a `ThreeJs` app object */
export async function createThreeApp(params: ThreeAppParams): Promise<ThreeApp> {
  /** */
  const { container, onInit, onRender, scene, camera, renderer, orthographic } = params
  /** */
  const { clientWidth: width, clientHeight: height } = container

  /** Get camera from props */
  function getCamera() {
    if (!!camera && (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera))
      return camera
    return createThreeAppCamera({ width, height, orthographic, props: camera })
  }

  /** Three app API State */
  const state: ThreeAppState = {
    container,
    scene: scene instanceof Scene ? scene : applyProps(new Scene(), { ...scene }),
    camera: getCamera(),
    renderer: renderer instanceof WebGLRenderer ? renderer : createThreeAppRenderer({ width, height, props: renderer }),
    isOrthographic: orthographic ?? false,
    isFullscreen: false,

    getContainerSize() {
      if (state.isFullscreen)
        return { width: window.innerWidth, height: window.innerHeight }
      return { width: container.clientWidth, height: container.clientHeight }
    },
    toggleFullscreen() {
      if (document.fullscreenElement !== null)
        document.exitFullscreen()
      else state.renderer.domElement.requestFullscreen()
    },
  }

  /** */
  const resizeObserver = new ResizeObserver(([entry]) => {
    getResizeCallbacks()
      .forEach(resizeCb => resizeCb({ state, entry }))
  })

  /**
   * Render function
   * TODO: delta/elapsed tme
   */
  function render(time: number) {
    if (onRender)
      onRender({ state, time })

    // Run all `renderCallbacks` functions
    getRenderCallbacks().forEach(renderCb => renderCb({ state, time }))

    state.renderer.render(state.scene, state.camera)
  }

  /** Update `fullScreen` state and run all stored callbacks */
  function onFullscreenChange(event: Event) {
    state.isFullscreen = !!document.fullscreenElement
    getFullscreenCallbacks()
      .forEach(fullscreenCb => fullscreenCb({ state, event }))
  }

  /** */
  function start() {
    resizeObserver.observe(container)
    container.addEventListener('fullscreenchange', onFullscreenChange)

    state.renderer.setAnimationLoop(render)
  }

  /** */
  function stop() {
    resizeObserver.disconnect()
    container.removeEventListener('fullscreenchange', onFullscreenChange)

    state.renderer.setAnimationLoop(null)
  }

  /** */
  await (async function () {
    updateThreeAppState(state)
    container.append(state.renderer.domElement)

    // ColorManagement
    // THREE.ColorManagement.enabled = true

    if (onInit)
      await onInit(state)
  })()

  return {
    ...state,
    render,
    start,
    stop,
  }
}
