const areInputsEmpty = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] === '') return true;
  }

  return false;
};

export default areInputsEmpty;