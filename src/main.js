



import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './assets/sass/style.scss'



import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyDwRJ28HzEqsneTCog1JbZj3abSoThclaM",
  authDomain: "mytask-mgmt.firebaseapp.com",
  projectId: "mytask-mgmt",
  storageBucket: "mytask-mgmt.appspot.com",
  messagingSenderId: "54794597177",
  appId: "1:54794597177:web:f064fc6af72c2c74dfeee8",
  measurementId: "G-3PMQSN3QPB"
};

firebase.initializeApp(config);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  vuetify,
  router
  
}).$mount('#app')

