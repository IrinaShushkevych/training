import { useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PreviewIcon from "@mui/icons-material/Preview";

export default function FormEnterWord({ onSubmit, onShowTranslate }) {
  const [inputTranslate, setInputTranslate] = useState("");

  const onChange = (e) => {
    setInputTranslate(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(inputTranslate);
        setInputTranslate("");
      }}
    >
      <input
        type="text"
        value={inputTranslate}
        onChange={onChange}
        style={{
          display: "block",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "30px",
          padding: "10px",
          fontSize: "20px",
        }}
      />
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
  );
}
