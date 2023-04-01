export { addTask, changeStatus, deleteTask }
import { STATUS, IN_PROGRESS } from "./constants.js";
import { getTasks, saveTasks } from "./localstorage.js";
import { render } from "./render.js";

function addTask(form, taskText, priority) {
    const task = taskText.value;
    form.reset();

    if (checkInputData(taskText, task)) {
        return
    };

    const todoList = getTasks("todoList");
    //TODO: Улучшить уникальность id
    todoList.push({
        id: Date.now(),
        name: task,
        status: STATUS.TO_DO,
        priority,
        startTime: Date.now(),
        finishTime: IN_PROGRESS,
        leadTime: IN_PROGRESS
    });

    saveTasks("todoList", todoList);
    render();
}

function checkInputData(taskText, task) {
    if (task.trim() === "") {
        taskText.style.backgroundColor = "#faebf1";
        setTimeout(() => { taskText.style.backgroundColor = "white"; }, 400);

        return true;
    }
}

function changeStatus(taskCheckbox, id) {
    const todoList = getTasks("todoList");
    const index = todoList.findIndex(task => task.id === id);

    if (taskCheckbox.checked) {
        todoList[index].finishTime = Date.now();
        todoList[index].leadTime = todoList[index].finishTime - todoList[index].startTime;
        todoList[index].status = STATUS.DONE;
    } else {
        todoList[index].finishTime = IN_PROGRESS;
        todoList[index].leadTime = IN_PROGRESS;
        todoList[index].status = STATUS.TO_DO;
    }

    saveTasks("todoList", todoList);
    render();
}

function deleteTask(taskCheckbox, id) {
    taskCheckbox.remove();

    const todoList = getTasks("todoList");
    const index = todoList.findIndex(task => task.id === id);

    todoList.splice(index, 1);

    saveTasks("todoList", todoList);
    render();
}