import type { Object3D, Vector2, Vector3, Vector4 } from "three"

/** Three object base type */
export type ThreeObj = Record<string, any> | Object3D
/** Union of all `Vector` types */
type VectorLike = Vector2 | Vector3 | Vector4

/** `Vector2` object representation */
type Vector2AsObjectProp = { x?: number, y?: number }
/** `Vector3` object representation */
type Vector3AsObjectProp = Vector2AsObjectProp & { z?: number }
/** `Vector4` object representation */
type Vector4AsObjectProp = Vector3AsObjectProp & { w?: number }

/** `Vector2` as a settable prop */
type Vector2Prop = Vector2 | [number, number] | Vector2AsObjectProp;
/** `Vector3` as a settable prop */
type Vector3Prop = Vector3 | [number, number, number] | Vector3AsObjectProp;
/** `Vector4` as a settable prop */
type Vector4Prop = Vector4 | [number, number, number, number] | Vector4AsObjectProp;

/** Maps `VectorLike` types to their corresponding flexible props */
type ThreeVectorProp<T extends VectorLike> = T extends Vector2 ? Vector2Prop : T extends Vector3 ? Vector3Prop : Vector4Prop

/**
 * Type mapping for `applyProps` fn compatibility
 *
 * ✅ Mapped `Vector{2, 3, 4}` type props
 * TODO: `Euler`, `Quaternion`, `Matrix3`, `Matrix4`
 */
export type ThreeProps<T extends ThreeObj> = {
  [P in keyof T]?: T[P] extends VectorLike ? ThreeVectorProp<T[P]> : T[P]
}

/** Return type for `omit` fn that omits a set of keys from a object */
export type OmitKeys<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}
