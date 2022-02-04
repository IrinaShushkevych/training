import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFirebase } from "../../firebase/firebase";
import { createUser } from "../../redux/auth/slice";
import s from "../StyleForm/StyleForm.module.scss";

export default function LoginForm() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("qwert-11");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEnter = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = await loginFirebase(email, password);
    dispatch(createUser(user));
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit} className={s.Form}>
      <input
        type="email"
        name="email"
        className={s.Input}
        placeholder="email"
        onChange={onEnter}
        value={email}
        required
      />
      <input
        type="password"
        name="password"
        className={s.Input}
        placeholder="required"
        onChange={onEnter}
        value={password}
        required
      />
      <button type="submit" className={s.Button}>
        Sign in
      </button>
    </form>
  );
}
