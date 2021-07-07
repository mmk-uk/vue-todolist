<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field v-model="tmpCategory.title" placeholder="カテゴリ名"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn text class="pa-0" @click="toTodoList">
                    <v-icon left>mdi-less-than</v-icon> キャンセル
                </v-btn>       
            </v-col>
            <template v-if="!this.newCategory">
                <v-col cols="3" class="text-right">
                    <v-btn dark color="#CD113B" elevation="0" @click="deleteCategory">
                        削除
                    </v-btn>
                </v-col>
            </template>
            <v-col cols="3" class="text-right">

                <v-btn :color="registerButtonColor"  @click="registerCategory">
                {{registerButtonName}}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default{
    props:['editkey','backkey'],
    data(){
        return{
            newCategory: true,
            tmpCategory:{
                title:"",
                id:""
            },
            editindex: Number,
            categorykey:""

        }
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
          this.$router.push({name:'TodoList',params:{sckey: this.backkey}});
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
            const categorys = JSON.parse(localStorage.getItem('categorys'))||[];
            this.tmpCategory.id = uuidv4();
            this.categorykey = this.tmpCategory.id;
            categorys.push(this.tmpCategory);
            localStorage.setItem('categorys',JSON.stringify(categorys));
            this.tmpCategory.title = '';
            this.$router.push({name:'TodoList',params:{sckey: this.categorykey}});
        },
        updateCategory(){
            if(this.tmpCategory.title === '')return;
            const categorys = JSON.parse(localStorage.getItem('categorys'))||[];
            categorys.splice(this.editindex,1,this.tmpCategory);
            localStorage.setItem('categorys',JSON.stringify(categorys));

            this.tmpCategory.title = '';
            this.toTodoList();
        },
        deleteCategory(){
            const todos = JSON.parse(localStorage.getItem('todos'))||[];
            const newtodos = todos.filter(todo => { return todo.categorykey != this.editkey});
            localStorage.setItem('todos',JSON.stringify(newtodos));
            console.log(todos);

            const categorys = JSON.parse(localStorage.getItem('categorys'))||[];
            categorys.splice(this.editindex,1);
            localStorage.setItem('categorys',JSON.stringify(categorys));
            console.log(categorys);

            this.tmpCategory.title = '';
            this.categorykey = '';
            this.toTodoList();
        }
    },
    mounted(){
      if(this.editkey){
        const categorys = JSON.parse(localStorage.getItem('categorys'))||[];
        this.editindex = categorys.findIndex((item) => item.id == this.editkey);
        this.tmpCategory = categorys[this.editindex];
        this.categorykey = this.tmpCategory.id;
        this.newCategory = false;
      }
    }
}
</script>
