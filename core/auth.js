/**
 * Vpoint Firebase Auth Module (Compat Version)
 * Works with file:// protocol
 */

// Global Auth Object
window.Auth = {
    user: null,
    db: null,

    init: function () {
        // Wait for Firebase to load
        if (!window.firebase) {
            console.log("Waiting for Firebase SDK...");
            setTimeout(() => this.init(), 500);
            return;
        }

        if (!window.FirebaseConfig || window.FirebaseConfig.apiKey.includes("YOUR_API_KEY")) {
            console.warn("Firebase not configured.");
            this.updateUI(null);
            return;
        }

        // Prevent double init
        if (!firebase.apps.length) {
            console.log("Initializing Firebase...");
            firebase.initializeApp(window.FirebaseConfig);
        }

        // Initialize Auth and Firestore
        // Initialize Auth and Firestore
        this.auth = firebase.auth();
        this.db = firebase.firestore();

        // Force Long Polling to avoid WebSocket issues
        try {
            this.db.settings({
                experimentalForceLongPolling: true,
                experimentalAutoDetectLongPolling: false
            });
            console.log("🔥 Firestore settings applied: Long Polling ON");
        } catch (e) {
            console.warn("Could not set Firestore settings:", e);
        }

        this.provider = new firebase.auth.GoogleAuthProvider();

        // Listen for auth state
        this.auth.onAuthStateChanged((user) => {
            console.log("Auth State Changed:", user ? user.email : "Logged out");
            this.user = user;
            this.updateUI(user);
        });
    },

    login: async function () {
        if (window.location.protocol === 'file:') {
            alert("⚠️ Google Вхід не працює при відкритті файлу напряму.\n\nБудь ласка, запустіть файл 'START.bat' або 'START.exe' для роботи з хмарним збереженням.\n\nЗараз ви працюєте в автономному режимі.");
            return;
        }

        if (!this.auth) return alert("Система ще завантажується...");
        try {
            await this.auth.signInWithPopup(this.provider);
        } catch (error) {
            console.error("Login Error:", error);
            if (error.code === 'auth/operation-not-supported-in-this-environment') {
                alert("⚠️ Помилка оточення: Google Вхід вимагає HTTP/HTTPS сервера.\nЗапустіть START.bat.");
            } else if (error.code === 'auth/popup-closed-by-user') {
                // Ignore, user just closed it
            } else {
                alert("Помилка входу: " + error.message);
            }
        }
    },

    logout: async function () {
        if (!this.auth) return;
        try {
            await this.auth.signOut();
            // alert("Ви вийшли з системи.");
        } catch (error) {
            console.error(error);
        }
    },

    updateUI: function (user) {
        const loginBtn = document.getElementById('authLoginBtn');
        const userArea = document.getElementById('authUserArea');
        const userName = document.getElementById('authUserName');
        const avatar = document.getElementById('authUserAvatar');

        if (!loginBtn || !userArea) return;

        if (user) {
            loginBtn.style.display = 'none';
            userArea.style.display = 'flex';
            if (userName) userName.innerHTML = `${user.displayName} <br> <a href="history.html" style="font-size:10px; color:#2563eb;">📜 Мої розрахунки</a>`;
            if (avatar) avatar.src = user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName;
        } else {
            loginBtn.style.display = 'flex';
            userArea.style.display = 'none';
        }
    },

    // --- DATABASE METHODS ---

    saveCalculation: async function (data) {
        if (!this.user || !this.db) {
            return alert("Спочатку увійдіть в систему!");
        }

        const calcId = `calc_${Date.now()}`;
        console.log("Saving to Firestore (Timeout 10s)...");

        try {
            // Check network
            if (!navigator.onLine) throw new Error("Відсутнє з'єднання з інтернетом!");

            // Create a timeout promise
            const timeout = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Timeout: З'єднання з базою даних надто повільне")), 10000);
            });

            // Race the save op against the timeout
            await Promise.race([
                this.db.collection("users").doc(this.user.uid).collection("calculations").doc(calcId).set({
                    ...data,
                    savedAt: new Date().toISOString(),
                    id: calcId
                }),
                timeout
            ]);

            console.log("Firestore Write SUCCESS!");
            alert("✅ Розрахунок збережено в хмару!");
        } catch (e) {
            console.error("Firestore Write FAILED:", e);
            let msg = e.message;
            if (e.code === 'permission-denied') msg = "Доступ заборонено (Перевірте налаштування Firebase Rules)";
            if (e.code === 'unavailable') msg = "Сервіс тимчасово недоступний (Офлайн)";
            alert("Помилка збереження: " + msg);
        }
    },

    getHistory: async function () {
        if (!this.user || !this.db) return [];
        try {
            const snap = await this.db.collection("users").doc(this.user.uid).collection("calculations").orderBy("savedAt", "desc").limit(20).get();
            const list = [];
            snap.forEach(doc => list.push(doc.data()));
            return list;
        } catch (e) {
            console.error("Fetch History Error:", e);
            throw e;
        }
    },

    getCalculation: async function (id) {
        if (!this.user || !this.db) throw new Error("Спочатку увійдіть в систему!");
        try {
            const doc = await this.db.collection("users").doc(this.user.uid).collection("calculations").doc(id).get();
            if (doc.exists) {
                return doc.data();
            } else {
                return null;
            }
        } catch (e) {
            console.error("Fetch Calc Error:", e);
            throw e;
        }
    },
    return list.sort((a, b) => b.savedAt.localeCompare(a.savedAt)); // Newest first
} catch (e) {
    console.error(e);
    throw e; // Let UI handle the error
}
    }
};

// Auto-init
setTimeout(() => window.Auth.init(), 500);
