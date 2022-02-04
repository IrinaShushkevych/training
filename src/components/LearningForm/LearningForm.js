import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchWords } from "../../redux/selectors";
import FormEnterWord from "../FormEnterWord";
import WrongWords from "../WrongWords";

export default function LearningForm() {
  const location = useLocation();
  const data = useSelector(fetchWords);
  const [dataIdx, setDataIdx] = useState(0);
  const [wrong, setWrong] = useState([]);
  const [right, setRight] = useState([]);
  const [round, setRound] = useState(1);
  const [isShow, setIsShow] = useState(false);
  console.log(location.state.type);

  const onSubmit = (value) => {
    if (
      value.toLowerCase().trim() ===
        data[dataIdx].wordEng.toLowerCase().trim() &&
      !isShow
    ) {
      if (!wrong.includes(dataIdx)) {
        setRight((prev) => [...prev, dataIdx]);
      }

      setDataIdx((prev) => {
        const idx = prev + 1;
        if (idx >= data.length) {
          setRound((prev) => prev + 1);
          return 0;
        }
        return idx;
      });
    } else {
      if (!wrong.find((el) => el === dataIdx)) {
        setWrong((prev) => [...prev, dataIdx]);
      }
    }
    setIsShow(false);
  };

  const onShowTranslate = () => {
    setIsShow(true);
  };

  return data && data[dataIdx] ? (
    <>
      <div>
        {data && (
          <span>
            {dataIdx + 1} / {data.length}
          </span>
        )}
        <h1>{data[dataIdx].translateUkr}</h1>
        {isShow && <h2 style={{ color: "blue" }}>{data[dataIdx].wordEng}</h2>}
        <FormEnterWord onSubmit={onSubmit} onShowTranslate={onShowTranslate} />
        <p>Round {round}</p>
        <p>
          Right: {right.length} / Error: {wrong.length}
        </p>
        <WrongWords wrong={wrong} data={data} />
      </div>
    </>
  ) : (
    "No words for learning"
  );
}
