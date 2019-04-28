import React, {useState} from "react";
import { withRouter } from "react-router";


import { ResetPasswordStateless } from "../../components/ResetPassword/ResetPassword";
import firebase from "../../firebase";

const ResetPasswordComponent = (props) => {
    const [error, setError] = useState("");
    const onSubmit = ({ email }, actions) => {
        const auth = firebase.auth();
        auth.sendPasswordResetEmail(email)
        .then(() => {
            props.history.push('/reset-password/sent')
        })
        .catch(error => {
            actions.setSubmitting(false);
            setError(error.message);
        });
      };
    
      return <ResetPasswordStateless onSubmit={onSubmit} error={error}/>;
};

export const ResetPasswordPage = withRouter(ResetPasswordComponent);