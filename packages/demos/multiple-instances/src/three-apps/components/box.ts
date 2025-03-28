import type { ColorRepresentation } from 'three'
import { BoxGeometry, Mesh, MeshStandardMaterial,} from 'three'
import type { ThreeAppProps } from '@slzr/three-app'
import { applyProps, onClick, onPointerEnter, onPointerLeave, useRender } from '@slzr/three-app'


/** Creates an animated clickable box (cube) mesh with basic interaction. */
export function box(meshProps?: ThreeAppProps<Mesh>, color?: ColorRepresentation) {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshStandardMaterial({ color: color ?? 'orange' })
  const box = new Mesh(geometry, material)

  if (meshProps)
    applyProps(box, meshProps)

  useRender(() => (box.rotation.x += 0.01))

  let clicked = false
  onClick(box, () => {
    clicked = !clicked

    box.scale.setScalar(clicked ? 1.5 : 1)
  })

  onPointerEnter(box, () => {
    material.color.set('hotpink')
  })

  onPointerLeave(box, () => {
    material.color.set(color ?? 'orange')
  })

  return box
}
