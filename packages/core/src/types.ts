import type { Object3D, OrthographicCamera, PerspectiveCamera, Scene, Vector2, Vector3, Vector4, WebGLRenderer } from 'three'

/** Three object base type */
export type ThreeAppObj = Record<string, any> | Object3D

/** */
export interface ThreeAppSize { width: number, height: number }

/** */
export type ThreeAppHookCallback<T = object> = (ctx: Readonly<ThreeAppState & T>) => void

/** */
export type ThreeAppResizeCallback = ThreeAppHookCallback<{ readonly entry: ResizeObserverEntry }>

/** */
export type ThreeAppRenderCallback = ThreeAppHookCallback<{ readonly time: number }>

/** */
export type ThreeCameraParams = ThreeAppSize & {
  props?: ThreeProps<PerspectiveCamera | OrthographicCamera>
  orthographic?: boolean
}

/** */
export type ThreeRendererParams = ThreeAppSize & { props?: ThreeProps<WebGLRenderer> }

/** */
export interface ThreeAppState {
  /** Root `scene` object */
  scene: Scene
  /** Default `camera` object */
  camera: PerspectiveCamera | OrthographicCamera
  /** Render `engine` object */
  renderer: WebGLRenderer
  /** */
  isFullscreenMode: boolean
  /** */
  isOrthographic: boolean

  /** Returns container client sizes or windows inner sizes if is in fullscreen mode, as `{ width, height }` obj */
  getContainerSize: () => ThreeAppSize
  /** Toggle fullscreen mode */
  toggleFullscreenMode: () => void
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
  camera?: ThreeProps<PerspectiveCamera | OrthographicCamera>
  /** */
  scene?: ThreeProps<Scene>
  /** */
  renderer?: ThreeProps<WebGLRenderer>

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

/** Union of all `Vector` types */
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
 * TODO: `Euler`, `Quaternion`, `Matrix3`, `Matrix4`
 */
export type ThreeProps<T extends ThreeAppObj> = {
  [P in keyof T]?: T[P] extends VectorLike ? ThreeVectorProp<T[P]> : T[P]
}
