import { useState } from "react";

const useInput = (validateInput) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  // Input validation
  const inputIsValid = validateInput(enteredInput.trim());
  const hasInputError = inputIsTouched && !inputIsValid;

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const inputBlurHandler = () => {
    setInputIsTouched(true);
  };

  const resetInputHandler = () => {
    setEnteredInput("");
    setInputIsTouched(false);
  };

  return {
    enteredInput,
    inputIsValid,
    hasInputError,
    inputChangeHandler,
    inputBlurHandler,
    resetInputHandler,
  };
};

export default useInput;
