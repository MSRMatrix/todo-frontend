const validateField = (name, value) => {
  const validations = {
    username: value.length < 8 ? "Username should have at least 8 letters" : "",
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
  return validations[name] || "";
};

export const inputFunction = (e, setField) => {
  const { name, value } = e.target;
  const message = validateField(name, value);
  setField((prev) => ({
    ...prev,
    [name]: { value, message },
  }));
};

export const optionalInputFunction = (e, setField) => {
  const { name, value } = e.target;
  const message = value.trim().length > 0 ? validateField(name, value) : "";
  setField((prev) => ({
    ...prev,
    [name]: { value, message },
  }));
};
