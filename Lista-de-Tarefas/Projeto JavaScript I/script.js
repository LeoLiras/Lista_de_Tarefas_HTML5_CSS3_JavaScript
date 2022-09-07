(function(){

let $inpt = document.querySelector('.input-text');
let $list = document.querySelector('.list');
let $listItems = document.querySelectorAll('.list-group-item')
let $span = document.querySelector('.alert');
let $btn = document.querySelector('.button-sent');

let tasks = JSON.parse(localStorage.getItem("Tasks"));

let sentTask = () =>{
    if($inpt.value !== ''){
        $span.style.display = 'none';

        let newItem = document.createElement('li');
        newItem.setAttribute('class', 'list-group-item list-group-item-action');

        let itemText = document.createTextNode($inpt.value);
        newItem.appendChild(itemText);

        $list.appendChild(newItem);
        $listItems = document.querySelectorAll('.list-group-item-action');
        deleteTask();

        saveTasks();
        saveDataStorage(tasks);

        $inpt.value = '';

    }else{
        $span.style.display = 'block';
    }
}

let deleteTask = () =>{
    for(let i = 0; i < $listItems.length; i++){
        $listItems[i].addEventListener('click', function(){
            $list.removeChild($listItems[i]);

            saveTasks();    
        })
    }
    saveDataStorage(tasks);  
}

let renderTasks = () =>{
    for(let i = 0; i < tasks.length; i++){
        let item = document.createElement('li');
        item.setAttribute('class', 'list-group-item list-group-item-action');
    
        let text = document.createTextNode(tasks[i]);
        item.appendChild(text);
    
        $list.appendChild(item);
        $listItems = document.querySelectorAll('.list-group-item')
    }
}

let saveTasks = () =>{
    tasks = [];
    for(let i = 0; i < $listItems.length; i++){
        tasks[i] = $listItems[i].innerHTML;
    }
}

let saveDataStorage = (tasks) =>{
        localStorage.setItem("Tasks", JSON.stringify(tasks));     
}

if(tasks.length !== 0){
    renderTasks();
}

deleteTask();

$btn.addEventListener('click', sentTask);

$inpt.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        sentTask();
    }
});
})();