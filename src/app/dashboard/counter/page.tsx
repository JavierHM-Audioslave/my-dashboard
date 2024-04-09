import CartCounter from "@/shopping-cart/components/CartCounter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Un simple contador",
};

export default function CounterPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span>Productos en el carrito</span>
      <CartCounter />
    </div>
  );
}
