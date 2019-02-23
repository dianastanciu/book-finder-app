
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

                let card = 
                
                "<br/>" +
                "<a href=\"" + item.volumeInfo.previewLink +  "\"><img src=\""+ item.volumeInfo.imageLinks.thumbnail + "\"/></a>" +
                "<br/>" +                
                item.volumeInfo.title +
                "<p> by: " + item.volumeInfo.authors + "</p>" +
                "<p> published by: " + item.volumeInfo.publisher + "</p>" +
                "<a href=\"" + item.volumeInfo.infoLink + "\"> See this book </a> <hr/>" 
                
                
                ;    


                document.getElementById('content').innerHTML += card;

                console.log(item.volumeInfo);
            }
        })
};


$('button').on('click', () => handleRequest());
$('input').on('keypress', e => { (e.which == 13) ? handleRequest() : '' });
