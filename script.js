// берём все элементы с классом "galary-button" на странице
var galaryButtons = document.getElementsByClassName("galary-button");

// проходимся циклом по полученной коллекции эелемнтов
for (var i = 0; i < galaryButtons.length; i++) {
    // каждому эелементу вешаем обработчик клика
    galaryButtons[i].addEventListener("click", function(event) {
        // этот обработчик события будет добавлять/удалять css класс "show-galary" у секции
        // в которой находится кликнутая кнопка

        // когда произошёл клик, берём кликнутую кнопку из обьекта event, который
        // автоматически передаётся параметром в функцию-обработчик события
        // элемент, на котором произошёл клик, находится в свойстве target объекта event
        var button = event.target;

        // получив кнопку, мы можем получить доступ к её родительскому элементу (та самая секция)
        // получить родительский элемент мы можем с помощью свойства parentNode
        // и теперь мы у этой секции "туглим" класс "show-galary":
        // если в момент клика секция имеет такой класс, метод toggle удалит его
        // в противном случае наоборот - добавит
        // документация свойства classList элемента https://learn.javascript.ru/attributes-and-custom-properties#klassy-v-vide-obekta-classlist
        button.parentNode.classList.toggle("show-galary");
    });
}

// находим галерею секции юзеров с помощью querySelector
// этот метод позволяет отыскать элемент на странице с помощью его css селектора
// обязательно почитай и запомни методы поиска элементов на странице https://learn.javascript.ru/searching-elements-dom
var usersGalary = document.querySelector('.clients .galary');

// создаём экземпляр XMLHttpRequest. Про него тоже обязательно почитай/посмотри!
var request = new XMLHttpRequest();

// вызываем его метод open. В данном случае передаём ему тип запроса первым параметром, и url запроса вторым
request.open("GET", "https://randomuser.me/api/?results=5");

// вешаем обработчик на событие загрузки (значит, что запрос отработал и данные с сревера загрузились)
request.onload = function() {
    // в этом обратботчике мы обработаем ответ от сервера и добавим элементы в DOM, на основе полученных данных

    // ответ от сервера находится в свойстве response объекта request
    // ответ приходит в формате JSON (грубо говоря, json - строковое представление js-объектов)
    // превращаем json в js-объект с помощью JSON.parse
    // и записываем в переменную users массив юзеров, котрый находится в свойстве results полученного с сервера объекта
    // ОБЯЗАЕТЛЬНО ПОЧИТАЙ/ПОСМОТРИ, ЧТО ТАКОЕ JSON И КАК В JS С НИМ РАБОТАТЬ !!!
    var users = JSON.parse(request.response).results

    // идём циклом по массиву юзеров
    for (var i = 0; i < users.length; i++) {
        // берём текущего юзера и записываем его в переменную user, чтобы нам в дальнейшем было удобнее к нему обращаться
        var user = users[i];
        
        // АХТУНГ, ОБЯЗАТЕЛЬНО РАЗБЕРИСЬ, КАК ДОБАВЛЯТЬ И ИЗМЕНЯТЬ ЭЛЕМЕНТЫ В DOM
        // ЧТОБЫ СЛЕДУЮЩИЕ СТРОКИ КОДА БЫЛИ ДЛЯ ТЕБЯ ПОЛНОСТЬЮ ПОНЯТНЫ!!1!2!1!1!1!1!11!

        // Создаём заголовок h3
        var userName = document.createElement('h3');
        // в него помещаем строку с именем, пробелом и фамилией рандомного юзера
        userName.innerText = user.name.first + ' ' + user.name.last;

        // создаём элемент img
        var userImage = document.createElement('img');
        // в качестве его свойства src устанавливаем самую большую аву юзера
        userImage.src = user.picture.large;

        // создаём div, который будет контейнером для имени и авы
        var userBlock = document.createElement('div');
        // запихиваем в него аву и имя
        userBlock.appendChild(userImage);
        userBlock.appendChild(userName);
        
        // добавляем наш контейнер с именем и авой в галерею юзеров
        usersGalary.appendChild(userBlock);
    }
}

// отправляем запрос
// когда придёт ответ с randomuser, выполнится обработчик события onload
request.send();
