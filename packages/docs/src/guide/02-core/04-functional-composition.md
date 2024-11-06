# 🧠 Functional Composition

Most of all examples or boilerplate of how to compose `three.js` codebase is using object oriented programming `OOP`, since this library is built focus on DX and been inspired [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction)

build your scenes declaratively with re-usable, self-contained components that react to state.

```ts
/** */
import type { ColorRepresentation } from 'three'
import { applyProps, onRender } from '@slzr/three-app'
import * as THREE from 'three'

/** */
type CubeProps = Partial<{ color: ColorRepresentation }>

/** */
export function createCube(props: CubeProps = {}) {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: props.color ?? 0x00FF00 })
  const cube = new THREE.Mesh(geometry, material)

  // applyProps(cube, props) // Can apply/add more props

  onRender(() => {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  })

  return cube
}
```
