<template>
    <v-container>
        <v-row>
            <v-col class="text-center">
                <v-card color="#FEF7DC">
                    <v-card-title>
                        <h2>ログイン</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="mdi-account-circle" label="メールアドレス" v-model="email"/>
                            <v-text-field prepend-icon="mdi-lock" label="パスワード" v-model="password" />
                            <v-card-actions class="pa-0">
                                <v-btn text class="pl-0" @click="backHome">
                                    <v-icon left>mdi-less-than</v-icon>キャンセル
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn dark color="#A19882" @click="signIn">
                                    ログイン
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

export default {
    name: 'home',
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        signIn() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    // サインインに成功したユーザーのUIDをパラメータにして、Todo画面に遷移
                    // パラメータについては、router.js参照
                    this.$router.push({ name: 'todolist', params: {userid: user.user.uid }})
                })
                .catch(error => {
                    alert(error.message)
                })
        },
        backHome(){
            this.$router.push('/');
        }
    }
};
</script>