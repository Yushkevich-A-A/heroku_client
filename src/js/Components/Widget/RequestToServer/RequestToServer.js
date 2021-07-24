export default class RequestToServer {
  constructor() {

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
            } catch (e) {
                console.error(e);
            }
        }
    });

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
              } else {
                  const error = new Error(this.statusText);
                  error.code = this.status;
                  reject('Непредвиденная ошибка');
              }
          });

          xhr.addEventListener('error', event => {
              reject('Непредвиденная ошибка');
          });

          xhr.send();
      })
  }

  deleteTicket(id, callback) {
      const xhr = new XMLHttpRequest();
      const method = 'deleteTicket';
      xhr.open('GET', `https://yushkevich-server.herokuapp.com/?method=${method}&id=${id}`);
      xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
              try {
                if(JSON.parse(xhr.responseText)) {
                  this.getAllDataWithServer(callback);
                }

              } catch (e) {
                  console.error(e);
              }
          }
      });
      xhr.send();
  }

  addNewTicket(form, callback) {
      const formData = new FormData(form);
      const xhr = new XMLHttpRequest();
      const method = 'createTicket';
      xhr.open('POST', `https://yushkevich-server.herokuapp.com/`);
      xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
              try {
                  if(JSON.parse(xhr.responseText)) {
                    this.getAllDataWithServer(callback);
                  }

              } catch (e) {
                  console.error(e);
              }
          }
      });
      formData.append('method', method)
      xhr.send(formData);
  }

  editTicket(form, id, callback) {
      const formData = new FormData(form);
      const xhr = new XMLHttpRequest();
      const method = 'editTicket';
      xhr.open('POST', `https://yushkevich-server.herokuapp.com/`);
      xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
              try {
                  if(JSON.parse(xhr.responseText)) {
                    this.getAllDataWithServer(callback);
                  }

              } catch (e) {
                  console.error(e);
              }
          }
      });
      formData.append('method', method);
      formData.append('id', id);
      xhr.send(formData);
  }
}