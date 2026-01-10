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
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.provider = new firebase.auth.GoogleAuthProvider();

        // Listen for auth state
        this.auth.onAuthStateChanged((user) => {
            console.log("Auth State Changed:", user ? user.email : "Logged out");
            this.user = user;
            this.updateUI(user);
        });
    },

    login: async function () {
        if (!this.auth) return alert("Система ще завантажується...");
        try {
            await this.auth.signInWithPopup(this.provider);
        } catch (error) {
            console.error("Login Error:", error);
            alert("Помилка входу: " + error.message);
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
            if (userName) userName.textContent = user.displayName;
            if (avatar) avatar.src = user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName;
        } else {
            loginBtn.style.display = 'flex';
            userArea.style.display = 'none';
        }
    },

    // --- DATABASE METHODS ---

    saveCalculation: async function (data) {
        if (!this.user || !this.db) return alert("Спочатку увійдіть в систему!");

        const calcId = `calc_${Date.now()}`;
        // Compat SDK uses chaining
        try {
            await this.db.collection("users").doc(this.user.uid).collection("calculations").doc(calcId).set({
                ...data,
                savedAt: new Date().toISOString(),
                id: calcId
            });
            alert("✅ Розрахунок збережено в хмару!");
        } catch (e) {
            console.error(e);
            alert("Помилка збереження: " + e.message);
        }
    },

    getHistory: async function () {
        if (!this.user || !this.db) return [];
        try {
            const snap = await this.db.collection("users").doc(this.user.uid).collection("calculations").get();
            const list = [];
            snap.forEach(doc => list.push(doc.data()));
            return list.sort((a, b) => b.savedAt.localeCompare(a.savedAt)); // Newest first
        } catch (e) {
            console.error(e);
            return [];
        }
    }
};

// Auto-init
setTimeout(() => window.Auth.init(), 500);
