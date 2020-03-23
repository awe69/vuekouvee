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
                path:'/pegawai/produk',
                component:PegawaiAdmin('Produk')
            },
            {
                name:'UkuranAdmin',
                path:'/pegawai/ukuran',
                component:PegawaiAdmin('Ukuran')
            },
            {
                name:'JhewanAdmin',
                path:'/pegawai/jhewan',
                component:PegawaiAdmin('JenisHewan')
            },
            {
                name:'SupplierAdmin',
                path:'/pegawai/supplier',
                component:PegawaiAdmin('Supplier')
            },
            {
                name:'PegawaiAdmin',
                path:'/pegawai/employees',
                component:PegawaiAdmin('Employees')
            },
            {
                name:'LayananAdmin',
                path:'/pegawai/layanan',
                component:PegawaiAdmin('Layanan')
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