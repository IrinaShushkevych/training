export default function WrongWords({ wrong, data }) {
  return (
    <table style={{ width: "50%" }}>
      <tbody>
        {wrong.reverse().map((el) => (
          <tr key={el}>
            <td style={{ borderBottom: "1px solid black", padding: "10px" }}>
              {data[el].wordEng}{" "}
            </td>
            <td style={{ borderBottom: "1px solid black", padding: "10px" }}>
              {data[el].translateUkr}{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
