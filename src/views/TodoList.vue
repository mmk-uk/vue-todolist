<template>
  <div>
      <v-list>
          <template v-for="(todo,i) in todos">
              <v-list-item v-bind:key="i">
                  <v-list-item-content>
                      {{todo}}
                  </v-list-item-content>
                  <v-list-item-action>
                      <v-btn text icon v-on:click="deleteTodo(i)">
                          <v-icon>delete</v-icon>
                      </v-btn>
                  </v-list-item-action>
              </v-list-item>
          </template>
      </v-list>
      <div class="bottom-right">
          <v-btn fab color="indigo" v-on:click="addTodo">
              <v-icon color="white">add</v-icon>
          </v-btn>
      </div>
  </div>

</template>

<script>
export default {
    data(){
        return{
            todos:[]
        }
    },
    created(){
        this.todos=JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods:{
        deleteTodo(i){
            this.todos.splice(i,1);
            localStorage.setItem('todos',JSON.stringify(this.todos));
        },
        addTodo(){
            this.$router.push('/create');
        }
    }

}
</script>

<style scoped>
    .bottom-right{
        position: fixed;
        bottom: 0px;
        right: 0px;
    }
</style>
