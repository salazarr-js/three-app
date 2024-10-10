import { applyProps } from '@/utils'
import { Object3D, Vector3 } from 'three'
import { describe, expect, test, vi } from 'vitest'

describe('applyProps', () => {
  test('should warning on invalid props', () => {
    const spyOnConsole = vi.spyOn(console, 'warn')
    const obj = new Object3D()

    applyProps(obj, { lorem: 'ipsum' } as any)

    expect(spyOnConsole).toBeCalledTimes(1)
    expect(spyOnConsole).toBeCalledWith(`Object3D doesn't have a 'lorem' property`)
  })

  test('should set primitive props', () => {
    const obj = new Object3D()
    const children = new Object3D()
    children.name = 'children'

    applyProps(obj, {
      name: 'test-name',
      visible: false,
      userData: { lorem: 'ipsum' },
      children: [children],
    })

    expect(obj).toMatchObject({
      name: 'test-name',
      visible: false,
      userData: { lorem: 'ipsum' },
      children: [children],
    })
    expect(obj.children.at(0)?.name).toBe('children')
  })

  describe('vector3', async () => {
    test('should set Vector3 props from a new Vector3 instance', () => {
      const obj = new Object3D()

      applyProps(obj, {
        position: new Vector3(2, 2, 2),
        scale: new Vector3(2, 2, 2),
      })

      expect(obj.position.toArray()).toEqual([2, 2, 2])
      expect(obj.scale.toArray()).toEqual([2, 2, 2])
    })

    test('should set Vector3 prop from an array', () => {
      const spyOnConsole = vi.spyOn(console, 'warn')
      const obj = new Object3D()

      applyProps(obj, {
        position: [3, 3, 3],
        scale: [3, 3],
      } as any)

      expect(obj.position.toArray()).toEqual([3, 3, 3])
      expect(obj.scale.toArray()).toEqual([3, 3, undefined])

      expect(spyOnConsole).toBeCalledTimes(1)
      expect(spyOnConsole).toBeCalledWith(`scale: different array sizes between source and target can cause undefined or ignored values`)
    })

    test('should set Vector3 prop from an object with x, y, z format', () => {
      const spyOnConsole = vi.spyOn(console, 'warn')
      const obj = new Object3D()

      applyProps(obj, {
        position: { x: 4, y: 4, z: 4 },
        scale: { x: 4, y: 4, w: 4 }, // Will keep `default` value on missing props
      } as any)

      expect(obj.position.toArray()).toEqual([4, 4, 4])
      expect(obj.scale.toArray()).toEqual([4, 4, 1])

      expect(spyOnConsole).toBeCalledTimes(1)
      expect(spyOnConsole).toBeCalledWith(`scale: doesn't have a 'w' component`)
    })
  })
})
