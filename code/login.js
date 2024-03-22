function handleCredentialResponse(response) {
    console.log("Credential Response Received", response);
    const data = parseJwt(response.credential);
    console.log(data);
    displayConfirmation(data.name);
    hideSignInButton();
}

function displayConfirmation(userName) {
    alert(`Welcome, ${userName}! You have successfully signed in.`);
}

function hideSignInButton() {
    const signInButtonContainer = document.getElementById("g_id_onload");
    if (signInButtonContainer) {
        signInButtonContainer.style.display = 'none';
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "576961548022-g20uu1iqf1frsf20kbpq2u09osfe66g0.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("signin-container"), // Adjust if necessary
        { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt(); // Display the One Tap sign-in prompt if applicable
};