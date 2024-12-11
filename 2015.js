// 1.1

document.body.innerText.split('').reduce((acc, sym) => acc + ({'(': 1, ')': -1}[sym]), 0)

// 1.2

const instructions = document.body.innerText.split('')
let floor = 0;
for (let i = 0; i < instructions.length; i++) {
  floor += {'(': 1, ')': -1}[instructions[i]];
  if (floor < 0) {
    console.log(i + 1);
    break;
  }
}

// 2.1

document.body.innerText
  .split('\n')
  .slice(0, -1)
  .map(box => {
    const [, _l, _w, _h] = box.match(/^(\d+)x(\d+)x(\d+)$/);
    const [l, w, h] = [_l, _w, _h].map(Number);
    const lw = l * w;
    const wh = w * h;
    const hl = h * l;
    const slack = Math.min(lw, wh, hl);
    return 2 * lw + 2 * wh + 2 * hl + slack;
  })
  .reduce((a,b)=> a + b, 0);

// 2.2

document.body.innerText
  .split('\n')
  .slice(0, -1)
  .map(box => {
    const [, _l, _w, _h] = box.match(/^(\d+)x(\d+)x(\d+)$/);
    const [l, w, h] = [_l, _w, _h].map(Number);
    const bow = l * w * h;
    const len = 2 * (l + w + h - Math.max(l, w, h));
    return len + bow;
  })
  .reduce((a,b)=> a + b, 0);

// 3.1

document.body.innerText
  .split('')
  .reduce((state, dir) => {
    let [set, [x, y]] = state;
    switch(dir) {
      case '>': x++; break;
      case '<': x--; break;
      case '^': y++; break;
      case 'v': y--; break;
    }
    set.add(`${x}_${y}`);
    state[1] = [x, y];
    return state;
  }, [new Set('0_0'), [0, 0]])
  [0].size

// 3.2

document.body.innerText
  .split('')
  .reduce(([set, coords1, coords2], dir, i) => {
    const coords = i % 2 === 0 ? coords1 : coords2;
    switch(dir) {
      case '>': coords[0]++; break;
      case '<': coords[0]--; break;
      case '^': coords[1]++; break;
      case 'v': coords[1]--; break;
    }
    set.add(`${coords[0]}_${coords[1]}`);
    return [set, coords1, coords2];
  }, [new Set(['0_0']), [0, 0], [0, 0]])
  [0].size