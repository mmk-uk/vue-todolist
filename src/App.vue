<template>
  <div id="app">
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
      <v-app-bar app flat clipped-left color="#A19882" dark class="headline">
          <v-toolbar-title style="font-family: 'M PLUS Rounded 1c'">タスク管理</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-row align="end">
            <v-col class="text-right pa-2">
              <font size="3" style="font-family: 'M PLUS Rounded 1c'">
                今日：{{today.getFullYear()}}年{{today.getMonth()+1}}月{{today.getDate()}}日
              </font>
            </v-col>
          </v-row>
      </v-app-bar>
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
            today:""
        }
  },
  created(){
    this.today = new Date();
    
  }
};
</script>

<style>
#app {
  font-family: 'M PLUS Rounded 1c';
}
</style>