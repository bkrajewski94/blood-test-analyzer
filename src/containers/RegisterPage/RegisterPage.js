import React, {useState} from "react";

import { RegisterStateless } from "../../components/Register/Register";
import firebase from "../../firebase";

export const RegisterPage = () => {
  const [error, setError] = useState("");

  const onSubmit = ({ email, password }, actions) => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      data.user.sendEmailVerification() 
      .catch(error => {
        actions.setSubmitting(false);
        setError(error.message);
      })
    })
    .catch(error => {
      actions.setSubmitting(false);
      setError(error.message);
    });
  };

  return <RegisterStateless onSubmit={onSubmit} error={error}/>;
};
