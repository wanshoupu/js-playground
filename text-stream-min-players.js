function endsWith(chars, str) {
    if (chars.length < str.length) {
        return false;
    }
    var offset = chars.length - str.length;
    for (let i = 0; i < chars.length; i++) {
        if (str[i] != chars[offset + i]) {
            return false;
        }
    }
    return true;
}

function minPlayers(segment) {
    var chars = [];
    var maxPlayer = 0;
    var players = 0;
    for (let c of segment) {
        if (c == 't' && endsWith(chars, 'cha')) {
            chars.pop();
            chars.pop();
            chars.pop();
            players -= 1;
            continue;
        } else if (c == 'c') {
            players += 1;
            maxPlayer = Math.max(maxPlayer, players);
        }
        chars.push(c);
    }

    return maxPlayer;
}

var tests = [
    "",
    "chat",
    "chatchat",
    "ahaahahahahahahahahahahahahhaahahahh",
    "cchachattchathatchatt",
    "chacchathatt",
    "cchathat",
    "chchatchatat",
    "cchathachatt",
    "chathachat",
    "chatchatchat",]
for (let test of new Set(tests)) {
    let n = minPlayers(test);
    console.log(`"${test}" = ${n}`)
}
