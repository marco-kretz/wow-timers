import { createI18nContext, I18nContext } from "@solid-primitives/i18n";
import { createEffect, createSignal, onCleanup } from "solid-js";
import styles from "./App.module.scss";
import EventTimer from "./components/EventTimer";
import ResetTimer from "./components/ResetTimer";
import WorldEvents from "./lib/events";
import { nextDailyReset, nextWeeklyReset } from "./lib/time";
import translations from "./lib/translations.json";

function App() {
    const [region, setRegion] = createSignal(localStorage.getItem("region") ?? "eu");
    const [time, setTime] = createSignal(Date.now() / 1000);

    const timer = setInterval(() => {
        setTime(Date.now() / 1000);
    }, 1000);

    onCleanup(() => {
        clearInterval(timer);
    });

    createEffect(() => {
        localStorage.setItem("region", region());
    });

    const langDict = createI18nContext(translations, "en");

    return (
        <I18nContext.Provider value={langDict}>
            <div class={styles.App}>
                <header>
                    <button classList={{ [styles.active]: region() === "eu" }} onClick={() => setRegion("eu")} title="Set region: EU">
                        EU
                    </button>
                    <button classList={{ [styles.active]: region() === "na" }} onClick={() => setRegion("na")} title="Set region: NA">
                        NA
                    </button>
                </header>
                <main>
                    <div className="row small">
                        <ResetTimer currentTime={time} region={region} title="Weekly Reset" nextReset={nextWeeklyReset(region())} />
                        <ResetTimer currentTime={time} region={region} title="Daily Reset" nextReset={nextDailyReset(region())} />
                    </div>
                    <div className="row">
                        <EventTimer currentTime={time} region={region} config={WorldEvents.community_feast} />
                        <EventTimer currentTime={time} region={region} config={WorldEvents.dragonbane_keep} />
                    </div>
                    <div className="row">
                        <EventTimer currentTime={time} region={region} config={WorldEvents.grand_hunt} />
                        <EventTimer currentTime={time} region={region} config={WorldEvents.primal_storm} />
                    </div>
                </main>
                <footer>hey</footer>
            </div>
        </I18nContext.Provider>
    );
}

export default App;
