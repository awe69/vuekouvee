<template>
  <v-app>
    <v-app-bar app class="primary">
      <v-toolbar-title class="headline text-uppercase">
        <span>Kouvee</span>
        <span class="font-weight-light">         Pet Shop</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text href="#home">HOME</v-btn>
        <v-btn text href="#product">PRODUCT</v-btn>
        <v-btn text href="#service">SERVICE</v-btn>
        <v-btn text href="#aboutus">ABOUT US</v-btn>
        <v-btn text href="#contactus">CONTACT US</v-btn>
      </v-toolbar-items>  
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>


export default {
  
};
</script>
