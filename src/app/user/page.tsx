"use client";

import { useEffect, useState } from "react";

export default function User() {
    console.log("in user");

    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter + 1);
    };
    const decrement = () => {
        setCounter(counter - 1);
    };

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={increment}>INCREMENT</button>
            <button onClick={decrement}>DECREMENT</button>
        </div>
    );
}
