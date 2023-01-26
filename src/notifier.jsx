import { createEffect, createRoot, createSignal } from "solid-js";

function requestPermission(resolve, reject) {
    if (!("Notification" in window)) {
        reject("Notifications are not supported in this browser");
    }

    if (Notification.permission === "granted") {
        resolve("granted");
    } else {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                resolve("granted");
            } else {
                reject("not_granted");
            }
        });
    }
}

function sendNotification(title, body) {
    const notification = new Notification(title, { body });
}

/** Global Notifier */
function createNotifier() {
    const initialValue = localStorage.getItem("notify") ?? "off";
    const [notify, setNotify] = createSignal(initialValue);
    createEffect(() => {
        if (notify() === "on") {
            new Promise(requestPermission).then((permission) => {
                if (permission === "granted") {
                    localStorage.setItem("notify", "on");
                } else {
                    setNotify("off");
                }
            });
        } else if (notify() === "off") {
            localStorage.setItem("notify", "off");
        }
    });

    return { notify, setNotify, sendNotification };
}

export default createRoot(createNotifier);
