import { ThemeProvider } from "@material-ui/styles";
import MiniDrawer from "./Components/Drawers/drawer";
// import DrawerM from './Components/Drawers/drawerM'
import Theme from "./app/themes/Theme";
import Login from "./Components/Auth/Login";
import Error from "./Components/ErrorScreen";

import { Switch, Link, Route,BrowserRouter as Router } from "react-router-dom";

function App() {
  localStorage.getItem("useTtoken");

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={MiniDrawer} />
        <Route component={Error} />
      </Switch>
    </Router>
    // <div className="App">
    //   <ThemeProvider theme={Theme}>
    //     <MiniDrawer />
    //   </ThemeProvider>
    // </div>
  );
}

export default App;
