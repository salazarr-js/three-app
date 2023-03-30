import { Scene, PerspectiveCamera, WebGLRenderer, Vector3 } from 'three'
import type { ThreeAppParams, ThreeApp, ThreeAppState, ThreeAppSizes } from './models'
import {
  onResize, onFullscreenModeChange,
  getOnResizeCallbacks, getOnFullscreenModeChangeCallbacks, getOnRenderCallbacks,
} from './hooks'
import { getPixelRatio } from './utils'


/** Create a `camera` with defaults and props */
function createThreeCamera(initialWidth: number, initialHeight: number) {
  const camera = new PerspectiveCamera() // TODO: `OrthographicCamera`

  camera.fov = 75
  camera.aspect = initialWidth / initialHeight
  camera.near = 0.1
  camera.far = 2000
  camera.position.z = 5
  camera.lookAt(new Vector3())

  function update({ width, height }: ThreeAppSizes) {
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  onResize(({ getContainerSizes }) => update( getContainerSizes() ))
  onFullscreenModeChange(({ getContainerSizes }) => update( getContainerSizes() ))

  return camera
}

/** Create a `renderer` with defaults and props */
function createThreeRenderer(initialWidth: number, initialHeight: number) {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(initialWidth, initialHeight)
  renderer.setPixelRatio(getPixelRatio())

    // TODO: `ColorEncoding` & `ToneMapping`
    // renderer.toneMapping = ACESFilmicToneMapping
    // renderer.outputEncoding = sRGBEncoding
    // renderer.toneMappingExposure = 1
    // TODO: `shadows`
    // renderer.shadowMap.enabled = props?.shadow || true
    // renderer.shadowMap.type = PCFShadowMap
    // renderer.shadowMap.type = PCFSoftShadowMap
    // renderer.physicallyCorrectLights = true

  function update({ width, height }: ThreeAppSizes) {
    renderer.setSize(width, height)
  }

  onResize(({ getContainerSizes }) => update( getContainerSizes() ))
  onFullscreenModeChange(({ getContainerSizes }) => update( getContainerSizes() ))

  return renderer
}

/** Create a `ThreeJs` app object */
export async function createThreeApp(params: ThreeAppParams): Promise<ThreeApp> {
  const { container, onInit, onRender } = params

  const scene = new Scene()
  const camera = createThreeCamera(container.clientWidth, container.clientHeight)
  const renderer = createThreeRenderer(container.clientWidth, container.clientHeight)
  container.append(renderer.domElement)

  /** Three app API State */
  const state: ThreeAppState = {
    scene,
    camera,
    renderer,

    isFullscreenMode: false,
    getContainerSizes() {
      if (state.isFullscreenMode)
        return { width: window.innerWidth, height: window.innerHeight }
      return { width: container.clientWidth, height: container.clientHeight }
    }
  }

  /** Render fn */
  function render(time: number) {
    if (onRender) onRender({ time, ...state })

    // Run all `onRenderCallbacks` functions
    getOnRenderCallbacks().forEach(renderCb => renderCb({ time, ...state }))

    renderer.render(scene, camera)
  }

  /** Update `fullScreen` state and run all `` callbacks */
  function updateFullscreenMode() {
    state.isFullscreenMode = !!document.fullscreenElement
    getOnFullscreenModeChangeCallbacks()
      .forEach(fsModeCb => fsModeCb({ ...state }))
  }

  /** */
  function toggleFullscreenMode() {
    if (document.fullscreenElement !== null)
      document.exitFullscreen()
    else
      renderer.domElement.requestFullscreen()
  }

  /** */
  await (async function () {
    // ColorManagement

    // RESIZE
    const resizeObserver = new ResizeObserver(([entry]) => {
      getOnResizeCallbacks()
        .forEach(resizeCb => resizeCb({ entry, ...state }))
    })
    resizeObserver.observe(container) // TODO: disconnect

    // FULLSCREEN
    container.addEventListener('fullscreenchange', _ => updateFullscreenMode())

    if (onInit) await onInit(state)
  })()

  return {
    ...state,
    render,
    toggleFullscreenMode,
    start: () => renderer.setAnimationLoop(render),
    stop: () => renderer.setAnimationLoop(null),
  }
}


