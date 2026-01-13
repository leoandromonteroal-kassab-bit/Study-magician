let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function render(){
  const div=document.getElementById("tasks");
  if(!div) return;
  div.innerHTML="";
  tasks.forEach((t,i)=>{
    div.innerHTML+=`
      <div class="todo-item">
        <input type="checkbox">
        ${t}
        <button onclick="removeTask(${i})">X</button>
      </div>`;
  });
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){
  const input=document.getElementById("taskInput");
  if(input.value){
    tasks.push(input.value);
    input.value="";
    render();
  }
}

function removeTask(i){
  tasks.splice(i,1);
  render();
}

render();

/* LOGIN (simulerad) */
function login(){
  const u=document.getElementById("user").value;
  const p=document.getElementById("pass").value;
  document.getElementById("loginMsg").innerText =
    u && p ? "Inloggad (simulerad)" : "Fyll i alla fält";
}