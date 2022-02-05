import Pacman from './components/Pacman';
import Arena from './components/Arena';
import Header from './components/Header';
import styled from 'styled-components';


const App = () => {
  return (
    <div>
      <Header/>
      <Arena/>
      <Pacman/>
    </div>
  );
};

export default App;
