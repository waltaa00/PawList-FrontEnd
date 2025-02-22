# PawList Front-end
PawList is a modern, responsive web application built with React + Vite. It provides a sleek interface for managing dog data (fetched from The Dog API) and performing CRUD operations, along with secure user authentication. The project leverages Material UI for a polished design, SweetAlert2 for user-friendly alerts, and additional libraries for networking, image loading, and more. You can check the API's link here to see the data https://api.thedogapi.com/v1/breeds

### Overview
PawList is designed to provide an engaging and intuitive user experience for dog enthusiasts. Users can browse various dog breeds, view details, upload images, and manage entries—all within a modern dark-themed interface.

### Project Features

- Modern UI - Built with React and Material UI, featuring a dark minimal design.
- Routing - Managed with React Router, providing smooth navigation between pages.
- Alerts & Notifications - SweetAlert2 is integrated for user-friendly modal alerts.
- Image Handling - Supports image upload and proper rendering using Material UI components.
- Authentication - Secure login and registration with JWT (token handling is done via your backend).
- State Management - Utilizes React state and context for managing user sessions and app data.
- Debounced Search - Implements debounced search functionality for filtering dog breeds.

### Technologies Used
- React – UI library for building the user interface.
- Vite – Fast build tool and development server.
- Material UI – Component library for designing a modern, responsive UI.
- React Router – Routing library for navigation.
- SweetAlert2 – Library for elegant, customizable alerts.
- Axios (or Fetch) – For making API calls. 
- Lodash.debounce – For debounced search functionality.
- JWT – For managing authentication (backend integration).

### How to install it
1. Clone the Repository
2. Install dependencies (npm install)
3. Run the development server (npm run dev)

### Testing
For the testing process, Cypress was used to perform End-to-end (E2E) tests. It was also used to do single components tests.

### Integration of AI
The integration of AI (ChatGPT and Canva) was crucial for implementing project features and optimizing the development process. ChatGPT helped in a very significant way to make the developing process a lot faster than usual, to implement functionalities like data encryption and the use of JWT. Canva's on the other hand, helped with its AI features to create the Logo of PawList.

