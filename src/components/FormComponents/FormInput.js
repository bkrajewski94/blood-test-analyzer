import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Input } from "../ui-components/Input/Input";

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizeSmall};
  color: ${({ theme }) => theme.colors.torchRed};
  margin-left: ${({ theme }) => theme.spacingTiny};
`;

const FormInputComponent = styled(Input)`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacingMiniscule};
`;

const FormInputWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.spacingNormal};
`;

export const FormInput = ({
  type,
  placeholder,
  form,
  field,
  ...otherProps
}) => {
  const isCorrect = !(form.touched[field.name] && form.errors[field.name]);
  return (
    <FormInputWrapper>
      <FormInputComponent
        type={type}
        placeholder={placeholder}
        isCorrect={isCorrect}
        id={field.name}
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        field={field}
        {...otherProps}
      />
      {!isCorrect && <ErrorMessage>{form.errors[field.name]}</ErrorMessage>}
    </FormInputWrapper>
  );
};


FormInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};
