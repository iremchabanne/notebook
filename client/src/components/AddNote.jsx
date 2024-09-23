import { useState } from "react";
import { useRevalidator } from "react-router-dom";

export default function AddNote() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

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
          }),
          credentials: "include",
        }
      );
      if (response.status !== 201) {
        throw new Error("error while creating note");
      } else {
        setTitle("");
        setContent("");
        revalidator.revalidate();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleAddNote}
      className=" w-full flex flex-col h-[500px] gap-2 p-10"
    >
      <h2 className="text-white ">Add a new note</h2>
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
        placeholder="type your note"
        rows="7"
      />

      <button className="self-end w-1/2 h-10 bg-white rounded-sm" type="submit">
        Create
      </button>
    </form>
  );
}
