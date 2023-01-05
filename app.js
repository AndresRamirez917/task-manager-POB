class Task {
    constructor(name, day) {
        (this.name = name), (this.day = day);
    }
}

class UserInterface {
    addTask(task) {
        const taskList = document.getElementById("task-list");
        const element = document.createElement("div");
        element.innerHTML = `
        <div class="card text-center mb-4">
            <did class="card-body">
                <strong>Tarea</strong>: ${task.name}
                <strong>Hora/Día</strong>: ${task.day}
            </div>
        </div> 
        `;
    }

    deleteTask() {}

    showMessages() {}
}

document.getElementById("task-form").addEventListener("submit", function (e) {
    const taskName = document.getElementById("task-name").value;
    const taskTime = document.getElementById("task-time").value;
    console.log(taskName, taskTime);
    const task = new Task(taskName, taskTime);
    console.log(task);
    e.preventDefault();
});
