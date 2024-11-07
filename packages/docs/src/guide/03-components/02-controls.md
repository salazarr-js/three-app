# 🕹️ Controls

<ClientOnly>
  <ThreeAppSandbox :scripts  />
</ClientOnly>

```ts
import { useOrbitControls } from '@slzr/three-app/components'

const threeApp = await createThreeApp({
  container: document.getElementById('three-app')!,
  onInit({ camera, renderer, scene }) {
    camera.position.y = 2

    const controls = useOrbitControls({ camera, renderer }, { autoRotate: true })

    // ...
  },
})
```

<script setup lang="ts">
import { data } from '../../examples/examples.data'

const scripts = data['03-controls']
</script>
