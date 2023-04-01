import { HTML_STRUCTURE, PRIORITY } from "./constants.js";
import { getTasks, saveTasks } from "./localstorage.js";
import { render } from "./render.js";
import { addTask } from "./modify-list.js";

function checkStorage() {
    const currentTodoList = getTasks("todoList");
    if (currentTodoList === null) {
        saveTasks("todoList", []);
    }
}

checkStorage();
render();

HTML_STRUCTURE.ADD_HIGH_TASK_BUTTON.addEventListener("click", (event) => {
    event.preventDefault();
    addTask(HTML_STRUCTURE.HIGH_TASK_FORM, HTML_STRUCTURE.HIGH_TASK_TEXT, PRIORITY.HIGH)
});

HTML_STRUCTURE.ADD_LOW_TASK_BUTTON.addEventListener("click", (event) => {
    event.preventDefault();
    addTask(HTML_STRUCTURE.LOW_TASK_FORM, HTML_STRUCTURE.LOW_TASK_TEXT, PRIORITY.LOW)
});