import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input, Button } from '@nextui-org/react';
import handleChange from '../utils/handleChange';
import areInputsEmpty from '../utils/areInputsEmpty';
import { FaSearch } from 'react-icons/fa';

export default function BuscarClave ({ lightMode }) {
  const [inputGrupo, setInputGrupo] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([])

  const sendData = async () => {
    const data = {
      clave : inputGrupo
    };

    await axios.post('https://192.168.100.7/consultas-db/public/perrillo/buscarClaveSafi', data)
      .then(response => {
        setMessage(response.data.mensaje);
        setUsers(response.data.usuarios)
      })
      .catch(error => {
        console.warn(error);
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
            label='Clave de usuario'
            labelPlacement='outside'
            placeholder='Ingresa la clave de usuario'
            onChange={(ev) => handleChange(ev, setInputGrupo, 2)}
            value={inputGrupo}
          />
        </InputCont>
        <Button
          color='success'
          size='md'
          isDisabled={isButtonDisabled}
          onClick={sendData}
          endContent={<FaSearch/>}
        >
          Buscar
        </Button>
      </InputsButtonCont>
      <StyledP>{message}</StyledP>
      {users && users.map((item, index) => (
        <Tabla key={index}>
          <TextoTabla $lightMode={lightMode} key={index}>{item.UsuarioID}</TextoTabla>
          <TextoTabla $lightMode={lightMode} key={index}>{item.NombreCompleto}</TextoTabla>
          <TextoTabla $lightMode={lightMode} key={index}>{item.Clave}</TextoTabla>
        </Tabla>
      ))}
    </>
  );
};

const InputsButtonCont = styled.div`
  align-items: end;
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;

const InputCont =  styled.div`
  width: 376.5px;
`;

const StyledP = styled.p`
  margin-bottom: 32px;
`;

const Tabla = styled.div`
  display: grid;
  gap: 0;
  grid-template-columns: 10% 1fr 20%;
  grid-template-rows: auto;
`;

const TextoTabla = styled.p`
  margin-bottom: 16px;
  text-align: center;
`;