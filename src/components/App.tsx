import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setMaxScoreToStorage } from '../functions/localStorage';
import { AppState } from '../setup/types';
import Arena from './Arena';
import Header from './Header';
import { Modal } from './Modal';

const App = () => {
  const gameIsLose = useSelector<AppState, boolean>((state) => state.isLose);
  const currentScore = useSelector<AppState, number>((state) => state.currentScore);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (gameIsLose) {
      setModal(true);
      setMaxScoreToStorage(currentScore);
    }
  }, [gameIsLose, currentScore]);

  return (
    <>
      {modal && <Modal setModal={setModal} />}
      <Header />
      <Arena />
    </>
  );
};

export default App;
