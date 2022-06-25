var angle = 45
var generations = []
init()

function init() {
  var svg = document.getElementById('svg');
  console.log(document.height)
  svg.setAttribute("height", document.documentElement.scrollWidth / 1.25)
  svg.setAttribute("width", document.documentElement.scrollHeight / 1.25)
  size = svg.scrollWidth
  var x = y = size / 2
  var side = size / 4 / Math.sqrt(2.5)

  generations.push([
    { pos: [x, y], rotation: [0, 0], side: side },
  ]);
}

function updateConfig() {
  state = document.getElementById("config")
  angle = JSON.parse(state.value)
}

function removeShapes() {
  var tag = generations.length
  es = [...document.getElementsByClassName(tag)]
  var svg = document.getElementById('svg');
  es.forEach(element => {
    svg.removeChild(element)
  });
}

function addShapes(prevGen, tag) {
  var svg = document.getElementById('svg');

  var newGen = []
  for (const spec of prevGen) {
    let [x, y] = spec["pos"]
    let side = spec["side"]
    let id = tag + '-' + x + '-' + y + '-' + side
    svg.appendChild(newShape(spec, tag, id))

    // calculate new peripheral centers (3 of them)
    let cs = genPeripherals(spec)
    for (const c of cs) {
      newGen.push(c)
    }
  }
  generations.push(newGen)
}

function toRadians(angle) {
  return angle / 180 * Math.PI;
}

function genPeripherals(spec) {
  let [x, y] = spec["pos"]
  let side = spec["side"]
  let [m, n] = spec["rotation"]
  let leftSide = side * Math.sin(toRadians(angle));
  let rightSide = side * Math.cos(toRadians(angle));
  let leftRotation = [m + 1, n]
  let rightRotation = [m, n + 1]
  let leftRadians = toRadians(leftRotation[1] * angle - leftRotation[0] * (90 - angle))
  let rightRadians = toRadians(rightRotation[1] * angle - rightRotation[0] * (90 - angle))
  let leftDx = leftSide * Math.sin(leftRadians)
  let leftDy = -leftSide * Math.cos(leftRadians)
  let leftPos = [x + leftDx, y + leftDy]
  let rightR = leftSide + rightSide
  let rightPos = [x + rightR * Math.sin(rightRadians), y - rightR * Math.cos(rightRadians)]
  return [
    { pos: leftPos, rotation: leftRotation, side: leftSide },
    { pos: rightPos, rotation: rightRotation, side: rightSide },
  ]
}

function newShape(spec, tag, id) {
  var [x, y] = spec["pos"]
  var side = spec["side"]
  var [m, n] = spec["rotation"]
  var element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  element.setAttribute("x", x);
  element.setAttribute("y", y);
  element.setAttribute("width", side);
  element.setAttribute("height", side);
  element.setAttribute("class", tag);
  element.setAttribute("id", id)
  element.setAttribute("transform", `rotate(${n * angle - m * (90 - angle)}, ${x}, ${y})`)
  return element;
}

function stepForward() {
  var prevGen = generations[generations.length - 1]
  addShapes(prevGen, generations.length)
  state = document.getElementById("state")
  state.setAttribute("value", generations.length)
}

function stepBackward() {
  removeShapes();
  state = document.getElementById("state")
  state.setAttribute("value", generations.length)
  generations.pop()
  if (generations.length == 0) {
    init()
  }
}

function play() {
  setInterval(stepForward, 1000)
}
