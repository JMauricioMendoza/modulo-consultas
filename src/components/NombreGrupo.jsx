import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input, Button } from '@nextui-org/react';
import { FaCheck } from 'react-icons/fa';
import handleChange from '../utils/handleChange';
import areInputsEmpty from '../utils/areInputsEmpty';

export default function ActualizarSeguro ({ handleModal }) {
  const [inputGrupo, setInputGrupo] = useState('');
  const [inputNombre, setInputNombre] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const sendData = async () => {
    const data = {
      GrupoID : inputGrupo,
      nombre : inputNombre
    };

    await axios.post('https://192.168.100.7/consultas-db/public/perrillo/cambiarNombreGrupo', data)
      .then(response => {
        if(response.data.Estado) handleModal(false, response.data.mensaje);
        else handleModal(true, response.data.mensaje);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    setIsButtonDisabled(areInputsEmpty([inputGrupo, inputNombre]));
  }, [inputGrupo, inputNombre]); 

  return(
    <>
      <InputsCont>
        <Input
          type='text'
          label='GrupoID'
          labelPlacement='outside'
          placeholder='Ingresa el número de grupo'
          onChange={(ev) => handleChange(ev, setInputGrupo, 0)}
          value={inputGrupo}
        />
        <Input
          type='text'
          label='Nombre nuevo'
          labelPlacement='outside'
          placeholder='Ingresa el nuevo nombre del grupo'
          onChange={(ev) => handleChange(ev, setInputNombre, 2)}
          value={inputNombre}
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