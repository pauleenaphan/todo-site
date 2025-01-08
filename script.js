// calls function when site renders
$(document).ready(getAllTodos);

$(".newTodoBtn").on("click", ()=>{
    $(".newTodoForm").removeClass("d-none");
})

$(".newTodoForm").on("submit", addTodo);

function addTodo(e){
    e.preventDefault();
    // console.log("current tiitle", $(".titleInput").val());

    // adds todos to local storage by grabbing it and updating it 
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    let newTodo = {
        id: todos.length, // assign the next index as the ID
        title: $(".addTitleInput").val(),
        description: $(".addDescInput").val(),
        date: $(".addDateInput").val()
    };

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
    $(".newTodoForm").addClass("d-none");
    getAllTodos();
}

function getAllTodos(){
    let todos = JSON.parse(localStorage.getItem("todos"))

    // We need to empty before we add so we don't add everything back again
    $(".allTodos").empty();
    // $(".allTodos").addClass("d-flex flex-row gap-4"); // gap is not working
    for(let i = 0; i < todos.length; i++){
        let todoTask = $("<div>").addClass("todoTask my-5 bg-light p-4 w-fit rounded");

        todoTask.append($("<div>").addClass("todoTitle h4").text(todos[i].title));
        todoTask.append($("<div>").addClass("todoDesc").text("Description: " + todos[i].description));
        todoTask.append($("<div>").addClass("todoDate mb-2").text("Deadline: " + todos[i].date));

        todoTask.append($("<button>").addClass("btn btn-secondary mr-2").text("Edit")
        .on("click", () =>{ showEditTodoForm(todos[i])}));
        
        todoTask.append($("<button>").addClass("btn btn-danger").text("Remove")
        .on("click", () =>{ removeTodo(todos[i].id)}));

        $(".allTodos").append(todoTask);

    }
}

function showEditTodoForm(todo){
    $(".editTodoForm").removeClass("d-none");

    $(".editTitleInput").val(todo.title)
    $(".editDescInput").val(todo.description)
    $(".editDateInput").val(todo.date)

    $(".editTodoForm").on("submit", function(e) {
        e.preventDefault(); // makes sure the form is submitted before we edit
        editTodo(todo.id);
    });
}

function editTodo(todoId){
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // finds the todo with the matching id
    let todoToEdit = todos.find(todo => todo.id === todoId);

    // update todo with new vals
    todoToEdit.title = $(".editTitleInput").val();
    todoToEdit.description = $(".editDescInput").val();
    todoToEdit.date = $(".editDateInput").val();

    localStorage.setItem("todos", JSON.stringify(todos));

    $(".editTodoForm").addClass("d-none");

    getAllTodos();
}

function removeTodo(todoId) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Filter out the todo with the matching id
    todos = todos.filter(todo => todo.id !== todoId);

    localStorage.setItem("todos", JSON.stringify(todos));

    getAllTodos();
}