
function showToast(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom",
        backgroundColor: type === "success" ? "green" : "red",
        className: "toastify-example",
    }).showToast();
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

async function fetchInstructorReviews(instructorId) {
    try {

        const response = await fetch(`http://localhost:4000/instructors/${instructorId}/reviews`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch instructors reviews');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching course and instructors:', error);
        return null;
    }
}



const verifyToken = async (token) => {
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
            localStorage.clear()
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
}


window.onload = async function () {
    let selectedInstructor = null;
    const token = localStorage.getItem('token')
    if (!token) window.location.href = 'login.html'

    await verifyToken(token)

    const user = JSON.parse(localStorage.getItem('userInfo'));
    const topNav = document.querySelector('.topnav')
    const loginButton=document.querySelector('.login-link')
    loginButton.style.display='none'

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


    try {
        const courseDetails = document.querySelector('.courseDetails')
        const instructorDetails = document.querySelector('.instructorsDetails')
        instructorDetails.style.display = 'flex'
        instructorDetails.style.flexDirection = 'column'
        instructorDetails.style.alignItems = 'center';
        instructorDetails.style.justifyContent = 'center';
        instructorDetails.style.marginBottom = '16px';


        const dialog = document.querySelector('dialog')


        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('courseId');
        const data = await fetchCourseAndInstructors(courseId)
        courseDetails.children[0].textContent = data?.course?.name
        courseDetails.children[1].textContent = data?.course?.code

        data?.instructors?.forEach(instructor => {
            const paragraph = document.createElement('p');
            const div = document.createElement('div');
            div.style.display = 'flex'

            div.style.alignItems = 'center'
            paragraph.classList.add('instructorsDetailsPara');
            paragraph.textContent = instructor.name;

            div.appendChild(paragraph);
            const selectButton = document.createElement('button');
            selectButton.style.cursor = 'pointer'
            selectButton.classList.add('selectButton')

            div.appendChild(selectButton);

            instructorDetails.appendChild(div);

            paragraph.addEventListener('click', () => {
                if (paragraph.style.backgroundColor === 'red' && paragraph.style.color === 'white') {
                    paragraph.style.backgroundColor = '';
                    paragraph.style.color = '';
                    selectedInstructor = null;
                } else {
                    selectedInstructor = instructor;
                    document.querySelectorAll('.instructorsDetailsPara').forEach(button => {
                        button.style.border = 'none';
                        button.style.backgroundColor = 'white';
                        button.style.color = 'black';
                    });

                    paragraph.style.backgroundColor = 'red';
                    paragraph.style.color = 'white';
                }
            });

            selectButton.addEventListener('click', async () => {

                const reviews = await fetchInstructorReviews(instructor.id);

                if (reviews.length === 0) {
                    const reviewContentParagraph = document.createElement('p');
                    reviewContentParagraph.textContent = 'No reviews available'
                    dialog.appendChild(reviewContentParagraph)
                }

                else {
                    reviews.forEach(review => {
                        const reviewContainer = document.createElement('div');
                        reviewContainer.classList.add('reviewContainer');


                        const reviewContentheader = document.createElement('h3');
                        reviewContentheader.textContent = review?.User?.name;
                        reviewContainer.appendChild(reviewContentheader);

                        const reviewContentParagraph = document.createElement('p');
                        reviewContentParagraph.textContent = review.content;
                        reviewContentParagraph.classList.add('reviewContent');

                        reviewContainer.appendChild(reviewContentParagraph);

                        const ratingContainer = document.createElement('div');
                        ratingContainer.classList.add('ratingContainer');

                        const ratingText = document.createElement('span');
                        ratingText.textContent = `Rating: ${review.rating}`;
                        ratingText.classList.add('ratingText');

                        const starIcon = document.createElement('span');
                        starIcon.classList.add('star-icon');

                        const filledStars = Math.floor(review.rating);
                        const emptyStars = 5 - filledStars;

                        for (let i = 0; i < filledStars; i++) {
                            const star = document.createElement('span');
                            star.classList.add('filled');
                            star.innerHTML = '&#9733;';
                            starIcon.appendChild(star);
                        }

                        for (let i = 0; i < emptyStars; i++) {
                            const star = document.createElement('span');
                            star.innerHTML = '&#9734;';
                            starIcon.appendChild(star);
                        }

                        ratingContainer.appendChild(ratingText);
                        ratingContainer.appendChild(starIcon);
                        reviewContainer.appendChild(ratingContainer);

                        dialog.appendChild(reviewContainer);
                    });
                }


                const closeButton = document.createElement('button');
                closeButton.textContent = 'Close';
                closeButton.classList.add('dialogCloseButton');
                dialog.appendChild(closeButton);

                closeButton.addEventListener('click', () => {
                    dialog.close();

                    dialog.innerHTML = '';
                });

                dialog.showModal();
            });
        });

        const leaveReviewButton = document.querySelector('.button');

        leaveReviewButton.addEventListener('click', () => {
            let reviewPageURL=null;
            if (selectedInstructor!==null) {
                reviewPageURL = `review.html?courseId=${data?.course?.id}&instructor=${selectedInstructor?.name}`;
            } else {
                reviewPageURL = `review.html?courseId=${data?.course?.id}`;
            }

            window.location.href = reviewPageURL;
        });

        window.addEventListener('click', function dialogClickHandler(e) {
            if (e.target.tagName !== 'DIALOG')
                return;

            const rect = e.target.getBoundingClientRect();

            const clickedInDialog = (
                rect.top <= e.clientY &&
                e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX &&
                e.clientX <= rect.left + rect.width
            );

            if (clickedInDialog === false)
                dialog.innerHTML = ''
            e.target.close();

        });

    } catch (err) {
        console.log(err)
    }
}
