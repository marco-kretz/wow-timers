import { createSignal } from "solid-js";
import styles from "./App.module.css";
import EventTimer from "./components/EventTimer";

function App() {
    const [region, setRegion] = createSignal("eu");
    const events = {
        community_feast: {
            title: "Community Feast",
            interval: 12600,
            duration: 900,
            start: {
                eu: 1670333460,
                na: 1670335260,
            },
        },
        dragonbane_keep: {
            title: "Dragonbane Keep",
            interval: 7200,
            duration: 600,
            start: {
                eu: 1670342460,
                na: 1670338860,
            },
        },
        grand_hunt: {
            title: "Grand Hunt",
            interval: 7200,
            duration: 7199,
            start: {
                eu: 1671307200,
                na: 1671303600,
            },
        },
        primal_storm: {
            title: "Primal Storm",
            interval: 10800,
            duration: 7200,
            start: {
                eu: 1671303600,
                na: 1671310800,
            },
        },
    };
    const [currentTime, setCurrentTime] = createSignal(Date.now() / 1000);
    const timer = setInterval(() => setCurrentTime(Date.now() / 1000), 1000);

    return (
        <div class={styles.App}>
            <header class={styles.header}></header>
            <main>
                <div className="row">
                    <EventTimer currentTime={currentTime} config={events.community_feast} region={region} />
                    <EventTimer currentTime={currentTime} config={events.dragonbane_keep} region={region} />
                </div>
                <div className="row">
                    <EventTimer currentTime={currentTime} config={events.grand_hunt} region={region} />
                    <EventTimer currentTime={currentTime} config={events.primal_storm} region={region} />
                </div>
            </main>
        </div>
    );
}

export default App;
