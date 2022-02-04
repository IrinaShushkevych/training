import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuth } from '../../redux/selectors'

export default function PublicRoute({
  element,
  redirectTo = '/',
  restricted = false,
}) {
  const isAuthed = useSelector(isAuth)
  console.log(isAuthed, restricted)
  return restricted && isAuthed ? <Navigate to={redirectTo} /> : element
}
