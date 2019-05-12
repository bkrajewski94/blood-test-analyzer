import React, {useState} from "react";
import { withRouter } from "react-router";

import { LoginStateless } from "../../components/Login/Login";
import firebase from "../../firebase";

const LoginPageComponent = props => {
  const [error, setError] = useState("");
  const onSubmit = ({ email, password }, actions) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        props.history.replace("/home");
      })
      .catch(error => {
        actions.setSubmitting(false);
        if (error.code === "auth/wrong-password") {
          setError("The password is incorrect. Try again please.");
        } else {
          setError(error.message);
        }
      });
  };

  return <LoginStateless onSubmit={onSubmit} error={error}/>;
};

export const LoginPage = withRouter(LoginPageComponent);
