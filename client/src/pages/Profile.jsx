import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserNotes } from "../../api";
import logo from "../assets/images/note-book-logo.png";
import AddNote from "../components/AddNote";
import Note from "../components/Note";
import SharedNote from "../components/SharedNote";

export function loader() {
  return getUserNotes();
}

function Profile() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const { note, user, sharedNote } = useLoaderData();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Couldn't log out");
      }
      navigate("/");
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
        <section className="rounded-md w-96 md:w-42 xl:w-[400px] bg-redd">
          <AddNote
            user={user}
            content={content}
            setContent={setContent}
            title={title}
            setTitle={setTitle}
            email={email}
            setEmail={setEmail}
          />
        </section>
        <section className="flex flex-col items-end ">
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
          <div>
            <h2 className="mt-5 mb-5">Notes Shared With Me</h2>
            <div className="flex w-full gap-4 ">
              {sharedNote.map((el) => (
                <SharedNote key={el.id} title={el.title} content={el.content} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
