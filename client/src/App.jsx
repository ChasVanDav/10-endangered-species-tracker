import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/MyNavBar';
import ListEvents from './components/ListEvents';

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <ListEvents />
    </div>
  );
}

export default App;

