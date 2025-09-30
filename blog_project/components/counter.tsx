'use client';
import { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  setTimeout(() => setCount(count + 1), 1000);
  return (
    <>
      <div>The count is {count}</div>
    </>
  );
};

export default Counter;