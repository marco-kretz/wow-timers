import { createCountdown } from "../lib/time";

export default function ResetTimer(props) {
    const countdown = () => {
        let distance = props.nextReset - props.currentTime();

        return createCountdown(distance);
    };

    return (
        <div class="box small">
            <h3 class="box-title">{props.title}</h3>
            <div class="timer small">
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
