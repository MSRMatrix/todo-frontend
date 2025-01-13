export function disableFunction(field, formName) {
    const isInvalidUsername = field.username?.value?.length <= 7;
    const isInvalidEmail =
      field.email?.value?.length <= 1 || !field.email?.value?.includes("@");
    const isInvalidPassword =
      field.password?.value?.length <= 7 ||
      !/[A-Z]/.test(field.password?.value) ||
      !/[a-z]/.test(field.password?.value) ||
      !/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(field.password?.value);
    const isInvalidCode = field.code?.value?.length < 6;
  
    switch (formName) {
      case "Registration": {
        return isInvalidUsername || isInvalidEmail || isInvalidPassword;
      }
      case "Login": {
        const isValidLoginInput =
          (field.username?.value?.length > 7 || field.email?.value?.length > 1) &&
          !isInvalidPassword;
        return !isValidLoginInput;
      }
      case "Verify": {
        return isInvalidCode || (isInvalidUsername && isInvalidEmail);
      }
      default: {
        return true;
      }
    }
  }
  