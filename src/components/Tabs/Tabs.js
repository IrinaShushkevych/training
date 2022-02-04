import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTypeWords } from "../../redux/selectors";
import s from "./Tabs.module.scss";
import { setType } from "../../redux/typeWord/slice.js";

export default function Tabs() {
  const typeData = useSelector(fetchTypeWords);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = (key) => {
    dispatch(setType(key));
    navigate(`/learning`, { state: { type: key } });
  };

  return (
    <div className={s.block}>
      {typeData.map((el) => (
        <button
          className={s.link}
          key={el.key}
          onClick={() => {
            onClick(el.key);
          }}
        >
          {el.name}
        </button>
        // <NavLink
        //   to={`${location.pathname}learning`}
        //   className={s.link}
        //   key={el.key}
        //   state={{ type: el.key }}
        //   onClick={() => {
        //     console.log(el.key)
        //     dispatch(setType(el.key))
        //   }}
        // >
        //   {el.name}
        // </NavLink>
      ))}
    </div>
  );
}
