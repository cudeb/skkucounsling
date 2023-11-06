import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import MainPage from "./components/pages/mainpage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignupPage from "./components/pages/SignupPage";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
