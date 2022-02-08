import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { getDatabase, ref, set, get, child } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth()

const email = sessionStorage.getItem('email')
const password = sessionStorage.getItem('password')
if (!auth.currentUser && email && password) {
  loginFirebase(email, password)
}

export function loginFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      localStorage.setItem(
        'token',
        auth.currentUser.stsTokenManager.refreshToken,
      )
      sessionStorage.setItem('email', email)
      sessionStorage.setItem('password', password)
      return { token: user.accessToken, uid: user.uid }
    })
    .catch((error) => ({ error: error.message }))
}

export function registerFirebase(email, password) {
  const auth = getAuth()
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      return { token: user.accessToken, uid: user.uid }
    })
    .catch((error) => ({ error: error.message }))
}

export async function setData(
  userId = 'BdjgXsoA2reO1VV2qfpV2Xfeb7p1',
  data = [],
  type = 'top',
) {
  try {
    await set(
      ref(database, `users/${userId}/words/${type}`),
      JSON.stringify(data),
    )
    const response = await getData(userId, type)
    return response
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function getData(userId = '', type = '') {
  try {
    const response = await get(
      child(ref(database), `users/${userId}/words/${type}`),
    )
    if (!response.val()) return { words: [] }
    return JSON.parse(response.val())
  } catch (error) {
    throw new Error(error.message)
  }
}
