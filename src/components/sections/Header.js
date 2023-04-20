import Logo from "../../images/logo.svg";

export default function Header() {
  return (
    <header className="py-12">
      <img src={Logo} alt="" aria-hidden className="w-3/4 max-w-md mx-auto" />
      <h1 className="sr-only">Pursuit Technology</h1>
    </header>
  );
}
