import React from 'react';
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import styled from "styled-components";

import { Page } from "../../components/Page/Page";
import { Button } from "../../components/ui-components/Button/Button";
import { Tile } from "../../components/ui-components/Tile/Tile";
import { FormInput } from "../../components/FormComponents/FormInput";
import { texts } from "../../utils/texts";

const SubmitButton = styled(Button)`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${({ theme }) => theme.spacingNormal};
`;

export const HomePage = () => {
    const schema = yup.object({
        login: yup.string()
            .trim()
            .required(texts.authentication.loginRequired)
            .min(5, texts.authentication.loginError)
            .max(20, texts.authentication.loginError),
        password: yup.string()
            .trim()
            .required(texts.authentication.passwordRequired)
            .min(8, texts.authentication.passwordError)
            .matches(/\d/, texts.authentication.passwordError)
            .matches(/^(?=.*[A-Z])(?=.*\d).*[\s\S]{8,}$/, texts.authentication.passwordError),
    });

    return(
        <Page>
            <Tile>
            <Formik  
                validationSchema={schema} 
                initialValues={{login: "", password: ""}}
                onSubmit={() => console.log('submit')}
                render={(props) => (
                    <Form>
                        <Field 
                            type="text"
                            name="login"
                            placeholder="Login"
                            component={FormInput}
                        />
                        <Field 
                            type="password"
                            name="password"
                            placeholder="Your password"
                            component={FormInput}
                        />
                        <SubmitButton
                            type="submit"
                            isPrimary={true}
                            disabled={!props.isValid || props.isSubmitting}
                        >Submit</SubmitButton>
                    </Form>
                )}
            />
            </Tile>
        </Page>
    )
}
