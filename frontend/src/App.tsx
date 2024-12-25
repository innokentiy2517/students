import './App.css'
import {Router} from "./Router.tsx";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {MantineProvider} from "@mantine/core";

function App() {
  return (
      <MantineProvider defaultColorScheme={'dark'}>
        <Router />
      </MantineProvider>
  )
}

export default App
