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
        this.provider.setCustomParameters({
            prompt: 'select_account'
        });

        // Listen for auth state
        this.auth.onAuthStateChanged((user) => {
            console.log("Auth State Changed:", user ? user.email : "Logged out");
            this.user = user;
            this.updateUI(user);
        });
    },

    isLoggingIn: false,

    login: async function () {
        if (window.location.protocol === 'file:') {
            alert("⚠️ Google Вхід не працює при відкритті файлу напряму.\n\nБудь ласка, запустіть файл 'START.bat' або 'START.exe' для роботи з хмарним збереженням.\n\nЗараз ви можете працювати в автономному режимі.");
            this.loginGuest();
            return;
        }

        if (this.isLoggingIn) {
            console.log("Вхід вже виконується, зачекайте...");
            return;
        }

        if (!this.auth) {
            alert("Система авторизації ще завантажується, спробуйте за секунду...");
            return;
        }

        this.isLoggingIn = true;
        try {
            await this.auth.signInWithPopup(this.provider);
        } catch (error) {
            console.error("Login Error:", error);
            if (error.code === 'auth/operation-not-supported-in-this-environment') {
                alert("⚠️ Помилка оточення: Google Вхід вимагає HTTP/HTTPS сервера.\nЗапустіть START.bat.");
            } else if (error.code === 'auth/popup-closed-by-user') {
                // Ignore, user just closed it
            } else if (error.code === 'auth/cancelled-popup-request') {
                // Previous popup was cancelled or replaced
                console.warn("Попередній запит входу скасовано.");
            } else if (error.code === 'auth/popup-blocked') {
                alert("⚠️ Браузер заблокував спливаюче вікно Google Входу.\nБудь ласка, дозвольте спливаючі вікна (Pop-ups) для цього сайту в адресному рядку браузера.");
            } else {
                alert("Помилка входу Google (" + (error.code || error.message) + ").\nЯкщо на серверах Google помилка 500, ви можете скористатися кнопкою 'Продовжити без входу'.");
            }
        } finally {
            this.isLoggingIn = false;
        }
    },

    loginGuest: function () {
        const guestUser = {
            displayName: "Автономний режим",
            email: "offline@local",
            photoURL: "https://ui-avatars.com/api/?name=Guest&background=64748b&color=fff",
            isAnonymous: true
        };
        this.user = guestUser;
        this.updateUI(guestUser);
        const cover = document.getElementById('auth-cover');
        if (cover) {
            cover.style.opacity = '0';
            setTimeout(() => cover.style.display = 'none', 400);
        }
    },

    logout: async function () {
        if (!this.auth) return;
        try {
            await this.auth.signOut();
            this.user = null;
            this.updateUI(null);
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
            const path = window.location.pathname;
            const linkPrefix = path.includes('/core/') ? '' : 'core/';
            if (userName) userName.innerHTML = `${user.displayName} <br> <a href="${linkPrefix}history.html" style="font-size:10px; color:#2563eb;">📜 Мої розрахунки</a>`;
            if (avatar) avatar.src = user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName;
        } else {
            loginBtn.style.display = 'flex';
            userArea.style.display = 'none';
        }
    },

    // --- DATABASE METHODS ---

    saveCalculation: async function (data) {
        if (!this.user) {
            return alert("Спочатку увійдіть в систему або відкрийте автономний режим!");
        }

        const calcId = `calc_${Date.now()}`;
        const record = {
            ...data,
            savedAt: new Date().toISOString(),
            id: calcId
        };

        // Local Storage saving (always backup)
        try {
            const localHist = JSON.parse(localStorage.getItem('vpoint_saved_calcs') || '[]');
            localHist.unshift(record);
            if (localHist.length > 50) localHist.pop();
            localStorage.setItem('vpoint_saved_calcs', JSON.stringify(localHist));
        } catch (e) {
            console.warn("Could not save to LocalStorage:", e);
        }

        if (this.user.isAnonymous || !this.db) {
            alert("✅ Розрахунок успішно збережено локально!");
            return;
        }

        console.log("Saving to Firestore (Timeout 10s)...");
        try {
            if (!navigator.onLine) throw new Error("Відсутнє з'єднання з інтернетом!");

            const timeout = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Timeout")), 10000);
            });

            await Promise.race([
                this.db.collection("users").doc(this.user.uid).collection("calculations").doc(calcId).set(record),
                timeout
            ]);

            console.log("Firestore Write SUCCESS!");
            alert("✅ Розрахунок збережено в хмару!");
        } catch (e) {
            console.warn("Firestore save failed, fallback to local:", e);
            alert("✅ Розрахунок збережено локально (хмарне збереження недоступне).");
        }
    },

    getHistory: async function () {
        if (this.user && !this.user.isAnonymous && this.db) {
            try {
                const snap = await this.db.collection("users").doc(this.user.uid).collection("calculations").orderBy("savedAt", "desc").limit(30).get();
                const list = [];
                snap.forEach(doc => list.push(doc.data()));
                if (list.length > 0) return list;
            } catch (e) {
                console.warn("Fetch cloud history failed, reading local:", e);
            }
        }
        try {
            return JSON.parse(localStorage.getItem('vpoint_saved_calcs') || '[]');
        } catch (e) {
            return [];
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

    deleteCalculation: async function (id) {
        if (!this.user || !this.db) throw new Error("Спочатку увійдіть в систему!");
        try {
            await this.db.collection("users").doc(this.user.uid).collection("calculations").doc(id).delete();
            return true;
        } catch (e) {
            console.error("Delete Error:", e);
            throw e;
        }
    },

    deleteCalculations: async function (ids) {
        if (!this.user || !this.db) throw new Error("Спочатку увійдіть в систему!");
        if (!ids || ids.length === 0) return;

        const batch = this.db.batch();
        ids.forEach(id => {
            const ref = this.db.collection("users").doc(this.user.uid).collection("calculations").doc(id);
            batch.delete(ref);
        });

        try {
            await batch.commit();
            return true;
        } catch (e) {
            console.error("Batch Delete Error:", e);
            throw e;
        }
    },

};

// Auto-init
setTimeout(() => window.Auth.init(), 500);
