import { useLoaderData } from "react-router-dom";
import { getUserNotes } from "../../api";
import logo from "../assets/images/note-book-logo.png";

export function loader() {
  return getUserNotes();
}

function Profile() {
  const notes = useLoaderData();

  return (
    <div className="flex w-full">
      <div className="w-1/3 flex flex-col justify-center h-screen bg-center bg-cover bg-[url('./src/assets/images/bg-profile.png')]">
        <section>
          <img src={logo} alt="notebook-lgo" />
          <p>{notes}</p>
        </section>
      </div>

      <section className="flex flex-col items-end w-2/3 p-10">
        <nav>
          <ul className="flex gap-2">
            <li>username</li>
            <li>log out</li>
          </ul>
        </nav>
      </section>
    </div>
  );
}

export default Profile;
