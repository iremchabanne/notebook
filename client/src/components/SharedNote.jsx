import PropTypes from "prop-types";

function SharedNote({ title, content }) {
  return (
    <div className="flex flex-col justify-between items-center gap-3 p-3 bg-purple-100 h-[250px] w-[250px]">
      <h3 className="w-full p-2 rounded-sm bg-slate-50">{title}</h3>
      <p>{content}</p>
      <div className="flex gap-10">
        <button className="underline text-redd" type="button">
          Remove
        </button>
      </div>
    </div>
  );
}

SharedNote.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default SharedNote;
