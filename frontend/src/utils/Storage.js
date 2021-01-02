import Cookies from 'js-cookie';

class StorageManager {
  static setLocalStorage(key, value) {
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
  }

  static getLocalStorage(key) {
    const value = window.localStorage.getItem(key);
    return JSON.parse(value);
  }

  static removeLocalStorage(key) {
    window.localStorage.removeItem(key);
  }

  static setCookie(key, value) {
    Cookies.set(key, value);
  }

  static getCookie(key) {
    return Cookies.get(key);
  }

  static removeCookie(key) {
    return Cookies.remove(key);
  }
}

export default StorageManager;