import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Switch, Input, Button } from '@nextui-org/react';
import handleChange from '../utils/handleChange';
import areInputsEmpty from '../utils/areInputsEmpty';
import { FaPeopleGroup, FaPerson } from 'react-icons/fa6';

export default function ReversaDesembolso ({ handleModal }) {
  const [isSwitchSelected, setIsSwitchSelected] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [inputCredito, setInputCredito] = useState(''); 

  const handleCorrect = (mensaje) => {
    handleModal(false, mensaje);

    setInputCredito('');
  };

  const sendData = async () => {
    
    const data = isSwitchSelected 
      ? { esGrupal: isSwitchSelected, grupos: inputCredito } 
      : { esGrupal: isSwitchSelected, creditos: inputCredito };

    await axios.post('https://192.168.100.7/consultas-db/public/perrillo/reasignacionCartera', data)
      .then(response => {
        if(response.data.estado) handleCorrect(response.data.mensaje);
        else handleModal(true, response.data.mensaje);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    setIsButtonDisabled(areInputsEmpty([inputCredito]));
  }, [inputCredito]);

  return (
    <>
      <Switch
        isSelected={isSwitchSelected}
        size='lg'
        color='success'
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <FaPeopleGroup className={className} />
          ) : (
            <FaPerson className={className} />
          )
        }
        onChange={(event) => setIsSwitchSelected(event.target.checked)}
      />
      <Label>{isSwitchSelected ? 'Grupal' : 'Individual'}</Label>
      <InputButtonCont>
        <InputCont>
          <Input
            type='text'
            label={`Numero de ${isSwitchSelected ? 'grupo' : 'crédito'}`}
            labelPlacement='outside'
            placeholder={`Ingresa el número de ${isSwitchSelected ? 'grupo' : 'crédito'}`}
            onChange={(ev) => handleChange(ev, setInputCredito, 0)}
            value={inputCredito}
          />
        </InputCont>
        <Button
          color='primary'
          isDisabled={isButtonDisabled}
        >
          Aplicar
        </Button>
      </InputButtonCont>
    </>
  );
}

const Label = styled.p`
  font-size: 14px;
  padding-bottom: 32px;
`;

const InputButtonCont = styled.div`
  align-items: end;
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
`;

const InputCont = styled.div`
  width: 376.5px;
`;