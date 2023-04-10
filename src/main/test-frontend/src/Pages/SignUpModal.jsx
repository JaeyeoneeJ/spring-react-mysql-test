import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  box-sizing: border-box;
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  width: 100%;
  min-width: 200px;
  max-width: 500px;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9);
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputBox = styled.input`
  padding: 4px 10px;
  border: 1px solid lightgray;
  border-radius: 3px;
`;

const SignUpModal = ({ setOnSignUp, userList, setUserList }) => {
  const initialState = {
    accountId: "",
    username: "",
    age: "",
  };

  const [userState, setUserState] = useState(initialState);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserState({ ...userState, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (
      userState.accountId.trim() === "" ||
      userState.username.trim() === "" ||
      userState.age.trim() === ""
    ) {
      return;
    }

    signUpUserState();
  };

  const signUpUserState = async () => {
    try {
      const requestBody = {
        id: null,
        accountId: userState.accountId,
        name: userState.username,
        age: userState.age,
      };
      console.log(requestBody);
      const { data } = await axios.post(`/api/user`, requestBody);
      console.log("data: ", data);
      setUserList([...userList, data]);
      window.alert(`${userState.accountId}의 가입이 완료되었습니다.`);
      setOnSignUp(false);
    } catch (e) {
      if (e.response.data.status === 500) {
        window.alert("중복된 Account ID 입니다. 다시 입력해주세요.");
      } else {
        console.log(e);
      }
    }
  };

  // 모달 외 클릭 시 꺼짐 처리
  const modalRef = useRef();
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOnSignUp(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  return (
    <Background>
      <Wrapper ref={modalRef} onSubmit={onSubmitHandler}>
        <h1>Sign Up</h1>
        <TextBox>
          <label htmlFor="accountId">Account ID</label>
          <InputBox
            name="accountId"
            value={userState.accountId}
            onChange={onChangeHandler}
          />
        </TextBox>
        <TextBox>
          <label htmlFor="accountId">Name</label>
          <InputBox
            name="username"
            value={userState.username}
            onChange={onChangeHandler}
          />
        </TextBox>
        <TextBox>
          <label htmlFor="accountId">Age</label>
          <InputBox
            name="age"
            value={userState.age}
            onChange={onChangeHandler}
            type="number"
          />
        </TextBox>
        <button>가입하기</button>
      </Wrapper>
    </Background>
  );
};

export default SignUpModal;
