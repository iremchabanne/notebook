import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserNotes } from "../../api";
import logo from "../assets/images/note-book-logo.png";
import AddNote from "../components/AddNote";
import Note from "../components/Note";

export function loader() {
  return getUserNotes();
}

function Profile() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { note, user } = useLoaderData();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Couldn't log out");
      }
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-full bg-[url('./src/assets/images/bg-profile.png')]">
      <nav className="flex items-center justify-between pt-5 pl-10 pr-10">
        <img className="w-[100px]" src={logo} alt="notebook-lgo" />
        <ul className="flex flex-col text-xl sm:mr-5">
          <li className="text-greenn">Hello, {user.username}!</li>
          <li>
            <button
              className="p-2 hover:text-redd"
              type="button"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col items-center justify-center w-full sm:flex-row">
        <section className="w-[400px] rounded-md bg-redd mt-10">
          <AddNote
            user={user}
            content={content}
            setContent={setContent}
            title={title}
            setTitle={setTitle}
          />
        </section>
        <section className="flex flex-col items-end self-start w-2/3 p-10 ">
          <div>
            <h2 className="mt-5 mb-5">My Notes</h2>
            <div className="flex w-full gap-4 ">
              {note.map((el) => (
                <Note
                  key={el.id}
                  title={el.title}
                  content={el.content}
                  id={el.id}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
