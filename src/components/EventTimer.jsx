import { createCountdown } from "../lib/time";
import styles from "./EventTimer.module.css";

export default function EventTimer(props) {
    const firstStarted = () => new Date(props.config.start[props.region()] * 1000);
    const nextIn = () => props.config.interval - (((props.currentTime() - firstStarted()) / 1000) % props.config.interval);
    const isActive = () => props.config.interval - nextIn() < props.config.duration;
    const activeTimeRemaining = () => props.config.duration - (props.config.interval - nextIn());

    const countdown = () => {
        let distance = isActive() ? activeTimeRemaining() : nextIn();
        return createCountdown(distance);
    };

    return (
        <div class={styles.EventTimer} classList={{ [styles.active]: isActive(), box: true }}>
            <h1 class="box-title">{props.config.title}</h1>
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
