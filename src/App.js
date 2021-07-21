import "./App.css";
import Home from "./Components/Home/Home";
import RouterSetup from "./Components/RouterSetup/RouterSetup";
function App() {
	return (
		<RouterSetup>
			<div className="App">
				<Home />
			</div>
		</RouterSetup>
	);
}

export default App;
