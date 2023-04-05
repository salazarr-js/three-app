import type { Scene, Camera, WebGLRenderer, Object3D } from 'three'

/** */
export interface ThreeAppSizes {
  width: number
  height: number
}

/** */
export interface ThreeAppParams {
  /** Container element where `canvas` will be added */
  container: HTMLElement
  /** Initialize callback hook */
  onInit?: (state: Readonly<ThreeAppState>) => Promise<void> | void
  /** Render loop callback hook */
  onRender?: ThreeAppRenderCallback

  // TODO:
  // orthographic: boolean
  // camera: Camera // defaults: { fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }
  // scene: Scene
  // Renderer: Scene
  // shadows: ``
}

/** */
export interface ThreeAppState {
  /** Root `scene` object */
  scene: Scene
  /** Default `camera` object */
  camera: Camera
  /** Render `engine` object */
  renderer: WebGLRenderer
  /** */
  isFullscreenMode: boolean

  /** Returns container client sizes or windows inner sizes if is in fullscreen mode, as `{ width, height }` obj */
  getContainerSizes: () => ThreeAppSizes
  /** Toggle fullscreen mode */
  toggleFullscreenMode: () => void
}

/** */
export interface ThreeApp extends ThreeAppState {
  /** Render a frame */
  render: (time: number) => void
  /**
   * Start render loop using
   * [`.setAnimationLoop`](https://threejs.org/docs/index.html?q=WebGLRenderer#api/en/renderers/WebGLRenderer.setAnimationLoop)
   */
  start: () => void
  /** Stop render loop */
  stop: () => void
}


/** */
export type ThreeAppHookCallback<T = {}> = (ctx: Readonly<ThreeAppState & T>) => void

/** */
export type ThreeAppResizeCallback = ThreeAppHookCallback<{ entry: ResizeObserverEntry }>

/** */
export type ThreeAppRenderCallback = ThreeAppHookCallback<{ time: number }>

/**
 * Array like props that are compatible with `applyProps` fn
 *
 * TODO: `rotation`, `quaternion`, `scale`, `modelViewMatrix`, `normalMatrix`
*/
type ArrayLikeProps = 'position'

/** Type mapping for `applyProps` fn compability */
export type ThreeProps<T extends Object3D, E extends Record<string, any> = {}> = {
  [P in keyof T]?: P extends ArrayLikeProps ? T[P] | number[] : T[P]
} & E


// ======================================== UTILITY TYPES ======================================== //

/** Return type for `omit` fn that omits a set of keys from a object */
export type OmitKeys<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}

/**
 * **ReadonlyKeys**
 *
 * Get union type of keys that are readonly in object type `T`
 * https://github.com/type-challenges/type-challenges/issues/13
 */
export type ReadonlyKeys<T extends Object> = {
  [K in keyof T]:
    (<S>() => S extends { [Z in K]: T[Z] } ? 2 : 1) extends
    (<S>() => S extends { -readonly [Z in K]: T[Z] } ? 2 : 1) ? never : K
}[keyof T]


/**
 * **ReadonlyKeys<T>**
 *
 * Get union type of keys that are readonly in object type T
*/
export type OmitReadonly<T extends Record<string, any>> = Omit<T, ReadonlyKeys<T>>
