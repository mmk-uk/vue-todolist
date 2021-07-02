<template>
  <div id="app">
    <v-app>
      <v-app-bar app flat color="primary" dark class="headline">
        <v-toolbar-title>Todoリスト</v-toolbar-title>
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
};
</script>