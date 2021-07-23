export default class HelpDeskController {
    constructor(data, widget, popup, deletePopup) {
        this.data = data;
        this.widget = widget;
        this.popup = popup;
        this.deletePopup = deletePopup;
        this.currentId = null;
        this.init();
    }

    init() {
        this.addListeners();
        this.widget.drawAllTickets(this.data);
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
        });
    }

    getAllDataWithServer() {

    }
}