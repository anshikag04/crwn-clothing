import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDnIkloEqGIMkF7GrcQO8a8TibSDnCbl_Y",
    authDomain: "crwn-db-e08b4.firebaseapp.com",
    projectId: "crwn-db-e08b4",
    storageBucket: "crwn-db-e08b4.appspot.com",
    messagingSenderId: "638558108329",
    appId: "1:638558108329:web:2eb49ea3c47f66302d87b8",
    measurementId: "G-X2B5LLEF78"
  };
  
  export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth)  return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }
      catch(error) {
        console.log(error.message);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;