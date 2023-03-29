import { Scene, PerspectiveCamera, WebGLRenderer, Vector3 } from 'three'
import type { ThreeAppParams, ThreeApp, ThreeAppState } from './models'
import { onResize, getOnResizeCallbacks } from './hooks'
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

  onResize(({ entry }) => {
    camera.aspect = entry.contentRect.width / entry.contentRect.height
    camera.updateProjectionMatrix()
  })

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

  onResize(({ entry }) => {
    renderer.setSize(entry.contentRect.width, entry.contentRect.height)
  })

  // TODO: `ColorEncoding` & `ToneMapping`
  // renderer.outputEncoding = THREE.sRGBEncoding
  // renderer.toneMapping = THREE.ACESFilmicToneMapping
  // TODO: `shadows`
  // renderer.shadowMap.enabled = props?.shadow || true
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap

  return renderer
}

/** Create a `ThreeJs` app object */
export async function createThreeApp(params: ThreeAppParams): Promise<ThreeApp> {
  const { container, onInit, onRender } = params

  const scene = new Scene()

  // CAMERA
  const camera = createThreeCamera(container.clientWidth, container.clientHeight)

  // RENDERER
  const renderer = createThreeRenderer(container.clientWidth, container.clientHeight)
  container.append(renderer.domElement)

  /** Internal state */
  const state: ThreeAppState = {
    scene,
    camera,
    renderer
  }

  /** Render fn */
  function render(time: number) {
    if (onRender) onRender({ time, state })

    renderer.render(scene, camera)
  }


  /** */
  await (async function () {
    // ColorManagement


    // RESIZE
    const resizeObserver = new ResizeObserver(([entry]) =>
      getOnResizeCallbacks().forEach(resizeCb => resizeCb({ entry, ...state }))
    )
    resizeObserver.observe(container) // TODO: disconnect


    if (onInit) await onInit(state)
    console.log('Three app initiated', state)
  })()

  return {
    ...state,
    render,
    start: () => renderer.setAnimationLoop(render),
    stop: () => renderer.setAnimationLoop(null),
  }
}


