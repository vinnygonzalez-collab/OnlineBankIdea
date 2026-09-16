const myElement = document.createElement('div');
myElement.textContent = '💲';

myElement.style.position = 'fixed';
myElement.style.top = '10px';
myElement.style.right = '10px';
myElement.style.fontSize = '40px';
myElement.style.color = 'black';
myElement.style.zIndex = '10';

const playground = document.getElementById('playground') || document.body;
playground.append(myElement);