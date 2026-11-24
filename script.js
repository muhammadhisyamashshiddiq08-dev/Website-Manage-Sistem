// ============================================================================
// TMS - TICKETING MANAGEMENT SYSTEM
// File: script.js (Semua Logika JavaScript dalam Satu File)
// ============================================================================

// ============================================================================
// BAGIAN 1: INISIALISASI GLOBAL (Landing Page)
// ============================================================================
document.addEventListener('DOMContentLoaded', function () {
    // 1. Inisialisasi AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // 3. Scrollspy Manual (jika Bootstrap scrollspy tidak jalan)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
});

// ============================================================================
// BAGIAN 2: DUMMY DATA EVENTS (Digunakan di Landing & Dashboard)
// ============================================================================
const dummyEvents = [
    { id: 1, nama: "Konser Musik Indonesia", kategori: "Konser", badge: "bg-primary", tanggal: "15 Agustus 2026", lokasi: "Jakarta", harga: 150000, kuota: 500, img: "https://picsum.photos/seed/event1/400/250" },
    { id: 2, nama: "Seminar AI & Future", kategori: "Seminar", badge: "bg-success", tanggal: "10 September 2026", lokasi: "Bandung", harga: 75000, kuota: 200, img: "https://picsum.photos/seed/event2/400/250" },
    { id: 3, nama: "Workshop Web Dev", kategori: "Workshop", badge: "bg-warning text-dark", tanggal: "05 Oktober 2026", lokasi: "Surabaya", harga: 100000, kuota: 50, img: "https://picsum.photos/seed/event3/400/250" },
    { id: 4, nama: "Festival Budaya Nusantara", kategori: "Festival", badge: "bg-info text-dark", tanggal: "20 November 2026", lokasi: "Yogyakarta", harga: 50000, kuota: 1000, img: "https://picsum.photos/seed/event4/400/250" },
    { id: 5, nama: "Pameran Seni Rupa", kategori: "Pameran", badge: "bg-secondary", tanggal: "01 Desember 2026", lokasi: "Bali", harga: 25000, kuota: 300, img: "https://picsum.photos/seed/event5/400/250" },
    { id: 6, nama: "Konser Jazz Malam", kategori: "Konser", badge: "bg-primary", tanggal: "25 Desember 2026", lokasi: "Jakarta", harga: 200000, kuota: 400, img: "https://picsum.photos/seed/event6/400/250" }
];

// ============================================================================
// BAGIAN 3: LANDING PAGE & DETAIL EVENT
// ============================================================================

// Render Featured Events di Landing Page
function renderFeaturedEvents() {
    const container = document.getElementById('featured-events');
    if (!container) return;

    container.innerHTML = dummyEvents.slice(0, 3).map(event => `
        <div class="col-md-4 mb-4" data-aos="fade-up">
            <div class="event-card">
                <img src="${event.img}" alt="${event.nama}">
                <div class="card-body p-4">
                    <span class="badge ${event.badge} mb-2">${event.kategori}</span>
                    <h5 class="card-title fw-bold">${event.nama}</h5>
                    <p class="text-muted small mb-2"><i class="fas fa-calendar-alt me-2"></i>${event.tanggal}</p>
                    <p class="text-muted small mb-3"><i class="fas fa-map-marker-alt me-2"></i>${event.lokasi}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-primary">Rp ${event.harga.toLocaleString('id-ID')}</span>
                        <a href="detail_event.html?id=${event.id}" class="btn btn-outline-primary btn-sm rounded-pill px-3">Detail</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Detail Event di Halaman Detail
function renderDetailEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id')) || 1;
    const event = dummyEvents.find(e => e.id === eventId) || dummyEvents[0];

    const container = document.getElementById('event-detail-container');
    if (!container) return;

    container.innerHTML = `
        <div class="col-lg-7" data-aos="fade-right">
            <img src="${event.img}" class="img-fluid rounded-4 shadow-lg mb-4" alt="${event.nama}">
            <h2 class="fw-bold mb-3">${event.nama}</h2>
            <div class="d-flex gap-3 mb-4">
                <span class="badge ${event.badge} px-3 py-2"><i class="fas fa-tag me-2"></i>${event.kategori}</span>
                <span class="badge bg-success px-3 py-2"><i class="fas fa-check-circle me-2"></i>Tersedia</span>
            </div>
            <p class="text-muted">Nikmati pengalaman luar biasa di acara ${event.nama}. Acara ini dirancang untuk memberikan wawasan dan hiburan terbaik bagi para peserta. Jangan lewatkan kesempatan ini!</p>
            
            <div class="row mt-4">
                <div class="col-md-6 mb-3">
                    <div class="p-3 border rounded-3 bg-white">
                        <small class="text-muted d-block">Tanggal & Waktu</small>
                        <strong><i class="fas fa-calendar-alt text-primary me-2"></i>${event.tanggal}</strong>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="p-3 border rounded-3 bg-white">
                        <small class="text-muted d-block">Lokasi</small>
                        <strong><i class="fas fa-map-marker-alt text-primary me-2"></i>${event.lokasi}</strong>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-lg-5" data-aos="fade-left">
            <div class="card border-0 shadow-lg rounded-4 p-4 sticky-top" style="top: 100px;">
                <h4 class="fw-bold mb-4">Pesan Tiket</h4>
                <form id="orderForm" onsubmit="simulatePayment(event)">
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Jumlah Tiket</label>
                        <input type="number" class="form-control form-control-lg" id="qty" value="1" min="1" max="${event.kuota}" onchange="updateTotal(${event.harga})">
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Metode Pembayaran</label>
                        <select class="form-select form-select-lg">
                            <option>Transfer Bank (Virtual Account)</option>
                            <option>E-Wallet (OVO, GoPay, Dana)</option>
                            <option>Kartu Kredit</option>
                        </select>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between mb-3">
                        <span class="text-muted">Harga Satuan</span>
                        <span class="fw-bold">Rp ${event.harga.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="d-flex justify-content-between mb-4">
                        <span class="fw-bold fs-5">Total Bayar</span>
                        <span class="fw-bold fs-5 text-primary" id="totalPrice">Rp ${event.harga.toLocaleString('id-ID')}</span>
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill shadow-sm">
                        <i class="fas fa-shopping-cart me-2"></i>Beli Sekarang
                    </button>
                </form>
            </div>
        </div>
    `;
}

// Update Total Harga
function updateTotal(harga) {
    const qty = document.getElementById('qty').value;
    const total = harga * qty;
    document.getElementById('totalPrice').innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// Simulasi Payment Gateway
function simulatePayment(e) {
    e.preventDefault();

    const modalHtml = `
        <div class="modal fade" id="confirmModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg rounded-4">
                    <div class="modal-header bg-primary text-white rounded-top-4">
                        <h5 class="modal-title"><i class="fas fa-credit-card me-2"></i>Konfirmasi Pesanan</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4 text-center">
                        <i class="fas fa-check-circle text-success display-1 mb-3"></i>
                        <h4>Pesanan Berhasil Dibuat!</h4>
                        <p class="text-muted">Total pembayaran: <strong>${document.getElementById('totalPrice').innerText}</strong></p>
                        <p class="small text-muted">Silakan selesaikan pembayaran dalam 1x24 jam.</p>
                    </div>
                    <div class="modal-footer justify-content-center border-0 pb-4">
                        <button type="button" class="btn btn-primary rounded-pill px-4" onclick="showSuccessAlert()">Konfirmasi Bayar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const oldModal = document.getElementById('confirmModal');
    if (oldModal) oldModal.remove();

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    new bootstrap.Modal(document.getElementById('confirmModal')).show();
}

// Alert Sukses & Redirect
function showSuccessAlert() {
    const modalEl = document.getElementById('confirmModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    const alertHtml = `
        <div class="alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4 shadow" role="alert" style="z-index: 9999; min-width: 300px;">
            <i class="fas fa-check-circle me-2"></i><strong>Pembayaran Berhasil!</strong> Tiket Anda telah aktif.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertHtml);

    setTimeout(() => {
        window.location.href = 'user_tickets.html';
    }, 2000);
}

// ============================================================================
// BAGIAN 4: LOGIN USER
// ============================================================================
function initUserLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm || window.location.pathname.includes('admin_login')) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const errorAlert = document.getElementById('errorAlert');
        const errorMsg = document.getElementById('errorMsg');

        const validUser = {
            email: 'user@tms.com',
            password: 'user123',
            role: 'user',
            name: 'Budi Santoso'
        };

        if (email === validUser.email && password === validUser.password) {
            errorAlert.classList.add('d-none');
            localStorage.setItem('tms_logged_in', 'true');
            localStorage.setItem('tms_role', validUser.role);
            localStorage.setItem('tms_user_name', validUser.name);
            localStorage.setItem('tms_user_email', validUser.email);
            window.location.href = 'user_dashboard.html';
        } else {
            errorMsg.innerText = 'Email atau password salah! Gunakan akun demo yang tersedia.';
            errorAlert.classList.remove('d-none');
        }
    });
}

// ============================================================================
// BAGIAN 5: LOGIN ADMIN
// ============================================================================
function initAdminLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm || !window.location.pathname.includes('admin_login')) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const errorAlert = document.getElementById('errorAlert');
        const errorMsg = document.getElementById('errorMsg');

        const validAdmin = {
            email: 'admin@tms.com',
            password: 'admin123',
            role: 'admin',
            name: 'Administrator'
        };

        if (email === validAdmin.email && password === validAdmin.password) {
            errorAlert.classList.add('d-none');
            localStorage.setItem('tms_logged_in', 'true');
            localStorage.setItem('tms_role', validAdmin.role);
            localStorage.setItem('tms_admin_name', validAdmin.name);
            localStorage.setItem('tms_admin_email', validAdmin.email);
            window.location.href = 'admin_dashboard.html';
        } else {
            errorMsg.innerText = 'Email atau password admin salah!';
            errorAlert.classList.remove('d-none');
        }
    });
}

// ============================================================================
// BAGIAN 6: PROTEKSI HALAMAN (User & Admin)
// ============================================================================
function protectUserPage() {
    const isUserPage = window.location.pathname.includes('user_dashboard') ||
        window.location.pathname.includes('user_tickets');

    if (isUserPage) {
        if (localStorage.getItem('tms_logged_in') !== 'true' || localStorage.getItem('tms_role') !== 'user') {
            alert('Anda harus login terlebih dahulu!');
            window.location.href = 'user_login.html';
            return false;
        }
        return true;
    }
    return true;
}

function protectAdminPage() {
    const isAdminPage = window.location.pathname.includes('admin_dashboard') ||
        window.location.pathname.includes('admin_manage_events') ||
        window.location.pathname.includes('admin_manage_users');

    if (isAdminPage) {
        if (localStorage.getItem('tms_logged_in') !== 'true' || localStorage.getItem('tms_role') !== 'admin') {
            alert('Anda harus login sebagai Admin terlebih dahulu!');
            window.location.href = 'admin_login.html';
            return false;
        }
        return true;
    }
    return true;
}

// ============================================================================
// BAGIAN 7: DASHBOARD USER
// ============================================================================
function initUserDashboard() {
    const userNameEl = document.getElementById('userName');
    if (!userNameEl) return;

    // Proteksi
    if (!protectUserPage()) return;

    // Tampilkan nama user
    const userName = localStorage.getItem('tms_user_name');
    if (userName) {
        userNameEl.innerText = 'TMS ' + userName;
        const welcomeName = document.getElementById('welcomeName');
        if (welcomeName) welcomeName.innerText = userName;
    } else {
        window.location.href = 'user_login.html';
        return;
    }

    // Animasi Angka Statistik
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(el => {
        const target = parseInt(el.innerText);
        let count = 0;
        const increment = Math.ceil(target / 30);
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                el.innerText = target;
                clearInterval(timer);
            } else {
                el.innerText = count;
            }
        }, 30);
    });
}

// ============================================================================
// BAGIAN 8: DASHBOARD ADMIN (Chart.js)
// ============================================================================
function initAdminDashboard() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;

    if (!protectAdminPage()) return;

    const adminName = localStorage.getItem('tms_admin_name');
    if (adminName) {
        const nameEl = document.getElementById('adminName');
        if (nameEl) nameEl.innerText = 'TMS ' + adminName;
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            datasets: [{
                label: 'Penjualan Tiket',
                data: [120, 190, 300, 500, 200, 300],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { display: false } },
                x: { grid: { display: false } }
            }
        }
    });
}

// ============================================================================
// BAGIAN 9: ADMIN MANAGE EVENTS (CRUD)
// ============================================================================
let eventIdToDelete = null;

function renderEventsTable() {
    const tbody = document.getElementById('eventsTableBody');
    if (!tbody) return;

    if (!protectAdminPage()) return;

    const adminName = localStorage.getItem('tms_admin_name');
    if (adminName) {
        const nameEl = document.getElementById('adminName');
        if (nameEl) nameEl.innerText = 'TMS ' + adminName;
    }

    let html = '';
    dummyEvents.forEach((event, index) => {
        html += `
            <tr>
                <td class="text-center fw-bold">${index + 1}</td>
                <td class="text-center">
                    <img src="${event.img}" alt="${event.nama}" width="50" height="50" style="object-fit:cover;border-radius:8px;">
                </td>
                <td class="fw-semibold">${event.nama}</td>
                <td><span class="badge ${event.badge}">${event.kategori}</span></td>
                <td>${event.tanggal}</td>
                <td>Rp ${event.harga.toLocaleString('id-ID')}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-warning btn-action" 
                            onclick="editEvent(${event.id}, '${event.nama}', '${event.kategori}', '${event.tanggal}', ${event.harga})" 
                            title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger btn-action" 
                            onclick="confirmDelete(${event.id}, '${event.nama}')" 
                            title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

// Tambah Event
function submitTambahEvent(e) {
    e.preventDefault();

    const nama = document.getElementById('tambahNama').value;
    const kategori = document.getElementById('tambahKategori').value;
    const tanggal = document.getElementById('tambahTanggal').value;
    const harga = document.getElementById('tambahHarga').value;

    const tanggalFormatted = new Date(tanggal).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric'
    });

    const tbody = document.getElementById('eventsTableBody');
    const newRow = document.createElement('tr');
    const newId = tbody.children.length + 1;

    let badgeClass = 'bg-primary';
    if (kategori === 'Seminar') badgeClass = 'bg-success';
    if (kategori === 'Workshop') badgeClass = 'bg-warning text-dark';
    if (kategori === 'Festival') badgeClass = 'bg-info text-dark';
    if (kategori === 'Pameran') badgeClass = 'bg-secondary';

    newRow.innerHTML = `
        <td class="text-center fw-bold">${newId}</td>
        <td class="text-center">
            <img src="https://picsum.photos/seed/event${newId + 10}/50/50" alt="${nama}" width="50" height="50" style="object-fit:cover;border-radius:8px;">
        </td>
        <td class="fw-semibold">${nama}</td>
        <td><span class="badge ${badgeClass}">${kategori}</span></td>
        <td>${tanggalFormatted}</td>
        <td>Rp ${parseInt(harga).toLocaleString('id-ID')}</td>
        <td class="text-center">
            <button class="btn btn-sm btn-warning btn-action" onclick="editEvent(${newId}, '${nama}', '${kategori}', '${tanggal}', ${harga})" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger btn-action" onclick="confirmDelete(${newId}, '${nama}')" title="Hapus">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    tbody.appendChild(newRow);
    bootstrap.Modal.getInstance(document.getElementById('tambahEventModal')).hide();
    document.getElementById('formTambahEvent').reset();
    showAlert('Event berhasil ditambahkan!', 'success');
}

// Edit Event
function editEvent(id, nama, kategori, tanggal, harga) {
    document.getElementById('editId').value = id;
    document.getElementById('editNama').value = nama;
    document.getElementById('editKategori').value = kategori;
    document.getElementById('editTanggal').value = tanggal;
    document.getElementById('editHarga').value = harga;
    new bootstrap.Modal(document.getElementById('editEventModal')).show();
}

function submitEditEvent(e) {
    e.preventDefault();
    bootstrap.Modal.getInstance(document.getElementById('editEventModal')).hide();
    showAlert('Event berhasil diupdate! (Simulasi)', 'info');
}

// Hapus Event
function confirmDelete(id, nama) {
    eventIdToDelete = id;
    document.getElementById('deleteEventName').innerText = nama;
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function executeDelete() {
    if (eventIdToDelete) {
        const tbody = document.getElementById('eventsTableBody');
        const rows = tbody.querySelectorAll('tr');

        rows.forEach(row => {
            const noCell = row.querySelector('td:first-child');
            if (noCell && parseInt(noCell.innerText) === eventIdToDelete) {
                row.remove();
            }
        });

        renumberRows();
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
        showAlert('Event berhasil dihapus!', 'danger');
        eventIdToDelete = null;
    }
}

function renumberRows() {
    const tbody = document.getElementById('eventsTableBody');
    const rows = tbody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        const noCell = row.querySelector('td:first-child');
        if (noCell) noCell.innerText = index + 1;
    });
}

// ============================================================================
// BAGIAN 10: FUNGSI GLOBAL (Logout & Alert)
// ============================================================================
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        localStorage.removeItem('tms_logged_in');
        localStorage.removeItem('tms_role');
        localStorage.removeItem('tms_user_name');
        localStorage.removeItem('tms_user_email');
        localStorage.removeItem('tms_admin_name');
        localStorage.removeItem('tms_admin_email');

        // Redirect berdasarkan role sebelumnya
        window.location.href = 'index.html';
    }
}

function showAlert(message, type) {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4 shadow"
             role="alert" style="z-index: 9999; min-width: 300px;">
            <i class="fas fa-check-circle me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertHtml);

    setTimeout(() => {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => {
            if (alert.parentNode) {
                bootstrap.Alert.getInstance(alert)?.close();
            }
        });
    }, 3000);
}

// ============================================================================
// BAGIAN 11: INISIALISASI SEMUA HALAMAN (Master Initializer)
// ============================================================================
document.addEventListener('DOMContentLoaded', function () {
    // Landing Page & Detail Event
    renderFeaturedEvents();
    renderDetailEvent();

    // Login
    initUserLogin();
    initAdminLogin();

    // Dashboard User
    initUserDashboard();

    // Dashboard Admin (Chart.js)
    initAdminDashboard();

    // Admin Manage Events (Tabel + CRUD)
    renderEventsTable();
});