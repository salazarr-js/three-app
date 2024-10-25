import type { Project } from '@stackblitz/sdk'
import StackBlitzSDK from '@stackblitz/sdk'

/** TODO: fix styles indent  */
function indent(template: string) {
  return template
    .trim()
    .split('\n')
    .map(l => l.trim())
    .join('\n')
    .concat('\n')
}

/** */
function getHTMLTemplate() {
  return indent(/* html */`
    <div id="three-app"></div>

    <script src="./index.ts" type="module"></script>
  `)
}

/** */
function getStyleTemplate() {
  return indent(/* css */`
    body {
      margin: 0;
      padding: 16px;
      display: flex;
      min-height: 100vh;
      background: white;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
    }

    #three-app {
      width: 100%;
      overflow: hidden;
      max-width: 1024px;
      aspect-ratio: 16 / 9;
      border-radius: 8px;
      background-color: #f6f6f7;
    }
  `)
}

/** */
function addExtraImportsToIndex(scripts: Scripts): Scripts {
  const indexScript = scripts['index.ts']

  const importRegex = /import[\s\S]+?from\s+['"].+?['"]\s*;?\n/g
  const matches = indexScript.match(importRegex)

  if (matches && matches.length > 0) {
    const lastImport = matches.at(-1)!
    const lastImportIndex = indexScript.lastIndexOf(lastImport) + lastImport.length

    const extraImports = indent(/* js */`
      import './style.css'
    `).concat('\n')

    return {
      ...scripts,
      'index.ts': indexScript.slice(0, lastImportIndex) + extraImports + indexScript.slice(lastImportIndex),
    }
  }

  return scripts
}

/** */
export type Scripts = Record<`${string}.ts`, string>

/** */
interface StackblitzProject {
  title?: string
  description?: string
  scripts: Scripts
}

/** */
function createStackblitzProject({ title, description, scripts }: StackblitzProject): Project {
  return {
    title: `@slzr/three-app - ${title || 'Example'}`,
    description: `https://three.salazarjs.dev/${description}`,
    template: 'typescript',
    files: {
      'index.html': getHTMLTemplate(),
      'style.css': getStyleTemplate(),

      ...addExtraImportsToIndex(scripts),
    },
    dependencies: {
      '@slzr/three-app': 'latest',
      'three': 'latest',
      '@types/three': 'latest',
    },
    settings: {
      compile: {
        trigger: 'save',
      },
    },
  }
}

/** */
export function openStackblitzProject(projectProps: StackblitzProject) {
  const projectOptions = createStackblitzProject(projectProps)

  StackBlitzSDK.openProject(projectOptions, {
    openFile: ['index.ts'],
  })
}
