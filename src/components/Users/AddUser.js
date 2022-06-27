import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const getRandomId = () => {
  return Math.floor(Math.random() * 100);
};

const AddUser = (props) => {
  const enteredNameRef = useRef();
  const enteredAgeRef = useRef();
  const [error, setError] = useState(null);
  const addUserHandler = (e) => {
    e.preventDefault();
    const enteredName = enteredNameRef.current.value;
    const enteredAge = enteredAgeRef.current.value;
    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
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
      name: enteredName,
      age: +enteredAge,
    });
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
          <input type="text" id="userName" ref={enteredNameRef} />
          <label htmlFor="age">Age (Years)</label>
          <input type="number" id="age" ref={enteredAgeRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
