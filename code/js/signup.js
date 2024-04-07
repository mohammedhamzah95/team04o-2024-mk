
function showToast(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom",
        backgroundColor: type === "success" ? "green" : "red",
        className: "toastify-example",
    }).showToast();
}


const signup = async (data) => {
    try {

        const requiredFields = ['name', 'email', 'password'];
        for (const field of requiredFields) {
            if (!data[field]) {
                throw new Error(`Missing ${field} field`);
            }
        }

        if(data.password.length<4){
            return showToast("Passwords length must be greater than 4 or equal to 4","red")
        }



        const response = await fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Sign up failed');
        }

        const responseData = await response.json();
    
        showToast("Operation successful!", "success");
        setTimeout(()=>{   window.location.href='login.html'},1000)

    } catch (error) {
        console.error('Sign up error:', error);
        showToast(error.message,'red')
    }
};


window.onload = function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            console.log(key,value)
            data[key] = value;
        });



        await signup(data);
        

    });
};