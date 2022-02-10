import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../setup/types';
import { restartGame } from '../actions/game';
import { theme } from '../theme';

const ModalWrapper = styled.div`
  position: absolute;
  width: 40vw;
  height: 70vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #aaa;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 3em;
  border: 10px solid #000;
`;

const Title = styled.h2`
  font-size: 4rem;
  text-align: center;
  background-color: #aaa; ;
`;

const ScoreInfo = styled.h3`
  font-size: 3rem;
  text-align: center;
  background-color: #aaa;
`;

const RestartButton = styled.div`
  width: 30%;
  margin: 3em auto;
  font-size: 3rem;
  text-align: center;
  background-color: #aaa;
  border: 8px solid #000;
  border-radius: 2em;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    border-color: ${theme.COLORS.dark_blue};
    transform: scale(1.1);
    color: ${theme.COLORS.dark_blue}
  }
`;

type ModalProps = {
  setModal: (show: boolean) => void;
};

export const Modal: React.FC<ModalProps> = ({ setModal }) => {
  const dispatch = useDispatch();
  const maxScore = useSelector<AppState, number>((state) => state.maxScore);
  const currentScore = useSelector<AppState, number>(
    (state) => state.currentScore
  );

  const restart = () => {
    dispatch(restartGame());
    setModal(false);
  };

  return (
    <ModalWrapper>
      <Title>Вас скушали</Title>
      <hr />
      <ScoreInfo>Максимальный рекорд: {maxScore}</ScoreInfo>
      <ScoreInfo>Текущий рекорд: {currentScore}</ScoreInfo>
      <RestartButton onClick={restart}>OK</RestartButton>
    </ModalWrapper>
  );
};
