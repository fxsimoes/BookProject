//	Cria base de dados (nome,versão,descrição,tamanho)
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
db.transaction(function (tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS books (id unique, opinion, title, author)');
});

			// Creates HTML base structure to be completed by AJAX imports
function loadDataAPI(book) {
	var html = `
	<div class="book col-md-4 col-md-offset-4">	 
	<img class="imgadjust img">
	<input type="hidden" class="hiddenFieldId"></input>
	<h1 class="limitChar"></h1>
	<sub class='limitChar' type='hidden'></sub>
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
		return (currentText.substr(0,240));
	});

	$("h1.limitChar").text(function(index, currentText){
		return (currentText.substr(0,40));
	});

	$("sub.limitChar").text(function(index, currentText){
		return (currentText.substr(0,25));
	});
}
			// Adds a row with the data AJAX imports to a (title,author,opinion) table
function AddRow($title,$author,$opinion){
	$('#myTable tbody').append('<tr class="' + (($opinion == "Like") ? 'success' : 'danger') + '"><td>' + $title + '</td><td>' + $author + '</td><td>' + $opinion + '</td></tr>');
}

			// Using AJAX to import book data from the Google Books API
function getAjax(){
	var APIKey = "AIzaSyCDUYF-KWjYdomkZXg3LasiWjhUqcP12rk";
	var search = $('#search').val();
	var filter = $('#searchFilter').val();
    var switchstr = $("#filterOptions option:selected").val();
	$filter=!$.trim($('#searchFilter').html()).length; 

	switch(switchstr){

	case "Title":
		var terms='+intitle:';
		break;
	case "Author":
		var terms='+inauthor:';
		break;
	case "Publisher":
		var terms='+inpublisher:';
		break;
	case "Genre":
		var terms='+subject:';
	}

	if ($filter){
		var terms='';
	}

	$.ajax({
	url:"https://www.googleapis.com/books/v1/volumes?q=" + search + terms + filter + "&key=" + APIKey,

	}).done(function(data) {
	$.each(data.items, function(index,book) {
		loadDataAPI(book);
		});
	});

}
			// Orders the data received by AJAX and adds $opinion (Like/Dislike)
var inAnimation = false;
$('.dataOpinion').click(function Opinion(){
		inAnimation = true;
		$allBooks = $('.book');
		$book = $('.book.active');
		$next = $book.next('.book');
		$id = $('.hiddenFieldId',$book).text();
		$opinion = $(this).attr('data-opinion');
		$title = $book.children("h1").text();
		$author = $book.children("sub").text();

		AddRow($title,$author,$opinion); // Sends values to AddRow function

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
			$next.addClass('active');
		}
});


$(".navstar").click(function(){
	$(".favorites").addClass("active");
	$("#endPage").hide();
	$("#startPage").hide();
	$("#bookContainer").hide();
	$(".favorites").show();
	$("#myTable").hide();
	$('.buttons').hide();
});

$('#submit').click(function(){
	getAjax();
	$('#bookContainer').show();
	$("#startPage").hide();
	$("#endPage").show();
	$(".favorites").hide();
	$('.buttons').show();
});

$('#search, #searchFilter').keyup(function(event){
	if(event.which == 13){
		getAjax();
		$('#bookContainer').show();
		$("#startPage").hide();
		$("#endPage").show();
		$(".favorites").hide();
		$('.buttons').show();
	}
});

$(".star").click(function(){
	$parent = $(".book.active");
	$cover = $parent.find('.imgadjust');
	$(".likestar.glyphicon-star").css("color","#18ba09");
	$cover.clone().appendTo('.favspage').css("max-height","300px").css("margin-top","30px").css("margin-bottom","30px").css("display", "inline-block").css("margin","20px");
});

$(".navliked").click(function(){
	$(".likedbooks").addClass("active")
	$("#endPage").hide();
	$("#startPage").hide();
	$("#bookContainer").hide();
	$(".favorites").hide();
	$("#myTable").show();
	$('.buttons').hide();
	$(".likedbooks").show();
});

$("#startButton").click(function(){
	$("#startPage").hide();
	$("#bookContainer").show();
	$(".favorites").hide();
	$('.buttons').show();
});

$("#clearTable").click(function(){
	$("#myTable td").parent().remove();
	db.transaction(function (tx) {
	tx.executeSql('DROP TABLE books');
	});
});

$(".home").click(function() {
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

		$bCont=!$.trim($('#bookContainer').html()).length;

		if ($bCont){
			alert('Container is empty, please add some books to your database.');
		}
		else{
		$("#startPage").hide();
		$("#bookContainer").show();
		$("#endPage").show();
		$(".favorites").hide();
		$('.buttons').show();
	}
	}); 
});

// $('#eraseDB').click(function(){
// 	db.transaction(function (tx) {
// 		tx.executeSql('DROP TABLE books');
// 	});
// });

// $("#restartButton").click(function(){
// 	$("#endPage").hide();
// 	$("#startPage").show();
// 	$("#bookContainer").hide();
// 	$(".favorites").hide();
// 	$('.buttons').hide();
// });

// $('#consultDb').click(function(){
// 	db.transaction(function (tx) {
// 		tx.executeSql('SELECT * FROM books', [], function (tx, results) {
// 			$.each(results.rows,function(index,item){
// 	   			console.log(item);
// 	   		});
// 		}, null);
// 	});
// });