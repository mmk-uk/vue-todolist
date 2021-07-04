<template>
  <div id="app">
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
      <v-app-bar app flat color="#A19882" dark class="headline">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Todoリスト</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-row align="end">
            <v-col class="text-right pa-2">
              <font size="3">
                今日：{{today.getFullYear()}}年{{today.getMonth()+1}}月{{today.getDate()}}日
              </font>
            </v-col>
          </v-row>
      </v-app-bar>
      <v-navigation-drawer app absolute v-model="drawer" >
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-title>HOME</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>ABOUT</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>WORK</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>SERVICE</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>BLOG</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>ACCESS</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>


      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>


<script>
export default {
  name: "App",
  data(){
        return{
            today:"",
            drawer: false
        }
  },
  created(){
    this.today = new Date();
  }

};
</script>