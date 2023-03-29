import type { Scene, Camera, WebGLRenderer } from 'three'


/** */
export interface ThreeAppParams {
  /** Container element where `canvas` will be added */
  container: HTMLElement
  /** Initialize callback hook */
  onInit?: (state: ThreeAppState) => Promise<void> | void
  /** Render loop callback hook */
  onRender?: ThreeAppRenderCallback
}

/** */
export interface ThreeAppState {
  /** Root `scene` object */
  readonly scene: Scene
  /** Default `camera` object */
  readonly camera: Camera
  /** Render `engine` object */
  readonly renderer: WebGLRenderer
}

/** */
export interface ThreeApp extends ThreeAppState {
  /** Render a frame */
  readonly render: (time: number) => void
  /**
   * Start render loop using
   * [`.setAnimationLoop`](https://threejs.org/docs/index.html?q=WebGLRenderer#api/en/renderers/WebGLRenderer.setAnimationLoop)
   */
  readonly start: () => void
  /** Stop render loop */
  readonly stop: () => void
}


/** */
export type ThreeAppHookCallback<T = {}> = (ctx: ThreeAppState & T) => void

/** */
export type ThreeAppResizeCallback = ThreeAppHookCallback<{ entry: ResizeObserverEntry }>

/** */
export type ThreeAppRenderCallback = ThreeAppHookCallback<{ time: number }>
