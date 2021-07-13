<template>
    <v-container>
        <v-row>
            <v-col>

            </v-col>
        </v-row>
        <v-row>
            <v-col class="pb-0">
                <v-alert v-model="alert" type="error" dismissible>
                    <span style="font-size:90%">
                    {{alertmessage}}
                    </span>
                </v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <v-card color="#FEF7DC">
                    <v-card-title>
                        <h2>新規登録</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="mdi-account-circle" label="メールアドレス" v-model="email" :rules="[rules.email]" />
                            <v-text-field prepend-icon="mdi-lock" label="パスワード(半角英数字1種類以上含む8文字以上)" v-model="password" :rules="[rules.password]" />
                            <v-card-actions class="pa-0">
                                <v-btn text class="pl-0" @click="backHome">
                                    <v-icon left>mdi-less-than</v-icon>キャンセル
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn dark color="#A19882" @click="signUp">
                                    登録
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
  name: "signup",
  data() {
    return {
        db: null,
        email: "",
        password: "",
        rules: {
            required: value => !!value || 'Required.',
            counter: value => value.length >= 6 || '6文字以上',
            email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || '不正なメールアドレスです.'
            },
            password: value => {
            const pattern = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i
            return pattern.test(value) || '不正なパスワードです.'
            }
        },
        alert: false,
        alertmessage:""
    };
  },
  created(){
    this.db = firebase.firestore();
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        // FirestoreのドキュメントにユーザーUID、emailフィールドにアドレスをセットする
        this.db.collection('users').doc(user.user.uid).set({
          email: this.email
        })
        // サインイン画面に遷移
        this.$router.push('/signin');
      })
      .catch(error => {
        console.log(error);
                    if(error.code == "auth/invalid-email"){
                        this.alertmessage = "不正なメールアドレスです。"
                    }else if(error.code == "auth/weak-password"){
                        this.alertmessage = "不正なパスワードです。"
                    }else if(error.code == "auth/email-already-in-use"){
                        this.alertmessage = "すでに存在しているメールアドレスです。"
                    }else{
                        this.alertmessage = "エラー！"
                    }
                    
                    this.alert = true;
      })
    },
    backHome(){
        this.$router.push('/');
    }
  }
};
</script>