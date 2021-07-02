<template>
  <v-container>

      <!--  新規追加  -->
      <v-row justify="center"  align="center">
        <v-col>
          <h1>
          今日：{{today.getFullYear()}}年{{today.getMonth()+1}}月{{today.getDate()}}日
          </h1>
        </v-col>
        <v-col class="text-right">
          <v-btn color="success" elevation="0" v-on:click="addTodo">
              新規追加
          </v-btn>
        </v-col>
      </v-row>
        
      <!--  Todo表示  -->
      <template v-for="todo in todos">
        <v-row v-bind:key="todo.id">
          <v-col>
            <v-card outlined>
              <v-container>

                <v-row  align="center">

                  <v-col cols="2" class="text-center">
                    あと{{ deadlineDays(today,todo.date) }}日
                  </v-col>

                  <v-col>
                    <v-card-title>{{todo.title}}</v-card-title>
                    <v-card-subtitle>{{todo.date}}</v-card-subtitle>
                  </v-col>

                  <v-col cols="1" class="text-center">
                    <v-btn text icon color="success" @click="todo.done = !todo.done">
                      <v-icon x-large>{{ doneIcon(todo) }}</v-icon>
                    </v-btn>
                  </v-col>

                  <v-col cols="1" class="text-right">
                    <v-btn text icon v-on:click="deleteTodo(todo.id)">
                      <v-icon x-large>delete</v-icon>
                    </v-btn>
                  </v-col>

                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </template>
      
      
    

  </v-container>
  

</template>

<script>
export default {
    data(){
        return{
            todos:[],
            today:""
        }
    },
    created(){
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todos.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        this.today = new Date();
        
    },
    methods:{
        doneIcon(todo){
            return todo.done
            ? "mdi-checkbox-marked-circle-outline"
            : "mdi-checkbox-blank-circle-outline";
        },
        deleteTodo(id){
            const index = this.todos.findIndex((item) => item.id == id);
            if (index >= 0) {
              this.todos.splice(index,1);
              localStorage.setItem('todos',JSON.stringify(this.todos));
            }
        },
        addTodo(){
            this.$router.push('/create');
        },
        deadlineDays(today,dueday){
          console.log("----")
          const today2 = new Date(today.getFullYear(),today.getMonth(),today.getDate());
          const dueday2 = new Date(dueday)
          const dueday3 = new Date(dueday2.getFullYear(),dueday2.getMonth(),dueday2.getDate());
          const termDay = (dueday3 - today2) / 86400000;
          return termDay;
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
