import { AmbientLight, Group, PointLight, SpotLight } from 'three'
import { applyProps } from '@slzr/three-app'

/** Setup scene lights as a `Group`  */
export function lights() {
  return new Group().add(
    applyProps(new AmbientLight(), { intensity: Math.PI / 2 }),
    applyProps(new SpotLight(), { position: [10, 10, 10], angle: 0.15, penumbra: 1, decay: 0, intensity: Math.PI }),
    applyProps(new PointLight(), { position: [-10, -10, -10], decay: 0, intensity: Math.PI }),
  )
}
