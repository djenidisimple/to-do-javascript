let moon = document.querySelector('.moon');
let sun = document.querySelector('.sun');
let btn_close = document.getElementsByClassName("btn-close");
let items = document.getElementsByClassName("items");
let to_do_input = document.querySelector("#to-do-input");
let todo = document.querySelector("#todo");
let count = document.querySelector(".count");
let btnStat = document.getElementsByClassName("btn-stat"), btnClear = document.querySelector(".btn-clear");
let input_radio = document.getElementsByClassName("input-radio"); 
Array.from(items).forEach(element => element.style.display = "flex");
let itemsActive = [...items].filter((element) => !element.classList.contains("checked"));
let nextElement, dragged;
let sortList = document.querySelector(".sortList");
count.innerText = itemsActive.length;

document.body.dataset.theme = localStorage.getItem('mode');

to_do_input.addEventListener("keydown", function(e) {
    if (e.keyCode == 13 && to_do_input.value.length > 0) {
        let new_items = document.createElement("div");
        let input_radio = document.createElement("div");
        let content_items = document.createElement("div");
        let text_items = document.createElement("p"), span = document.createElement("span"), text_content;
        let btnClose = document.createElement("button"), newItems;
        new_items.setAttribute("class", "items");
        new_items.setAttribute("draggable", true);
        todo.insertBefore(new_items, todo.lastChild);
        content_items.setAttribute("class", "flex-row");
        input_radio.setAttribute("class", "input-radio");
        text_items.setAttribute("class", "items-text");
        btnClose.setAttribute("type", "button");
        btnClose.setAttribute("class", "btn-close");
        new_items.appendChild(content_items);
        new_items.appendChild(btnClose);
        content_items.appendChild(input_radio);
        content_items.appendChild(text_items);
        text_content = document.createTextNode(`${to_do_input.value}`);
        span.appendChild(text_content);
        text_items.appendChild(span);
        newItems = [...items].filter((element) => !element.classList.contains("checked"));
        count.innerText = newItems.length;
        to_do_input.value = "";
        setChecked();
        deleteItems();
        filterItems();
        clearAllCompleted();
        attachement([...items].filter((element) => element == new_items)[0]);
    }
});

function deleteItems() {
    let newItems = items;
    Array.from(btn_close).forEach(btn => {
        btn.addEventListener('click', function () {
            const clickedItem = this.closest('.items');
            clickedItem.remove();
            newItems = [...items].filter((element) => !element.classList.contains("checked"));
            count.innerText = newItems.length;
        });
    });
}

function filterItems() {
    let newItems = items, countItems = items.length;
    for (let i = 0; i < btnStat.length; i++) {
        btnStat[i].addEventListener("click", function() {
            Array.from(btnStat).forEach(element => element.classList.remove('btn-checked'));
            btnStat[i].classList.add('btn-checked');
            if (i == 2) {
                Array.from(items).forEach(element => element.style.display = "none");
                newItems = [...items].filter((element) => element.classList.contains("checked"));
                count.innerText = newItems.length;
                Array.from(newItems).forEach(element => element.style.display = "flex");
            } else if (i == 1) {
                Array.from(items).forEach(element => element.style.display = "none");
                newItems = [...items].filter((element) => !element.classList.contains("checked"));
                count.innerText = newItems.length;
                Array.from(newItems).forEach(element => element.style.display = "flex");
            } else {
                Array.from(items).forEach(element => element.style.display = "flex");
                newItems = [...items].filter((element) => !element.classList.contains("checked"));
                count.innerText = newItems.length;
            }
        });
    }
}

function setChecked() {
    let newItems = items;
    Array.from(input_radio).forEach((input) => {
        input.addEventListener("click", function() {
            const clickedItem = this.closest('.items');
            
            if (!clickedItem.classList.contains('checked')) {
                clickedItem.classList.add('checked');
                newItems = [...items].filter((element) => !element.classList.contains("checked"));
                count.innerText = newItems.length;
            } else {
                clickedItem.classList.remove('checked');
                newItems = [...items].filter((element) => !element.classList.contains("checked"));
                count.innerText = newItems.length;
            }
        });
    });
}

function clearAllCompleted() {
    btnClear.addEventListener("click", function() {
        Array.from(items).forEach((value) => {
            if (value.classList.contains('checked')) {
                value.remove();
            }
        });
    });
}

setChecked();
deleteItems();
filterItems();
clearAllCompleted();

moon.addEventListener('click', function() {
    document.body.dataset.theme = '2';
    localStorage.setItem('mode', '2');
});

sun.addEventListener('click', function() {
    document.body.dataset.theme = '1';
    localStorage.setItem('mode', '1');
});

Array.from(items).forEach((item) => {
    item.draggable = true;
});

const attachement = (item) => {
    item.addEventListener("dragstart", (event) => {
        setTimeout(() => {
            event.target.classList.add("dragging");
        }, 0);
    });
    item.addEventListener("dragend", (event) => {
        event.target.classList.remove("dragging");
    });
}

Array.from(items).forEach((item) => {
    attachement(item);
});

const initSortableList = (e) => {
    e.preventDefault();
    const dragItems = sortList.querySelector(".dragging");
    const notDrag = [...sortList.querySelectorAll(".items:not(.dragging)")];

    let nextSibling = notDrag.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    sortList.insertBefore(dragItems, nextSibling);
}

sortList.addEventListener("dragover", initSortableList);
sortList.addEventListener("dragenter", e => e.preventDefault());

