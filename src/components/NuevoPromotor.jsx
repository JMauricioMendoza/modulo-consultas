import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Switch, Input, Button } from '@nextui-org/react';
import handleChange from '../utils/handleChange';
import areInputsEmpty from '../utils/areInputsEmpty';
import { FaPeopleGroup, FaPerson } from 'react-icons/fa6';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';

export default function ReasignarCartera({ handleModal }) {
  const [isSwitchSelected, setIsSwitchSelected] = useState();
  const [inputPromotor, setInputPromotor] = useState('');
  const [inputCredito, setInputCredito] = useState(''); 
  const [inputSucursal, setInputSucursal] = useState(''); 
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState('');
  const [lista, setLista] = useState([]);
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState('');

  const addToList = () => {
    setLista(prevArray => [...prevArray, parseInt(inputCredito)]);
    setInputCredito('');
  };

  const eraseFromList = (idx) => {
    const tempArray = [...lista];
    tempArray.splice(idx, 1);
    setLista(tempArray);
  };

  const disableButton = () => {
    if(areInputsEmpty([inputPromotor, inputSucursal])) return true;

    if(lista.length === 0) return true;

    return false;
  };

  const handleCorrect = (mensaje) => {
    handleModal(false, mensaje);

    setInputPromotor('');
    setInputCredito('');
    setInputSucursal('');
    setLista([]);
  };

  const sendData = async () => {
    const dataGrupal = {
      grupos : lista,
      sucursal : parseInt(inputSucursal),
      promotor : parseInt(inputPromotor)
    };

    const dataIndividual = {
      creditos : lista,
      sucursal : parseInt(inputSucursal),
      promotor : parseInt(inputPromotor)
    };

    const url = isSwitchSelected ? 'reasignacionCarteraGrupal' : 'reasignacionCarteraIndividual';
    const data = isSwitchSelected ? dataGrupal : dataIndividual;

    await axios.post(`https://192.168.100.7/consultas-db/public/perrillo/${url}`, data)
      .then(response => {
        if(response.data.estado) handleCorrect(response.data.mensaje);
        else handleModal(true, response.data.mensaje);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    setIsAddButtonDisabled(areInputsEmpty([inputCredito]));
  }, [inputCredito]);

  useEffect(() => {
    setIsApplyButtonDisabled(disableButton());
  }, [inputPromotor, lista, inputSucursal]);

  useEffect(() => {
    setLista([]);
  }, [isSwitchSelected]);

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
        <InputCont>
          <Input
            type='text'
            label={`Número de ${isSwitchSelected ? 'grupo' : 'crédito'}`}
            labelPlacement='outside'
            placeholder={`Ingresa el número de ${isSwitchSelected ? 'grupo' : 'crédito'}`}
            onChange={(ev) => handleChange(ev, setInputCredito, 0)}
            value={inputCredito}
          />
        </InputCont>
        <Button
          isIconOnly
          color='success'
          isDisabled={isAddButtonDisabled}
          onClick={addToList}
        >
          <FaPlus/>
        </Button>
      </InputButtonCont>
      {lista.map((item, index) => (
        <Tabla key={index}>
          <TextoTabla>{item}</TextoTabla>
          <Button
            color='danger'
            isIconOnly
            onClick={() => eraseFromList(index)}
          >
            <FaRegTrashAlt/>
          </Button>
        </Tabla>
      ))}
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

const Tabla = styled.div`
  display: grid;
  gap: 0;
  grid-template-columns: 128px 128px;
  place-items: center;
  padding: 8px;
`;

const TextoTabla = styled.p`
  text-align: center;
`;

const ButtonCont = styled.div`
  display: grid;
  padding: 24px;
  place-items: center;
  width: 100%;
`;
