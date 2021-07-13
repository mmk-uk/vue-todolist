<template>
    <v-container>
        <v-row>
            <v-col>

            </v-col>
        </v-row>
        <v-row>
            <v-col class="pb-0">
                <v-alert v-model="alert" :type="alerttype()" dismissible>
                    <span style="font-size:90%">
                    {{alertmessage}}
                    </span>
                </v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center pt-0">
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
        <v-row align="center">
            <v-col class="text-center" style="height:100px">
                <v-btn text @click="toReset">
                    パスワードを忘れた
                </v-btn>
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
    props:['sendmail'],
    data() {
        return {
            email: "",
            password: "",
            alert: false,
            alertmessage:""
        };
    },
    created(){
        if(this.sendmail){
            this.alertmessage = this.sendmail;
            this.alert = true;
           // this.sendmail = null;
        }
        

    },
    methods: {
        signIn() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    // サインインに成功したユーザーのUIDをパラメータにして、Todo画面に遷移
                    // パラメータについては、router.js参照
                    localStorage.setItem('userinfo',JSON.stringify({userid: user.user.uid}));
                    this.$router.push('/todolist');
                })
                .catch(error => {
                    this.sendmail = null;
                    if(error.code == "auth/invalid-email"){
                        this.alertmessage = "メールアドレスが間違っています。"
                    }else if(error.code == "auth/wrong-password"){
                        this.alertmessage = "パスワードが間違っています。"
                    }else{
                        this.alertmessage = "エラー！"
                    }
                    
                    this.alert = true;
                })
        },
        backHome(){
            this.$router.push('/');
        },
        toReset(){
            this.$router.push('/reset');
        },
        alerttype(){
            if(this.sendmail){
                return "success";
            }else{
                return "error";
            }
        }
    }
};
</script>