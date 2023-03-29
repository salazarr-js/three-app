import type { Scene, Camera, WebGLRenderer } from 'three'


/** */
export interface ThreeAppParams {
  /** Container element where `canvas` will be added */
  container: HTMLElement
  /** Initialize callback hook */
  onInit?: (state: ThreeAppState) => Promise<void> | void
  /** Render loop callback hook */
  onRender?: (renderCtx: { state: ThreeAppState, time: number }) => void
}

/** */
export interface ThreeAppState {
  /** Root `scene` object */
  scene: Scene
  /** Default `camera` object */
  camera: Camera
  /** Render `engine` object */
  renderer: WebGLRenderer
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
