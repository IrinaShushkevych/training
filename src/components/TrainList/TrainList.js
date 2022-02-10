import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import PreviewIcon from '@mui/icons-material/Preview'
import { fetchWords, fetchAmountInputWords } from '../../redux/selectors'
import TrainItem from '../TrainItem'

export default function TrainList({ amountPage }) {
  const [isShowTranslate, setIsShowTranslate] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [translateList, setTranslateList] = useState([])
  const [wrong, setWrong] = useState([])
  const [right, setRight] = useState([])
  const amountWords = useSelector(fetchAmountInputWords)
  const [page, setPage] = useState(0)

  const data = useSelector(fetchWords)

  const onChange = (idx, idxItem, value) => {
    const arr = [...translateList]
    const arrItem = [...translateList[idx]]
    arrItem[idxItem] = value
    arr[idx] = arrItem
    setTranslateList(arr)
  }

  const onShowTranslate = () => {
    setIsShowTranslate(true)
  }

  const onCheckWords = () => {
    const idxData = page * amountPage
    const rightTemp = [...right]
    const wrongTemp = [...wrong]

    for (let i = 0; i < amountPage; i += 1) {
      if (amountWords === 1) {
        if (
          data[idxData + i].wordEng.trim().toLowerCase() ===
          translateList[i][0].trim().toLowerCase()
        ) {
          rightTemp[i] = data[idxData + i].id
          console.log(i, data[idxData + i].id)
        } else {
          wrongTemp[i] = data[idxData + i].id
          console.log(i, data[idxData + i].id)
        }
      } else {
      }
    }
    setIsChecked(true)
    setRight(rightTemp)
    setWrong(wrongTemp)
  }

  const createPagination = () => {
    const el = []
    let countPage = Math.ceil(data.length / amountPage)
    if (data.length / amountPage > 0) {
      countPage += 1
    }
    for (let i = 0; i < countPage; i += 1) {
      el.push(
        <button
          type="button"
          onClick={() => {
            onChangePage(i)
          }}
        >
          {i + 1}
        </button>,
      )
    }
    return el
  }

  const onChangePage = (value) => {
    setPage(value)
  }

  useEffect(() => {
    const initial = []
    const initialWords = []
    const arr = []
    for (let i = 0; i < amountPage; i += 1) {
      arr.length = 0
      for (let j = 0; j < amountWords; j += 1) {
        arr.push('')
      }
      initial.push(arr)
      initialWords.push(null)
    }
    setRight(initialWords)
    setWrong(initialWords)
    setTranslateList(initial)
  }, [amountPage, amountWords])

  return (
    <>
      <table>
        <tbody>
          {data.slice(page, page + amountPage).map((el, idx) => (
            <TrainItem
              element={el}
              value={translateList[idx]}
              idx={idx}
              isShowTranslate={isShowTranslate}
              isChecked={isChecked}
              wrongWord={wrong[idx]}
              onChange={onChange}
              key={el.id}
            />
          ))}
        </tbody>
      </table>
      <div>
        <Button
          type="button"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={onCheckWords}
        >
          Check
        </Button>
        <Button
          type="button"
          variant="contained"
          endIcon={<PreviewIcon />}
          onClick={onShowTranslate}
        >
          Show
        </Button>
      </div>
      <div>{createPagination()}</div>
    </>
  )
}
