export function isPerfectSquare(value) {
  if (!Number.isInteger(value) || value < 0) {
    return false;
  }

  const root = Math.sqrt(value);
  return Number.isInteger(root);
}

export function validateInputs(p, q) {
  const errors = [];

  if (!Number.isInteger(p) || p < 4 || p > 64) {
    errors.push('p must be an integer between 4 and 64.');
  }

  if (Number.isInteger(p) && !isPerfectSquare(p)) {
    errors.push('p must be a perfect square (4, 9, 16, 25, 36, 49, 64).');
  }

  if (!Number.isInteger(q)) {
    errors.push('q must be an integer.');
  }

  if (Number.isInteger(p) && Number.isInteger(q) && (q < 1 || q > p - 1)) {
    errors.push('q must be in the range 1 to p - 1.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function createInitialData(p) {
  return Array.from({ length: p }, (_, index) => `D${index}`);
}

export function getStepMetrics(p, q) {
  const meshSize = Math.sqrt(p);
  const rowShiftAmount = q % meshSize;
  const columnShiftAmount = Math.floor(q / meshSize);
  const meshSteps = rowShiftAmount + columnShiftAmount;
  const ringSteps = Math.min(q, p - q);

  return {
    meshSize,
    rowShiftAmount,
    columnShiftAmount,
    meshSteps,
    ringSteps
  };
}

function shiftRows(data, p, rowShiftAmount) {
  const meshSize = Math.sqrt(p);
  const next = Array(p).fill('');
  const moves = [];

  for (let row = 0; row < meshSize; row += 1) {
    for (let col = 0; col < meshSize; col += 1) {
      const source = row * meshSize + col;
      const targetCol = (col + rowShiftAmount) % meshSize;
      const target = row * meshSize + targetCol;
      next[target] = data[source];
      moves.push({
        from: source,
        to: target,
        value: data[source],
        direction: rowShiftAmount === 0 ? 'none' : 'right'
      });
    }
  }

  return { data: next, moves };
}

function shiftColumns(data, p, columnShiftAmount) {
  const meshSize = Math.sqrt(p);
  const next = Array(p).fill('');
  const moves = [];

  for (let row = 0; row < meshSize; row += 1) {
    for (let col = 0; col < meshSize; col += 1) {
      const source = row * meshSize + col;
      const targetRow = (row + columnShiftAmount) % meshSize;
      const target = targetRow * meshSize + col;
      next[target] = data[source];
      moves.push({
        from: source,
        to: target,
        value: data[source],
        direction: columnShiftAmount === 0 ? 'none' : 'down'
      });
    }
  }

  return { data: next, moves };
}

export function runMeshShift(p, q) {
  const initial = createInitialData(p);
  const { rowShiftAmount, columnShiftAmount, meshSteps, ringSteps, meshSize } = getStepMetrics(p, q);

  const rowResult = shiftRows(initial, p, rowShiftAmount);
  const columnResult = shiftColumns(rowResult.data, p, columnShiftAmount);

  return {
    p,
    q,
    meshSize,
    initial,
    afterRowShift: rowResult.data,
    final: columnResult.data,
    rowShiftAmount,
    columnShiftAmount,
    meshSteps,
    ringSteps,
    rowMoves: rowResult.moves,
    columnMoves: columnResult.moves
  };
}
