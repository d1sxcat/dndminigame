import { GameDataProvider } from "./providers/GameContextProvider";
import GameManager from "./components/GameManager";
import "./App.css";

function App() {

  return (
    <>
      <GameDataProvider>
        <GameManager />
      </GameDataProvider>
    </>
  );
}

export default App;
