function showToast(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom",
        backgroundColor: type === "success" ? "green" : "red",
        className: "toastify-example",
    }).showToast();
}



const signIn = async (email, password) => {
    try {
       

        if(!email || !password){
            return showToast("Email or password must be specified","red")
        }

     
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Sign-in failed');
        }

        const data = await response.json();
        showToast("Operation successful!", "success");
        setTimeout(()=>{ window.location.href='index.html'},1000)
       

        localStorage.setItem('userInfo', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
    } catch (error) {
        throw error;
    }
};


window.onload = function () {

    const token=JSON.parse(localStorage.getItem('userInfo'))
    console.log(token)

    if(token){
        window.location.href='index.html'
    }
    
    const signInForm = document.getElementById('login'); 
    const emailInput = document.getElementById('email'); 
    const passwordInput = document.getElementById('password');
 
    signInForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const email = emailInput.value;
        const password = passwordInput.value;

        try {

            await signIn(email, password);
    
        } catch (error) {
            showToast(error,'red')
            console.error('Sign-in error:', error);
        }
    });
};