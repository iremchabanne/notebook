import { useRevalidator } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

function Note({ title, content, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const revalidator = useRevalidator();

  const handleDeleteNote = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/notes/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.status !== 204) {
        throw new Error("Probleme while deleting a note");
      } else {
        revalidator.revalidate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/notes/${id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            title: editedTitle,
            content: editedContent,
          }),
          credentials: "include",
        }
      );
      if (response.status !== 204) {
        throw new Error("error while editing note");
      } else {
        setIsEditing(!isEditing);
        revalidator.revalidate();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center gap-3 p-3 bg-purple-100 h-[250px] w-[250px]">
      {!isEditing ? (
        <>
          <h3 className="w-full p-2 rounded-sm bg-slate-50">{title}</h3>
          <p>{content}</p>
          <div className="flex gap-10">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="underline text-greenn"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteNote}
              className="underline text-redd"
              type="button"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleEditSubmit}
          className="flex flex-col w-full gap-2"
        >
          <input
            className="w-full p-3 rounded-sm"
            onChange={(e) => {
              setEditedTitle(e.target.value);
            }}
            type="text"
            name="title"
            placeholder="edit title"
            value={editedTitle}
          />
          <textarea
            className="w-full p-2 rounded-sm"
            onChange={(e) => setEditedContent(e.target.value)}
            type="text"
            name="content"
            placeholder="edit note"
            value={editedContent}
            rows={4}
          />
          <button
            className="pt-2 pb-2 pl-3 pr-3 text-white rounded-sm bg-greenn"
            type="submit"
          >
            Edit Note
          </button>
        </form>
      )}
    </div>
  );
}

Note.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Note;
