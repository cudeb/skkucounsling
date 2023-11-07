import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import MainPage from "./components/pages/mainpage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignupPage from "./components/pages/SignupPage";
import Calendar from "./components/Calendar";
import CalendarTest from "./components/CalendarTest";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/calendar" element={<CalendarTest />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
