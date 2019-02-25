
let myTrim = x => x.replace(/\s+/g,'+');
var googleAPI = 'https://www.googleapis.com/books/v1/volumes?q=';

$('.loader').hide();

let handleRequest = () => {
    $('#content').empty();
    $('.loader').show();

    let value = $('input').val();
    let q = myTrim(value);
    let newGoogleAPI = googleAPI + q;

    $.getJSON(newGoogleAPI, response => {
        for (var i = 0; i < response.items.length; i ++) {
            let item = response.items[i];

            let cardImage = item.volumeInfo.imageLinks.thumbnail;
            let cardImageLink = item.volumeInfo.previewLink;
            let cardTitle = item.volumeInfo.title;
            let cardAuthors = item.volumeInfo.authors;
            let cardPublisher = item.volumeInfo.publisher;
            let cardInfo = item.volumeInfo.infoLink;

            let card = 
            "<br/>" +
            "<a href=\"" + cardImageLink +  
            "\"><img src=\""+ cardImage + "\"/></a>" +
            "<br/>" +                
            cardTitle +
            "<p> by: " + cardAuthors + "</p>" +
            "<p> published by: " + cardPublisher + "</p>" +
            "<a href=\"" + cardInfo + "\"> See this book </a> <hr/>" 
            ;    

            setTimeout(() => {
                document.getElementById('content').innerHTML += card;
                $('.loader').hide();
            }, 1200);
        }
    })
};


$('button').on('click', () => handleRequest());

$('input')
  .on('keypress input', e => { 
      if (e.which == 13) { 
          handleRequest() 
      } else {
          $('#content').empty();
          document.getElementById('content').innerHTML += '<span class="empty-content text-center">Nothing here yet. Try searching for a book!</span>';
      } 
  })
  .on('focus', () => ( $(window).width() < 780) ? $('html, body').animate({scrollTop: $('#bookSearch').offset().top}, 100) : '' );