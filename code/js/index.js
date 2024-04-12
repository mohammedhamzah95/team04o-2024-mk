document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token');

        const user = JSON.parse(localStorage.getItem('userInfo'));
        const topNavLink = document.querySelector('.topnav a u');
        const topNav = document.querySelector('.topnav');
        topNavLink.textContent = user.email;
        topNavLink.parentElement.href = 'index.html';

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


        const response = await fetch('http://localhost:4000/courses', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }

        const { courses } = await response.json();
        console.log(courses);

        const select = document.getElementById('course-input');

        courses.forEach(({ code }) => {
            const option = document.createElement('option');
            option.textContent = code
            option.value = code;
            select.appendChild(option);
        });


        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const selectedCourse = select.value;
            const selectedCourseId = courses.find(course => course.code === selectedCourse)?.id;
            console.log(selectedCourseId);
            if (selectedCourseId) {
                window.location.href = `course.html?courseId=${selectedCourseId}`;
            }
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
});


