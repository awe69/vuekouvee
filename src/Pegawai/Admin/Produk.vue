<template>
  <v-container grid-list-md fluid mb-1 mt-2>
      <v-container fluid>
        <h2 class="text-md-center">Data Produk</h2>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <v-btn
            depressed
            dark
            rounded
            style="text-transform: none !important;"
            color = "green accent-3"
            @click="dialog = true">               
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>                   
            Tambah Produk</v-btn>           
          </v-flex>           
          <v-flex xs6 class="text-right">               
            <v-text-field                 
            v-model="keyword"                 
            append-icon="mdi-search"                 
            label="Search"                 
            hide-details>
            </v-text-field>       
          </v-flex>
        </v-layout>
      </v-container>
    <v-data-table
    :headers="headers"
    :items="produks"
    :items-per-page="5"
    class="elevation-1"
    >
    <template v-slot:body="{ items }">
      <tbody >
        <tr v-for="(item,index) in items" :key="item.id_produk">
          <td>{{index+1}}</td>
          <td>{{item.GAMBAR}}</td>
          <td >{{item.NAMA_PRODUK}}</td>
          <td>{{item.MIN_STOCK}}</td>
          <td> <v-chip :color="getColor(item.STOCK,item.MIN_STOCK)">{{item.STOCK}}</v-chip></td>
          <td>{{item.SATUAN_PRODUK}}</td>
          <td>{{item.HARGA_BELI}}</td>
          <td>{{item.HARGA_JUAL}}</td>
          <td >{{item.CREATE_AT_PRODUK}}</td>
          <td>{{item.UPDATE_AT_PRODUK}}</td>
          
          <td>{{item.DELETE_AT_PRODUK}}</td>
          <td class="text-center"> 
            <v-btn icon color="indigo" light @click="editHandler(item)" >
              <v-icon>mdi-pencil</v-icon> 
            </v-btn> 
            <v-btn icon color="error" light @click="deleteData(item.ID_PRODUK)" > 
              <v-icon>mdi-delete</v-icon> 
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>  
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Produk</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nama Produk" v-model="form.nama_produk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Min Stock" v-model="form.min_stock" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Stock" v-model="form.stock" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Satuan Produk" v-model="form.satuan_produk" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Harga Beli" v-model="form.harga_beli" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Harga Jual" v-model="form.harga_jual" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
      {{ text }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    items: [],
    typeInput: 'new',
    keyword: '',
    form:{
      id_pegawai: 1,
      nama_produk: "",
      stock: 0,
      min_stock: 0,
      satuan_produk:"",
      harga_beli:0,
      harga_jual:0,
    },
    errors:"",
    headers: [
      {
      text: 'NO',
      align: 'start',
      sortable: true,
      value: 'id_produk',
      },
      { text: '', value: 'Gambar' },
      { text: 'Nama Produk', value: 'nama_produk' },
      { text: 'Min Stock', value: 'min_stock' },
      { text: 'Stock', value: 'stock' },
      { text: 'Satuan Produk', value: 'satuan_produk' },
      { text: 'Harga beli', value: 'harga_beli' },
      { text: 'Harga Jual', value: 'harga_jual' },
      { text: 'Create At Produk', value: 'create_at_produk' },
      { text: 'Update At Produk', value: 'update_at_produk' },
      { text: 'Delete At Produk', value: 'delete_at_produk' },
      { text: 'Action', value: 'action' },
    ],
    produks: [],
    produk: new FormData,
    snackbar: false,
    color: null,
    text: '',
    load: false,
    updatedId:""
    }),
  methods: {
    sendData(){ 
      this.produk.append('id_pegawai', this.form.id_pegawai); 
      this.produk.append('nama_produk', this.form.nama_produk); 
      this.produk.append('stock', this.form.stock); 
      this.produk.append('min_stock', this.form.min_stock); 
      this.produk.append('satuan_produk', this.form.satuan_produk);
      this.produk.append('harga_beli', this.form.harga_beli);
      this.produk.append('harga_jual', this.form.harga_jual);
      var uri =this.$apiUrl + '/produk' 
      this.load = true;
      this.$http.post(uri,this.produk).then(response =>{ 
        this.snackbar = true; 
        this.color = 'green'; 
        this.text = response.data.Message; 
        this.load = false; 
        this.dialog = false 
        this.getData(); 
        this.resetForm(); 
      }).catch(error =>{ 
        this.errors = error 
        this.snackbar = true; 
        this.text = 'Try Again'; 
        this.color = 'red'; 
        this.load = false; 
      }) 
    },
    updateData(){ 
      this.produk.append('id_pegawai', this.form.id_pegawai); 
      this.produk.append('nama_produk', this.form.nama_produk); 
      this.produk.append('stock', this.form.stock); 
      this.produk.append('min_stock', this.form.min_stock); 
      this.produk.append('satuan_produk', this.form.satuan_produk);
      this.produk.append('harga_beli', this.form.harga_beli);
      this.produk.append('harga_jual', this.form.harga_jual);
      var uri =this.$apiUrl + '/produk/' + this.updatedId
      console.log(uri);
      this.load = true;
      this.$http.post(uri,this.produk).then(response =>{ 
        this.snackbar = true; 
        this.color = 'green'; 
        this.text = response.data.Message; 
        this.load = false; 
        this.dialog = false 
        this.getData(); 
        this.resetForm(); 
      }).catch(error =>{ 
        this.errors = error 
        this.snackbar = true; 
        this.text = 'Try Again'; 
        this.color = 'red'; 
        this.load = false; 
      }) 
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl + '/produk/' + deleteId;
      this.$http.delete(uri).then(response => {
        this.snackbar = true;
        this.text = response.data.Message;
        this.color = "green";
        this.deleteDialog = false;
        this.getData();
      })
      .catch(error => {
        this.errors = error;
        this.snackbar = true;
        this.text = "Try Again";
        this.color = "red";
      });
    },  
    getData(){
      var uri = this.$apiUrl + '/produk'
      this.$http.get(uri,this.produks).then(response => {
      this.produks = response.data.Data
      })
    },
    editHandler(item) {
      this.typeInput = "edit";
      this.form.nama_produk = item.NAMA_PRODUK;
      this.form.stock=item.STOCK;
      console.log(typeof this.form.stock);
      this.form.min_stock=item.MIN_STOCK;
      this.form.satuan_produk=item.SATUAN_PRODUK;
      this.form.harga_beli=item.HARGA_BELI;
      this.form.harga_jual=item.HARGA_JUAL;
      (this.updatedId = item.ID_PRODUK);
      this.dialog = true;
    },
    getColor(stock,min) {
      var a = parseInt(stock);
      var b = parseInt(min);
      if (a > b) {
        return 'green'
      }
      else
        return 'red'
    },
    setForm() {
      if (this.typeInput === "new") {
        this.sendData();
      } else {
        console.log("dddd");
        this.updateData();
      }
    },
    resetForm() {
      this.form = {
        id_pegawai: 0,
        nama_produk: '',
        stock: 0,
        min_stock: 0,
        satuan_produk:'',
        harga_beli:0,
        harga_jual:0,
      };
    }
  },
  mounted() {
    this.getData();
  }
}
</script>