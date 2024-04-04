import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input, Button } from '@nextui-org/react';
import { FaCheck } from 'react-icons/fa';

export default function ActualizarSeguro ({ handleModal }) {
  const [inputSolicitud, setInputSolicitud] = useState('');
  const [inputMonto, setInputMonto] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
      default :
        return null;
    };

    setValue(value);
  };

  const areInputsEmpty = () => {
    if(inputSolicitud === '') return true;
    if(inputMonto === '') return true;

    return false;
  };

  const sendData = async () => {
    const data = {
      solicitud : inputSolicitud,
      montante : inputMonto
    };

    await axios.post('http://192.168.100.7/operaciones_GOD/public/sistemas/perrillo/actMontSeguro', data)
      .then(response => {
        if(response.data.Estado) handleModal(false, response.data.Mensaje);
        else handleModal(true, response.data.Mensaje);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    setIsButtonDisabled(areInputsEmpty);
  }, [inputSolicitud, inputMonto]); 

  return(
    <>
      <InputsCont>
        <Input
          type='text'
          label='Solicitud de crédito'
          labelPlacement='outside'
          placeholder='Ingrese el número de solicitud'
          onChange={(ev) => handleChange(ev, setInputSolicitud, 0)}
          value={inputSolicitud}
        />
        <Input
          type='text'
          label='Monto'
          labelPlacement='outside'
          onChange={(ev) => handleChange(ev, setInputMonto, 1)}
          value={inputMonto}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
        />
      </InputsCont>
      <Button
        color='primary'
        size='md'
        endContent={<FaCheck/>}
        isDisabled={isButtonDisabled}
        onClick={sendData}
      >
        Aplicar
      </Button>
    </>
  );
};

const InputsCont = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 32px;
`;