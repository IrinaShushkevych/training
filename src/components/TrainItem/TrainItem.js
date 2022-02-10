import { useSelector } from 'react-redux'
import { fetchAmountInputWords } from '../../redux/selectors'

export default function TrainItem({
  element,
  value,
  idx,
  isShowTranslate,
  isChecked,
  wrongWord,
  onChange,
}) {
  const amountWords = useSelector(fetchAmountInputWords)

  const setInputs = () => {
    const arr = []
    for (let i = 0; i < amountWords; i += 1) {
      arr.push(
        <input
          key={i}
          type="text"
          value={value[i] ?? ''}
          onChange={(e) => {
            onChange(idx, i, e.target.value)
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

  return (
    <tr key={element.id}>
      <td style={{ borderBottom: '1px solid black', padding: '10px' }}>
        {element.translateUkr}
      </td>
      <td style={{ borderBottom: '1px solid black', padding: '10px' }}>
        {setInputs()}
        {isChecked && wrongWord && (
          <p style={{ color: 'green' }}>{element.wordEng}</p>
        )}
      </td>
      {isShowTranslate && (
        <td style={{ borderBottom: '1px solid black', padding: '10px' }}>
          {amountWords === 1 ? element.wordEng : element.wordEng.join(', ')}
        </td>
      )}
    </tr>
  )
}
