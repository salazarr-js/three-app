import { getIframeTemplate } from './utils/index'
import './style.css';

(async function () {
  // Load the three-app compiled scripts into the iframes
  (document.getElementById('three-app-one') as HTMLIFrameElement)
    .srcdoc = await getIframeTemplate('/three-apps/app-one.js');

  (document.getElementById('three-app-two') as HTMLIFrameElement)
    .srcdoc = await getIframeTemplate('/three-apps/app-two.js');
})()
