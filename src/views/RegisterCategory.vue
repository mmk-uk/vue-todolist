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
            <v-col class="text-right">
                <v-btn color="success"  @click="addCategory">
                作成
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default{
    data(){
        return{
            tmpCategory:{
                title:"",
                id:""
            }
        }
    },
    methods:{
        toTodoList(){
          this.$router.push("/");
        },
        addCategory(){
            if(this.tmpCategory.title === '')return;
            const categorys = JSON.parse(localStorage.getItem('categorys'))||[];
            this.tmpCategory.id = uuidv4();
            categorys.push(this.tmpCategory);
            localStorage.setItem('categorys',JSON.stringify(categorys));
            this.tmpCategory.title = '';
            this.toTodoList();
        }
    }
}
</script>
