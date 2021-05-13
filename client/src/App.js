import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import store from './store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import ItemModal from './components/itemModal';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';

const App = () => {

  const auth = useSelector(state => state.auth);
  //const auth = {token,user}
  const dispatch = useDispatch();
  //console.log(auth.user)
  useEffect(() => {
    dispatch(loadUser(auth))
  }, [dispatch])

  return (
    <div className="App">
      <AppNavBar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </div>
  );
}

export default App;
