import styled from 'styled-components';
import { Modal, ModalContent, ModalBody, ModalHeader } from '@nextui-org/react';

export default function ModalComp ({ modalContent, isOpen, onOpenChange }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{modalContent.mensaje}</ModalHeader>
        <ModalBody>          
          <IconCont>
            <Imagen>
              <img 
                src={modalContent.error ?
                    'https://pbs.twimg.com/media/FZQHdwRXoAIhzp2.jpg' :
                    'https://pbs.twimg.com/media/Fbb96wcX0AABko4.jpg'
                  }
                alt='modal'
              />
            </Imagen>
          </IconCont>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const IconCont = styled.div`
  display: grid;
  padding-bottom: 32px;
  place-content: center;
  width: 100%;
`;

const Imagen = styled.div`
  width: 192px;

  img {
    object-fit: cover;
    width: 100%;
  }
`;