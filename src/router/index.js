import Vue from 'vue'
import VueRouter from 'vue-router';

// import LayoutPelanggan from '../Pelanggan/Layout/Navbar.vue'
const LayoutPelanggan = () =>
    import('../Pelanggan/Layout/Navbar.vue');

function viewPelanggan(view){
    return () => import (`../Pelanggan/Contents/${view}.vue`)
}
const LayoutPegawai = () =>
    import('../Pegawai/Layout/Template.vue');
function PegawaiAdmin(view){
    return () => import(`../Pegawai/Admin/${view}.vue`)
}

const routes = [
    {
        path:'/',
        component: LayoutPelanggan
    },
    {
        path:'/pegawai',
        component:LayoutPegawai,
        children:[
            {
                name:'ProdukAdmin',
                path:'/produk',
                component:PegawaiAdmin('Produk')
            }
        ]
    }
]

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

export default router;