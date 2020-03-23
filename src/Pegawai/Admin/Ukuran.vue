<template>
  <v-container grid-list-md fluid mb-1 mt-2>
      <v-container fluid>
        <h2 class="text-md-center">Data Ukuran</h2>
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
            Tambah Ukuran</v-btn>           
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
    :loading="load"
    :items="ukurans"
    :items-per-page="10"
    class="elevation-1"
    >
    <template v-slot:body="{ items }">
      <tbody >
        <tr v-for="(item,index) in items" :key="item.ID_UKURAN">
          <td>{{index+1}}</td>
          <td >{{item.UKURAN}}</td>
          <td >{{item.CREATE_AT_UKURAN}}</td>
          <td>{{item.UPDATE_AT_UKURAN}}</td>
          <td>{{item.DELETE_AT_UKURAN}}</td>
          <td class="text-center"> 
            <v-btn icon color="indigo" light @click="editHandler(item)" >
              <v-icon>mdi-pencil</v-icon> 
            </v-btn> 
            <v-btn icon color="error" light @click="deleteData(item.ID_UKURAN)" > 
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
          <span class="headline">Edit Ukuran</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Ukuran" v-model="form.ukuran" required></v-text-field>
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
      ukuran: '',
    },
    errors:"",
    headers: [
      {
      text: 'NO',
      align: 'start',
      sortable: true,
      value: 'ID_UKURAN',
      },
      { text: 'Ukuran', value: 'nama_produk' },
      { text: 'Create At Produk', value: 'create_at_produk' },
      { text: 'Update At Produk', value: 'update_at_produk' },
      { text: 'Delete At Produk', value: 'delete_at_produk' },
      { text: 'Action', value: 'action' },
    ],
    ukurans: [],
    ukuran: new FormData(),
    snackbar: false,
    color: null,
    text: '',
    load: false,
    updatedId:""
    }),
  methods: {
    sendData(){ 
      this.ukuran.append('id_pegawai', this.form.id_pegawai); 
      this.ukuran.append('ukuran', this.form.ukuran);
      // console.log(this.ukuran.ukuran);
      var uri = this.$apiUrl + '/ukuran' 
      this.load = true;
      this.$http.post(uri,this.ukuran).then(response =>{ 
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
      // this.ukuran.append('id_pegawai', this.form.id_pegawai); 
      // this.ukuran.append('ukuran', this.form.ukuran);
      const qs = require('qs');
      const data = {
        id_pegawai: this.form.id_pegawai,
        ukuran: this.form.ukuran
      };
      const confih={
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      var uri =this.$apiUrl + '/ukuran/' + this.updatedId
      this.load = true;
      this.$http.put(uri,qs.stringify(data),confih).then(response =>{ 
        this.snackbar = true; 
        this.color = 'green'; 
        this.text = response.data.Message; 
        this.load = false; 
        this.dialog = false 
        this.getData(); 
        this.resetForm(); 
        console.log(this.form);
      }).catch(error =>{ 
        this.errors = error 
        this.snackbar = true; 
        this.text = 'Try Again'; 
        this.color = 'red'; 
        this.load = false; 
      }) 
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl + '/ukuran/' + deleteId;
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
      var uri = this.$apiUrl + '/ukuran'
      this.$http.get(uri,this.ukurans).then(response => {
      this.ukurans = response.data.Data
      })
    },
    editHandler(item) {
      this.typeInput = "edit";
      this.form.ukuran = item.UKURAN;
      (this.updatedId = item.ID_UKURAN);
      this.dialog = true;
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
        id_pegawai: 1,
        ukuran: "",
      };
    }
  },
  mounted() {
    this.getData();
  }
}
</script>