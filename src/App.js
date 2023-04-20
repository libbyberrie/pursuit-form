import DefaultTemplate from "./templates/Default";
import Form from "./components/Form/Form";

function App() {
  return (
    <DefaultTemplate>
      <div className="text-center mx-auto mb-4">
        <h2 className="font-semibold text-xl md:text-2xl">
          Thank you for expressing interest in our course!
        </h2>
        <p>
          Please fill out the registration details below and we'll get back to
          you soon.
        </p>
      </div>

      <Form />
    </DefaultTemplate>
  );
}

export default App;
