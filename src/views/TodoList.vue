<template>
  <v-container style="max-width:1000px">
    <!--  サイドバー  -->
    <v-navigation-drawer app  clipped  v-model="drawer" color="#FFFFFF">
      <v-list class="pa-0">
        <template v-if="widthGet() < 1264">
          <v-app-bar flat color="#2E4C6D" dark style="height:100px">
          </v-app-bar>
        </template>
        <template v-else>
          <v-app-bar flat color="#2E4C6D" dark style="height:40px">
          </v-app-bar>
        </template>
        <!--
        <v-list-item style="background-color:#A19882;height:64px">
        </v-list-item>
        -->
        <v-list-item>

          <v-list-item-title>
            <strong>カテゴリ</strong>
          </v-list-item-title>

          <v-btn text icon @click="drawer = !drawer">
            <v-icon x-large>mdi-less-than</v-icon>
          </v-btn>

        </v-list-item>

        <v-divider></v-divider>

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
            <v-list-item dense :key="category.id" @click="selectCategory(category.title,category.id)">
              <v-list-item-title>{{category.title}}</v-list-item-title>
              <div class="maru">
                <span>{{ todos.filter(todo => { return todo.categorykey == category.id && todo.pass == true}).length}}</span>
              </div>
            </v-list-item>
          </template>
        </template>





        
        <v-list-item>
          <v-row>
            <template v-if="dragmode==false">
              <v-col class="pt-1 text-left">
                <v-btn text icon @click="mekeCategory">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </template>
            <v-col class="pt-1 text-right">
              <v-btn text icon @click="dragModeChange">
                <v-icon>{{dragModeIcon()}}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
        </v-list>
      

        <!--
        <v-list-item style="position: fixed;bottom:0">
          <v-row>
            <v-col class="text-center">
              <v-btn dark elevation="0" block color="#CD113B" @click="logout">
                ログアウト
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
        -->

        



        

        <div class="bottom-center text-center">
            <v-btn dark elevation="0" color="#CD113B" @click="logout">
                ログアウト
            </v-btn>
        </div>

     
        




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
                <span style="font-size:190%;font-weight: 900">
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

      <!--  Todo表示  -->


      <v-row class="ma-0">
        <v-col class="mt-0 pl-0 pr-0">

          <template v-if="selectCategoryKey == ''">

            <template v-for="(todo,index) in todos.filter(todo => { return (todo.pass == true) || (todo.pass == false && todo.done == false)})">
              <v-row v-bind:key="todo.id" dense align="end">
                <v-col>
                  <template v-if="index==0">
                    <v-row style="height:30px">
                      <v-col>
                        <span style="font-weight: bold;font-size:90%">{{getYear(todo.date)}}/{{getMonth(todo.date)}}</span>
                      </v-col>
                    </v-row>
                  </template>
                  <template v-else-if="getMonth(todo.date) != getMonth(todos.filter(todo => { return (todo.pass == true) || (todo.pass == false && todo.done == false)})[index-1].date)">
                    <v-row style="height:30px">
                      <v-col>
                        <span style="font-weight: bold;font-size:100%">{{getYear(todo.date)}}/{{getMonth(todo.date)}}</span>
                      </v-col>
                    </v-row>
                  </template>
                  <v-row align="center">
                    <v-col cols="1">
                      <v-card outlined elevation="0" height="50px" max-width="65px" style="background-color:rgba(0,0,0,0);border:0px solid ;margin:auto;border-radius:8px;">
                      <v-container>
                      <v-row align="end">
                        <v-col class="text-center pa-0">
                          <span style="font-weight: bold">{{getDate(todo.date)}}</span>
                        </v-col>
                      </v-row>
                      <v-row align="start">
                        <v-col class="text-center pa-0">
                          <span style="font-size:70%">({{getYoubi(todo.date)}})</span>
                        </v-col>
                      </v-row>
                      </v-container>
                      </v-card>
                    </v-col>
                    <v-col cols="11">
                      <Todo :todo="todo" :selectCategoryKey="selectCategoryKey" :categorytitle="checkCategory(todo.categorykey)" :userid="userid" :db="db"></Todo>
                    </v-col>
                  </v-row>
                </v-col>



              </v-row>
            </template>
          </template>

          <template v-else>

            <template v-if="archivemode == true">
              <template v-for="(todo,index) in todos.filter(todo => { return todo.categorykey == selectCategoryKey && todo.pass == false && todo.done == true}).reverse()">
                <v-row v-bind:key="todo.id" dense>
                  <v-col>
                    <template v-if="index==0">
                      <v-row style="height:30px">
                        <v-col>
                          <span style="font-weight: bold;font-size:100%">{{getYear(todo.date)}}/{{getMonth(todo.date)}}</span>
                        </v-col>
                      </v-row>
                    </template>
                    <template v-else-if="getMonth(todo.date) != getMonth(todos.filter(todo => { return (todo.pass == true) || (todo.pass == false && todo.done == false)})[index-1].date)">
                      <v-row style="height:30px">
                        <v-col>
                          <span style="font-weight: bold;font-size:100%">{{getYear(todo.date)}}/{{getMonth(todo.date)}}</span>
                        </v-col>
                      </v-row>
                    </template>
                    <v-row align="center">
                       <v-col cols="1">
                        <v-card outlined elevation="0" height="50px" max-width="65px" style="background-color:rgba(0,0,0,0);border:0px solid ;margin:auto;border-radius:8px;">
                        <v-container>
                        <v-row align="end">
                          <v-col class="text-center pa-0">
                            <span style="font-weight: bold">{{getDate(todo.date)}}</span>
                          </v-col>
                        </v-row>
                        <v-row align="start">
                          <v-col class="text-center pa-0">
                            <span style="font-size:70%">({{getYoubi(todo.date)}})</span>
                          </v-col>
                        </v-row>
                        </v-container>
                        </v-card>
                      </v-col>
                      <v-col cols="11">
                        <Todo :todo="todo" :selectCategoryKey="selectCategoryKey" :categorytitle="checkCategory(todo.categorykey)" :userid="userid" :db="db"></Todo>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </template>
            </template>
            <template v-else>
              <template v-for="(todo,index) in todos.filter(todo => { return (todo.categorykey == selectCategoryKey && todo.pass == true) || (todo.categorykey == selectCategoryKey && todo.pass == false && todo.done == false)})">
                <v-row v-bind:key="todo.id" dense>
                  <v-col>
                    <template v-if="index==0">
                      <v-row style="height:30px">
                        <v-col>
                          <span style="font-weight: bold;font-size:100%">{{getYear(todo.date)}}/{{getMonth(todo.date)}}</span>
                        </v-col>
                      </v-row>
                    </template>
                    <template v-else-if="getMonth(todo.date) != getMonth(todos.filter(todo => { return (todo.pass == true) || (todo.pass == false && todo.done == false)})[index-1].date)">
                      <v-row style="height:30px">
                        <v-col>
                          <span style="font-weight: bold;font-size:100%">{{getYear(todo.date)}}/{{getMonth(todo.date)}}</span>
                        </v-col>
                      </v-row>
                    </template>
                    <v-row align="center">
                       <v-col cols="1">
                        <v-card outlined elevation="0" height="50px" max-width="65px" style="background-color:rgba(0,0,0,0);border:0px solid ;margin:auto;border-radius:8px;">
                        <v-container>
                        <v-row align="end">
                          <v-col class="text-center pa-0">
                            <span style="font-weight: bold">{{getDate(todo.date)}}</span>
                          </v-col>
                        </v-row>
                        <v-row align="start">
                          <v-col class="text-center pa-0">
                            <span style="font-size:70%">({{getYoubi(todo.date)}})</span>
                          </v-col>
                        </v-row>
                        </v-container>
                        </v-card>
                      </v-col>
                      <v-col cols="11">
                        <Todo :todo="todo" :selectCategoryKey="selectCategoryKey" :categorytitle="checkCategory(todo.categorykey)" :userid="userid" :db="db"></Todo>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </template>
            </template>


          </template>
          <!--
          <v-row>
              <template v-if="this.selectCategoryKey != '' && archivemode == false">
                <v-col class="pa-0 pr-3 text-center">
                        <v-btn text icon elevation="0" v-on:click="addTodo">
                          <v-icon x-large>mdi-plus</v-icon>
                        </v-btn>
                </v-col>
             </template>
          </v-row>
          -->
        </v-col>
      </v-row>
      
      <template v-if="this.selectCategoryKey != '' && archivemode == false">
        <div class="bottom-right" elevation="0" v-on:click="addTodo">
          <v-btn fab color="#2E4C6D">
            <v-icon x-large color="white">mdi-plus</v-icon>
          </v-btn>
        </div>
       </template>
    

  </v-container>



</template>

<script>
import draggable from 'vuedraggable';
import Todo from "@/components/Todo";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
    props:['sckey'],
    components: {
      draggable,
      Todo
    },
    data(){
        return{
            userid:"",
            db:null,
            categorys:[],
            todos:[],
            today:"",
            drawer: false,
            selectCategoryKey:"",
            selectCategoryTitle:"",
            archivemode:false,
            dragmode:false
        }
    },
    created(){
         const userinfo = JSON.parse(localStorage.getItem('userinfo')) || [];
         console.log("ID:"+userinfo);
         this.userid = userinfo.userid;
        

        //localStorage.clear('categorys');
        //localStorage.clear('todos');
        this.db = firebase.firestore();




        //this.categorys = JSON.parse(localStorage.getItem('categorys')) || [];
        /*
        this.db.collection('users').doc(this.userid).collection('categorys').get()
        .then((querySnapshot) => {
            console.log("カテゴリ");
            querySnapshot.forEach((category) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(category.id, " => ", category.data());
                this.categorys.push(category.data());
            });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
        //console.log(this.categorys);

        //this.todos = JSON.parse(localStorage.getItem('todos')) || [];
       // const todosSnapshot = this.db.collection('users').doc(this.userid).collection('todos').orderBy("date").get() || [];
        this.db.collection('users').doc(this.userid).collection('todos').get()
        .then((querySnapshot) => {
            console.log("Todo");
            querySnapshot.forEach((todo) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(todo.id, " => ", todo.data());
                this.todos.push(todo.data());
            });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
        */

        //console.log(this.todos);

        //console.log(this.todos);

        //this.todos.sort(function (a, b) {
        //  return new Date(a.date) - new Date(b.date);
        //});
        this.today = new Date();
       
        //this.selectCategoryKey = "";
        
        //this.todos.forEach(
        //  todo => todo.leftdays = this.deadlineDays(this.today,todo.date)
        //);
        //localStorage.setItem('todos',JSON.stringify(this.todos));

    },
    mounted(){

        this.db.collection('users').doc(this.userid).collection('categorys')
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const doc = change.doc
            // 変更されたレコードの配列上のインデックス番号を特定する
            // 配列のfindIndexで、tasks配列のうち task.id プロパティがchange.doc.idと同じもののIndex番号を取得
            const index = this.categorys.findIndex(task => task.id === change.doc.id)
            // タスクが追加された時、tasks配列に追加
            if (change.type === 'added') {
              this.categorys.push({id: doc.data().id, title:doc.data().title, order:doc.data().order});
              this.categorys.sort(function (a, b) {
                return new Date(a.order) - new Date(b.order);
              });
            }
            //if (change.type === 'modified'){

           // }
            // タスクが削除された時、tasks配列を削除
            if (change.type === "removed") {
              this.categorys.splice(index, 1)
            }
          })
        })

        

        this.db.collection('users').doc(this.userid).collection('todos')
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const doc = change.doc
            // 変更されたレコードの配列上のインデックス番号を特定する
            // 配列のfindIndexで、tasks配列のうち task.id プロパティがchange.doc.idと同じもののIndex番号を取得
            const index = this.categorys.findIndex(task => task.id === change.doc.id)



            // タスクが追加された時、tasks配列に追加
            if (change.type === 'added') {
              const todo = {id: doc.data().id, 
                   categorykey:doc.data().categorykey,
                   title:doc.data().title,
                   date:doc.data().date,
                   done:doc.data().done,
                   pass:doc.data().pass,
                   leftdays:this.deadlineDays(this.today,doc.data().date)}

              const passdue = this.checkPass(todo.date);
              if(!passdue){
                //console.log("過ぎてる");
                todo.pass = false;
                this.db.collection('users').doc(this.userid).collection('todos').doc(todo.id).set(todo);
              }

              this.todos.push(todo);

              this.todos.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
              });
            }
            // タスクが削除された時、tasks配列を削除
            if (change.type === "removed") {
              this.todos.splice(index, 1);
            }
          })
        })


        




        if (this.sckey){
          this.selectCategoryKey = this.sckey;
          //console.log(this.sckey);
          //console.log(this.db.collection('users').doc(this.userid).collection('categorys').doc(this.sckey).get().data());
         



          
          //this.selectCategoryTitle = this.db.collection('users').doc(this.userid).collection('categorys').doc(this.sckey).get().title;
          //console.log("categorytitle:"+this.selectCategoryTitle);
          //this.todos = this.todos.filter(todo => { return todo.categorykey == this.selectCategoryKey});
        }

        




    },
    watch:{
      selectCategoryKey(){
        //localStorage.setItem('todos',JSON.stringify(this.todos));
      },
      today(){
        this.todos.forEach(
          todo => {
            const passdue = this.checkPass(todo.date);
              if(!passdue){
                console.log("過ぎてる")
                todo.pass = false;
                this.db.collection('users').doc(this.userid).collection('todos').doc(todo.id).set(todo);
              }
            }
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
            //localStorage.setItem('todos',JSON.stringify(this.todos));
            this.$router.push({name:'edit',params:{editid: id,selectcategorytitle: this.selectCategoryTitle ,selectcategorykey: this.selectCategoryKey, backkey: this.selectCategoryKey,userid: this.userid}});
        },
        addTodo(){
            //localStorage.setItem('todos',JSON.stringify(this.todos));
            this.$router.push({name:'create',params:{selectcategorytitle: this.selectCategoryTitle ,selectcategorykey: this.selectCategoryKey, backkey: this.selectCategoryKey,userid: this.userid}});
        },
        deadlineDays(today,dueday){
          const today2  = new Date(today.getFullYear(),today.getMonth(),today.getDate());
          const dueday2 = new Date(dueday);
          const dueday3 = new Date(dueday2.getFullYear(),dueday2.getMonth(),dueday2.getDate());
          const termDay = (dueday3 - today2) / 86400000;
          return termDay;
        },
        mekeCategory(){
          //localStorage.setItem('todos',JSON.stringify(this.todos));
          this.$router.push({name:'makecategory',params:{editkey: '',categorysize:this.categorys.length,backkey: this.selectCategoryKey,userid: this.userid}});
        },
        categoryLabel(){
          if (this.selectCategoryKey == ""){
            return "全てのタスク";
          }else{
            try{
              const index = this.categorys.findIndex((item) => item.id == this.selectCategoryKey);

              //console.log("タイトル："+this.categorys[index].title);
              //console.log("カテゴリ："+this.categorys);

              this.selectCategoryTitle = this.categorys[index].title;

              return this.categorys[index].title;
            }catch(e){
              console.log(e);
            }

            //const index = this.categorys.findIndex((item) => item.id == this.selectCategoryKey);
            //return this.categorys[index].title;
            //console.log(this.categorys);


            //console.log("カテゴリ："+this.selectCategoryTitle)
            //return this.selectCategoryTitle;
            
            //return this.db.collection('users').doc(this.userid).collection('categorys').doc(this.selectCategoryKey).get().title;

          }
        },
        selectCategory(title,id){
          this.selectCategoryTitle = title;
          this.selectCategoryKey = id;
          this.drawer = false;
        },
        selectAllCategory(){
          this.selectCategoryKey = "";
          this.drawer = false;
        },
        checkCategory(key){
          const index = this.categorys.findIndex((item) => item.id == key);
          try{
              return this.categorys[index].title;
          }catch(e){
              console.log(e);
            }
        },
        editCategory(){
          //localStorage.setItem('todos',JSON.stringify(this.todos));
          const editindex = this.categorys.findIndex((item) => item.id == this.selectCategoryKey);
          const category = this.categorys[editindex];
          this.$router.push({name:'makecategory',params:{editkey: this.selectCategoryKey,editcategory: category,backkey: this.selectCategoryKey,userid: this.userid}});
        },
        checkPass(date){
          const today2  = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate());
          const date2 = new Date(date);
          const date3 = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate());
          if ((date3 - today2) < 0){
            return false; //過ぎてる
          }else{
            return true; //余裕あり
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
          //localStorage.setItem('categorys',JSON.stringify(this.categorys));
          this.categorys.forEach((category) => {
              category.order = this.categorys.indexOf(category) + 1;
            }
          )

        },
        dragModeChange(){
          if (this.dragmode == true){
            this.dragmode = false;
            this.categorys.forEach((category) => {
              this.db.collection('users').doc(this.userid).collection('categorys').doc(category.id).set(category);
            }
            )
          }else{
            this.dragmode = true;
          }
         
        },
        dragModeIcon(){
          if (this.dragmode == true){
            return "mdi-check";
          }else{
            return "mdi-swap-vertical";
          }
        },
        logout() {
            firebase.auth().signOut();
            localStorage.clear('userinfo');
            this.$router.push("/");
        },
        widthGet(){
          return window.innerWidth;
        },
        getYear(date){
            let dateAry = date.split('-');
            return dateAry[0];
        },
        getMonth(date){
            let dateAry = date.split('-');
            return dateAry[1];
        },
        getDate(date){
            let dateAry = date.split('-');
            return dateAry[2];
        },
        getYoubi(date){
            let dateAry = date.split('-');
            var nichi = new Date(dateAry[0],dateAry[1]-1,dateAry[2]);
            var dayOfWeekStrJP = [ "日", "月", "火", "水", "木", "金", "土" ] ;

            return dayOfWeekStrJP[nichi.getDay()];
        }
        
        
    }
}
</script>

<style scoped>
    .bottom-center{
        position: fixed;
        bottom: 15px;
        right: 2px;
        left: 2px;
    }

    .maru {
    height:20px;
    width:20px;
    border-radius:50%;
    line-height:20px;
    text-align:center;
    background:#2E4C6D;
    font-size:10px;
    color:#FFFFFF;
    }

    .bottom-right{
        position: fixed;
        bottom: 15px;
        right: 15px;
    }
</style>