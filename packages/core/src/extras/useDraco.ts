/**
 * 🔄 Inspired/Ported
 *
 * - Threlte Extras UseDraco Hook - https://github.com/threlte/threlte/blob/main/packages/extras/src/lib/hooks/useDraco.ts
 * - react-three-fiber https://github.dev/pmndrs/drei/blob/master/src/core/Gltf.tsx
 */

import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js"

let _defaultDecoderPath = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
const loaderInstances = new Map<string, DRACOLoader>()

/** */
export function useDraco(decoderPath = _defaultDecoderPath): DRACOLoader {
  if (loaderInstances.has(decoderPath)) {
    return loaderInstances.get(decoderPath)!
  }

  const loader = new DRACOLoader().setDecoderPath(decoderPath)
  loaderInstances.set(decoderPath, loader)

  return loader
}

/**  */
useDraco.setDecoderPath = (path: string) => {
  _defaultDecoderPath = path
}
