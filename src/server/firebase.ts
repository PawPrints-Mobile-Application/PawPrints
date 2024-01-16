// Import the functions you need from the SDKs you need
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkVcL09p4OGLRQOD_rMzmEZGITvIE6Ieg",
  authDomain: "pawprints-d1eb8.firebaseapp.com",
  projectId: "pawprints-d1eb8",
  storageBucket: "pawprints-d1eb8.appspot.com",
  messagingSenderId: "831211374802",
  appId: "1:831211374802:web:510f7245433148be72450b",
  measurementId: "G-MYYF4F2KTQ",
};

const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

const db = getFirestore(app);

const SetDocument = async (path: string, data: any) =>
  setDoc(doc(db, path), data)
    .then((resolve) => {
      console.log(`A document is saved to Firestore Database.`);
      return resolve;
    })
    .catch((error) => console.log(error.message));

const GetDocument = async (path: string) =>
  getDoc(doc(db, path))
    .then((data) => {
      console.log(`A document is fetched from Firestore Database.`);
      return data;
    })
    .catch((error) => console.log(error.message));

const DeleteDocument = async (path: string) =>
  deleteDoc(doc(db, path))
    .then((data) => {
      console.log(`A document is deleted from Firestore Database.`);
      return data;
    })
    .catch((error) => console.log(error.message));

// const GetCollection = async (coll: string) =>
//   (await firebase.firestore().collection(coll).get()).docs.map((doc) =>
//     doc.data()
//   );

const GetCollection = async (coll: string) =>
  firebase
    .firestore()
    .collection(coll)
    .get()
    .then((response) => {
      return {
        values: response.docs.map((doc) => doc.data()),
        fromCache: response.metadata.fromCache,
      };
    })
    .catch((error) => console.log(error.message));

export {
  app,
  getCurrentUser,
  db,
  SetDocument,
  GetDocument,
  DeleteDocument,
  GetCollection,
};

export default auth;
