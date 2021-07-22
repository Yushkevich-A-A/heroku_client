import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawHelpDesk {
  constructor(data = null) {
    this.data = data;
    this.init();
  }

  init() {
    this.drawWidget();
    this.drawAllTickets(this.data);
  }

  drawWidget() {
    this.widgetWrapper = document.createElement('div');
    this.widgetWrapper.classList.add('widget-wrapper');
    this.widgetWrapper.innerHTML =`<div class="widget">
    <div class="add-block">
      <div class="button add-ticket">
        Добавить текст
      </div>
    </div>
    <div class="ticket-list-block">
      <ul class="ticket-list">
      </ul>
      <div class="empty">
        Ticket list is empty
      </div>
    </div>
  </div>`
  document.body.appendChild(this.widgetWrapper);

  this.ticketList = document.querySelector('.ticket-list');
  this.emptyBlock = document.querySelector('.empty');
  }

  resetDataTicketList() {
    this.ticketList.innerHTML = '';
  }

  drawAllTickets(data) {
    if (data === null) {
      this.emptyBlock.classList.remove('disable');
      return;
    }
    this.emptyBlock.classList.add('disable');

    for(let i of data) {
      const li = document.createElement('li');
      li.classList.add('.ticket-item');
      li.dataset.id = i.id;
      li.innerHTML = `<div class="brief-description">
      <div class="item-data block-icon block-complited">
      </div>
      <div class="item-data block-text block-title">
        <h2 class="title-ticket"></h2>
      </div>
      <div class="item-data block-text block-date">
      </div>
      <div class="item-data ticket-buttons">
        <div class="block-icon block-edit">
        </div>
        <div class="block-icon block-delete">
        </div>
      </div>
    </div>`;

    this.ticketList.appendChild(li);

    if(i.status) {
      li.querySelector('.block-complited').classList.add('complited');
    }

    const titleTicket = li.querySelector('.title-ticket');
    titleTicket.textContent = i.name;

    const blockDate = li.querySelector('.block-date');

    blockDate.textContent = moment(i.date).format('DD-MM-YY HH.mm')
    }
  }
}