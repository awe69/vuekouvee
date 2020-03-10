<template>
  <v-data-table
    :headers="headers"
    :items="produk"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:body="{ items }">
        <tbody>
            <tr v-for="(item,index) in items" :key="item.id_produk">
                <td>{{index}}+1</td>
                <td>{{item.nama_produk}}</td>
                <td>{{item.gambar}}</td>
                <td>{{item.nama_produk}}</td>
                <td>{{item.stock}}</td>
                <td>{{item.min_stock}}</td>
                <td>{{item.gambar}}</td>
                <td>{{item.satuan_produk}}</td>
                <td>{{item.harga_beli}}</td>
                <td>{{item.harga_jual}}</td>
                <td>{{item.create_at_produk}}</td>
                <td>{{item.update_at_produk}}</td>
                <td>{{item.delete_at_produk}}</td>
            </tr>
        </tbody>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Id Produk',
            align: 'start',
            sortable: true,
            value: 'id_produk',
          },
          { text: 'pic', value: 'Gambar' },
          { text: 'Nama Produk', value: 'nama_produk' },
          { text: 'Stock', value: 'stock' },
          { text: 'Min Stock', value: 'min_stock' },
          { text: 'Satuan Produk', value: 'satuan_produk' },
          { text: 'Harga beli', value: 'harga_beli' },
          { text: 'Harga Jual', value: 'harga_jual' },
          { text: 'Create At Produk', value: 'create_at_produk' },
          { text: 'Update At Produk', value: 'update_at_produk' },
          { text: 'Delete At Produk', value: 'delete_at_produk' },
        ],
        produk:[],
      }
    },
    methods:{
        getData() {
            var uri = this.$apiUrl + '/produk'
            console.log(this.produk);
            this.$http.get(uri).then(response => {
                this.produk = response.data.Data
            })
        },
        mounted (){
            this.getData();
        }
    }
  }
</script>