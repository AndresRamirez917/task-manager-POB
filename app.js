class Task {
    constructor(name, day) {
        this.name = name,
        this.day = day;
    }
}

class UserInterface {
    addTask(task) {
        const taskList = document.getElementById("task-list");
        const element = document.createElement("div");
        element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Tarea</strong>: ${task.name}
                <strong>Hora/Día</strong>: ${task.day}
                <a href="#" class="btn btn-danger" name="delete">Eliminar</a>
            </div>
        </div> 
        `;
        // EL LINK SE ESTILIZÓ COMO BOTÓN GRACIAS A LOS ESTILOS DE BOOSTRAP
        taskList.appendChild(element);
        this.resetForm();
    }

    resetForm(){
        document.getElementById("task-form").reset();
    }

    deleteTask(element) {
        if(element.name === "delete"){
            element.parentElement.parentElement.parentElement.remove()
            this.showMessages("Tarea eliminiada", "info")
        }

    }

    showMessages(message, cssClass) {
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-4`
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const app = document.querySelector("#App");
        container.insertBefore(div, app)
        setTimeOut = setTimeout(function(){
            document.querySelector(".alert").remove()
        }, 1000)
    }
}

document.getElementById("task-form").addEventListener("submit", function (e) {
    const taskName = document.getElementById("task-name").value;
    const taskTime = document.getElementById("task-time").value;
    console.log(taskName, taskTime);
    const task = new Task(taskName, taskTime);
    console.log(task);
    const userInterface = new UserInterface();
    if(taskName === "" || taskTime === ""){
        // SIN ESTE RETURN MOSTRARÍA EL MENSAJE DE TAREA AGREGADA SATISFACTORIAMENTE
        // CON EL RETURN OBLIGAMOS A QUE LA FUNCIÓN SE EJECUTE HASTA ESE PUNTO Y NO SIGA
        return userInterface.showMessages("los campos no pueden estar vacíos", "danger")
    }
    // SE PUEDE LLAMAR TAMBIÉN DE ESTA MANERA
    userInterface.addTask(task); 
    userInterface.resetForm();
    userInterface.showMessages("Tarea agregada satisfactoriamente", "success")
    e.preventDefault();
});

document.getElementById("task-list").addEventListener("click", function(e){
    const userInterface = new UserInterface();
    userInterface.deleteTask(e.target)
})