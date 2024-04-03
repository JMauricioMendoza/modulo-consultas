import styled from 'styled-components';
import logoPerrillo from '../assets/logo.png';

export default function Header () {
  return(
    <HeaderCont>
      <Imagen target='_blank' href='https://pbs.twimg.com/media/CwC5L0-UEAAMcMe.jpg'>
        <img src={logoPerrillo} alt='logo'/>
      </Imagen>      
      <Titulo>Sistemas perrillo</Titulo>
    </HeaderCont>
  );
};

const HeaderCont = styled.header`
  align-items: center;
  background-color: #D7AC2B;
  display: flex;
  height: 64px;
  justify-content: space-between;
  left: 0;
  padding: 0 32px;
  position: fixed;
  top: 0;
  width: 100vw;
`;

const Titulo = styled.h1`
  color: #000000;
  font-family: "Silkscreen", sans-serif;
  font-size: 32px;
`;

const Imagen = styled.a`
  width: 64px;

  img {
    object-fit: cover;
    width: 100%;
  }
`;