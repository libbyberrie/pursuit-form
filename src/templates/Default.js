import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";

export default function DefaultTemplate(props) {
  return (
    <>
      <div className="bg-pursuit-green-light min-h-screen">
        <Header />

        <main className="max-w-4xl mx-auto border-4 rounded-2xl border-pursuit-green bg-white px-4 py-6 md:px-8 md:py-10">
          {props.children}
        </main>
        <Footer />
      </div>
    </>
  );
}
