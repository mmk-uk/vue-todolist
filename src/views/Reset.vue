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
            <v-col class="text-center pt-0">
                <v-card color="#FEF7DC">
                    <v-card-title>
                        <h2>パスワードを再発行</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="mdi-account-circle" label="メールアドレス" v-model="email"/>
                            <v-card-actions class="pa-0">
                                <v-btn text class="pl-0" @click="backHome">
                                    <v-icon left>mdi-less-than</v-icon>キャンセル
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn dark color="#A19882" @click="send">
                                    送信
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
            alert: false,
            alertmessage:""
        };
    },
    methods: {
        send() {
                firebase.auth().languageCode = 'ja'; // 日本語に設定
                firebase.auth()
                    .sendPasswordResetEmail(this.email)
                    .then(() => {
                        this.$router.push({name:'signin',params:{sendmail: "再設定メールを送信しました。"}});

                    }).catch(() => {

                        this.alertmessage = "該当するデータが見つかりません。"
                        
                        this.alert = true;

                    });
        },
        backHome(){
            this.$router.push('/signin');
        }
    }
};
</script>