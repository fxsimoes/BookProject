//	Cria base de dados (nome,versão,descrição,tamanho)
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
//	Obrigatório antes de qualquer operação
db.transaction(function (tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS books (id unique, opinion, title, author)');
});

function loadDataAPI(book) {
	var html = `
	<div class="book col-md-4 col-md-offset-4">	 
	<img class="imgadjust img">
	<input type="hidden" class="hiddenFieldId"></input>
	<h1 class="limitChar"></h1>
	<sub></sub>
	<p class="limitChar center-block"></p>
	<br>
	<a class="gbooks"></a>
	<a class="reads"></a>
	</div>
	`
	$('#bookContainer').append(html);
	$bookHTML = $('.book').eq(-1);
	$('h1',$bookHTML).text(book.volumeInfo.title);
	$("p",$bookHTML).text(book.volumeInfo.description);
	$("sub",$bookHTML).text(book.volumeInfo.authors);
	$('a.gbooks',$bookHTML).attr("href", book.volumeInfo.infoLink);
	$('a.gbooks',$bookHTML).text('Google Books');
	$(".book:first").addClass("active");
	$('.hiddenFieldId',$bookHTML).text(book.id);
	console.log($bookHTML);

	if (typeof book.volumeInfo.imageLinks != 'undefined'){
		$("img",$bookHTML).attr("src", book.volumeInfo.imageLinks.thumbnail);
	}
	else{
		$("img",$bookHTML).attr("src", "http://files.ctctcdn.com/8b436d5f001/78afec4d-57b3-475b-a7f4-3119de95f4f7.jpg");
	}

	$("p.limitChar").text(function(index, currentText){
		return (currentText.substr(0,240) + "...");
	});

	$("h1.limitChar").text(function(index, currentText){
		return (currentText.substr(0,40));
	});

	$("sub.limitChar").text(function(index, currentText){
		return (currentText.substr(0,25));
	});
}

function AddRow($id,$opinion,$title,$author){
	$('#myTable tbody').append('<tr class="' + (($opinion == "Like") ? 'success' : 'danger') + '"><td>' + $title + '</td><td>' + $author + '</td><td>' + $opinion + '</td></tr>');
}

// var APIKey = "AIzaSyCDUYF-KWjYdomkZXg3LasiWjhUqcP12rk"
// var UserID = "112927202455529669623"
// var ShelfID = "1002"

// $.ajax({
// 	url:"https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" + ShelfID + "/volumes?key=" + APIKey



// }).done(function(data) {
// 	$.each(data.items, function(index,item) {
// 		loadDataAPI(item);
// 	});

// });


$('#submit').click(function(){

	// $('select').change(function() {
// });	
	var APIKey = "AIzaSyCDUYF-KWjYdomkZXg3LasiWjhUqcP12rk"
	var search = $('#search').val();
	var filter = $('#searchFilter').val();
    var switchstr = $("#filterOptions option:selected").val();

    switch(switchstr){

	case "intitle":
		break;
	case "inauthor":
		break;
	case "inpublisher":
		break;
	case "subject":
	}

$.ajax({
	url:"https://www.googleapis.com/books/v1/volumes?q=" + search + "+" + switchstr + ':' + filter + "&key=" + APIKey,

}).done(function(data) {
	$.each(data.items, function(index,book) {
		loadDataAPI(book);
	});
	// console.log(data);
});

});


var inAnimation = false;
$('.dataOpinion').click(function(){
		inAnimation = true;
		$allBooks = $('.book');
		$book = $('.book.active');
		$next = $book.next('.book');
		$id = $('.hiddenFieldId',$book).text();
		$opinion = $(this).attr('data-opinion');
		$title = $book.children("h1").text();
		$author = $book.children("sub").text();

		AddRow($id,$opinion,$title,$author);

		db.transaction(function (tx) {
			tx.executeSql('INSERT INTO books(id, opinion, title, author) VALUES(?,?,?,?)',[$id,$opinion,$title,$author]);
	});

		if($allBooks.length-1 == $book.index()){
			$("#endPage").show();
			$("#bookContainer").hide();
			$(".likedbooks").show();
			$('.buttons').hide();
		}
		else {			
			$book.removeClass('active');
			$next.addClass('active');}
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
		$(".favorites").show();
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
			$(".likedbooks").addClass("active")
		});
		$("#endPage").hide();
		$("#startPage").hide();
		$("#bookContainer").hide();
		$(".favorites").hide();
		$("#myTable").show();
		$('.buttons').hide();
	});
}
LikeTable();


$("#startButton").click(function(){
	$("#startPage").hide();
	$("#bookContainer").show();
	$(".favorites").hide();
	$('.buttons').show();
});

$("#clearTable").click(function() {
	$("#myTable td").parent().remove();
	db.transaction(function (tx) {
	tx.executeSql('DROP TABLE books');
	});
});

$(".home").click(function HomePage() {
	$("#startPage").show()
	$("#bookContainer").hide();
	$("#endPage").hide();
	$("#myTable").hide();
});

$("#Rewind").click(function() {
	$("#bookContainer").show();
	$("#endPage").hide();
	$(".likedbooks").hide();
	$('.buttons').show();
});

$("#restartButton").click(function(){
	$("#endPage").hide();
	$("#startPage").show();
	$("#bookContainer").hide();
	$(".favorites").hide();
	$('.buttons').hide();
});

$('#consultDb').click(function(){
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM books', [], function (tx, results) {
			$.each(results.rows,function(index,item){
	   			console.log(item);
	   		});
		}, null);
	});
});

$('#eraseDB').click(function(){
	db.transaction(function (tx) {
		tx.executeSql('DROP TABLE books');
	});
});

$('#Backwards').click(function() {
	$book = $(".book.active");
	$prev = $book.prev(".book");

	if ($book.index() > 0){
		$book.removeClass('active');
		$prev.addClass('active');
		$('#myTable tr:last').remove();
	}
});

$(document).ready(function(){
	$("#clickimg").click(function(){
		$("#startPage").hide();
		$("#bookContainer").show();
		$("#endPage").show();
		$(".favorites").hide();
		$('.buttons').show();
	}); 
});

//  		End of Buttons

// $('#search').keyup(function(e) {
//     clearTimeout($.data(this, 'timer'));
//     if (e.keyCode == 13)
//       search(true);
//     else
//       $(this).data('timer', setTimeout(search, 500));
// });

// function search(force) {
//     var existingString = $("#search").val();
//     if (!force && existingString.length < 3) return; //wasn't enter, not > 2 char
//     $.get('/Tracker/Search/' + existingString, function(data) {
//         $('divFavs').html(data);
//         $('#favspage').show();
//     });
// }