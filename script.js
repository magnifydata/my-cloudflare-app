const helloWorldText = document.getElementById('hello-world');
const colorButton = document.getElementById('color-button');

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1'];
let currentColorIndex = 0;

colorButton.addEventListener('click', () => {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    helloWorldText.style.color = colors[currentColorIndex];
});
