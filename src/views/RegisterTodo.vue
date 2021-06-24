<template>

    <div>
        <v-text-field v-model="newTodo" placeholder="Input here..."></v-text-field>
        <v-btn dark color="indigo" v-on:click="addTodo()" class="white--text">ADD</v-btn>
        <router-link to="/">
          <v-icon>arrow_back</v-icon>
        </router-link>
    </div>

</template>

<script>
export default {
    data(){
        return {
            newTodo:''
        }
    },
    methods:{
        addTodo(){
            if(this.newTodo === '')return;
            const todos = JSON.parse(localStorage.getItem('todos'))||[];
            todos.push(this.newTodo);
            localStorage.setItem('todos',JSON.stringify(todos));
            this.newTodo = '';
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