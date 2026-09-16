function Greeting(){
    console.log("Hello, welcome to Cha-Ching International Bank!");
}

Greeting();

const playground = document.getElementById('playground');

if (playground) {
    const moneySymbols = ['💵', '💸', '💰', '🪙'];

    for (let i = 0; i < 12; i++) {
        const flyingMoney = document.createElement('div');
        flyingMoney.className = 'money-bill';
        flyingMoney.textContent = moneySymbols[i % moneySymbols.length];
        flyingMoney.style.left = `${Math.random() * 100}%`;
        flyingMoney.style.animationDelay = `${i * 0.35}s`;
        flyingMoney.style.animationDuration = `${6 + Math.random() * 4}s`;
        flyingMoney.style.fontSize = `${24 + Math.random() * 28}px`;
        playground.appendChild(flyingMoney);
    }
}