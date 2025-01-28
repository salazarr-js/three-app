import type { ColorRepresentation } from 'three'
import { useRender } from '@slzr/three-app'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

/** */
type CubeProps = Partial<{ color: ColorRepresentation }>

/** */
export function createCube(props: CubeProps = {}) {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: props.color ?? 0x00FF00 })
  const cube = new Mesh(geometry, material)

  // applyProps(cube, props) // Can apply/add more props

  useRender(() => {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  })

  return cube
}
