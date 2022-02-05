import ReactDOM from 'react-dom';
import Pacman from './components/Pacman';

const App = () => {
  return (
    <div>
      <Pacman />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
