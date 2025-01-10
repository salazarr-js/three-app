import type { SandpackBundlerFiles } from '@codesandbox/sandpack-client'
import { loadSandpackClient } from '@codesandbox/sandpack-client'

/** */
export type Scripts = Record<`${string}.ts`, string>

/** TODO: get dependencies from package */
const dependencies = {
  '@slzr/three-app': '^0.2.0',
  'three': '^0.170.0',
  '@types/three': '^0.169.0',
}

/** */
function getHTMLTemplate(styles?: string) {
  const styleTag = styles ? `<style>${styles}</style>` : ''

  // TODO: add to head
  // <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  return /* html */`
${styleTag}

<div id="three-app"></div>

<script src="./index.ts" type="module"></script>`
}

/** */
function getStyleTemplate(sandboxed = false) {
  /** */
  function commentLine(cssLine: string) {
    return sandboxed ? `/* ${cssLine} */` : cssLine
  }

  return /* css */`
  body {
    margin: 0;
    ${commentLine('padding: 16px;')}
    display: flex;
    min-height: 100vh;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    ${commentLine('background-color: white;')}
  }

  #three-app {
    width: 100%;
    overflow: hidden;
    max-width: 1024px;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    ${commentLine('background-color: #f6f6f7;')}
  }\n`
}

/** */
export async function createSandpackClient(iframeRef, scripts: Scripts) {
  /** */
  const scriptsSandpack: SandpackBundlerFiles = Object.keys(scripts).reduce((prev, scriptKey) => {
    return {
      ...prev,
      [scriptKey]: { code: scripts[scriptKey] },
    }
  }, {})

  return await loadSandpackClient(
    iframeRef.value!,
    {
      entry: 'index.ts',
      files: {
        'index.html': { code: getHTMLTemplate(getStyleTemplate(true)) },
        ...scriptsSandpack,
      },
      dependencies,
    },
    {
      showLoadingScreen: true,
      showOpenInCodeSandbox: false,
    },
  )
}

/**
 * https://codesandbox.io/docs/learn/sandboxes/cli-api#xhr-request
 */
export function defineCodeSandbox(scripts: Scripts): Promise<{ id: string }> {
  /** */
  const codeSandboxScripts = Object.keys(scripts).reduce((prev, scriptKey) => {
    return {
      ...prev,
      [scriptKey]: { content: scripts[scriptKey] },
    }
  }, {})

  return fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      files: {
        'package.json': {
          content: {
            dependencies,
          },
        },
        'index.html': { content: getHTMLTemplate(getStyleTemplate()) },

        ...codeSandboxScripts,
      },
    }),
  })
    .then(x => x.json())
    .then(x => ({
      id: x.sandbox_id,
    }))
}
