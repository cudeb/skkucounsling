import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import MainPage from "./components/pages/mainpage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignupPage from "./components/pages/SignupPage";
import Calendar from "./components/Calendar";
import CalendarTest from "./components/CalendarTest";
import LoginPage from "./components/pages/LoginPage";
import SignupDonePage from "./components/pages/SignupDonePage";
import StudentMainPage from "./components/pages/StudentMainPage";
import StudentApplyPage from "./components/pages/StudentApplyPage";
import { loginStore } from "./dataflow/store";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <Routes>
            {/**
             * 페이지를 라우팅 테이블에 등록해주세요.
             */}
            <Route path="/signuppage" element={<SignupPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signupdone" element={<SignupDonePage />} />
            {loginStore.loginSuccess ? (
              <>
                <Route path="/calendar" element={<CalendarTest />} />

                <Route path="/student/home" element={<StudentMainPage />} />
                <Route
                  path="/student/application"
                  element={<StudentApplyPage />}
                />
              </>
            ) : (
              <>
                <Route path="/*" element={<LoginPage />} />
              </>
            )}
          </Routes>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
