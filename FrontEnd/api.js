/* ==========================================
   BACKEND API CONFIGURATION
========================================== */

// Local development
const API_BASE_URL = "https://smart-budget-allocation-system.onrender.com/api";

// Production (Render)
// const API_BASE_URL = "https://your-backend-name.onrender.com/api";

/* ==========================================
   API REQUEST HELPER
========================================== */

async function apiRequest(endpoint, method = "GET", body = null) {

    const token = localStorage.getItem("token");

    const options = {

        method,

        headers: {

            "Content-Type": "application/json"

        }

    };

    if (token) {

        options.headers.Authorization = `Bearer ${token}`;

    }

    if (body) {

        options.body = JSON.stringify(body);

    }

    const response = await fetch(

        `${API_BASE_URL}${endpoint}`,

        options

    );

    return await response.json();

}

/* ==========================================
   AUTH API
========================================== */

async function registerUser(userData) {

    return await apiRequest(

        "/auth/register",

        "POST",

        userData

    );

}

async function loginUser(userData) {

    return await apiRequest(

        "/auth/login",

        "POST",

        userData

    );

}

/* ==========================================
   PROJECT API
========================================== */

async function saveProject(projectData) {

    return await apiRequest(

        "/projects",

        "POST",

        projectData

    );

}

async function getProjects(userId) {

    return await apiRequest(

        `/projects?user=${userId}`

    );

}

async function getProject(projectId) {

    return await apiRequest(

        `/projects/${projectId}`

    );

}

async function updateProject(projectId, projectData) {

    return await apiRequest(

        `/projects/${projectId}`,

        "PUT",

        projectData

    );

}

async function deleteProject(projectId) {

    return await apiRequest(

        `/projects/${projectId}`,

        "DELETE"

    );

}
/* ==========================================
   EXPORTS
========================================== */

export {

    API_BASE_URL,

    apiRequest,

    registerUser,

    loginUser,

    saveProject,

    getProjects,

    getProject,

    updateProject,

    deleteProject

};