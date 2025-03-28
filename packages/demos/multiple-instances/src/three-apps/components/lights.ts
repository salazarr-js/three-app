import { applyProps } from "@slzr/three-app"
import { AmbientLight, PointLight, SpotLight } from "three"

/** Creates a basic light setup */
export function lights() {
  return [
    applyProps(new AmbientLight(), { intensity: Math.PI / 2 }),
    applyProps(new SpotLight(), { angle: 0.15, decay: 0, intensity: Math.PI, penumbra: 1, position: [10, 10, 10] }),
    applyProps(new PointLight(), { decay: 0, intensity: Math.PI, position: [-10, -10, -10] }),
  ]
}
