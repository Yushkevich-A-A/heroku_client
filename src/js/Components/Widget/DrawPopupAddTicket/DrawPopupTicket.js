export default class DrawPopupTicket {
  drawPopup(type, brief, full) {
    this.wrapperPopup = document.createElement('div');
    this.wrapperPopup.classList.add('wrapper-popup');
    this.wrapperPopup.innerHTML = `<div class="popup" data-type="${type}">
    <h3 class="popup-title"></h3>
    <form class="form">
      <div class="input-block">
        <label class="label label-brief-desc" for="brief">Краткое описание</label>
        <input type="text" name="brief" class="input input-brief-desc" required>
      </div>
      <div class="input-block">
        <label class="label label-full-desc" for="full">Полное описание</label>
        <textarea name="full" class="input input-textarea input-full"></textarea>
      </div>
      <div class="input-block block-buttons">
        <div class="button ${type}-cancel">Отмена</div>
        <div class="button ${type}-submit">ОК</div>
      </div>
    </form>
  </div>`;
    document.body.appendChild(this.wrapperPopup);
    const briefDesc = document.querySelector('.input-brief-desc');
    briefDesc.value = brief || '';
    const fullDesc = document.querySelector('.input-full');
    fullDesc.textContent = full || '';
  }

  deletePopup() {
    this.wrapperPopup.parentElement.removeChild(this.wrapperPopup);
    this.wrapperPopup = null;
  }
}
