import type { ConstructorRepresentation, SceneGraph, ThreeAppObj, ThreeAppProps } from '@/types'
import type { Object3D, Loader } from 'three'
import { Color, Layers } from 'three'

/** Checks if value is `null` or `undefined`. */
export function isNil(value: unknown): boolean {
  return value === null || value === undefined
}

/** Checks if value is boolean primitive or an instance of `Boolean` */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean' || value instanceof Boolean
}

/** Checks if value is an integer. */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value)
}

/** Checks if value is a string primitive or an instance of `String` */
export function isString(value: unknown): value is string {
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

/** */
export const isObject3D = (object: any): object is Object3D => object?.isObject3D

/** */
export function isConstructor<T>(value: unknown): value is ConstructorRepresentation<Loader<T, string | string[]>> {
  return typeof value === 'function' && value?.prototype?.constructor === value
}


/** Returns device pixel ratio */
export function getPixelRatio(): number {
  // Math.min(Math.max(1, window.devicePixelRatio), 2)
  return Math.min(window.devicePixelRatio, 2)
}

/** Traverse an object and return all the nodes and materials */
/** Collects nodes and materials from a THREE.Object3D. */
export function buildGraph(object: Object3D): SceneGraph {
  const data: SceneGraph = { nodes: {}, materials: {} }
  if (object) {
    object.traverse((obj: any) => {
      if (obj.name) data.nodes[obj.name] = obj
      if (obj.material && !data.materials[obj.material.name]) data.materials[obj.material.name] = obj.material
    })
  }
  return data
}

/**
 * Apply a set of props to Three object instance
 *
 * Heavily inspired on [R3F implementation](https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/core/utils.ts#L303)
 */
export function applyProps<T extends ThreeAppObj>(obj: T, props: ThreeAppProps<T>): T {
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
        // TODO: if `targetProp` is `VectorLike` & `propValue` is number,

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
    } else {
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
