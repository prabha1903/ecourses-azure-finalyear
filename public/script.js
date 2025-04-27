// Configuration
const API_ENDPOINT = '/api/courses';

// DOM Elements
const coursesContainer = document.getElementById('courses-container');

// Course Template
const createCourseCard = (course) => {
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${course.image || 'https://via.placeholder.com/400x225'}" class="card-img-top" alt="${course.title}">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge bg-primary">${course.category || 'Development'}</span>
                        <small class="text-muted">${course.duration || '4 weeks'}</small>
                    </div>
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text text-muted flex-grow-1">${course.description || 'Professional course with hands-on labs'}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="price fw-bold text-primary">$${course.price || '49.99'}</span>
                        <button class="btn btn-sm btn-outline-primary">Enroll</button>
                    </div>
                </div>
                <div class="card-footer bg-transparent border-top-0">
                    <div class="d-flex justify-content-between">
                        <small class="text-muted"><i class="bi bi-person-fill"></i> ${course.instructor || 'Azure Certified'}</small>
                        <small class="text-muted"><i class="bi bi-star-fill text-warning"></i> ${course.rating || '4.8'}</small>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Fetch Courses from API
const loadCourses = async () => {
    try {
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const courses = await response.json();
        
        // Clear loading skeletons
        coursesContainer.innerHTML = '';
        
        // Render courses
        courses.forEach(course => {
            coursesContainer.insertAdjacentHTML('beforeend', createCourseCard(course));
        });
        
    } catch (error) {
        console.error('Failed to load courses:', error);
        coursesContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Failed to load courses. Please try again later.
                </div>
            </div>
        `;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    
    // Dark mode toggle
    const themeToggle = document.createElement('button');
    themeToggle.className = 'btn btn-sm btn-outline-secondary position-fixed bottom-0 end-0 m-3';
    themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    themeToggle.onclick = () => {
        document.documentElement.setAttribute('data-bs-theme', 
            document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'
        );
        themeToggle.innerHTML = document.documentElement.getAttribute('data-bs-theme') === 'dark' 
            ? '<i class="bi bi-sun-fill"></i>' 
            : '<i class="bi bi-moon-fill"></i>';
    };
    document.body.appendChild(themeToggle);
});