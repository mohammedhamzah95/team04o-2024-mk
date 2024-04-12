
async function initializePage() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return window.location.href = 'login.html'
        }

        await verifyToken(token)
        const params = new URLSearchParams(window.location.search);
        const courseInput = document.getElementById('course input');
        const profInput = document.getElementById('professor-input');
        const loginButton=document.querySelector('.login-link')

        loginButton.style.display='none'
    

        const user = JSON.parse(localStorage.getItem('userInfo'));
        const topNav = document.querySelector('.topnav')
        topNav.children[1].textContent = user?.email
        topNav.children[1].href = ''
        const signOutButton = document.createElement('p');
        signOutButton.textContent = 'Sign Out';
        signOutButton.style.color = 'white'
        signOutButton.classList.add('active')
        signOutButton.style.cursor = 'pointer'
        signOutButton.addEventListener('click', () => {
            localStorage.clear()

            window.location.href = 'login.html';
        });

        topNav.appendChild(signOutButton);

        const id = params?.get('courseId')
        const instructor = params?.get('instructor')

        const data = await fetchCourseAndInstructors(id)
        courseInput.value=data?.course?.name
        courseInput.disabled=true
        courseInput.style.backgroundColor='white'

        data?.instructors.forEach(({ name }) => {
            const option = document.createElement('option');
            option.textContent = name;
            profInput.appendChild(option);
            option.value = name;
            if (instructor && name === instructor) {
             
                profInput.value = name;
            }
        });

        const form = document.querySelector('form');
        form.addEventListener('submit', submitReview);

    } catch (error) {
        console.error('Error initializing page:', error);
    }
}


async function submitReview(event) {
    event.preventDefault();

    try {
        const token = localStorage.getItem('token');
        const course = document.getElementById('course input').value;
        const instructor = document.getElementById('professor-input').value;
        const review = document.getElementById('rev input').value;
        const rating = clickedRating;

        if (!review) {
            return showToast("Review field must not be empty", "red");
        }
        const instructorId = await getInstructorId(token, instructor);
        const userId = getUserId();


        await createReview(token, instructorId, userId, rating, review);
        showToast("Review submitted successfully!", "success");
        setTimeout(()=>{
            window.history.go(-1)
        },1000)

    } catch (error) {
        console.error('Error submitting review:', error);
        showToast("Failed to submit review", "error");
    }
}

async function getInstructorId(token, instructor) {
    const response = await fetch(`http://localhost:4000/instructors/${instructor}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to get instructor ID');
    }

    const instructorData = await response.json();
    return instructorData.id;
}

function getUserId() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo?.id;
}

async function createReview(token, instructorId, userId, rating, comment) {

    const response = await fetch(`http://localhost:4000/instructors/${instructorId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            userId: userId,
            rating: rating,
            comment
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to create review');
    }
}

function showToast(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom",
        backgroundColor: type === "success" ? "green" : "red",
        className: "toastify-example",
    }).showToast();
}

let clickedRating = 0

function setRating(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.color = parseInt(star.dataset.id) <= rating ? 'gold' : '';
    });
 
}

const starsContainer = document.getElementById('ratingStars');
starsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('star')) {
        const rating = parseInt(event.target.dataset.id);
        clickedRating = rating;
        setRating(rating);
    }
});

starsContainer.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('star')) {
        const rating = parseInt(event.target.dataset.id);
        setRating(rating);
   
    }
});

starsContainer.addEventListener('mouseleave', () => {
    setRating(clickedRating);
});

initializePage();




async function verifyToken(token) {
    try {
        const req = await fetch('http://localhost:4000/auth/check-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        const res = await req.json()

        if (req.status === 403 && res.message === 'Unauthorized') {

            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');

            window.location.href = 'login.html';
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
}


async function fetchCourseAndInstructors(courseId) {
    try {

        const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch course and instructors');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching course and instructors:', error);
        return null;
    }
}