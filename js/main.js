let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");
let elSpan = document.querySelector(".js-span");
let elDate = document.querySelector(".js-input-date")

let array = [
    {
        id: 0,
        title: "Kitob o'qish",
        completed: false,
        date: '2023-02-02'
    },

    {
        id: 1,
        title: "Yugurilish",
        completed: false,
        date: '2023-02-02'
    },

    {
        id: 2,
        title: "Uyga qaytish",
        completed: false,
        date: '2023-02-02'
    },
];

function generalDate(time) {
    let date = new Date(time);

    let year = date.getFullYear();
    if (year < 10) {
        year = '0' + year;
    };

    let month = date.getMonth();
    if (month < 10) {
        month = '0' + month;
    };

    let day = date.getDay();
    if (day < 10) {
        day = '0' + day;
    };

    let hour = date.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    };

    let minute = date.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    };

    return `${hour}:${minute} / ${day}.${month}.${year}`;
}

function renderArrays(todo) {
    elList.textContent = ' '
    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        const resultDate = generalDate(todo[i].date)
        const newLi = document.createElement('li');
        newLi.className = 'list-group-item d-flex justify-content-between align-items-center mt-3';

        newLi.innerHTML = `
                <div>
                    <h4 style ='${todo[i].completed ?
                'text-decoration:line-through' : ''}'>
                    ${element.title}</h4>
                    
                    <p> 📆 ${resultDate}</p>
                </div>    
                    <div>
                        <button data-id = ${todo[i].id}
                        class="js-complete btn btn-info text-white">Completed</button>
                        <button data-id = ${todo[i].id} 
                        class="btn btn-primary">Edit</button>
                        <button data-id = ${todo[i].id} 
                        class="js-delete btn btn-danger">Delete</button>
                    </div>
    `;
        elList.appendChild(newLi);
    }
}
renderArrays(array);




elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let input = elInput.value;
    let date = elDate.value;

    //required input
    if (input === "") {
        elSpan.style.display = "block"
        return;
    }
    elSpan.style.display = 'none';

    const newArray = {
        id: array.length > 0 ? array[array.length - 1].id + 1 : 0,
        title: input,
        completed: false,
        date: date,
    }

    array.push(newArray);
    renderArrays(array);
    elForm.reset()
});

elList.addEventListener('click', function (evt) {
    const elem = evt.target;


    if (elem.className.includes("js-complete")) {
        const id = Number(elem.dataset.id);
        

        for (let i = 0; i < array.length; i++) {
            const element = array[i];

            if (element.id == id) {
                element.completed = !element.completed;
            }
        }

        renderArrays(array);
    }

    if (elem.className.includes("js-delete")) {
        const id = Number(elem.dataset.id);

        console.log(id)

        const result = []
        for (let i = 0; i < array.length; i++) {
            const element = array[i];

            if (element.id != id) {
                result.push(element);
            }
        }
        array = result;
        renderArrays(result);
    }
});


