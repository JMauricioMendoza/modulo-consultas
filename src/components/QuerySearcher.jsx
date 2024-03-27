import {Autocomplete, AutocompleteItem} from '@nextui-org/react';
import styled from 'styled-components';
import queriesData from '../utils/queriesData.json'

export default function QuerySearcher () {
  return(
    <SearcherCont>
    <Autocomplete
      label='Busca una consulta'
      labelPlacement='outside'
      variant='bordered'
    >
      {queriesData.map((item) => (
        <AutocompleteItem value={item.value} key={item.value}>
          {item.label}
        </AutocompleteItem>
      ))}      
    </Autocomplete>

    </SearcherCont>
  );
};

const SearcherCont = styled.div`
  width: 300px;
`;