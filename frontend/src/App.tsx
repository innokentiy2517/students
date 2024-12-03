import './App.css'
import {Router} from "./Router.tsx";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {MantineProvider} from "@mantine/core";

function App() {
  return (
      <MantineProvider>
        <Router />
      </MantineProvider>
  )
}

export default App
