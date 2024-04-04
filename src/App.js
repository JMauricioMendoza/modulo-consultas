import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NextUIProvider, Button, useDisclosure } from '@nextui-org/react';
import Header from './components/Header';
import QuerySearcher from './components/QuerySearcher';
import ActualizarSeguro from './components/ActualizarSeguro';
import GenerarPass from './components/GenerarPass';
import ModalComp from './components/ModalComp';
import DarkThemeSwitch from './components/DarkThemeSwitch';
import { FaSearch } from 'react-icons/fa';

export default function App() {
  const [searchInput, setSearchInput] = useState(null);
  const [stage, setStage] = useState(null);
  const [modalContent, setModalContent] = useState({});
  const [lightMode, setLightMode] = useState(true);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const storageKey = 'lightMode';

  const handleModal = (error, mensaje) => {
    setModalContent({
      error : error,
      mensaje : mensaje
    });

    onOpen();
  };

  const handleClick = () => {
    switch(searchInput) {
      case 'actualizar-seguro':
        setStage(<ActualizarSeguro handleModal={handleModal}/>);
      break;
      case 'generar-pass':
        setStage(<GenerarPass handleModal={handleModal}/>)
      break;
      default :
        setStage(null);
      break;
    };
  };

  useEffect(() => {
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue !== null) {
      setLightMode(JSON.parse(storedValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(lightMode));
  }, [lightMode]);

  return (
    <NextUIProvider>
      <AppDiv className={lightMode ? null : 'dark text-foreground bg-background'}>
        <AllCont>
          <Header lightMode={lightMode}/>
          <SearcherButtonCont>
            <QuerySearcher
              onSelectionChange={(id) => setSearchInput(id)}
            />
            <Button
              color='primary'
              size='md'
              startContent={<FaSearch/>}
              onClick={handleClick}
            >
              Buscar
            </Button>
          </SearcherButtonCont>
          {stage}
        </AllCont>
        <SwitchCont>
          <DarkThemeSwitch setLightMode={setLightMode}/>
        </SwitchCont>
      </AppDiv>
      <ModalComp isOpen={isOpen} onOpenChange={onOpenChange} modalContent={modalContent}/>      
    </NextUIProvider>
  );
};

const AppDiv = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding-top: 96px;
  width: 100vw;
`;

const AllCont = styled.div`
  width: 769px;
`;

const SearcherButtonCont = styled.div`
  align-items: end;
  display: flex;
  gap: 16px;
  padding-bottom: 48px;
`;

const SwitchCont = styled.div`
  bottom: 32px;
  left: 32px;
  position: fixed;
`;