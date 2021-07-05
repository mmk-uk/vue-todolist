<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card outlined>

          <v-card-text>
 
            <!--  タイトル  -->
            <v-text-field v-model="tmpTodo.title" placeholder="やること"></v-text-field>
            <!--  締め切り日  -->
            <v-row>
              <v-col>
                <v-menu
                  v-model="showDatePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="tmpTodo.date"
                      label="締切日"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="tmpTodo.date"
                    @input="showDatePicker = false"
                    locale="jp-ja"
                    :day-format="(date) => new Date(date).getDate()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

          </v-card-text>

          <!--  フッター  -->
          <v-card-actions>
            <v-btn @click="toTodoList" text>
              <v-icon left>mdi-less-than</v-icon> キャンセル
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn dark :color="registerButtonColor" elevation="0" v-on:click="registerTodo()" class="white--text">{{registerButtonName}}</v-btn>
          </v-card-actions>


        </v-card>
      </v-col>
    </v-row>
    <template v-if="!this.newTodo">
      <v-row>
        <v-col>
          <v-btn dark color="#CD113B" elevation="0" block v-on:click="deleteTodo()">
            削除
          </v-btn>
        </v-col>
      </v-row>
    </template>

  </v-container>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {

    props:['editid','selectcategorykey'],
    data(){
        return {
            newTodo: true,
            tmpTodo:{
              id:"",
              categorykey:"",
              title:"",
              date: "",
              done: false
            },
            editindex: Number,
            showDatePicker: false
        }
    },
    computed: {
      registerButtonColor() {
        return this.newTodo ? "success" : "primary";
      },
      registerButtonName() {
        return this.newTodo ? "登録" : "更新";
      },
    },
    methods:{
        toTodoList(){
          this.$router.push({name:'TodoList',params:{sckey: this.selectcategorykey}});
        },
        registerTodo() {
          if (this.newTodo) {
            this.addTodo();
          } else {
            this.updateTodo();
          }
        },
        addTodo(){
            if(this.tmpTodo.title === '' || this.tmpTodo.date === '')return;
            const todos = JSON.parse(localStorage.getItem('todos'))||[];
            this.tmpTodo.id = uuidv4();
            this.tmpTodo.categorykey = this.selectcategorykey;
            todos.push(this.tmpTodo);
            localStorage.setItem('todos',JSON.stringify(todos));
            this.tmpTodo.title = '';
            this.tmpTodo.date = '';
            this.toTodoList();

        },
        updateTodo(){
            if(this.tmpTodo.title === '' || this.tmpTodo.date === '')return;
            const todos = JSON.parse(localStorage.getItem('todos'))||[];
            todos.splice(this.editindex,1,this.tmpTodo);
            localStorage.setItem('todos',JSON.stringify(todos));
            this.tmpTodo.title = '';
            this.tmpTodo.date = '';
            this.toTodoList();

        },
        deleteTodo(){
          const todos = JSON.parse(localStorage.getItem('todos'))||[];
          todos.splice(this.editindex,1);
          localStorage.setItem('todos',JSON.stringify(todos));
          this.tmpTodo.title = '';
          this.tmpTodo.date = '';
          this.toTodoList();
        }
    },

    mounted(){
      console.log(this.editid);
      if(this.editid){
        const todos = JSON.parse(localStorage.getItem('todos'))||[];
        this.editindex = todos.findIndex((item) => item.id == this.editid);
        this.tmpTodo = todos[this.editindex];
        this.newTodo = false;
      }
    }

}
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>