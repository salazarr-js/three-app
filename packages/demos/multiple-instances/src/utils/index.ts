/** Return html template to use as iframe `srcdoc` */
export function getHTMLTemplate(scriptUrl: string): string {
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

  <script type="module" src="${scriptUrl}"></script>
</body>
</html>
  `
}
