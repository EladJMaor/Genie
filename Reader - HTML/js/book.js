$(function(){

    //Define xml-store variable
    var book_path="./books/sample_book.xml", book_progress = 20, last_page = '1';
    // Ajax POST request to load the book
    $.ajax({
        type: "GET",
        url: book_path,
        cache: false,
        success: function (xmldata) {
            var xml = $(xmldata);
            //Add book title and clearence
            $("h1#book-title").text(xml.find("book").attr("title"));
            $("p#book-reference").text(xml.find("book").attr("book-clearence"));

            //Set table of content into a var
            var toc = $("ul#table-of-content");

            //Add the cover title
            toc.append("<li><a>" + xml.find("contents cover title").text() + "</a></li>");
            toc.children("li").children("a").attr("value" , xml.find("contents cover page").text());

            //Populate ToC
            xml.find("contents chapter").each(function(){
                //adds the title
                var title = $(this).children("title").text();
                toc.append("<li><a>" + title + "</a></li>");
                
                var pagelocation = $(this).children("page").text();//saves the page location
                toc.children("li").children("a")[toc.children("li").children("a").length - 1].setAttribute("value",pagelocation )
                
                $(this).find("sub").each(function(){
                    toc.append("<ul><li><a>" + $(this).children("title").text() +  "</a></li></ul>");
                    pagelocation = $(this).children("page").text();
                    toc.children("ul").children("li").children("a")[toc.children("ul").children("li").children("a").length - 1].setAttribute("value",pagelocation ); 
                })
            })
            
            $("[value]").click(function(){
                pageLocation = this.getAttribute("value");
                $("#flipbook").turn("page" , pageLocation);
            })

            ///Load cover page
            var $book = $("div#flipbook");
            $book.append(xml.find("pages").html());

            var width = $(window).width();
            var height = $(window).height();

            //Load turn.js book
            $("#flipbook").turn({
                width: width * 0.60,
                height: width * 0.60 * 0.71,
                duration: 1500,
                autoCenter: true
            });
            
            // change the view to a single page
            $("#flipbook").turn('display', 'single');
            
            // change flipbook direction to right-to-left
            $("#flipbook").turn("direction", "rtl");
          
        },

        error: function(){
            console.log("Error loading book.");
        }
    });
    $(window).resize(function () {
        var width = $(window).width();
        var height = $(window).height();

        $("#flipbook").turn("size", width * 0.60, width * 0.60 * 0.71);
    });
    
    // disable the previous button
    $("div#right").addClass("disabled-btn");
    
    // turn to the previous page
    $("div#right").click(function () {
        $("#flipbook").turn("previous");
    });
    
    // turn to the previous page
    $("div#left").click(function () {
        $("#flipbook").turn("next");
    });
    
    //resturns the buttons when now in the last/first 
    $("#flipbook").bind("turning", function(event,page,view) {
        
        $("video").each(function(){
        });
        
        
        
        if (page > 1) {
            $("div#right").removeClass("disabled-btn");
        }
        if(page < $("#flipbook").turn("pages")){
            
            $("div#left").removeClass("disabled-btn");
        }
    });
    

    $("#flipbook").bind("last", function(event) {
        $("div#left").addClass("disabled-btn");
    });
    
    $("#flipbook").bind("first", function(event) {
    $("div#right").addClass("disabled-btn");
    });
    
    $("#flipbook").bind("start",function(event, pageObject, corner){
       console.log(pageObject.turn); 
    });
});




