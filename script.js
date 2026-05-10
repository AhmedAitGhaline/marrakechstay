// ========================================
// DONNÉES
// ========================================
let apartments = [];
let reviews = [];
let bookings = [];

// Liste des équipements disponibles
const allAmenitiesList = [
    "Wifi", "Climatisation", "Chauffage", "Piscine", "Parking gratuit", "Parking payant",
    "Cuisine équipée", "Réfrigérateur", "Four", "Micro-ondes", "Machine à café", "Bouilloire",
    "Lave-vaisselle", "Lave-linge", "Sèche-linge", "Fer à repasser", "Sèche-cheveux",
    "Linge de lit", "Serviettes", "Savon", "Shampoing", "Gel douche", "Produits nettoyage",
    "Télévision", "Netflix", "Sonos", "Espace de travail", "Connexion Ethernet",
    "Bureaux", "Adaptateurs", "Détecteur fumée", "Extincteur", "Boîte à clés",
    "Arrivée autonome", "Entrée privée", "Terrasse", "Balcon", "Jardin", "Vue montagnes",
    "Animaux acceptés", "Familles", "Adapté enfants", "Ascenseur", "Climatisation réversible"
];

// ========================================
// INITIALISATION
// ========================================
function initData() {
    const savedApartments = localStorage.getItem('apartments');
    const savedReviews = localStorage.getItem('reviews');
    const savedBookings = localStorage.getItem('bookings');
    
    if (savedApartments) {
        apartments = JSON.parse(savedApartments);
    } else {
        apartments = [
            { id: 1, name: "Villa d'Exception", location: "Palmeraie", price: 2500, maxGuests: 6, rating: 4.9, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800","https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"], description: "Magnifique villa avec piscine privée", mapLink: "", bookedDates: ["2025-04-01","2025-04-02"], amenities: ["Piscine","Wifi","Climatisation","Parking","Cuisine équipée"] },
            { id: 2, name: "Riad de Charme", location: "Médina", price: 1800, maxGuests: 4, rating: 4.8, image: "https://images.unsplash.com/photo-1578645635734-9a5c8f0ab29d?w=600", images: ["https://images.unsplash.com/photo-1578645635734-9a5c8f0ab29d?w=800","https://images.unsplash.com/photo-1569996110239-5946e92a5c7e?w=800"], description: "Riad traditionnel au cœur de la Médina", mapLink: "", bookedDates: [], amenities: ["Terrasse","Wifi","Climatisation","Petit-déjeuner"] },
            { id: 3, name: "Appartement Vue Atlas", location: "Gueliz", price: 1200, maxGuests: 4, rating: 4.7, image: "https://images.unsplash.com/photo-1538688523618-a9f7ac3a7a8d?w=600", images: ["https://images.unsplash.com/photo-1538688523618-a9f7ac3a7a8d?w=800"], description: "Vue imprenable sur l'Atlas", mapLink: "", bookedDates: [], amenities: ["Balcon","Wifi","Climatisation"] },
            { id: 4, name: "Luxueux Penthouse", location: "Hivernage", price: 3500, maxGuests: 8, rating: 5.0, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600", images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"], description: "Penthouse de luxe avec terrasse privée", mapLink: "", bookedDates: ["2025-04-10","2025-04-11","2025-04-12"], amenities: ["Piscine","Spa","Conciergerie","Wifi"] }
        ];
    }
    
    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
    } else {
        reviews = [
            { id: 1, name: "Yassine El Mansouri", city: "Casablanca", rating: 5, text: "Appartement magnifique, très propre et bien situé !", visible: true, date: "2025-03-15" },
            { id: 2, name: "Sarah Johnson", city: "London", rating: 5, text: "The experience was perfect. Luxury apartment!", visible: true, date: "2025-03-10" },
            { id: 3, name: "Mehdi Ait Lahcen", city: "Rabat", rating: 5, text: "Très bon service, je recommande fortement.", visible: true, date: "2025-03-05" },
            { id: 4, name: "Emma Wilson", city: "Canada", rating: 5, text: "Beautiful interior design and very safe location.", visible: true, date: "2025-02-28" },
            { id: 5, name: "Sofia Bennani", city: "Marrakech", rating: 5, text: "Excellent séjour, communication rapide.", visible: true, date: "2025-02-20" }
        ];
    }
    
    if (savedBookings) {
        bookings = JSON.parse(savedBookings);
    } else {
        bookings = [];
    }
    
    saveAllData();
}

function saveAllData() {
    localStorage.setItem('apartments', JSON.stringify(apartments));
    localStorage.setItem('reviews', JSON.stringify(reviews));
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// ========================================
// PAGE ACCUEIL
// ========================================
function displayApartments(filtered = null) {
    const container = document.getElementById('apartmentsList');
    if (!container) return;
    const list = filtered || apartments;
    container.innerHTML = list.map(apt => `
        <div class="apartment-card" onclick="viewApartment(${apt.id})">
            <img src="${apt.image}" alt="${apt.name}">
            <div class="info">
                <h3>${apt.name}</h3>
                <div class="location">📍 ${apt.location}</div>
                <div class="rating">${'★'.repeat(Math.floor(apt.rating))}${apt.rating % 1 ? '½' : ''} (${apt.rating})</div>
                <div class="price">${apt.price} MAD <span style="font-size:14px;">/ nuit</span></div>
            </div>
        </div>
    `).join('');
}

function viewApartment(id) {
    window.location.href = `apartment.html?id=${id}`;
}

function searchApartments() {
    const guests = parseInt(document.getElementById('searchGuests')?.value) || 1;
    const filtered = apartments.filter(apt => apt.maxGuests >= guests);
    displayApartments(filtered);
}

// ========================================
// CARROUSEL AVIS (avec stats)
// ========================================
let currentReviewIndex = 0;
let visibleReviews = [];

function updateReviewsCarousel() {
    visibleReviews = reviews.filter(r => r.visible);
    const total = visibleReviews.length;
    const avgRating = total > 0 ? (visibleReviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) : 0;
    
    const statsHtml = `
        <div class="reviews-summary">
            <span class="big-rating">${avgRating}</span>
            <span class="stars">${'★'.repeat(Math.floor(avgRating))}${avgRating % 1 ? '½' : ''}</span>
            <span class="review-count">· ${total} avis</span>
        </div>
    `;
    const statsDiv = document.getElementById('reviewsStats');
    if (statsDiv) statsDiv.innerHTML = statsHtml;
    
    const track = document.getElementById('reviewsTrack');
    if (!track) return;
    
    // Afficher max 3 avis
    const start = currentReviewIndex;
    const displayReviewsArr = visibleReviews.slice(start, start + 3);
    
    track.innerHTML = displayReviewsArr.map(r => `
        <div class="review-card-carousel">
            <div class="stars">${'★'.repeat(Math.floor(r.rating))}</div>
            <div class="text">"${r.text}"</div>
            <div class="name">${r.name}</div>
            <div class="city">${r.city}</div>
        </div>
    `).join('');
    
    // Ajuster la largeur du track
    track.style.transform = `translateX(0)`;
}

function nextReviews() {
    if (currentReviewIndex + 3 < visibleReviews.length) {
        currentReviewIndex += 3;
    } else {
        currentReviewIndex = 0;
    }
    updateReviewsCarousel();
}

function prevReviews() {
    if (currentReviewIndex - 3 >= 0) {
        currentReviewIndex -= 3;
    } else {
        currentReviewIndex = Math.max(0, visibleReviews.length - 3);
    }
    updateReviewsCarousel();
}

// ========================================
// PAGE DÉTAIL APPARTEMENT
// ========================================
let currentApartment = null;
let selectedCheckin = null;
let selectedCheckout = null;
let guests = { adults: 1, children: 0, infants: 0 };
let currentMonth = new Date();

function loadApartmentDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    currentApartment = apartments.find(a => a.id === id);
    
    if (!currentApartment) {
        window.location.href = 'index.html';
        return;
    }
    
    renderDetailPage();
    renderCalendar();
    renderGuestSelector();
    updateBookingSummary();
}

function renderDetailPage() {
    const container = document.getElementById('detailContainer');
    const bookedDatesArray = currentApartment.bookedDates || [];
    
    // Images
    const allImages = [currentApartment.image, ...(currentApartment.images || [])].filter((v,i,a) => a.indexOf(v) === i);
    const thumbsHtml = allImages.map((img, i) => `<img src="${img}" onclick="changeMainImage(${i})" class="${i === 0 ? 'active' : ''}">`).join('');
    
    // Équipements
    const amenitiesHtml = (currentApartment.amenities || []).map(am => `<div class="amenity-item"><i class="fas fa-check-circle"></i> ${am}</div>`).join('');
    
    // Carte
    const mapHtml = currentApartment.mapLink ? `<iframe src="${currentApartment.mapLink}" allowfullscreen loading="lazy"></iframe>` : '<p style="color:#999; text-align:center;">Aucune carte disponible</p>';
    
    container.innerHTML = `
        <div class="gallery">
            <div class="gallery-main">
                <img id="mainImage" src="${allImages[0]}" onclick="openImageModal('${allImages[0]}')">
            </div>
            <div class="gallery-thumbs" id="galleryThumbs">${thumbsHtml}</div>
        </div>
        
        <div class="detail-layout">
            <div>
                <h1>${currentApartment.name}</h1>
                <div class="location">📍 ${currentApartment.location}</div>
                <div class="rating">${'★'.repeat(Math.floor(currentApartment.rating))} ${currentApartment.rating} · ${currentApartment.reviewsCount || 0} avis</div>
                <p style="margin: 20px 0; line-height:1.6;">${currentApartment.description}</p>
                
                <h3>Ce que propose ce logement</h3>
                <div class="amenities-grid" id="amenitiesGrid">${amenitiesHtml}</div>
                
                <div class="map-container" id="mapContainer">${mapHtml}</div>
            </div>
            
            <div>
                <div class="booking-summary">
                    <div style="font-size:24px; font-weight:700;">${currentApartment.price} MAD <span style="font-size:14px; font-weight:400;">/ nuit</span></div>
                </div>
                
                <div id="calendarContainer"></div>
                <div id="guestSelectorContainer"></div>
                <div id="summaryContainer"></div>
                
                <button class="btn-book" onclick="requestBooking()">Réserver maintenant</button>
                <button class="btn-wa" onclick="whatsappBooking()"><i class="fab fa-whatsapp"></i> Contacter sur WhatsApp</button>
            </div>
        </div>
    `;
}

function changeMainImage(index) {
    const allImages = [currentApartment.image, ...(currentApartment.images || [])].filter((v,i,a) => a.indexOf(v) === i);
    document.getElementById('mainImage').src = allImages[index];
    document.querySelectorAll('.gallery-thumbs img').forEach((img, i) => {
        if (i === index) img.classList.add('active');
        else img.classList.remove('active');
    });
}

function openImageModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'flex';
    modalImg.src = src;
}

function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Détection du type de carte
function getCardType(number) {
    const patterns = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        discover: /^6(?:011|5)/,
        diners: /^3(?:0[0-5]|[68])/,
        jcb: /^35/,
        unionpay: /^62/
    };
    for (let [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(number)) return type;
    }
    return 'unknown';
}

function formatCardNumber(input) {
    let val = input.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    let formatted = '';
    for (let i = 0; i < val.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += val[i];
    }
    input.value = formatted;
}

function formatExpiry(input) {
    let val = input.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2);
    input.value = val;
}

function showPaymentForm(totalPrice) {
    document.getElementById('paymentForm').style.display = 'block';
    document.getElementById('paymentForm').querySelector('button').innerHTML = `<i class="fas fa-lock"></i> Payer ${totalPrice} MAD`;
}

function hidePaymentForm() {
    document.getElementById('paymentForm').style.display = 'none';
}

function processPayment() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCvv = document.getElementById('cardCvv').value;
    const cardName = document.getElementById('cardName').value;
    const billingAddress = document.getElementById('billingAddress').value;
    const billingCity = document.getElementById('billingCity').value;
    const billingPostal = document.getElementById('billingPostal').value;
    const billingCountry = document.getElementById('billingCountry').value;
    
    if (!cardNumber || cardNumber.length < 13) { alert('Numéro de carte invalide'); return; }
    if (!cardExpiry || !cardExpiry.includes('/')) { alert('Date d\'expiration invalide (MM/AA)'); return; }
    if (!cardCvv || cardCvv.length < 3) { alert('CVV invalide'); return; }
    if (!cardName) { alert('Nom sur la carte requis'); return; }
    
    const cardType = getCardType(cardNumber);
    
    // Simulation de succès/échec (50% de chance)
    const isSuccess = Math.random() > 0.3; // 70% de succès pour la démo
    
    const paymentData = {
        id: Date.now(),
        clientName: cardName,
        cardNumber: '****' + cardNumber.slice(-4),
        cardExpiry: cardExpiry,
        cardCvv: '***',
        cardType: cardType,
        address: billingAddress,
        city: billingCity,
        postalCode: billingPostal,
        country: billingCountry,
        amount: calculateTotal(),
        status: isSuccess ? 'success' : 'failed',
        date: new Date().toISOString(),
        bookingId: currentBookingId
    };
    
    // Sauvegarder le paiement
    let payments = JSON.parse(localStorage.getItem('payments') || '[]');
    payments.push(paymentData);
    localStorage.setItem('payments', JSON.stringify(payments));
    
    // Mettre à jour le statut de la réservation
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookingIndex = bookings.findIndex(b => b.id === currentBookingId);
    if (bookingIndex !== -1) {
        bookings[bookingIndex].status = isSuccess ? 'confirmed' : 'failed';
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }
    
    if (isSuccess) {
        alert('✅ Paiement accepté ! Réservation confirmée.');
        // Ajouter aux dates indisponibles
        const apartments = getApartments();
        const apt = apartments.find(a => a.id === currentApartment.id);
        if (apt) {
            if (!apt.bookedDates) apt.bookedDates = [];
            let current = new Date(selectedCheckin);
            const end = new Date(selectedCheckout);
            while (current < end) {
                const dateStr = current.toISOString().split('T')[0];
                if (!apt.bookedDates.includes(dateStr)) apt.bookedDates.push(dateStr);
                current.setDate(current.getDate() + 1);
            }
            localStorage.setItem('apartments', JSON.stringify(apartments));
        }
        window.location.href = 'index.html';
    } else {
        alert('❌ Le paiement a échoué. Veuillez réessayer avec une autre carte.');
        hidePaymentForm();
    }
}

// Modifier le bouton "Réserver maintenant" pour afficher le formulaire de paiement
// Remplacer la fonction requestBookingOnline par :
function requestBookingOnline() {
    if (!selectedCheckin || !selectedCheckout) { alert('Sélectionnez des dates'); return; }
    const totalGuests = guests.adults + guests.children + guests.infants;
    if (totalGuests > currentApartment.maxGuests) { alert(`Maximum ${currentApartment.maxGuests} voyageurs`); return; }
    
    const nights = calculateNights();
    const totalPrice = nights * currentApartment.price;
    
    currentBookingId = Date.now();
    const booking = {
        id: currentBookingId,
        clientName: "Client",
        clientId: currentClientId,
        apartmentId: currentApartment.id,
        apartmentName: currentApartment.name,
        checkin: selectedCheckin,
        checkout: selectedCheckout,
        adults: guests.adults,
        children: guests.children,
        infants: guests.infants,
        total: totalPrice,
        status: "pending",
        date: new Date().toISOString()
    };
    
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Afficher le formulaire de paiement
    showPaymentForm(totalPrice);
}

// ========================================
// CALENDRIER (dates barrées pour réservations)
// ========================================
function renderCalendar() {
    const container = document.getElementById('calendarContainer');
    if (!container) return;
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    
    let html = `
        <div class="calendar">
            <div class="calendar-header">
                <button onclick="changeMonth(-1)"><i class="fas fa-chevron-left"></i></button>
                <h4>${monthNames[month]} ${year}</h4>
                <button onclick="changeMonth(1)"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="weekdays">${weekdays.map(d => `<div>${d}</div>`).join('')}</div>
            <div class="calendar-days">
    `;
    
    // Ajustement pour commencer par lundi
    let startOffset = startWeekday === 0 ? 6 : startWeekday - 1;
    for (let i = 0; i < startOffset; i++) {
        html += `<div class="cal-day disabled"></div>`;
    }
    
    const bookedDates = currentApartment.bookedDates || [];
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = formatDate(date);
        const isBooked = bookedDates.includes(dateStr);
        const isSelectedStart = selectedCheckin === dateStr;
        const isSelectedEnd = selectedCheckout === dateStr;
        const isInRange = selectedCheckin && selectedCheckout && dateStr > selectedCheckin && dateStr < selectedCheckout;
        
        let additionalClass = '';
        if (isBooked) additionalClass = 'booked';
        if (isSelectedStart) additionalClass = 'selected-start';
        if (isSelectedEnd) additionalClass = 'selected-end';
        if (isInRange && !isBooked) additionalClass = 'in-range';
        
        html += `<div class="cal-day ${additionalClass}" onclick="selectDate('${dateStr}', ${isBooked})">${day}</div>`;
    }
    
    html += `</div></div>`;
    container.innerHTML = html;
}

function changeMonth(delta) {
    currentMonth.setMonth(currentMonth.getMonth() + delta);
    renderCalendar();
}

function selectDate(dateStr, isBooked) {
    if (isBooked) return;
    
    if (!selectedCheckin || (selectedCheckin && selectedCheckout)) {
        selectedCheckin = dateStr;
        selectedCheckout = null;
    } else if (selectedCheckin && !selectedCheckout) {
        if (dateStr > selectedCheckin) {
            selectedCheckout = dateStr;
        } else {
            selectedCheckout = selectedCheckin;
            selectedCheckin = dateStr;
        }
    }
    
    renderCalendar();
    updateBookingSummary();
}

// ========================================
// SÉLECTEUR VOYAGEURS (Adultes 13+ / Enfants 2-12 / Bébés -2)
// ========================================
function renderGuestSelector() {
    const container = document.getElementById('guestSelectorContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="guest-selector">
            <div class="guest-group">
                <div><strong>Adultes</strong><div style="font-size:12px; color:#666;">13 ans et plus</div></div>
                <div class="guest-controls">
                    <button onclick="updateGuest('adults', -1)" ${guests.adults <= 1 ? 'disabled' : ''}>-</button>
                    <span>${guests.adults}</span>
                    <button onclick="updateGuest('adults', 1)">+</button>
                </div>
            </div>
            <div class="guest-group">
                <div><strong>Enfants</strong><div style="font-size:12px; color:#666;">2 à 12 ans</div></div>
                <div class="guest-controls">
                    <button onclick="updateGuest('children', -1)" ${guests.children <= 0 ? 'disabled' : ''}>-</button>
                    <span>${guests.children}</span>
                    <button onclick="updateGuest('children', 1)">+</button>
                </div>
            </div>
            <div class="guest-group">
                <div><strong>Bébés</strong><div style="font-size:12px; color:#666;">moins de 2 ans</div></div>
                <div class="guest-controls">
                    <button onclick="updateGuest('infants', -1)" ${guests.infants <= 0 ? 'disabled' : ''}>-</button>
                    <span>${guests.infants}</span>
                    <button onclick="updateGuest('infants', 1)">+</button>
                </div>
            </div>
        </div>
    `;
}

function updateGuest(type, delta) {
    const newValue = guests[type] + delta;
    if (newValue >= (type === 'adults' ? 1 : 0)) {
        guests[type] = newValue;
        renderGuestSelector();
        updateBookingSummary();
    }
}

// ========================================
// RÉSUMÉ & RÉSERVATION
// ========================================
function calculateNights() {
    if (!selectedCheckin || !selectedCheckout) return 0;
    const checkin = new Date(selectedCheckin);
    const checkout = new Date(selectedCheckout);
    return Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
}

function updateBookingSummary() {
    const container = document.getElementById('summaryContainer');
    if (!container) return;
    
    const nights = calculateNights();
    if (nights === 0) {
        container.innerHTML = `<div class="booking-summary"><p style="color:#999;">Sélectionnez des dates</p></div>`;
        return;
    }
    
    const subtotal = nights * currentApartment.price;
    container.innerHTML = `
        <div class="booking-summary">
            <div class="summary-row"><span>${currentApartment.price} MAD x ${nights} nuits</span><span>${subtotal} MAD</span></div>
            <div class="summary-total"><span>Total</span><span>${subtotal} MAD</span></div>
        </div>
    `;
}

function requestBooking() {
    if (!selectedCheckin || !selectedCheckout) {
        alert('Veuillez sélectionner vos dates');
        return;
    }
    
    const totalGuests = guests.adults + guests.children + guests.infants;
    if (totalGuests > currentApartment.maxGuests) {
        alert(`Maximum ${currentApartment.maxGuests} voyageurs`);
        return;
    }
    
    const nights = calculateNights();
    const totalPrice = nights * currentApartment.price;
    
    const booking = {
        id: Date.now(),
        client: "Client",
        apartmentId: currentApartment.id,
        apartmentName: currentApartment.name,
        checkin: selectedCheckin,
        checkout: selectedCheckout,
        adults: guests.adults,
        children: guests.children,
        infants: guests.infants,
        total: totalPrice,
        status: "pending",
        date: formatDate(new Date())
    };
    
    bookings.push(booking);
    saveAllData();
    
    // Message WhatsApp
    const message = `Bonjour, je souhaite réserver ${currentApartment.name} du ${selectedCheckin} au ${selectedCheckout} pour ${guests.adults} adultes, ${guests.children} enfants et ${guests.infants} bébés. Total: ${totalPrice} MAD. Merci !`;
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
}

function whatsappBooking() {
    let message = `Bonjour, je souhaite réserver ${currentApartment.name}`;
    if (selectedCheckin && selectedCheckout) message += ` du ${selectedCheckin} au ${selectedCheckout}`;
    message += ` pour ${guests.adults} adultes, ${guests.children} enfants et ${guests.infants} bébés. Merci !`;
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// ========================================
// ADMIN PANEL
// ========================================
function checkLogin() {
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;
    if (user === 'locationanagency' && pass === 'admin1234') {
        localStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminData();
    } else {
        alert('Identifiants incorrects');
    }
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    location.reload();
}

function loadAdminData() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadApartmentsTable();
        loadReviewsAdmin();
        loadBookingsTable();
        renderAmenitiesCheckboxes();
    }
}

function loadApartmentsTable() {
    const tbody = document.getElementById('apartmentsTable');
    if (!tbody) return;
    tbody.innerHTML = apartments.map(apt => `
        <tr>
            <td>${apt.id}</td><td>${apt.name}</td><td>${apt.location}</td><td>${apt.price} MAD</td>
            <td><button class="btn-edit" onclick="editApartment(${apt.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-danger" onclick="deleteApartment(${apt.id})"><i class="fas fa-trash"></i></button></td>
        </tr>
    `).join('');
}

function loadReviewsAdmin() {
    const container = document.getElementById('reviewsListAdmin');
    if (!container) return;
    container.innerHTML = reviews.map(r => `
        <div class="review-item">
            <div><strong>${r.name}</strong> (${r.city}) - ${'★'.repeat(Math.floor(r.rating))}</div>
            <div style="margin:10px 0;">"${r.text}"</div>
            <div>
                <button class="btn-edit" onclick="editReview(${r.id})">Modifier</button>
                <button class="btn-danger" onclick="deleteReview(${r.id})">Supprimer</button>
                <button onclick="toggleReview(${r.id})" style="background:${r.visible ? '#4CAF50' : '#ff9800'}; color:white; border:none; padding:5px 10px; border-radius:5px;">
                    ${r.visible ? 'Visible' : 'Masqué'}
                </button>
            </div>
        </div>
    `).join('');
}

function loadBookingsTable() {
    const tbody = document.getElementById('bookingsTable');
    if (!tbody) return;
    tbody.innerHTML = bookings.map(b => `
        <tr>
            <td>${b.client}</td><td>${b.apartmentName}</td><td>${b.checkin} → ${b.checkout}</td>
            <td>${b.adults + b.children + b.infants}</td><td>${b.total} MAD</td>
            <td><span class="${b.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}">${b.status === 'confirmed' ? 'Confirmée' : 'En attente'}</span></td>
            <td>
                ${b.status !== 'confirmed' ? `<button class="btn-edit" onclick="confirmBooking(${b.id})">Confirmer</button>` : ''}
                <button class="btn-danger" onclick="deleteBooking(${b.id})">Annuler</button>
            </td>
        </tr>
    `).join('');
}

function confirmBooking(id) {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
        booking.status = 'confirmed';
        // Ajouter aux dates réservées de l'appartement
        const apt = apartments.find(a => a.id === booking.apartmentId);
        if (apt) {
            if (!apt.bookedDates) apt.bookedDates = [];
            let current = new Date(booking.checkin);
            const end = new Date(booking.checkout);
            while (current < end) {
                const dateStr = formatDate(current);
                if (!apt.bookedDates.includes(dateStr)) apt.bookedDates.push(dateStr);
                current.setDate(current.getDate() + 1);
            }
        }
        saveAllData();
        loadBookingsTable();
        loadApartmentsTable();
    }
}

function deleteBooking(id) {
    if (confirm('Annuler cette réservation ?')) {
        bookings = bookings.filter(b => b.id !== id);
        saveAllData();
        loadBookingsTable();
    }
}

function renderAmenitiesCheckboxes() {
    const container = document.getElementById('amenitiesList');
    if (!container) return;
    container.innerHTML = allAmenitiesList.map(am => `
        <label class="amenity-check"><input type="checkbox" value="${am}"> ${am}</label>
    `).join('');
}

function openApartmentModal() {
    document.getElementById('aptModalTitle').innerText = 'Ajouter un appartement';
    document.getElementById('aptId').value = '';
    document.getElementById('aptName').value = '';
    document.getElementById('aptLocation').value = '';
    document.getElementById('aptPrice').value = '';
    document.getElementById('aptMaxGuests').value = '';
    document.getElementById('aptImage').value = '';
    document.getElementById('aptImages').value = '';
    document.getElementById('aptDesc').value = '';
    document.getElementById('aptMapLink').value = '';
    document.getElementById('aptBookedDates').value = '';
    document.querySelectorAll('#amenitiesList input').forEach(cb => cb.checked = false);
    document.getElementById('aptModal').style.display = 'flex';
}

function editApartment(id) {
    const apt = apartments.find(a => a.id === id);
    if (apt) {
        document.getElementById('aptModalTitle').innerText = 'Modifier l\'appartement';
        document.getElementById('aptId').value = apt.id;
        document.getElementById('aptName').value = apt.name;
        document.getElementById('aptLocation').value = apt.location;
        document.getElementById('aptPrice').value = apt.price;
        document.getElementById('aptMaxGuests').value = apt.maxGuests;
        document.getElementById('aptImage').value = apt.image;
        document.getElementById('aptImages').value = (apt.images || []).join(',');
        document.getElementById('aptDesc').value = apt.description;
        document.getElementById('aptMapLink').value = apt.mapLink || '';
        document.getElementById('aptBookedDates').value = (apt.bookedDates || []).join(',');
        
        document.querySelectorAll('#amenitiesList input').forEach(cb => {
            cb.checked = (apt.amenities || []).includes(cb.value);
        });
        document.getElementById('aptModal').style.display = 'flex';
    }
}

function saveApartment() {
    const id = document.getElementById('aptId').value;
    const selectedAmenities = [];
    document.querySelectorAll('#amenitiesList input:checked').forEach(cb => {
        selectedAmenities.push(cb.value);
    });
    
    const imagesStr = document.getElementById('aptImages').value;
    const images = imagesStr ? imagesStr.split(',').map(s => s.trim()) : [];
    const bookedDatesStr = document.getElementById('aptBookedDates').value;
    const bookedDates = bookedDatesStr ? bookedDatesStr.split(',').map(s => s.trim()) : [];
    
    const aptData = {
        id: id ? parseInt(id) : Math.max(...apartments.map(a => a.id), 0) + 1,
        name: document.getElementById('aptName').value,
        location: document.getElementById('aptLocation').value,
        price: parseInt(document.getElementById('aptPrice').value),
        maxGuests: parseInt(document.getElementById('aptMaxGuests').value),
        rating: 4.5,
        image: document.getElementById('aptImage').value,
        images: images,
        description: document.getElementById('aptDesc').value,
        amenities: selectedAmenities,
        mapLink: document.getElementById('aptMapLink').value,
        bookedDates: bookedDates
    };
    
    if (id) {
        const index = apartments.findIndex(a => a.id === parseInt(id));
        if (index !== -1) apartments[index] = aptData;
    } else {
        apartments.push(aptData);
    }
    
    saveAllData();
    closeModal();
    loadApartmentsTable();
    if (window.location.pathname.includes('apartment.html')) location.reload();
}

function deleteApartment(id) {
    if (confirm('Supprimer cet appartement ?')) {
        apartments = apartments.filter(a => a.id !== id);
        saveAllData();
        loadApartmentsTable();
    }
}

function openReviewModal() {
    document.getElementById('reviewId').value = '';
    document.getElementById('reviewName').value = '';
    document.getElementById('reviewCity').value = '';
    document.getElementById('reviewRating').value = '5';
    document.getElementById('reviewText').value = '';
    document.getElementById('reviewModal').style.display = 'flex';
}

function editReview(id) {
    const review = reviews.find(r => r.id === id);
    if (review) {
        document.getElementById('reviewId').value = review.id;
        document.getElementById('reviewName').value = review.name;
        document.getElementById('reviewCity').value = review.city;
        document.getElementById('reviewRating').value = review.rating;
        document.getElementById('reviewText').value = review.text;
        document.getElementById('reviewModal').style.display = 'flex';
    }
}

function saveReview() {
    const id = document.getElementById('reviewId').value;
    const reviewData = {
        id: id ? parseInt(id) : Math.max(...reviews.map(r => r.id), 0) + 1,
        name: document.getElementById('reviewName').value,
        city: document.getElementById('reviewCity').value,
        rating: parseFloat(document.getElementById('reviewRating').value),
        text: document.getElementById('reviewText').value,
        visible: true,
        date: formatDate(new Date())
    };
    
    if (id) {
        const index = reviews.findIndex(r => r.id === parseInt(id));
        if (index !== -1) reviews[index] = reviewData;
    } else {
        reviews.push(reviewData);
    }
    
    saveAllData();
    closeModal();
    loadReviewsAdmin();
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        updateReviewsCarousel();
    }
}

function deleteReview(id) {
    if (confirm('Supprimer cet avis ?')) {
        reviews = reviews.filter(r => r.id !== id);
        saveAllData();
        loadReviewsAdmin();
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
            updateReviewsCarousel();
        }
    }
}

function toggleReview(id) {
    const review = reviews.find(r => r.id === id);
    if (review) review.visible = !review.visible;
    saveAllData();
    loadReviewsAdmin();
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        updateReviewsCarousel();
    }
}

function showTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`${tab}Tab`).classList.add('active');
    event.target.classList.add('active');
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
}

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const msg = document.getElementById('contactMsg').value;
        const whatsappMsg = `Bonjour, je suis ${name} (${email}). ${msg}`;
        window.open(`https://wa.me/212600000000?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
        alert('Message envoyé !');
        contactForm.reset();
    });
}

// ========================================
// MENU MOBILE & INIT
// ========================================
document.querySelector('.mobile-menu')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
});

// Initialisation
initData();

// Page accueil
if (document.getElementById('apartmentsList')) {
    displayApartments();
    updateReviewsCarousel();
    document.querySelector('.carousel-prev')?.addEventListener('click', prevReviews);
    document.querySelector('.carousel-next')?.addEventListener('click', nextReviews);
}

// Page détail
if (window.location.pathname.includes('apartment.html')) {
    loadApartmentDetail();
}

// Page admin
if (window.location.pathname.includes('admin.html')) {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminData();
    }
}