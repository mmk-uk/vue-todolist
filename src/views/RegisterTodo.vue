<template>
  <v-container>

    <v-row justify="center">
      <v-col cols="12">
        <v-card color="#FEF7DC">
          <template v-if="this.newTodo">
            <v-card-title>新規タスク</v-card-title>
          </template>
          <template v-else>
            <v-card-title>タスクを編集</v-card-title>
          </template>

          <v-card-text>
                カテゴリ：{{selectcategorytitle}}


            <!--  タイトル  -->
            <v-text-field label="やること" v-model="tmpTodo.title" prepend-icon="mdi-calendar-check" ></v-text-field>
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
          <v-dialog v-model="dialog" width="200">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark color="#CD113B" elevation="0" block v-bind="attrs" v-on="on">
                削除
              </v-btn>
            </template>
            <v-card>
              <v-card-text></v-card-text>
              <v-card-text>本当に消しても大丈夫ですか？</v-card-text>
              <v-card-actions>
                <v-btn dark color="primary" elevation="0" @click="dialog = false">
                  やめる
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark color="#CD113B" elevation="0" v-on:click="deleteTodo()">
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </template>

    <!--
    <template v-if="!this.newTodo">

          <v-btn dark color="#CD113B" elevation="0" block v-on:click="deleteTodo()">
            削除
          </v-btn>

    </template>
    -->

  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
//import Category from '../components/Category.vue';

export default {
 // components: { Category },

    props:['editid','edittodo','selectcategorytitle','selectcategorykey','backkey','userid'],
    data(){
        return {
            db:null,
            newTodo: true,
            tmpTodo:{
              id:"",
              categorykey:"",
              title:"",
              date: "",
              done: false,
              pass: false
            },
            today:"",
            editindex: Number,
            showDatePicker: false,
            dialog: false
        }
    },
    created(){
      this.db = firebase.firestore();
      this.today = new Date();
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
          this.$router.push({name:'todolist',params:{sckey: this.backkey}});
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
            //const todos = JSON.parse(localStorage.getItem('todos'))||[];
            this.tmpTodo.id = uuidv4();
            this.tmpTodo.pass = this.checkPass(this.tmpTodo.date);
            this.tmpTodo.categorykey = this.selectcategorykey;
            //todos.push(this.tmpTodo);
            //localStorage.setItem('todos',JSON.stringify(todos));

            this.db.collection('users').doc(this.userid).collection('todos').doc(this.tmpTodo.id).set(this.tmpTodo);

            this.tmpTodo.title = '';
            this.tmpTodo.date = '';
            this.toTodoList();

        },
        updateTodo(){
            if(this.tmpTodo.title === '' || this.tmpTodo.date === '')return;
            //const todos = JSON.parse(localStorage.getItem('todos'))||[];
            //this.tmpTodo.pass = this.checkPass(this.tmpTodo.date);
            //todos.splice(this.editindex,1,this.tmpTodo);
            //localStorage.setItem('todos',JSON.stringify(todos));

            this.db.collection('users').doc(this.userid).collection('todos').doc(this.tmpTodo.id).set(this.tmpTodo);

            this.tmpTodo.title = '';
            this.tmpTodo.date = '';
            this.toTodoList();

        },
        deleteTodo(){
          //const todos = JSON.parse(localStorage.getItem('todos'))||[];
          //todos.splice(this.editindex,1);
          //localStorage.setItem('todos',JSON.stringify(todos));
          //console.log("削除！");

          this.db.collection('users').doc(this.userid).collection('todos').doc(this.tmpTodo.id).delete();

          this.tmpTodo.title = '';
          this.tmpTodo.date = '';
          this.toTodoList();
        },
        checkPass(date){
          const today2  = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate());
          const date2 = new Date(date);
          const date3 = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate());
          if ((date3 - today2) < 0){
            return false;
          }else{
            return true;
          }
        }
    },

    mounted(){
      if(this.editid){
        //const todos = JSON.parse(localStorage.getItem('todos'))||[];
        //this.editindex = todos.findIndex((item) => item.id == this.editid);
        //this.tmpTodo = todos[this.editindex];
        this.tmpTodo = this.edittodo;
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