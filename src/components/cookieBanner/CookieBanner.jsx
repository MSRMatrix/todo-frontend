import "./cookieBanner.css";

const CookieBanner = ({ setBanner }) => {
  return (
    <>
      <div className="cookie-banner">
        <h3>We Use Cookies to Enhance Your Profile Experience</h3>
        <p>
          Our platform uses essential cookies to securely store and manage your
          profile-related data. These cookies are necessary for functions such
          as logging in, saving your preferences, and ensuring a seamless user
          experience. The data stored in cookies helps us to: Authenticate your
          identity during login. Provide personalized features for your profile.
          Maintain the security of your account. Please note that these cookies
          are strictly required for the proper functioning of your profile and
          cannot be disabled. For more information, refer to our Privacy Policy.
          By continuing to use our platform, you agree to the use of these
          essential cookies.
        </p>

        <p>
          If you agree, press "Yes" to accept and this banner will disappear.
          Otherwise, press "No" to be redirected to Google.
        </p>
        <div className="banner-button-div">
          <button
          onClick={() => {
            setBanner(false);
            localStorage.setItem("banner", false);
          }}
        >
          Yes
        </button>
        <a
          rel="noopener noreferrer"
          href="https://www.google.com/"
        >
          No
        </a>  
        </div>
        
      </div>
    </>
  );
};

export default CookieBanner;
