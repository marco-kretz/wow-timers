import { createSignal } from "solid-js";
import styles from "./App.module.css";
import EventTimer from "./components/EventTimer";
import ResetTimer from "./components/ResetTimer";
import { WorldEvents } from "./lib/events";
import { nextDailyReset, nextWeeklyReset } from "./lib/time";

function App() {
    const [region, setRegion] = createSignal("eu");
    const [currentTime, setCurrentTime] = createSignal(Date.now() / 1000);
    const timer = setInterval(() => setCurrentTime(Date.now() / 1000), 1000);

    return (
        <div class={styles.App}>
            <header class={styles.header}></header>
            <main>
                <div className="row" style="justify-content: flex-start;">
                    <ResetTimer currentTime={currentTime} region={region} title="Weekly Reset" nextReset={nextWeeklyReset(region())} />
                    <ResetTimer currentTime={currentTime} region={region} title="Daily Reset" nextReset={nextDailyReset(region())} />
                </div>
                <div className="row">
                    <EventTimer currentTime={currentTime} region={region} config={WorldEvents.community_feast} />
                    <EventTimer currentTime={currentTime} region={region} config={WorldEvents.dragonbane_keep} />
                </div>
                <div className="row">
                    <EventTimer currentTime={currentTime} region={region} config={WorldEvents.grand_hunt} />
                    <EventTimer currentTime={currentTime} region={region} config={WorldEvents.primal_storm} />
                </div>
            </main>
        </div>
    );
}

export default App;
