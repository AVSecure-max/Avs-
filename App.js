document.getElementById('waitlistForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevents the website from reloading
  
  const emailInput = document.getElementById('userEmail').value;
  const msgBox = document.getElementById('successMessage');

  try {
    // Saves email to your "waitlist" collection in Firestore
    await db.collection("waitlist").add({
      email: emailInput,
      joinedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Success styling
    msgBox.textContent = "You are on the list! Thank you.";
    msgBox.className = "hidden-msg success-msg";
    msgBox.style.display = "block";
    
    document.getElementById('waitlistForm').reset(); // Clears out the form field

  } catch (error) {
    console.error("Error saving email: ", error);
    // Error styling
    msgBox.textContent = "Something went wrong. Please try again.";
    msgBox.className = "hidden-msg error-msg";
    msgBox.style.display = "block";
  }
});
