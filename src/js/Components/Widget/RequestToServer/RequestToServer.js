/* eslint-disable class-methods-use-this */

export default class RequestToServer {
  constructor() {
    this.signLoad = document.querySelector('.wrapper-sign-load');
  }

  getAllDataWithServer(callback) {
    const xhr = new XMLHttpRequest();
    const method = 'allTickets';
    xhr.open('GET', `https://yushkevich-server.herokuapp.com/?method=${method}`);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          callback(data);
          this.signLoadFunction();
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.addEventListener('error', () => {
      this.signLoadFunction();
    });

    this.signLoadFunction(true);

    xhr.send();
  }

  getFullDescriptionTicket(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const method = 'getFullDescTicket';
      xhr.open('GET', `https://yushkevich-server.herokuapp.com/?method=${method}&id=${id}`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
          this.signLoadFunction();
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(new Error('Непредвиденная ошибка'));
        }
      });
      xhr.addEventListener('error', () => {
        this.signLoadFunction();
      });

      this.signLoadFunction(true);

      xhr.addEventListener('error', () => {
        reject(new Error('Непредвиденная ошибка'));
      });

      xhr.send();
    });
  }

  deleteTicket(id, callback) {
    const xhr = new XMLHttpRequest();
    const method = 'deleteTicket';
    xhr.open('GET', `https://yushkevich-server.herokuapp.com/?method=${method}&id=${id}`);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          if (JSON.parse(xhr.responseText)) {
            this.getAllDataWithServer(callback);
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.addEventListener('error', () => {
      this.signLoadFunction();
    });

    this.signLoadFunction(true);
    xhr.send();
  }

  addNewTicket(form, callback) {
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    const method = 'createTicket';
    xhr.open('POST', 'https://yushkevich-server.herokuapp.com/');
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          if (JSON.parse(xhr.responseText)) {
            this.getAllDataWithServer(callback);
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.addEventListener('error', () => {
      this.signLoadFunction();
    });
    this.signLoadFunction(true);
    formData.append('method', method);
    xhr.send(formData);
  }

  editTicket(form, id, callback) {
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    const method = 'editTicket';
    xhr.open('POST', 'https://yushkevich-server.herokuapp.com/');
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          if (JSON.parse(xhr.responseText)) {
            this.getAllDataWithServer(callback);
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.addEventListener('error', () => {
      this.signLoadFunction();
    });
    this.signLoadFunction(true);
    formData.append('method', method);
    formData.append('id', id);
    xhr.send(formData);
  }

  signLoadFunction(value = false) {
    if (value) {
      this.signLoad.classList.remove('disable');
      setTimeout(() => this.signLoad.style.opacity = 1, 100);
    } else {
      setTimeout(() => {
        this.signLoad.style.opacity = 0;
        setTimeout(() => {
          this.signLoad.classList.add('disable')
        }, 500);
      }, 500);
    }
  }
}
