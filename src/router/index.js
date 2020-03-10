import Vue from 'vue'
import VueRouter from 'vue-router';

// import LayoutPelanggan from '../Pelanggan/Layout/Navbar.vue'
const LayoutPelanggan = () =>
    import('../Pelanggan/Layout/Navbar.vue');

function viewPelanggan(view){
    return () => import (`../Pelanggan/Contents/${view}.vue`)
}

const routes = [
    {
        path:'/',
        component: LayoutPelanggan
    }
]

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

export default router;