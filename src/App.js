import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TimeLinePage from "./pages/TimeLinePage";
import { TokenProvider } from "./context/TokenContext";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <>
      <TokenProvider>
        <MenuProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/timeline" element={<TimeLinePage />} />
            </Routes>
          </BrowserRouter>
        </MenuProvider>
      </TokenProvider>
    </>
  );
}

export default App;
