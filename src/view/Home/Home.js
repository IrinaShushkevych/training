import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

import { removeUser } from '../../redux/auth/slice'
import { isAuth } from '../../redux/selectors'
import s from './Home.module.scss'

export default function Home() {
  const isAuthed = useSelector(isAuth)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(removeUser())
  }

  return (
    <>
      <div className={s.Panel}>
        {isAuthed && (
          <ul className={s.ListRight}>
            <li className={s.Item}>
              <Link to="/" className={s.Link}>
                Home
              </Link>
            </li>
            <li className={s.Item}>
              <Link to="/trainer" className={s.Link}>
                Training
              </Link>
            </li>
          </ul>
        )}
        <ul className={s.List}>
          {isAuthed ? (
            <>
              <li className={s.Item}>
                <Link to="/" className={s.Link} onClick={onLogout}>
                  Log out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={s.Item}>
                <Link to="/login" className={s.Link}>
                  Log in
                </Link>
              </li>
              <li className={s.Item}>
                <Link to="/register" className={s.Link}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* <Tabs /> */}
      <Outlet />
    </>
  )
}
