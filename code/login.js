function onSignIn(googleUser) {
    console.log('onSignIn function was called');
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  
    // Display confirmation message
    displayConfirmation(profile.getName());
  
    // Hide the Google Sign-In button
    hideSignInButton();
  }
  
  function displayConfirmation(userName) {
    const confirmationMessageHTML = `<p>Welcome, ${userName}! You have successfully signed in.</p>`;
    const confirmationContainer = document.createElement("div");
    confirmationContainer.innerHTML = confirmationMessageHTML;
    document.body.appendChild(confirmationContainer);
  }
  
  function hideSignInButton() {
    const signInButtonContainer = document.getElementById("signin-container");
    if (signInButtonContainer) {
      signInButtonContainer.style.display = 'none';
    }
  }
  
  window.onSignIn = onSignIn; // Expose onSignIn to the global scope