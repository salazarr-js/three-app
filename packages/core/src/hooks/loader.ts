/**
 *  Heavily inspired by
 *
 * [RTF](https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/core/hooks.tsx),
 * [Tresjs](https://github.com/Tresjs/cientos/blob/main/src/core/loaders/useGLTF/index.ts) and
 * [Threlte](https://github.com/threlte/threlte/blob/main/packages/core/src/lib/hooks/useLoader.ts)
 * `useLoader` Hook
 */
import { buildGraph, isConstructor, isObject3D } from '@/utils'
import type {ConstructorRepresentation, Extensions, InputLike, LoaderLike, LoaderResult} from '@/types'



/** Memoizes loaders to avoid multiple instances. */
const memoizedLoaders = new WeakMap<ConstructorRepresentation<LoaderLike>, LoaderLike>()

/** ThreeApp hook to load resources using three.js loaders. */
export async function useLoader<
  L extends LoaderLike | ConstructorRepresentation<LoaderLike>,
  I extends InputLike,
  R extends LoaderResult<L>
>(
  protoLoader: L,
  input: I,
  options?: {
    extend?: Extensions<L>
    onProgress?: (event: ProgressEvent<EventTarget>) => void
    transform?: (data: R) => R
  },
) {
  let loader: LoaderLike

  if (isConstructor(protoLoader)) {
    loader = memoizedLoaders.get(protoLoader)!
    if (!loader) {
      loader = new protoLoader()
      memoizedLoaders.set(protoLoader, loader)
    }
  } else {
    loader = protoLoader as any
  }

  // Extend loader
  if (options?.extend) options.extend(loader as any)

  //
  async function loadResource(url: string) {
    return new Promise<LoaderResult<L>>((resolve, reject) => {
      loader.load(
        url,
        (result) => {
          const scene = (result as any)?.scene
          const preTransformed = isObject3D(scene) ? { ...result, ...buildGraph(scene) } : result

          resolve(options?.transform?.(preTransformed) ?? preTransformed)
        },
        event => options?.onProgress?.(event),
        error => reject(new Error(`[useLoader] Couldn't load ${input}: ${(error as ErrorEvent)?.message}`))
      )
    })
  }

  //
  const paths = (Array.isArray(input) ? input : [input]) as string[]
  //
  const results = await Promise.all(paths.map(loadResource))

  return (Array.isArray(input) ? results : results[0]) as I extends any[] ? R[] : R
}
