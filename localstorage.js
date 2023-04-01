export { saveTasks, getTasks }

function saveTasks(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
}

function getTasks(key) {
    return JSON.parse(localStorage.getItem(key));
}