<template>
  <v-container grid-list-md fluid mb-1 mt-2>
      <v-container fluid>
        <h2 class="text-md-center">Data Jenis Hewan</h2>
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
            Tambah Jenis hewan</v-btn>           
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
    :items="jhewans"
    :items-per-page="5"
    class="elevation-1"
    >
    <template v-slot:body="{ items }">
      <tbody >
        <tr v-for="(item,index) in items" :key="item.ID_JENISHEWAN">
          <td>{{index+1}}</td>
          <td >{{item.JENISHEWAN}}</td>
          <td >{{item.CREATE_AT_JHEWAN}}</td>
          <td>{{item.UPDATE_AT_JHEWAN}}</td>
          <td>{{item.DELETE_AT_JHEWAN}}</td>
          <td class="text-center"> 
            <v-btn icon color="indigo" light @click="editHandler(item)" >
              <v-icon>mdi-pencil</v-icon> 
            </v-btn> 
            <v-btn icon color="error" light @click="deleteData(item.ID_JENISHEWAN)" > 
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
          <span class="headline">Edit Jenis Hewan</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Jenis Hewan" v-model="form.jenishewan" required></v-text-field>
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
      jenishewan: '',
    },
    errors:"",
    headers: [
      {
      text: 'NO',
      align: 'start',
      sortable: true,
      value: 'ID_JENISHEWAN',
      },
      { text: 'Jenis Hewan', value: 'jenishewan' },
      { text: 'Create At Jenis Hewan', value: 'create_at_jhewan' },
      { text: 'Update At Jenis Hewan', value: 'update_at_jhewan' },
      { text: 'Delete At Jenis Hewan', value: 'delete_at_jhewan' },
      { text: 'Action', value: 'action' },
    ],
    jhewans: [],
    jhewan: new FormData,
    snackbar: false,
    color: null,
    text: '',
    load: false,
    updatedId:""
    }),
  methods: {
    sendData(){ 
      this.jhewan.append('id_pegawai', this.form.id_pegawai); 
      this.jhewan.append('jenishewan', this.form.jenishewan);
      var uri = this.$apiUrl + '/jenishewan' 
      this.load = true;
      this.$http.post(uri,this.jhewan).then(response =>{ 
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
    const qs = require('qs');
    const data = {
      id_pegawai: this.form.id_pegawai,
      jenishewan: this.form.jenishewan,
    };
    const confih={
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    var uri =this.$apiUrl + '/jenishewan/' + this.updatedId
    console.log(uri);
    this.load = true;
    this.$http.put(uri,qs.stringify(data),confih).then(response =>{ 
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
      var uri = this.$apiUrl + '/jenishewan/' + deleteId;
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
      var uri = this.$apiUrl + '/jenishewan'
      this.$http.get(uri,this.jhewans).then(response => {
      this.jhewans = response.data.Data
      })
    },
    editHandler(item) {
      this.typeInput = "edit";
      this.form.jenishewan = item.JENISHEWAN;
      (this.updatedId = item.ID_JENISHEWAN);
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
        id_pegawai: 0,
        jenishewan: '',
      };
    }
  },
  mounted() {
    this.getData();
  }
}
</script>