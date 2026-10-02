/* ============================================
   ROOM DATA
============================================ */
const rooms = [
    {
        id: 1,
        name: "Standard Double Room",
        price: 750,
        desc: "Cozy and comfortable, perfect for solo travellers or couples. Includes a queen bed, en-suite bathroom, and garden view.",
        img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        amenities: ["Queen Bed", "Wi-Fi", "Breakfast"]
    },
    {
        id: 2,
        name: "Deluxe Twin Room",
        price: 950,
        desc: "Spacious room with two single beds, private balcony, and premium linens. Ideal for friends or colleagues.",
        img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        amenities: ["Twin Beds", "Balcony", "Breakfast"]
    },
    {
        id: 3,
        name: "Executive Suite",
        price: 1450,
        desc: "Our finest suite with king bed, separate lounge area, and a large private terrace overlooking the garden.",
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        amenities: ["King Bed", "Lounge", "Terrace", "Breakfast"]
    },
    {
        id: 4,
        name: "Family Cottage",
        price: 1800,
        desc: "Standalone cottage with two bedrooms, kitchenette, and private garden. Perfect for families.",
        img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        amenities: ["2 Bedrooms", "Kitchenette", "Garden"]
    }
];

/* ============================================
   RENDER ROOMS
============================================ */
function renderRooms(targetId = 'rooms-grid', limit = null) {
    const grid = document.getElementById(targetId);
    if (!grid) return;

    grid.innerHTML = '';
    const list = limit ? rooms.slice(0, limit) : rooms;

    list.forEach(room => {
        const amenitiesHTML = room.amenities.map(a => `<span><i class="fas fa-check"></i> ${a}</span>`).join('');
        grid.innerHTML += `
            <div class="room-card">
                <div class="room-img">
                    <img src="${room.img}" alt="${room.name}">
                    <div class="room-price-tag">P${room.price}/night</div>
                </div>
                <div class="room-info">
                    <h3>${room.name}</h3>
                    <p>${room.desc}</p>
                    <div class="room-amenities">${amenitiesHTML}</div>
                    <a href="booking.html" class="btn btn-gold" style="width: 100%; text-align: center;">Book This Room</a>
                </div>
            </div>
        `;
    });
}

/* ============================================
   BOOKING FORM
============================================ */
function submitBooking(e) {
    e.preventDefault();
    const name = document.getElementById('book-name')?.value || 'Guest';
    alert(`Thank you, ${name}! Your booking request has been received. We will confirm availability via email within 24 hours.`);
    e.target.reset();
}

/* ============================================
   CONTACT FORM
============================================ */
function submitContact(e) {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    e.target.reset();
}

/* ============================================
   HOME PAGE SEARCH BAR
============================================ */
function searchAvailability(e) {
    e.preventDefault();
    const checkin = document.getElementById('checkin')?.value;
    const checkout = document.getElementById('checkout')?.value;
    const guests = document.getElementById('guests')?.value;

    if (!checkin || !checkout) {
        alert("Please select both check-in and check-out dates.");
        return;
    }
    if (new Date(checkin) >= new Date(checkout)) {
        alert("Check-out date must be after check-in date.");
        return;
    }
    alert(`Checking availability for ${guests} guest(s) from ${checkin} to ${checkout}.\n\nRedirecting to booking page...`);
    setTimeout(() => { window.location.href = 'booking.html'; }, 800);
}

/* ============================================
   INITIALIZATION
============================================ */
document.addEventListener('DOMContentLoaded', () => {
    renderRooms('featured-rooms', 3);  // Home page shows 3
    renderRooms('all-rooms');          // Rooms page shows all

    // Set minimum date on booking inputs to today
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.min = today;
    });
});
