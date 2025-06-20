import { Route, Routes } from "react-router-dom";
import ManagerPage from "./pages/manager-page";
import HomePage from "./pages/home-page";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import AccountPage from "./pages/account-page";
const App = () => {
  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey="6LcicisrAAAAAPH3VhH6x8jaxYpHVj7TKsn-TCFF"
        language="en"
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/manager" element={<ManagerPage />}></Route>
            <Route path="/account" element={<AccountPage />}></Route>
          </Route>
        </Routes>
      </GoogleReCaptchaProvider>
    </>
  );
};

export default App;
