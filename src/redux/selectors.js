export const fetchWords = (state) => {
  return state.enwords[state.typeWords.type].words.filter((el) => !el.know);
};

export const fetchTypeWords = (state) => {
  const keys = Object.keys(state.enwords);
  return keys.map((el) => ({ key: el, name: state.enwords[el].name }));
};

export const isAuth = (state) => {
  return state.auth.token ? true : false;
};
