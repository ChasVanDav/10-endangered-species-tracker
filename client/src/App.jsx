import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/MyNavBar';
import ListSightings from './components/ListSightings';

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <ListSightings />
    </div>
  );
}

export default App;


