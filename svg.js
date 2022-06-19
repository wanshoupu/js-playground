function doFunction() {
    var svg = document.getElementById('polygon');
    svg.setAttribute('points', "100,1 40,198 190,78 10,78 160,198")
  }
  elements = document.getElementsByClassName("mydiv")
  for (var e of elements) {
    dragElement(e)
  }

  dragElement(document.getElementById("clickMe"))

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(event) {
      event = event || window.event;
      event.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - event.clientX;
      pos2 = pos4 - event.clientY;
      pos3 = event.clientX;
      pos4 = event.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      syncPos(event)
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }

    function syncPos(e) {
    var svg = document.getElementById('polygon');
      points = svg.getAttribute('points').split(" ")
      index = e.srcElement.getAttribute("value")
      points[parseInt(index)] = e.clientX + "," + e.clientY
      svg.setAttribute('points', points.join(" "))
    }
  }

