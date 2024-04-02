import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input, Button, Modal, ModalContent, ModalBody, useDisclosure, ModalHeader, ModalFooter } from '@nextui-org/react';
import { FaCheck, FaRegCheckCircle  } from 'react-icons/fa';
import { MdOutlineErrorOutline } from 'react-icons/md';

export default function ActualizarSeguro () {
  const [inputSolicitud, setInputSolicitud] = useState('');
  const [inputMonto, setInputMonto] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modal, setModal] = useState(null);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

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

    onOpen();

    await axios.post('http://192.168.100.7/operaciones_GOD/public/sistemas/perrillo/actMontSeguro', data)
      .then(response => {
        if(response.data.Estado) handleCorrect(response.data.Mensaje);
        else handleError(response.data.Mensaje);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCorrect = (mensaje) => {
    setInputSolicitud('');
    setInputMonto('');

    setModal(
      <>
        <ModalHeader className="flex flex-col gap-1">{mensaje}</ModalHeader>
        <ModalBody>
          <IconCont>
            <FaRegCheckCircle/>
          </IconCont>
        </ModalBody>
      </>
    );
  };

  const handleError = (error) => {
    setModal(
      <>
        <ModalHeader className="flex flex-col gap-1">{error}</ModalHeader>
        <ModalBody>
          <IconCont $rojo>
            <MdOutlineErrorOutline/>
          </IconCont>
        </ModalBody>
      </>
    );
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {modal}
        </ModalContent>
      </Modal>
    </>
  );
};

const InputsCont = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 32px;
`;

const IconCont = styled.div`
  color: ${({ $rojo }) => $rojo ?  '#F31260' : '#18C964'};
  display: grid;
  font-size: 64px;
  padding-bottom: 32px;
  place-content: center;
  width: 100%;
`;