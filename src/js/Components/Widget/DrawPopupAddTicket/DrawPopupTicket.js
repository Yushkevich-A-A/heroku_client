export default class DrawPopupTicket {
  constructor() {
  }

  drawPopup(type) {
    this.wrapperPopup = document.createElement('div');
    this.wrapperPopup.classList.add('wrapper-popup');
    this.wrapperPopup.innerHTML = `<div class="popup" data-type="${type}">
    <h3 class="popup-title"></h3>
    <form class="form">
      <div class="input-block">
        <label class="label label-brief-desc" for="brief-desc">Краткое описание</label>
        <input type="text" name="brief-desc" class="input input-brief-desc">
      </div>
      <div class="input-block">
        <label class="label label-full-desc" for="full-desc">Полное описание</label>
        <textarea name="full-desc" class="input input-textarea input-full-desc"></textarea>
      </div>
      <div class="input-block block-buttons">
        <div class="button ${type}-cancel">Отмена</div>
        <div class="button ${type}-submit">ОК</div>
      </div>
    </form>
  </div>`;

  document.body.appendChild(this.wrapperPopup);
  }

  deletePopup() {
    this.wrapperPopup.parentElement.removeChild(this.wrapperPopup);
    this.wrapperPopup = null;
  }
}