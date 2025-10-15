const startButton = document.getElementById('start-button');
const messageDisplay = document.getElementById('message');
const body = document.body;
const inputArea = document.getElementById('input-area');
const nameInput = document.getElementById('name-input');
const confirmButton = document.getElementById('confirm-button');
const giftArea = document.getElementById('gift-area');
const giftBox = document.getElementById('gift-box');
const giftContent = document.getElementById('gift-content');
const finalInstructions = document.getElementById('final-instructions');
const errorMessage = document.getElementById('error-message');

const targetMessages = [
    "Ты Сандра?",
    "Если да, то напиши своё имя"
];
// 1 минута (60000 мс) / 50 символов (приблизительно) = 1.2 секунды на символ
const typingSpeed = 60000 / 50; 
let messageIndex = 0;
let charIndex = 0;
let isTyping = false;

// === Функция для медленного печатания ===
function typeWriter() {
    if (isTyping) return;
    isTyping = true;
    startButton.style.display = 'none'; // Скрыть кнопку после старта
    messageDisplay.innerHTML = '';
    messageIndex = 0;

    function typeNextChar() {
        if (messageIndex < targetMessages.length) {
            const currentTarget = targetMessages[messageIndex];
            if (charIndex < currentTarget.length) {
                messageDisplay.innerHTML += currentTarget.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, typingSpeed);
            } else {
                messageDisplay.innerHTML += '<br>';
                messageIndex++;
                charIndex = 0;
                if (messageIndex < targetMessages.length) {
                    setTimeout(typeNextChar, typingSpeed * 5); 
                } else {
                    isTyping = false;
                    inputArea.style.display = 'flex'; // Показать поле ввода
                    nameInput.focus();
                }
            }
        }
    }
    typeNextChar();
}

// === Проверка имени и переход ===
function checkName() {
    const enteredName = nameInput.value.trim();

    if (enteredName.toLowerCase() === 'сандра') {
        errorMessage.style.display = 'none';
        transitionToGiftStage();
    } else {
        errorMessage.textContent = 'Неправильное имя. Попробуйте снова.';
        errorMessage.style.display = 'block';
        nameInput.value = '';
        nameInput.focus();
    }
}

function transitionToGiftStage() {
    inputArea.style.display = 'none';
    messageDisplay.style.display = 'none';
    // Смена фона с желтого на красный
    body.classList.remove('stage-1');
    body.classList.add('stage-2');
    giftArea.style.display = 'block';
    
    // Если нужно "сохранение данных" (одноразовость), раскомментируйте:
    // localStorage.setItem('gift_shown_sandra', 'true');
}

// === Открытие подарка ===
function openGift() {
    if (giftBox.classList.contains('opened')) return;

    giftBox.classList.add('opened');
    giftContent.textContent = 'Баба'; // Секретное слово

    // Медленное печатание финального текста
    setTimeout(() => {
        const finalMsg = "Пришли секретное слово щеночку Онли в телеграме!";
        let finalCharIndex = 0;
        const finalTypingSpeed = 100;
        finalInstructions.innerHTML = '';

        function typeFinal() {
            if (finalCharIndex < finalMsg.length) {
                finalInstructions.innerHTML += finalMsg.charAt(finalCharIndex);
                finalCharIndex++;
                setTimeout(typeFinal, finalTypingSpeed);
            }
        }
        typeFinal();
    }, 1500); 
}

// === Обработчики событий ===
startButton.addEventListener('click', typeWriter);
confirmButton.addEventListener('click', checkName);
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkName();
    }
});
giftBox.addEventListener('click', openGift);

// === Запрет копирования/выделения ===
document.addEventListener('copy', (e) => {
    e.preventDefault();
    alert('Копирование запрещено!');
});

document.addEventListener('selectstart', (e) => {
    // Запрещаем выделение, если это не поле ввода
    if (e.target.tagName !== 'INPUT') {
        e.preventDefault();
    }
});
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Секретное послание</title>
    <style>
        /* CSS-код будет здесь */
    </style>
</head>
<body class="stage-1" oncontextmenu="return false;">
    <div id="container">
        <button id="start-button">Узнать что будет дальше</button>
        <div id="message"></div>

        <div id="input-area" style="display: none;">
            <input type="text" id="name-input" placeholder="Введите имя" autocomplete="off">
            <button id="confirm-button">Подтвердить</button>
            <div id="error-message"></div>
        </div>

        <div id="gift-area" style="display: none;">
            <div id="gift-box">
                <div id="gift-content"></div> 
            </div>
            <div id="final-instructions"></div>
        </div>
    </div>

    <script>
        /* JavaScript-код будет здесь */
    </script>
</body>
</html>


