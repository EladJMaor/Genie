$(document).ready(function() {    
    $(".marker-panel").hide();
    
    var bIsMarkerActive = false;
    var selectedColor = "transparent";
    
    $(".book, .inner-container, .top-bar, .table-of-content-side-panel").click(function() {
        $(".marker-panel").hide("slide", { direction: "left" }, 750);
    })
    
    $("#marker-tool").click(function() {
        $(".marker-panel").toggle("slide", { direction: "left" }, 750);
    })    
    
    
    $("#marker-yellow, #marker-blue, #marker-pink, #marker-green, #marker-unmarker").click(function(){
        bIsMarkerActive = true;
        selectedColor = this.getAttribute("value");
        
        $("body").addClass('marker-cursor');
        
        if (selectedColor != 'transparent') {
            $("#marker-tool").css('box-shadow', 'inset 0px 0px 10px '+selectedColor);
        }
        else {
            $("#marker-tool").css('box-shadow', 'inset 0px 0px 10px white');
        }
        
        $(".marker-panel").hide("slide", { direction: "left" }, 750);
    })

    
    $("#cursor-tool").click(function() {
        bIsMarkerActive = false;
        selectedColor = "transparent";
        
        $("body").removeClass('marker-cursor');
        $("#marker-tool").css('box-shadow', 'inset 0px 0px 10px transparent');
    })
    
    $("#flipbook").mouseup(function() {
        // markers only if the marker is active and inside the book
        if (elementContainsSelection(document.getElementById('flipbook')) && bIsMarkerActive) {
            highlightSelection(selectedColor);
        }
    })
});

// the function is hilighting the text with the selected color
function makeEditableAndHighlight(colour) {
    var range, sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    // Use HiliteColor since some browsers apply BackColor to the whole block
    if (!document.execCommand("HiliteColor", false, colour)) {
        document.execCommand("BackColor", false, colour);
    }
    document.designMode = "off";
    
    // unselect the selection
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {  // IE?
      document.selection.empty();
    }
}

function highlightSelection(colour) {
    var range, sel;
    if (window.getSelection) {
        // IE9 and non-IE
        try {
            if (!document.execCommand("BackColor", false, colour)) {
                makeEditableAndHighlight(colour);
            }
        } catch (ex) {
            makeEditableAndHighlight(colour)
        }
    } else if (document.selection && document.selection.createRange) {
        // IE <= 8 case
        range = document.selection.createRange();
        range.execCommand("BackColor", false, colour);
    }
}

// checks if the selection is inside the recived container id
function isOrContains(node, container) {
    while (node) {
        if (node === container) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

function elementContainsSelection(el) {
    var sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount > 0) {
            for (var i = 0; i < sel.rangeCount; ++i) {
                if (!isOrContains(sel.getRangeAt(i).commonAncestorContainer, el)) {
                    return false;
                }
            }
            return true;
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        return isOrContains(sel.createRange().parentElement(), el);
    }
    return false;
}