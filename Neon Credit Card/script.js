// 
// CARD DATA CUSTOMIZATION
// Modify the values below to customize your card:
//
const cardData = {
    cardNumber: '4532 1234 5678 9012',
    cardholderName: 'ALEX MORGAN',
    expiryMonth: '12',
    expiryYear: '27',
    cvv: '123',
    issuer: 'NEON BANK',
    supportPhone: '+1 (800) 555-1234',
    supportEmail: 'support@neonbank.com',
    address: '123 Cyber Street, Tech City',
    socialLinks: {
        twitter: '#',
        facebook: '#',
        instagram: '#'
    }
};

// DOM Elements
const cardContainer = document.getElementById('cardContainer');
const flipBtn = document.getElementById('flipBtn');
const revealBtn = document.getElementById('revealBtn');
const copyNumberBtn = document.getElementById('copyNumberBtn');
const copySupportBtn = document.getElementById('copySupportBtn');
const toast = document.getElementById('toast');

// Display Elements
const cardNumberDisplay = document.getElementById('cardNumberDisplay');
const cardholderName = document.getElementById('cardholderName');
const expiry = document.getElementById('expiry');
const issuerLogo = document.getElementById('issuerLogo');
const cvvDisplay = document.getElementById('cvvDisplay');
const bankInfo = document.getElementById('bankInfo');

// Initialize card data
function initCard() {
    cardNumberDisplay.textContent = cardData.cardNumber;
    cardholderName.textContent = cardData.cardholderName;
    expiry.textContent = `${cardData.expiryMonth}/${cardData.expiryYear}`;
    issuerLogo.textContent = cardData.issuer;

    // Update bank info
    bankInfo.innerHTML = `
                ${cardData.issuer}<br>
                ${cardData.address}<br>
                Support: ${cardData.supportPhone}<br>
                ${cardData.supportEmail}
            `;
}

// Toggle card flip
function toggleFlip() {
    cardContainer.classList.toggle('flipped');

    // Add glitch effect on flip
    cardContainer.classList.add('glitch-effect');
    setTimeout(() => {
        cardContainer.classList.remove('glitch-effect');
    }, 300);
}

// Reveal/hide CVV
let cvvRevealed = false;
function toggleCVV() {
    if (cvvRevealed) {
        cvvDisplay.textContent = '***';
        revealBtn.textContent = 'Reveal CVV';
        cvvRevealed = false;
    } else {
        cvvDisplay.textContent = cardData.cvv;
        revealBtn.textContent = 'Hide CVV';
        cvvRevealed = true;
    }
}

// Copy to clipboard
function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(message);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy');
    });
}

// Show toast notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Parallax effect
function handleMouseMove(e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    cardContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
}

// Reset parallax
function resetParallax() {
    cardContainer.style.transform = 'rotateY(0deg) rotateX(0deg)';
}

// Event Listeners
flipBtn.addEventListener('click', toggleFlip);
revealBtn.addEventListener('click', toggleCVV);
copyNumberBtn.addEventListener('click', () => {
    copyToClipboard(cardData.cardNumber, 'Card number copied!');
});
copySupportBtn.addEventListener('click', () => {
    const supportInfo = `Phone: ${cardData.supportPhone}\nEmail: ${cardData.supportEmail}`;
    copyToClipboard(supportInfo, 'Support info copied!');
});

// Keyboard interaction
cardContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFlip();
    }
});

// Parallax effect (mousemove)
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseleave', resetParallax);

// Initialize
initCard();

// Accessibility: Focus management
cardContainer.addEventListener('focus', () => {
    cardContainer.style.boxShadow = '0 0 20px var(--neon-primary)';
});

cardContainer.addEventListener('blur', () => {
    cardContainer.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.5), 0 0 30px rgba(255, 0, 200, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.1)';
});