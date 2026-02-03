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
count.innerText = new_items.length;


to_do_input.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        let new_items = document.createElement("div");
        let input_radio = document.createElement("div");
        let content_items = document.createElement("div");
        let text_items = document.createElement("p"), text_content;
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
        text_items.appendChild(text_content);
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
});

sun.addEventListener('click', function() {
    document.body.dataset.theme = '1';
});