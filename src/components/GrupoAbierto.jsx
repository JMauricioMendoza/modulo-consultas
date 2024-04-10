import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';
import handleChange from '../utils/handleChange';
import areInputsEmpty from '../utils/areInputsEmpty';

export default function ({ handleModal }) {
  const [inputGrupo, setInputGrupo] = useState('');
  const [inputCiclo, setInputCiclo] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const sendData = async () => {
    const data = {
      grupo : inputGrupo,
      cicloCorrecto : inputCiclo
    };

    await axios.post('https://192.168.100.7/consultas-db/public/perrillo/grupoAbiertoPorError', data)
      .then(response => {
        if(response.data.Estado) handleModal(false, response.data.Mensaje);
        else handleModal(true, response.data.Mensaje);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  useEffect(() => {
    setIsButtonDisabled(areInputsEmpty([inputGrupo]));
  }, [inputGrupo]); 

  return(
    <>
      <InputsButtonCont>
        <InputCont>
          <Input
            type='text'
            label='GrupoID'
            labelPlacement='outside'
            placeholder='Ingresa el número de grupo'
            onChange={(ev) => handleChange(ev, setInputGrupo, 0)}
            value={inputGrupo}
          />
        </InputCont>
        <Button
          color='primary'
          size='md'
          isDisabled={isButtonDisabled}
          onClick={sendData}
        >
          Aplicar
        </Button>
      </InputsButtonCont>
    </>
  );
};

const InputsButtonCont = styled.div`
  align-items: end;
  display: flex;
  gap: 16px;
`;

const InputCont =  styled.div`
  width: 376.5px;
`;