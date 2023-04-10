import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 10px;
`;
const UserListBox = styled.div``;
const Table = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 30px 120px 80px 50px 110px;
  gap: 10px;
  span {
    width: 100%;
  }

  span:last-child {
    width: 150px;
  }
`;

const GetOneUser = () => {
  const [user, setUser] = useState();
  const [value, setValue] = useState("");

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (value.trim() === "") {
      return;
    }

    getOneUser();
  };

  const getOneUser = async () => {
    try {
      const { data } = await axios.get(`/api/user/${value}`);
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <h3>Account ID 검색</h3>
      <form onSubmit={onSubmitHandler}>
        <input
          name="searchId"
          type="text"
          value={value}
          onChange={onChangeHandler}
          autoComplete="off"
        />
        <button>검색</button>
      </form>
      <UserListBox>
        <Table>
          <span>ID</span>
          <span>ACCOUNT ID</span>
          <span>NAME</span>
          <span>AGE</span>
        </Table>
        <Table>
          <span>{user?.id}</span>
          <span>{user?.accountId}</span>
          <span>{user?.name}</span>
          <span>{user?.age}</span>
        </Table>
      </UserListBox>
    </Wrapper>
  );
};

export default GetOneUser;
