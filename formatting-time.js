export { getTime, getTimeInterval };

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
]

function getTime(date) {
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    
    const hours = formatFirstZero(date.getHours());
    const minutes = formatFirstZero(date.getMinutes());

    return `${hours}:${minutes} ${day} ${month} ${year}`;
}

//TODO: Странноватая конструкция получения данных, найти способ покрасивее
function getTimeInterval(interval) {
    const days = interval / (1000 * 60 * 60 * 24);
    const hours = `0.${("" + days).split(".")[1]}` * 24;
    const minutes = `0.${("" + hours).split(".")[1]}` * 60;

    return `${Math.floor(days)}d ${Math.floor(hours)}h ${Math.ceil(minutes)}m`;
}


function formatFirstZero(time) {
    if (time < 10) {
        return `0${time}`;
    } else {
        return time;
    }
}