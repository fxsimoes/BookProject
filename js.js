
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
		<img class="img-rounded">
		<h1></h1>
		<sub></sub>
		<p class="center-block"></p>
		<button class="like"> Like <span class="glyphicon glyphicon-thumbs-up"></span> </button> 
		<button class="dislike"> Dislike <span class="glyphicon glyphicon-thumbs-down"></span> </button>
		<br>
		<br>
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


$allBooks=$(".book");


//			Like Button

var countDislike=0;
var countLike=0;



$(".book button.like, button.dislike").click(function() {


	$parent = $(this).parents(".book");
	var index = $allBooks.index($parent);
	$next = $parent.next(".book");

	// 		Ciclo de Livros Infinito
	
	if( index >= $allBooks.length-1 ){
		$next = $allBooks.eq(0);
	};
	// -------------------------------
	
	$parent.fadeOut(250, function() {
		$parent.removeClass("active");
		$next.fadeIn(250,function() {
			$next.addClass("active");
		});
	});	

	if( $allBooks.index($parent) == $allBooks.length-1){
		$next = $allBooks.eq(0);
		$("#bookContainer").hide();
		$("#endPage").show();
}



if ($("td:contains('Like, Dislike')")) {
	$("td.danger").toggleClass('success');
		}

else if ($("td:contains('Like, Dislike')")) {
	$("td.success").toggleClass('danger');
}
}); 




function AddRow(opinion){
	$book = $(".book.active");
	var author = $book.children("sub").text();
	var title = $book.children("h1").text();

	$('#myTable tr:last').after('<tr class="' + ((opinion == "Like") ? 'success' : 'danger') + '"><td>' + title + '</td><td>' + author + '</td><td>' + opinion + '</td></tr>');
  }



$(".book button.like").click(function() {

			AddRow("Like");	
});

$(".book button.dislike").click(function() {
			
			AddRow("Dislike");
});



// 	if ($.inArray(title, arrayTitles) == -1){
		
// 		AddRow($parent, author, "Dislike");

// 	}
// else if ($(td:contains("" + title ""))) {
// 	$("td.success").toggleClass('danger')
// 		}
	// countDislike++
	// $("#counter").text(countDislike);

$("#startButton").click(function(){
	$("#startPage").hide();
	$("#bookContainer").show();
});
$("#restartButton").click(function(){
	$("#endPage").hide();
	$("#startPage").show();
});