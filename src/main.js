import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import vuetify from './plugins/vuetify';
import router from './router'
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://localhost/apikouvee/index.php';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  components:{ App },
}).$mount('#app')
