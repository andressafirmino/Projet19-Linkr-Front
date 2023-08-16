import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { TokenProvider } from "./context/TokenContext";
import TimeLinePage from "./pages/TimeLinePage";

function App() {
  return (
    <>
      <TokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/timeline" element={<TimeLinePage />} />
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </>
  );
}

export default App;
