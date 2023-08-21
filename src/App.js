import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TimeLinePage from "./pages/TimeLinePage";
import ProfilePage from "./pages/ProfilePage";
import { UserDataProvider } from "./context/UserDataContext";
import { MenuProvider } from "./context/MenuContext";
import { PostsProvider } from "./context/PostsContext";
import { HashtagProvider } from "./context/HashtagContext";
import HashtagPage from "./pages/HashtagPage";

function App() {
  return (
    <>
      <UserDataProvider>
        <MenuProvider>
          <PostsProvider>
            <HashtagProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/sign-up" element={<SignUpPage />} />
                  <Route path="/timeline" element={<TimeLinePage />} />
                  <Route path="/user/:id" element={<ProfilePage />} />
                  <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
                </Routes>
              </BrowserRouter>
            </HashtagProvider>
          </PostsProvider>
        </MenuProvider>
      </UserDataProvider>
    </>
  );
}

export default App;
