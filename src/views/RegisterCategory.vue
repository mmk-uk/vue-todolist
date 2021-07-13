<template>
    <v-container>

        <v-row>
            <v-col class="text-center">
                <v-card color="#FEF7DC">
                    <template v-if="this.newCategory">
                        <v-card-title class="pb-0">新規カテゴリ</v-card-title>
                    </template>
                    <template v-else>
                        <v-card-title class="pb-0">カテゴリを編集</v-card-title>
                    </template>
                    
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="tmpCategory.title" placeholder="カテゴリ名"></v-text-field>
                            <v-card-actions class="pa-0">
                                <v-btn text class="pa-0" @click="toTodoList">
                                    <v-icon left>mdi-less-than</v-icon> キャンセル
                                </v-btn>  

                                <v-spacer></v-spacer>

                                <v-btn :color="registerButtonColor" elevation="0"   @click="registerCategory">
                                    {{registerButtonName}}
                                </v-btn>
                            
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                    
                </v-card>
            </v-col>
        </v-row>

        <template v-if="!this.newCategory">
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
                    <v-btn dark color="#CD113B" elevation="0" v-on:click="deleteCategory()">
                    OK
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            </v-col>
        </v-row>
        </template>

        <!--
        <template v-if="!this.newCategory">
            <v-row>
                <v-col>
                    <v-btn dark color="#CD113B" elevation="0" block @click="deleteCategory">
                        削除
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        -->

    </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

export default{
    props:['editkey','editcategory','categorysize','backkey','userid'],
    data(){
        return{
            db:null,
            newCategory: true,
            tmpCategory:{
                title:"",
                id:"",
                order: 0
            },
            editindex: Number,
            categorykey:"",
            dialog: false

        }
    },
    created(){
        //console.log("size:"+this.categorysize);
        this.db = firebase.firestore();
    },
    computed: {
      registerButtonColor() {
        return this.newCategory ? "success" : "primary";
      },
      registerButtonName() {
        return this.newCategory ? "登録" : "更新";
      },
    },
    methods:{
        toTodoList(){
          this.$router.push({name:'todolist',params:{sckey: this.backkey}});
        },
        registerCategory(){
            if (this.newCategory) {
                this.addCategory();
            } else {
                this.updateCategory();
            }
        },
        addCategory(){
            if(this.tmpCategory.title === '')return;
            //const categorys = JSON.parse(localStorage.getItem('categorys'))||[];
            this.tmpCategory.id = uuidv4();
            this.categorykey = this.tmpCategory.id;
            this.tmpCategory.order = this.categorysize + 1;
            //categorys.push(this.tmpCategory);
            //localStorage.setItem('categorys',JSON.stringify(categorys));

            this.db.collection('users').doc(this.userid).collection('categorys').doc(this.tmpCategory.id).set(this.tmpCategory);

            this.tmpCategory.title = '';
            this.$router.push({name:'todolist',params:{sckey: this.categorykey}});
        },
        updateCategory(){
            if(this.tmpCategory.title === '')return;
            //const categorys = JSON.parse(localStorage.getItem('categorys'))||[];
            //categorys.splice(this.editindex,1,this.tmpCategory);
            //localStorage.setItem('categorys',JSON.stringify(categorys));

            this.db.collection('users').doc(this.userid).collection('categorys').doc(this.editkey).set(this.tmpCategory);

            this.tmpCategory.title = '';
            this.toTodoList();
        },
        deleteCategory(){
            //const todos = JSON.parse(localStorage.getItem('todos'))||[];
            //const todos = this.db.collection('users').doc(this.userid).collection('todos').get();
            //const newtodos = todos.filter(todo => { return todo.categorykey != this.editkey});
            //localStorage.setItem('todos',JSON.stringify(newtodos));
            
            this.db.collection('users').doc(this.userid).collection('todos').where("categorykey","==",this.editkey).get()
            .then((querySnapshot) => {
            querySnapshot.forEach((todo) => {
                this.db.collection('users').doc(this.userid).collection('todos').doc(todo.id).delete();
                });
            })
            .catch((error) => {
            console.log("Error getting documents: ", error);
            });

            //const categorys = JSON.parse(localStorage.getItem('categorys'))||[];
            //categorys.splice(this.editindex,1);
            //localStorage.setItem('categorys',JSON.stringify(categorys));

            this.db.collection('users').doc(this.userid).collection('categorys').doc(this.editkey).delete();
            
            this.tmpCategory.title = '';
            this.categorykey = '';
            this.$router.push({name:'todolist',params:{sckey: ''}});
        }
    },
    mounted(){
      if(this.editkey){
        //const categorys = JSON.parse(localStorage.getItem('categorys'))||[];
       // this.editindex = categorys.findIndex((item) => item.id == this.editkey);
       // this.tmpCategory = categorys[this.editindex];
        this.tmpCategory = this.editcategory;
        this.categorykey = this.tmpCategory.id;
        this.newCategory = false;
      }
    }
}
</script>
