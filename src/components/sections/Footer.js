export default function Footer() {
  return (
    <footer className="my-12 mx-2 md:mx-auto w-[90%] max-w-7xl flex flex-col md:flex-row items-center md:justify-between justify-center">
      <p>
        &copy; Pursuit Technology {new Date().toISOString().substring(0, 4)}
      </p>
      <a
        href="https://pursuittechnology.com/privacy-policy/"
        className="underline"
      >
        Privacy policy
      </a>
    </footer>
  );
}
