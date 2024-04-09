"use client";

import { useState } from "react";

const CartCounter = () => {
  const [counter, setCounter] = useState<number>(0);
  return (
    <>
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
    </>
  );
};

export default CartCounter;
