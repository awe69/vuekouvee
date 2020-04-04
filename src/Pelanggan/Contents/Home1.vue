<template>
  <v-container fluid>
    <v-card v-for="produk in produkk" :key="produk.ID_PRODUK" :sort-by="['HARGA_JUAL', 'STOCK']"
    :sort-desc="[false, true]"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    multi-sort
    class="mx-4 my-12"
    max-width="300">
    <v-layout row wrap :class="`pa-8 project ${produk.ID_PRODUK}`">
    <v-container>
    <div class="caption grey--text"></div>
    <img :src= '$apiGambar + produk.GAMBAR' width="225px" height="350px">
    <v-col>
    <div class="caption grey--text"></div>
    <div  style="text-align:center;"><h3>
    <span style="color: black; font-family: Verdana,Arial,Helvetica,Georgia; font-size: 15px;">
    {{produk.NAMA_PRODUK}}</span>
    </h3></div>
    </v-col>

    <v-col>
    <div class="caption grey--text">Price</div>
    <div>Rp {{produk.HARGA_JUAL}},00</div> 
    </v-col>
    <v-col>
    <div class="caption grey--text">Stock</div>
    <div>{{produk.STOCK}}pcs</div>
    </v-col>
    </v-container>
    </v-layout> 
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        produk:[],
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'name',
        keys: [
          'NAMA_PRODUK',
          'HARGA_PRODUK',
          'STOCK',
        ],
        items: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%',
          },
        ],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      getData(){
        var uri = this.$apiUrl + '/produk'
        this.$http.get(uri).then(response =>{
        this.produkk=response.data.Data
        }) 
      },
    },
  }
</script>