import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Switch, Input, Button, Textarea } from '@nextui-org/react';
import handleChange from '../utils/handleChange';
import areInputsEmpty from '../utils/areInputsEmpty';
import { FaPeopleGroup, FaPerson } from 'react-icons/fa6';

export default function ReasignarCartera({ handleModal }) {
  const [isSwitchSelected, setIsSwitchSelected] = useState(false);
  const [inputPromotor, setInputPromotor] = useState('');
  const [textArea, setTextArea] = useState('');
  const [inputSucursal, setInputSucursal] = useState(''); 
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState('');

  const handleCorrect = (mensaje) => {
    handleModal(false, mensaje);

    setInputPromotor('');
    setInputSucursal('');
    setTextArea('');
  };

  const sendData = async () => {
    const lista = textArea.split(',').map(numero => parseInt(numero));

    const commonData = {
      sucursal: parseInt(inputSucursal),
      promotor: parseInt(inputPromotor),
      esGrupal: isSwitchSelected
    };
    
    const data = isSwitchSelected 
      ? { ...commonData, grupos: lista } 
      : { ...commonData, creditos: lista };

    await axios.post('https://192.168.100.7/consultas-db/public/perrillo/reasignacionCartera', data)
      .then(response => {
        if(response.data.estado) handleCorrect(response.data.mensaje);
        else handleModal(true, response.data.mensaje);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() =>{
    setIsApplyButtonDisabled(areInputsEmpty([inputPromotor, inputSucursal, textArea]));
  }, [inputPromotor, inputSucursal, textArea]);

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
            label='Número de promotor'
            labelPlacement='outside'
            placeholder='Ingresa el número de promotor'
            onChange={(ev) => handleChange(ev, setInputPromotor, 0)}
            value={inputPromotor}
          />
        </InputCont>
        <InputCont>
          <Input
            type='text'
            label='Número de sucursal'
            labelPlacement='outside'
            placeholder='Ingresa el número de sucursal'
            onChange={(ev) => handleChange(ev, setInputSucursal, 0)}
            value={inputSucursal}
          />
        </InputCont>
      </InputButtonCont>
      <InputButtonCont>
        <Textarea
          label={`Número de ${isSwitchSelected ? 'grupo' : 'crédito'}`}
          placeholder={`Ingresa los números de ${isSwitchSelected ? 'grupo' : 'crédito'} separados por una coma ","`}
          labelPlacement='outside'
          value={textArea}
          onChange={(ev) => handleChange(ev, setTextArea, 3)}
        />
      </InputButtonCont>
      <ButtonCont>
        <Button
          color='primary'
          isDisabled={isApplyButtonDisabled}
          onClick={sendData}
        >
          Aplicar
        </Button>
      </ButtonCont>      
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

const ButtonCont = styled.div`
  display: grid;
  padding: 24px;
  place-items: center;
  width: 100%;
`;
