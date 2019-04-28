import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";


const config = {
  apiKey: "AIzaSyA1sXh8VljH_FNhxvDQifvS1hcPrLD2aNs",
  authDomain: "blood-test-analyzer.firebaseapp.com",
  databaseURL: "https://blood-test-analyzer.firebaseio.com",
  projectId: "blood-test-analyzer",
  storageBucket: "blood-test-analyzer.appspot.com",
  messagingSenderId: "339067980101"
};

const firebase = app.initializeApp(config)
export default firebase;

