function handleCredentialResponse(response) {
    console.log("Credential Response Received", response);
  
    // Decode the JWT to extract the user's information for demonstration
    const data = parseJwt(response.credential);
    console.log(data);
  
    // Display user info at the top right
    displayUserInfo(data);
  
    // Hide the Google Sign-In button
    hideSignInButton();
  }
  
  function displayUserInfo(data) {
    const userInfoContainer = document.createElement('div');
    userInfoContainer.id = 'user-info-container';
    userInfoContainer.style.position = 'absolute';
    userInfoContainer.style.top = '0';
    userInfoContainer.style.right = '0';
    userInfoContainer.style.padding = '10px';
    userInfoContainer.style.backgroundColor = '#f9f9f9';
    userInfoContainer.style.borderBottomLeftRadius = '5px';
  
    const userImage = document.createElement('img');
    userImage.src = data.picture;
    userImage.style.borderRadius = '50%';
    userImage.style.width = '30px';
    userImage.style.height = '30px';
    userImage.style.marginRight = '10px';
  
    const userName = document.createElement('span');
    userName.textContent = data.name;
  
    const signOutButton = document.createElement('button');
    signOutButton.textContent = 'Sign Out';
    signOutButton.onclick = signOut;
  
    userInfoContainer.appendChild(userImage);
    userInfoContainer.appendChild(userName);
    userInfoContainer.appendChild(signOutButton);
    document.body.appendChild(userInfoContainer);
  }
  
  function hideSignInButton() {
    const signInButtonContainer = document.getElementById("signin-container");
    if (signInButtonContainer) {
      signInButtonContainer.style.display = 'none';
    }
  }
  
  function signOut() {
    google.accounts.id.disableAutoSelect();
  
    const userInfoContainer = document.getElementById('user-info-container');
    if (userInfoContainer) {
      userInfoContainer.remove();
    }
  
    const signInButtonContainer = document.getElementById("signin-container");
    if (signInButtonContainer) {
      signInButtonContainer.style.display = 'block';
    }
  
    console.log('User signed out.');
  }
  
  // Helper function to parse JWT
  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }
  
  window.onload = function() {
    google.accounts.id.initialize({
      client_id: "889712336778-tlvu6ihuaa2e5209q1fcdfetu5635c6h.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signin-container"), // Ensure this ID matches the container where you want the sign-in button to appear
      { theme: "outline", size: "large" }  // Customization options
    );
    google.accounts.id.prompt(); // Display the One Tap sign-in prompt if the user is not signed in
  };