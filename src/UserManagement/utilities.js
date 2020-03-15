const createDictionaryForm = ({ target }) => {
  let details = {};
  for (let i = 0; target[i].type !== "submit"; i++) {
    let name = target[i].name;
    let value = target[i].value;
    details[name] = value;
  }
  return details;
};

export { createDictionaryForm };
