import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from '@nextui-org/react';
import { FaCopy } from 'react-icons/fa';
import { FaArrowRotateLeft } from 'react-icons/fa6';

export default function GenerarPass ({ handleModal }) {
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateInterval, setGenerateInterval] = useState(null);

  const copyToClipboard = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(inputValue)
        .then(() => handleModal(false, `Texto copiado al portapapeles: ${inputValue}`))
        .catch(error => console.error('Error al copiar al portapapeles: ', error));
    } else {
      console.error('actualiza tu navegador perro.');
    }
  };  

  const getRandomNumber = () => {
    return(Math.floor(Math.random() * 30));
  };

  const getRandomPass = () => {
    const fruit = fruitArray[getRandomNumber()];
    const randomNumber = getRandomNumber() + 1;
    const paddedNumber = String(randomNumber).padStart(2, '0');
    const pass = fruit + '_' + paddedNumber;

    setInputValue(pass);
  };

  useEffect(getRandomPass, []);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(getRandomPass, 50);
      setGenerateInterval(interval);
    } else {
      clearInterval(generateInterval);
    }

    return () => clearInterval(generateInterval);
  }, [isGenerating]);

  return(
    <>
      <InputButtonCont>
        <InputCont>
          <Input
            isReadOnly
            type='text'
            label='Contraseña generada'
            labelPlacement='outside'
            value={inputValue}
          />  
        </InputCont>          
        <Button
          color='primary'
          size='md'
          endContent={<FaCopy/>}
          onClick={copyToClipboard}
        >
          Copiar
        </Button>
      </InputButtonCont>      
      <Button
        color='warning'
        size='md'
        endContent={<FaArrowRotateLeft/>}
        onPressStart={() => setIsGenerating(true)}
        onPressEnd={() => setIsGenerating(false)}
      >
        Volver a generar
      </Button>
    </>
  );
};

const fruitArray = [
  'Arandano', 'Frambuesa', 'Fresa', 'Grosella', 'Zarzamora', 'Limon', 'Mandarina', 'Naranja', 'Pomelo', 'Melon', 'Sandia',
  'Aguacate', 'Carambola', 'Chirimoya', 'Coco', 'Datil', 'Kiwi','Litchi', 'Mango', 'Papaya', 'Platano', 'Cereza', 'Ciruela',
  'Manzana', 'Melocoton', 'Nispero', 'Pera', 'Uva', 'Almendra', 'Avellana'
];

const InputButtonCont = styled.div`
  align-items: end;
  display: flex;
  gap: 16px;
  padding-bottom: 32px;
`;

const InputCont =  styled.div`
  width: 376.5px;
`;