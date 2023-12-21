import { signal } from "@preact/signals";

type Product = {
	id: number;
	name: string;
	price: string;
};

const state = signal<Product[]>([]);
export default function useCartStore() {
	function onInsertProductToCart(product: Product) {
		state.value = [...state.value, product];
	}
	function showProductLength() {
		return state.value.length;
	}
	return {
		state: state.value,
		methods: {
			onInsertProductToCart,
			showProductLength,
		},
	};
}
