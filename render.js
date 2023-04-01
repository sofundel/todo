export { render }
import { STATUS, PRIORITY, HTML_STRUCTURE, IN_PROGRESS } from "./constants.js";
import { getTasks, saveTasks } from "./localstorage.js";
import { changeStatus, deleteTask } from "./modify-list.js";
import { getTime, getTimeInterval } from "./formatting-time.js";

function render() {
    const deletedElements = document.querySelectorAll(".todo-list__tasks-list li");
    deleteHTMLStructure(deletedElements);

    const todoList = getTasks("todoList");
    todoList.sort((task1, task2) => task1["status"] > task2["status"] ? -1 : 1);

    //TODO: Масштабировать этот блок кода. Пока что не могу это сделать, т.к. завязано на id "high" или "low"
    for (const task of todoList) {
        if (task.priority === PRIORITY.HIGH) {
            createHTMLStructure(HTML_STRUCTURE.HIGH_PRIORITY_LIST, task);
        } else if (task.priority === PRIORITY.LOW) {
            createHTMLStructure(HTML_STRUCTURE.LOW_PRIORITY_LIST, task);
        }
    }

    saveTasks("todoList", todoList);
}

function deleteHTMLStructure(deletedElements) {
    deletedElements.forEach(function (element) {
        element.parentNode.removeChild(element);
    });
}

//TODO: Упростить функцию
function createHTMLStructure(list, task) {
    const taskInfo = document.createElement("li");
    list.appendChild(taskInfo);
    
    const taskCheckbox = document.createElement("input");
    taskInfo.appendChild(taskCheckbox);
    taskCheckbox.type = "checkbox";
    taskCheckbox.className = "todo-list__task-checkbox";
    //TODO: Улучшить уникальность id
    taskCheckbox.id = Math.random();

    if (task.status === STATUS.DONE) {
        taskCheckbox.checked = true;
        taskCheckbox.parentNode.style.backgroundColor = "#eaeaea";
    };

    //TODO: Реализовать делегирование событий на ul со списком ИЛИ Реализовать удаление обработчиков
    taskCheckbox.addEventListener("change", () => { changeStatus(taskCheckbox, task.id) });

    const taskCheckboxText = document.createElement("label");
    taskInfo.appendChild(taskCheckboxText);
    taskCheckboxText.className = "todo-list__checkbox-text";
    taskCheckboxText.setAttribute('for', taskCheckbox.id);

    const deleteTaskButton = document.createElement("button");
    taskInfo.appendChild(deleteTaskButton);
    deleteTaskButton.className = "todo-list__delete-task-button";
    //TODO: Реализовать делегирование событий на ul со списком ИЛИ Реализовать удаление обработчиков
    deleteTaskButton.addEventListener("click", () => { deleteTask(taskCheckbox, task.id) });

    taskCheckboxText.textContent = task.name;

    const timeInfo = document.createElement("div");
    taskInfo.appendChild(timeInfo);
    timeInfo.className = "todo-list__time-info";

    const start = document.createElement("p");
    timeInfo.appendChild(start);
    start.className = "todo-list__start-time";
    start.textContent = `Start: ${getTime(new Date(task.startTime))}`;

    const finish = document.createElement("p");
    timeInfo.appendChild(finish);
    finish.className = "todo-list__finish-time";

    if (task.finishTime === IN_PROGRESS) {
        finish.textContent = `Finish: ${IN_PROGRESS}`;
    }
    else {
        finish.textContent = `Finish: ${getTime(new Date(task.finishTime))}`;
    }

    const lead = document.createElement("p");
    timeInfo.appendChild(lead);
    lead.className = "todo-list__lead-time";

    if (task.leadTime === IN_PROGRESS) {
        lead.textContent = `Lead Time: ${IN_PROGRESS}`;
    }
    else {
        lead.textContent = `Lead Time: ${getTimeInterval(new Date(task.leadTime))}`;
    }
}