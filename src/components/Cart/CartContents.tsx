import { BiTrash } from "react-icons/bi";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },

    {
      productId: 2,
      name: "Jeans",
      size: "L",
      color: "Blue",
      quantity: 25,
      price: 15,
      image: "https://picsum.photos/200?random=2",
    },
    {
      productId: 3,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 29,
      image: "https://picsum.photos/200?random=3",
    },
  ];
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          className="flex items-start justify-between py-4 border-b"
          key={index}
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2 ">
                <button className="border rounded-xl px-2 py-1 text-xl font-medium">
                  {" "}
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-light">${product.price.toLocaleString()}</p>
            <button>
              <BiTrash className="h-3 w-3 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
