# Web Application Design Overview

## Features

### Navigation Tabs on Top
- Navigation bar at the top for easy navigation between different sections.
- Includes links for Home, Courses, Leave a Review, About Us, Contact, and Login/Sign Up.
- Login/Sign Up link is positioned on the right, distinct from other centered navigation items.

### Highlight Current Tab
- Dynamically highlights the current tab based on the page the user is viewing.
- Utilizes JavaScript to add `class="active"` to the corresponding navigation link.

### Centered Content
- Content of each page is centered horizontally and vertically, creating a balanced user experience.
- Achieved through CSS flexbox properties applied to the body and main content areas.

### Mobile and Web Friendly
- Responsive design ensures accessibility and navigability on both mobile devices and desktop browsers.
- Navigation items stack vertically on smaller screens for better usability.

### Dark Theme with White Letters
- Features a dark theme with a black or dark background and white text for high contrast and readability.
- Navigation bar, forms, and buttons are styled to match this dark theme.

### Styling Details

#### Yellow Rating Boxes
- For the course rating page, rating boxes next to each review are styled in yellow for visual emphasis.

#### Styled Forms
- Input fields, text areas, and buttons in forms are styled to fit the overall design theme.
- Adjustments for focus and hover states enhance usability.

#### Consistent Font and Element Sizing
- Consistent font styles, sizes, and UI element dimensions across the web app.

### Accessibility Considerations
- High contrast colors and keyboard navigable links support accessibility.

### Predictive Search Functionality
- Implemented on the Home page, allowing users to see course name predictions as they type.
- Predictions are dynamically generated based on user input and can be selected for a more efficient search experience.

### Interactive Search Predictions
- Search predictions highlight on hover, providing visual feedback as the user navigates through the list.
- Implemented using CSS for hover effects and JavaScript for dynamic content generation.

## Implementation Details

### JavaScript
- Separate JavaScript files (`activeNav.js` for navigation highlighting, `predictiveSearch.js` for search functionality) enhance site interactivity without reloading.
- Scripts are linked at the bottom of each HTML file for proper load sequencing.

### CSS
- `styles.css` contains all styling rules, including new additions for predictive search hover effects and positioning adjustments for navigation items.

### HTML Structure
- Each page includes a standardized navigation bar and a main content area where specific features like predictive search are integrated.

### Images
- Potential images to use throughout the site, pick one and stick with it


