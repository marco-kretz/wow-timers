import styles from "./EventTimer.module.css";

export default function EventTimer(props) {
    const firstStarted = () => props.config.start[props.region()];
    const nextIn = () => props.config.interval - ((props.currentTime() - firstStarted()) % props.config.interval);
    const isActive = () => props.config.interval - nextIn() < props.config.duration;
    const activeTimeRemaining = () => props.config.duration - (props.config.interval - nextIn());

    const countdown = () => {
        let distance = isActive() ? activeTimeRemaining() : nextIn();

        return {
            h: ("0" + Math.floor(distance / 3600)).slice(-2),
            m: ("0" + Math.floor((distance % 3600) / 60)).slice(-2),
            s: ("0" + Math.floor((distance % 3600) % 60)).slice(-2),
        };
    };

    return (
        <div class={styles.EventTimer} classList={{ [styles.active]: isActive() }}>
            <h1 class="headline">{props.config.title}</h1>
            <div class="timer">
                <ul>
                    <li>
                        <span class="hours">{countdown().h}</span>H
                    </li>
                    <li>
                        <span class="minutes">{countdown().m}</span>M
                    </li>
                    <li>
                        <span class="seconds">{countdown().s}</span>S
                    </li>
                </ul>
            </div>
        </div>
    );
}
