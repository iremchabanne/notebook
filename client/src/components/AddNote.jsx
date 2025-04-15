import { useEffect, useState } from "react";
import { useRevalidator } from "react-router-dom";
import PropTypes from "prop-types";

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

function AddNote({ title, setTitle, content, setContent, email, setEmail }) {
  const [validEmail, setValidEmail] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const revalidator = useRevalidator();

  async function handleAddNote(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/notes`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            title,
            content,
            shared_email: email,
          }),
          credentials: "include",
        }
      );
      if (response.status !== 201) {
        throw new Error("error while creating note");
      } else {
        setTitle("");
        setContent("");
        setEmail("");
        revalidator.revalidate();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleAddNote} className="flex flex-col gap-2 p-10 ">
      <h2 className="text-white ">Create a new note</h2>
      <input
        className="h-10 p-2 rounded-sm "
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        name="title"
        required
        value={title}
        placeholder="title"
      />

      <textarea
        className="p-2 rounded-sm"
        onChange={(e) => setContent(e.target.value)}
        name="content"
        type="text"
        required
        value={content}
        placeholder="content"
        rows="5"
      />
      <h3 className="text-white">Want to share this note?</h3>
      <input
        onClick={() => setMessage(!message)}
        className="h-10 p-2 rounded-sm "
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        value={email}
        placeholder="e-mail"
      />
      {!validEmail ? (
        <div>
          {message && <p>Type a valid email address</p>}

          <button
            className="self-end w-1/2 h-10 bg-white rounded-sm"
            type="submit"
          >
            Create
          </button>
        </div>
      ) : (
        <div>
          <button
            className="self-end w-1/2 h-10 bg-white rounded-sm"
            type="submit"
          >
            Create & Share
          </button>
        </div>
      )}
    </form>
  );
}

AddNote.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
};

export default AddNote;
