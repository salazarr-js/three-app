// https://github.com/threlte/threlte/blob/main/packages/extras/src/lib/hooks/useDraco.ts
// https://github.dev/pmndrs/drei/blob/master/src/core/Gltf.tsx
import { GLTF, GLTFLoader } from 'three-stdlib'
import { ConstructorRepresentation, Extensions, InputLike, SceneGraph, } from '@/types'
import { isString } from '@/utils'
import { useLoader } from '@/hooks'
import { useDraco } from './useDraco'

/** */
interface UseGLTFOptions<T = GLTF & SceneGraph> {
  draco: boolean | string

  extend?: Extensions<ConstructorRepresentation<GLTFLoader>>
  onProgress?: (event: ProgressEvent<EventTarget>) => void
  transform?: (data: T) => T
}

/** */
export function useGLTF<T extends InputLike>(path: T, options?: UseGLTFOptions) {
  return useLoader(GLTFLoader, path, {
    extend(loader) {
      if (options?.draco) {
        const dracoLoader = isString(options.draco) ? useDraco(options.draco) : useDraco()
        loader.setDRACOLoader(dracoLoader)
      }

      // TODO: add `ktx2Loader`, `meshoptDecoder`
    },
    onProgress: options?.onProgress,
    transform: options?.transform,
  })
}
