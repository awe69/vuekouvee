import Vue from 'vue'
import VueRouter from 'vue-router';

// import LayoutPelanggan from '../Pelanggan/Layout/Navbar.vue'
const LayoutPelanggan = () =>
    import('../Pelanggan/Layout/Navbar.vue');

function viewPelanggan(view){
    return () => import (`../Pelanggan/Contents/${view}.vue`)
}
const Login = () =>
    import('../Pegawai/Layout/Login.vue');
const LayoutPegawai = () =>
    import('../Pegawai/Layout/Template.vue');

function PegawaiAdmin(view){
    return () => import(`../Pegawai/Admin/${view}.vue`)
}
function PegawaiCS(view){
    return () => import(`../Pegawai/CS/${view}.vue`)
}

const routes = [
    {
        path:'/',
        component: LayoutPelanggan,
        children:[
            {
                name:'HomePelanggan',
                path:'/',
                component:viewPelanggan('Home')
            }
        ]
    },
    {
        path:'/login',
        name:'Login',
        component:Login,
    },
    {
        path:'/pegawai',
        component:LayoutPegawai,
        children:[
            {
                name:'ProdukAdmin',
                path:'/pegawai/produk',
                component:PegawaiAdmin('Produk'),
                // beforeEnter(to, from, next){
                //     if(Vue.prototype.$session.get()){
                //         next()
                //     }
                //     else{
                //         next('/login')
                //     }
                // }
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
    },
    {
        path:'/pegawai',
        component:LayoutPegawai,
        children:[
            {
                name:'PelangganCS',
                path:'/pegawai/pelanggan',
                component:PegawaiCS('Pelanggan')
            },
            {
                name:'HewanCS',
                path:'/pegawai/hewan',
                component:PegawaiCS('Hewan')
            },
        ]
    }
]

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

export default router;