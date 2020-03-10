import Vue from 'vue';
import Vuetify from 'vuetify/lib';
Vue.use(Vuetify);

// Vue.use(Vuetify, {
//     iconfont: "mdi"
//   });

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    dark: true
  }
});