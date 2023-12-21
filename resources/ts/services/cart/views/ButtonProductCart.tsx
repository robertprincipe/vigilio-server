import { sweetAlert } from "@vigilio/sweet";
import useCartStore from "../store/cart.store";

type Product = {
  id: number;
  name: string;
  price: string;
};

const ButtonProductCart = ({ product }: { product: Product }) => {
  const { methods } = useCartStore();
  return (
    <button
      type="button"
      class="bg-zinc-100 text-zinc-900 font-semibold rounded-lg space-x-2 w-full py-2"
      aria-label="add to product"
      onClick={() => {
        methods.onInsertProductToCart(product);
        sweetAlert({
          title: "Producto añadido",
        });
      }}
    >
      <i class="fa-duotone fa-cart-plus" />
      <span>Añadir al carrito</span>
    </button>
  );
};

export default ButtonProductCart;
