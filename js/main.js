const $container = document.getElementById('header-container'),  //Обращение к существующим полям
    $form = document.getElementById('word'),
    $inputWord = document.querySelector('.start-word__input')
    $btnNewWord = document.querySelector('.start-word__btn');

const $field = document.createElement('form'),                  //Объявление новых полей
    $btnSelectWord = document.createElement('button'),
    $btnCheckWord = document.createElement('button');

let newWord = [];                                               //Массив для нового слова
      
//отрисовка игрового поля с введенным словом
$form.addEventListener('submit', (event) => {
    event.preventDefault()
    let word = [], begin = ['', '', '', '', '', '', '', '', '', ''], end = ['', '', '', '', '', '', '', '', '', ''];

    word = $inputWord.value.split('');

    let wordAll = [...begin, ...word, ...end];                  //Массив для заполнения ячеек
    
    createdField(wordAll);

    $inputWord.value = '';
});

//создание ячейки
function createdLitera(prop) {
    const $litera = document.createElement('input');

    $litera.value = prop;
    $litera.setAttribute('maxlength', 1);
    $litera.setAttribute('type', 'text');
    $litera.classList.remove('active');
    $litera.classList.add('litera');

    return $litera
};

//Создание игрового поля
function createdField(arr) {
    let copyArr = arr;

    $field.innerHTML = '';

    for (const i of copyArr) {           
        $field.append(createdLitera(i))
    };

    $btnSelectWord.classList.add('select-word');
    $btnSelectWord.textContent = 'Выбрать слово';

    $btnCheckWord.classList.add('check-word');
    $btnCheckWord.textContent = 'Проверить слово';

    $field.append($btnSelectWord, $btnCheckWord);
    $field.classList.add('game-field');
    $container.append($field);

    return $field
};

//Сделать недоступными все ячейки, кроме введенной
$field.addEventListener('input', (el) => {
    el.target.classList.add('new');

    document.querySelectorAll('.litera').forEach(e => {
        if (!e.classList.contains('new'))
                e.setAttribute("readonly", true);
        });
});

$field.addEventListener('submit', (e) => {
    e.preventDefault();
       newWord = [];

    //Выделение слова
    document.querySelectorAll('.litera').forEach(el => {        
        el.addEventListener('click', () => {            
            el.classList.remove('active');
            el.classList.toggle('active'); 
            newWord.push(el.value);             
        });
    
    });       

});

//Проверка слова
$btnCheckWord.addEventListener('click', () => {
    rezult(newWord);
});

//Отрисовка результата
function rezult(arr) {
    const $rezult = document.createElement('div'),
        $wordField = document.createElement('div'),
        $points = document.createElement('div'),
        $next = document.createElement('button');
    let copyArr = arr, arr2 = [];        

    $rezult.innerHTML = '';

    $wordField.classList.add('word-field');
    $wordField.textContent = copyArr.join('');;
    $points.classList.add('points');
    $points.textContent = '20';

    $next.classList.add('next');
    $next.textContent = 'Следующая буква';

    $rezult.append($wordField, $points);
    $rezult.classList.add('rezult');
    $container.append($rezult, $next);

    $next.addEventListener('click', () => {
        document.querySelectorAll('.litera').forEach(elem => {
            arr2.push(elem.value);
            createdField(arr2);
            if ($rezult) {
                $rezult.remove();
                $next.remove();
                $wordField.textContent = '';
                $points.textContent = '';
            };
        });
        console.log('arr2');
    })
};
