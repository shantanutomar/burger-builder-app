var updateObject = (oldState, updatedObject) => {
  return {
    ...oldState,
    ...updatedObject
  };
};

export default updateObject;
