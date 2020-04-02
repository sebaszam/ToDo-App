//Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST;
let id;

//GET item from LocalStorage
let data = localStorage.getItem("TODO");

//VERIFY data isn't empty
if (data){
    LIST = JSON.parse(data);
    id = LIST.length;  //SETS id to the last number of the LIST
    loadList(LIST);    //LOADS the list to the UI
} else {
    LIST = [];
    id = 0;
}

//LOAD items to UI
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

//CLEAR LocalStorage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

//Show today's date
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Add ToDo function
function addToDo(toDo, id, done, trash) {

    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";


    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i> 
                  </li>
                `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//Add item when user hits event key "enter"
document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13){
        const toDo = input.value;

        //if the input isn't empty
        if (toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //Add item to LocalStorage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

//Complete ToDo function
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remove ToDo function
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//Target items created dynamically
list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob === "complete"){
        completeToDo(element);
    } else if (elementJob === "delete"){
        removeToDo(element);
    }

    //Add item to LocalStorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
})
