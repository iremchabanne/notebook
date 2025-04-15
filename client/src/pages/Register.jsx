import { Form, redirect, Link } from "react-router-dom";
import { register } from "../../api";
import logo from "../assets/images/note-book-logo.png";

export async function action({ request }) {
  const formData = await request.formData();
  await register(formData);
  return redirect("/login");
}

function Register() {
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
            <li className=" text-redd">Create your notes</li>
            <li className=" text-greenn">Share them</li>
            <li className=" text-blackk">Plan your week!</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col self-center w-full gap-5 lg:w-1/4 sm:w-1/2 md:w-1/3">
        <Form method="post" className="flex flex-col gap-2">
          <h2 className="self-start text-3xl text-blackk">Join us!</h2>
          <input
            className="p-2 border-2 rounded-md border-redd"
            type="username"
            name="username"
            placeholder="Username"
            required
          />
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
            className="p-2 pl-5 pr-5 mt-2 mb-4 text-white rounded-md bg-redd"
            type="submit"
          >
            Sign up
          </button>
        </Form>
        <div className="flex flex-col items-end gap-2 sm:items-start ">
          <h3 className=" text-blackk">already have an account?</h3>
          <Link to="/login">
            <button
              type="button"
              className="pt-2 pb-2 pl-6 pr-6 text-white rounded-md bg-blackk"
            >
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
