<template>
<v-layout>
    <v-flex hidden-sm-and-down md6>
        <v-data-iterator :items="Prodfilter" :items-per-page.sync="itemsPerPage" :page="page" hide-default-footer>
            <template v-slot:default="props">
                <v-row class="ml-1">
                    <v-col class="ml-5" v-for="item in props.items" :key="item.ID_TRANSAKSI_LAYANAN" cols="8" sm="6" md="3" lg="3">
                        <v-card class="mx-auto" min-width="200px" min-height="300px">
                            <v-list dense>
                                <v-img :src='$apiGambar + item.GAMBAR' height="200px">
                                </v-img>
                                <v-list-item>
                                    <v-list-item-content>Nama</v-list-item-content>
                                    <v-list-item-content class="align-end">: {{ item.NAMA_PRODUK }}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>STOCK</v-list-item-content>
                                    <v-list-item-content class="align-end">: {{ item.STOCK}}</v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-content>MIN</v-list-item-content>
                                    <v-list-item-content class="align-end">: {{ item.MIN_STOCK }}</v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-card-actions class="justify-content-center">
                                <v-btn color="green" text @click="addRow(item)">
                                    ADD
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
            <template v-slot:footer>
                <v-row class="mb-12 justify-content-center">
                    <v-btn fab dark color="primary" class="mr-6" @click="formerPage">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab dark color="primary" class="mr-7" @click="nextPage">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-row>
            </template>
        </v-data-iterator>
    </v-flex>
    <v-flex align-content-space-between layout :pa-5="$vuetify.breakpoint.smAndDown" wrap>
        <v-layout justify-center>
            <v-flex>
                <div class="mt-5 mr-2">
                    <v-card v-if="before" class="mx-auto" width="100%" height="100%"  outlined>
                        <div class="d-flex justify-content-center">
                            <v-card-title class="headline">FORM SUPPLIER</v-card-title>
                        </div>
                        <v-row class="mb-2 mt-5" justify="center" no-gutters >
                            <v-col md="auto">
                                <v-row>
                                    <v-col cols="4">
                                        <v-text-field solo flat label="Nama Supplier" readonly=""></v-text-field>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-select v-model="tempSupplier" :items="Supplier" item-text="NAMA_SUPPLIER" item-value="ID_SUPPLIER" label="Nama" persistent-hint return-object solo></v-select>
                                    </v-col>
                                </v-row>
                                <div class="d-flex justify-content-end">
                                    <v-btn class="ma-2" color="success" @click="inputsupplier(formSupplier)" dark>CEK</v-btn>
                                </div>
                                <div>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-text-field solo flat label="Nama Suplier" readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-text-field v-model="formSupplier.nama" solo label="Nama Hewan" readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-text-field solo flat label="Alamat" readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-text-field v-model="formSupplier.alamat" solo label="jenis Hewan" readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-text-field solo flat label="Telepone" readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-text-field v-model="formSupplier.tele" solo label="jenis Hewan" readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <div class="d-flex justify-content-end">
                                        <v-btn class="ma-2" color="success" @click="postpemesanan()">
                                            Submit
                                        </v-btn>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card v-if="after" class="mx-auto" width="100%" height="100%" outlined>
                        <v-container>
                            <v-row>
                                <v-col cols="5">
                                    <label>Produk</label>
                                </v-col>
                                <v-col cols="2">
                                    <label>Jumlah</label>
                                </v-col>
                                <v-col cols="2">
                                    <label>Satuan Harga</label>
                                </v-col>
                                <v-col cols="2">
                                    <label>Total Harga</label>
                                </v-col>
                                <v-col cols="1">
                                    <button type="submit" class="btn btn-success" @click="addRow">+</button>
                                </v-col>
                            </v-row>
                                <v-row v-for="(row,index) in rows" :key="index">
                                <v-col cols="5">
                                    <v-text-field
                                        v-model="row.nama"
                                        solo
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                        v-model="row.jumlah"
                                        solo
                                        v-on:keyup="keymonitor(index)"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                        v-model="row.hargabeli"
                                        solo
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                        v-model="row.hargaTotal"
                                        solo
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="1">
                                    <button class="btn btn-danger" @click="deleteRow(rows,row.index)">X</button>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col >
                                    <div class="d-flex justify-content-end">
                                        <v-btn
                                            class="ma-2"
                                            color="error"
                                            @click="canceltransaksi()"
                                        >
                                        Cancel
                                        </v-btn>
                                        <v-btn
                                            class="ma-2"
                                            color="success"
                                            @click="postDetil()"
                                        >
                                        Submit
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </div>
            </v-flex>
        </v-layout>
    </v-flex>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="10000">
        {{ text }}
        <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
</v-layout>
</template>

<script>
export default {
    data: () => ({
        produks: [],
        tambah: false,
        before: false,
        after: true,
        indexes: 0,
        page: 1,
        itemsPerPage: 8,
        itemsPerPageArray: [2],
        snackbar: false,
        color: null,
        dialog: false,
        text: '',
        Supplier: [],
        idpemesanantemp:'',//tampungidygdikirm
        tempSupplier:[],//tampungygdipili
        formSupplier:{
            id:0,
            nama:'',
            alamat:'',
            tele:''
        },
        rows: [],
        supplierFrom: new FormData
        ///buattambah

    }),
    computed: {
        numberOfPages() {
            return Math.ceil(this.produks.length / this.itemsPerPage)
        },
        Prodfilter: function () {
            return this.produks.filter(function (u) {
                if (u.MIN_STOCK > u.STOCK)
                    return true;
            })
        }
    },
    methods: {
        postpemesanan(){
            var url = this.$apiUrl+'/pemesanan';
            this.supplierFrom.append('id_supplier',this.formSupplier.id);
            console.log(this.formSupplier.id);
            this.$http.post(url,this.supplierFrom).then(response=>{
                this.snackbar = true;
                this.color = 'green';
                this.text=response.data.Message;
                this.idpemesanantemp=response.data.Data;
                this.after=true;
                // console.log(this.idpemesanantemp);
            }).catch(error => {
                this.errors = error;
                console.log('asdasd');
                this.snackbar = true;
                this.text = error.response.Message;
                this.color = 'red';
                this.load = false;
            })

        },
        getData() {
            if (!this.$session.exists()) {
                this.$router.push('/login');
            } else {
                if (this.$session.get('role') != 'Admin') {
                    this.dis = true;
                } else {
                    var uri = this.$apiUrl + '/produk'
                    this.$http.get(uri).then(response => {
                        this.produks = response.data.Data
                    });
                    uri = this.$apiUrl+'/supplier'
                    this.$http.get(uri).then(response =>{
                        this.Supplier = response.data.Data
                    });
                }
            }

        },
        inputsupplier(){
            this.formSupplier.id=this.tempSupplier.ID_SUPPLIER,
            this.formSupplier.nama=this.tempSupplier.NAMA_SUPPLIER,
            this.formSupplier.alamat=this.tempSupplier.ALAMAT_SUPPLIER,
            this.formSupplier.tele=this.tempSupplier.PHONE_SUPPLIER
        },
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number
        },
        updatebtn(cek) {
            if (cek == 0) {
                return false
            } else
                return true

        },
        /////row
        addRow(item) {
            this.indexes++;
            this.rows.push({ id:item.ID_SUPPLIER,nama:item.NAMA_PRODUK, jumlah: 0,hargabeli:item.HARGA_BELI,hargaTotal:0});
        },
        keymonitor(i) {	
            this.rows[i].hargaTotal=this.rows[i].hargabeli * this.rows[i].jumlah;
        },
    },
    mounted() {
        this.getData();
    }
}
</script>
