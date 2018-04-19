var ScrollingElements = document.querySelectorAll("[scroll]");

function DoScrollMagic(value, index, arr) {
    document.querySelectorAll("[scroll]")[index].style.top = 0 + "px";

    document.querySelectorAll("[scroll]")[index].addEventListener("wheel", function() {
        var e = window.event || e; 
        var sensitivity = 40;
        
        // 1 je gore | -1 je dole
	    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        var i = document.querySelectorAll("[scroll]")[index].offsetTop;
        var parent = document.querySelectorAll("[scroll]")[index].parentElement;
		var maxTop = parent.offsetHeight - document.querySelectorAll("[scroll]")[index].offsetHeight + 5;
        switch(delta) {
            case -1:
                if (parseInt(document.querySelectorAll("[scroll]")[index].style.top, 10) > maxTop) {
                    document.querySelectorAll("[scroll]")[index].style.top = (i - sensitivity) + "px";
                    if(i - sensitivity < maxTop)
                        document.querySelectorAll("[scroll]")[index].style.top = maxTop + "px";
                }
                break;
            case 1:
                if (parseInt(document.querySelectorAll("[scroll]")[index].style.top, 10) < 0) {
                    document.querySelectorAll("[scroll]")[index].style.top = (i + sensitivity) + "px";
                    if(i + sensitivity > 0)
                        document.querySelectorAll("[scroll]")[index].style.top = "0px";
                }
                break;
        }
    });
}

var ScrollEL = Array.prototype.slice.call(ScrollingElements);
ScrollEL.forEach(DoScrollMagic);