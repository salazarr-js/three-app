import type {
  Intersection,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer
} from 'three'

/** Three object base type */
export type ThreeAppObj = Record<string, any> | Object3D

/** */
export interface ThreeAppSize { width: number, height: number }

/** */
export type ThreeAppFullscreenCallback = (ctx: { state: ThreeAppState, event: Event }) => void

/** */
export type ThreeAppRenderCallback = (ctx: { state: ThreeAppState, time: number }) => void

/** */
export type ThreeAppResizeCallback = (ctx: { state: ThreeAppState, entry: ResizeObserverEntry }) => void

/** Supported mouse events handled by the raycaster. */
export type ThreeAppMouseEvent = 'click'
/** Supported pointer events handled by the raycaster. */
export type ThreeAppPointerEvent = 'pointermove' | 'pointerenter' | 'pointerleave'
/** All Supported events */
export type ThreeAppEvent = ThreeAppMouseEvent | ThreeAppPointerEvent

/** Unique ID for raycaster related event handlers using `@<eventType>:<objectUUID>` format. */
export type ThreeAppEventHandlerId = `@${ThreeAppEvent}:${string}`

/**
 * Parameters for raycaster event handlers.
 * - `event`: `PointerEvent` or `MouseEvent` based on the event type.
 * - `intersection`: Raycaster intersection details.
 * - `object`: The three.js object associated with the event.
 */
export interface ThreeAppEventHandlerParams<EventType extends ThreeAppEvent = ThreeAppMouseEvent> {
  event: EventType extends ThreeAppPointerEvent ? PointerEvent : MouseEvent
  intersection: Intersection
  object: Object3D
}

/** Raycaster related event handler. */
export type ThreeAppEventHandler<EventType extends ThreeAppEvent = ThreeAppMouseEvent> = (params: ThreeAppEventHandlerParams<EventType>) => void

/** Initial width, height */
export type ThreeAppCameraParams = ThreeAppSize & {
  props?: ThreeAppProps<PerspectiveCamera | OrthographicCamera>
  orthographic?: boolean
}

/** Initial width, height */
export type ThreeAppRendererParams = ThreeAppSize & { props?: ThreeAppProps<WebGLRenderer> }

/** */
export interface ThreeAppState {
  /** Root `scene` object */
  scene: Scene
  /** Default `camera` object */
  camera: PerspectiveCamera | OrthographicCamera
  /** Render `engine` object */
  renderer: WebGLRenderer
  /** */
  isFullscreen: boolean
  /** */
  isOrthographic: boolean
  /** */
  container: HTMLElement
  /** */
  stopPropagation: boolean
  /** */
  raycaster: Raycaster
  /** */
  pointer: Vector2
  /** */
  intersections: Intersection[]

  /** Returns container client sizes or windows inner sizes if is in fullscreen mode, as `{ width, height }` obj */
  getContainerSize: () => ThreeAppSize
  /** Toggle fullscreen */
  toggleFullscreen: () => void
}

/** */
export interface ThreeAppParams {
  /** Container element where `canvas` will be added */
  container: HTMLElement
  /** Initialize callback hook */
  onInit?: (state: Readonly<ThreeAppState>) => Promise<void> | void
  /** Render loop callback hook */
  onRender?: ThreeAppRenderCallback

  /** */
  orthographic?: boolean
  /** */
  camera?: ThreeAppProps<PerspectiveCamera | OrthographicCamera>
  /** */
  scene?: ThreeAppProps<Scene>
  /** */
  renderer?: ThreeAppProps<WebGLRenderer>

  /** */
  stopPropagation?: boolean

  // TODO: shadows
}

/** */
export interface ThreeApp extends ThreeAppState {
  /** Render a frame */
  render: (time: number) => void
  /** Start render loop using [`.setAnimationLoop`](https://threejs.org/docs/index.html?q=WebGLRenderer#api/en/renderers/WebGLRenderer.setAnimationLoop) */
  start: () => void
  /** Stop render loop */
  stop: () => void
}

/** Union of all Three `Vector` types */
type VectorLike = Vector2 | Vector3 | Vector4

/** `Vector2` object representation */
interface Vector2AsObjectProp { x?: number, y?: number }
/** `Vector3` object representation */
type Vector3AsObjectProp = Vector2AsObjectProp & { z?: number }
/** `Vector4` object representation */
type Vector4AsObjectProp = Vector3AsObjectProp & { w?: number }

/** `Vector2` as a settable prop */
type Vector2Prop = Vector2 | [number, number] | Vector2AsObjectProp
/** `Vector3` as a settable prop */
type Vector3Prop = Vector3 | [number, number, number] | Vector3AsObjectProp
/** `Vector4` as a settable prop */
type Vector4Prop = Vector4 | [number, number, number, number] | Vector4AsObjectProp

/** Maps `VectorLike` types to their corresponding flexible props */
type ThreeVectorProp<T extends VectorLike> = T extends Vector2 ? Vector2Prop : T extends Vector3 ? Vector3Prop : Vector4Prop

/**
 * Type mapping for `applyProps` fn compatibility
 *
 * ✅ Mapped `Vector{2, 3, 4}` type props
 *
 * TODO: `Euler`, `Quaternion`, `Matrix3`, `Matrix4`
 */
export type ThreeAppProps<T extends ThreeAppObj> = {
  [P in keyof T]?: T[P] extends VectorLike
    ? ThreeVectorProp<T[P]> // TODO: or number
    : T[P] // TODO: Other type maps
}
