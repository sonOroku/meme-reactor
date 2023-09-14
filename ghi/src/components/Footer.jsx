import React from "react";

export function Footer() {
  return (
    <>
      <div className="footer-container"></div>
      <footer className="fixed-bottom bg-dark border-body text-center">
        <div>
          <strong>Development Team</strong>
        </div>
        <div>
          <a
            className="mx-2 footer-link"
            href="https://www.linkedin.com/in/randall-c-643608133/"
          >
            Randy Crandon
          </a>

          <a
            className="mx-2 footer-link"
            href="https://www.linkedin.com/in/ngozi-enuem-udogu/"
          >
            Ngozi Enuem-Udogu
          </a>

          <a
            className="mx-2 footer-link"
            href="https://www.linkedin.com/in/alexanderorourke/"
          >
            Alexander O'Rourke
          </a>

          <a
            className="mx-2 footer-link"
            href="https://www.linkedin.com/in/brandontiernay/"
          >
            Brandon Tiernay
          </a>
        </div>
      </footer>
    </>
  );
}
