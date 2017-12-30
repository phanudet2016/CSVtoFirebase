import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyDFZXRvxup6hieft9nUm1Mm2WZpFmQIeWY',
  authDomain: 'upim-b7cf4.firebaseapp.com',
  databaseURL: 'https://upim-b7cf4.firebaseio.com',
  projectId: 'upim-b7cf4',
  storageBucket: 'upim-b7cf4.appspot.com',
  messagingSenderId: '428525912208'
})

export const db = app.database()
export const dataRef = db.ref('datas')
