function handleCredentialResponse(response) {
    console.log("Credential Response Received", response);
    const data = parseJwt(response.credential);
    console.log(data);
    // Store user information in sessionStorage for persistence across pages
    sessionStorage.setItem('userInfo', JSON.stringify(data));
    updateUI();
}

function updateUI() {
    const userInfoData = sessionStorage.getItem('userInfo');
    if (userInfoData) {
        const data = JSON.parse(userInfoData);
        displayUser(data);
        hideLoginOption();
    } else {
        // Show the login option if the user is not logged in
        const loginOption = document.querySelector('a[href="login.html"]');
        if (loginOption) {
            loginOption.style.display = 'block';
        }
    }
}

function displayUser(data) {
    let userInfo = document.getElementById('user-info');
    if (!userInfo) {
        userInfo = document.createElement('div');
        userInfo.id = 'user-info';
        userInfo.style.position = 'fixed';
        userInfo.style.top = '0';
        userInfo.style.right = '0';
        userInfo.style.padding = '10px';
        userInfo.style.backgroundColor = '#333'; // Dark background
        userInfo.style.color = 'white'; // White text color
        userInfo.style.borderBottomLeftRadius = '5px';
        userInfo.style.zIndex = '1000';
        document.body.appendChild(userInfo);
    }
    userInfo.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${data.picture}" alt="User profile image" style="border-radius: 50%; width: 30px; height: 30px;">
            <span>${data.name}</span>
            <button onclick="signOut()" style="cursor: pointer; background-color: #555; color: white; border: none; padding: 5px 10px; border-radius: 5px;">Sign Out</button>
        </div>`;
}

function hideLoginOption() {
    const loginLink = document.querySelectorAll('a[href="login.html"]');
    loginLink.forEach(link => link.style.display = 'none');
}

function signOut() {
    sessionStorage.removeItem('userInfo');
    // Redirect to index.html or another specific page after signing out
    window.location.href = 'index.html';
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
    updateUI();
    if (!sessionStorage.getItem('userInfo')) {
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"), // Adjust if necessary
            { theme: "dark", size: "large" }
        );
        google.accounts.id.prompt();
    }
};