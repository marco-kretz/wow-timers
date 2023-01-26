import { createRoot, createSignal } from "solid-js";

/** Global timer */
function createTimer() {
    const [time, setTime] = createSignal(Math.floor(new Date().getTime() / 1000));
    setInterval(() => {
        setTime((value) => value + 1);
    }, 1000);

    return { time };
}

export default createRoot(createTimer);
