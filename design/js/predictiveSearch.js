document.addEventListener('DOMContentLoaded', function() {
    function predictiveSearch() {
        let input = document.getElementById('courseSearch');
        let filter = input.value.toUpperCase();
        let div = document.getElementById("predictionList");
        div.innerHTML = ''; // Clear previous predictions
        if (!filter) return; // Stop if input is empty

        // Example static list of course names
        const courses = ["Introduction to Programming", "Advanced Mathematics", "Physics for Engineers", "English Literature", "World History"];

        // Filter and display matching courses
        const filteredCourses = courses.filter(course => course.toUpperCase().includes(filter));
        filteredCourses.forEach(course => {
            let courseDiv = document.createElement('div');
            courseDiv.innerText = course;
            courseDiv.onclick = function() {
                input.value = course; // Fill input with selected course name
                div.innerHTML = ''; // Clear predictions
            };
            div.appendChild(courseDiv);
        });
    }

    // Attach the predictiveSearch function to the keyup event of the search input
    let searchInput = document.getElementById('courseSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', predictiveSearch);
    }
});