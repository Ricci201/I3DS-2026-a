import { useState } from "react";
import "./App.css";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

function App() {
  const [chatVisible, setChatVisible] = useState(false);
  const [socket, setSocket] = useState(null);
  return (
    <>
      {chatVisible ? (
        <Chat socket={socket} />
      ) : (
        <Join setSocket={setSocket} setChatVisible={setChatVisible} />
      )}
    </>
  );
} 

export default App;
