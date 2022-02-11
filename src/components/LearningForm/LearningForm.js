import { useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchWords, fetchAmountInputWords } from '../../redux/selectors'
import FormEnterWord from '../FormEnterWord'
import WrongWords from '../WrongWords'
import RightWrong from '../RightWrong'

export default function LearningForm() {
  const data = useSelector(fetchWords)
  const [dataIdx, setDataIdx] = useState(0)
  const [wrong, setWrong] = useState([])
  const [right, setRight] = useState([])
  const [round, setRound] = useState(1)
  const [isShow, setIsShow] = useState(false)
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
          <h2 style={{ color: 'blue' }}>
            {amountWords === 1
              ? data[dataIdx].wordEng
              : data[dataIdx].wordEng.join(' - ')}
          </h2>
        )}
        <FormEnterWord onSubmit={onSubmit} onShowTranslate={onShowTranslate} />
        <p>Round {round}</p>

        <RightWrong right={right} wrong={wrong} />

        <WrongWords
          wrong={data.filter((el) => wrong.includes(el.id)).reverse()}
        />
      </div>
    </>
  ) : (
    'No words for learning'
  )
}
