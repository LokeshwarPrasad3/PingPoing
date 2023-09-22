// eslint-disable-next-line
// import from react-router-dom
import { Route, Routes } from "react-router-dom";
// importing components
import HomePage from './Pages/HomePage'
import ChatPage from './Pages/ChatPage'
import './CSS/style.css';


function App() {
  return (
    <>
      <Routes>
        {/* making router */}
         <Route exact path="/" element={<HomePage />} />
        <Route exact path="/chats" element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;
