// zapewniam, aby w odpowiednich inputach byly wspisywane liczby a nie litery
export function isValidNumberInput(e) {
    if (isNaN(parseInt(e.key, 10)) === true)
        return e.preventDefault();
    return true;
}

// formularz zawsze zwraca wartosc typu string, wiec musze zapewnic, aby w inputach nazwe je
// 'numerycznych' znajdywaly sie liczby
// (wprowadzilem tylko to input hour oraz minute (wateringInterval))
export function parseInputAsNumber(val) {
    if (val === '')
        return -1
    return parseInt(val, 10)
}

// funkcja do zmiany stanu przycisku wyslij w zaleznosci, czy formularz jest uzupelniony
// export function isValidName(val) {
//     if (val.length > 0)
//         return true
//     return false
// }

// sprawdza czy godzina jest zwalidowana, przedzial <0, 24)
export function isValidHour(val) {
    if (val >= 0 && val <= 23)
        return true
    return false
}

// sprawdza czy minuta jest zwalidowana przedzial <0, 60)
export function isValidMinute(val) {
    if (val >= 0 && val <= 59)
        return true
    return false
}
// funckje zmieniajace godzine i minute na sekundy
export function hourMinuteToSeconds(h, m) {
    return h * 3600 + m * 60
}

// fuckcja zamieniaja sekunda na Hour:Minute:Seconds
export function secondsToHourMinuteSecond(s) {
    let seconds = s
    const hour = Math.floor(seconds / 3600)          // zaokraglamy w dol
        .toString()
        .padStart(2, 0)
    seconds -= hour * 3600;
    const minute = Math.floor(seconds / 60)
        .toString()
        .padStart(2, 0)
    seconds -= minute * 60
    seconds = seconds
        .toString()
        .padStart(2, 0)
    return `${hour}h ${minute}min ${seconds} sec`

}