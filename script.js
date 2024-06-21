const productList = [
    {
        name: 'Гамбургер простой',
        price: 10000,
        kkal: 500,
        amount: 0,
        get Summa(){
            return this.price * this.amount;
        },
        get Kkal(){
            return this.kkal * this.amount;
        }
    },
    {
        name: 'Гамбургер FRESH',
        price: 20500,
        kkal: 700,
        amount: 0,
        get Summa(){
            return this.price * this.amount;
        },
        get Kkal(){
            return this.kkal * this.amount;
        }
    },
    {
        name: 'FRESH Combo',
        price: 31900,
        kkal: 1200,
        amount: 0,
        get Summa(){
            return this.price * this.amount;
        },
        get Kkal(){
            return this.kkal * this.amount;
        }
    }
]

const extraProduct = {
    doubleMayonnaise: {
        price: 2000,
        name: 'Двойной майонез',
        kkal: 300
    },
    lettuce: {
        price: 1000,
        name: 'Салатный лист',
        kkal: 30
    },
    cheese: {
        price: 3000,
        name: 'Сыр',
        kkal: 350
    }
}

const   products        = [...document.querySelectorAll('.main__product')],
        btnPlusMinus    = [...document.querySelectorAll('.main__product-btn')],
        checkExtra      = [...document.querySelectorAll('.main__product-checkbox')]

btnPlusMinus.forEach(btn => {
    btn.addEventListener('click', plusMinus)
})

function plusMinus(){
    const   parent      = this.closest('.main__product'),
            parentIndex = products.indexOf(parent), // 1
            outAmount   = parent.querySelector('.main__product-num'), 
            outPrice    = parent.querySelector('.main__product-price span'),
            outKkal     = parent.querySelector('.main__product-call'),
            btnSymbol   = this.getAttribute('data-symbol');
    
    if(btnSymbol === '+' && productList[parentIndex].amount < 15){
        productList[parentIndex].amount++;
    }
    else if(btnSymbol === '-' && productList[parentIndex].amount > 0){
        productList[parentIndex].amount--;
    }
    
    const {amount, Kkal, Summa} = productList[parentIndex];
    
    outAmount.innerHTML = amount;
    outPrice.innerHTML = Summa.toLocaleString();
    outKkal.innerHTML = Kkal.toLocaleString();
}

checkExtra.forEach(checkbox => {
    checkbox.addEventListener('input', check)
})

function check(){
    const   parent      = this.closest('.main__product'),
            parentIndex = products.indexOf(parent),
            outPrice    = parent.querySelector('.main__product-price span'),
            outKkal     = parent.querySelector('.main__product-call'),
            attr        = this.getAttribute('data-extra');
    
    
    productList[parentIndex][attr] = this.checked;
    
    if(this.checked){
        productList[parentIndex].price += extraProduct[attr].price;
        productList[parentIndex].kkal += extraProduct[attr].kkal;
    }
    else{
        productList[parentIndex].price -= extraProduct[attr].price;
        productList[parentIndex].kkal -= extraProduct[attr].kkal;
    }
    
    const {Summa, Kkal} = productList[parentIndex];
    outPrice.innerHTML = Summa.toLocaleString();
    outKkal.innerHTML = Kkal.toLocaleString();
}

const receiptWindo = document.querySelector('.receipt');
const addCar = document.querySelector('.addCart');

addCar.addEventListener('click', () => {
    receiptWindo.classList.add('active')
})


const addCart = document.querySelector('.addCart');
const receiptWindow = document.querySelector('.receipt');
const receiptOut = document.querySelector('.receipt__window-out');
const payButton = document.querySelector('.receipt__window-btn');

addCart.addEventListener('click', () => {
    // Очищаем содержимое чека перед добавлением новой информации
    receiptOut.innerHTML = '';

    // Перебираем все продукты
    products.forEach((product, index) => {
        const { name, amount, Summa, Kkal } = productList[index];
        const selectedExtras = [];

        // Перебираем дополнительные товары
        Object.keys(extraProduct).forEach(attr => {
            if (productList[index][attr]) {
                selectedExtras.push(extraProduct[attr].name);
            }
        });

        // Если выбран хотя бы один товар, добавляем его в чек
        if (amount > 0) {
            const productInfo = `
                <div class="receipt__item">
                    <div>${name}</div>
                    <div>Количество: ${amount}</div>
                    <div>Сумма: ${Summa.toLocaleString()} сум</div>
                    <div>Калории: ${Kkal.toLocaleString()} ккал</div>
                    <div>Дополнительно: ${selectedExtras.join(', ')}</div>
                </div>
            `;
            receiptOut.insertAdjacentHTML('beforeend', productInfo);
        }
    });

    // Показываем чек
    receiptWindow.classList.add('active');

    // Активируем кнопку "Оплатить" только если выбран хотя бы один товар
    payButton.disabled = true;
    if (receiptOut.children.length > 0) {
        payButton.disabled = false;
    }
});

// Обработчик кнопки "Оплатить"
payButton.addEventListener('click', () => {
    // Здесь можно добавить логику для обработки оплаты
    // Например, переход к странице оплаты или отправка данных на сервер
    alert('Оплата прошла успешно!');
    // После оплаты можно сбросить содержимое чека и скрыть его
    receiptOut.innerHTML = '';
    receiptWindow.classList.remove('active');
});


