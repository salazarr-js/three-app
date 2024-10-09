import * as THREE from 'three'
import {
  Camera, OrthographicCamera, PerspectiveCamera,
  Scene, Vector3, WebGLRenderer
  // sRGBEncoding
} from 'three'

import type { ThreeApp, ThreeAppParams, ThreeAppSizes, ThreeAppState, ThreeProps } from './models'
import {
  getOnFullscreenModeChangeCallbacks, getOnRenderCallbacks,
  getOnResizeCallbacks, onFullscreenModeChange, onResize,
} from './hooks'
import { applyProps, getPixelRatio, isPlainObject } from './utils'

/** Create a `camera` with defaults and props */
function createThreeCamera(
  cameraProps: ThreeProps<PerspectiveCamera | OrthographicCamera>,
  extraProps: { initialSizes: ThreeAppSizes; orthographic?: boolean },
) {
  const { /**orthographic,*/ initialSizes: { width, height } } = extraProps

  // const aspect = width / height
  // const frustum = 6.71 // TODO: add to API?

  const camera = new PerspectiveCamera()
  // const camera = !orthographic
  //   ? new PerspectiveCamera()
  //   : new OrthographicCamera(
  //     frustum * aspect / -2,
  //     frustum * aspect / 2,
  //     frustum / 2,
  //     frustum / -2,
  //   )

  // if (camera.type === 'PerspectiveCamera') {
    camera.fov = 75
    camera.aspect = width / height
  // }

  camera.position.z = 5
  camera.lookAt(new Vector3())

  applyProps(camera, cameraProps)

  function update({ width, height }: ThreeAppSizes) {
    const aspect = width / height

    // if (camera.type === 'PerspectiveCamera') {
      camera.aspect = aspect
    // }
    // else {
    //   camera.left = frustum * aspect / -2
    //   camera.right = frustum * aspect / 2
    //   camera.top = frustum / 2
    //   camera.bottom = frustum / -2
    // }

    camera.updateProjectionMatrix()
    // https://github.com/pmndrs/react-three-fiber/issues/178
    // Update matrix world since the renderer is a frame late
    camera.updateMatrixWorld()
  }

  onResize(({ getContainerSizes }) => update(getContainerSizes()))
  onFullscreenModeChange(({ getContainerSizes }) => update(getContainerSizes()))

  return camera
}

/** Create a `renderer` with defaults and props */
function createThreeRenderer(
  rendererProps: ThreeProps<WebGLRenderer>,
  extraProps: { initialSizes: ThreeAppSizes },
) {
  const { width, height } = extraProps.initialSizes

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

  applyProps(renderer, rendererProps)

  function update({ width, height }: ThreeAppSizes) {
    renderer.setSize(width, height)
  }

  onResize(({ getContainerSizes }) => update(getContainerSizes()))
  onFullscreenModeChange(({ getContainerSizes }) => update(getContainerSizes()))

  return renderer
}

/** Create a `ThreeJs` app object */
export async function createThreeApp(params: ThreeAppParams): Promise<ThreeApp> {
  const { container, onInit, onRender, scene, camera, orthographic, renderer } = params

  const initialSizes = { width: container.clientWidth, height: container.clientHeight }

  /** Three app API State */
  const state: ThreeAppState = {
    scene: scene instanceof Scene ? scene : applyProps(new Scene(), { ...scene }),
    camera: camera instanceof Camera
      ? camera
      : createThreeCamera({ ...camera }, {
        orthographic, initialSizes,
      }),
    renderer: (renderer && !isPlainObject(renderer))
      ? renderer as WebGLRenderer
      : createThreeRenderer({ ...renderer }, { initialSizes }),

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
    THREE.ColorManagement.enabled = true

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
