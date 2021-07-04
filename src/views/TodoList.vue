<template>
  <v-container>
      <v-row style="background-color: #C2B8A3;" align="center">
            <v-col>
              <v-row>
                <v-col>
                  <h1>
                    To-Do
                  </h1>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="text-right">
  
                  <v-btn text icon elevation="0" v-on:click="addTodo">
                    <v-icon x-large>mdi-plus-box-outline</v-icon>
                  </v-btn>

            </v-col>

      </v-row>


      <!--  新規追加  -->
      <!--
      <v-row justify="center"  align="center">
        <v-col>
          <h1>
          今日：{{today.getFullYear()}}年{{today.getMonth()+1}}月{{today.getDate()}}日
          </h1>
        </v-col>
        <v-col class="text-right">
          <v-row no-gutters>
            <v-col>

            </v-col>
            <v-col cols="2">
              <v-btn text icon elevation="0" v-on:click="changeEditmode">
                <v-icon x-large>{{ editmodeIcon(this.editmode) }}</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn text icon elevation="0" v-on:click="addTodo">
                <v-icon x-large>mdi-plus-box-outline</v-icon>
              </v-btn>
            </v-col>

          </v-row>
          

        </v-col>
      </v-row>
      -->
        
      <!--  Todo表示  -->
      <v-row>
        <v-col class="ma-3">

          <template v-for="todo in todos">
            <v-row v-bind:key="todo.id" dense>
              <v-col>
                <v-card outlined :color="cardColor(todo)">
                  <v-container>

                    <v-row align="center" >
                      <v-col cols="2" sm="2" md="1" lg="1" xl="1" class="text-center">
                        <v-btn text icon color="success" @click="todo.done = !todo.done">
                          <v-icon large>{{ doneIcon(todo) }}</v-icon>
                        </v-btn>
                      </v-col>

                      <v-col cols="8" sm="8" md="10" lg="10" xl="10">
                        <v-row>
                          <font size="-1">
                            あと{{ todo.leftdays }}日
                          </font>
                        </v-row>
                        <v-row>
                          {{todo.title}}
                        </v-row>
                      </v-col>

                      <v-col cols="2" sm="2" md="1" lg="1" xl="1" class="text-right">
                        <v-btn text icon v-on:click="editTodo(todo.id)">
                          <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </v-col>


                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-col>
      </v-row>


      
      
    

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
        //localStorage.clear('todos');
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todos.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        this.today = new Date();
        this.todos.forEach(
          todo => todo.leftdays = this.deadlineDays(this.today,todo.date)
        );
    },
    methods:{
        doneIcon(todo){
            return todo.done
            ? "mdi-checkbox-marked-circle-outline"
            : "mdi-checkbox-blank-circle-outline";
        },
        cardColor(todo){
            if (todo.done) {
              return "#AAAAAA";
            }else{
              if (todo.leftdays <= 1) {
                return "#F38BA0";
              }else if(todo.leftdays <= 7){
                return "#FFBCBC";
              }else{
                return "#CDF0EA";
              }
            }
        },
        deleteTodo(id){
            const index = this.todos.findIndex((item) => item.id == id);
            if (index >= 0) {
              this.todos.splice(index,1);
              localStorage.setItem('todos',JSON.stringify(this.todos));
            }
        },
        editTodo(id){
            const index = this.todos.findIndex((item) => item.id == id);
            //console.log(index);
            this.$router.push({name:'edit',params:{editindex: index}});
        },
        addTodo(){
            this.$router.push('/create');
        },
        deadlineDays(today,dueday){
          const today2  = new Date(today.getFullYear(),today.getMonth(),today.getDate());
          const dueday2 = new Date(dueday);
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
