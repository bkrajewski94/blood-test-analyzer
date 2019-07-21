import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Page } from "../Page/Page";
import { Button } from "../ui-components/Button/Button";
import { AuthTile } from "../AuthTile/AuthTile";
import { FormInput } from "../FormComponents/FormInput";
import { texts } from "../../utils/texts";
import { ReactComponent as ResetPasswordImage } from "../../assets/passwordReset.svg";

const SubmitButton = styled(Button)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ theme }) => theme.spacingNormal};
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const Image = styled(ResetPasswordImage)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: auto;
  min-width: 150px;
  margin-bottom: ${({ theme }) => theme.spacingHuge};
`;

const Redirect = styled.div`
  font-size: ${({ theme }) => theme.fontSizeSmall};
  margin-top: ${({ theme }) => theme.spacingSmall};
  text-align: center;
  color: ${({ theme }) => theme.colors.trout};
`;

const RedirectLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.japaneseLaurel};
  cursor: pointer;
  font-weight: 400;
`;

const ErrorMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSizeSmall};
  margin-top: ${({ theme }) => theme.spacingSmall};
  text-align: center;
  color: ${({ theme }) => theme.colors.torchRed};
`;

const schema = yup.object({
  email: yup
    .string()
    .trim()
    .email(texts.authentication.emailError)
    .required(texts.authentication.emailRequired)
});

export const ResetPasswordStateless = ({ onSubmit, error }) => {

  return (
    <Page>
      <AuthTile>
        <Wrapper>
          <Image />
          <Formik
            validationSchema={schema}
            initialValues={{ email: "" }}
            onSubmit={onSubmit}
            render={props => (
              <Form>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  component={FormInput}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <SubmitButton
                  type="submit"
                  disabled={!props.isValid || props.isSubmitting}
                >
                  Reset Password
                </SubmitButton>
              </Form>
            )}
          />
          <Redirect>
            Go back to <RedirectLink to="/login">Sign In</RedirectLink>
          </Redirect>
        </Wrapper>
      </AuthTile>
    </Page>
  );
};

ResetPasswordStateless.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};