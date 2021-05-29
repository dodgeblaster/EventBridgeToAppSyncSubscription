export const ProductCard = (props) => {
  return (
    <div className="shadow-lg rounded-lg bg-white mr-2 mb-2 overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${props.img})`,
          backgroundSize: "cover",
          height: 200,
          width: 200,
        }}
      ></div>
      <div className="py-4 px-4 h-24">
        <p className="font-bold text-gray-400">{props.title}</p>
        <p className="font-bold">${props.price}</p>
      </div>
    </div>
  );
};

export const ProductCarBlank = () => {
  return (
    <div className="shadow-lg rounded-lg bg-white mr-2 mb-2 overflow-hidden">
      <div
        className="bg-gray-200"
        style={{
          backgroundSize: "cover",
          height: 200,
          width: 200,
        }}
      ></div>
      <div className="py-4 px-4 h-24">
        <p className="font-bold text-gray-400"></p>
        <p className="font-bold"></p>
      </div>
    </div>
  );
};
