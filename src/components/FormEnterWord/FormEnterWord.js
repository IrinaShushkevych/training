import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchAmountInputWords } from '../../redux/selectors'
import BlockButtonCheck from '../BlockButtonCheck'

export default function FormEnterWord({ onSubmit, onShowTranslate }) {
  const amount = useSelector(fetchAmountInputWords)
  const inputRef = useRef(null)

  const [inputTranslate, setInputTranslate] = useState([])

  const onChange = (idx, val) => {
    const arr = [...inputTranslate]
    arr[idx] = val
    setInputTranslate(arr)
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [onSubmit])

  const setInputs = () => {
    const arr = []
    for (let i = 0; i < amount; i += 1) {
      arr.push(
        <input
          key={i}
          ref={i === 0 ? inputRef : null}
          type="text"
          value={inputTranslate[i] ?? ''}
          onChange={(e) => {
            onChange(i, e.target.value)
          }}
          style={{
            display: 'block',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '30px',
            padding: '10px',
            fontSize: '20px',
          }}
          required
        />,
      )
    }
    return arr
  }

  const onOwnSubmit = () => {
    onSubmit(inputTranslate)
    setInputTranslate('')
  }

  useEffect(() => {
    const initial = []
    for (let i = 0; i < amount; i += 1) {
      initial.push('')
    }
    setInputTranslate(initial)
  }, [amount])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onOwnSubmit()
      }}
    >
      {setInputs()}
      <BlockButtonCheck
        onCheckWords={onOwnSubmit}
        onShowTranslate={onShowTranslate}
      />
    </form>
  )
}
