import React, { useState, useEffect, useContext } from "react";
import classes from "./AuthForm.module.css";
import { TextField, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "../UI/Button";
import useInput from "../Hooks/use-input";
import AuthContext from "../Context/AuthContextProvider";
import { REACT_APP_MIN_PASSWORD_LENGTH } from "../../Helper/config";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

// HELPER METHODS

// Function to Remove extra white spaces
const removeExtraSpace = (str) => {
  const regex = /\s+/g;

  return str.replace(regex, " ").trim();
};

// REGULAR EXPRESSION
const fullNameRegex = /^[a-zA-Z ]+$/;
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const AuthForm = (props) => {
  const [formisValid, setFormIsValid] = useState(false);

  const authCtx = useContext(AuthContext);

  const {
    enteredInput: enteredFullName,
    inputIsValid: fullNameIsValid,
    hasInputError: hasFullNameError,
    inputChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    resetInputHandler: resetFullNameHandler,
  } = useInput((str) => fullNameRegex.test(str));

  const {
    enteredInput: enteredEmail,
    inputIsValid: emailIsValid,
    hasInputError: hasEmailError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInputHandler: resetEmailHandler,
  } = useInput((str) => emailRegex.test(str));

  const {
    enteredInput: enteredPassword,
    inputIsValid: passwordIsValid,
    hasInputError: hasPasswordError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetInputHandler: resetPasswordHandler,
  } = useInput((str) => str.length >= +REACT_APP_MIN_PASSWORD_LENGTH);

  useEffect(() => {
    setFormIsValid(
      (props.isLogin ? true : fullNameIsValid) &&
        emailIsValid &&
        passwordIsValid
    );
  }, [props.isLogin, fullNameIsValid, emailIsValid, passwordIsValid]);

  // Authentication form submit handler
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    // Extra validation
    if (
      (props.isLogin ? false : !fullNameIsValid) ||
      !emailIsValid ||
      !passwordIsValid
    ) {
      return;
    }

    // User Data
    const fullName = removeExtraSpace(enteredFullName);
    const email = enteredEmail.trim();
    const password = enteredPassword.trim();
    let response;

    if (!props.isLogin) {
      // Sign Up Authentication
      response = await authCtx.createAccount(fullName, email, password);
    } else {
      // Login Authentication
      response = await authCtx.login(email, password);
    }

    // If signUp or login happened successfully from firebase backend server then after do this:
    if (response) {
      resetFullNameHandler();
      resetEmailHandler();
      resetPasswordHandler();

      props.onCloseModal();
    }
  };

  return (
    <form className={classes.auth_form} onSubmit={formSubmitHandler}>
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
          {!props.isLogin && (
            <TextField
              type="text"
              label="Full Name"
              variant="outlined"
              id="outline-fullname"
              autoComplete="off"
              fullWidth
              InputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              FormHelperTextProps={{ style: { fontSize: 14 } }}
              error={hasFullNameError}
              helperText={hasFullNameError ? "Invalid full name!" : ""}
              value={enteredFullName}
              onChange={fullNameChangeHandler}
              onBlur={fullNameBlurHandler}
            />
          )}
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            id="outline-email"
            autoComplete="off"
            fullWidth
            InputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: 18 } }}
            FormHelperTextProps={{ style: { fontSize: 14 } }}
            error={hasEmailError}
            helperText={hasEmailError ? "Invalid email address!" : ""}
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            id="outline-password"
            fullWidth
            autoComplete="off"
            InputProps={{ style: { fontSize: 18 } }}
            InputLabelProps={{ style: { fontSize: 18 } }}
            FormHelperTextProps={{ style: { fontSize: 14 } }}
            error={hasPasswordError}
            helperText={hasPasswordError ? "Invalid password!" : ""}
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
        </Box>
      </ThemeProvider>
      {props.isLogin ? (
        <Button className={classes.auth_btn} disabled={!formisValid}>
          Login
        </Button>
      ) : (
        <Button className={classes.auth_btn} disabled={!formisValid}>
          Create account
        </Button>
      )}
    </form>
  );
};

export default AuthForm;
