import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import type { ThreeAppParams, ThreeApp, ThreeAppState } from './models'
import { getPixelRatio } from './utils'


/** Create a `renderer` with defaults */
function createThreeRenderer(initialWidth: number, initialHeight: number) {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(initialWidth, initialHeight)
  renderer.setPixelRatio(getPixelRatio())

  // TODO: color management

  return renderer
}

/** Create a `ThreeJs` app object */
export function createThreeApp(params: ThreeAppParams): ThreeApp {
  const { container, onInit, onRender } = params

  const scene = new Scene()

  // CAMERA
  const camera = new PerspectiveCamera(75, container.clientWidth / container.clientHeight)
  camera.position.z = 5

  // RENDERER
  const renderer = createThreeRenderer(container.clientWidth, container.clientHeight)
  container.append(renderer.domElement)

  /** Internal state */
  const state: ThreeAppState = {
    scene,
    camera,
    renderer
  }

  if (onInit)
    onInit(state)

  /** Render */
  function render(time: number) {
    if (onRender)
      onRender({ time, state })

    renderer.render(scene, camera)
  }

  return {
    ...state,
    render,
    start: () => renderer.setAnimationLoop(render),
    stop: () => renderer.setAnimationLoop(null),
  }
}


