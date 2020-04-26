<template>
<v-container>
    <v-data-iterator 
    :items="layanans" 
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
            <v-col  v-for="item in props.items" :key="item.ID_TRANSAKSI_LAYANAN"  cols="8" sm="6" md="3" lg="3">
                <v-card
                max-width="250"
                min-height="100"
                class="mb-10"
                >
                    <v-list dense>
                        <v-list-item>
                        <v-list-item-content>ID Transaksi</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.ID_TRANSAKSI_LAYANAN }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                        <v-list-item-content>Tanggal</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.TGL_TRANSAKSI_LAYANAN}}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                        <v-list-item-content>Total Belanja</v-list-item-content>
                        <v-list-item-content class="align-end">: {{ item.TOTAL_TRANSAKSI_LAYANAN }}</v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-card-actions
                    class="justify-content-center">
                        <v-btn
                            color="green"
                            text
                            :disabled="updatebtn(item.PROGRES_LAYANAN)"
                            @click="update(item)"
                        >
                            DONE
                        </v-btn>
                        </v-card-actions>
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
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
		{{ text }}
		<v-btn dark text @click="snackbar = false">Close</v-btn>
	</v-snackbar>
    </v-container>
</template>
<script>
export default {
    data:()=>({
        layanans:[],
        page: 1,
        itemsPerPage: 8,
        itemsPerPageArray: [8],
        search:'',
        transaksiLayanan: new FormData,
        snackbar: false,
        color: null,
        text: '',
    }),
    computed: {
      numberOfPages () {
        return Math.ceil(this.layanans.length / this.itemsPerPage)
      },
    },
    methods:{
        update(item){
            console.log(item)
            var uri = this.$apiUrl +'/transaksilayanan/'+item.ID_TRANSAKSI_LAYANAN
            console.log(item.ID_TRANSAKSI_LAYANAN)
            this.transaksiLayanan.append('id_pegawai',this.$session.get('id'));
            this.transaksiLayanan.append('peg_id_pegawai',1);
            this.transaksiLayanan.append('id_hewan',item.ID_HEWAN);
            this.transaksiLayanan.append('diskon_layanan',item.DISKON_LAYANAN);
            this.transaksiLayanan.append('total_transaksi_layanan',item.TOTAL_TRANSAKSI_LAYANAN);
            this.transaksiLayanan.append('status_layanan',item.STATUS_LAYANAN);
            this.transaksiLayanan.append('progres_layanan',1);
            this.$http.post(uri,this.transaksiLayanan).then(response=>{
                this.snackbar = true; 
                this.color = 'green'; 
                this.text = 'Berhasil';  
            }).catch(error =>{ 
                this.errors = error;
                console.log('asdasd');
                this.snackbar = true; 
                this.text = error.response.Message; 
                this.color = 'red'; 
                this.load = false; 
            }) 
        },
        getData(){
            var uri = this.$apiUrl + '/transaksilayanan'
            this.$http.get(uri).then(response =>{
            this.layanans=response.data.Data
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
        updatebtn(cek){
            if(cek==0){
                return false
            }else
                return true

        }
    },
    mounted(){
        this.getData();
    }
}
</script>
