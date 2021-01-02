class ServiceAPI {
  static post(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: typeof data === 'string' ? data : JSON.stringify(data)
    })
      .then(response => response.json())
      .catch(err => {
        return err;
      });
  }

  static get(url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .catch(err => {
        return err;
      });
  }
}

export default ServiceAPI;