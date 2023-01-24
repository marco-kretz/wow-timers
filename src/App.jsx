import { createDateNow } from "@solid-primitives/date";
import { createSignal } from "solid-js";
import styles from "./App.module.css";
import EventTimer from "./components/EventTimer";
import ResetTimer from "./components/ResetTimer";
import { WorldEvents } from "./lib/events";
import { nextDailyReset, nextWeeklyReset } from "./lib/time";

function App() {
    const [region, setRegion] = createSignal("eu");
    const [now] = createDateNow(1000);

    return (
        <div class={styles.App}>
            <header class={styles.header}></header>
            <main>
                <div className="row small">
                    <ResetTimer currentTime={now} region={region} title="Weekly Reset" nextReset={nextWeeklyReset(region())} />
                    <ResetTimer currentTime={now} region={region} title="Daily Reset" nextReset={nextDailyReset(region())} />
                </div>
                <div className="row">
                    <EventTimer currentTime={now} region={region} config={WorldEvents.community_feast} />
                    <EventTimer currentTime={now} region={region} config={WorldEvents.dragonbane_keep} />
                </div>
                <div className="row">
                    <EventTimer currentTime={now} region={region} config={WorldEvents.grand_hunt} />
                    <EventTimer currentTime={now} region={region} config={WorldEvents.primal_storm} />
                </div>
            </main>
        </div>
    );
}

export default App;
