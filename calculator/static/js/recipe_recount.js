window.onload = init;

var ingredients; // таблица ингридиентов
var initialForm; // исходная форма тортика
var initialArea; // исходная площадь
var initialWeight; // исходный вес
var initialDiameter; // исходный диаметр круглого торта
var initialLength; // исходная длина стороны для квадрата или прямоугольника
var initialWidth; // исходная ширина примоугольника
var ingredientsQuantity = []; // количество ингридиентов

var formSelector; // селектор выбора формы торта


function init() {
    fillVariables(); // инициализировать переменные начальными значениями
    formSelect(); // скрыть ненужные поля ввода

    var recount = document.getElementById("recount");
    recount.onclick = calculate; // перечсет ингридиентов по клику

    formSelector.addEventListener('change', formSelect); // скрыть ненужные поля ввода при выборе формы
}


function fillVariables () {
    ingredients = document.getElementsByClassName("value");
    formSelector = document.getElementById("form");
    initialForm = formSelector.value;
    initialWeight = parseFloat(document.getElementById("weight").value, 10);

    switch (initialForm) {
        case "c":
            initialDiameter = parseInt(document.getElementById("diameter").value, 10);
            initialArea = (Math.PI * Math.pow(initialDiameter, 2)) / 4;
            break;

        case "s":
            initialLength = parseInt(document.getElementById("length").value, 10);
            initialArea = Math.pow(initialLength, 2);
            break;

        case "r":
            initialLength = parseInt(document.getElementById("length").value, 10);
            initialWidth = parseInt(document.getElementById("width").value, 10);
            initialArea = initialLength * initialWidth;
            break;
    }


    for (var i = 0, len = ingredients.length; i < len; i++) {
        var ingredient = parseFloat(ingredients[i].innerHTML, 10);
        ingredientsQuantity.push(ingredient);
    }

    console.log("Initial form: " + initialForm);
    console.log("Initial area: " + initialArea);

}

function calculate() {
    var newArea = areaCalc();
    var vRatio = ratio(initialArea, newArea);
    recount(vRatio);
}


function areaCalc() {
    var newForm = document.getElementById("form").value

    switch (newForm) {
        case "c":
            newDiameter = parseInt(document.getElementById("diameter").value, 10);
            return (Math.PI * Math.pow(newDiameter, 2)) / 4;

        case "s":
            newLength = parseInt(document.getElementById("length").value, 10);
            return Math.pow(newLength, 2);

        case "r":
            newLength = parseInt(document.getElementById("length").value, 10);
            newWidth = parseInt(document.getElementById("width").value, 10);
            return newLength * newWidth;
    }
}


function ratio(initialArea, newArea) {
    return newArea / initialArea; //вычисление коэффициента пересчета
}

function recount(ratio) {               // вычисление необходимого количества ингридиентов
    console.log("Ratio: " + ratio);
    for (var i = 0, len = ingredients.length; i < len; i++) {
        var value = ingredientsQuantity[i] * ratio;
        ingredients[i].innerHTML = value.toFixed(1);
    }
    document.getElementById("weight").value = (initialWeight * ratio).toFixed(1); // новый вес тортика
}

function formSelect() {
    var index = formSelector.selectedIndex;
    switch (index) {
        case 0: // круг
            document.getElementById("diameter_field").hidden = false;
            document.getElementById("length_field").hidden = true;
            document.getElementById("width_field").hidden = true;
            break;
        case 1: // квадрат
            document.getElementById("diameter_field").hidden = true;
            document.getElementById("length_field").hidden = false;
            document.getElementById("width_field").hidden = true;
            break;
        case 2: // прямоугольник
            document.getElementById("diameter_field").hidden = true;
            document.getElementById("length_field").hidden = false;
            document.getElementById("width_field").hidden = false;
            break;
    }
}