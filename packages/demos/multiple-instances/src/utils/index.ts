/** Generate HTML template for iframes, fetching/injecting script on it */
export function getIframeTemplate(scriptPath: string, inline = false) {
  function getTemplate(script: string) {
    const scriptTag = inline ? `<script type="module">${script}</script>` : `<script type="module" src="${script}"></script>`

    return `
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

        ${scriptTag}
      </body>
      </html>
    `
  }

  if (inline) {
    return fetch(scriptPath)
      .then((r) => r.text())
      .then((script) => getTemplate(script))
  }

  return Promise.resolve(getTemplate(scriptPath))
}
