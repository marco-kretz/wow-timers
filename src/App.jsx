import { createI18nContext, I18nContext } from "@solid-primitives/i18n";
import { createEffect, createSignal } from "solid-js";
import styles from "./App.module.scss";
import EventTimer from "./components/EventTimer";
import WorldEvents from "./lib/events";
import translations from "./lib/translations.json";
import notifer from "./notifier";

function App() {
    const [region, setRegion] = createSignal(localStorage.getItem("region") || "eu");
    createEffect(() => {
        localStorage.setItem("region", region());
    });

    const { notify, setNotify } = notifer;
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
                    <img
                        class={styles["btn-notify"]}
                        src={"/src/assets/bell-" + (notify() === "on" ? "on" : "off") + ".svg"}
                        onClick={() => setNotify(notify() === "on" ? "off" : "on")}
                        height="25"
                    />
                </header>
                <main>
                    {/* <div className="row small">
                        <ResetTimer title="Weekly Reset" nextReset={nextWeeklyReset(region())} />
                        <ResetTimer title="Daily Reset" nextReset={nextDailyReset(region())} />
                    </div> */}
                    <div className="row">
                        <EventTimer region={region} config={WorldEvents.community_feast} />
                        <EventTimer region={region} config={WorldEvents.dragonbane_keep} />
                    </div>
                    <div className="row">
                        <EventTimer region={region} config={WorldEvents.grand_hunt} />
                        <EventTimer region={region} config={WorldEvents.primal_storm} />
                    </div>
                </main>
                <footer></footer>
            </div>
        </I18nContext.Provider>
    );
}

export default App;
