<template>
  <section
  id="welcome"
  class="hide-overflow"
  >
  <v-data-iterator 
  :items="produkk" 
  :search="search" 
  :items-per-page.sync="itemsPerPage"
  :page="page"
  hide-default-footer >
      <template v-slot:header>
        <v-toolbar class="mb-2" flat >
          <v-toolbar-title>Book List</v-toolbar-title>
          <v-text-field class="ml-12" v-model="search" append-icon="mdi-search-web" label="Search" single-line hide-details></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row>
            <v-col v-for="item in props.items" :key="item.NAMA_PRODUK" cols="12" sm="6" md="2" lg="3">
                <v-card
                max-width="250">
                    <img :src= '$apiGambar + item.GAMBAR' width="250px" height="200px">

                    <v-divider></v-divider>

                    <v-list dense>
                        <v-list-item>
                        <v-list-item-content>Nama Produk</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.NAMA_PRODUK }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                        <v-list-item-content>Harga</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.HARGA_JUAL }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                        <v-list-item-content>Stock</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.STOCK }}</v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>
                </v-card>
          </v-col>
        </v-row>
      </template>
      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </section>
</template>

<script>
export default {
   data() {
      return {
        produkk:[],
        page: 1,
        itemsPerPage: 4,
        itemsPerPageArray: [4, 8, 12],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.produkk.length / this.itemsPerPage)
      },
    },
   methods: {
   sort (prop) {
      if (prop === this.sortBy) {
        // reverse sort order if requested sort is the same as current
        this.sortDirection = this.sortDirection === 'ascending' ? 'descending' : 'ascending';
      } else {
        // otherwise sort order is ascending
        this.sortDirection = 'ascending';
      }
      this.sortBy = prop;
      this.produkk.sort((a, b) => {
        if (a[prop] === b[prop]) {
        } else if (a[prop] < b[prop]) {
          return this.sortDirection === 'ascending' ? -1 : 1;
        } else if (a[prop] > b[prop]) {
          return this.sortDirection === 'ascending' ? 1 : -1;
        }
      });
    },
    getData(){
      var uri = this.$apiUrl + '/produk'
      this.$http.get(uri).then(response =>{
      this.produkk=response.data.Data
      console.log(this.produkk)
      }) 
    },
    nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
   },
    mounted() {
        this.getData();
    },
};
</script>
