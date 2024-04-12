import styled from 'styled-components';

export default function Header ({ lightMode }) {
  return(
    <HeaderCont $lightMode={lightMode}>
      <Imagen target='_blank' href='https://pbs.twimg.com/media/CwC5L0-UEAAMcMe.jpg'>
        <img src='https://192.168.100.7/consultas-db/public/perrillo-assets/static/media/logo.png' alt='logo'/>
      </Imagen>      
      <Titulo $lightMode={lightMode}>Sistemas perrillo</Titulo>
    </HeaderCont>
  );
};

const HeaderCont = styled.header`
  align-items: center;
  display: flex;
  height: 64px;
  justify-content: space-between;
  left: 0;
  padding: 0 32px;
  position: fixed;
  top: 0;
  transition: background .3s;
  width: 100vw;
`;

const Titulo = styled.h1`
  color: ${({ $lightMode }) => $lightMode ? '#000000' : '#FFFFFF'};
  font-family: "Silkscreen", sans-serif;
  font-size: 32px;
  transition: color .3s;
`;

const Imagen = styled.a`
  width: 64px;

  img {
    object-fit: cover;
    width: 100%;
  }
`;