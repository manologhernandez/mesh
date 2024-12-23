import { saveKey, loadKey } from "@/tools/indexedDbUtils";

// Generate and save encryption key to indexed db
async function generateAndSaveKey() {
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  await saveKey(key, "k");
}

// encrypt and cache into local storage
async function encryptAndStore(key, val) {
  var encryptionKey = await loadKey("k");
  if (!encryptionKey) {
    await generateAndSaveKey();
    encryptionKey = await loadKey("k");
  }

  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    encryptionKey,
    encoder.encode(JSON.stringify(val))
  );

  localStorage.setItem(
    key,
    btoa(
      JSON.stringify({
        iv: Array.from(iv),
        ciphertext: Array.from(new Uint8Array(ciphertext)),
      })
    )
  );
}

// decrypt cached local storage object
async function decryptAndRetrieve(key) {
  const encryptionKey = await loadKey("k");
  if (!encryptionKey) {
    return;
  }

  var encryptedData = null;
  try {
    encryptedData = JSON.parse(atob(localStorage.getItem(key)));
  } catch (error) {
    console.error(error);
    encryptedData = null;
  }
  if (!encryptedData) {
    return;
  }

  const { iv, ciphertext } = encryptedData;
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(iv) },
    encryptionKey,
    new Uint8Array(ciphertext)
  );

  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(decryptedBuffer));
}

function store(key, val) {
  localStorage.setItem(key, val);
}

function clear() {
  localStorage.removeItem("mesh_token");
  localStorage.removeItem("signupData");
}

export { store, clear, encryptAndStore, decryptAndRetrieve };
