export const toggleTwoFactorAuthentication = async (setMessage, setAuthentication) => {
    const URL = import.meta.env.VITE_BACKENDURL;
    const password = prompt("Please type in your password: ");
    if(password === null){
      console.log("Two factor authentication not changed!")
    return setMessage({
       topic: "Two factor authentication not changed!",
       show: true,
     });
   }

    try {
      const response = await fetch(
        `${URL}/user/toggle-two-factor-authentication`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ password }),
        }
      );
      const data = await response.json();
      const text = data.message;
      if (!response.ok) {
        setMessage({
          topic: text,
          show: true,
        });
        return console.log(data.message);
      } else {
        setMessage({
          topic: text,
          show: true,
        });
        setAuthentication(data.twoFactorAuthentication);
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error toggling 2FA:", error);
    }
  };