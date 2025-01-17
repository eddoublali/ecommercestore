export default function Footer() {
  return (
    <div>
  <footer className="footer bg-base-200 text-base-content p-10 flex flex-col items-center md:flex-row md:justify-between">
  <nav  >
    <h6 className="footer-title text-center">Termes et politiques</h6>
    <a className="link link-hover block text-center">Conditions d'utilisation</a>
    <a className="link link-hover block text-center">Retours & échanges</a>
    <a className="link link-hover block text-center">Politique de Confidentialité</a>
  </nav>
  <nav >
    <h6 className="footer-title text-center">À propos du magasin</h6>
    <a className="link link-hover block text-center">À propos</a>
    <a className="link link-hover block text-center">Méthodes de paiement</a>
    <a className="link link-hover block text-center">Expédition et manutention</a>
  </nav>
  <nav>
    <h6 className="footer-title text-center">Contactez-nous</h6>
    <a className="link link-hover block text-center">Contactez-nous</a>
    <a className="link link-hover block text-center">Aide & FAQ</a>
  </nav>
</footer>

    </div>
  )
}
