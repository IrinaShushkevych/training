import { useEffect, useState } from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import s from './Pagination.module.scss'

export default function Pagination({
  countItem,
  total,
  amountActiveButtons,
  setNextPage,
}) {
  const [current, setCurrent] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  const checkVisibleButton = () => {
    const buttons = createPagination()
    const step = Math.ceil(amountActiveButtons / 2)
    let first = 0
    if (amountActiveButtons % 2 === 0) {
      first = current - step + 1
    } else {
      first = current - step
    }
    let second = current + step
    if (first < 0) {
      second += 0 - first
      first = 0
    }
    if (second > totalPage - 1) {
      first -= second - totalPage + 1
      second = totalPage - 1
    }

    const arr = []
    if (first > 0) {
      arr.push(<MoreHorizIcon key={-1} />)
    }
    arr.push(...buttons.slice(first, second + 1))
    if (second < totalPage - 1) {
      arr.push(<MoreHorizIcon key={-2} />)
    }
    return arr
  }

  const createPagination = () => {
    const el = []
    for (let i = 0; i < totalPage; i += 1) {
      el.push(
        <button
          key={i}
          type="button"
          onClick={() => {
            setCurrent(i)
            setNextPage(i)
          }}
          className={`${s.Button} ${i === current && s.active}`}
        >
          {i + 1}
        </button>,
      )
    }
    return el
  }

  useEffect(() => {
    let countPage = Math.ceil(total / countItem)
    if (total / countItem > 0) {
      countPage += 1
    }
    setTotalPage(countPage)
  }, [countItem, total])

  return (
    <div className={s.Block}>
      <button
        type="button"
        className={s.Button}
        onClick={() => {
          setCurrent(0)
        }}
      >
        <KeyboardDoubleArrowLeftIcon />
      </button>
      <button
        type="button"
        className={s.Button}
        onClick={() => {
          setCurrent((prev) => (prev <= 0 ? 0 : prev - 1))
        }}
      >
        <ArrowBackIosIcon fontSize="small" />
      </button>
      {/* {begin > 0 && <MoreHorizIcon />} */}
      {checkVisibleButton()}
      {/* {end >= totalPage && <MoreHorizIcon />} */}
      <button
        type="button"
        className={s.Button}
        onClick={() => {
          setCurrent((prev) =>
            prev >= totalPage - 1 ? totalPage - 1 : prev + 1,
          )
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </button>
      <button
        type="button"
        className={s.Button}
        onClick={() => {
          setCurrent(totalPage - 1)
        }}
      >
        <KeyboardDoubleArrowRightIcon />
      </button>
    </div>
  )
}
