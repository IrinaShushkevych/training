import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerFirebase } from '../../services/firebase'
import { createUser } from '../../redux/auth/slice'
import s from '../StyleForm/StyleForm.module.scss'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onEnter = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default:
        break
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const user = await registerFirebase(email, password)
    dispatch(createUser(user))
    navigate('/')
  }

  return (
    <form onSubmit={onSubmit} className={s.Form}>
      <input
        type="email"
        name="email"
        className={s.Input}
        placeholder="email"
        onChange={onEnter}
        value={email}
        required
      />
      <input
        type="password"
        name="password"
        className={s.Input}
        placeholder="required"
        onChange={onEnter}
        value={password}
        required
      />
      <button type="submit" className={s.Button}>
        Sign up
      </button>
    </form>
  )
}
