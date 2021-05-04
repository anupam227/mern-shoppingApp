import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import store from './store';
import { Provider } from 'react-redux';
import ItemModal from './components/itemModal';
import { Container } from 'reactstrap';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavBar />
      <Container>
      <ItemModal />
      <ShoppingList />
      </Container>
    </div>
    </Provider>
  );
}

export default App;
