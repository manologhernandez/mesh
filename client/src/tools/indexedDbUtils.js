// indexedDBUtils.js

const DB_NAME = "Mesh";
const STORE_NAME = "k";

// Initialize IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Save Key to IndexedDB
const saveKey = async (key, keyName) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  // Check if the key already exists
  const existingKey = await new Promise((resolve, reject) => {
    const request = store.get(keyName);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });

  if (existingKey) {
    return false; // Indicate that the save was skipped
  }

  // Export and save the new key
  const exportedKey = await crypto.subtle.exportKey("jwk", key); // Export key as JWK
  store.put(exportedKey, keyName);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(true); // Indicate that the save was successful
    transaction.onerror = (event) => reject(event.target.error);
  });
};

// Load Key from IndexedDB
const loadKey = async (keyName) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.get(keyName);
    request.onsuccess = async (event) => {
      const jwk = event.target.result;
      if (jwk) {
        const key = await crypto.subtle.importKey(
          "jwk",
          jwk,
          { name: "AES-GCM" },
          true,
          ["encrypt", "decrypt"]
        );
        resolve(key);
      } else {
        resolve(null);
      }
    };
    request.onerror = (event) => reject(event.target.error);
  });
};

export { saveKey, loadKey };
