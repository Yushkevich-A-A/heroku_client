const form = document.querySelector('.subscribe-form');
const button = document.querySelector('.button');

form.addEventListener('click', event => {
    event.preventDefault();
})


button.addEventListener('click', event => {
    // const formdata = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:7070/');
    // xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

    xhr.addEventListener('load', event => {
        console.log(event);
        console.log('Запрос прошел успешно!');
    })

    xhr.addEventListener('error', () => {
        console.log('Ошибка');
    })

    xhr.send();
})