import type { ThreeAppObj, ThreeProps } from '@/types'
import { Color, Layers } from 'three'

/** Checks if value is `null` or `undefined`. */
export function isNil(value: unknown): boolean {
  return value === null || value === undefined
}

/** Checks if value is boolean primitive or an instance of `Boolean` */
export function isBoolean(value: unknown): boolean {
  return typeof value === 'boolean' || value instanceof Boolean
}

/** Checks if value is an integer. */
export function isInteger(value: unknown): boolean {
  return Number.isInteger(value)
}

/** Checks if value is a string primitive or an instance of `String` */
export function isString(value: unknown): boolean {
  return typeof value === 'string' || value instanceof String
}

/** Checks if a value is of a primitive type. */
export function isPrimitive(value: unknown): boolean {
  return isBoolean(value) || isInteger(value) || isString(value)
}

/**
 * Checks if a value is a plain object.
 *
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore?tab=readme-ov-file#_isplainobject
 */
export function isPlainObject(value: unknown): boolean {
  if (typeof value !== 'object' || value === null)
    return false

  // Check if value is a plain object using Object.prototype.toString
  if (Object.prototype.toString.call(value) !== '[object Object]')
    return false

  const proto = Object.getPrototypeOf(value)
  if (proto === null)
    return true

  // Ensure the constructor is Object
  const Ctor = proto.constructor
  return typeof Ctor === 'function' && Ctor === Object
}

/** Checks if value is as a `Function` object. */
export function isFunction(value: unknown): boolean {
  return typeof value === 'function'
}

/** Returns device pixel ratio */
export function getPixelRatio(): number {
  return Math.min(window.devicePixelRatio, 2)
}

/**
 * Apply a set of props to Three object instance
 *
 * Heavily inspired on [R3F implementation](https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/core/utils.ts#L303)
 */
export function applyProps<T extends ThreeAppObj>(obj: T, props: ThreeProps<T>): T {
  Object.keys(props).forEach((propKey) => {
    if (!(propKey in obj)) {
      console.warn(`${obj?.constructor?.name || 'Object'} doesn't have a '${propKey}' property`)
      return
    }

    const propValue = props[propKey as keyof T] as any
    const targetProp = obj[propKey as keyof T] as any

    if (!isNil(targetProp)) {
      // Overwrite primitives, arrays and plain objects
      if (isPrimitive(targetProp) || Array.isArray(targetProp) || isPlainObject(targetProp)) {
        obj[propKey as keyof T] = propValue as T[keyof T]
        return
      }

      // Special treatment for objects with support for set/copy, and layers
      if (targetProp.set && (targetProp.copy || targetProp instanceof Layers)) {
        // If `propValue` is array use `.fromArray()` or `.set()` functions
        if (Array.isArray(propValue)) {
          if (targetProp.toArray().length !== propValue.length)
            console.warn(`${propKey}: different array sizes between source and target can cause undefined or ignored values`)
          if (targetProp.fromArray)
            targetProp.fromArray(propValue)
          else targetProp.set(...propValue)
          return
        }

        // If `propValue` is a object, set props if they exist on `targetProp`
        if (isPlainObject(propValue)) {
          Object.keys(propValue).forEach((propObjKey) => {
            if (propObjKey in targetProp)
              targetProp[propObjKey] = propValue[propObjKey]
            else
              console.warn(`${propKey}: doesn't have a '${propObjKey}' component`)
          })
          return
        }

        if (targetProp.copy && propValue && propValue.constructor && targetProp.constructor === propValue.constructor) {
          targetProp.copy(propValue)
          return
        }

        // If nothing else fits, just set the single value, ignore undefined
        if (propValue !== undefined) {
          const isColor = targetProp instanceof Color
          // Allow setting array scalars
          if (!isColor && targetProp.setScalar) {
            targetProp.setScalar(propValue)
            return
          }

          // Layers have no copy function, we must therefore copy the mask property
          if (targetProp instanceof Layers && propValue instanceof Layers)
            targetProp.mask = propValue.mask
          // Otherwise just set ...
          else targetProp.set(propValue)

          if (isColor)
            targetProp.convertSRGBToLinear()
        }
      }
    }
    else {
      console.warn(`'${propKey}' prop has a 'nil' value, which can't be validated and will be overwritten`)

      // Overwrite `nil` values
      obj[propKey as keyof T] = propValue as T[keyof T]

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
