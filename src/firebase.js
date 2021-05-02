import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyCcr2H7O3gnMAj1Yv4iAfHEWObJrL9TwYg',
  authDomain: 'valuehandlers-b4d2a.firebaseapp.com',
  databaseURL: 'https://valuehandlers-b4d2a.firebaseio.com',
  projectId: 'valuehandlers-b4d2a',
  storageBucket: 'valuehandlers-b4d2a.appspot.com',
  messagingSenderId: '962791613751',
  appId: '1:962791613751:web:e8c6dc092fe4d6a23026b2',
  measurementId: 'G-37WXW8BL1W',
});

const db = app.firestore();
const auth = app.auth();
const rt = app.database();
const namesRef = rt.ref('names');
const usersCollection = db.collection('users');
const usersCalculations = db.collection('calculations');
const ratesCollection = db.collection('rates');
const tariffsCollection = db.collection('tariffs');
const calculationsCollection = db.collection('calculations');

export {
  db,
  rt,
  auth,
  namesRef,
  usersCollection,
  usersCalculations,
  ratesCollection,
  tariffsCollection,
  calculationsCollection,
};
