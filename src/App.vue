<template>
  <div id="app">
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
     
     <v-app-bar app flat clipped-left color="#2E4C6D" dark style="margin-top:0px;padding-top:0px" height="60px" v-if="isAuthenticated"></v-app-bar>
      <v-app-bar app flat clipped-left color="#2E4C6D" dark style="margin-top:40px;padding-top:0px" height="60px" v-if="isAuthenticated">

                <v-app-bar-nav-icon>
                  <v-img :src="require('./assets/AppIcon2.jpg')" contain height="50px" style="width:70px"></v-img>
                </v-app-bar-nav-icon>
                
                <v-spacer></v-spacer>

                <v-row align="end">
                  <v-col class="text-right pa-2">
                    <font size="3" style="font-family: 'DotGothic16', sans-serif">
                      今日：{{today.getFullYear()}}年{{today.getMonth()+1}}月{{today.getDate()}}日
                    </font>
                  </v-col>
                </v-row>

      </v-app-bar>
      

      <v-main style="margin-top:40px">
        <router-view></router-view>
      </v-main>
      
    </v-app>
  </div>
</template>


<script>
//import Signin from "@/views/Signin";

export default {
  name: "App",
  components:{
  //  Signin
  },
  data(){
        return{
            isAuthenticated: false,
            today:""
        }
  },
  created(){
    //console.log(this.$route.path);
    this.today = new Date();
  },
  mounted(){
        if(this.$route.path == '/' || this.$route.path == '/signin' || this.$route.path == '/signup'|| this.$route.path == '/reset'){
          this.isAuthenticated = false;
        }else{
          this.isAuthenticated = true;
        }
  },
  watch:{
    '$route': function (to) {

        if(to.path == '/' || to.path == '/signin' || to.path == '/signup'|| to.path == '/reset'){
          this.isAuthenticated = false;
        }else{
          this.isAuthenticated = true;
        }
      }
  },
  methods:{
    widthGet(){
      return window.innerWidth;
    }
  }
};
</script>

<style>
#app {
  font-family: 'DotGothic16', sans-serif;
}

body {
  background-color: #ffffff;
}
</style>