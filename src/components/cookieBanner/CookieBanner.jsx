import { useContext } from "react";
import { Message } from "../context/ContextData";
import "./cookieBanner.css";

const CookieBanner = ({ setBanner }) => {
  const { message, setMessage } = useContext(Message);
  return (
    <>
      <div className="cookie-banner">
        <h3>We Use Cookies to Enhance Your Profile Experience</h3>
        <p>
          Our platform uses essential cookies to securely store and manage data
          related to your profile. These cookies are necessary for:
          <br />
          Authenticating your identity during login. Providing personalized
          features for your profile. Ensuring the security of your account.
          Please note: We only collect and use data that you provide directly
          through our platform. No personal data is collected without your
          active input. These cookies are essential for the proper functioning
          of your profile and cannot be disabled.
          <br />
          By continuing to use our platform, you consent to the use of these
          essential cookies. Without these cookies, certain features of the
          website, including login and profile management, will not work.
        </p>

        <p>
          If you agree, press "Yes" to accept the Cookie. Otherwise, press "No".
        </p>
        <div className="banner-button-div">
          <button
            onClick={() => {
              setBanner(false);
              localStorage.setItem("banner", false);
              localStorage.setItem("Cookie-Allowed", true);
              setMessage({ topic:
                "",
              show: false,})
            }}
          >
            Yes
          </button>
          <button onClick={() => {
              setBanner(false);
              localStorage.setItem("Cookie-Allowed", false);
              setMessage({
                topic:
                  "Without these cookies, certain features of the website, including login and profile management, will not work.",
                show: true,
              });
            }}>
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
