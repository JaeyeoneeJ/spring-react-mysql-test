import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import UpdateModal from "./UpdateModal";

const Wrapper = styled.div`
  margin: 10px;
`;
const UserListBox = styled.div``;
const Table = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 30px 120px 80px 50px 80px 80px;
  gap: 10px;
  span {
    width: 100%;
  }

  span:last-child {
    width: 100%;
  }
`;

const Icon = styled.i`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UserList = ({ userList, setUserList }) => {
  const [onUpdateModal, setOnUpdateModal] = useState(false);

  const getUserList = async () => {
    try {
      const { data } = await axios.get(`/api/user`);
      setUserList(data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (accountId) => {
    if (window.confirm(`${accountId}를 삭제하시겠습니까?`)) {
      try {
        const { data } = await axios.delete(`/api/user/${accountId}`);
        setUserList(data);

        window.alert(`${accountId}가 삭제되었습니다.`);
        const newList = userList.filter((item) => item.accountId !== accountId);
        setUserList(newList);
      } catch (e) {
        console.log(e);
      }
    } else {
      window.alert(`삭제가 취소되었습니다.`);
    }
  };

  const [userProp, setUserProp] = useState();

  const updateUser = (accountId) => {
    if (accountId) {
      const updateUserState = userList.filter(
        (item) => item.accountId === accountId
      );
      setOnUpdateModal(true);
      setUserProp(updateUserState);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <Wrapper>
        <h3>데이터베이스에 있는 유저 리스트 </h3>
        <UserListBox>
          <Table>
            <span>ID</span>
            <span>ACCOUNT ID</span>
            <span>NAME</span>
            <span>AGE</span>
            <span>UPDATE</span>
            <span>DELETE</span>
          </Table>
          {userList?.map((user, index) => (
            <Table key={index}>
              <span>{user.id}</span>
              <span>{user.accountId}</span>
              <span>{user.name}</span>
              <span>{user.age}</span>
              <Icon onClick={() => updateUser(user.accountId)}>
                <AiOutlineEdit />
              </Icon>
              <Icon onClick={() => deleteUser(user.accountId)}>
                <AiOutlineDelete />
              </Icon>
            </Table>
          ))}
        </UserListBox>
      </Wrapper>
      {onUpdateModal && (
        <UpdateModal
          setOnUpdateModal={setOnUpdateModal}
          updateUser={userProp}
          userList={userList}
          setUserList={setUserList}
        />
      )}
    </>
  );
};

export default UserList;
