import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import PreviewIcon from '@mui/icons-material/Preview'
import { useSelector } from 'react-redux'
import { fetchAmountInputWords } from '../../redux/selectors'

export default function FormEnterWord({ onSubmit, onShowTranslate }) {
  const amount = useSelector(fetchAmountInputWords)

  const [inputTranslate, setInputTranslate] = useState([])

  const onChange = (idx, val) => {
    const arr = [...inputTranslate]
    arr[idx] = val
    setInputTranslate(arr)
  }

  const setInputs = () => {
    const arr = []
    for (let i = 0; i < amount; i += 1) {
      arr.push(
        <input
          key={i}
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
        onSubmit(inputTranslate)
        setInputTranslate('')
      }}
    >
      {setInputs()}
      <Button type="submit" variant="contained" endIcon={<SendIcon />}>
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
    </form>
  )
}
