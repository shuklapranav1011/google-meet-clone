import './App.css';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <>Google Meet Clone</>
    </Provider>
  );
}

export default App;
