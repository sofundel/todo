export { STATUS, PRIORITY, HTML_STRUCTURE, IN_PROGRESS }

const STATUS = {
    TO_DO: "To Do",
    DONE: "Done",
}

const PRIORITY = {
    LOW: "Low",
    HIGH: "High",
}

const IN_PROGRESS = "In progress";

const HTML_STRUCTURE = {
    HIGH_TASK_FORM: document.querySelector("#high-task-form"),
    HIGH_TASK_TEXT: document.querySelector("#high-task-text"),
    LOW_TASK_FORM: document.querySelector("#low-task-form"),
    LOW_TASK_TEXT: document.querySelector("#low-task-text"),
    ADD_HIGH_TASK_BUTTON: document.querySelector("#add-high-task-button"),
    ADD_LOW_TASK_BUTTON: document.querySelector("#add-low-task-button"),
    HIGH_PRIORITY_LIST: document.querySelector("#high-priority-list"),
    LOW_PRIORITY_LIST: document.querySelector("#low-priority-list"),
}