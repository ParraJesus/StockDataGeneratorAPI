import "./style/Global.css";
import { BrowserRouter } from "react-router-dom";
import TitleManager from "./components/TitleManager";
import AppRouter from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <TitleManager />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
