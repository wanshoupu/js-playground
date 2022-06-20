function removeShape(e) {
  var svg = document.getElementById('svg');
  svg.removeChild(e)
}

function addShape(tag, id) {
  var svg = document.getElementById('svg');
  x = randint(svg.scrollWidth)
  y = randint(svg.scrollHeight)
  size = randint(100)
  var element = newShape(x, y, size, tag, id);
  // cx="10" cy="10" r="5" stroke="black" stroke-width="1" fill="red" 
  svg.appendChild(element);
  console.log(svg);
}

function randint(max) {
  return Math.floor(Math.random() * max);
}

function newShape(x, y, size, tag, id) {
  var element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  element.setAttribute("cx", x);
  element.setAttribute("cy", y);
  element.setAttribute("r", size);
  element.setAttribute("class", tag);
  element.setAttribute("id", id)
  return element;
}

function stepForward() {
  state = document.getElementById("state")
  addShape(parseInt(state.value), state.nextId)
  state.setAttribute("value", parseInt(state.value) + 1)
}
function stepBackward() {
  state = document.getElementById("state")
  index = parseInt(state.value)
  if (index <= 0) {
    return
  }
  es = document.getElementsByClassName(index - 1)
  for (let e of es) {
    removeShape(e);
  }
  state.setAttribute("value", index - 1)
}
function play() {
}
