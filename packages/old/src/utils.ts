import type { Object3D } from 'three'
import { Color, Layers, /** RGBAFormat, Texture, UnsignedByteType, sRGBEncoding */ } from 'three'
import type { OmitKeys } from './models'

/** Returns device pixel ratio */
export function getPixelRatio(): number {
  return Math.min(window.devicePixelRatio, 2)
}

/** Checks if a value is a plain object */
export function isPlainObject(value: unknown) {
  return value?.constructor === Object
}

/**
 * Apply a set of props to Three object instance, heavily inspired on
 * [R3F implementation](https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/core/utils.ts)
*/
export function applyProps<T extends Object3D | Record<string, any>>(
  obj: T,
  props: Partial<Record<keyof T, any>>,
): T {
  Object.keys(props).forEach((prop) => {
    if (!(prop in (obj as any))) {
      console.warn(`${obj?.constructor?.name || 'Object'} doesn't have a '${prop}' property`)
      return
    }

    const value = props[prop as keyof T] as any
    const targetProp = obj[prop as keyof T] as any

    // Special treatment for objects with support for set/copy, and layers
    if (targetProp) {
      if (targetProp instanceof Function) {
        // TODO: handle functions
        console.warn(`${targetProp.name}() is a fn`)
      }
      else if (targetProp.set && (targetProp.copy || targetProp instanceof Layers)) {
        // If value is an array
        if (Array.isArray(value)) {
          const valueWithDefaults = [value[0] ?? targetProp.x, value[1] ?? targetProp.y, value[2] ?? targetProp.z]
          // TODO: check props with different array size

          if (targetProp.fromArray)
            targetProp.fromArray(valueWithDefaults)
          else targetProp.set(...valueWithDefaults)
        }
        // Test again target.copy(class) next ...
        else if (
          targetProp.copy
          && value
          && value.constructor
          && targetProp.constructor === value.constructor
        ) {
          targetProp.copy(value)
        }
        // If nothing else fits, just set the single value, ignore undefined
        else if (value !== undefined) {
          const isColor = targetProp instanceof Color
          // Allow setting array scalars
          if (!isColor && targetProp.setScalar)
            targetProp.setScalar(value)
          // Layers have no copy function, we must therefore copy the mask property
          else if (targetProp instanceof Layers && value instanceof Layers)
            targetProp.mask = value.mask
          // Otherwise just set ...
          else targetProp.set(value)

          if (isColor)
            targetProp.convertSRGBToLinear()
        }
      }
    }
    else {
      // Else, just overwrite the value
      obj[prop as keyof T] = value

      // Auto-convert sRGB textures, for now ...
      // if (
      //   targetProp instanceof Texture
      //   && targetProp.format === RGBAFormat
      //   && targetProp.type === UnsignedByteType
      // )
      //   (obj[prop as keyof T] as any).encoding = sRGBEncoding
    }
  })

  return obj
}

/** Omit a set of keys from object */
export function omit<T extends object, K extends keyof T>(obj: T, keysToOmit: K[]): OmitKeys<T, K> {
  const result: Partial<T> = { ...obj }

  for (const key of keysToOmit)
    delete result[key]

  return result as OmitKeys<T, K>
}
