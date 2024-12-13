// 1.1

const [as, bs] = document.body.innerText
  .split('\n')
  .map(pair => pair.split(/\s+/).map(Number))
  .slice(0, -1)
  .reduce(([as, bs], [a, b]) => [[...as, a], [...bs, b]], [[], []])
  .map(arr => arr.toSorted());
const res = as.map((a, i) => Math.abs(a - bs[i]))
  .reduce((a, b) => a + b, 0)
res;

// 1.2

const [as, bs] = document.body.innerText
  .split('\n')
  .map(pair => pair.split(/\s+/).map(Number))
  .slice(0, -1)
  .reduce(([as, bs], [a, b]) => [[...as, a], [...bs, b]], [[], []]);
const res = as.map(a => bs.filter(b => a === b).length * a)
  .reduce((a, b) => a + b, 0)
res;

// 2.1

const isSorted = arr => isSortedAsc(arr) || isSortedDesc(arr)
const isSortedAsc = arr => arr.length === 0 || arr.length === 1 || (arr[0] > arr[1] && isSortedAsc(arr.slice(1)))
const isSortedDesc = arr => arr.length === 0 || arr.length === 1 || (arr[0] < arr[1] && isSortedDesc(arr.slice(1)))
const smallDiff = arr => arr.length === 0 || arr.length === 1 || (Math.abs(arr[0] - arr[1]) <= 3 && Math.abs(arr[0] - arr[1]) > 0 && smallDiff(arr.slice(1)))
document.body.innerText
  .split('\n')
  .map(levels => levels.split(/\s+/).map(Number))
  .slice(0, -1)
  .filter(levels => isSorted(levels) && smallDiff(levels))
  .length

// 2.2

const opOnArr = op => arr => arr.length <= 1 || (op(arr[0], arr[1]) && opOnArr(op)(arr.slice(1)))
const isSorted = arr => isSortedAsc(arr) || isSortedDesc(arr)
const isSortedAsc = opOnArr((a, b) => a > b && a - b <= 3)
const isSortedDesc = opOnArr((a, b) => a < b && b - a <= 3)
document.body.innerText
  .split('\n')
  .map(arr => arr.split(/\s+/).map(Number))
  .slice(0, -1)
  .map(arr => arr.map((_, i) => [...arr.slice(0, i), ...arr.slice(i + 1)]))
  .filter(arrOfArrs => arrOfArrs.some(isSorted))
  .length

// 3.1

Array.from(
  document.body.innerText.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)
)
  .map(([, a, b]) => Number(a) * Number(b))
  .reduce((a, b) => a + b, 0)

// 3.2

Array.from(document.body.innerText.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g))
  .reduce(([acc, flag], [ins, a, b]) => [acc + (ins.startsWith('mul') ? Number(a) * Number(b) : 0) * flag, ins === 'do()' ? 1 : ins === "don't()" ? 0 : flag], [0, 1])
  .at(0)

// 4.1

let count = 0;
document.body.innerText
  .split('\n')
  .slice(0, -1)
  .map(line => line.split(''))
  .forEach((line, i, lines) => line.forEach((letter, j, letters) => {
    const is = lines.length;
    const js = letters.length;
    if (letter === 'X') {
      if (lines[i-1]?.[j]==='M'&&lines[i-2]?.[j]==='A'&&lines[i-3]?.[j]==='S') count++;
      if (lines[i-1]?.[j+1]==='M'&&lines[i-2]?.[j+2]==='A'&&lines[i-3]?.[j+3]==='S') count++;
      if (lines[i]?.[j+1]==='M'&&lines[i]?.[j+2]==='A'&&lines[i]?.[j+3]==='S') count++;
      if (lines[i+1]?.[j+1]==='M'&&lines[i+2]?.[j+2]==='A'&&lines[i+3]?.[j+3]==='S') count++;
      if (lines[i+1]?.[j]==='M'&&lines[i+2]?.[j]==='A'&&lines[i+3]?.[j]==='S') count++;
      if (lines[i+1]?.[j-1]==='M'&&lines[i+2]?.[j-2]==='A'&&lines[i+3]?.[j-3]==='S') count++;
      if (lines[i]?.[j-1]==='M'&&lines[i]?.[j-2]==='A'&&lines[i]?.[j-3]==='S') count++;
      if (lines[i-1]?.[j-1]==='M'&&lines[i-2]?.[j-2]==='A'&&lines[i-3]?.[j-3]==='S') count++;
    }
  }))
count;

// 4.2

let count = 0;
document.body.innerText
  .split('\n')
  .slice(0, -1)
  .map(line => line.split(''))
  .forEach((line, i, lines) => line.forEach((letter, j, letters) => {
    if (letter === 'A') {
      if (
        (lines[i-1]?.[j-1]==='M'&&lines[i+1]?.[j+1]==='S' || lines[i-1]?.[j-1]==='S'&&lines[i+1]?.[j+1]==='M')
        && (lines[i-1]?.[j+1]==='M'&&lines[i+1]?.[j-1]==='S' || lines[i-1]?.[j+1]==='S'&&lines[i+1]?.[j-1]==='M')
      ) count++;
    }
  }))
count;

// 5.1

const [rules, updates] =
  document.body.innerText
    .split('\n\n')
    .map(groups => groups.split('\n'));
const rulesMap = rules
  .map(rule => rule.split('|'))
  .reduce((map, [bef, aft]) => {
    if (!map[aft]) map[aft] = [bef];
    else map[aft].push(bef);
    return map;
  }, {});
updates
  .slice(0, -1)
  .map(update => update.split(','))
  .filter(update => update.every((sym, i) => update.slice(i).every(aftSym => !rulesMap[sym]?.includes(aftSym))))
  .map(update => Number(update[Math.floor(update.length / 2)]))
  .reduce((a, b) => a + b, 0);

// 5.2

const [rules, updates] =
  document.body.innerText
    .split('\n\n')
    .map(groups => groups.split('\n'));
const rulesMap = rules
  .map(rule => rule.split('|'))
  .reduce((map, [bef, aft]) => {
    if (!map[aft]) map[aft] = new Set();
    map[aft].add(bef);
    return map;
  }, {});
updates
  .slice(0, -1)
  .map(update => {
    update = update.split(',');
    let isCorrect = true;
    while (true) {
      const beforeArr = []
      for (let i = 0; i < update.length; i++) {
        const current = update[i];
        const beforeCurrent = rulesMap[current];
        let left = [];
        let right = [];
        for (let j = i + 1; j < update.length; j++) {
          const after = update[j];
          (beforeCurrent.has(after) ? left : right).push(after);
        }
        if (left.length !== 0) {
          update = [
            ...beforeArr,
            ...left,
            current,
            ...right,
          ];
          isCorrect = false;
          break;
        }
        beforeArr.push(current);
      }
      if (beforeArr.length === update.length) {
        break;
      }
    }
    if (isCorrect) return 0;
    return Number(update[Math.floor(update.length / 2)]);
  })
  .reduce((a, b) => a + b, 0);


// 6.1

const field = document.body.innerText
  .split('\n')
  .map(lines => lines.split(''))
  .slice(0, -1)
let y = field.findIndex(line => line.includes('^'))
let x = field[y].findIndex(sym => sym === '^')
let dir = [-1, 0];
const getNextCoord = () => [y + dir[0], x + dir[1]];
const getNext = () => {
  const [i, j] = getNextCoord();
  return field[i]?.[j];
}
while (getNext() !== undefined) {
  if (getNext() === '#') {
    // [-1, 0] -> [0, 1] -> [1, 0] -> [0, -1]
    dir = [dir[0] === 0 ? dir[1] : 0, dir[1] === 0 ? -dir[0] : 0]
  }
  field[y][x] = 'X';
  [y, x] = getNextCoord();
  field[y][x] = '^';
}
field.reduce((sum, line) => sum + line.reduce((acc, sym) => acc + (sym === 'X' || sym === '^' ? 1 : 0), 0), 0)

// 6.2

const fieldOrig = document.body.innerText
  .split('\n')
  .map(lines => lines.split(''))
  .slice(0, -1)
const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]];
function* getNextGen(field) {
  let y = field.findIndex(line => line.includes('^'))
  let x = field[y].findIndex(sym => sym === '^')
  let dir = 0;
  let sym;
  do {
    let next;
    let i, j;
    do {
      [i, j] = DIRS[dir];
      next = field[y + i]?.[x + j];
      if (next === '#') {
        dir = (dir + 1) % DIRS.length;
      }
    } while (next === '#');
    sym = field[y]?.[x];
    yield [sym, y, x, dir];
    [y, x] = [y + i, x + j];
  } while (sym !== undefined);
}
const isThereLoop = (yi, xj) => {
  const fieldCopy = fieldOrig.map((line, y) => line.map((sym, x) => yi === y && x === xj ? '#' : sym));
  const fieldSets = fieldOrig.map(line => line.map(() => new Set()));

  for (let [sym, yi, xj, dir] of getNextGen(fieldCopy)) {
    const currSet = fieldSets[yi]?.[xj];
    if (currSet === undefined) return false;

    if (currSet.has(dir)) {
      return true;
    } else {
      currSet.add(dir);
    }
  }
  return false;
}
const prevLoops = new Set();
const wasThisLoop = (yi, xj) => {
  return prevLoops.has(`${yi}_${xj}`);
}
const registerThisLoop = (yi, xj) => {
  return prevLoops.add(`${yi}_${xj}`);
}
for (let [sym, yi, xj] of getNextGen(fieldOrig)) {
  if (sym === '^') continue;
  if (wasThisLoop(yi, xj)) continue;
  if (isThereLoop(yi, xj)) {
    registerThisLoop(yi, xj)
  }
}
prevLoops.size;

// 7.1

document.body.innerText
  .split('\n')
  .map(lines => lines.split(': '))
  .slice(0, -1)
  .filter(([r, nums]) => {
    const res = Number(r);
    const numbers = nums.split(' ').map(Number);
    const pow = numbers.length - 1;
    const numOfArr = 2 ** pow;
    for (let i = 0; i < numOfArr; i++) {
      const [head, ...tail] = numbers;
      const result = tail.reduce((acc, nxt, j) => ((i & (1 << j)) === 0) ? acc + nxt : acc * nxt, head);
      if (res === result) return true;
    }
    return false;
  })
  .reduce((acc, [r]) => acc + Number(r), 0)

// 7.2

document.body.innerText
  .split('\n')
  .map(lines => lines.split(': '))
  .slice(0, -1)
  .filter(([r, nums]) => {
    const res = Number(r);
    const numbers = nums.split(' ').map(Number);

    function* applyOperation(numArr) {
      if (numArr.length === 0) return 0;
      if (numArr.length === 1) yield numArr[0];
      if (numArr.length === 2) {
        yield numArr[0] + numArr[1];
        yield numArr[0] * numArr[1];
        yield Number(`${numArr[0]}${numArr[1]}`);
      }
      if (numArr.length > 2) {
        const [a, b, ...tail] = numArr;
        for (let c of applyOperation([a, b])) {
          yield* applyOperation([c, ...tail]);
        }
      }
    }

    for (let result of applyOperation(numbers)) {
      if (res === result) return true;
    }
    return false;
  })
  .reduce((acc, [r]) => acc + Number(r), 0)

// 8.1

const field = document.body.innerText
  .split('\n')
  .map(lines => lines.split(''))
  .slice(0, -1);
const map = {};
field.forEach((line, y) => line.forEach((sym, x) => {
  if (sym === '.') return;
  map[sym] ??= [];
  map[sym].push([y, x])
}));
const fieldH = field.length;
const fieldW = field[0].length;
const antinodes = new Set();
Object.entries(map).forEach(([, points]) => {
  points.forEach((p1, i) => points.forEach((p2, j) => {
    if (i === j) return;
    const [p1y, p1x] = p1;
    const [p2y, p2x] = p2;
    const p3 = [2 * p2y - p1y, 2 * p2x - p1x];
    if (p3[0] >= 0 && p3[0] < fieldH && p3[1] >= 0 && p3[1] < fieldW) { antinodes.add(`${p3[0]}_${p3[1]}`); field[p3[0]][p3[1]] = '#'; }
  }))
})
antinodes.size;

// 8.2

const field = document.body.innerText.split('\n')
  .map(lines => lines.split(''))
  .slice(0, -1);
const map = {};
field.forEach((line, y) => line.forEach((sym, x) => {
  if (sym === '.') return;
  map[sym] ??= [];
  map[sym].push([y, x])
}));
const fieldH = field.length;
const fieldW = field[0].length;
const antinodes = new Set();
const findAntinodes = (p1, p2) => {
  antinodes.add(`${p1[0]}_${p1[1]}`);
  antinodes.add(`${p2[0]}_${p2[1]}`);
  const [p1y, p1x] = p1;
  const [p2y, p2x] = p2;
  const p3 = [2 * p2y - p1y, 2 * p2x - p1x];
  if (p3[0] >= 0 && p3[0] < fieldH && p3[1] >= 0 && p3[1] < fieldW) {
    antinodes.add(`${p3[0]}_${p3[1]}`);
    if (field[p3[0]][p3[1]] === '.') field[p3[0]][p3[1]] = '#';
    findAntinodes(p2, p3);
  }
}
Object.entries(map).forEach(([, points]) => {
  points.forEach((p1, i) => points.forEach((p2, j) => {
    if (i === j) return;
    findAntinodes(p1, p2);
  }))
})
antinodes.size;

// 9.1

const arr = document.body.innerText
  .split('')
  .slice(0, -1)
  .flatMap((sym, i) => Array.from(Array(Number(sym)), () => i % 2 === 0 ? i / 2 : '.'))
let j = arr.length - 1;
for (let i = 0; i < arr.length; i++) {
  while (arr[j] === '.') j--;
  while (arr[i] !== '.') i++;
  if (i >= j) break;
  [arr[i], arr[j]] = [arr[j], arr[i]]
  j--;
}
arr.reduce((acc, nxt, i) => acc + (nxt === '.' ? 0 : nxt * i), 0)

// 9.2

const fileMap = {};
const emptyMap = {};
const fileIds = [];
let fsSize = 0;
document.body.innerText
  .split('')
  .slice(0, -1)
  .forEach((sym, i) => {
    const len = Number(sym);
    const isFile = i % 2 === 0;
    if (isFile) {
      const fileId = i / 2;
      fileIds.push(fileId);
      fileMap[fileId] = [fsSize, len];
    } else {
      emptyMap[fsSize] = len;
    }
    fsSize += len;
  })
let fileId;
while ((fileId = fileIds.pop()) !== undefined) {
  const [fileIndex, fileLen] = fileMap[fileId];
  for (let i = 0; i < fsSize && i < fileIndex; i++) {
    if (emptyMap[i] === undefined) continue;
    if (emptyMap[i] === 0) {
      delete emptyMap[i];
      continue;
    }
    let aggregatedSpace = 0;
    let j = i;
    do {
      const space = emptyMap[j];
      delete emptyMap[j];
      aggregatedSpace += space;
      j += space;
    } while (emptyMap[j] !== undefined);
    emptyMap[i] = aggregatedSpace;
    if (emptyMap[i] >= fileLen) {
      const leftSpace = emptyMap[i] - fileLen;
      delete emptyMap[i];
      if (leftSpace > 0) {
        emptyMap[i + fileLen] = leftSpace;
      }
      fileMap[fileId] = [i, fileLen];
      emptyMap[fileIndex] = fileLen;
      break;
    }
  }
}
const fileMapInverted = Object.entries(fileMap).reduce((acc, [id, [index, len]]) => {acc[index] = [Number(id), len]; return acc;}, {})
const fs = [];
for (let i = 0; i < fsSize; i++) {
  if (emptyMap[i] !== undefined) {
    for (let j = 0; j < emptyMap[i]; j++) fs.push('.');
  } else if (fileMapInverted[i] !== undefined) {
    const [fileId, fileLen] = fileMapInverted[i];
    for (let j = 0; j < fileLen; j++) fs.push(fileId);
  }
}
fs.reduce((acc, nxt, i) => acc + (nxt === '.' ? 0 : nxt * i), 0)

// 10.1

const scoreField = []
const field = [];
document.body.innerText
  .split('\n')
  .slice(0, -1)
  .forEach((arr, i) => {
    field.push(arr.split('').map(Number));
    scoreField.push(field[i].map((n, j) => new Set()));
  });
for (let n = 9; n >= 0; n--) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === n) {
        if (n === 9) {
          scoreField[i][j].add(`${i}_${j}`);
        } else {
          for (let ii = -1, jj = 0, o = 0; o < 4;  [ii, jj] = [ii === 0 ? jj : 0, jj === 0 ? -ii : 0], o++) {
            const iii = i + ii;
            const jjj = j + jj;
            if (iii < 0 || iii >= field.length || jjj < 0 || jjj >= field[i].length) continue;
            if (field[iii][jjj] === n + 1 && scoreField[iii][jjj].size > 0) scoreField[iii][jjj].forEach(v => scoreField[i][j].add(v));
          }
        }
      }
    }
  }
}
field.reduce((acc, line, i) => line.reduce((acc, n, j) => acc + (n === 0 ? scoreField[i][j].size : 0), acc), 0)

// 10.2

const scoreField = []
const field = [];
document.body.innerText
  .split('\n')
  .slice(0, -1)
  .forEach((arr, i) => {
    field.push(arr.split('').map(Number));
    scoreField.push(field[i].map((n) => n === 9 ? 1 : 0));
  });
for (let n = 8; n >= 0; n--) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === n) {
        let nOfWays = 0;
        for (let ii = -1, jj = 0, o = 0; o < 4;  [ii, jj] = [ii === 0 ? jj : 0, jj === 0 ? -ii : 0], o++) {
          const iii = i + ii;
          const jjj = j + jj;
          if (iii < 0 || iii >= field.length || jjj < 0 || jjj >= field[i].length) continue;
          if (field[iii][jjj] === n + 1) nOfWays += scoreField[iii][jjj];
        }
        scoreField[i][j] = nOfWays;
      }
    }
  }
}
field.reduce((acc, line, i) => line.reduce((acc, n, j) => acc + (n === 0 ? scoreField[i][j] : 0), acc), 0)

// 11.1

const numers = document.body.innerText
  .slice(0, -1)
  .split(' ')
  .map(Number)
const processLeaf = leaf => {
  if (leaf === 0) return 1;
  const leafStr = String(leaf);
  if (leafStr.length % 2 === 0) {
    const halfLen = leafStr.length / 2;
    return [Number(leafStr.substring(0, halfLen)), Number(leafStr.substring(halfLen))];
  }
  return leaf * 2024;
}
let nums = numers
for (let i = 0; i < 25; i++) {
  nums = nums.flatMap(processLeaf)
}
nums.length

// alt

const numbers = document.body.innerText
  .slice(0, -1)
  .split(' ')
  .map(Number);
const mapOfHighestIters = {};
numbers.forEach((_, i) => mapOfHighestIters[i] = 0);
let countIters = 0;
const saveNumber = (n, i) => {
  numbers.push(n);
  mapOfHighestIters[numbers.length - 1] = i + 1;
}
const processLast = () => {
  const numbersLen = numbers.length;
  const itemIter = mapOfHighestIters[numbers.length - 1];
  delete mapOfHighestIters[numbers.length - 1];
  const item = numbers.pop();

  if (itemIter === 25) {
    countIters++;
    return;
  }

  if (item === 0) {
    saveNumber(1, itemIter);
  } else {
    const itemStr = String(item);
    if (itemStr.length % 2 === 0) {
      const halfLen = itemStr.length / 2;
      saveNumber(Number(itemStr.substring(0, halfLen)), itemIter);
      saveNumber(Number(itemStr.substring(halfLen)), itemIter);
    } else {
      saveNumber(item * 2024, itemIter);
    }
  }
}
while (numbers.length > 0) {
  processLast();
}
countIters;

// 11.2

const numbers = document.body.innerText
  .slice(0, -1)
  .split(' ')
  .map(Number);
const numOfChildrenMap = new Map();
const saveChildrenRes = (number, iterations, res) => {
  const map = numOfChildrenMap.get(number);
  if (!map) numOfChildrenMap.set(number, new Map());
  numOfChildrenMap.get(number).set(iterations, res);
}
const getNumOfChildren = (number, iterations) => {
  const answer = numOfChildrenMap.get(number)?.get(iterations);
  if (answer !== undefined) return answer;
  let res;
  if (iterations === 0) {
    res = 1;
  } else if (number === 0) {
    res = getNumOfChildren(1, iterations - 1);
  } else {
    const numberStr = String(number);
    if (numberStr.length % 2 === 0) {
      const halfLen = numberStr.length / 2;
      const a = getNumOfChildren(Number(numberStr.substring(0, halfLen)), iterations - 1)
      const b = getNumOfChildren(Number(numberStr.substring(halfLen)), iterations - 1)
      res = a + b;
    } else {
      res = getNumOfChildren(number * 2024, iterations - 1);
    }
  }

  saveChildrenRes(number, iterations, res);
  return res;
}
const getNumOfArrChildren = (numbers, iterations) => {
  let answer = 0;
  for (let i = 0; i < numbers.length; i++) {
    answer += getNumOfChildren(numbers[i], iterations);
  }
  return answer;
}
getNumOfArrChildren(numbers, 75)

// 12.1

const field = document.body.innerText
  .slice(0, -1)
  .split('\n')
  .map(line => line.split(''))
const key = (y, x) => `${y}_${x}`
const visitedNodes = new Set();
const fieldH = field.length;
const fieldW = field[0].length;
let result = 0;
for (let i = 0; i < fieldH; i++) {
  for (let j = 0; j < fieldW; j++) {
    if (visitedNodes.has(key(i, j))) continue;
    const letter = field[i][j];
    const blob = (function collectBlob(blobAcc, [y, x]) {
      visitedNodes.add(key(y, x));
      blobAcc.area++;
      for (let ii = -1, jj = 0, o = 0; o < 4;  [ii, jj] = [ii === 0 ? jj : 0, jj === 0 ? -ii : 0], o++) {
        const iii = y + ii;
        const jjj = x + jj;
        if (iii < 0 || iii >= fieldH || jjj < 0 || jjj >= fieldW || field[iii][jjj] !== blobAcc.letter) {
          blobAcc.perimeter++;
        } else if(!visitedNodes.has(key(iii, jjj))) {
          collectBlob(blobAcc, [iii, jjj]);
        }
      }
      return blobAcc;
    })({ letter, area: 0, perimeter: 0 }, [i, j]);
    result += blob.area * blob.perimeter;
  }
}
result;

// 12.2

const field = document.body.innerText
  .slice(0, -1)
  .split('\n')
  .map(line => line.split(''))
const key = (y, x) => `${y}_${x}`
const visitedNodes = new Set();
const fieldH = field.length;
const fieldW = field[0].length;
let result = 0;
for (let i = 0; i < fieldH; i++) {
  for (let j = 0; j < fieldW; j++) {
    if (visitedNodes.has(key(i, j))) continue;
    const letter = field[i][j];
    const blob = (function collectBlob(blobAcc, [y, x]) {
      visitedNodes.add(key(y, x));
      blobAcc.area++;
      for (let ii = -1, jj = 0, o = 0; o < 4;  [ii, jj] = [ii === 0 ? jj : 0, jj === 0 ? -ii : 0], o++) {
        const iii = y + ii;
        const jjj = x + jj;
        if (iii < 0 || iii >= fieldH || jjj < 0 || jjj >= fieldW || field[iii][jjj] !== blobAcc.letter) {
          const dir = key(ii, jj);
          if (!blobAcc.sides.has(dir)) blobAcc.sides.set(dir, new Map());
          const dirMap = blobAcc.sides.get(dir);
          const [k, v] = ii === 0 ? [jjj, iii] : [iii, jjj];
          if (!dirMap.has(k)) dirMap.set(k, new Set());
          dirMap.get(k).add(v);
        } else if(!visitedNodes.has(key(iii, jjj))) {
          collectBlob(blobAcc, [iii, jjj]);
        }
      }
      return blobAcc;
    })({ letter, area: 0, sides: new Map() }, [i, j]);
    let sides = 0;
    for (let map of blob.sides.values()) {
      for (let set of map.values()) {
        const arr = Array.from(set).toSorted((a, b) => a - b);
        sides++;
        let lastN = arr[0];
        for (let n of arr) {
          if (n - lastN > 1) sides++;
          lastN = n;
        }
      }
    }
    result += blob.area * sides;
  }
}
result;

// 13.1

const text = document.body.innerText;
const machines = Array.from(text.matchAll(/Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)\n/gm));
const det2x2 = (a11, a12, a21, a22) => a11 * a22 - a12 * a21;
const inv2x2 = (a11, a12, a21, a22) => [a22, -a12, -a21, a11].map(a => a / det2x2(a11, a12, a21, a22));
const mul2x2ByVec = (a11, a12, a21, a22, b1, b2) => [a11 * b1 + a12 * b2, a21 * b1 + a22 * b2];
const toInt = n => Math.round(n);
const isInt = n => Math.abs(toInt(n) - n) < 0.0000001;

let count = 0;
for (let machine of machines) {
  const [, ...coords] = machine;
  const [ax, ay, bx, by, px, py] = coords.map(Number);
  const [x, y] = mul2x2ByVec(...inv2x2(ax, bx, ay, by), px, py);
  if (isInt(x) && isInt(y)) {
    count += 3 * toInt(x) + toInt(y);
  }
}
count;

// 13.2

const text = document.body.innerText;
const machines = Array.from(text.matchAll(/Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)\n/gm));
const det2x2 = (a11, a12, a21, a22) => a11 * a22 - a12 * a21;
const inv2x2 = (a11, a12, a21, a22) => [a22, -a12, -a21, a11].map(a => a / det2x2(a11, a12, a21, a22));
const mul2x2ByVec = (a11, a12, a21, a22, b1, b2) => [a11 * b1 + a12 * b2, a21 * b1 + a22 * b2];
const toInt = n => Math.round(n);
const isInt = n => Math.abs(toInt(n) - n) < 0.0001;

let count = 0;
for (let machine of machines) {
  const [, ...coords] = machine;
  const [ax, ay, bx, by, px, py] = coords.map(Number);
  const [x, y] = mul2x2ByVec(...inv2x2(ax, bx, ay, by), px + 10000000000000, py + 10000000000000);
  if (isInt(x) && isInt(y)) {
    count += 3 * toInt(x) + toInt(y);
  }
}
count;