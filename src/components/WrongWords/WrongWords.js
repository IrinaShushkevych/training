export default function WrongWords({ wrong }) {
  return (
    <table style={{ width: '50%' }}>
      <tbody>
        {wrong.map((el) => (
          <tr key={el.id}>
            <td style={{ borderBottom: '1px solid black', padding: '10px' }}>
              {el.wordEng}{' '}
            </td>
            <td style={{ borderBottom: '1px solid black', padding: '10px' }}>
              {el.translateUkr}{' '}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
