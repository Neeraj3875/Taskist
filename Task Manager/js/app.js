
// tasks = [ task1, task2, ... ]
// task1 = {
//  id: 1,
//  title: "Buy Books",
//  completed: false
// }

//-----------------State-----------------------//
let tasks =[];  // Array to hold tasks

localStorage.setItem("tasks", JSON.stringify(tasks)); // Store tasks in localStorage


//----------------Data functions----------------//

function loadTasks(){
    const saved = localStorage.getItem("tasks");
    if(saved){
        tasks = JSON.parse(saved);
    }
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//----------------UI functions------------------//

function renderTasks(){

            // <div id="Orderbox">
            //     <div class="item"> 
            //             <p class="item-text">1. Task</p>
            //             <button class="toggle-btn">✔️</button>
            //     </div>
            //     <div class="item"> 
            //             <p class="item-text">1. Task</p>
            //             <button class="toggle-btn">❓</button>
            //     </div>
                
            // </div>

    const Orderbox = document.getElementById("Orderbox");
    Orderbox.innerHTML = "";

    if(tasks.length === 0){
        const para = document.createElement("p");
        para.className = "NoTaskspara";
        para.textContent = "No tasks available";
        list.appendChild(para);
        return;
    }

    tasks.forEach((task, index) => {

        console.log(task);

        const item = document.createElement('div');
        item.className = "item";
        item.style.backgroundColor = task.completed ? "#dbdbdb" : "white";
        item.style.color = task.completed ? "#767676" : "black";
        item.style.fontWeight = task.completed ? "normal" : "bold";
        
    
        const itemText = document.createElement('p');
        itemText.className = "item-text";

        const toogleBtn = document.createElement('button');
        toogleBtn.className = "toggle-btn";

        itemText.textContent = `${index + 1}. ${task.titile}`;
        toogleBtn.textContent = task.completed ? "✔️" : "❓";

    //     const div = document.createElement('div');
    //     const p = document.createElement('p');
    //     const toggleBtn = document.createElement('button');

    //     listItem.className = "listItem";
    //     div.className = "taskItemDiv";
    //     p.className = "taskTitle";
    //     toggleBtn.className = "toggleBtn";

        item.addEventListener('dblclick',(e)=>{
                confirm("Are you sure you want to delete this task?") && deleteTask(task.id);
            }
         );
        

        toogleBtn.addEventListener("click", function(){
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

    //     p.textContent = task.title;
    //     p.innerHTML+= task.titile;

    //     toggleBtn.textContent = task.completed ? "✔️" : "❓";

        item.appendChild(itemText);
        item.appendChild(toogleBtn);
        Orderbox.appendChild(item);
    });
}

//---------------Action functions-----------------//

const addTaskBtn2 = document.getElementById("addTaskBtn").addEventListener("click", function(){
    const taskInput = document.getElementById("taskInput");
    const title = taskInput.value.trim();
    if(tasks.length >= 12){
        alert("Task limit reached. Please delete some tasks before adding new ones.");
        return;
    }
    if(title){
        addTask(title);
        taskInput.value = "";
    }
});

function addTask(title){
    const task = {
        id: Date.now(),
        titile: title,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
}


function toggleTask(id){
    const task = tasks.find(t => t.id === id);

    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function deleteTask(id){
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}


//------------------Initialization------------------//
loadTasks();
renderTasks();