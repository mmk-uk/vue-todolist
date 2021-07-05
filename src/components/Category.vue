<template>
    <v-list nav dense>
        <v-list-item-group v-for="category in this.categorys" :key="category.id">
            <v-list-item>
              <v-list-item-title>{{category.title}}</v-list-item-title>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>


<script>
export default {
  data(){
        return{
            categorys:[]
        }
  },
  created(){
    this.categorys = JSON.parse(localStorage.getItem('categorys')) || [];
  },
  mounted(){
    this.categorys = JSON.parse(localStorage.getItem('categorys')) || [];
  }

};
</script>