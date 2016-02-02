/* Function triggers the TableOfContent Animation */

$(function () {
    $('#toc').css("right", "0px");
    $('.inner-container').css("right", "18%");
    $('#toc').show;

    $("div.toc-toggle").click(function () { toggleToc() });
});

function toggleToc() {
    if ($('#toc').is(":visible")) {
        $('#toc').animate({ right: '-330px' }, 'slow');
        $('.inner-container').animate({ right: '10%' }, 'slow');
        $('#toc').toggle(0);
    }

    else {
        $('#toc').toggle(0);
        $('#toc').animate({ right: '0px' }, 'slow');
        $('.inner-container').animate({ right: '18%' }, 'slow');
    }
}

$(document).ready(function () {
    setTimeout(function () {
        var height = $('.inner-container').height() + 50;
        $('#toc').height(height);
    }, 1000);

})