import { BrowserView,MobileView } from "react-device-detect";
import MiniDrawer from './Components/Drawers/drawer'
import DrawerM from './Components/Drawers/drawerM'

function App() {
  return (
    <div className="App">
      <BrowserView>
        <MiniDrawer />
      </BrowserView>
      <MobileView>
        <DrawerM/>
      </MobileView>
    </div>
  );
}

export default App;
