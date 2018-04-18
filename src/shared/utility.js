export var updateObject = (oldState, updatedObject) => {
  return {
    ...oldState,
    ...updatedObject
  };
};

export var formDataValidateHandler = (rules, value) => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength > 0) {
    isValid = value.trim().length > rules.minLength && isValid;
  }
  if (rules.isMail) {
    //   let pattern =
    //     "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    //   isValid = pattern.test(value) && isValid;
    isValid = true;
  }
  if (rules.maxLength > 0) {
    isValid = value.trim().length <= rules.maxLength && isValid;
  }
  return isValid;
};
