import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three'
import type { ThreeAppProps } from '@slzr/three-app'
import { applyProps, onClick, onPointerEnter, onPointerLeave, useRender } from '@slzr/three-app'

/** */
export function box(props: ThreeAppProps<Mesh>) {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshStandardMaterial({ color: 'orange' })
  const cube = new Mesh(geometry, material)
  let clicked = false

  applyProps(cube, props)

  useRender(() => cube.rotation.x += 0.01)

  /** */
  onClick(cube, () => {
    clicked = !clicked

    cube.scale.setScalar(clicked ? 1.5 : 1)
  })

  /** */
  onPointerEnter(cube, () => {
    material.color.set('hotpink')
  })

  /** */
  onPointerLeave(cube, () => {
    material.color.set('orange')
  })

  return cube
}
