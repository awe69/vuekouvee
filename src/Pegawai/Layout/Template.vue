<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense="">
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          no-action
        >
        <template v-slot:activator>
          <v-list-item-content>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          router :to="subItem.route"
          link
        >
        <v-list-item-content>
          <v-icon small>{{ subItem.icons }}</v-icon>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title v-text="subItem.title"></v-list-item-title>
        </v-list-item-content>
        </v-list-item>
      </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },

    data(){
      return{
        drawer:null,
        items:[
          {
            title: 'Admin',
            icon:'mdi-account',
            items: [
              { title: 'Produk',icons:'mdi-checkbox-blank-circle',route:'/pegawai/produk'},
              { title: 'Layanan',icons:'mdi-checkbox-blank-circle',route:'/pegawai/layanan'},
              { title: 'Jenis Hewan',icons:'mdi-checkbox-blank-circle',route:'/pegawai/jhewan'},
              { title: 'Ukuran',icons:'mdi-checkbox-blank-circle',route:'/pegawai/ukuran'},
              { title: 'Pegawai',icons:'mdi-checkbox-blank-circle',route:'/pegawai/employees'},
              { title: 'Supplier',icons:'mdi-checkbox-blank-circle',route:'/pegawai/supplier'},
            ],
          },
          {
            title:'CS',
            icon:'mdi-laptop',
            items: [
              { title: 'Pelanggan',icons:'mdi-checkbox-blank-circle',route:''},
              { title: 'Hewan',icons:'mdi-checkbox-blank-circle',route:''},
              { title: 'Transaksi Produk',icons:'mdi-checkbox-blank-circle',route:''},
              { title: 'Transaksi Layanan',icons:'mdi-checkbox-blank-circle',route:''},
            ]
          },
          {
            title:'Kasir',
            icon:'mdi-cash',
            items: [
              { title: 'Transaksi Produk',icons:'mdi-checkbox-blank-circle',route:''},
              { title: 'Transaksi Layanan',icons:'mdi-checkbox-blank-circle',route:''},
            ]
          },
        ]
      }
    }
  }
</script>
