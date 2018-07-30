export class CacheManager {
    constructor() {
      this.cacheStore = window.sessionStorage;
     
    }
  
    setItem(key ,value) {
      this.cacheStore.setItem(key,JSON.stringify(value))
    }

    getItem(key) {
        return JSON.parse(this.cacheStore.getItem(key))
    }

    deleteItem(key) {
        this.cacheStore.deleteItem(key);
    }

    clearAll() {
        this.cacheStore.clear();
    }
  }