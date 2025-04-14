// import { format } from 'prettier'

/** */
export type Scripts = Record<`${string}.ts`, string>

/** TODO: get dependencies from package */
const dependencies = {
  '@slzr/three-app': '^0.3.2',
  'three': '^0.175.0',
  '@types/three': '^0.175.0',
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

/** Return example template to use as iframe `srcdoc` */
export function getExampleTemplate(scriptUrl: string): string {
  return /* html */`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    html, body { margin: 0; padding: 0; background: none; }
    body { height: 100vh; overflow: hidden; }
    #three-app { height: 100%; width: 100%; }
  </style>
</head>
<body>
  <div id="three-app"></div>

  <script type="module" src="${scriptUrl}"></script>
</body>
</html>
  `
}
