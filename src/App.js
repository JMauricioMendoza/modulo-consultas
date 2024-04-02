import { useState } from 'react';
import styled from 'styled-components';
import { NextUIProvider, Button } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import QuerySearcher from './components/QuerySearcher';
import ActualizarSeguro from './components/ActualizarSeguro';

export default function App() {
  const [searchInput, setSearchInput] = useState(null);
  const [stage, setStage] = useState(null);

  const onSelectionChange = (id) => {
    setSearchInput(id);
  };

  const handleClick = () => {
    switch(searchInput) {
      case 'actualizar-seguro':
        setStage(<ActualizarSeguro/>);
      break;
    };
  };

  return (
    <NextUIProvider>
      <AppDiv>
        <AllCont>
          <SearcherButtonCont>
            <QuerySearcher
              onSelectionChange={onSelectionChange}
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
      </AppDiv>
    </NextUIProvider>
  );
};

const AppDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 32px;
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