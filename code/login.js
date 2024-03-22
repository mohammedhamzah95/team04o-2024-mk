function handleCredentialResponse(response) {
    console.log("Credential Response Received", response);
    const data = parseJwt(response.credential);
    console.log(data);
    displayConfirmation(data.name);
    hideSignInButton();
}

function displayConfirmation(userName) {
    const confirmationMessageHTML = `<p>Welcome, ${userName}! You have successfully signed in.</p>`;
    const confirmationContainer = document.createElement("div");
    confirmationContainer.style.position = "fixed";
    confirmationContainer.style.top = "0";
    confirmationContainer.style.right = "0";
    confirmationContainer.style.backgroundColor = "#f8f9fa";
    confirmationContainer.style.borderBottomLeftRadius = "5px";
    confirmationContainer.style.padding = "10px";
    confirmationContainer.innerHTML = confirmationMessageHTML;
    document.body.appendChild(confirmationContainer);
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
};

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "576961548022-g20uu1iqf1frsf20kbpq2u09osfe66g0.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        auto_select: false
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
};