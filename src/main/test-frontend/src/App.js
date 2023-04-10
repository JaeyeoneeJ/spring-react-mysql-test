import React, { useEffect, useState } from "react";
import axios from "axios";
import GetOneUser from "./Pages/GetOneUser";
import UserList from "./Pages/UserList";
import SignUpModal from "./Pages/SignUpModal";

function App() {
  const [onSignUp, setOnSignUp] = useState(false);
  const [userList, setUserList] = useState([]);

  return (
    <>
      <button onClick={() => setOnSignUp(true)}>Sign Up</button>
      {onSignUp && (
        <SignUpModal
          userList={userList}
          setUserList={setUserList}
          setOnSignUp={setOnSignUp}
        />
      )}
      <GetOneUser />
      <UserList userList={userList} setUserList={setUserList} />
    </>
  );
}

export default App;
