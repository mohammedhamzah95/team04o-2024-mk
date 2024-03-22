function handleCredentialResponse(response) {
    console.log("Credential Response Received", response);

    // You'll need to send this response back to your server to validate the token and create a session.
    // For demonstration, we'll decode the JWT to extract the user's information
    // Note: It's not secure to rely on this information without validating the token on the server side.

    const data = parseJwt(response.credential);
    console.log(data);

    // Display confirmation message
    displayConfirmation(data.name);

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

// Helper function to parse JWT
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// This setup is for demonstration. In a real application, the token should be sent to your server for validation
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "576961548022-g20uu1iqf1frsf20kbpq2u09osfe66g0.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("signin-container"), // Ensure this ID matches the container where you want the sign-in button to appear
        { theme: "outline", size: "large" }  // Customization options
    );
    google.accounts.id.prompt(); // Display the One Tap sign-in prompt
};