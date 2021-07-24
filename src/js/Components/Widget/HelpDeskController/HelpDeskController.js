import RequestToServer from '../RequestToServer/RequestToServer';

export default class HelpDeskController {
  constructor(widget, popup, deletePopup, data) {
    this.data = data;
    this.widget = widget;
    this.popup = popup;
    this.deletePopup = deletePopup;
    this.currentId = null;

    this.requestsToServer = new RequestToServer();
    this.init();
  }

  init() {
    this.addListeners();
    this.requestsToServer.getAllDataWithServer((data) => {
      this.widget.drawAllTickets(data);
    });
  }

  addListeners() {
    document.addEventListener('click', (event) => {
      // блок удалить
      if (event.target.closest('.block-delete')) {
        this.currentId = event.target.closest('.ticket-item').dataset.id;
        this.deletePopup.drawDelete();
        return;
      }

      if (event.target.closest('.delete-submit')) {
        this.requestsToServer.deleteTicket(this.currentId, (data) => {
          this.widget.drawAllTickets(data);
        });
        this.currentId = null;
        this.deletePopup.deleteDelete();
        return;
      }

      if (event.target.closest('.delete-cancel')) {
        this.currentId = null;
        this.deletePopup.deleteDelete();
        return;
      }

      // блок добавить новый тикет
      if (event.target.closest('.add-ticket')) {
        this.popup.drawPopup('add');
        return;
      }

      if (event.target.closest('.add-submit')) {
        const form = event.target.closest('.form');
        const mainInput = form.querySelector('.input-brief-desc');
        if (mainInput.value === '') {
            mainInput.focus();
            return
        }
        this.requestsToServer.addNewTicket(form, (data) => {
          this.widget.drawAllTickets(data);
        });
        this.popup.deletePopup();
        return;
      }

      if (event.target.closest('.add-cancel')) {
        this.popup.deletePopup();
        return;
      }

      // блок изменить существующий
      if (event.target.closest('.block-edit')) {
        const currentElement = event.target.closest('.ticket-item');
        this.currentId = currentElement.dataset.id;
        const fullDescription = currentElement.querySelector('.full-description');
        const valueInputBrief = currentElement.querySelector('.title-ticket').textContent;

        if (!fullDescription) {
          this.requestsToServer.getFullDescriptionTicket(this.currentId)
            .then((result) => result.join('\r\n'))
            .then((result) => { this.popup.drawPopup('edit', valueInputBrief, result); });
          return;
        }

        const valueInputfull = [...fullDescription.querySelectorAll('p')]
          .map((item) => item.textContent).join('\r\n');
        this.popup.drawPopup('edit', valueInputBrief, valueInputfull);
        return;
      }

      if (event.target.closest('.edit-submit')) {
        const form = event.target.closest('.form');
        const mainInput = form.querySelector('.input-brief-desc');
        console.log(mainInput)
        if (mainInput.value === '') {
            mainInput.focus();
            return
        }
        this.requestsToServer.editTicket(form, this.currentId, (data) => {
          this.widget.drawAllTickets(data);
        });
        this.currentId = null;
        this.popup.deletePopup();
        return;
      }

      if (event.target.closest('.edit-cancel')) {
        this.currentId = null;
        this.popup.deletePopup();
        return;
      }

      // получить полное описание тикета
      if (event.target.closest('.ticket-item')) {
        const ticketItem = event.target.closest('.ticket-item');

        const fullDescription = ticketItem.querySelector('.full-description');
        if (!fullDescription) {
          [...document.querySelectorAll('.full-description')]
            .forEach((item) => item.classList.add('disable'));

          this.requestsToServer.getFullDescriptionTicket(ticketItem.dataset.id)
            .then((result) => this.widget.drawFullDescription(ticketItem, result));
          return;
        }
        this.widget.changeVisiableFullDescription(fullDescription);
      }
    });
  }
}
