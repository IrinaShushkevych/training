import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchWords, fetchAmountInputWords } from '../../redux/selectors'
import TrainItem from '../TrainItem'
import Pagination from '../Pagination'
import BlockButtonCheck from '../BlockButtonCheck'
import RightWrong from '../RightWrong'

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
        } else {
          wrongTemp[i] = data[idxData + i].id
        }
      } else {
      }
    }
    setIsChecked(true)
    setRight(rightTemp)
    setWrong(wrongTemp)
  }

  const onChangePage = (value) => {
    setPage(value)
  }

  const updateRightWrong = () => {
    const initialWords = []
    for (let i = 0; i < amountPage; i += 1) {
      initialWords.push(null)
    }
    setRight(initialWords)
    setWrong(initialWords)
  }

  useEffect(() => {
    console.log('Effect')
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
  }, [amountPage, amountWords, page, data])

  return (
    <>
      <table>
        <tbody>
          {data
            .slice(page * amountPage, page * amountPage + amountPage - 1)
            .map((el, idx) => (
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
      <BlockButtonCheck
        onCheckWords={onCheckWords}
        onShowTranslate={onShowTranslate}
      />

      <RightWrong right={right} wrong={wrong} onUpdate={updateRightWrong} />

      <Pagination
        countItem={amountPage}
        total={data.length}
        amountActiveButtons={6}
        setNextPage={onChangePage}
      />
    </>
  )
}
