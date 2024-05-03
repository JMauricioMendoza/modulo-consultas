const handleChange = (ev, setValue, numberType) => {
  let value = ev.target.value;

  switch (numberType) {
    case 0:
      value = value.replace(/[^0-9]/g, '');
    break;
    case 1:
      value = value.replace(/[^0-9.]/g, '');
      value = value.replace(/(\..*)\./g, '$1');
      value = value.replace(/^(\.)/g, '0$1');
    break;
    case 2:
      value = value.toUpperCase()
    break;
    case 3:
      value = value.replace(/[^0-9,]/g, '');
      value = value.replace(/(,)[,]+/g, '$1');
      value = value.replace(/(,)\.(?=.*\,)/g, '$1');
      value = value.replace(/^,/, '');
      break;
    default :
      return null;
  };

  setValue(value);
};

export default handleChange;