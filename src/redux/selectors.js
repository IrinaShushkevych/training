export const fetchWords = (state) => {
  if (!state.auth.type) return []
  return state.enwords[state.auth.type].words.filter(
    (el) => !state.auth.words.includes(el.id),
  )
}

export const fetchLearnedWords = (state) => state.auth.words

export const fetchTypeWords = (state) => {
  const keys = Object.keys(state.enwords)
  return keys.map((el) => ({ key: el, name: state.enwords[el].name }))
}

export const isAuth = (state) => {
  return state.auth.token ? true : false
}

export const getUserId = (state) => {
  return state.auth.uid
}

export const fetchAmountInputWords = (state) => {
  if (state.auth.type) {
    return state.enwords[state.auth.type].amountWord
  } else {
    return 0
  }
}

export const amountTypeWords = (state) => {
  const el = fetchTypeWords(state)
  return el.map((e) => ({ ...e, amount: state.enwords[e.key].words.length }))
}
