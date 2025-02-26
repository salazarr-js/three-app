import type { Loader, Material, Object3D } from 'three'

export interface ObjectMap {
  nodes: { [name: string]: Object3D }
  materials: { [name: string]: Material }
}

/** * Traverse an object and return all the nodes and materials */
// export function traverseObjects(object: Object3D) {
/** Collects nodes and materials from a THREE.Object3D. */
export function buildGraph(object: Object3D) {
  const data: ObjectMap = { nodes: {}, materials: {} }
  if (object) {
    object.traverse((obj: any) => {
      if (obj.name) data.nodes[obj.name] = obj
      if (obj.material && !data.materials[obj.material.name]) data.materials[obj.material.name] = obj.material
    })
  }
  return data
}

/** */
export interface ThreeAppLoader<T> extends Loader {
  load: (
    url: string,
    onLoad: (result: T) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent | unknown) => void
  ) => void
  loadAsync: (url: string, onProgress?: (event: ProgressEvent) => void) => Promise<T>
}

/** */
// export type LoaderProto<T> = new (manager?: LoadingManager) => ThreeAppLoader<T>
export type LoaderProto<T> = new (...args: any) => ThreeAppLoader<T extends unknown ? any : T>
/** */
export type LoaderReturnType<T, L extends LoaderProto<T>> = T extends unknown
  ? Awaited<ReturnType<InstanceType<L>['loadAsync']>>
  : T

/** */
export type BranchingReturn<T, Parent, Coerced> = T extends Parent ? Coerced : T
/** */
export type Extensions<T extends { prototype: LoaderProto<any> }> = (loader: T['prototype']) => void

/** Memoizes loaders to avoid multiple instances. */
const memoizedLoaders = new WeakMap<LoaderProto<any>, ThreeAppLoader<any>>()

/**
 * ThreeApp hook to load resources using three.js loaders.
 *
 * Heavily inspired by
 * [RTF](https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/core/hooks.tsx),
 * [Tresjs](https://github.com/Tresjs/cientos/blob/main/src/core/loaders/useGLTF/index.ts) and
 * [Threlte](https://github.com/threlte/threlte/blob/main/packages/core/src/lib/hooks/useLoader.ts)
 * `useLoader` Hook
 */
export async function useLoader<T, U extends string | string[], L extends LoaderProto<T>, R = LoaderReturnType<T, L>>(
  Proto: L,
  input: U,
  options?: {
    extend?: Extensions<L>
    onProgress?: (event: ProgressEvent<EventTarget>) => void
    transform?: (data: T) => T
  },
): Promise<U extends any[] ? Promise<R[]> : Promise<R>> {
  // Lazy Init loader
  let loader: ThreeAppLoader<T> = memoizedLoaders.get(Proto)!
  if (!loader) {
    loader = new Proto()
    memoizedLoaders.set(Proto, loader)
  }

  // Extend loader
  if (options?.extend) options.extend(loader)

  //
  async function loadResource(url: string) {
    // TODO: check auto transform
    // if (isObject3D(data?.scene)) Object.assign(data, buildGraph(data.scene))
    // if (data.scene) {
    //   Object.assign(data, traverseObjects(data.scene))
    // }

    if (loader.loadAsync) {
      const result = await loader.loadAsync(url, options?.onProgress)
      return options?.transform?.(result) ?? result
    }

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        data => resolve(options?.transform?.(data) ?? data),
        event => options?.onProgress?.(event),
        reject,
      )
    })
  }

  //
  const paths = (Array.isArray(input) ? input : [input]) as string[]
  //
  const results = await Promise.all(paths.map(loadResource))

  return (Array.isArray(input) ? results : results[0]) as any
}
