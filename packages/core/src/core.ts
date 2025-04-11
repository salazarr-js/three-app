import {
  ACESFilmicToneMapping,
  Clock,
  OrthographicCamera,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import type {
  ThreeApp,
  ThreeAppCameraParams,
  ThreeAppParams,
  ThreeAppRendererParams,
  ThreeAppSize,
  ThreeAppState,
} from './types'
import {
  executeThreeAppEventHandler,
  getFullscreenCallbacks,
  getIntersectedObjects,
  getObjectsToIntersect,
  getRenderCallbacks,
  getResizeCallbacks,
  updateThreeAppState,
  useFullscreen,
  useResize,
} from './hooks'
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
  // `ColorEncoding` & `ToneMapping`
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.outputColorSpace = SRGBColorSpace
  // `shadows`
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap

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
  const { container, onInit, onRender, scene, camera, renderer, orthographic, stopPropagation } = params

  // TODO: check container
  // if (container) throw new Error('`container` is required')

    /** */
  const { clientWidth: initialWidth, clientHeight: initialHeight } = container

  /** Get camera from props */
  function getCamera() {
    if (!!camera && (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera))
      return camera

    return createThreeAppCamera({
      width: initialWidth,
      height: initialHeight,
      orthographic,
      props: camera,
    })
  }

  /** Three app API State */
  const state: ThreeAppState = {
    container,
    clock: new Clock(),
    scene: scene instanceof Scene ? scene : applyProps(new Scene(), { ...scene }),
    camera: getCamera(),
    renderer: renderer instanceof WebGLRenderer ? renderer : createThreeAppRenderer({ width: initialWidth, height: initialHeight, props: renderer }),
    isOrthographic: orthographic ?? false,
    isFullscreen: false,
    stopPropagation: stopPropagation ?? true,
    raycaster: new Raycaster(),
    pointer: new Vector2(),
    intersections: [],

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
   * TODO: delta/elapsed time
   */
  function render(time: number) {
    const { renderer, scene, camera } = state

    if (onRender)
      onRender({ state, time })

    // Run all `renderCallbacks` functions
    getRenderCallbacks().forEach(renderCb => renderCb({ state, time }))

    renderer.render(scene, camera)
  }

  /** Update `fullScreen` state and run all stored callbacks */
  function onFullscreenChange(event: Event) {
    state.isFullscreen = !!document.fullscreenElement
    getFullscreenCallbacks()
      .forEach(fullscreenCb => fullscreenCb({ state, event }))
  }

  /** */
  function onPointerMove(event: PointerEvent) {
    event.preventDefault()
    const { raycaster, pointer, camera, isFullscreen } = state

    // Update `pointer` position with normalized coordinates, (-1 to +1) for both components
    if (isFullscreen) {
      pointer.x = (event.clientX / container.clientWidth) * 2 - 1
      pointer.y = -(event.clientY / container.clientHeight) * 2 + 1
    } else {
      const rect = container.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }

    // Update raycaster interceptions
    raycaster.setFromCamera(pointer, camera)
    const intersections = raycaster.intersectObjects(getObjectsToIntersect())
    state.intersections = intersections

    const intersectionByIds = new Map(intersections.map(hit => [hit.object.uuid, hit]))
    const intersectedObjs = getIntersectedObjects()

    /** */
    for (const [uuid, { intersection, object }] of intersectedObjs) {
      if (!intersectionByIds.has(uuid)) {
        executeThreeAppEventHandler('pointerleave', { event, intersection, object })

        intersectedObjs.delete(uuid)
      }
    }

    /** */
    intersections.forEach((intersection) => {
      const object = intersection.object

      if (!intersectedObjs.has(object.uuid)) {
        intersectedObjs.set(object.uuid, { intersection, object })

        executeThreeAppEventHandler('pointerenter', { event, intersection, object })
      }

      executeThreeAppEventHandler('pointermove', { event, intersection, object })
    })
  }

  /** */
  function onClick(event: MouseEvent) {
    const { intersections, stopPropagation } = state
    if (!intersections.length) return

    if (stopPropagation) {
      executeThreeAppEventHandler('click', { event, intersection: intersections[0], object: intersections[0].object })
    } else {
      let stopPropagationFlag = false
      event.stopPropagation = () => (stopPropagationFlag = true)

      for (const intersection of intersections) {
        if (stopPropagationFlag) return
        executeThreeAppEventHandler('click', { event, intersection, object: intersection.object })
      }
    }
  }

  /** */
  function start() {
    resizeObserver.observe(container)
    container.addEventListener('fullscreenchange', onFullscreenChange)

    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('click', onClick)

    state.renderer.setAnimationLoop(render)
    state.clock.start()
  }

  /** */
  function stop() {
    resizeObserver.disconnect()
    container.removeEventListener('fullscreenchange', onFullscreenChange)

    container.removeEventListener('pointermove', onPointerMove)
    container.removeEventListener('click', onClick)

    state.renderer.setAnimationLoop(null)
    state.clock.stop()
  }

  /** */
  await (async function () {
    updateThreeAppState(state)
    container.append(state.renderer.domElement)

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
