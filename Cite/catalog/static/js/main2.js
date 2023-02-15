function capitalize(string){
    return string = string.charAt(0).toUpperCase() + string.slice(1);
}
function lower_case(string){
    return string = string.charAt(0).toLowerCase() + string.slice(1);
}
let textBlock1 = document.getElementById('block_text_1');

document.addEventListener('DOMContentLoaded', function () {
    serializedMap = sessionStorage.getItem('myData2');
    data2 = new Map(JSON.parse(serializedMap));
    for(const key of data2){
        let span = document.createElement('span');
        span.classList.add('text_1');
        span.innerText = capitalize(key[0] + ":" + key[1]);
        textBlock1.append(span);
    }
    data = JSON.parse(sessionStorage.getItem('myData'));
    for (let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            for(let k = 0; k < data[i][j].length; k++) {
                flag = true;
                for(const key of data2){    
                    if(capitalize(data[i][j][k]) == key[0]){
                        flag = false;
                    }
                }
                if(flag){
                    let span = document.createElement('span');
                    span.classList.add('text_1');
                    span.innerText = capitalize(data[i][j][k]);
                    textBlock1.append(span);
                }
            }   
        }
    }
});

window.addEventListener('beforeunload', function () {
    saving_data(data1)
});