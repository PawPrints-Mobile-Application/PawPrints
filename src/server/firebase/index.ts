// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
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

const app = initializeApp(firebaseConfig);
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

const SetDocument = async (collection: string, document: string, data: any) => {
  await setDoc(doc(db, `${collection}/${document}`), data)
    .then(() => console.log(`${document} saved to Firestore Database.`))
    .catch((error) => console.log(error.message));
};

const GetDocument = async (collection: string, document: string) =>
  await getDoc(doc(db, `${collection}/${document}`));

const DeleteDocument = async (collection: string, document: string) =>
  await deleteDoc(doc(db, `${collection}/${document}`));

export { app, getCurrentUser, db, SetDocument, GetDocument, DeleteDocument };

export default auth;
