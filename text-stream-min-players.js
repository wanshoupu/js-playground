WORD = "chat"
SEQ = [...WORD].reduce((a, v, i) => ({ ...a, [v]: i < WORD.length - 1 ? WORD[i + 1] : null }), {})
SEQ1 = [...WORD].reduce((a, v, i) => ({ ...a, [v]: i }), {})

function minPlayers(segment) {
    if (segment.length % WORD.length != 0) {
        return -1
    }
    var input = [...segment].map(v => SEQ1[v])
    if (input.some(v => v === undefined)) {
        return -1
    }
    var needs = new Array(WORD.length).fill(0)
    var maxPlayer = 0;
    var players = 0;
    for (const i of input) {
        if (i === 0) {
            players += 1
        } else if (needs[i - 1] > 0) {
            needs[i - 1] -= 1
        } else {
            // extra char needed by no word
            return -1
        }
        if (i + 1 == WORD.length) {
            // last char concluding a word
            players -= 1
        } else {
            needs[i] += 1
        }
        maxPlayer = players > maxPlayer ? players : maxPlayer
    }
    var leftover = Object.values(needs).reduce((a, b) => a + b, 0)
    if (leftover != 0) {
        return -1
    }

    return maxPlayer;
}


/**
 * hash of list (push/pop at end)
 * @param {string} segment 
 * @returns 
 */
var minNumberOfFrogs = function (segment) {
    var dict = [...WORD].reduce((a, v) => ({ ...a, [v]: 0 }), {})
    var maxPlayer = 0;
    var players = 0;
    for (let c of segment) {
        if (!dict.hasOwnProperty(c)) {
            return -1
        }
        if (c == WORD[0]) {
            players += 1
        } else if (dict[c] > 0) {
            dict[c] -= 1
        } else {
            // extra char needed by no word
            return -1
        }
        var nextKey = SEQ[c]
        if (nextKey === null) {
            // termination of word
            players -= 1
        } else {
            // wait for nextKey
            dict[nextKey] += 1
        }
        maxPlayer = players > maxPlayer ? players : maxPlayer
    }
    var leftover = Object.values(dict).reduce((a, b) => a + b, 0)
    if (leftover != 0) {
        return -1
    }

    return maxPlayer
}

var tests = [
    "",
    "chat",
    "chatchat",
    "chatcha",
    "cchhaatt",
    "cchhaactthat",
    "ahaahahahahahahahahahahahahhaahahahh",
    "cchachattchathatchatt",
    "chacchathatt",
    "cchathat",
    "chchatchatat",
    "cchathachatt",
    "chathachat",
    "chatchatchat",
]
for (let test of new Set(tests)) {
    let n = minPlayers(test);
    let m = minNumberOfFrogs(test);
    console.log(`"${test}" = ${n} = ${m}`)
}
