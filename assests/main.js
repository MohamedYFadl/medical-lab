tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                cairo: ['Cairo', 'sans-serif'],
                tajawal: ['Tajawal', 'sans-serif'],
            },
            colors: {
                medical: {
                    blue: '#1A73C8',
                    dark: '#0D4F8B',
                    light: '#EBF5FF',
                    cyan: '#E0F7FA',
                    cyanDark: '#00ACC1',
                    gray: '#F5F7FA',
                    grayMid: '#8A9BB0',
                    text: '#1C2B40',
                },
            },
            boxShadow: {
                card: '0 4px 24px rgba(26,115,200,0.10)',
                hero: '0 8px 40px rgba(26,115,200,0.18)',
            },
            animation: {
                'fade-up': 'fadeUp 0.7s ease both',
                'fade-in': 'fadeIn 0.6s ease both',
                'float': 'float 4s ease-in-out infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
            },
            keyframes: {
                fadeUp: { from: { opacity: 0, transform: 'translateY(28px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
                fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
                float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
            },
        },
    },
};
// ── Mobile menu toggle ──────────────────────
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const openIcon = document.getElementById('menu-open-icon');
const closeIcon = document.getElementById('menu-close-icon');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// Close mobile menu when link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

// ── Scroll-reveal ──────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ── Nav scroll effect ──────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.style.boxShadow = '0 4px 24px rgba(26,115,200,0.12)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// ── Service selection radio ─────────────────
function selectService(radio) {
    document.querySelectorAll('[id^="label-"]').forEach(l => {
        l.style.borderColor = '#e5e7eb';
    });
    const labelId = 'label-' + radio.value;
    document.getElementById(labelId).style.borderColor = '#1A73C8';
}

// ── Form submission ────────────────────────
function submitForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !phone) {
        showError('يرجى تعبئة الاسم ورقم الهاتف على الأقل');
        return;
    }
    if (phone.length < 10) {
        showError('يرجى إدخال رقم هاتف صحيح');
        return;
    }

    const area = document.getElementById('area').value;
    const tests = document.getElementById('tests').value.trim();
    const notes = document.getElementById('notes').value.trim();
    const svc = document.querySelector('input[name="service"]:checked');

    // Build WhatsApp message
    let msg = `مرحباً، أريد حجز موعد 🩺\n\n`;
    msg += `الاسم: ${name}\n`;
    msg += `الهاتف: ${phone}\n`;
    if (area) msg += `المنطقة: ${area}\n`;
    if (tests) msg += `التحاليل: ${tests}\n`;
    if (svc) msg += `نوع الخدمة: ${svc.value === 'visit' ? '🏠 زيارة منزلية' : '🏥 حضور للمختبر'}\n`;
    if (notes) msg += `ملاحظات: ${notes}\n`;

    // Show success UI
    const successEl = document.getElementById('form-success');
    successEl.classList.remove('hidden');
    setTimeout(() => {
        window.open('https://wa.me/201000000000?text=' + encodeURIComponent(msg), '_blank');
    }, 500);

    // Reset form
    ['name', 'phone', 'area', 'tests', 'notes'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.querySelectorAll('input[name="service"]').forEach(r => r.checked = false);
    document.querySelectorAll('[id^="label-"]').forEach(l => l.style.borderColor = '#e5e7eb');
}

function showError(msg) {
    const el = document.getElementById('form-success');
    el.style.background = '#FEF2F2';
    el.style.borderColor = '#FCA5A5';
    el.style.color = '#B91C1C';
    el.textContent = '⚠️ ' + msg;
    el.classList.remove('hidden');
    setTimeout(() => {
        el.classList.add('hidden');
        el.removeAttribute('style');
    }, 3000);
}

// ── Smooth scroll offset for sticky nav ─────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 72;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
    });
});
