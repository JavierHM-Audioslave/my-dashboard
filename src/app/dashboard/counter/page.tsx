"use client";
import { Metadata } from "next";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Counter Page",
  description: "Un simple contador",
};

export default function CounterPage() {
  const [counter, setCounter] = useState<number>(0);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span>Productos en el carrito</span>
      <span className="text-9xl">{counter}</span>
      <div className="flex items-center justify-center">
        <button
          className="p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          +1
        </button>
        <button
          className="p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
          onClick={() => {
            if (counter > 0) setCounter(counter - 1);
          }}
        >
          -1
        </button>
      </div>
    </div>
  );
}
