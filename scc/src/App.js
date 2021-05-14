import { ThemeProvider } from "@material-ui/styles";
import MiniDrawer from './Components/Drawers/drawer'
// import DrawerM from './Components/Drawers/drawerM'
import Theme from './app/themes/Theme'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <MiniDrawer />
      </ThemeProvider>
    </div>
  );
}

export default App;
