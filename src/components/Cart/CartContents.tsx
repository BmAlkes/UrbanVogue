import { BiTrash } from "react-icons/bi";
import { useAppDispatch } from "../../redux/store";
import { addToCart, Cart, removeFromCart } from "../../redux/slices/cartSlices";

interface CartContentsProps {
  cart: Cart;
  guestId: string;
  userId: string;
}

const CartContents = ({ cart, guestId, userId }: CartContentsProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (
    productId: string,
    delta: number,
    quantity: number,
    size: string,
    color: string
  ) => {
    if (quantity + delta < 1) return; // Evita enviar update com quantidade menor que 1

    dispatch(
      addToCart({
        productId,
        quantity: delta,
        size,
        color,
        userId,
        guestId,
      })
    );
  };
  const handleRemovefromCart = (
    productId: string,
    size: string,
    color: string
  ) => {
    dispatch(removeFromCart({ productId, color, guestId, size, userId }));
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          className="flex items-start justify-between py-4 border-b"
          key={index}
        >
          <div className="flex items-start">
            <img
              src={product?.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2 ">
                <button
                  className="border rounded-xl px-2 py-1 text-xl font-medium disabled:opacity-50"
                  disabled={product.quantity <= 1}
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  className="border rounded px-2 py-1 text-xl font-medium"
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-light">${product?.price?.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemovefromCart(
                  product.productId,
                  product.size,
                  product.color,
                )
              }
            >
              <BiTrash className="h-3 w-3 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
