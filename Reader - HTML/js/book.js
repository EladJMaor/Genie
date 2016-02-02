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
            toc.append("<li><a href=''>" + xml.find("contents cover title").text() + "</a></li>");

            //Populate ToC
            xml.find("contents chapter").each(function(){
                var title = $(this).children("title").text();
                toc.append("<li><a href=''>" + title + "</a></li>");

                $(this).find("sub title").each(function(){
                    toc.append("<ul><li><a href=''>" + $(this).text() +  "</a></li></ul>");
                })
            })

            //Load cover page
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
        this.pause();
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
    
    $('a').removeAttr("href");
    
    /*
    function flip_page(direction){
        // Ajax POST request to load the book
        $.ajax({
            type: "GET",
            url: book_path,
            cache: false,
            success: function (xmldata) {
                var xml = $(xmldata),
                    $book = $("div.book"),
                    max_pages = xml.find("book").attr("pages");

                switch (direction) {
                    case "back":
                        var $id = $("div.page").attr("id");
                        if (!($id === '1')){
                            $id--;
                            change_page($id, $book, xml);
                            change_btn($id, max_pages);
                            
                            if (book_progress != 0){
                                book_progress-=20;
                                $("div.progress-bar").width(book_progress+"%")
                            }
                        } else {
                            console.log("Reached first page, can't flip anymore.")
                        }
                        break;

                    case "forward":
                        var $id = $("div.page").attr("id");
                        if (!($id === max_pages)){
                            $id++;
                            change_page($id, $book, xml);
                            change_btn($id, max_pages);
                            
                            
                            if (book_progress != 100){
                                book_progress+=20;
                                $("div.progress-bar").width(book_progress+"%")
                            }
                        } else {

                            console.log("Reached last page, can't flip anymore.");
                        }
                        break;

                    default:
                        console.log("Invalid page direction.");

                }
            },
            error: function(){
                console.log("Error loading book.");
            }
        })
    }

    function change_page($id, $book, xml){
        $book.html("");
        $book.append(xml.find("pages page[id='"+$id+"']").html());
        $book.wrapInner("<div id='"+$id+"' class='page'><pre>");
    }

    function change_btn($id, max_pages){
        if (($id+1) > max_pages){
            $("div#right").removeClass("disabled-btn");
            $("div#left").addClass("disabled-btn");
        }
        else if (($id-1) < '1'){
            $("div#right").addClass("disabled-btn");
            $("div#left").removeClass("disabled-btn");
        }

        else{
            $("div#right").removeClass("disabled-btn");
            $("div#left").removeClass("disabled-btn");
        }
    }



    */

});
