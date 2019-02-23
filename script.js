
let myTrim = x => x.replace(/\s+/g,'+');
var googleAPI = 'https://www.googleapis.com/books/v1/volumes?q=';

let handleRequest = () => {
    $('#content').empty();

        let value = $('input').val();
        let q = myTrim(value);
        let newGoogleAPI = googleAPI + q;

        $.getJSON(newGoogleAPI, response => {
            for (var i = 0; i < response.items.length; i ++) {
                let item = response.items[i];
                let info = "<br/>" + item.volumeInfo.title;
                document.getElementById('content').innerHTML += info;
            }
        })
};


$('button').on('click', () => handleRequest());
$('input').on('keypress', e => { (e.which == 13) ? handleRequest() : '' });
