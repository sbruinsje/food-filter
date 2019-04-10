import './index.style.less';
import Vue from 'vue'
import AppComponent from './components/AppComponent.vue'

new Vue({
   render: h => h(AppComponent)
 }).$mount('#app')











//import runtime from 'serviceworker-webpack-plugin/lib/runtime';
//import image_url from './images/image.jpg';
//document.querySelector("#image").src = image_url;
// if ('serviceWorker' in navigator) {
//     const registration = runtime.register();
// }