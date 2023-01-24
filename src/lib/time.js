export function createCountdown(seconds) {
    return {
        hours: ("0" + Math.floor(seconds / 3600)).slice(-2),
        minutes: ("0" + Math.floor((seconds % 3600) / 60)).slice(-2),
        seconds: ("0" + Math.floor((seconds % 3600) % 60)).slice(-2),
    };
}

export function nextWeeklyReset(activeRegion) {
    const now = new Date();
    let next;

    if (activeRegion === "eu") {
        next = new Date(now.getTime() + 24 * 60 * 60 * 1000 * (3 - now.getDay()));
        next.setUTCHours(4, 0, 0, 0);
    } else {
        next = new Date(now.getTime() + 24 * 60 * 60 * 1000 * (2 - now.getDay()));
        next.setUTCHours(15, 0, 0, 0);
    }

    return next.getTime() / 1000;
}

// Get timestamp from next day 4:00 AM UTC
export function nextDailyReset(activeRegion) {
    const now = new Date();
    let next;

    if (activeRegion === "eu") {
        next = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        next.setUTCHours(4, 0, 0, 0);
    } else {
        next = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        next.setUTCHours(15, 0, 0, 0);
    }

    return next.getTime() / 1000;
}
