<template>
  <v-container>
    <!--  サイドバー  -->
    <v-navigation-drawer  app temporary absolute v-model="drawer" color="#E6DDC6">
        <v-list-item>
          <v-list-item-title>
            
          </v-list-item-title>
          <v-btn text icon @click="drawer = !drawer">
            <v-icon x-large>mdi-greater-than</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item @click="selectAllCategory">
          <v-list-item-title>全てのタスク</v-list-item-title>
        </v-list-item>

        <template v-for="category in this.categorys" >
          <v-list-item dense :key="category.id" @click="selectCategory(category.id)">
            <v-list-item-title>{{category.title}}</v-list-item-title>
          </v-list-item>
        </template>
        
        <v-row>
          <v-col class="text-center">
            <v-btn text icon @click="mekeCategory">
              <v-icon>mdi-plus-thick</v-icon>
            </v-btn>
          </v-col>
        </v-row>

      </v-navigation-drawer>

      <!--  上部分  -->
      <v-row align="center" >
            <v-col class="pt-2 pb-2">
              <v-btn text icon @click="drawer = !drawer">
                <v-icon x-large>mdi-less-than</v-icon>
              </v-btn>
            </v-col>

            <template v-if="this.selectCategoryKey != ''">
              <v-col class="text-right pt-2 pb-2">
                    <v-btn text icon elevation="0" v-on:click="editCategory">
                      <v-icon x-large>mdi-dots-horizontal-circle-outline</v-icon>
                    </v-btn>

              </v-col>
            </template>

      </v-row>
      <v-row align="start">
            <v-col  class="pa-0 pl-6">
                  <h1>
                    {{categoryLabel()}}
                  </h1>
            </v-col>
            <template v-if="this.selectCategoryKey != ''">
                <v-col cols="2" class="pa-0 pr-3 text-right">
                        <v-btn text icon elevation="0" v-on:click="addTodo">
                          <v-icon x-large>mdi-plus-circle-outline</v-icon>
                        </v-btn>
                </v-col>
             </template>

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
      <v-row class="ma-0">
        <v-col class="mt-3">

          <template v-if="selectCategoryKey == ''">

            <template v-for="todo in todos">
              <v-row v-bind:key="todo.id" dense>
                <v-col>
                  <Todo :todo="todo" :selectCategoryKey="selectCategoryKey" :categorytitle="checkCategory(todo.categorykey)"></Todo>
                </v-col>
              </v-row>
            </template>
          </template>

          <template v-else>
            <template v-for="todo in todos.filter(todo => { return todo.categorykey == selectCategoryKey})">
              <v-row v-bind:key="todo.id" dense>
                <v-col>
                  <Todo :todo="todo" :selectCategoryKey="selectCategoryKey" :categorytitle="checkCategory(todo.categorykey)"></Todo>
                </v-col>
              </v-row>
            </template>
          </template>

    
        </v-col>
      </v-row>


      
      
    

  </v-container>
  

</template>

<script>
import Todo from "@/components/Todo";

export default {
    props:['sckey'],
    components: {
      Todo
    },
    data(){
        return{
            categorys:[],
            todos:[],
            today:"",
            drawer: false,
            selectCategoryKey:""
        }
    },
    created(){
        //localStorage.clear('categorys');
        //localStorage.clear('todos');
        this.categorys = JSON.parse(localStorage.getItem('categorys')) || [];
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todos.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        this.today = new Date();
        //this.selectCategoryKey = "";
        
        
        this.todos.forEach(
          todo => todo.leftdays = this.deadlineDays(this.today,todo.date)
        );
        localStorage.setItem('todos',JSON.stringify(this.todos));

    },
    mounted(){
        if (this.sckey){
          this.selectCategoryKey = this.sckey;
         //this.todos = this.todos.filter(todo => { return todo.categorykey == this.selectCategoryKey});
        }
    },
    watch:{
      selectCategoryKey(){
        localStorage.setItem('todos',JSON.stringify(this.todos));
      }
    },
    methods:{
        editTodo(id){
            //console.log(index);
            this.$router.push({name:'edit',params:{editid: id, selectcategorykey: this.selectCategoryKey, backkey: this.selectCategoryKey}});
        },
        addTodo(){
            this.$router.push({name:'create',params:{selectcategorykey: this.selectCategoryKey, backkey: this.selectCategoryKey}});
        },
        deadlineDays(today,dueday){
          const today2  = new Date(today.getFullYear(),today.getMonth(),today.getDate());
          const dueday2 = new Date(dueday);
          const dueday3 = new Date(dueday2.getFullYear(),dueday2.getMonth(),dueday2.getDate());
          const termDay = (dueday3 - today2) / 86400000;
          return termDay;
        },
        mekeCategory(){
          this.$router.push('/makecategory');
        },
        categoryLabel(){
          if (this.selectCategoryKey == ""){
            return "全てのタスク";
          }else{
            const index = this.categorys.findIndex((item) => item.id == this.selectCategoryKey);
            return this.categorys[index].title;
          }
        },
        selectCategory(id){
          this.selectCategoryKey = id;
          this.drawer = false;
        },
        selectAllCategory(){
          this.selectCategoryKey = "";
          this.drawer = false;
        },
        checkCategory(key){
          const index = this.categorys.findIndex((item) => item.id == key);
          return this.categorys[index].title;
        },
        editCategory(){
          this.$router.push({name:'makecategory',params:{editkey: this.selectCategoryKey}});
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
