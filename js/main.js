//	Cria base de dados (nome,versão,descrição,tamanho)
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
//	Obrigatório antes de qualquer operação
db.transaction(function (tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS books (id unique, opinion)');
});

var APIKey = "AIzaSyCDUYF-KWjYdomkZXg3LasiWjhUqcP12rk"
var UserID = "112927202455529669623"
var ShelfID = "1002"

function loadDataAPI(book) {
	var html = `
	<div class="book col-md-4 col-md-offset-4">	 
	<img class="imgadjust img">
	<input type="hidden" class="hiddenFieldId"></input>
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
	$('.hiddenFieldId',$bookHTML).text(book.id);
	console.log($bookHTML);
}


function AddRow($id,$opinion){
	$book = $(".book.active");
	var author = $book.children("sub").text();
	var title = $book.children("h1").text();
	$('#myTable tbody').append('<tr class="' + (($opinion == "Like") ? 'success' : 'danger') + '"><td>' + title + '</td><td>' + author + '</td><td>' + $opinion + '</td></tr>');
}


$.ajax({
	url:"https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" + ShelfID + "/volumes?key=" + APIKey

}).done(function(data) {
	$.each(data.items, function(index,item) {
		loadDataAPI(item);
	});
	console.log(data);
});


var inAnimation = false;
$('.dataOpinion').click(function(){
	if(!inAnimation){
		inAnimation = true;
		$book = $('.book.active');
		$next = $book.next('.book')
		$id = $('.hiddenFieldId',$book).text();
		$opinion = $(this).attr('data-opinion');

		AddRow($id,$opinion);

		db.transaction(function (tx) {
			tx.executeSql('INSERT INTO books(id, opinion) VALUES(?,?)',[$id,$opinion]);
	});

		$book.fadeOut(200,function(){
			$book.removeClass('active');
			$next.fadeIn(200,function(){
				$next.addClass('active');
				inAnimation = false;
			});
		});
	}
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
	$book.removeClass('active');
	$prev.addClass('active');
	$('#myTable tr:last').remove();
	console.log($prev);
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