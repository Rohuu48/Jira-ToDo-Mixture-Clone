import Navbar from "components/Navbar";
import RootRoute from "./routes";
import DrawerContainer from "components/Drawer";
import AlertContainer from "components/Alert";
import { useSelector } from "react-redux";
import { ReactContext } from "./context";
import { RootStateOrAny } from "react-redux";

const App = () => {
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.auth.isLoggedIn
  );

  return (
    <ReactContext.Provider value={{ isLoggedIn }}>
      <div>
        <Navbar />
        <DrawerContainer />
        <RootRoute />
        <AlertContainer />
      </div>
    </ReactContext.Provider>
  );
};

export default App;
