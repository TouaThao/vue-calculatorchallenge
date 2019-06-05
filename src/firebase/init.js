import firebase from 'firebase'
import 'firebase/firestore'


const config = {
  apiKey: "AIzaSyAL6bcIHrf2_ea16gSmr599BZf5NkGLHVs",
  authDomain: "code-challenge-eeb78.firebaseapp.com",
  databaseURL: "https://code-challenge-eeb78.firebaseio.com",
  projectId: "code-challenge-eeb78",
  storageBucket: "code-challenge-eeb78.appspot.com",
  messagingSenderId: "774031078977",
  appId: "1:774031078977:web:334daf1e9fd37aa4"
};

const firebaseApp = firebase.initializeApp(config);
// firebaseApp.firestore().settings({timestampsInSnapshots:true})
//export firebase
export default firebaseApp.firestore()

  