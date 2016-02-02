/* Function triggers the TableOfContent Animation */

$(function() {
    $('#toc').css("right", "0px");
    $('.inner-container').css("right", "360px");
    $('#toc').show;    
    
    $("div.toc-toggle").click(function(){toggleToc()});
});

function toggleToc() {
    if ($('#toc').is(":visible")){
            $('#toc').animate({right: '-330px'}, 'slow');
            $('.inner-container').animate({right: '250px'}, 'slow');
            $('#toc').toggle(0);
    }
    
    else {
        $('#toc').toggle(0);
        $('#toc').animate({right: '0px'}, 'slow');
        $('.inner-container').animate({right: '360px'}, 'slow');
    }
}