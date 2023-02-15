let btn = document.getElementById('inputFileButton');
let form = document.getElementById('formInputFile');
let textBlock1 = document.getElementById('text_1');
let textBlock2 = document.getElementById('text_2');
let textBlock3span = document.getElementById('span_text_3');
let lexemInputs = document.querySelectorAll('.inputLexemValues');
let lexemInput = document.getElementById('input_text_lexem');
let btnsave = document.getElementById('btnsave');
let variable_user;
var spanTextall = null;
var data1 = null;
var data2 = new Map();
btnsave.addEventListener("click", function () {
    if(lexemInput.value.length > 0){
        data2.set(variable_user, lexemInput.value);
    }
    else{
        let temp;
        for(let i = 0; i < lexemInputs.length; i++){
            if(lexemInputs[i].value.length > 0){
               temp += " " + lexemInputs[i].value;

            }

        }
        data2.set(variable_user, temp);
    }
    sessionStorage.setItem('myData2', JSON.stringify(Array.from(data2.entries())));
})

document.addEventListener('DOMContentLoaded', function () {
    if(sessionStorage.getItem('myData') != null){
        data1 = JSON.parse(sessionStorage.getItem('myData'));
        serializedMap = sessionStorage.getItem('myData2');
        data2 = new Map(JSON.parse(serializedMap));
        createSpan(data1);
    }
    else{
        data1 = null;
    }
})


window.addEventListener('beforeunload', function () {
    saving_data(data1)
});
for(let i = 0; i < lexemInputs.length; i++){
    lexemInputs[i].addEventListener('input', function(event) { 
        if(lexemInputs[i].value.length > 0){
            lexemInput.disabled = true;
        } 
        else{
            for(let j = 0; j < lexemInputs.length; j++){
                if(lexemInputs[j].value.length > 0){
                    return;
                }
            }
            lexemInput.disabled = false;
        }
    }); 
}

lexemInput.addEventListener('input', function(event) { 
    if(lexemInput.value.length > 0){
        for(let i = 0; i < lexemInputs.length; i++){
            lexemInputs[i].disabled = true;
        }
    }
    else{
        for(let i = 0; i < lexemInputs.length; i++){
            lexemInputs[i].disabled = false;
        }
    }
});


btn.addEventListener('click', function() {
    while (textBlock1.firstChild) {
        textBlock1.removeChild(textBlock1.firstChild);
    }
    var formData = new FormData();
    formData.append("pdf_file", $("input[name='pdf_file']")[0].files[0]);
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    $.ajax({
        url: '/upload_pdf/',
        type: 'POST',
        data: formData,
        headers: {'X-CSRFToken': csrftoken},
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            data1 = data;
        }
    })
    createSpan(data1);
    saving_data(data1);
})

function lexsem(){
    while (textBlock2.firstChild) {
        textBlock2.removeChild(textBlock2.firstChild);
    }
    textBlock3span.innerText = this.innerText;
    variable_user = this.innerText;
    for (let i = 0; i < data1.length; i++) {
        for(let j = 0; j < data1[i].length; j++) {
            for(let k = 0; k < data1[i][j].length; k++) {
                if(lower_case(this.innerText) == data1[i][j][k]){
                    for(const key in data1[i][1]){
                        let span = document.createElement('span');
                        span.classList.add('spanText');
                        span.innerText = capitalize(key + ":" + data1[i][1][key].toFixed(2));
                        textBlock2.append(span);
                    }
                }
            }   
        }
    }
}

function createSpan(data){
    for (let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            for(let k = 0; k < data[i][j].length; k++) {
                if(k == 0){
                    const unequeSet = new Set(data[i][j])
                    data[i][j] = [...unequeSet]
                }
                let span = document.createElement('span');
                span.classList.add('spanText');
                span.innerText = capitalize(data[i][j][k]);
                textBlock1.append(span);
            }   
        }
    }

    spanTextall = document.querySelectorAll('.spanText');
    for(let object of spanTextall) {
        object.addEventListener("click", lexsem);
    }
}

function capitalize(string){
    return string = string.charAt(0).toUpperCase() + string.slice(1);
}
function lower_case(string){
    return string = string.charAt(0).toLowerCase() + string.slice(1);
}

function saving_data(data){
    sessionStorage.setItem('myData', JSON.stringify(data1));
}
