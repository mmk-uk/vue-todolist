<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="primary" dark class="headline">
        <v-toolbar-title>Todoリスト</v-toolbar-title>
      </v-app-bar>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>


<script>
export default {
  name: "App",
};
</script>