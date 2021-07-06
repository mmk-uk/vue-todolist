<template>
    <v-card outlined :color="cardColor(todo)" :style="textColor(todo)">
        <v-container>

        <v-row align="center" >
            <v-col cols="2" sm="2" md="1" lg="1" xl="1" class="text-center pa-1">
                
                <v-row>
                    <v-col class="text-center pa-0" style="font-size:70%">
                            あと
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-center pa-0">
                            <span style="font-size:105%;text-align: right">{{todo.leftdays}}</span>
                            <span style="font-size:80%">日</span>
                    </v-col>
                </v-row>
                
                <!--
                <v-row>
                    <v-col class="pa-0">
                        <v-btn text icon color="#5D534A" @click="doneTodo(todo)">
                            <v-icon>{{ doneIcon(todo) }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                -->


            </v-col>

            <v-col cols="8" sm="8" md="10" lg="10" xl="10">
                <template v-if="selectCategoryKey == ''">
                    <v-row>
                        <font size="-2">
                            {{ categorytitle }}
                        </font>
                    </v-row>
                </template>
                <v-row>
                    {{todo.title}}
                </v-row>
            </v-col>

            <v-col cols="2" sm="2" md="1" lg="1" xl="1" class="text-right">
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
                    <v-col class="pa-0 text-right">
                        <v-btn text icon color="#5D534A" @click="doneTodo(todo)">
                            <v-icon>{{ doneIcon(todo) }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="pa-0 text-right">
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
    props: ["todo","selectCategoryKey","categorytitle"],
    methods:{
        doneTodo(todo){
          todo.done = !todo.done;
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
            this.$router.push({name:'edit',params:{editid: id, selectcategorykey: todo.categorykey, backkey: this.selectCategoryKey}});

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
        }
    }
        
}


</script>
