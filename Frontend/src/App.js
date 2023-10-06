
// import from react-router-dom
import { Route, Routes } from "react-router-dom";
// importing components
import Authentication from './Pages/Authentication'
import ChatPage from './Pages/ChatPage'
import './CSS/style.css';
import ErrorPage from "./components/ErrorPage";


function App() {
  return (
    <>
      <Routes>
        {/* making router */}
        <Route exact path="/" element={<ChatPage />} />
         <Route exact path="/auth" element={<Authentication />} />
         <Route exact path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
