import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../setup/types';
import Arena from './Arena';
import Header from './Header';
import { Modal } from './Modal';

const App = () => {
  const gameIsLose = useSelector<AppState, boolean>((state) => state.isLose);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (gameIsLose) {
      setModal(true);
    }
  }, [gameIsLose]);

  return (
    <>
      {modal && <Modal setModal={setModal} />}
      <Header />
      <Arena />
    </>
  );
};

export default App;
