import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import PreviewIcon from '@mui/icons-material/Preview'
import s from './BlockButtonCheck.module.scss'

export default function BlockButtonCheck({
  onCheckWords,
  onShowTranslate,
  onSave,
}) {
  return (
    <div className={s.Block}>
      {' '}
      <Button
        type="button"
        className={s.Button}
        variant="contained"
        endIcon={<SendIcon />}
        onClick={onCheckWords}
      >
        Check
      </Button>
      <Button
        type="button"
        className={s.Button}
        variant="contained"
        endIcon={<PreviewIcon />}
        onClick={onShowTranslate}
      >
        Show
      </Button>
    </div>
  )
}
