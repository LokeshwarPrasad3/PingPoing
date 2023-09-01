// eslint-disable-next-line
// import from react-router-dom
import { Route, Routes } from "react-router-dom";
// importing components
import HomePage from './components/HomePage'
import ChatPage from './components/ChatPage'



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
