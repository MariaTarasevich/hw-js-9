function toDoApp(){

    let body = document.body,
        comment = document.createElement('p'),
        app = document.createElement('div'),
        blockToDo = document.createElement('div'),
        title = document.createElement('h1'),
        btnsWrap = document.createElement('div'),
        addNote = document.createElement('input'),
        addButton =  document.createElement('button'),
        deleteAll = document.createElement('button'),
        listWrapper = document.createElement('div'),
        list = document.createElement('ul');

    comment.classList.add('comment')
    app.classList.add('app');
    blockToDo.classList.add('todolist');
    title.classList.add('h1')
    addNote.setAttribute("type","text");
    addNote.setAttribute("placeholder","Новая заметка...");
    addNote.classList.add('note');
    btnsWrap.classList.add('btns-wrap')
    addButton.classList.add('add_btn');
    deleteAll.classList.add('delete-all_btn');
    addButton.classList.add('btns');
    deleteAll.classList.add('btns');
    listWrapper.classList.add('list_wrapper');
    list.classList.add('list');

    comment.innerHTML = 'пометить как важное - ПКМ; <br> удалить заметку - ctrl + ПКМ; <br> редактировать заметку - ctrl + ЛКМ;';
    title.innerHTML = 'ToDoList';
    addButton.innerHTML = 'Добавить';
    deleteAll.innerHTML = 'Стереть всё';

    body.appendChild(comment)
    body.appendChild(app);
    app.appendChild(blockToDo);
    app.appendChild(listWrapper);
    blockToDo.appendChild(title);
    blockToDo.appendChild(addNote);
    blockToDo.appendChild(btnsWrap);
    btnsWrap.appendChild(addButton);
    btnsWrap.appendChild(deleteAll);
    listWrapper.appendChild(list);

    let style = document.createElement('style');
    style.innerHTML = `* {
        margin: 0;
        padding: 0;
    }

    body {
        background-color: rgb(245, 192, 122);
    }

    .comment {
        font-style: italic;
        color: rgba(48, 48, 48, 0.693);
    }

    .app {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        align-items: center;
        margin-top: 50px;
        padding: 20px;
        width: 300px;
        border-radius: 10px;
        box-shadow: 5px 3px 3px grey;
        background-color: rgb(79, 132, 201);
    }

    .h1 {
        color: white;
        text-align: center;
        font-size: 22px;
    }

    .note {
        width: 300px;
        height: 30px;
        margin: 10px 0;
    }

    .note::placeholder {
        color:rgb(34, 86, 182);
    }

    .btns-wrap{
        display: flex;
        justify-content: space-around;
    }

    .btns{
        width: 100px;
        height: 30px;
        background-color: rgba(62, 187, 245, 0.535);
        color: rgb(51, 51, 51);
        border: 2px solid rgb(68, 125, 232);
        font-weight: bold;
    }

    .btns:hover{
        box-shadow: 10px 10px 8px 0px rgba(22, 99, 157, 0.2);
        font-size: 14px;
    }


    .label{
        color: white;
        font-size: 18px;
        display: inline-block;
        margin: 10px 0;
    }

    .important {
        font-weight: bold;
        color: red;
    }

    .list {
        list-style: none;
        width: 200px;
    }

    .list-item:not(:last-child){
        border-bottom: 1px solid grey;
    }



    .label:not(:last-child){
        border-bottom: 1px solid grey;
    }

    .line {
        text-decoration: line-through white;
        color: rgb(63, 63, 63);
        font-style: italic;
    }`;
    document.head.appendChild(style)


    let toDoList = [];

    if(localStorage.getItem('note')){
        toDoList = JSON.parse(localStorage.getItem('note'));
        showNotes();
    }

    addButton.addEventListener('click', function(event){
        if(!addNote.value) return;
        let newNote = {
            note: addNote.value,
            checked: false,
            important: false
        }

        toDoList.push(newNote)
        showNotes()
        localStorage.setItem('note', JSON.stringify(toDoList))
        addNote.value = '';
    })

    addNote.addEventListener('keyup', function(event){
        if (event.keyCode != 13) return;
        if(!addNote.value) return;
        let newNote = {
            note: addNote.value,
            checked: false,
            important: false
        }

        toDoList.push(newNote)
        showNotes()
        localStorage.setItem('note', JSON.stringify(toDoList))
        addNote.value = '';
    })


    function showNotes(){
        let showNote = '';
        if(toDoList.length === 0) list.innerHTML = '';
        toDoList.forEach(function(item, i){

            showNote += `
            <li class="list-item">
                <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
                <label for='item_${i}' class="${item.important ? 'important' : ''} ${item.checked ? 'line' : ''} label">${item.note}</label>
            </li>
            `;
            list.innerHTML = showNote
        })
    }

    list.addEventListener('change', function(event){
        let valueLabel = list.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;

        toDoList.forEach(function(item){
            if (item.note === valueLabel){
                item.checked = !item.checked;
                localStorage.setItem('note', JSON.stringify(toDoList));

            }
        })
        showNotes();
    })

    list.addEventListener('contextmenu', function(event){
        event.preventDefault();
        toDoList.forEach(function(item, i){
            if(item.note === event.target.innerHTML){
                if(event.ctrlKey || event.metaKey){
                    toDoList.splice(i, 1);
                } else {
                    item.important = !item.important;
                }
                showNotes();
                localStorage.setItem('note', JSON.stringify(toDoList));
            }
        })
    })
    list.addEventListener('click', function(event){
        if(event.ctrlKey || event.metaKey){
            event.preventDefault();
            let valueLabel = event.target.innerHTML;    
            let newValue=prompt("Введите новую заметку:");
            if(newValue === '') return;

            toDoList.forEach(function(item){
                if (item.note === valueLabel){
                    item.checked = !item.checked;
                    item.note=newValue;
                    localStorage.setItem('note', JSON.stringify(toDoList));

                }
            })
            showNotes();
        }
    })

    deleteAll.addEventListener('click',function(){
        localStorage.setItem('note', '');
        toDoList='';
        showNotes();
    })
}

toDoApp()