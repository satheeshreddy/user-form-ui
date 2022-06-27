import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const getRandomId = () => {
  return Math.floor(Math.random() * 100);
};

const AddUser = (props) => {
  const [enteredUserName, setEnterUserName] = useState("");
  const [enteredAge, setEnterAge] = useState("");
  const [error, setError] = useState(null);
  const addUserHandler = (e) => {
    e.preventDefault();
    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty)",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0)",
      });
      return;
    }
    props.onAddUser({
      id: getRandomId(),
      name: enteredUserName,
      age: +enteredAge,
    });
    setEnterUserName("");
    setEnterAge("");
  };

  const userNameChangeHandler = (e) => {
    setEnterUserName(e.target.value);
  };
  const ageChangeHandler = (e) => {
    setEnterAge(e.target.value);
  };

  const clearError = () => {
    setError(null);
  };
  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={clearError}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="userNane">Username</label>
          <input
            type="text"
            id="userName"
            value={enteredUserName}
            onChange={userNameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
