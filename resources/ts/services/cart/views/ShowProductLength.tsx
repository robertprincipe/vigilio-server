import useCartStore from "../store/cart.store";

const ShowProductLength = () => {
  const { methods } = useCartStore();
  return <b>{methods.showProductLength()}</b>;
};

export default ShowProductLength;
