import React, { useEffect, useState, useContext, useRef } from "react";
import classes from "./ChangePassword.module.css";
import { TextField, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "../../components/UI/Button";
import useInput from "../../components/Hooks/use-input";
import AuthContext from "../../components/Context/AuthContextProvider";
import { REACT_APP_MIN_PASSWORD_LENGTH } from "../../Helper/config";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const ChangePassword = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const confirmNewPasswordInput = useRef();

  const authCtx = useContext(AuthContext);

  const {
    enteredInput: enteredNewPassword,
    inputIsValid: newPasswordIsValid,
    hasInputError: hasNewPasswordError,
    inputChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    resetInputHandler: resetNewPasswordHandler,
  } = useInput((str) => str.length >= +REACT_APP_MIN_PASSWORD_LENGTH);

  const {
    enteredInput: enteredConfirmNewPassword,
    inputIsValid: confirmNewPasswordIsValid,
    hasInputError: hasConfirmNewPasswordError,
    inputChangeHandler: confirmNewPasswordChangeHandler,
    inputBlurHandler: confirmNewPasswordBlurHandler,
    resetInputHandler: resetConfirmNewPasswordHandler,
  } = useInput((str) => {
    return (
      str === enteredNewPassword && str.length >= +REACT_APP_MIN_PASSWORD_LENGTH
    );
  });

  useEffect(() => {
    setFormIsValid(newPasswordIsValid && confirmNewPasswordIsValid);
  }, [newPasswordIsValid, confirmNewPasswordIsValid]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    // Extra validation
    if (!newPasswordIsValid || !confirmNewPasswordIsValid) {
      return;
    }

    // Send request to change password
    const response = authCtx.updatePassword(enteredConfirmNewPassword.trim());

    if (response) {
      setIsPasswordChanged(true);
    }

    // Reset input fields
    resetNewPasswordHandler();
    resetConfirmNewPasswordHandler();

    confirmNewPasswordInput.current.blur();
  };

  return (
    <form className={classes.change_password} onSubmit={formSubmitHandler}>
      <h3>Change Password</h3>
      {isPasswordChanged && <p>Password updated successfully!</p>}
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
          }}
          autoComplete="off"
        >
          <TextField
            type="password"
            label="New Password"
            variant="outlined"
            id="outline-new-password"
            fullWidth
            InputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: 18 } }}
            FormHelperTextProps={{ style: { fontSize: 14 } }}
            error={hasNewPasswordError}
            helperText={hasNewPasswordError ? "Invalid new password!" : ""}
            value={enteredNewPassword}
            onChange={newPasswordChangeHandler}
            onBlur={newPasswordBlurHandler}
          />
          <TextField
            type="password"
            label="Re-enter Password"
            variant="outlined"
            id="outline-re-enter-password"
            fullWidth
            InputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: 18 } }}
            FormHelperTextProps={{ style: { fontSize: 14 } }}
            error={hasConfirmNewPasswordError}
            helperText={
              hasConfirmNewPasswordError ? "Invalid confirm new password!" : ""
            }
            value={enteredConfirmNewPassword}
            ref={confirmNewPasswordInput}
            onChange={confirmNewPasswordChangeHandler}
            onBlur={confirmNewPasswordBlurHandler}
          />
        </Box>
      </ThemeProvider>
      <Button className={classes.change_btn} disabled={!formIsValid}>
        Change Password
      </Button>
    </form>
  );
};

export default ChangePassword;
