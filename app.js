/**
 *  -LOS ESTILOS FUERON APLICADOS USANDO BOOSTRAP 4
 *  -EL TEMPLATE DEL FORMULARIO ESTA EN EL ARCHIVO HTML
 *  -DINAMICAMENTE SE CREA EL TEMPLATE DE LA TAREA LUEGO DE AGREGARLA
 *  -LA CLASE USERINTERFACE ALMACENA LOS MÉTODOS DE LA APP
 *  -EL BOTÓN DEL TEMPLATE PARA ELIMINAR TAREA ES UN LINK ESTILIZADO - NO ES UN BOTÓN COMO TAL
 *  -HAY UN TEMPORIZADOR DENTRO DEL MÉTODO SHOWMESSAGES QUE OCULTA LOS MENSAJES LUEGO DE 1 SEGUNDO
 *  -CON THIS. PUEDO LLAMAR A UN MÉTODO DENTRO DE LA MISMA CLASE, SIN EL THIS PUEDO LLAMAR EL MÉTODO
 *   FUERA DE LA CLASE
 */

// CLASE TASK
class Task {
    constructor(name, day) {
        this.name = name,
        this.day = day;
    }
}

// CLASE INTERFACE USUARIO(CONTIENE LOS MÉTODOS QUE REALIZA LA INTERFACE)
// CREA EL TEMPLATE DE LA TAREA LUEGO DE HACER CLICK EN EL BOTÓN AGREGAR TAREA
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

    // MÉTODO PARA DEJAR VACÍO EL FORMULARIO, SE USA DESPÚES DE AGREGAR UNA NUEVA TAREA
    resetForm(){
        document.getElementById("task-form").reset();
    }

    // MÉTODO PARA ELIMINAR TAREA
    deleteTask(element) {
        // DELETE ES EL NOMBRE DE LA PROPIEDAD NAME DEL LINK ESTILIZADO A BOTÓN
        if(element.name === "delete"){
            element.parentElement.parentElement.parentElement.remove()
            this.showMessages("Tarea eliminiada", "info")
        }

    }

    // EL SEGUNDO PARÁMETRO ES LA CLASE QUE USA BOOSTRAP PARA ESTILIZAR EL COLOR DEL MENSAJE
    // MUESTERA UN MENSAJE DEBAJO DEL NAVBAR DE LA APP
    showMessages(message, cssClass) {
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-4`
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const app = document.querySelector("#App");
        container.insertBefore(div, app)
        setTimeout(function () {
            document.querySelector(".alert").remove();
          }, 1000);
    }
}

// LÓGICA DEL FORMULARIO HTML PARA CAPTURAR LOS DATOS INGRESADOS POR EL USUARIO
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
        return userInterface.showMessages("Los campos no pueden estar vacíos", "danger")
    }
    // SE PUEDE LLAMAR TAMBIÉN DE ESTA MANERA O DIRECTAMENTE CON EL THIS.
    userInterface.addTask(task); 
    userInterface.resetForm();
    userInterface.showMessages("Tarea agregada satisfactoriamente", "success")
    e.preventDefault();
});

// LÓGICA PARA CAPTURAR EL CLICK EN EL LINK QUE SE ESTILIZO COMO BOTÓN ELIMINAR TAREA
document.getElementById("task-list").addEventListener("click", function(e){
    const userInterface = new UserInterface();
    userInterface.deleteTask(e.target)
})