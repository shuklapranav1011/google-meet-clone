import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD0flMB5yk3HZYjXMQIGL25IUn92VZ4gH8',
  authDomain: 'meet-clone-d6071.firebaseapp.com',
  projectId: 'meet-clone-d6071',
  storageBucket: 'meet-clone-d6071.appspot.com',
  messagingSenderId: '449972301617',
  appId: '1:449972301617:web:e46fd0f0c5b10109a40a10',
  measurementId: 'G-GRD7KVE0YH',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GithubAuthProvider();

export { db, auth, provider };
