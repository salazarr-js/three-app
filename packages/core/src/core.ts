import { Object3D } from 'three'

/** Apply a set of props to Three object instance */
export function applyProps<T extends Object3D | Record<string, any>>(
  obj: T,
  props: Partial<Record<keyof T, any>>)
{
  console.warn('applyProps', obj, props);

  return {
    applyProps: true
  }
}
