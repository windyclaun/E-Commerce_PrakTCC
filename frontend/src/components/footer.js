import React from "react";

function Footer() {
  return (
    <footer className="footer has-background-dark has-text-white-ter">
      <div className="content has-text-centered">
        <p>
          <strong>MyStore</strong> &copy; {new Date().getFullYear()} | All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
