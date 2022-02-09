import { useSelector } from 'react-redux'
import { fetchAmountInputWords } from '../../redux/selectors'

export default function WrongWords({ wrong }) {
  const amount = useSelector(fetchAmountInputWords)

  const selectWords = (words) => {
    let text = ''
    if (amount === 1) {
      return words
    }
    for (let i = 0; i < amount; i += 1) {
      if (text.length > 0) {
        text += ', '
      }
      text += words[i]
    }
    return text
  }

  return (
    <table style={{ width: '50%' }}>
      <tbody>
        {wrong.map((el) => (
          <tr key={el.id}>
            <td style={{ borderBottom: '1px solid black', padding: '10px' }}>
              {selectWords(el.wordEng)}
            </td>
            <td style={{ borderBottom: '1px solid black', padding: '10px' }}>
              {el.translateUkr}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
