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
let new_items = [...items].filter((element) => !element.classList.contains("checked"));
let nextElement, dragged;
count.innerText = new_items.length;

document.body.dataset.theme = localStorage.getItem('mode');

to_do_input.addEventListener("keydown", function(e) {
    if (e.keyCode == 13 && to_do_input.value.length > 0) {
        let new_items = document.createElement("div");
        let input_radio = document.createElement("div");
        let content_items = document.createElement("div");
        let text_items = document.createElement("p"), span = document.createElement("span"), text_content;
        let btnClose = document.createElement("button"), newItems;
        new_items.setAttribute("class", "items");
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
        setChecked();
        deleteItems();
        filterItems();
        clearAllCompleted();
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
    item.classList.add("dropzone");
    item.draggable = true;
});

Array.from(items).forEach((item) => {
    item.addEventListener("dragstart", (event) => {
        // store a ref. on the dragged elem
        dragged = event.target;
        nextElement = dragged.nextElementSibling;
        event.dataTransfer.setDragImage(dragged, 0, 0);
        setTimeout(() => {
            event.target.classList.remove("dropzone");
            event.target.classList.add("dragging");
        }, 0);
    });
    item.addEventListener("dragend", (event) => {
        // reset the transparency
        event.target.classList.remove("dragging");
    });
    item.addEventListener("dragover", (event) => {
        // prevent default to allow drop
        event.preventDefault();
    });
    item.addEventListener("dragenter", (event) => {
        // highlight potential drop target when the draggable element enters it
        if (event.target.classList.contains("dropzone")) {
            event.target.classList.add("dragover");
        }
    });
    item.addEventListener("dragleave", (event) => {
      // reset background of potential drop target when the draggable element leaves it
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.remove("dragover");
      }
    });
    item.addEventListener("drop", (event) => {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      const targetElement = event.target;
      // move dragged element to the selected drop target
      if (targetElement.closest(".dropzone") && targetElement !== dragged && dragged) {
        const parentDrop = targetElement.parentNode;
        const parentDrag = dragged.parentNode;
        interime = targetElement;
        parentDrop.insertBefore(dragged, targetElement);
        parentDrag.insertBefore(targetElement, nextElement);
        event.target.classList.remove("dragover");
        dragged.classList.add("dropzone");
      }
    });
});

