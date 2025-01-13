export const inputFunction = (e, setField) => {
    const { name, value } = e.target;
  
    const validations = {
      username: value.length < 8? "Username should have at least 8 letters" : "",
      email: !value.includes("@") ? "Email requires @" : "",
      code: value.length < 6 ? "Every code have at least 6 symbols" : "",
      password: (() => {
        const errors = [];
        if (value.length < 8) errors.push("at least 8 letters");
        if (!/[A-Z]/.test(value)) errors.push("an uppercase letter");
        if (!/[a-z]/.test(value)) errors.push("a lowercase letter");
        if (!/[0-9]/.test(value)) errors.push("a number");
        if (!/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value))
          errors.push("a symbol");
        return errors.length > 0
          ? `Password should have ${errors.join(", ")}`
          : "";
      })(),
    };
  
    setField((prev) => ({
      ...prev,
      [name]: { value, message: validations[name] },
    }));
  };