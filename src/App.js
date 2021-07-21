import './App.css';
import Home from './Components/Home';
import RouterSetup from './Components/RouterSetup';
function App() {
  return (
    <RouterSetup>
    <div className="App">
     <Home/>
    </div>
    </RouterSetup>
  );
}

export default App;
