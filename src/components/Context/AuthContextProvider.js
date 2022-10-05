import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, storage } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Authentication context object
const AuthContext = React.createContext({});

// Default Auth State
const defaultAuthState = {
  isLoggedIn: false,
  userData: {},
};

// Auth Reducer function
const authReducer = (state, action) => {
  if (action.type === "SET_USER") {
    return {
      isLoggedIn: true,
      userData: action.val,
    };
  }

  if (action.type === "SIGN_UP_OR_LOGIN") {
    return { isLoggedIn: true, userData: state.userData };
  }

  if (action.type === "LOGOUT") {
    return { isLoggedIn: false, userData: state.userData };
  }

  if (action.type === "CLEAR_DATA") {
    return { isLoggedIn: false, userData: {} };
  }

  if (action.type === "UPLOAD_IMAGE") {
    return { isLoggedIn: true, userData: state.userData };
  }

  return defaultAuthState;
};

// Authentication context provider component
const AuthContextProvider = (props) => {
  const [authState, dispatchAuth] = useReducer(authReducer, defaultAuthState);

  const navigate = useNavigate();

  // Get the currently signed-in user by setting an observer on the Auth object.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        dispatchAuth({ type: "SET_USER", val: user });
      }
    });
  }, []);

  // 1) SignUp method
  const createAccountHandler = async (fullName, email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update a user's profile (displayName)
      await updateProfile(auth.currentUser, {
        displayName: fullName,
      });

      // Update state
      dispatchAuth({ type: "SIGN_UP_OR_LOGIN" });

      // Now navigate to home page
      navigate("/home", { replace: true });

      return response;
    } catch (err) {
      alert(err.message);
    }
  };

  // 2) Login method
  const loginHandler = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      // Update state
      dispatchAuth({ type: "SIGN_UP_OR_LOGIN" });

      // Now navigate to home page
      navigate("/home", { replace: true });

      return response;
    } catch (err) {
      alert(err.message);
    }
  };
  // 3) logout method
  const logoutHandler = async () => {
    try {
      await signOut(auth);

      dispatchAuth({ type: "LOGOUT" });

      // Navigate to welcome page.
      navigate("/logout", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  // 4) updatePassword method
  const updatePasswordHandler = async (newPassword) => {
    const user = auth.currentUser;
    try {
      await updatePassword(user, newPassword);

      return true;
    } catch (err) {
      alert(err.message);
    }
  };

  // 5) uploadProfileImage method
  const uploadProfileImageHandler = async (imageFile) => {
    // convert image file in blob object.
    // const src = URL.createObjectURL(imageFile);

    // a) Create a reference in firebase storage to image
    const imageStorageRef = ref(storage, authState.userData.uid + ".jpg");

    // b) Upload image to firebase storage
    try {
      // 'file' comes from the Blob or File API
      await uploadBytes(imageStorageRef, imageFile);

      // Get uploaded image downloaded URL
      const photoUrl = await getDownloadURL(imageStorageRef);

      // Update a user's profile (photoURL)
      await updateProfile(auth.currentUser, {
        photoURL: photoUrl,
      });

      // Update state
      dispatchAuth({ type: "UPLOAD_IMAGE" });
    } catch (err) {
      alert(err.message);
    } finally {
      return true;
    }
  };

  // 6) SignInWithGoogle method
  const signInWithGoogleHandler = async () => {
    try {
      await signInWithPopup(auth, provider);

      // Now navigate to home page
      navigate("/home", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  // 7) ClearUserAccount method
  const clearUserAccounthandler = () => {
    dispatchAuth({ type: "CLEAR_DATA" });
  };

  const authContext = {
    isLoggedIn: authState.isLoggedIn,
    userData: authState.userData,
    createAccount: createAccountHandler,
    login: loginHandler,
    logout: logoutHandler,
    updatePassword: updatePasswordHandler,
    uploadProfileImage: uploadProfileImageHandler,
    signInWithGoogle: signInWithGoogleHandler,
    clearAccount: clearUserAccounthandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
export default AuthContext;
