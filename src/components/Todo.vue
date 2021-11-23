<template>
    <v-card outlined :color="cardColor(todo)" :style="textColor(todo)" style="border-radius:6px;">
        <v-container>
            <!--
        
        <v-row style="height:12px">
            <v-col style="font-size:70%;padding:5px 8px">
                {{getYear(todo.date)}}/{{getMonth(todo.date)}}/{{getDate(todo.date)}}
            </v-col>
        </v-row>

         -->
        
        <v-row align="center" style="margin:-13px">
            <!--
            <v-col cols="1" sm="1" md="1" lg="1" xl="1" class="text-center pl-2 pr-2">
                <v-row>
                    <v-col class="text-center pa-0 mt-1" style="font-size:70%">
                        {{getYear(todo.date)}}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-center pa-0" style="font-size:70%">
                        {{getMonth(todo.date)}}/{{getDate(todo.date)}}
                    </v-col>
                </v-row>
            </v-col>
            -->
            <v-col cols="2" sm="1" md="1" lg="1" xl="1" class="text-center pl-2 pr-2" style="background-color:rgba(0,0,0,0);border-radius:5px">
                <v-card outlined elevation="0" height="50px" max-width="65px" style="background-color:rgba(0,0,0,0);border:0px solid ;margin:auto;border-radius:8px;">
                <v-container>
                
                <template v-if="todo.leftdays < 0">

                    <v-row>
                        <v-col class="text-center pa-0">
                                <span style="font-size:105%;text-align: right">{{-todo.leftdays}}</span>
                                <span style="font-size:80%">日</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-center pa-0" style="font-size:70%">
                                経過
                        </v-col>
                    </v-row>
                </template>
                <template v-else-if="todo.leftdays == 0">
                    <v-row>
                        <v-col class="text-center pa-0" style="font-size:105%">
                                今日
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-center pa-0"  style="font-size:80%">
                                まで
                        </v-col>
                    </v-row>
                </template>
                <template v-else-if="todo.leftdays == 1">
                    <v-row>
                        <v-col class="text-center pa-0" style="font-size:105%">
                                明日
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col class="text-center pa-0"  style="font-size:80%">
                                まで
                        </v-col>
                    </v-row>
                </template>
                <template v-else>
                    <v-row>
                        <v-col class="text-center pa-0 mt-1" style="font-size:70%">
                                あと
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-center pa-0">
                                <template v-if="todo.leftdays<100 && todo.leftdays > -100">
                                    <span style="font-size:105%;text-align: right">{{todo.leftdays}}</span>
                                </template>
                                <template v-else>
                                    <span style="font-size:85%;text-align: right">{{todo.leftdays}}</span>
                                </template>
                                
                                <span style="font-size:80%">日</span>
                        </v-col>
                    </v-row>
                </template>
                </v-container>
                </v-card>

            </v-col>

            <v-col cols="9" sm="10" md="10" lg="10" xl="10" style="padding:0px 0px 0px 15px">

                <template v-if="selectCategoryKey == ''">
                    
                    <v-row class="pt-2">
                        <span style="font-size:110%">
                            {{todo.title}}
                        </span>
                    </v-row>
                    <v-row class="pt-1 pb-2">
                        <span style="font-size:80%; opacity: 0.7">
                            {{ categorytitle }}
                        </span>
                    </v-row>
                </template>
                <template v-else>
                    <v-row>
                        <span style="font-size:110%">
                            {{todo.title}}
                        </span>
                    </v-row>
                </template>

            </v-col>

            <v-col cols="1" sm="1" md="1" lg="1" xl="1" class="text-right" style="padding:5px">
            <!--
            <v-btn text icon v-on:click="editTodo(todo.id)">
                <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
            -->
            <!--
            <template v-if="selectCategoryKey != ''">
                <v-row>
                    <v-col class="pa-0 text-right">
                        <v-btn text icon color="#5D534A" @click="doneTodo(todo)">
                            <v-icon>{{ doneIcon(todo) }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="pa-0 text-right">
                        <v-btn text icon v-on:click="editTodo(todo.id)">
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </template>
            <template v-else>
                <v-row>
                    <v-col class="text-right">
                        <v-btn text icon color="#5D534A" @click="doneTodo(todo)">
                            <v-icon>{{ doneIcon(todo) }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </template>
            -->
                <v-row>
                    <v-col class="pa-0 text-center">
                        <v-btn text icon color="#5D534A" @click="doneTodo(todo)">
                            <v-icon>{{ doneIcon(todo) }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="pa-0 text-center">
                        <v-btn text icon v-on:click="editTodo(todo,todo.id)">
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

            
            </v-col>
        </v-row>
        </v-container>
    </v-card>
</template>

<script>


export default {
    props: ["todo","selectCategoryKey","categorytitle","userid","db"],
    methods:{
        doneTodo(todo){
          todo.done = !todo.done;
          this.db.collection('users').doc(this.userid).collection('todos').doc(todo.id).set(todo);
          //localStorage.setItem('todos',JSON.stringify(this.todos));
        },
        doneIcon(todo){
            return todo.done
            ? "mdi-checkbox-marked-outline"
            : "mdi-checkbox-blank-outline";
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
        textColor(todo){
            if (todo.done) {
                return "opacity: 0.7";
            }else{
                return "opacity: 1";
            }
        },
        editTodo(todo,id){
            console.log(this.selectCategoryKey);
            this.$router.push({name:'edit',params:{editid: id,edittodo:todo,selectcategorytitle: this.categorytitle ,selectcategorykey: todo.categorykey, backkey: this.selectCategoryKey, userid: this.userid}});

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
        }
    }
        
}


</script>
