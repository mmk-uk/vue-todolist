<template>
    <v-container>
        <v-row>
            <v-col class="text-center">
                <h1>タスク管理</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col></v-col>
            <v-col class="text-center">
                <v-btn color="primary" @click="toSignup">
                    新規登録
                </v-btn>
            </v-col>
            <v-col class="text-center">
                <v-btn color="primary" @click="toSignin">
                    ログイン
                </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>

        
    </v-container>
</template>

<script>
export default {
    methods:{
        toSignup(){
            this.$router.push('/signup');
        },
        toSignin(){
            this.$router.push('/signin');
        }
    }
}

</script>
