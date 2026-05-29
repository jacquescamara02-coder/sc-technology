// Browser storage is fragile on iPad Safari/WebView: localStorage can be
// unavailable, full, or throw while reading/writing. Zustand persist should
// never let those exceptions escape during app launch.
const memory = new Map<string, string>();

const memoryStorage: Storage = {
  get length() {
    return memory.size;
  },
  clear: () => memory.clear(),
  getItem: (key) => (memory.has(key) ? memory.get(key)! : null),
  key: (index) => Array.from(memory.keys())[index] ?? null,
  removeItem: (key) => {
    memory.delete(key);
  },
  setItem: (key, value) => {
    memory.set(key, value);
  },
};

function pickBrowserStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  const candidates: Storage[] = [];
  try {
    candidates.push(window.localStorage);
  } catch {
    // Accessing localStorage itself can throw in restricted iPad WebViews.
  }
  try {
    candidates.push(window.sessionStorage);
  } catch {
    // Accessing sessionStorage itself can throw too.
  }

  for (const storage of candidates) {
    try {
      const testKey = "__sc_storage_test__";
      storage.setItem(testKey, "1");
      storage.removeItem(testKey);
      return storage;
    } catch {
      // Try the next storage backend.
    }
  }

  return null;
}

export function safeStorage(): Storage {
  const underlying = pickBrowserStorage();
  if (!underlying) return memoryStorage;

  return {
    get length() {
      try {
        return underlying.length;
      } catch {
        return memoryStorage.length;
      }
    },
    clear: () => {
      try {
        underlying.clear();
      } catch {
        memoryStorage.clear();
      }
    },
    getItem: (key) => {
      try {
        return underlying.getItem(key) ?? memoryStorage.getItem(key);
      } catch {
        return memoryStorage.getItem(key);
      }
    },
    key: (index) => {
      try {
        return underlying.key(index) ?? memoryStorage.key(index);
      } catch {
        return memoryStorage.key(index);
      }
    },
    removeItem: (key) => {
      try {
        underlying.removeItem(key);
      } catch {
        // ignore
      }
      memoryStorage.removeItem(key);
    },
    setItem: (key, value) => {
      try {
        underlying.setItem(key, value);
        memoryStorage.removeItem(key);
      } catch {
        try {
          underlying.removeItem(key);
        } catch {
          // ignore
        }
        memoryStorage.setItem(key, value);
      }
    },
  };
}