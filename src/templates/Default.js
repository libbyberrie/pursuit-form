import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";

export default function DefaultTemplate(props) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
