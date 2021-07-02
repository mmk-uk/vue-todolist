<template>
    <v-card>
        <v-card-title>
            {{todo.title}}
        </v-card-title>
        
    </v-card>
</template>

<script>


export default {
    components:{
      TodoList,
    },
    props: ["todo"]
}


</script>
