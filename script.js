const themes = [
    {
        name: 'ocean',
        message: '🌊 Deep ocean vibes with calming blue waves'
    },
    {
        name: 'forest',
        message: '🌲 Fresh forest air with whispers of green magic'
    },
    {
        name: 'sunset',
        message: '🌅 Golden hour warmth painting the sky orange'
    },
    {
        name: 'midnight',
        message: '🌙 Smooth jazz under a blanket of stars'
    }
];

const themeButton = document.getElementById('theme-switcher-button');
const themeDropdown = document.getElementById('theme-dropdown');
const themeMessage = document.getElementById('theme-message');
const menuItems = document.querySelectorAll('[role="menuitem"]');
const body = document.body;

let isMenuOpen = false;

function openMenu() {
    isMenuOpen = true;
    themeDropdown.removeAttribute('hidden');
    themeButton.setAttribute('aria-expanded', 'true');

    setTimeout(() => {
        menuItems[0]?.focus();
    }, 50);
}

function closeMenu() {
    isMenuOpen = false;
    themeDropdown.setAttribute('hidden', '');
    themeButton.setAttribute('aria-expanded', 'false');
    themeButton.focus();
}

function toggleMenu() {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}


function applyTheme(themeName) {
    const selectedTheme = themes.find(t => t.name === themeName);

    if (!selectedTheme) return;

    themes.forEach(theme => {
        body.classList.remove(`theme-${theme.name}`);
    });

    body.classList.add(`theme-${themeName}`);

    themeMessage.textContent = selectedTheme.message;

    closeMenu();
}

themeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
});

menuItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.stopPropagation();
        const themeName = item.id.replace('theme-', '');
        applyTheme(themeName);
    });

    item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const themeName = item.id.replace('theme-', '');
            applyTheme(themeName);
        }
    });
});

themeButton.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' && !isMenuOpen) {
        event.preventDefault();
        openMenu();
    } else if (event.key === 'Escape' && isMenuOpen) {
        event.preventDefault();
        closeMenu();
    }
});
document.addEventListener('click', (event) => {
    const isClickInside = themeButton.contains(event.target) || 
                          (themeDropdown && themeDropdown.contains(event.target));

    if (!isClickInside && isMenuOpen) {
        closeMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
    }
});

applyTheme('ocean');

window.themes = themes;
window.applyTheme = applyTheme;