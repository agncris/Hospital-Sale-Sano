function Footer() {
  return (
    <footer className="footer">
      <p>Hospital Sale Sano. Todos los derechos reservados. 2024</p>
      <nav className="footer__nav">
        <ul className="footer__list">
          <li><a href="/" className="footer__link">Inicio</a></li>
          <li><a href="/equipo" className="footer__link">Equipo</a></li>
          <li><a href="/contacto" className="footer__link">Contacto</a></li>
          <li><a href="/reservar" className="footer__link">Reservar una hora</a></li>
        </ul>
      </nav>
      <p className="footer__contacto">Contacto: +569999888777 | Correo: salesano@gmail.com</p><br />
      <p className="footer__contacto">Síguenos en nuestras redes sociales</p><br />
      <div className="footer__social">
        <a href="https://www.instagram.com/salesano" target="_blank" rel="noopener noreferrer">
          <img src="https://logodownload.org/wp-content/uploads/2017/04/instagram-logo.png" alt="instagram" width="30" height="30" />
        </a>
        <a href="https://www.linkedin.com/salesano" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
