import type { Scene, Camera, WebGLRenderer } from 'three'

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

  /** Toggle fullscreen mode */
  toggleFullscreenMode: () => void
}


/** */
export type ThreeAppHookCallback<T = {}> = (ctx: Readonly<ThreeAppState & T>) => void

/** */
export type ThreeAppResizeCallback = ThreeAppHookCallback<{ entry: ResizeObserverEntry }>

/** */
export type ThreeAppRenderCallback = ThreeAppHookCallback<{ time: number }>
