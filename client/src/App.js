import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import CallPage from './components/pages/CallPage';
import ErrorPage from './components/pages/ErrorPage';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './components/pages/Login';

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <Provider store={store}>
      <Router>
        {loading ? (
          'Loading...'
        ) : !user ? (
          <Login></Login>
        ) : (
          <Switch>
            <Route exact path='/:id' component={CallPage} />
            <Route exact path='/' component={HomePage} />
            <Route component={ErrorPage} />
          </Switch>
        )}
      </Router>
    </Provider>
  );
}

export default App;
