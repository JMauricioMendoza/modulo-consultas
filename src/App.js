import styled from 'styled-components';
import {NextUIProvider} from '@nextui-org/react';

export default function App() {
  return (
    <NextUIProvider>
      <AppDiv>

      </AppDiv>
    </NextUIProvider>
  );
};

const AppDiv = styled.div`

`;