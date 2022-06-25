var generations = []
init()

function init() {
  var svg = document.getElementById('svg');
  console.log(document.height)
  svg.setAttribute("height", document.documentElement.scrollWidth / 1.25)
  svg.setAttribute("width", document.documentElement.scrollHeight / 1.25)
  size = svg.scrollWidth
  var x = y = size / 2
  var radius = size / 4 / Math.sqrt(2.5)
  var element = newShape(size / 2, size / 2, radius, 0, 0)
  svg.appendChild(element)

  generations.push([
    { parent: [x, y], delta: [0, -radius] },
    { parent: [x, y], delta: [0, radius] },
    { parent: [x, y], delta: [-radius, 0] },
    { parent: [x, y], delta: [radius, 0] },
  ]);
}

function updateConfig(){

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
  }
  generations.push(newGen)
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
