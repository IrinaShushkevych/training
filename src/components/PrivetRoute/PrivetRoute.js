import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuth } from '../../redux/selectors'

export default function PrivateRoute({ element, redirectTo = '/' }) {
  const isAuthed = useSelector(isAuth)

  return isAuthed ? element : <Navigate to={redirectTo} />
}
