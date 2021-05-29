export function ProductCard(props) {
  return (
    <div
      className="shadow-lg rounded-lg bg-white mr-2 mb-2 overflow-hidden flex"
      onClick={props.onClick}
    >
      <div className="py-4 px-4 mr-auto">
        <p className="font-bold text-gray-400">{props.title}</p>
        <p className="font-bold">${props.price}</p>
      </div>
      <div
        style={{
          backgroundImage: `url(${props.img})`,
          backgroundSize: "cover",
          height: 100,
          width: 100,
        }}
      ></div>
    </div>
  );
}

export function ProductCardBlank() {
  return (
    <div className="shadow-lg rounded-lg bg-gray-100 mr-2 mb-2 overflow-hidden flex animate-pulse">
      <div className="py-4 px-4 mr-auto">
        <p className="font-bold text-gray-400"></p>
        <p className="font-bold"></p>
      </div>
      <div
        className="bg-gray-200"
        style={{
          height: 100,
          width: 100,
        }}
      ></div>
    </div>
  );
}
