var nextTag = 1
var nextGen = []
init()

function init() {
  var svg = document.getElementById('svg');
  size = svg.scrollWidth
  var x = y = size / 2
  var radius = size / 4 / Math.sqrt(2.5)
  var element = newShape(size / 2, size / 2, radius, 0, 0)
  svg.appendChild(element)

  nextGen = [
    { parent: [x, y], delta: [0, -radius] },
    { parent: [x, y], delta: [0, radius] },
    { parent: [x, y], delta: [-radius, 0] },
    { parent: [x, y], delta: [radius, 0] },
  ];
}

function removeShapes() {
  if (nextTag <= 0) {
    return
  }
  nextTag -= 1
  var tag = nextTag
  es = [...document.getElementsByClassName(tag)]
  var svg = document.getElementById('svg');
  es.forEach(element => {
    svg.removeChild(element)    
  });
}

function addShapes() {
  var tag = nextTag
  nextTag += 1
  var svg = document.getElementById('svg');

  var newGen = []
  for (const spec of nextGen) {
    let parent = spec["parent"]
    let [dx, dy] = spec["delta"]
    let radius = Math.abs(dx + dy) / 2
    let x = parent[0] + dx * 3 / 2
    let y = parent[1] + dy * 3 / 2
    let id = tag + '-' + x + '-' + y + '-' + radius
    svg.appendChild(newShape(x, y, radius, tag, id))

    // calculate new peripheral centers (3 of them)
    let cs = genPeripherals([x, y], [dx, dy])
    for (const c of cs) {
      newGen.push(c)
    }
    nextGen = newGen
  }
}

function genDeltas(dx, dy) {
  return [
    [-dx, -dy],
    [dy, dx],
    [-dy, -dx],
  ]
}

function genPeripherals(parent, delta) {
  var [dx, dy] = delta
  var cs = genDeltas(-dx / 2, -dy / 2)
  var result = cs.map(c => { return { "parent": parent, "delta": c, "radius": Math.abs(dx + dy) / 2 } })
  return result
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
