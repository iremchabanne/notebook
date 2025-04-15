import { Form, redirect } from "react-router-dom";
import { login } from "../../api";
import logo from "../assets/images/note-book-logo.png";

export async function action({ request }) {
  const formData = await request.formData();
  await login(formData);
  return redirect("/profile");
}

function Login() {
  return (
    <section className="flex-col w-full md:justify-center flex md:flex-row h-screen bg-center bg-cover bg-[url('./src/assets/images/bg-1.png')] px-8 gap-10 sm:gap-16">
      <div className="pt-[100px] md:pt-16 md:w-1/3 flex flex-col items-start w-full">
        <div className="self-center md:self-start">
          <img
            src={logo}
            className="w-[150px] sm:w-[180px] lg:w-[250px]"
            alt="notebook-logo"
          />
        </div>
        <div className="self-center pt-5 md:self-start sm:pt-8">
          <ul className="flex-col list-disc sm:gap-12 md:gap-8 sm:text-lg md:text-xl lg:text-3xl">
            <li className="text-redd">Create your notes</li>
            <li className="text-greenn">Share them</li>
            <li className="text-blackk">Plan your week!</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col self-center w-full gap-5 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h3 className="text-xl">Log in to see your notes!</h3>
        <Form method="post" className="flex flex-col gap-3">
          <input
            className="p-2 border-2 rounded-md border-redd"
            type="email"
            name="email"
            placeholder="e-mail"
            required
          />
          <input
            className="p-2 border-2 rounded-md border-redd"
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <button
            className="pt-2 pb-2 pl-5 pr-5 mt-2 text-white rounded-md bg-redd"
            type="submit"
          >
            Sign in
          </button>
        </Form>
      </div>
    </section>
  );
}

export default Login;
