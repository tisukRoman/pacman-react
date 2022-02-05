import ReactDOM from 'react-dom';
import Pacman from './components/Pacman';
import Arena from './components/Arena';
import './index.css';

const App = () => {
  return (
    <div>
      <Arena />
      <Pacman />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
