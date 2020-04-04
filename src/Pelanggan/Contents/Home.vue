<template>
    <div id="app">
        <full-page :options="options" id="fullpage">
            <div class="section">
              <v-layout>
              <v-img
              src="../../assets/pic4.jpg"
              contain
            >
            <div class="center-screen">
              <h1 ><span class="span1" >KOUVEE PET SHOP</span>
              <br> your best pets friends</h1>
              <div class="button">
                <v-btn color="secondary" large>Our Product</v-btn>
                <v-btn color="third" style="margin-left:10vh" large>Our Services</v-btn>
              </div>
            </div>
            <!-- <v-btn large>Normal</v-btn> -->
            </v-img>
              </v-layout>
            </div>
            <div class="section">
                <h3>Section 2</h3>
            </div>
            <div class="section">
                <h3>Section 3</h3>
            </div>
            <div class="section">
                <h3>Section 4</h3>
            </div>
            <div class="section">
                <h3>Section 5</h3>
            </div>
        </full-page>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        options: {
          licenseKey: 'YOUR_KEY_HERE',
          afterLoad: this.afterLoad,
          scrollOverflow: true,
          scrollBar: false,
          menu: '#menu',
          navigation: true,
          anchors: ['home', 'product', 'service','aboutus','contactus'],
          sectionsColor: ['#05386b','#ffd369', '#ff5f45', '#0798ec', '#fec401']
        },
      }
    },
    methods: {
      afterLoad () {
        console.log('After load')
      },
    }
  }
</script>

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  .section{
    text-align: center;
    position: relative;
  }
  .center-screen {
    display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  }
  .button{
  
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: -50vh;
    
  }
  h1 {
    font: 600 1.5em/1 'Raleway', sans-serif;
    color: rgba(0,0,0,.5);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: .5em;
    position: absolute;
    width: 100%;
  }

.span1, .span1:after {
    font-weight: 900;
    color: #efedce;
    white-space: nowrap;
    display: inline-block;
    position: relative;
    letter-spacing: .1em;
    padding: .2em 0 .25em 0;
}

.span1 {
    font-size: 4em;
    z-index: 100;
    text-shadow: .04em .04em 0 #9cb8b3;
} 
</style>
