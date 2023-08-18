import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TimeLinePage from "./pages/TimeLinePage";
import { UserDataProvider } from "./context/UserDataContext";
import { MenuProvider } from "./context/MenuContext";
import { PostsProvider } from "./context/PostsContext";

function App() {
  return (
    <>
      <UserDataProvider>
        <MenuProvider>
          <PostsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/timeline" element={<TimeLinePage />} />
              </Routes>
            </BrowserRouter>
          </PostsProvider>
        </MenuProvider>
      </UserDataProvider>
    </>
  );
}

export default App;
