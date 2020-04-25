<template>
    <v-data-iterator 
    :items="produkk" 
    :search="search" 
    :items-per-page.sync="itemsPerPage"
    :page="page"
    hide-default-footer >
    <template 
    v-slot:header>
        <v-toolbar
        color="primary"
        class="mb-2"
        flat>
        <v-text-field
            v-model="search"
            clearable
            solo-inverted
            hide-details
            label="Search"
        ></v-text-field>
        <v-spacer></v-spacer>
        </v-toolbar>
    </template>
    <template 
    v-slot:default="props"
    >
        <v-row
        class="ml-1">
            <v-col v-for="item in props.items" :key="item.ID_TRANSAKSI_PRODUK" cols="8" sm="6" md="3" lg="3">
                <v-card
                max-width="250"
                min-height="100"
                class="mb-10"
                >
                    <v-list dense>
                        <v-list-item>
                        <v-list-item-content>ID Transaksi</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.ID_TRANSAKSI_PRODUK }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                        <v-list-item-content>Tanggal</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.TGL_TRANSAKSI}}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                        <v-list-item-content>Total Belanja</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.TOTAL_TRANSAKSI_PRODUK }}</v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-btn icon color="secondary" light @click="editHandler(item)" >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn> 
                </v-card>
        </v-col>
        </v-row>
    </template>
    <template v-slot:footer >
        <v-row class="mb-12 justify-content-center">
        <v-btn
            fab
            dark
            color="primary"
            class="mr-12"
            @click="formerPage"
        >
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
            fab
            dark
            color="primary"
            class="mr-12"
            @click="nextPage"
        >
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        </v-row>
    </template>
    </v-data-iterator>
</template>
<script>
export default {
    data:()=>({
        produkk:[],
        page: 1,
        itemsPerPage: 8,
        itemsPerPageArray: [8],
        search:'',
    }),
    computed: {
      numberOfPages () {
        return Math.ceil(this.produkk.length / this.itemsPerPage)
      },
    },
    methods:{
        getData(){
            var uri = this.$apiUrl + '/transaksiproduk'
            var uri2 = this.$apiUrl + '/transaksiproduk'
            this.$http.get(uri).then(response =>{
            this.produkk=response.data.Data
            }) 
            this.$http.get(uri2).then(response =>{
            this.layanan=response.data.Data
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
    mounted(){
        this.getData();
    }
}
</script>