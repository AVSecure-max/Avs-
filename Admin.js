import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  // PUT YOUR EXISTING FIREBASE CONFIG HERE
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const table = document.getElementById("waitlistTable");
const totalUsers = document.getElementById("totalUsers");
const search = document.getElementById("search");

let users = [];

async function loadWaitlist() {

  const q = query(
    collection(db, "waitlist"),
    orderBy("joinedAt", "asc")
  );

  const snapshot = await getDocs(q);

  users = [];

  snapshot.forEach((doc) => {
    users.push({
      id: doc.id,
      ...doc.data()
    });
  });

  totalUsers.textContent = users.length;

  displayUsers(users);
}

function displayUsers(list) {

  table.innerHTML = "";

  list.forEach((user, index) => {

    const row = document.createElement("tr");

    const joined = user.joinedAt
      ? user.joinedAt.toDate().toLocaleDateString()
      : "—";

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name || "—"}</td>
      <td>${user.email || "—"}</td>
      <td>${user.type || "—"}</td>
      <td>${joined}</td>
    `;

    table.appendChild(row);
  });
}

search.addEventListener("input", () => {

  const term = search.value.toLowerCase();

  const filtered = users.filter(user =>
    (user.name || "").toLowerCase().includes(term) ||
    (user.email || "").toLowerCase().includes(term)
  );

  displayUsers(filtered);
});

loadWaitlist();
