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
    <section className="w-full justify-center flex h-screen bg-center bg-cover bg-[url('./src/assets/images/bg-1.png')]">
      <div className=" pt-[150px] w-1/3">
        <div>
          <img src={logo} alt="notebook-logo" />
        </div>
        <div className="pt-5">
          <ul className="flex flex-col gap-2 list-disc">
            <li className="text-2xl text-redd">Take your notes</li>
            <li className="text-2xl text-greenn">Share them</li>
            <li className="text-2xl text-blackk">Plan your week!</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col self-center w-1/3 gap-5">
        <Form method="post" className="flex flex-col w-2/3 gap-2">
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
            className="self-end pt-2 pb-2 pl-5 pr-5 text-white rounded-md bg-redd"
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
