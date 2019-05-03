import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Page } from "../Page/Page";
import { Button } from "../ui-components/Button/Button";
import { Tile } from "../ui-components/Tile/Tile";
import { FormInput } from "../FormComponents/FormInput";
import { texts } from "../../utils/texts";
import { ReactComponent as Register } from "../../assets/register.svg";

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

const Image = styled(Register)`
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
    .required(texts.authentication.emailRequired),
  password: yup
    .string()
    .trim()
    .required(texts.authentication.passwordRequired)
    .min(8, texts.authentication.passwordError)
    .matches(/\d/, texts.authentication.passwordError)
    .matches(
      /^(?=.*[A-Z])(?=.*\d).*[\s\S]{8,}$/,
      texts.authentication.passwordError
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Confirm Password is required")
});

export const RegisterStateless = ({ onSubmit, error }) => {
  return (
    <Page>
      <Tile>
        <Wrapper>
          <Image />
          <Formik
            validationSchema={schema}
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            onSubmit={onSubmit}
            render={props => (
              <Form>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  component={FormInput}
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  component={FormInput}
                />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  component={FormInput}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <SubmitButton
                  type="submit"
                  isPrimary={true}
                  disabled={!props.isValid || props.isSubmitting}
                >
                  Sign Up
                </SubmitButton>
              </Form>
            )}
          />
          <Redirect>
            Already have an account?{" "}
            <RedirectLink to="/login">Sign In</RedirectLink>
          </Redirect>
        </Wrapper>
      </Tile>
    </Page>
  );
};

RegisterStateless.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};
