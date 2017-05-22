
var book1 = {name:"Name of the Wind", 
author:"Patrick Rothfuss", 
descr:"A young and genius boy who struggles to live on his own after having all his troupe and his family murder by anonymous assassins",
image:"http://www.patrickrothfuss.com/images/page/cover_277.jpg",
linkWiki:"https://en.wikipedia.org/wiki/The_Name_of_the_Wind",
linkReads:"https://www.goodreads.com/book/show/186074.The_Name_of_the_Wind?from_search=true"};

var book2 = {name:"A Game of Thrones", 
author:"George R. R. Martin", 
descr:"7 different families playing the game of thrones while the winter is coming",
image:"http://www.georgerrmartin.com/wp-content/uploads/2013/03/GOTMTI2.jpg",
linkWiki:"https://en.wikipedia.org/wiki/A_Game_of_Thrones",
linkReads:"https://www.goodreads.com/book/show/13496.A_Game_of_Thrones?from_search=true"};

var book3 = {name:"The Way of Kings", 
author:"Brandon Sanderson", 
descr:"Struggling to find the path of truth, one must Speak again the ancient oaths, Life before death. Strength before weakness. Journey before Destination",
image:"http://vignette2.wikia.nocookie.net/stormlightarchive/images/3/3a/TheWayOfKings.jpg/revision/latest?cb=2012111310070",
linkWiki:"https://en.wikipedia.org/wiki/The_Way_Of_Kings",
linkReads:"https://www.goodreads.com/book/show/7235533-the-way-of-kings?from_search=true"};

var books = [[book1],[book2],[book3]];


// 			DICIONARIOS - IMPORTAR TEXTO E ATRIBUTOS PELO JQUERY

var Library = new Array(book1, book2, book3);


function loadData() {
	var HTMLtoInsert = `
	<div class="book col-md-4 col-md-offset-4">	 
	<img class="imgadjust img">
	<h1></h1>
	<sub></sub>
	<p class="center-block"></p>
	<a class="wiki"></a>
	<a class="reads"></a>
	</div>
	`;

	jQuery.each(Library,function(index,value){

		$(".bookDiv").append(HTMLtoInsert);	
		$currentBook=$(".book").eq(index);
		$("h1",$currentBook).text(value.name);
		$("sub",$currentBook).text(value.author);
		$("p",$currentBook).text(value.descr);
		$("img",$currentBook).attr("src", value.image);
		$("a.wiki",$currentBook).attr("href",value.linkWiki);
		$("a.wiki",$currentBook).text("Wikipedia");
		$("a.reads",$currentBook).attr("href",value.linkReads);
		$("a.reads",$currentBook).text("GoodReads");
		$(".book:first").addClass("active");

	});
}

loadData();



var arrayTitles = new Array();
var countDislike=0;
var countLike=0;
var ArrayCounter = [];

// 			AJAX

var APIKey = "AIzaSyCDUYF-KWjYdomkZXg3LasiWjhUqcP12rk"
var UserID = "112927202455529669623"
var ShelfID = "1002"

function loadDataAPI(book) {
	var html = `
	<div class="book col-md-4 col-md-offset-4">	 
	<img class="imgadjust img">
	<h1></h1>
	<sub></sub>
	<p class="center-block"></p>
	<br>
	<a class="gbooks"></a>
	<a class="reads"></a>
	</div>
	`
	$('#bookContainer').append(html);
	$bookHTML = $('.book').eq(-1);
	$('h1',$bookHTML).text(book.volumeInfo.title);
	$("p",$bookHTML).text(book.volumeInfo.description);
	$("img",$bookHTML).attr("src", book.volumeInfo.imageLinks.thumbnail);
	$("sub",$bookHTML).text(book.volumeInfo.authors);
	$('a.gbooks',$bookHTML).attr("href", book.volumeInfo.infoLink);
	$('a.gbooks',$bookHTML).text('Google Books');
	$(".book:first").addClass("active");
	console.log($bookHTML);
}

$.ajax({
	url:"https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" + ShelfID + "/volumes?key=" + APIKey

}).done(function(data) {
	$.each(data.items, function(index,item) {
		// var book = {name:item.volumeInfo.name}
		loadDataAPI(item);
	});
	console.log(data);
});



// 			Buttons


$(".buttons button.like, button.dislike").click(function() {
	
	$book = $(".book.active");
	$allBooks=$(".book");
	$index = $allBooks.index($book);
	$next = $book.next(".book");
	$book = $(".book.active");
	var title = $book.children("h1").text();

	if($.inArray(title, ArrayCounter) && $.inArray("Like", ArrayCounter)){
		// ArrayCounter.replace('Like', 'Dislike');
		console.log(ArrayCounter);
	}
	else if ($.inArray(title, ArrayCounter) && $.inArray("Dislike", ArrayCounter)){
		// ArrayCounter.replace(["Dislike", "Like"]);
		console.log(ArrayCounter);
	}

	// 		Ciclo de Livros Infinito
	
	if( $index == $allBooks.length-1 ){
		$next = $allBooks.eq(0);
	}

	// -------------------------------
	
		$book.removeClass("active");
		$next.addClass("active");



});

function AddRow(opinion){
	$book = $(".book.active");
	var author = $book.children("sub").text();
	var title = $book.children("h1").text();

	$('#myTable tbody').append('<tr class="' + ((opinion == "Like") ? 'success' : 'danger') + '"><td>' + title + '</td><td>' + author + '</td><td>' + opinion + '</td></tr>');
}

$(".buttons button.like").click(function() {
	AddRow("Like");
	$book = $(".book.active");
	var title = $book.children("h1").text();
	ArrayCounter.push([title,"Like"]);
});

$(".buttons button.dislike").click(function() {
	AddRow("Dislike");
	$book = $(".book.active");
	var title = $book.children("h1").text();
	ArrayCounter.push([title,"Dislike"]);
});




$('#Backwards').click(function() {

	$book = $(".book.active");
	$allBooks=$(".book");
	$index = $allBooks.index($book);
	$prev = $book.prev(".book");
	$book.removeClass('active');
	$prev.addClass('active');

	ArrayCounter.pop();




});

function LikedBooks() {

	$(".navstar").click(function(){

		$active = $(".active");

		$(window).scrollTop(0);

		$active.fadeOut(50, function(){
			$active.removeClass("active");

			$(window).scrollTop(0);

			$(".favorites").fadeIn(0, function(){
				$(".favorites").addClass("active");
			});
		});
		$("#endPage").hide();
		$("#startPage").hide();
		$("#bookContainer").hide();
		$(".favorite").show();
		$("#myTable").hide();
		$('.buttons').hide();
	});
}

LikedBooks();

function AddToLiked(){	

	$(".star").click(function(){

		$parent = $(".book.active");
		$cover = $parent.find('.imgadjust');
		$(".likestar.glyphicon-star").css("color","#18ba09");

		$cover.clone().appendTo('.favspage').css("max-height","300px").css("margin-top","30px").css("margin-bottom","30px").css("display", "inline-block").css("margin","20px");
	});
}

AddToLiked();

function LikeTable() {

	$(".navliked").click(function(){

		$(".likedbooks").fadeIn(0, function(){
			$(".likedbooks").addClass("active");
			});

		$("#endPage").hide();
		$("#startPage").hide();
		$("#bookContainer").hide();
		$(".favorite").hide();
		$("#myTable").show();
		$('.buttons').hide();
	});
}

LikeTable();


$("#startButton").click(function(){
	$("#startPage").hide();
	$("#bookContainer").show();
	$(".favorite").hide();
	$('.buttons').show();
});


$("#clearTable").click(function() {
	$("#myTable td").parent().remove();
});


$(".home").click(function HomePage() {
	$("#startPage").show()
	$("#bookContainer").hide();
	$("#endPage").hide();
	$("#myTable").hide();

});



$("#restartButton").click(function(){
$("#endPage").hide();
$("#startPage").show();
$("#bookContainer").hide();
$(".favorite").hide();
$('.buttons').hide();
});



$(document).ready(function(){
    $("#clickimg").click(function(){
		    $("#startPage").hide();
			$("#bookContainer").show();
			$("#endPage").show();
			$(".favorite").hide();
			$('.buttons').show();
    }); 
});
//  		End of Buttons

