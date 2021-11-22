<template>
    <v-container>
        <v-row>
            <v-col>
                
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-img
                :src="require('../assets/AppLogo2.jpg')"
                class="my-3"
                contain
                height="300"
                />
            </v-col>
        </v-row>
        <v-row style="height:100px">
            <v-col class="text-center">
                <h1>タスク管理アプリ</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col></v-col>
            <v-col class="text-center" >
                <v-btn dark color="#2E4C6D" @click="toSignup">
                    新規登録
                </v-btn>
            </v-col>
            <v-col class="text-center">
                <v-btn dark color="#2E4C6D" @click="toSignin">
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
