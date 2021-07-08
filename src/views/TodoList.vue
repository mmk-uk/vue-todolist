<template>
  <v-container>
    <!--  サイドバー  -->
    <v-navigation-drawer  app temporary absolute v-model="drawer" color="#E6DDC6">
        <v-list-item>
          <v-btn text icon @click="drawer = !drawer">
            <v-icon x-large>mdi-greater-than</v-icon>
          </v-btn>
          <v-list-item-title>
            
          </v-list-item-title>
          <v-btn text icon @click="dragModeChange">
            <v-icon x-large>{{dragModeIcon()}}</v-icon>
          </v-btn>

        </v-list-item>

        <v-divider></v-divider>



        
        
        <!--
        <draggable v-bind="categorys" :options="{handle:'.drag'}">
        <template v-for="category in categorys" >
          <v-list-item dense :key="category.id" @click="selectCategory(category.id)">
            <v-list-item-title>{{category.title}}</v-list-item-title>
            <v-list-item-icon class="drag">
              <v-icon>mdi-menu</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
        </draggable>
        -->

        <template v-if="dragmode==true">
          <v-list-item>
            <v-list-item-title>全てのタスク</v-list-item-title>
          </v-list-item>
          <draggable tag="div" v-model="categorys" @update="dragCategory">
          <template v-for="category in categorys" >
            <v-list-item dense :key="category.id">
              <v-list-item-title>{{category.title}}</v-list-item-title>
              <v-list-item-icon class="drag">
                <v-icon>mdi-menu</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
          </draggable>
        </template>

        <template v-else>
          <v-list-item @click="selectAllCategory">
            <v-list-item-title>全てのタスク</v-list-item-title>
          </v-list-item>
          <template v-for="category in categorys" >
            <v-list-item dense :key="category.id" @click="selectCategory(category.id)">
              <v-list-item-title>{{category.title}}</v-list-item-title>
            </v-list-item>
          </template>
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
            <v-col class="pt-2 pb-0">
              <v-btn text icon @click="clickDrawer">
                <v-icon x-large>mdi-menu</v-icon>
              </v-btn>
            </v-col>

            <template v-if="this.selectCategoryKey != ''">
              <v-col cols="2" class="text-right pt-2 pb-0">

              </v-col>
              <v-col cols="2" class="text-right pt-2 pb-0">


              </v-col>
            </template>

      </v-row>
      <v-row class="ma-0 pt-6" align-content="center" style="height:58px">
            <template v-if="archivemode == true">
              <v-col cols="1" class="pa-0 pl-3 pr-3 text-right">
                    <v-row>
                      <v-col class="pa-0 pt-4 text-right">
                          <v-icon large color="black">mdi-check-circle-outline</v-icon>
                      </v-col>
                    </v-row>
              </v-col>
            </template>

            <v-col  class="pa-0 pl-2" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden">

                <span style="font-size:190%;font-weight: 900 ">

                    {{categoryLabel()}}
                </span>
            </v-col>
            <template v-if="this.selectCategoryKey != ''">
                <v-col cols="4" class="pa-0 pr-3 text-right">
                  <v-row>

                    <v-col class="pa-0 pt-4 text-right">
                      <v-btn text icon elevation="0" @click="archiveModeChange">
                        <v-icon x-large>{{archiveModeIcon()}}</v-icon>
                      </v-btn>
                    </v-col>
                    <template  v-if="archivemode == false">
                      <v-col cols="5" sm="3" md="3" lg="1" xl="1" class="pa-0 pt-4 text-right">
                            <v-btn text icon elevation="0" v-on:click="editCategory">
                              <v-icon x-large>mdi-dots-horizontal-circle-outline</v-icon>
                            </v-btn>
                      </v-col>
                    </template>
                  </v-row>

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
        <v-col class="mt-0 pl-0 pr-0">

          <template v-if="selectCategoryKey == ''">

            <template v-for="todo in todos.filter(todo => { return todo.pass == true})">
              <v-row v-bind:key="todo.id" dense>
                <v-col>
                  <Todo :todo="todo" :selectCategoryKey="selectCategoryKey" :categorytitle="checkCategory(todo.categorykey)"></Todo>
                </v-col>
              </v-row>
            </template>
          </template>

          <template v-else>

            <template v-if="archivemode == true">
              <template v-for="todo in todos.filter(todo => { return todo.categorykey == selectCategoryKey && todo.pass == false && todo.done == true}).reverse()">
                <v-row v-bind:key="todo.id" dense>
                  <v-col>
                    <Todo :todo="todo" :selectCategoryKey="selectCategoryKey" :categorytitle="checkCategory(todo.categorykey)"></Todo>
                  </v-col>
                </v-row>
              </template>
            </template>
            <template v-else>
              <template v-for="todo in todos.filter(todo => { return (todo.categorykey == selectCategoryKey && todo.pass == true) || (todo.categorykey == selectCategoryKey && todo.done == false)})">
                <v-row v-bind:key="todo.id" dense>
                  <v-col>
                    <Todo :todo="todo" :selectCategoryKey="selectCategoryKey" :categorytitle="checkCategory(todo.categorykey)"></Todo>
                  </v-col>
                </v-row>
              </template>
            </template>


          </template>
          <v-row>
              <template v-if="this.selectCategoryKey != '' && archivemode == false">
                <v-col class="pa-0 pr-3 text-center">
                        <v-btn text icon elevation="0" v-on:click="addTodo">
                          <v-icon x-large>mdi-plus</v-icon>
                        </v-btn>
                </v-col>
             </template>
          </v-row>

    
        </v-col>
      </v-row>
    

  </v-container>



</template>

<script>
import draggable from 'vuedraggable';
import Todo from "@/components/Todo";

export default {
    props:['sckey'],
    components: {
      draggable,
      Todo
    },
    data(){
        return{
            categorys:[],
            todos:[],
            today:"",
            drawer: false,
            selectCategoryKey:"",
            archivemode:false,
            dragmode:false
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
      },
      today(){
        this.todos.forEach(
          todo => todo.pass = this.checkPass(todo.date)
        );
      },
      drawer(){
        if(this.drawer==false){
          this.dragmode = false;
        }
      }
    },
    methods:{
        clickDrawer(){
          this.drawer = !this.drawer;
          this.archivemode = false;
        },
        editTodo(id){
            //console.log(index);
            localStorage.setItem('todos',JSON.stringify(this.todos));
            this.$router.push({name:'edit',params:{editid: id, selectcategorykey: this.selectCategoryKey, backkey: this.selectCategoryKey}});
        },
        addTodo(){
            localStorage.setItem('todos',JSON.stringify(this.todos));
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
          localStorage.setItem('todos',JSON.stringify(this.todos));
          this.$router.push({name:'makecategory',params:{editkey: '',backkey: this.selectCategoryKey}});
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
          localStorage.setItem('todos',JSON.stringify(this.todos));
          this.$router.push({name:'makecategory',params:{editkey: this.selectCategoryKey,backkey: this.selectCategoryKey}});
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
        },
        archiveModeChange(){
          this.archivemode = !this.archivemode;
        },
        archiveModeIcon(){
          if (this.archivemode == true){
            return "mdi-chevron-left";
          }else{
            return "mdi-archive-outline";
          }
        },
        dragCategory(){
          localStorage.setItem('categorys',JSON.stringify(this.categorys));
        },
        dragModeChange(){
          this.dragmode = !this.dragmode;
        },
        dragModeIcon(){
          if (this.dragmode == true){
            return "mdi-check";
          }else{
            return "mdi-swap-vertical";
          }
        }
        
    }
}
</script>


<style>
  .maru {
  height:50px;
  width:50px;
  border-radius:50%;
  line-height:50px;
  text-align:center;
  }
</style>

