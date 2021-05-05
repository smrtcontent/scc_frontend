import { ThemeProvider } from "@material-ui/styles";
import { BrowserView,MobileView } from "react-device-detect";
import MiniDrawer from './Components/Drawers/drawer'
import DrawerM from './Components/Drawers/drawerM'
import Theme from './app/themes/Theme'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
      <BrowserView>
        <MiniDrawer />
      </BrowserView>
      <MobileView>
        <DrawerM/>
      </MobileView>
      </ThemeProvider>
    </div>
  );
}

export default App;
