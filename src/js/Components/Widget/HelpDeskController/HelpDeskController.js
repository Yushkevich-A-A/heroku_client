export default class HelpDeskController {
    constructor(widget, popup, deletePopup, data) {
        this.data = data;
        this.widget = widget;
        this.popup = popup;
        this.deletePopup = deletePopup;
        this.currentId = null;
        this.init();
    }

    init() {
        this.addListeners();
        this.getAllDataWithServer();
    }

    addListeners() {
        document.addEventListener('click', event => {
            //блок удалить
            if (event.target.closest('.block-delete')) {
                this.currentId = event.target.closest('.ticket-item').dataset.id;
                this.deletePopup.drawDelete();
                return;
            }

            if (event.target.closest('.delete-submit')) {
                // здесь должна быть функция отправки запроса на сервер
                this.currentId = null;
                this.deletePopup.deleteDelete();
                return;
            }
            
            if (event.target.closest('.delete-cancel')) {

                this.currentId = null;
                this.deletePopup.deleteDelete();
                return;
            }

            //блок добавить новый тикет

            if (event.target.closest('.add-ticket')) {
                this.popup.drawPopup('add');
                return;
            }

            if (event.target.closest('.add-submit')) {
                // здесь должна быть функция отправки запроса на сервер
                this.popup.deletePopup();
                return;
            }
            
            if (event.target.closest('.add-cancel')) {
                this.popup.deletePopup();
                return;
            }

            //блок добавить изменить существующий

            if (event.target.closest('.block-edit')) {
                this.currentId = event.target.closest('.ticket-item').dataset.id;
                this.popup.drawPopup('edit');
                return;
            }

            if (event.target.closest('.edit-submit')) {
                this.currentId = null;
                // здесь должна быть функция отправки запроса на сервер
                this.popup.deletePopup();
                return;
            }
            
            if (event.target.closest('.edit-cancel')) {
                this.currentId = null;
                this.popup.deletePopup();
                return;
            }

            if (event.target.closest('.ticket-item')) {
                const ticketItem = event.target.closest('.ticket-item');
                const fullDescription = ticketItem.querySelector('.full-description');
                if (!fullDescription) {
                    [...document.querySelectorAll('.full-description')]
                    .forEach(item => item.classList.add('.disable'));

                    getFullDescriptionTicket(ticketItem, ticketItem.dataset.id);
                    return;
                }
                this.widget.changeVisiableFullDescription(fullDescription);
            }
        });
    }

    getAllDataWithServer() {
        const xhr = new XMLHttpRequest();

        const method = 'allTickets';

        xhr.open('GET', `https://yushkevich-server.herokuapp.com/?method=${method}`);

        xhr.responseType = 'json';

        xhr.onload = (event) => {
            this.widget.drawAllTickets(xhr.response);
        };

        xhr.send();
    }

    getFullDescriptionTicket(element, id) {
        const xhr = new XMLHttpRequest();

        const method = 'Ticket';

        xhr.open('GET', `https://yushkevich-server.herokuapp.com/?method=${method}&id=${id}`);

        xhr.responseType = 'json';

        xhr.onload = (event) => {
            const data = xhr.response;
            drawFullDescription(element, data)
        };

        xhr.send();
    }
}