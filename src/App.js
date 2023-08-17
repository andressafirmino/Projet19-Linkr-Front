import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TimeLinePage from "./pages/TimeLinePage";
import ProfilePage from "./pages/ProfilePage";
import { UserDataProvider } from "./context/UserDataContext";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <>
      <UserDataProvider>
        <MenuProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/timeline" element={<TimeLinePage />} />
              <Route path="/user/:id" element={<ProfilePage />} />
            </Routes>
          </BrowserRouter>
        </MenuProvider>
      </UserDataProvider>
    </>
  );
}

export default App;
