import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  fetchWords,
  fetchLearnedWords,
  getUserId,
  fetchAmountInputWords,
} from '../../redux/selectors'
import FormEnterWord from '../FormEnterWord'
import WrongWords from '../WrongWords'
import Button from '@mui/material/Button'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { setDataUser } from '../../redux/auth/operations'

export default function LearningForm() {
  const location = useLocation().state?.type
  const data = useSelector(fetchWords)
  const learnedData = useSelector(fetchLearnedWords)
  const [dataIdx, setDataIdx] = useState(0)
  const [wrong, setWrong] = useState([])
  const [right, setRight] = useState([])
  const [round, setRound] = useState(1)
  const [isShow, setIsShow] = useState(false)
  const dispatch = useDispatch()
  const userId = useSelector(getUserId)
  const amountWords = useSelector(fetchAmountInputWords)

  const checkWord = (value) => {
    let isRight = false
    if (value) {
      for (let i = 0; i < amountWords; i += 1) {
        if (amountWords > 1) {
          if (
            value[i].toLowerCase().trim() ===
              data[dataIdx].wordEng[i].toLowerCase().trim() &&
            !isShow
          ) {
            isRight = true
          }
        } else {
          if (
            value[i].toLowerCase().trim() ===
              data[dataIdx].wordEng.toLowerCase().trim() &&
            !isShow
          ) {
            isRight = true
          }
        }
      }
    }
    return isRight
  }

  const onSubmit = (value) => {
    if (checkWord(value)) {
      if (!wrong.includes(data[dataIdx].id)) {
        setRight((prev) => [...prev, data[dataIdx].id])
      }

      setDataIdx((prev) => {
        const idx = prev + 1
        if (idx >= data.length) {
          setRound((prev) => prev + 1)
          return 0
        }
        return idx
      })
    } else {
      if (!wrong.find((el) => el === data[dataIdx].id)) {
        setWrong((prev) => [...prev, data[dataIdx].id])
      }
    }
    setIsShow(false)
  }

  const onShowTranslate = () => {
    setIsShow(true)
  }

  const onSaveData = () => {
    dispatch(
      setDataUser({
        uid: userId,
        type: location,
        data: { words: [...learnedData, ...right] },
      }),
    )
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
  }

  return data && data[dataIdx] ? (
    <>
      <div>
        {data && (
          <span>
            {dataIdx + 1} / {data.length}
          </span>
        )}
        <h1>{data[dataIdx].translateUkr}</h1>
        {isShow && (
          <h2 style={{ color: 'blue' }}>{data[dataIdx].wordEng.join(' - ')}</h2>
        )}
        <FormEnterWord onSubmit={onSubmit} onShowTranslate={onShowTranslate} />
        <p>Round {round}</p>
        <p>
          Right: {right.length} / Error: {wrong.length}
        </p>
        <Button
          variant="contained"
          endIcon={<LibraryAddIcon />}
          onClick={onSaveData}
        >
          Save right words
        </Button>
        <WrongWords
          wrong={data.filter((el) => wrong.includes(el.id)).reverse()}
        />
      </div>
    </>
  ) : (
    'No words for learning'
  )
}
