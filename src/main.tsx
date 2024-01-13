import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import Header from "./components/Header";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Header />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </>
);
