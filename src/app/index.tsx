import { Header } from "../components/header/Header";
import { withProviders } from "./providers";
import "./index.scss";
import { AppRoutes } from "../components/appRoutes/AppRoutes";


const App = () => {
  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default withProviders(App);
