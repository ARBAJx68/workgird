let currentUserRole = null;
let postedJobs = [];
let workerHistory = [];
let hireHistory = [];
let userProfilePic = null;
let cameraStream = null;

const sampleWorkerHistory = [
    {
        jobTitle: "Residential Building Construction",
        employer: "ABC Construction",
        location: "City Chowk",
        wage: 700,
        daysWorked: 5,
        totalEarned: 3500,
        rating: 5,
        date: "2024-02-20"
    },
    {
        jobTitle: "Office Renovation",
        employer: "XYZ Corp",
        location: "Main Market",
        wage: 700,
        daysWorked: 3,
        totalEarned: 2100,
        rating: 4.5,
        date: "2024-02-15"
    }
];

const sampleHireHistory = [
    {
        jobTitle: "Foundation Work",
        workerName: "Rohit Yaduvanshi",
        workerJob: "Mason",
        totalAmount: 3500,
        daysNeeded: 5,
        date: "2024-02-18",
        status: "Completed"
    },
    {
        jobTitle: "Wall Painting",
        workerName: "Arbaj Khan",
        workerJob: "Painter",
        totalAmount: 1950,
        daysNeeded: 3,
        date: "2024-02-10",
        status: "Completed"
    }
];

const workers = [
    {
        id: 1,
        name: "Dilkhush shah",
        job: "Mason",
        wage: 700,
        location: "City Chowk",
        phone: "+91 8434759900",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
        id: 2,
        name: "Arbaj Khan",
        job: "Carpenter",
        wage: 850,
        location: "Main Market",
        phone: "+91 9571112629",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
    },
    {
        id: 3,
        name: "Rohit Yaduvanshi",
        job: "Painter",
        wage: 650,
        location: "Bus Stand",
        phone: "+91 9065237845",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
        id: 4,
        name: "swapan priya",
        job: "Electrician",
        wage: 900,
        location: "Sector Road",
        phone: "+91 98765 43213",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
        id: 5,
        name: "Deepak Singh",
        job: "Plumber",
        wage: 750,
        location: "ricoo area",
        phone: "+91 98765 43214",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
    },
    {
        id: 6,
        name: "Manoj Kumar",
        job: "Helper",
        wage: 500,
        location: "Old Market",
        phone: "+91 98765 43215",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"
    }
];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

document.getElementById('sendOtpBtn').addEventListener('click', () => {
    const mobileInput = document.getElementById('mobileInput');
    if (mobileInput.value.length === 10) {
        showPage('roleSelectPage');
        document.getElementById('mobileInput').value = '';
    } else {
        alert('Please enter a valid 10-digit mobile number');
    }
});

document.getElementById('workerRoleBtn').addEventListener('click', () => {
    currentUserRole = 'worker';
    showPage('otpPage');
    document.querySelectorAll('.otp-box')[0].focus();
});

document.getElementById('recruiterRoleBtn').addEventListener('click', () => {
    currentUserRole = 'recruiter';
    showPage('otpPage');
    document.querySelectorAll('.otp-box')[0].focus();
});

document.getElementById('backFromRoleBtn').addEventListener('click', () => {
    showPage('loginPage');
    currentUserRole = null;
});

document.getElementById('backToLoginBtn').addEventListener('click', () => {
    showPage('loginPage');
    document.getElementById('otpError').textContent = '';
    document.querySelectorAll('.otp-box').forEach(box => box.value = '');
});

const otpBoxes = document.querySelectorAll('.otp-box');
otpBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < otpBoxes.length - 1) {
            otpBoxes[index + 1].focus();
        }
    });

    box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            otpBoxes[index - 1].focus();
        }
    });
});

document.getElementById('verifyOtpBtn').addEventListener('click', () => {
    const otp = Array.from(otpBoxes).map(box => box.value).join('');
    const errorElement = document.getElementById('otpError');

    if (otp === '123456') {
        errorElement.textContent = '';
        document.querySelectorAll('.otp-box').forEach(box => box.value = '');

        if (currentUserRole === 'worker') {
            workerHistory = sampleWorkerHistory;
            showPage('profileSetupPage');
        } else if (currentUserRole === 'recruiter') {
            hireHistory = sampleHireHistory;
            showPage('profileSetupPage');
        }
    } else {
        errorElement.textContent = 'Invalid OTP';
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    showPage('loginPage');
    document.getElementById('mobileInput').value = '';
    currentUserRole = null;
});

document.getElementById('workerLogoutBtn').addEventListener('click', () => {
    showPage('loginPage');
    document.getElementById('mobileInput').value = '';
    currentUserRole = null;
});

document.getElementById('recruiterStatsLogoutBtn').addEventListener('click', () => {
    showPage('loginPage');
    document.getElementById('mobileInput').value = '';
    currentUserRole = null;
});

document.getElementById('backToDashboardBtn').addEventListener('click', () => {
    showPage('dashboardPage');
});

document.getElementById('galleryBtn').addEventListener('click', () => {
    const input = document.getElementById('profileFileInput');
    input.click();
});

document.getElementById('uploadBtn').addEventListener('click', () => {
    const input = document.getElementById('profileFileInput');
    input.click();
});

document.getElementById('profileFileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            userProfilePic = event.target.result;
            displayProfilePic(userProfilePic);
            document.getElementById('continueAfterProfileBtn').disabled = false;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('cameraBtn').addEventListener('click', () => {
    openCamera();
});

function displayProfilePic(imageSrc) {
    const preview = document.getElementById('profilePicPreview');
    const placeholder = document.getElementById('profilePicPlaceholder');
    const image = document.getElementById('profilePicImage');

    placeholder.style.display = 'none';
    image.src = imageSrc;
    image.style.display = 'block';
}

async function openCamera() {
    const modal = document.getElementById('cameraModal');
    modal.style.display = 'flex';

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: { ideal: 400 },
                height: { ideal: 400 }
            }
        });

        const video = document.getElementById('cameraVideo');
        video.srcObject = cameraStream;
    } catch (error) {
        alert('Cannot access camera: ' + error.message);
        modal.style.display = 'none';
    }
}

document.getElementById('captureCameraBtn').addEventListener('click', () => {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    userProfilePic = canvas.toDataURL('image/png');
    displayProfilePic(userProfilePic);
    document.getElementById('continueAfterProfileBtn').disabled = false;

    stopCamera();
    document.getElementById('cameraModal').style.display = 'none';
});

document.getElementById('closeCameraBtn').addEventListener('click', () => {
    stopCamera();
    document.getElementById('cameraModal').style.display = 'none';
});

document.getElementById('cancelCameraBtn').addEventListener('click', () => {
    stopCamera();
    document.getElementById('cameraModal').style.display = 'none';
});

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
}

document.getElementById('continueAfterProfileBtn').addEventListener('click', () => {
    if (currentUserRole === 'worker') {
        showPage('workerDashboardPage');
        loadWorkerDashboard();
    } else if (currentUserRole === 'recruiter') {
        showPage('recruiterStatsPage');
        loadRecruiterStats();
    }
});

function loadWorkers() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const workerGrid = document.getElementById('workerGrid');

    loadingSpinner.style.display = 'block';
    workerGrid.style.display = 'none';

    setTimeout(() => {
        loadingSpinner.style.display = 'none';
        workerGrid.style.display = 'grid';
        renderWorkers();
    }, 1000);
}

function renderWorkers() {
    const workerGrid = document.getElementById('workerGrid');
    workerGrid.innerHTML = '';

    workers.forEach(worker => {
        const card = document.createElement('div');
        card.className = 'worker-card';
        card.innerHTML = `
            <img src="${worker.image}" alt="${worker.name}" class="worker-image">
            <h3>${worker.name}</h3>
            <div class="worker-job">${worker.job}</div>
            <div class="worker-location">📍 ${worker.location}</div>
            <div class="worker-wage">₹${worker.wage}/day</div>
            <div class="worker-rating">⭐⭐⭐⭐⭐</div>
            <button class="hire-btn" onclick="showBookingModal()">HIRE</button>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('hire-btn')) {
                showWorkerProfile(worker.id);
            }
        });

        workerGrid.appendChild(card);
    });
}

function showWorkerProfile(workerId) {
    const worker = workers.find(w => w.id === workerId);
    const profileContent = document.getElementById('profileContent');

    profileContent.innerHTML = `
        <img src="${worker.image}" alt="${worker.name}" class="profile-image">
        <div class="profile-details">
            <h2>${worker.name}</h2>
            <div class="profile-job">${worker.job}</div>
            <div class="profile-location">📍 ${worker.location}</div>
            <div class="worker-rating">⭐⭐⭐⭐⭐</div>
            <div class="profile-wage">₹${worker.wage}/day</div>
            <div class="profile-phone">📱 ${worker.phone}</div>
        </div>
        <div class="profile-actions">
            <button class="call-btn" onclick="callWorker('${worker.phone}')">CALL</button>
            <button class="profile-hire-btn" onclick="showBookingModal()">HIRE</button>
        </div>
    `;

    showPage('profilePage');
}

function callWorker(phone) {
    window.location.href = `tel:${phone}`;
}

function showBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
}

document.getElementById('closeModalBtn').addEventListener('click', () => {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
});

document.getElementById('bookingModal').addEventListener('click', (e) => {
    if (e.target.id === 'bookingModal') {
        e.target.classList.remove('active');
    }
});

function loadJobs() {
    renderJobs();
}

function renderJobs() {
    const jobsList = document.getElementById('jobsList');
    jobsList.innerHTML = '';

    if (postedJobs.length === 0) {
        jobsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>No Jobs Posted Yet</h3>
                <p>Create your first job posting to start finding workers</p>
                <button class="btn-primary" id="createFirstJobBtn">Create Job</button>
            </div>
        `;
        document.getElementById('createFirstJobBtn').addEventListener('click', () => {
            showPage('createJobPage');
        });
    } else {
        postedJobs.forEach((job, index) => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            jobCard.innerHTML = `
                <div class="job-header">
                    <div>
                        <h3 class="job-title">${job.title}</h3>
                        <span class="job-category">${job.category}</span>
                    </div>
                </div>
                <p class="job-description">${job.description}</p>
                <div class="job-details">
                    <div class="job-detail-item">
                        <div class="job-detail-label">Daily Wage</div>
                        <div class="job-detail-value wage">₹${job.wage}/day</div>
                    </div>
                    <div class="job-detail-item">
                        <div class="job-detail-label">Location</div>
                        <div class="job-detail-value">${job.location}</div>
                    </div>
                    <div class="job-detail-item">
                        <div class="job-detail-label">Workers Needed</div>
                        <div class="job-detail-value">${job.workers}</div>
                    </div>
                    <div class="job-detail-item">
                        <div class="job-detail-label">Posted</div>
                        <div class="job-detail-value">${new Date().toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="job-actions">
                    <button class="edit-job-btn" onclick="editJob(${index})">Edit</button>
                    <button class="delete-job-btn" onclick="deleteJob(${index})">Delete</button>
                </div>
            `;
            jobsList.appendChild(jobCard);
        });
    }
}

function deleteJob(index) {
    if (confirm('Are you sure you want to delete this job?')) {
        postedJobs.splice(index, 1);
        renderJobs();
    }
}

function editJob(index) {
    const job = postedJobs[index];
    document.getElementById('jobTitle').value = job.title;
    document.getElementById('jobDescription').value = job.description;
    document.getElementById('jobWage').value = job.wage;
    document.getElementById('jobLocation').value = job.location;
    document.getElementById('jobWorkers').value = job.workers;
    document.getElementById('jobCategory').value = job.category;

    const form = document.getElementById('jobForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        postedJobs[index] = {
            title: document.getElementById('jobTitle').value,
            description: document.getElementById('jobDescription').value,
            wage: parseInt(document.getElementById('jobWage').value),
            location: document.getElementById('jobLocation').value,
            workers: parseInt(document.getElementById('jobWorkers').value),
            category: document.getElementById('jobCategory').value
        };
        form.onsubmit = null;
        showPage('recruiterDashboardPage');
        renderJobs();
    };

    showPage('createJobPage');
}

document.getElementById('createJobBtn').addEventListener('click', () => {
    document.getElementById('jobForm').reset();
    document.getElementById('jobForm').onsubmit = null;
    showPage('createJobPage');
});

document.getElementById('backToRecruiterBtn').addEventListener('click', () => {
    showPage('recruiterDashboardPage');
});

document.getElementById('jobForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const newJob = {
        title: document.getElementById('jobTitle').value,
        description: document.getElementById('jobDescription').value,
        wage: parseInt(document.getElementById('jobWage').value),
        location: document.getElementById('jobLocation').value,
        workers: parseInt(document.getElementById('jobWorkers').value),
        category: document.getElementById('jobCategory').value
    };

    postedJobs.push(newJob);
    document.getElementById('jobForm').reset();
    showPage('recruiterStatsPage');
    loadRecruiterStats();
});

function loadWorkerDashboard() {
    let totalEarned = 0;
    let totalDays = 0;
    let ratingSum = 0;

    workerHistory.forEach(item => {
        totalEarned += item.totalEarned;
        totalDays += item.daysWorked;
        ratingSum += item.rating;
    });

    document.getElementById('jobsCompleted').textContent = workerHistory.length;
    document.getElementById('totalEarned').textContent = `₹${totalEarned}`;
    document.getElementById('avgRating').textContent = (ratingSum / workerHistory.length || 5).toFixed(1);
    document.getElementById('daysWorked').textContent = totalDays;

    renderWorkerHistory();
}

function renderWorkerHistory() {
    const historyDiv = document.getElementById('workerHistory');
    historyDiv.innerHTML = '';

    if (workerHistory.length === 0) {
        historyDiv.innerHTML = '<div class="empty-history">No work history yet. Start browsing jobs!</div>';
    } else {
        workerHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-header">
                    <div class="history-title">${item.jobTitle}</div>
                    <div class="history-date">${new Date(item.date).toLocaleDateString()}</div>
                </div>
                <div class="history-details">
                    <div class="history-detail">
                        <div class="history-detail-label">Employer</div>
                        <div class="history-detail-value">${item.employer}</div>
                    </div>
                    <div class="history-detail">
                        <div class="history-detail-label">Location</div>
                        <div class="history-detail-value">${item.location}</div>
                    </div>
                    <div class="history-detail">
                        <div class="history-detail-label">Days Worked</div>
                        <div class="history-detail-value">${item.daysWorked}</div>
                    </div>
                    <div class="history-detail">
                        <div class="history-detail-label">Earned</div>
                        <div class="history-detail-value">₹${item.totalEarned}</div>
                    </div>
                    <div class="history-detail">
                        <div class="history-detail-label">Rating</div>
                        <div class="history-detail-value">⭐ ${item.rating}</div>
                    </div>
                </div>
            `;
            historyDiv.appendChild(historyItem);
        });
    }
}

document.getElementById('browseJobsBtn').addEventListener('click', () => {
    showPage('dashboardPage');
    loadWorkers();
});

function loadRecruiterStats() {
    const totalSpent = hireHistory.reduce((sum, h) => sum + h.totalAmount, 0);

    document.getElementById('activeJobs').textContent = postedJobs.length;
    document.getElementById('completedHires').textContent = hireHistory.length;
    document.getElementById('workersHired').textContent = hireHistory.length;
    document.getElementById('totalSpent').textContent = `₹${totalSpent}`;

    renderRecruiterHistory();
    setupRecruiterTabs();
}

function renderRecruiterHistory() {
    const historyDiv = document.getElementById('recruiterHistory');
    historyDiv.innerHTML = '';

    if (hireHistory.length === 0) {
        historyDiv.innerHTML = '<div class="empty-history">No hiring history yet. Post jobs to get started!</div>';
    } else {
        hireHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-header">
                    <div class="history-title">${item.jobTitle}</div>
                    <div class="history-date">${new Date(item.date).toLocaleDateString()}</div>
                </div>
                <div class="history-details">
                    <div class="history-detail">
                        <div class="history-detail-label">Worker</div>
                        <div class="history-detail-value">${item.workerName}</div>
                    </div>
                    <div class="history-detail">
                        <div class="history-detail-label">Job Type</div>
                        <div class="history-detail-value">${item.workerJob}</div>
                    </div>
                    <div class="history-detail">
                        <div class="history-detail-label">Days</div>
                        <div class="history-detail-value">${item.daysNeeded}</div>
                    </div>
                    <div class="history-detail">
                        <div class="history-detail-label">Amount Paid</div>
                        <div class="history-detail-value">₹${item.totalAmount}</div>
                    </div>
                    <div class="history-detail">
                        <div class="history-detail-label">Status</div>
                        <div class="history-detail-value">${item.status}</div>
                    </div>
                </div>
            `;
            historyDiv.appendChild(historyItem);
        });
    }
}

function setupRecruiterTabs() {
    const statsTab = document.getElementById('statsTabBtn');
    const workersTab = document.getElementById('workersTabBtn');
    const statsContent = document.getElementById('statsTab');
    const workersContent = document.getElementById('workersTab');

    statsTab.addEventListener('click', () => {
        statsTab.classList.add('active');
        workersTab.classList.remove('active');
        statsContent.classList.add('active');
        workersContent.classList.remove('active');
    });

    workersTab.addEventListener('click', () => {
        workersTab.classList.add('active');
        statsTab.classList.remove('active');
        workersContent.classList.add('active');
        statsContent.classList.remove('active');
        renderRecruiterWorkers();
    });
}

function renderRecruiterWorkers() {
    const workersContent = document.getElementById('workersTab');
    workersContent.innerHTML = '<div class="worker-grid" id="recruiterWorkerGrid"></div>';

    const workerGrid = document.getElementById('recruiterWorkerGrid');
    workerGrid.innerHTML = '';

    workers.forEach(worker => {
        const card = document.createElement('div');
        card.className = 'worker-card recruiter-worker-card';
        card.innerHTML = `
            <span class="worker-card-badge">Available</span>
            <img src="${worker.image}" alt="${worker.name}" class="worker-image">
            <h3>${worker.name}</h3>
            <div class="worker-job">${worker.job}</div>
            <div class="worker-location">📍 ${worker.location}</div>
            <div class="worker-wage">₹${worker.wage}/day</div>
            <div class="worker-rating">⭐⭐⭐⭐⭐</div>
        `;

        card.addEventListener('click', () => {
            showRecruiterWorkerProfile(worker.id);
        });

        workerGrid.appendChild(card);
    });
}

function showRecruiterWorkerProfile(workerId) {
    const worker = workers.find(w => w.id === workerId);
    const profileContent = document.getElementById('recruiterWorkerProfileContent');

    profileContent.innerHTML = `
        <img src="${worker.image}" alt="${worker.name}" class="profile-image">
        <div class="profile-details">
            <h2>${worker.name}</h2>
            <div class="profile-job">${worker.job}</div>
            <div class="profile-location">📍 ${worker.location}</div>
            <div class="worker-rating">⭐⭐⭐⭐⭐</div>
            <div class="profile-wage">₹${worker.wage}/day</div>
            <div class="profile-phone">📱 ${worker.phone}</div>
        </div>
        <div class="profile-details" style="margin-top: 20px;">
            <h3 style="margin-bottom: 15px;">Work Information</h3>
            <div class="history-details">
                <div class="history-detail">
                    <div class="history-detail-label">Experience</div>
                    <div class="history-detail-value">5+ years</div>
                </div>
                <div class="history-detail">
                    <div class="history-detail-label">Jobs Completed</div>
                    <div class="history-detail-value">12</div>
                </div>
                <div class="history-detail">
                    <div class="history-detail-label">Success Rate</div>
                    <div class="history-detail-value">100%</div>
                </div>
            </div>
        </div>
        <div class="profile-actions">
            <button class="call-btn" onclick="callWorker('${worker.phone}')">CALL</button>
            <button class="profile-hire-btn" onclick="hireWorkerFromProfile('${worker.name}')">HIRE</button>
        </div>
    `;

    showPage('recruiterWorkerProfilePage');
}

function hireWorkerFromProfile(workerName) {
    showBookingModal();
}

document.getElementById('backFromWorkersBtn').addEventListener('click', () => {
    showPage('recruiterStatsPage');
});

document.getElementById('backFromWorkerProfileBtn').addEventListener('click', () => {
    showPage('recruiterStatsPage');
});

document.getElementById('managejobsFromStatsBtn').addEventListener('click', () => {
    showPage('recruiterDashboardPage');
    loadJobs();
});
