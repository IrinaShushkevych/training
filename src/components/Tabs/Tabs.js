import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchTypeWords, getUserId } from '../../redux/selectors'
import s from './Tabs.module.scss'
import { getDataUser } from '../../redux/auth/operations'

export default function Tabs() {
  const typeData = useSelector(fetchTypeWords)
  const userId = useSelector(getUserId)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClick = (key) => {
    dispatch(getDataUser({ uid: userId, type: key }))
    navigate(`/learning`, { state: { type: key } })
  }

  return (
    <div className={s.block}>
      {typeData.map((el) => (
        <button
          className={s.link}
          key={el.key}
          onClick={() => {
            onClick(el.key)
          }}
        >
          {el.name}
        </button>
      ))}
    </div>
  )
}
