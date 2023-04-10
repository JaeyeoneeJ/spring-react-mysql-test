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
  background-color: ${(props) => props.readOnly && "lightgray"};
  padding: 4px 10px;
  border: 1px solid lightgray;
  border-radius: 3px;
`;

const UpdateModal = ({
  setOnUpdateModal,
  updateUser,
  userList,
  setUserList,
}) => {
  const [updateUserState, setUpdateUserState] = useState(updateUser[0]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUpdateUserState({ ...updateUserState, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (
      updateUserState.accountId.trim() === "" ||
      updateUserState.name.trim() === "" ||
      updateUserState.age.toString().trim() === ""
    ) {
      window.alert("값이 비어있는지 확인해주세요.");
      return;
    }

    if (
      window.confirm(`${updateUserState.accountId}의 정보를 수정하시겠습니까?`)
    ) {
      signUpUserState();
    } else {
      window.alert("수정이 취소되었습니다.");
    }
  };

  const signUpUserState = async () => {
    try {
      const requestBody = {
        id: updateUserState.id,
        accountId: updateUserState.accountId,
        name: updateUserState.name,
        age: updateUserState.age,
      };
      console.log(requestBody);
      const { data } = await axios.put(
        `/api/user/${requestBody.id}`,
        requestBody
      );
      console.log("update data: ", data);
      const newList = userList.map((v) => {
        console.log("v.accountId: ", v.accountId);
        console.log("data.accountId: ", data.accountId);
        if (v.id === data.id) {
          console.log("v.accountId: ", v.accountId);
          console.log("data.accountId: ", data.accountId);
          return data;
        } else {
          return v;
        }
      });
      setUserList([...newList]);
      window.alert(`${updateUserState.accountId}의 수정이 완료되었습니다.`);
      setOnUpdateModal(false);
    } catch (e) {
      if (
        e.response.data.status === 500 &&
        e.response.data.message === "AccountId is duplicated"
      ) {
        window.alert("중복된 Account ID 입니다. 다시 입력해주세요.");
      }
      console.log(e);
    }
  };

  // 모달 외 클릭 시 꺼짐 처리
  const modalRef = useRef();
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOnUpdateModal(false);
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
        <h1>Update</h1>
        <TextBox>
          <label htmlFor="id">ID</label>
          <InputBox name="id" value={updateUserState.id} readOnly />
        </TextBox>
        <TextBox>
          <label htmlFor="accountId">Account ID</label>
          <InputBox
            name="accountId"
            value={updateUserState.accountId}
            onChange={onChangeHandler}
          />
        </TextBox>
        <TextBox>
          <label htmlFor="accountId">Name</label>
          <InputBox
            name="name"
            value={updateUserState.name}
            onChange={onChangeHandler}
          />
        </TextBox>
        <TextBox>
          <label htmlFor="accountId">Age</label>
          <InputBox
            name="age"
            value={updateUserState.age}
            onChange={onChangeHandler}
            type="number"
          />
        </TextBox>
        <button>업데이트</button>
      </Wrapper>
    </Background>
  );
};

export default UpdateModal;
