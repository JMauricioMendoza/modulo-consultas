import { useState } from 'react';
import styled from 'styled-components';
import { NextUIProvider, Button } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import QuerySearcher from './components/QuerySearcher';

export default function App() {
  const [searchInput, setSearchInput] = useState(null);

  const onSelectionChange = (id) => {
    setSearchInput(id);
  };

  const handleClick = () => {
    switch(searchInput) {
      
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
              color='warning'
              size='md'
              startContent={<FaSearch/>}
              onClick={handleClick}
            >
              Buscar
            </Button>
          </SearcherButtonCont>
        </AllCont>
      </AppDiv>
    </NextUIProvider>
  );
};

const AppDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 36px;
  width: 100vw;
`;

const AllCont = styled.div`
  width: 1000px;
`;

const SearcherButtonCont = styled.div`
  align-items: end;
  display: flex;
  gap: 18px;
`;