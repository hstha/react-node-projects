import StorageManager from "./Storage";

class Authentication {
  static set({ token, user }) {
    StorageManager.setLocalStorage('user', user);
    StorageManager.setCookie('token', token);
  }

  static getUser() {
    const token = StorageManager.getCookie('token');
    const user = StorageManager.getLocalStorage('user');

    if (token && user) {
      return user;
    } else {
      return null;
    }
  }

  static remove() {
    StorageManager.removeCookie('token');
    StorageManager.removeLocalStorage('user');
  }
}

export default Authentication;