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
    } else {
        // No user info found, could implement logic to handle anonymous users
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
        userInfo.style.backgroundColor = '#333'; // Dark theme
        userInfo.style.color = 'white';
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
    // Hide login options like login buttons or links
    hideLoginOptions();
}

function hideLoginOptions() {
    const loginOptions = document.querySelectorAll('a[href="login.html"], a[href="signup.html"]');
    loginOptions.forEach(option => option.style.display = 'none');
}

function signOut() {
    sessionStorage.removeItem('userInfo');
    window.location.reload(); // or redirect to a specific page
}

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
        client_id: "576961548022-g20uu1iqf1frsf20kbpq2u09osfe66g0.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        auto_select: true,
        theme: 'dark' // Google One Tap in dark theme
    });
    google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('One Tap prompt is not displayed or was skipped.');
        }
    });
    updateUI(); // Update UI based on user session
};