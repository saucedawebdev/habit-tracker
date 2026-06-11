const counter = document.getElementById('counter');
const completBtn = document.getElementById('completBtn');
const message = document.getElementById('specialMessage');
const resetBtn = document.getElementById('resetBtn');
const progressBar = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');
const GOAL = 30;
const badgeList = document.getElementById('badgeList');

const badges = [
    { id: 'week1',  days: 7,  icon: '🔥',  title: 'One Week',  desc: '7 days'},
    { id: 'week2',  days: 14,  icon: '🌟',  title: 'Two Weeks',  desc: '14 days'},
    { id: 'week3',  days: 21,  icon: '💪🏻',  title: 'Three Weeks',  desc: '21 days'},
    { id: 'week4',  days: 30,  icon: '🏆',  title: 'Four Weeks',  desc: '30 days'},
];
let habitCount = 0;

const justEarned = badges.find(b => b.days === habitCount);
if (justEarned) {
    message.innerHTML = `🎉 Unlocked: ${justEarned.title}!`;
}




completBtn.addEventListener('click', function() {
    habitCount++;
    const justEarned = badges.find(b => b.days === habitCount);
if (justEarned) {
    message.innerHTML = `🎉 Unlocked: ${justEarned.title}!`;
}
if (habitCount === GOAL) {
    completBtn.disabled = true;
}
    updateCounter();
    
});
resetBtn.addEventListener('click', function() {
    habitCount = 0;
    updateCounter();
    message.innerHTML = "";
    completBtn.disabled = false;
});
function updateCounter() {
    counter.textContent = habitCount + " days completed";

    const percent = Math.min((habitCount /GOAL) * 100, 100);
    progressBar.style.width = percent + "%";
    progressLabel.textContent = percent + "%";
    updateBadges();
}

function renderBadges() {
    badgeList.innerHTML = badges.map(b => `
        <div class="badge locked" data-days="${b.days}" id="badge-${b.id}">
        <span class="badge-icon">${b.icon}</span>
        <span class="badge-title">${b.title}</span>
        <span class="badge-desc">${b.desc}</span>
        </div>
        `).join('');
    }

    function updateBadges(){
        badges.forEach(b => {
            const el = document.getElementById(`badge-${b.id}`);
            if (!el) return;
            const earned = habitCount >= b.days;
            el.classList.toggle('locked', !earned);
            el.classList.toggle('unlocked', earned);
        });
    }
    renderBadges();