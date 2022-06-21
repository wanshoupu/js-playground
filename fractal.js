var nextTag = 0
// init()

function init() {
  var svg = document.getElementById('svg');
  width = svg.scrollWidth
  height = svg.scrollHeight
  newShape(width / 2, height / 2, (width + height) / 4, 0, 0)
}

function removeShapes() {
  nextTag -= 1
  var tag = nextTag
  es = document.getElementsByClassName(tag)
  var svg = document.getElementById('svg');
  for (let e of es) {
    svg.removeChild(e)
  }
}

function addShapes() {
  var tag = nextTag
  nextTag += 1
  var svg = document.getElementById('svg');
  x = randint(svg.scrollWidth)
  y = randint(svg.scrollHeight)
  size = randint(100)
  var element = newShape(x, y, size, tag, tag);
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
  addShapes()
  state = document.getElementById("state")
  var value = Math.max(nextTag, parseInt(state.value))
  state.setAttribute("value", value)
}

function stepBackward() {
  removeShapes();
  state = document.getElementById("state")
  var value = Math.min(nextTag, parseInt(state.value))
  state.setAttribute("value", value)
}

function play() {
  setInterval(stepForward, 1000)
}
