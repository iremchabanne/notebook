import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Note({ title, content, id }) {
  const navigate = useNavigate();
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
        navigate(0);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col justify-between items-center gap-3 p-3 bg-purple-100 h-[200px] w-[200px]">
      <h3 className="w-full p-2 rounded-sm bg-slate-50">{title}</h3>
      <p>{content}</p>
      <div className="flex gap-10 ">
        <button className="underline text-greenn" type="button">
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
    </div>
  );
}

Note.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Note;
