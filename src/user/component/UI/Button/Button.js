import React from 'react';
import { PrimaryButton, SecondaryButton } from './Button.styled';

function Button({ children, btnType = "primary", btnDisable = false, ...rest }) {
  console.log(btnType);

  const checkBtnType = () => {
    switch (btnType) {
      case "primary":
        return PrimaryButton
      case "secondary":
        return SecondaryButton
      default:
        return PrimaryButton
    }
  }

  const CustomButton = checkBtnType();

  return (
    <CustomButton disabled={btnDisable} {...rest}>
      {children}
    </CustomButton>


  );
}

export default Button;