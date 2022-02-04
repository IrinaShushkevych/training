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

export function loginFirebase(email, password) {
  const auth = getAuth()
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      // setDatabase(user.uid)
      // getData(user.uid)
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

export function setData(
  userId = 'BdjgXsoA2reO1VV2qfpV2Xfeb7p1',
  data = [1, 2, 3],
  type = 'top',
) {
  set(ref(database, `users/${userId}/words/${type}`), JSON.stringify(data))
}

export async function getData(
  userId = 'BdjgXsoA2reO1VV2qfpV2Xfeb7p1',
  type = 'top',
) {
  console.log(userId)
  const response = await get(
    child(ref(database), `users/${userId}/words/${type}`),
  )
    .then((res) => {
      if (res.exists()) {
        return JSON.parse(res.val())
      } else {
        return 'No data available'
      }
    })
    .catch((error) => {
      console.error(error)
    })

  return response
}
