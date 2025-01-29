import { getHTMLTemplate } from './utils/index';
//
import './style.css';

(function(){
  document.getElementById('three-app-1')!.srcdoc = getHTMLTemplate('/three-apps/01-basic.js');
  document.getElementById('three-app-2')!.srcdoc = getHTMLTemplate('/three-apps/02-components.js');
})()

