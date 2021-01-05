const input = document.getElementById('todo-input');
const main = document.getElementById('main');
const todo_list = document.createElement('ul');
const todo_count = document.getElementById("todo-left");
const todo_footer = document.getElementById("todo-footer")
const todo_clean = document.getElementById("Clear")
todo_footer.style.visibility = "hidden"
todo_clean.style.visibility = "hidden"
todo_list.classList.add("todo-app__list");
main.appendChild(todo_list);
let count = 0;
let todo_arr = [];
let state = 0 //[0:All, 1:Active, 2:Completed]

input.addEventListener('keyup', event => {
    if (event.keyCode === 13 && event.target.value !== '') {
        count += 1;
        const newItem = new CreateNewItem(count);
        newItem.isCompleted = false;
        newItem.node = count;
        todo_arr.push(newItem)
        todo_footer.style.visibility = "visible"
        input.value = "";
        todo_count.innerHTML = todo_arr.filter(ele => !ele.isCompleted).length + " left";
        if (state === 0) Show_All()
        else if (state === 1) Show_Active();
        else Show_Completed();
        State_Change(state)
    }
});

var CreateNewItem = function(count) {
    var new_item = document.createElement("li");
    new_item.setAttribute("id", count);
    new_item.classList.add("todo-app__item");

    var new_checkbox = document.createElement('div');
    var new_input = document.createElement('input');
    var new_label = document.createElement('label');
    new_checkbox.classList.add('todo-app__checkbox');
    new_checkbox.setAttribute("checked", false)
    new_checkbox.setAttribute("onclick", "checkboxOnclick();")
    new_input.type = "checkbox"
    new_checkbox.appendChild(new_input);
    new_checkbox.appendChild(new_label);

    var new_detail = document.createElement('h1');
    new_detail.className = "todo-app__item-detail"
    new_detail.textContent = event.target.value;

    var new_img = document.createElement('img');
    new_img.src = "img/x.png"
    new_img.className = "todo-app__item-x";
    new_img.setAttribute("onclick", "deleteOnclick();")

    new_item.appendChild(new_checkbox)
    new_item.appendChild(new_detail)
    new_item.appendChild(new_img)
    todo_list.appendChild(new_item);
}

function checkboxOnclick() {
    const Node = event.target.parentNode.parentNode; // <li></li>
    var comItem = todo_arr.find(ele => (ele.node).toString() === Node.id);
    var comItemId = todo_arr.indexOf(comItem)
    if (Node.childNodes[0].childNodes[0].checked) { //turn to "not complete"
        Node.childNodes[0].childNodes[0].checked = false
        comItem.isCompleted = false
        todo_arr.splice(comItemId, 1, comItem)
        Node.style["textDecoration"] = "";
        Node.style["opacity"] = 1;
        todo_count.innerHTML = todo_arr.filter(ele => !ele.isCompleted).length + " left";
    } else { //turn to "complete"
        Node.childNodes[0].childNodes[0].checked = true;
        comItem.isCompleted = true
        todo_arr.splice(comItemId, 1, comItem)
        Node.style["textDecoration"] = "line-through";
        Node.style["opacity"] = 0.5;
        todo_count.innerHTML = todo_arr.filter(ele => !ele.isCompleted).length + " left";
    }
    Show_Clear_Btn()
}

function deleteOnclick() {
    const Node = event.target.parentNode;
    var delItem = todo_arr.find(ele => (ele.node).toString() === Node.id)
    var delId = todo_arr.indexOf(delItem)
    Node.parentNode.removeChild(Node)
    todo_arr.splice(delId, 1)
    todo_count.innerHTML = todo_arr.filter(ele => !ele.isCompleted).length + " left";
    if (todo_arr.length === 0) {
        todo_footer.style.visibility = "hidden";
        state = 0;
    }
    Show_Clear_Btn()
}

function Show_Completed() {
    var Completed_list = todo_arr.filter(ele => ele.isCompleted);
    var Completed_id = []
    for (i = 0; i < Completed_list.length; i++) {
        Completed_id.push(Completed_list[i].node.toString())
    }
    for (i = 0; i < todo_list.childNodes.length; i++) {
        if (!Completed_id.includes(todo_list.childNodes[i].id)) {
            todo_list.childNodes[i].style.display = 'none';
        } else {
            todo_list.childNodes[i].style.display = 'flex';
        }
    }
    state = 2
    State_Change(state)
}

function Show_Active() {
    var Active_list = todo_arr.filter(ele => !ele.isCompleted);
    var Active_id = []
    for (i = 0; i < Active_list.length; i++) {
        Active_id.push(Active_list[i].node.toString())
    }
    for (i = 0; i < todo_list.childNodes.length; i++) {
        if (!Active_id.includes(todo_list.childNodes[i].id))
            todo_list.childNodes[i].style.display = 'none';
        else
            todo_list.childNodes[i].style.display = 'flex';
    }
    state = 1
    State_Change(state)
}

function Show_All() {
    for (i = 0; i < todo_list.childNodes.length; i++)
        todo_list.childNodes[i].style.display = 'flex';
    state = 0
    State_Change(state)
}

function Clear_Completed() {
    var Completed_list = todo_arr.filter(ele => ele.isCompleted);
    var Completed_id = []
    for (i = 0; i < Completed_list.length; i++)
        Completed_id.push(Completed_list[i].node.toString())
    console.log(Completed_id)
    for (i = todo_list.childNodes.length - 1; i >= 0; i--) {
        if (Completed_id.includes(todo_list.childNodes[i].id))
            todo_list.childNodes[i].parentNode.removeChild(todo_list.childNodes[i])
    }
    for (i = Completed_id.length - 1; i >= 0; i--) {
        var delItem = todo_arr.find(ele => (ele.node).toString() === Completed_id[i])
        var delId = todo_arr.indexOf(delItem)
        todo_arr.splice(delId, 1)
    }
    if (todo_arr.length === 0) {
        todo_footer.style.visibility = "hidden";
        state = 0;
    }
    Show_Clear_Btn()
}

function Show_Clear_Btn() {
    if (todo_arr.filter(ele => ele.isCompleted).length > 0) todo_clean.style.visibility = "visible"
    else todo_clean.style.visibility = "hidden"
}

function State_Change(next) {
    var ALL_BTN = document.getElementById("All")
    var ACTIVE_BTN = document.getElementById("Active")
    var COMPLETED_BTN = document.getElementById("Completed")
    if (next === 0) {
        ALL_BTN.style.borderColor = 'rgba(175, 47, 47, 0.15)'
        ACTIVE_BTN.style.borderColor = 'transparent'
        COMPLETED_BTN.style.borderColor = 'transparent'
    }
    if (next === 1) {
        ALL_BTN.style.borderColor = 'transparent'
        ACTIVE_BTN.style.borderColor = 'rgba(175, 47, 47, 0.15)'
        COMPLETED_BTN.style.borderColor = 'transparent'
    }
    if (next === 2) {
        ALL_BTN.style.borderColor = 'transparent'
        ACTIVE_BTN.style.borderColor = 'transparent'
        COMPLETED_BTN.style.borderColor = 'rgba(175, 47, 47, 0.15)'
    }
}