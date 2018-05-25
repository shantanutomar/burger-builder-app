import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDPn-L6l7G7vy5sqRfKcUN6u8S62Ae5w6Q",
  authDomain: "burger-builder-app-back.firebaseapp.com",
  databaseURL: "https://burger-builder-app-back.firebaseio.com",
  projectId: "burger-builder-app-back",
  storageBucket: "burger-builder-app-back.appspot.com",
  messagingSenderId: "223952078588"
};

var firbaseApp = firebase.initializeApp(config);
var googleProvider = new firebase.auth.GoogleAuthProvider();

export { firbaseApp, googleProvider };
