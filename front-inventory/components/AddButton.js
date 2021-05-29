const AddIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-white"
    viewBox="0 0 20 20"
    fill="bg-white text-white"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
      clipRule="evenodd"
    />
  </svg>
);

export default function AddItem(props) {
  return (
    <button
      className={`shadow-lg rounded-lg bg-gray-800 mr-2 mb-2 overflow-hidden flex items-center px-2 cursor-pointer hover:bg-gray-700`}
      onClick={() => !props.disabled && props.onClick()}
      disabled={props.disabled}
    >
      <div className="py-4 px-4 mr-auto">
        <p className="font-bold text-white">{props.text}</p>
      </div>

      <AddIcon />
    </button>
  );
}
