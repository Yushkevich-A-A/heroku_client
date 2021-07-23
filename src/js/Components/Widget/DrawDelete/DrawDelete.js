export default class DrawDelete {
  constructor() {
  }

  drawDelete() {
    this.wrapperDelete = document.createElement('div');
    this.wrapperDelete.classList.add('wrapper-delete');
    this.wrapperDelete.innerHTML = `<div class="field-delete">
    <h3 class="field-delete-title">Удалить элемент</h3>
    <div class="field-delete-block">
      <div class="delete-block block-question">
        <p class="question-text">
          Вы уверены, что хотите удалить этот тикет? Это действие необратимо!
        </p>
      </div>
      <div class="delete-block block-buttons">
        <div class="button delete-cancel">Отмена</div>
        <div class="button delete-submit">ОК</div>
      </div>
    </div>
  </div>`;

  document.body.appendChild(this.wrapperDelete);
  }

  deleteDelete() {
    this.wrapperDelete.parentElement.removeChild(this.wrapperDelete);
  }
}