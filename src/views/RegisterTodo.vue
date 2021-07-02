<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card outlined>

          <v-card-text>
            <!--  タイトル  -->
            <v-text-field v-model="newTodo.title" placeholder="やること"></v-text-field>
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
                      v-model="newTodo.date"
                      label="締切日"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newTodo.date"
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
            <v-btn dark color="success" elevation="0" v-on:click="addTodo()" class="white--text">追加</v-btn>
          </v-card-actions>


        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
    data(){
        return {
            newTodo:{
              id:"",
              title:"",
              date: "",
              done: false
            },
            showDatePicker: false
        }
    },
    methods:{
        toTodoList(){
          this.$router.push("/");
        },
        addTodo(){
            if(this.newTodo.title === '')return;
            const todos = JSON.parse(localStorage.getItem('todos'))||[];
            this.newTodo.id = uuidv4();
            todos.push(this.newTodo);
            localStorage.setItem('todos',JSON.stringify(todos));
            this.newTodo.title = '';
            this.$router.push('/');
        }
    }

}
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>