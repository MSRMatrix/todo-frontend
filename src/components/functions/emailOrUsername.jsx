export function emailOrUsername(e, field, setField, toggleName, setToggleName) {
    e.preventDefault();
     setField({
      username: { value: "", message: "" },
      email: { value: "", message: "" },
      password: { value: field.password.value, message: field.password.message },
      code: { value: field.code.value, message: field.code.message  },
    });
    if (toggleName === "username") {
      field.username.value = "";
      return setToggleName("email");
    } else {
      field.email.value = "";
      return setToggleName("username");
    }
  }