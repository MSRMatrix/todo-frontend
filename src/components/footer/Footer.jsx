import "./footer.css";

const Footer = ({ server }) => {
  return (
    <div className="footer">
      <p>{server.name}</p>
    </div>
  );
};

export default Footer;
