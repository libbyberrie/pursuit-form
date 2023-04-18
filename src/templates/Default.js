import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";

export default function DefaultTemplate(props) {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto outline outline-pursuit-green px-8">
        {props.children}
      </main>
      <Footer />
    </>
  );
}
