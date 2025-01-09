export function disableFunction(field, formName) {
    if(formName === "Registration"){
      return (
      field.username.value.length <= 7 ||
      field.email.value.length <= 1 ||
      field.password.value.length <= 7
    );  
    }
    if(formName === "Login"){
        return(
            field.username.value.length <= 7 &&
            field.email.value.length <= 1 ||
            field.password.value.length <= 7 
        )
    }
    if(formName === "Verify"){
        return(
            field.username.value.length <= 7 &&
            field.email.value.length <= 1 ||
            field.code.value.length < 6
        )
    }
  }