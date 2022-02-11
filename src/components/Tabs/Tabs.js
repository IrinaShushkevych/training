import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { amountTypeWords, getUserId } from '../../redux/selectors'
import s from './Tabs.module.scss'
import { getDataUser } from '../../redux/auth/operations'

export default function Tabs({ isList = false }) {
  const typeData = useSelector(amountTypeWords)
  const userId = useSelector(getUserId)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClick = (key) => {
    dispatch(getDataUser({ uid: userId, type: key }))
    if (isList) {
      navigate(`/learningList`, { state: { type: key } })
    } else {
      navigate(`/learning`, { state: { type: key } })
    }
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
          <p className={s.Text}> {el.name}</p>
          <p className={s.Text}>{el.amount}</p>
        </button>
      ))}
    </div>
  )
}
