import { useI18n } from "@solid-primitives/i18n";
import { createEffect } from "solid-js";
import { createCountdown } from "../lib/time";
import notifier from "../notifier";
import timer from "../timer";
import styles from "./EventTimer.module.css";

export default function EventTimer(props) {
    const { time } = timer;
    const firstStarted = () => props.config.start[props.region()];
    const nextIn = () => props.config.interval - ((time() - firstStarted()) % props.config.interval);
    const isActive = () => props.config.interval - nextIn() < props.config.duration;
    const activeTimeRemaining = () => props.config.duration - (props.config.interval - nextIn());

    const countdown = () => {
        const distance = isActive() ? activeTimeRemaining() : nextIn();
        return createCountdown(distance);
    };

    const [t] = useI18n();
    const { notify, sendNotification } = notifier;
    createEffect(() => {
        if (notify() === "on" && nextIn() === 300) {
            sendNotification(t(props.config.title), "Event starts in 5 minutes");
        }
    });

    return (
        <div class={styles.EventTimer} classList={{ [styles.active]: isActive(), box: true }}>
            <h1 class="box-title">{t(props.config.title)}</h1>
            <div class="timer">
                <ul>
                    <li>
                        <span class="hours">{countdown().hours}</span>H
                    </li>
                    <li>
                        <span class="minutes">{countdown().minutes}</span>M
                    </li>
                    <li>
                        <span class="seconds">{countdown().seconds}</span>S
                    </li>
                </ul>
            </div>
        </div>
    );
}
