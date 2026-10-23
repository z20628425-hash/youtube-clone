const DATABASE_NAME = "youtube-clone";
const STORE_NAME = "admin-data";
const VIDEOS_KEY = "admin-videos";
const LIBRARY_KEY = "user-library";
const LEGACY_STORAGE_KEY = "youtube-clone-admin-videos";

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DATABASE_NAME, 1);

    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("IndexedDB ochilmadi."));
  });
}

async function readVideos(database) {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).get(VIDEOS_KEY);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Videolarni o‘qib bo‘lmadi."));
  });
}

export async function loadAdminVideos() {
  if (!window.indexedDB) {
    throw new Error("Brauzeringiz ma’lumotlarni saqlashni qo‘llab-quvvatlamaydi.");
  }

  const database = await openDatabase();
  const savedVideos = await readVideos(database);
  if (Array.isArray(savedVideos)) return savedVideos;

  const legacyData = window.localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!legacyData) return [];

  const legacyVideos = JSON.parse(legacyData);
  if (!Array.isArray(legacyVideos)) {
    throw new Error("Saqlangan video ma’lumotlari noto‘g‘ri formatda.");
  }

  return legacyVideos;
}

export async function saveAdminVideos(videos) {
  if (!window.indexedDB) {
    throw new Error("Brauzeringiz ma’lumotlarni saqlashni qo‘llab-quvvatlamaydi.");
  }

  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(videos, VIDEOS_KEY);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error || new Error("Videolarni saqlab bo‘lmadi."));
    transaction.onabort = () =>
      reject(transaction.error || new Error("Video ma’lumotlarini saqlash bekor qilindi."));
  });
}

export async function loadUserLibrary() {
  if (!window.indexedDB) {
    throw new Error("Brauzeringiz ma’lumotlarni saqlashni qo‘llab-quvvatlamaydi.");
  }

  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).get(LIBRARY_KEY);
    request.onsuccess = () => {
      resolve(
        request.result || {
          history: [],
          watchLater: [],
          liked: [],
        }
      );
    };
    request.onerror = () =>
      reject(request.error || new Error("Kutubxona ma’lumotlarini o‘qib bo‘lmadi."));
  });
}

export async function saveUserLibrary(library) {
  if (!window.indexedDB) {
    throw new Error("Brauzeringiz ma’lumotlarni saqlashni qo‘llab-quvvatlamaydi.");
  }

  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(library, LIBRARY_KEY);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error || new Error("Kutubxonani saqlab bo‘lmadi."));
    transaction.onabort = () =>
      reject(transaction.error || new Error("Kutubxonani saqlash bekor qilindi."));
  });
}
