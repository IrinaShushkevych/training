import Button from '@mui/material/Button'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserId, fetchLearnedWords } from '../../redux/selectors'
import { setDataUser } from '../../redux/auth/operations'
import s from './RightWrong.module.scss'

export default function RightWrong({
  right,
  wrong,
  isSave = true,
  onUpdate = null,
}) {
  const location = useLocation().state?.type
  const dispatch = useDispatch()
  const userId = useSelector(getUserId)
  const learnedData = useSelector(fetchLearnedWords)

  console.log(right)
  console.log(wrong)

  const onSaveData = () => {
    dispatch(
      setDataUser({
        uid: userId,
        type: location,
        data: { words: [...learnedData, ...right] },
      }),
    )
    if (onUpdate) {
      onUpdate()
    }
  }

  const onUnSaveData = () => {
    dispatch(
      setDataUser({
        uid: userId,
        type: location,
        data: {
          words: [...learnedData.filter((el) => !wrong.includes(el.id))],
        },
      }),
    )
    if (onUpdate) {
      onUpdate()
    }
  }

  return (
    <div className={s.Block}>
      <p className={s.Text}>
        Right: {right.length} / Error: {wrong.length}
      </p>
      {isSave ? (
        <Button
          variant="contained"
          endIcon={<LibraryAddIcon />}
          onClick={onSaveData}
        >
          Save right words
        </Button>
      ) : (
        <Button
          variant="contained"
          endIcon={<LibraryAddIcon />}
          onClick={onUnSaveData}
        >
          Return wrong words
        </Button>
      )}
    </div>
  )
}
