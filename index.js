// Получаем все кнопки и операторы
let keys = document.querySelectorAll('#calculator span');
let operators = ['+', '-', 'x', '÷'];
let decimalAdded = false;

// Получаем экран калькулятора
let input = document.querySelector('.screen');

// Обработчик ошибок
window.addEventListener('error', function (event) {
    console.error('Ошибка:', event.error);
    input.innerHTML = 'Ошибка';
    decimalAdded = false;
});

// Функция для безопасного вычисления
function calculate(equation) {
    try {
        // Заменяем x и ÷ на * и / соответственно
        equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
        // Используем Function constructor для создания безопасной функции и вычисляем результат
        const result = new Function('return ' + equation)();
        // Возвращаем результат
        return result;
    } catch (error) {
        console.error('Ошибка при вычислении:', error);
        throw new Error('Ошибка при вычислении');
    }
}

// Добавляем обработчик события для каждой кнопки
for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = function (e) {
        // Получаем текущее значение на экране и значение кнопки
        let inputVal = input.innerHTML;
        let btnVal = this.innerHTML;

        // Обработка нажатия кнопок
        if (btnVal == 'C') {
            // Очищаем экран и сбрасываем флаг для десятичной точки
            input.innerHTML = '';
            decimalAdded = false;
        } else if (btnVal == '=') {
            try {
                // Обрабатываем вычисление результата безопасным способом
                input.innerHTML = calculate(inputVal);
                decimalAdded = false;
            } catch (error) {
                // В случае ошибки выводим сообщение на экран
                input.innerHTML = 'Ошибка';
                decimalAdded = false;
            }
        } else if (btnVal == '+/-') {
            // Меняем знак числа
            if (inputVal !== '' && inputVal !== 'Ошибка') {
                input.innerHTML = parseFloat(inputVal) * -1;
            }
        } else if (btnVal == '%') {
            // Вычисляем процент от числа
            if (inputVal !== '' && inputVal !== 'Ошибка') {
                input.innerHTML = parseFloat(inputVal) / 100;
            }
        } else if (btnVal == '←') {
            // Удаляем последний символ
            if (inputVal !== '' && inputVal !== 'Ошибка') {
                input.innerHTML = inputVal.slice(0, -1);
            }
        } else if (operators.indexOf(btnVal) > -1) {
            // Обрабатываем нажатие операторов
            let lastChar = inputVal[inputVal.length - 1];

            if (inputVal != '' && operators.indexOf(lastChar) == -1)
                input.innerHTML += btnVal;
            else if (inputVal == '' && btnVal == '-')
                input.innerHTML += btnVal;

            if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                input.innerHTML = inputVal.replace(/.$/, btnVal);
            }

            decimalAdded = false;
        } else if (btnVal == '.') {
            // Обрабатываем нажатие десятичной точки
            if (!decimalAdded) {
                input.innerHTML += btnVal;
                decimalAdded = true;
            }
        } else {
            // Добавляем значение на экран
            input.innerHTML += btnVal;
        }

        // Предотвращаем переход по ссылке при клике на кнопку
        e.preventDefault();
    };
}
