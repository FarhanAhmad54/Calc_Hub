// Math & Basic Calculations (101-130)
const mathCalculators = [
    {
        id: 'average', name: 'Average Calculator', icon: '📊', category: 'Math & Basic', description: 'Calculate average of numbers',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 10,20,30,40,50' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const sum = nums.reduce((a, b) => a + b, 0); const avg = sum / nums.length; return { result: avg.toFixed(2), details: `Count: ${nums.length}, Sum: ${sum}, Average: ${avg.toFixed(2)}` }; }
    },
    {
        id: 'mean', name: 'Mean Calculator', icon: '📈', category: 'Math & Basic', description: 'Calculate arithmetic mean',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 5,10,15,20' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const mean = nums.reduce((a, b) => a + b, 0) / nums.length; return { result: mean.toFixed(4), details: `Mean: ${mean.toFixed(4)}` }; }
    },
    {
        id: 'median', name: 'Median Calculator', icon: '📉', category: 'Math & Basic', description: 'Find the median value',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 3,1,4,1,5,9,2' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b); const mid = Math.floor(nums.length / 2); const median = nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2; return { result: median.toFixed(2), details: `Sorted: ${nums.join(', ')}<br>Median: ${median}` }; }
    },
    {
        id: 'mode', name: 'Mode Calculator', icon: '📊', category: 'Math & Basic', description: 'Find the most frequent value',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 1,2,2,3,3,3,4' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const freq = {}; nums.forEach(n => freq[n] = (freq[n] || 0) + 1); const maxF = Math.max(...Object.values(freq)); const modes = Object.keys(freq).filter(k => freq[k] === maxF); return { result: modes.join(', '), details: `Mode(s): ${modes.join(', ')}, Freq: ${maxF}` }; }
    },
    {
        id: 'ratio', name: 'Ratio Calculator', icon: '⚖️', category: 'Math & Basic', description: 'Simplify ratios',
        fields: [{ id: 'a', label: 'First Number', type: 'number', placeholder: 'e.g., 24' }, { id: 'b', label: 'Second Number', type: 'number', placeholder: 'e.g., 36' }],
        calculate: (v) => { const a = parseFloat(v.a), b = parseFloat(v.b); const gcd = (x, y) => y === 0 ? x : gcd(y, x % y); const d = gcd(a, b); return { result: `${a / d} : ${b / d}`, details: `Original: ${a}:${b}, Simplified: ${a / d}:${b / d}` }; }
    },
    {
        id: 'proportion', name: 'Proportion Calculator', icon: '📐', category: 'Math & Basic', description: 'Solve a:b = c:x',
        fields: [{ id: 'a', label: 'A', type: 'number', placeholder: '2' }, { id: 'b', label: 'B', type: 'number', placeholder: '3' }, { id: 'c', label: 'C', type: 'number', placeholder: '4' }],
        calculate: (v) => { const a = parseFloat(v.a), b = parseFloat(v.b), c = parseFloat(v.c); const x = (b * c) / a; return { result: `X = ${x.toFixed(4)}`, details: `${a}:${b} = ${c}:X → X = ${x.toFixed(4)}` }; }
    },
    {
        id: 'fraction-to-decimal', name: 'Fraction to Decimal', icon: '🔢', category: 'Math & Basic', description: 'Convert fraction to decimal',
        fields: [{ id: 'num', label: 'Numerator', type: 'number', placeholder: '3' }, { id: 'den', label: 'Denominator', type: 'number', placeholder: '4' }],
        calculate: (v) => { const n = parseFloat(v.num), d = parseFloat(v.den); if (d === 0) return { error: 'Denominator cannot be zero' }; const dec = n / d; return { result: dec.toFixed(6), details: `${n}/${d} = ${dec.toFixed(6)} (${(dec * 100).toFixed(2)}%)` }; }
    },
    {
        id: 'decimal-to-fraction', name: 'Decimal to Fraction', icon: '📝', category: 'Math & Basic', description: 'Convert decimal to fraction',
        fields: [{ id: 'decimal', label: 'Decimal', type: 'number', placeholder: '0.75', step: 'any' }],
        calculate: (v) => { const dec = parseFloat(v.decimal); const gcd = (a, b) => b === 0 ? a : gcd(b, a % b); let num = Math.round(dec * 1000000), den = 1000000; const d = gcd(num, den); return { result: `${num / d}/${den / d}`, details: `${dec} = ${num / d}/${den / d}` }; }
    },
    {
        id: 'percentage-increase', name: 'Percentage Increase', icon: '📈', category: 'Math & Basic', description: 'Calculate percentage increase',
        fields: [{ id: 'original', label: 'Original', type: 'number', placeholder: '100' }, { id: 'new', label: 'New', type: 'number', placeholder: '150' }],
        calculate: (v) => { const o = parseFloat(v.original), n = parseFloat(v.new); const pct = ((n - o) / o) * 100; return { result: pct.toFixed(2) + '% increase', details: `(${n} - ${o}) / ${o} × 100 = ${pct.toFixed(2)}%` }; }
    },
    {
        id: 'percentage-decrease', name: 'Percentage Decrease', icon: '📉', category: 'Math & Basic', description: 'Calculate percentage decrease',
        fields: [{ id: 'original', label: 'Original', type: 'number', placeholder: '200' }, { id: 'new', label: 'New', type: 'number', placeholder: '150' }],
        calculate: (v) => { const o = parseFloat(v.original), n = parseFloat(v.new); const pct = ((o - n) / o) * 100; return { result: pct.toFixed(2) + '% decrease', details: `(${o} - ${n}) / ${o} × 100 = ${pct.toFixed(2)}%` }; }
    },
    {
        id: 'square', name: 'Square Calculator', icon: '⬛', category: 'Math & Basic', description: 'Calculate square',
        fields: [{ id: 'n', label: 'Number', type: 'number', placeholder: '12' }],
        calculate: (v) => { const n = parseFloat(v.n); return { result: (n * n).toString(), details: `${n}² = ${n * n}` }; }
    },
    {
        id: 'cube', name: 'Cube Calculator', icon: '🧊', category: 'Math & Basic', description: 'Calculate cube',
        fields: [{ id: 'n', label: 'Number', type: 'number', placeholder: '5' }],
        calculate: (v) => { const n = parseFloat(v.n); return { result: (n * n * n).toString(), details: `${n}³ = ${n * n * n}` }; }
    },
    {
        id: 'square-root', name: 'Square Root', icon: '√', category: 'Math & Basic', description: 'Calculate square root',
        fields: [{ id: 'n', label: 'Number', type: 'number', placeholder: '144' }],
        calculate: (v) => { const n = parseFloat(v.n); if (n < 0) return { error: 'Cannot calculate for negative' }; return { result: Math.sqrt(n).toFixed(6), details: `√${n} = ${Math.sqrt(n).toFixed(6)}` }; }
    },
    {
        id: 'cube-root', name: 'Cube Root', icon: '∛', category: 'Math & Basic', description: 'Calculate cube root',
        fields: [{ id: 'n', label: 'Number', type: 'number', placeholder: '27' }],
        calculate: (v) => { const n = parseFloat(v.n); return { result: Math.cbrt(n).toFixed(6), details: `∛${n} = ${Math.cbrt(n).toFixed(6)}` }; }
    },
    {
        id: 'power', name: 'Power Calculator', icon: 'xⁿ', category: 'Math & Basic', description: 'Calculate exponent',
        fields: [{ id: 'base', label: 'Base', type: 'number', placeholder: '2' }, { id: 'exp', label: 'Exponent', type: 'number', placeholder: '10' }],
        calculate: (v) => { const b = parseFloat(v.base), e = parseFloat(v.exp); return { result: Math.pow(b, e).toString(), details: `${b}^${e} = ${Math.pow(b, e)}` }; }
    },
    {
        id: 'lcm', name: 'LCM Calculator', icon: '🔢', category: 'Math & Basic', description: 'Find Least Common Multiple',
        fields: [{ id: 'nums', label: 'Numbers (comma separated)', type: 'text', placeholder: '4,6,8' }],
        calculate: (v) => { const nums = v.nums.split(',').map(n => parseInt(n.trim())); const gcd = (a, b) => b === 0 ? a : gcd(b, a % b); const lcm = (a, b) => (a * b) / gcd(a, b); const r = nums.reduce((a, b) => lcm(a, b)); return { result: r.toString(), details: `LCM of ${nums.join(', ')} = ${r}` }; }
    },
    {
        id: 'hcf', name: 'HCF/GCD Calculator', icon: '🔢', category: 'Math & Basic', description: 'Find Highest Common Factor',
        fields: [{ id: 'nums', label: 'Numbers (comma separated)', type: 'text', placeholder: '24,36,48' }],
        calculate: (v) => { const nums = v.nums.split(',').map(n => parseInt(n.trim())); const gcd = (a, b) => b === 0 ? a : gcd(b, a % b); const r = nums.reduce((a, b) => gcd(a, b)); return { result: r.toString(), details: `HCF/GCD of ${nums.join(', ')} = ${r}` }; }
    },
    {
        id: 'prime-check', name: 'Prime Number Checker', icon: '🔍', category: 'Math & Basic', description: 'Check if prime',
        fields: [{ id: 'n', label: 'Number', type: 'number', placeholder: '17' }],
        calculate: (v) => { const n = parseInt(v.n); if (n < 2) return { result: 'Not Prime', details: `${n} is not prime` }; for (let i = 2; i <= Math.sqrt(n); i++) { if (n % i === 0) return { result: 'Not Prime', details: `${n} is divisible by ${i}` }; } return { result: '✅ Prime', details: `${n} is a prime number!` }; }
    },
    {
        id: 'factorial', name: 'Factorial Calculator', icon: 'n!', category: 'Math & Basic', description: 'Calculate factorial',
        fields: [{ id: 'n', label: 'Number', type: 'number', placeholder: '5' }],
        calculate: (v) => { const n = parseInt(v.n); if (n < 0) return { error: 'Not defined for negative' }; if (n > 170) return { error: 'Number too large' }; let f = 1; for (let i = 2; i <= n; i++) f *= i; return { result: f.toLocaleString(), details: `${n}! = ${f.toLocaleString()}` }; }
    },
    {
        id: 'permutation', name: 'Permutation Calculator', icon: 'nPr', category: 'Math & Basic', description: 'Calculate permutations',
        fields: [{ id: 'n', label: 'n (total)', type: 'number', placeholder: '5' }, { id: 'r', label: 'r (select)', type: 'number', placeholder: '3' }],
        calculate: (v) => { const n = parseInt(v.n), r = parseInt(v.r); if (r > n) return { error: 'r cannot exceed n' }; const fact = (x) => { let f = 1; for (let i = 2; i <= x; i++) f *= i; return f; }; const p = fact(n) / fact(n - r); return { result: p.toLocaleString(), details: `P(${n},${r}) = ${p.toLocaleString()}` }; }
    },
    {
        id: 'combination', name: 'Combination Calculator', icon: 'nCr', category: 'Math & Basic', description: 'Calculate combinations',
        fields: [{ id: 'n', label: 'n (total)', type: 'number', placeholder: '5' }, { id: 'r', label: 'r (select)', type: 'number', placeholder: '3' }],
        calculate: (v) => { const n = parseInt(v.n), r = parseInt(v.r); if (r > n) return { error: 'r cannot exceed n' }; const fact = (x) => { let f = 1; for (let i = 2; i <= x; i++) f *= i; return f; }; const c = fact(n) / (fact(r) * fact(n - r)); return { result: c.toLocaleString(), details: `C(${n},${r}) = ${c.toLocaleString()}` }; }
    },
    {
        id: 'equation-solver', name: 'Equation Solver (ax+b=c)', icon: '🧮', category: 'Math & Basic', description: 'Solve linear equation',
        fields: [{ id: 'a', label: 'a', type: 'number', placeholder: '2' }, { id: 'b', label: 'b', type: 'number', placeholder: '5' }, { id: 'c', label: 'c', type: 'number', placeholder: '15' }],
        calculate: (v) => { const a = parseFloat(v.a), b = parseFloat(v.b), c = parseFloat(v.c); if (a === 0) return { error: 'a cannot be zero' }; const x = (c - b) / a; return { result: `x = ${x.toFixed(4)}`, details: `${a}x + ${b} = ${c} → x = ${x.toFixed(4)}` }; }
    },
    {
        id: 'linear-equation', name: 'Linear Equation', icon: '📈', category: 'Math & Basic', description: 'Find slope & y-intercept',
        fields: [{ id: 'x1', label: 'X1', type: 'number', placeholder: '1' }, { id: 'y1', label: 'Y1', type: 'number', placeholder: '2' }, { id: 'x2', label: 'X2', type: 'number', placeholder: '3' }, { id: 'y2', label: 'Y2', type: 'number', placeholder: '6' }],
        calculate: (v) => { const x1 = parseFloat(v.x1), y1 = parseFloat(v.y1), x2 = parseFloat(v.x2), y2 = parseFloat(v.y2); if (x1 === x2) return { error: 'Vertical line' }; const m = (y2 - y1) / (x2 - x1), b = y1 - m * x1; return { result: `y = ${m.toFixed(2)}x + ${b.toFixed(2)}`, details: `Slope: ${m.toFixed(4)}, Y-intercept: ${b.toFixed(4)}` }; }
    },
    {
        id: 'quadratic', name: 'Quadratic Solver', icon: 'x²', category: 'Math & Basic', description: 'Solve ax² + bx + c = 0',
        fields: [{ id: 'a', label: 'a', type: 'number', placeholder: '1' }, { id: 'b', label: 'b', type: 'number', placeholder: '-5' }, { id: 'c', label: 'c', type: 'number', placeholder: '6' }],
        calculate: (v) => { const a = parseFloat(v.a), b = parseFloat(v.b), c = parseFloat(v.c); if (a === 0) return { error: 'Not quadratic' }; const d = b * b - 4 * a * c; if (d < 0) { const r = -b / (2 * a), i = Math.sqrt(-d) / (2 * a); return { result: 'Complex roots', details: `x = ${r.toFixed(4)} ± ${i.toFixed(4)}i` }; } const x1 = (-b + Math.sqrt(d)) / (2 * a), x2 = (-b - Math.sqrt(d)) / (2 * a); return { result: `x = ${x1.toFixed(4)}, ${x2.toFixed(4)}`, details: `Discriminant: ${d}` }; }
    },
    {
        id: 'area', name: 'Area Calculator', icon: '📐', category: 'Math & Basic', description: 'Calculate area of shapes',
        fields: [{ id: 'shape', label: 'Shape', type: 'select', options: ['Square', 'Rectangle', 'Circle', 'Triangle'] }, { id: 'd1', label: 'Dim 1', type: 'number', placeholder: '10' }, { id: 'd2', label: 'Dim 2', type: 'number', placeholder: '5' }],
        calculate: (v) => { const d1 = parseFloat(v.d1), d2 = parseFloat(v.d2) || 0; let a; if (v.shape === 'Square') a = d1 * d1; else if (v.shape === 'Rectangle') a = d1 * d2; else if (v.shape === 'Circle') a = Math.PI * d1 * d1; else a = 0.5 * d1 * d2; return { result: a.toFixed(4) + ' sq units', details: `${v.shape} area: ${a.toFixed(4)}` }; }
    },
    {
        id: 'perimeter', name: 'Perimeter Calculator', icon: '📏', category: 'Math & Basic', description: 'Calculate perimeter',
        fields: [{ id: 'shape', label: 'Shape', type: 'select', options: ['Square', 'Rectangle', 'Circle', 'Triangle'] }, { id: 'd1', label: 'Dim 1', type: 'number', placeholder: '10' }, { id: 'd2', label: 'Dim 2', type: 'number', placeholder: '5' }, { id: 'd3', label: 'Dim 3', type: 'number', placeholder: '7' }],
        calculate: (v) => { const d1 = parseFloat(v.d1), d2 = parseFloat(v.d2) || 0, d3 = parseFloat(v.d3) || 0; let p; if (v.shape === 'Square') p = 4 * d1; else if (v.shape === 'Rectangle') p = 2 * (d1 + d2); else if (v.shape === 'Circle') p = 2 * Math.PI * d1; else p = d1 + d2 + d3; return { result: p.toFixed(4) + ' units', details: `${v.shape} perimeter: ${p.toFixed(4)}` }; }
    },
    {
        id: 'volume', name: 'Volume Calculator', icon: '📦', category: 'Math & Basic', description: 'Calculate volume of 3D shapes',
        fields: [{ id: 'shape', label: 'Shape', type: 'select', options: ['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone'] }, { id: 'd1', label: 'Dim 1', type: 'number', placeholder: '5' }, { id: 'd2', label: 'Dim 2', type: 'number', placeholder: '4' }, { id: 'd3', label: 'Dim 3', type: 'number', placeholder: '3' }],
        calculate: (v) => { const d1 = parseFloat(v.d1), d2 = parseFloat(v.d2) || 0, d3 = parseFloat(v.d3) || 0; let vol; if (v.shape === 'Cube') vol = Math.pow(d1, 3); else if (v.shape === 'Cuboid') vol = d1 * d2 * d3; else if (v.shape === 'Sphere') vol = (4 / 3) * Math.PI * Math.pow(d1, 3); else if (v.shape === 'Cylinder') vol = Math.PI * d1 * d1 * d2; else vol = (1 / 3) * Math.PI * d1 * d1 * d2; return { result: vol.toFixed(4) + ' cubic units', details: `${v.shape} volume: ${vol.toFixed(4)}` }; }
    },
    {
        id: 'speed', name: 'Speed Calculator', icon: '🚀', category: 'Math & Basic', description: 'Calculate speed/distance/time',
        fields: [{ id: 'calc', label: 'Calculate', type: 'select', options: ['Speed', 'Distance', 'Time'] }, { id: 'v1', label: 'Value 1', type: 'number', placeholder: '100' }, { id: 'v2', label: 'Value 2', type: 'number', placeholder: '2' }],
        calculate: (v) => { const v1 = parseFloat(v.v1), v2 = parseFloat(v.v2); let r; if (v.calc === 'Speed') r = v1 / v2; else if (v.calc === 'Distance') r = v1 * v2; else r = v1 / v2; return { result: r.toFixed(4), details: `${v.calc} = ${r.toFixed(4)}` }; }
    },
    {
        id: 'distance', name: 'Distance Between Points', icon: '📍', category: 'Math & Basic', description: 'Calculate distance',
        fields: [{ id: 'x1', label: 'X1', type: 'number', placeholder: '0' }, { id: 'y1', label: 'Y1', type: 'number', placeholder: '0' }, { id: 'x2', label: 'X2', type: 'number', placeholder: '3' }, { id: 'y2', label: 'Y2', type: 'number', placeholder: '4' }],
        calculate: (v) => { const x1 = parseFloat(v.x1), y1 = parseFloat(v.y1), x2 = parseFloat(v.x2), y2 = parseFloat(v.y2); const d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); return { result: d.toFixed(4) + ' units', details: `Distance: ${d.toFixed(4)}` }; }
    },
    {
        id: 'time-calculator', name: 'Time Calculator', icon: '⏱️', category: 'Math & Basic', description: 'Add/subtract time',
        fields: [{ id: 'h1', label: 'Hours 1', type: 'number', placeholder: '2' }, { id: 'm1', label: 'Min 1', type: 'number', placeholder: '30' }, { id: 'op', label: 'Operation', type: 'select', options: ['Add', 'Subtract'] }, { id: 'h2', label: 'Hours 2', type: 'number', placeholder: '1' }, { id: 'm2', label: 'Min 2', type: 'number', placeholder: '45' }],
        calculate: (v) => { let t1 = parseInt(v.h1) * 60 + parseInt(v.m1), t2 = parseInt(v.h2) * 60 + parseInt(v.m2); let r = v.op === 'Add' ? t1 + t2 : t1 - t2; const sign = r < 0 ? '-' : ''; r = Math.abs(r); return { result: `${sign}${Math.floor(r / 60)}h ${r % 60}m`, details: `Result: ${sign}${Math.floor(r / 60)} hours ${r % 60} minutes` }; }
    },
    {
        id: 'addition', name: 'Addition Calculator', icon: '➕', category: 'Math & Basic', description: 'Add numbers',
        fields: [{ id: 'nums', label: 'Numbers (comma separated)', type: 'text', placeholder: '10,20,30' }],
        calculate: (v) => { const nums = v.nums.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const sum = nums.reduce((a, b) => a + b, 0); return { result: sum.toString(), details: `${nums.join(' + ')} = ${sum}` }; }
    },
    {
        id: 'subtraction', name: 'Subtraction Calculator', icon: '➖', category: 'Math & Basic', description: 'Subtract numbers',
        fields: [{ id: 'a', label: 'First Number', type: 'number', placeholder: '100' }, { id: 'b', label: 'Subtract', type: 'number', placeholder: '45' }],
        calculate: (v) => { const a = parseFloat(v.a), b = parseFloat(v.b); return { result: (a - b).toString(), details: `${a} - ${b} = ${a - b}` }; }
    },
    {
        id: 'multiplication', name: 'Multiplication Calculator', icon: '✖️', category: 'Math & Basic', description: 'Multiply numbers',
        fields: [{ id: 'nums', label: 'Numbers (comma separated)', type: 'text', placeholder: '5,6,7' }],
        calculate: (v) => { const nums = v.nums.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const prod = nums.reduce((a, b) => a * b, 1); return { result: prod.toString(), details: `${nums.join(' × ')} = ${prod}` }; }
    },
    {
        id: 'division', name: 'Division Calculator', icon: '➗', category: 'Math & Basic', description: 'Divide numbers',
        fields: [{ id: 'a', label: 'Dividend', type: 'number', placeholder: '100' }, { id: 'b', label: 'Divisor', type: 'number', placeholder: '4' }],
        calculate: (v) => { const a = parseFloat(v.a), b = parseFloat(v.b); if (b === 0) return { error: 'Cannot divide by zero' }; const q = a / b; return { result: q.toString(), details: `${a} ÷ ${b} = ${q}<br>Quotient: ${Math.floor(q)}<br>Remainder: ${a % b}` }; }
    },
    {
        id: 'percentage', name: 'Percentage Calculator', icon: '%', category: 'Math & Basic', description: 'Calculate percentage',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '50' }, { id: 'total', label: 'Total', type: 'number', placeholder: '200' }],
        calculate: (v) => { const val = parseFloat(v.value), tot = parseFloat(v.total); const pct = (val / tot) * 100; return { result: pct.toFixed(2) + '%', details: `${val} is ${pct.toFixed(2)}% of ${tot}` }; }
    },
    {
        id: 'rounding', name: 'Rounding Calculator', icon: '🔄', category: 'Math & Basic', description: 'Round numbers',
        fields: [{ id: 'num', label: 'Number', type: 'text', placeholder: '3.14159' }, { id: 'places', label: 'Decimal Places', type: 'number', placeholder: '2' }],
        calculate: (v) => { const n = parseFloat(v.num), p = parseInt(v.places); const r = Number(n.toFixed(p)); return { result: r.toString(), details: `Floor: ${Math.floor(n)}<br>Ceil: ${Math.ceil(n)}<br>Round to ${p} decimals: ${r}` }; }
    },
    {
        id: 'absolute', name: 'Absolute Value Calculator', icon: '|x|', category: 'Math & Basic', description: 'Find absolute value',
        fields: [{ id: 'num', label: 'Number', type: 'number', placeholder: '-42' }],
        calculate: (v) => { const n = parseFloat(v.num); return { result: Math.abs(n).toString(), details: `|${n}| = ${Math.abs(n)}` }; }
    },
    {
        id: 'bodmas', name: 'BODMAS Calculator', icon: '📋', category: 'Math & Basic', description: 'Evaluate expression with BODMAS',
        fields: [{ id: 'expr', label: 'Expression', type: 'text', placeholder: '2+3*4-5' }],
        calculate: (v) => { try { const safe = v.expr.replace(/[^0-9+\-*/().^ ]/g, ''); const result = Function('"use strict";return (' + safe + ')')(); return { result: result.toString(), details: `${v.expr} = ${result}` }; } catch (e) { return { error: 'Invalid expression' }; } }
    },
    {
        id: 'prime-factorization', name: 'Prime Factorization', icon: '🔢', category: 'Math & Basic', description: 'Find prime factors',
        fields: [{ id: 'n', label: 'Number', type: 'number', placeholder: '84' }],
        calculate: (v) => { let n = parseInt(v.n), orig = n, factors = []; for (let d = 2; d * d <= n; d++) { while (n % d === 0) { factors.push(d); n /= d; } } if (n > 1) factors.push(n); return { result: factors.join(' × '), details: `${orig} = ${factors.join(' × ')}` }; }
    },
    {
        id: 'divisibility', name: 'Divisibility Checker', icon: '✓', category: 'Math & Basic', description: 'Check divisibility',
        fields: [{ id: 'num', label: 'Number', type: 'number', placeholder: '144' }, { id: 'div', label: 'Divisor', type: 'number', placeholder: '12' }],
        calculate: (v) => { const n = parseInt(v.num), d = parseInt(v.div); const div = n % d === 0; return { result: div ? '✅ Divisible' : '❌ Not Divisible', details: `${n} ÷ ${d} = ${n / d}<br>Remainder: ${n % d}` }; }
    },
    {
        id: 'even-odd', name: 'Even or Odd Checker', icon: '🔢', category: 'Math & Basic', description: 'Check if even or odd',
        fields: [{ id: 'n', label: 'Number', type: 'number', placeholder: '42' }],
        calculate: (v) => { const n = parseInt(v.n); return { result: n % 2 === 0 ? '✅ Even' : '🔷 Odd', details: `${n} is ${n % 2 === 0 ? 'Even' : 'Odd'}` }; }
    },
    {
        id: 'fibonacci', name: 'Fibonacci Calculator', icon: '🌀', category: 'Math & Basic', description: 'Generate Fibonacci sequence',
        fields: [{ id: 'n', label: 'Number of terms', type: 'number', placeholder: '10' }],
        calculate: (v) => { const n = parseInt(v.n); let seq = [0, 1]; for (let i = 2; i < n; i++) seq.push(seq[i - 1] + seq[i - 2]); return { result: seq.slice(0, n).join(', '), details: `First ${n} Fibonacci numbers` }; }
    },
    {
        id: 'perfect-number', name: 'Perfect Number Checker', icon: '💎', category: 'Math & Basic', description: 'Check if perfect number',
        fields: [{ id: 'n', label: 'Number', type: 'number', placeholder: '28' }],
        calculate: (v) => { const n = parseInt(v.n); let sum = 0; for (let i = 1; i < n; i++) if (n % i === 0) sum += i; return { result: sum === n ? '✅ Perfect Number' : '❌ Not Perfect', details: `Sum of divisors: ${sum}` }; }
    },
    {
        id: 'armstrong', name: 'Armstrong Number Checker', icon: '🎯', category: 'Math & Basic', description: 'Check Armstrong number',
        fields: [{ id: 'n', label: 'Number', type: 'number', placeholder: '153' }],
        calculate: (v) => { const n = v.n, digits = n.toString().split(''), len = digits.length; const sum = digits.reduce((s, d) => s + Math.pow(parseInt(d), len), 0); return { result: sum === parseInt(n) ? '✅ Armstrong' : '❌ Not Armstrong', details: `Sum of ${len}th powers: ${sum}` }; }
    },
    {
        id: 'palindrome-num', name: 'Palindrome Number Checker', icon: '🔁', category: 'Math & Basic', description: 'Check if palindrome',
        fields: [{ id: 'n', label: 'Number', type: 'number', placeholder: '12321' }],
        calculate: (v) => { const s = v.n.toString(), rev = s.split('').reverse().join(''); return { result: s === rev ? '✅ Palindrome' : '❌ Not Palindrome', details: `Original: ${s}<br>Reversed: ${rev}` }; }
    },
    {
        id: 'coprime', name: 'Co-prime Checker', icon: '🔗', category: 'Math & Basic', description: 'Check if co-prime',
        fields: [{ id: 'a', label: 'Number 1', type: 'number', placeholder: '15' }, { id: 'b', label: 'Number 2', type: 'number', placeholder: '28' }],
        calculate: (v) => { const a = parseInt(v.a), b = parseInt(v.b); const gcd = (x, y) => y === 0 ? x : gcd(y, x % y); const g = gcd(a, b); return { result: g === 1 ? '✅ Co-prime' : '❌ Not Co-prime', details: `GCD(${a}, ${b}) = ${g}` }; }
    },
    {
        id: 'modular', name: 'Modular Arithmetic', icon: '🔢', category: 'Math & Basic', description: 'Calculate modular arithmetic',
        fields: [{ id: 'a', label: 'Number', type: 'number', placeholder: '17' }, { id: 'n', label: 'Modulus', type: 'number', placeholder: '5' }],
        calculate: (v) => { const a = parseInt(v.a), n = parseInt(v.n); return { result: `${a} mod ${n} = ${((a % n) + n) % n}`, details: `${a} ≡ ${((a % n) + n) % n} (mod ${n})` }; }
    },
    {
        id: 'remainder', name: 'Remainder Calculator', icon: '🔢', category: 'Math & Basic', description: 'Find remainder',
        fields: [{ id: 'a', label: 'Dividend', type: 'number', placeholder: '23' }, { id: 'b', label: 'Divisor', type: 'number', placeholder: '5' }],
        calculate: (v) => { const a = parseInt(v.a), b = parseInt(v.b); return { result: (a % b).toString(), details: `${a} ÷ ${b} = ${Math.floor(a / b)} R ${a % b}` }; }
    },
    {
        id: 'binary-decimal', name: 'Binary to Decimal', icon: '01', category: 'Math & Basic', description: 'Convert binary to decimal',
        fields: [{ id: 'bin', label: 'Binary Number', type: 'text', placeholder: '1010' }],
        calculate: (v) => { const dec = parseInt(v.bin, 2); return { result: dec.toString(), details: `Binary: ${v.bin}<br>Decimal: ${dec}<br>Hex: ${dec.toString(16).toUpperCase()}` }; }
    },
    {
        id: 'logarithm', name: 'Logarithm Calculator', icon: 'log', category: 'Math & Basic', description: 'Calculate logarithms',
        fields: [{ id: 'num', label: 'Number', type: 'number', placeholder: '100' }, { id: 'base', label: 'Base', type: 'number', placeholder: '10' }],
        calculate: (v) => { const n = parseFloat(v.num), b = parseFloat(v.base); const log = Math.log(n) / Math.log(b); return { result: log.toFixed(6), details: `log₍${b}₎(${n}) = ${log.toFixed(6)}<br>ln(${n}) = ${Math.log(n).toFixed(6)}` }; }
    },
    {
        id: 'exponent', name: 'Exponent Calculator', icon: 'eˣ', category: 'Math & Basic', description: 'Calculate exponentials',
        fields: [{ id: 'x', label: 'Exponent', type: 'number', placeholder: '2' }],
        calculate: (v) => { const x = parseFloat(v.x); return { result: Math.exp(x).toFixed(6), details: `e^${x} = ${Math.exp(x).toFixed(6)}<br>2^${x} = ${Math.pow(2, x)}<br>10^${x} = ${Math.pow(10, x)}` }; }
    },
    {
        id: 'slope', name: 'Slope Calculator', icon: '📐', category: 'Math & Basic', description: 'Calculate slope between points',
        fields: [{ id: 'x1', label: 'X1', type: 'number', placeholder: '1' }, { id: 'y1', label: 'Y1', type: 'number', placeholder: '2' }, { id: 'x2', label: 'X2', type: 'number', placeholder: '4' }, { id: 'y2', label: 'Y2', type: 'number', placeholder: '8' }],
        calculate: (v) => { const x1 = parseFloat(v.x1), y1 = parseFloat(v.y1), x2 = parseFloat(v.x2), y2 = parseFloat(v.y2); if (x1 === x2) return { result: 'Undefined (vertical)', details: 'Vertical line' }; const m = (y2 - y1) / (x2 - x1); return { result: `m = ${m.toFixed(4)}`, details: `Slope = (${y2}-${y1})/(${x2}-${x1}) = ${m.toFixed(4)}<br>Angle: ${(Math.atan(m) * 180 / Math.PI).toFixed(2)}°` }; }
    },
    {
        id: 'midpoint', name: 'Midpoint Calculator', icon: '📍', category: 'Math & Basic', description: 'Find midpoint',
        fields: [{ id: 'x1', label: 'X1', type: 'number', placeholder: '0' }, { id: 'y1', label: 'Y1', type: 'number', placeholder: '0' }, { id: 'x2', label: 'X2', type: 'number', placeholder: '6' }, { id: 'y2', label: 'Y2', type: 'number', placeholder: '8' }],
        calculate: (v) => { const x1 = parseFloat(v.x1), y1 = parseFloat(v.y1), x2 = parseFloat(v.x2), y2 = parseFloat(v.y2); const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; return { result: `(${mx}, ${my})`, details: `Midpoint of (${x1},${y1}) and (${x2},${y2})<br>= (${mx}, ${my})` }; }
    },
    {
        id: 'section-formula', name: 'Section Formula', icon: '📐', category: 'Math & Basic', description: 'Point dividing line segment',
        fields: [{ id: 'x1', label: 'X1', type: 'number', placeholder: '1' }, { id: 'y1', label: 'Y1', type: 'number', placeholder: '2' }, { id: 'x2', label: 'X2', type: 'number', placeholder: '4' }, { id: 'y2', label: 'Y2', type: 'number', placeholder: '6' }, { id: 'm', label: 'm', type: 'number', placeholder: '2' }, { id: 'n', label: 'n', type: 'number', placeholder: '1' }],
        calculate: (v) => { const x1 = parseFloat(v.x1), y1 = parseFloat(v.y1), x2 = parseFloat(v.x2), y2 = parseFloat(v.y2), m = parseFloat(v.m), n = parseFloat(v.n); const px = (m * x2 + n * x1) / (m + n), py = (m * y2 + n * y1) / (m + n); return { result: `(${px.toFixed(2)}, ${py.toFixed(2)})`, details: `Point dividing in ratio ${m}:${n}` }; }
    },
    {
        id: 'arithmetic-prog', name: 'Arithmetic Progression', icon: '📈', category: 'Math & Basic', description: 'Calculate AP terms and sum',
        fields: [{ id: 'a', label: 'First Term (a)', type: 'number', placeholder: '2' }, { id: 'd', label: 'Common Diff (d)', type: 'number', placeholder: '3' }, { id: 'n', label: 'Number of terms', type: 'number', placeholder: '10' }],
        calculate: (v) => { const a = parseFloat(v.a), d = parseFloat(v.d), n = parseInt(v.n); const nth = a + (n - 1) * d; const sum = (n / 2) * (2 * a + (n - 1) * d); return { result: `nth term: ${nth}, Sum: ${sum}`, details: `First 5: ${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, ${a + 4 * d}...<br>Last: ${nth}<br>Sum: ${sum}` }; }
    },
    {
        id: 'geometric-prog', name: 'Geometric Progression', icon: '📊', category: 'Math & Basic', description: 'Calculate GP terms and sum',
        fields: [{ id: 'a', label: 'First Term (a)', type: 'number', placeholder: '2' }, { id: 'r', label: 'Common Ratio (r)', type: 'number', placeholder: '3' }, { id: 'n', label: 'Number of terms', type: 'number', placeholder: '5' }],
        calculate: (v) => { const a = parseFloat(v.a), r = parseFloat(v.r), n = parseInt(v.n); const nth = a * Math.pow(r, n - 1); const sum = r === 1 ? a * n : a * (Math.pow(r, n) - 1) / (r - 1); return { result: `nth: ${nth}, Sum: ${sum.toFixed(2)}`, details: `First 5: ${a}, ${a * r}, ${a * r * r}, ${a * r * r * r}, ${a * r * r * r * r}...<br>nth term: ${nth}<br>Sum: ${sum.toFixed(2)}` }; }
    },
    {
        id: 'surface-area', name: 'Surface Area Calculator', icon: '📦', category: 'Math & Basic', description: 'Calculate surface area',
        fields: [{ id: 'shape', label: 'Shape', type: 'select', options: ['Cube', 'Cuboid', 'Sphere', 'Cylinder', 'Cone'] }, { id: 'd1', label: 'Dim 1 (side/radius)', type: 'number', placeholder: '5' }, { id: 'd2', label: 'Dim 2 (height/width)', type: 'number', placeholder: '4' }, { id: 'd3', label: 'Dim 3 (depth)', type: 'number', placeholder: '3' }],
        calculate: (v) => { const d1 = parseFloat(v.d1), d2 = parseFloat(v.d2) || 0, d3 = parseFloat(v.d3) || 0; let sa; if (v.shape === 'Cube') sa = 6 * d1 * d1; else if (v.shape === 'Cuboid') sa = 2 * (d1 * d2 + d2 * d3 + d3 * d1); else if (v.shape === 'Sphere') sa = 4 * Math.PI * d1 * d1; else if (v.shape === 'Cylinder') sa = 2 * Math.PI * d1 * (d1 + d2); else sa = Math.PI * d1 * (d1 + Math.sqrt(d1 * d1 + d2 * d2)); return { result: sa.toFixed(4) + ' sq units', details: `${v.shape} surface area: ${sa.toFixed(4)}` }; }
    },
    {
        id: 'triangle-area', name: 'Triangle Area Calculator', icon: '📐', category: 'Math & Basic', description: 'Calculate triangle area',
        fields: [{ id: 'method', label: 'Method', type: 'select', options: ['Base × Height', 'Heron Formula'] }, { id: 'a', label: 'Side A / Base', type: 'number', placeholder: '5' }, { id: 'b', label: 'Side B / Height', type: 'number', placeholder: '4' }, { id: 'c', label: 'Side C', type: 'number', placeholder: '3' }],
        calculate: (v) => { const a = parseFloat(v.a), b = parseFloat(v.b), c = parseFloat(v.c) || 0; let area; if (v.method === 'Base × Height') { area = 0.5 * a * b; } else { const s = (a + b + c) / 2; area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); } return { result: area.toFixed(4) + ' sq units', details: `Triangle area: ${area.toFixed(4)}` }; }
    },
    {
        id: 'circle-area', name: 'Circle Area Calculator', icon: '⭕', category: 'Math & Basic', description: 'Calculate circle measurements',
        fields: [{ id: 'radius', label: 'Radius', type: 'number', placeholder: '7' }],
        calculate: (v) => { const r = parseFloat(v.radius); const area = Math.PI * r * r; const circ = 2 * Math.PI * r; return { result: area.toFixed(4) + ' sq units', details: `Area: ${area.toFixed(4)}<br>Circumference: ${circ.toFixed(4)}<br>Diameter: ${2 * r}` }; }
    },
    {
        id: 'derivative', name: 'Derivative Calculator', icon: 'dy/dx', category: 'Math & Basic', description: 'Find derivative (power rule)',
        fields: [{ id: 'coef', label: 'Coefficient', type: 'number', placeholder: '3' }, { id: 'power', label: 'Power', type: 'number', placeholder: '4' }],
        calculate: (v) => { const c = parseFloat(v.coef), p = parseFloat(v.power); const newC = c * p, newP = p - 1; return { result: `${newC}x^${newP}`, details: `d/dx(${c}x^${p}) = ${newC}x^${newP}` }; }
    },
    {
        id: 'integral', name: 'Integral Calculator', icon: '∫', category: 'Math & Basic', description: 'Find integral (power rule)',
        fields: [{ id: 'coef', label: 'Coefficient', type: 'number', placeholder: '3' }, { id: 'power', label: 'Power', type: 'number', placeholder: '2' }],
        calculate: (v) => { const c = parseFloat(v.coef), p = parseFloat(v.power); if (p === -1) return { result: `${c}ln|x| + C`, details: `∫${c}/x dx = ${c}ln|x| + C` }; const newP = p + 1, newC = c / newP; return { result: `${newC.toFixed(4)}x^${newP} + C`, details: `∫${c}x^${p} dx = ${newC.toFixed(4)}x^${newP} + C` }; }
    },
    {
        id: 'decimal-binary', name: 'Decimal to Binary', icon: '10', category: 'Math & Basic', description: 'Convert decimal to binary',
        fields: [{ id: 'dec', label: 'Decimal Number', type: 'number', placeholder: '42' }],
        calculate: (v) => { const dec = parseInt(v.dec); return { result: dec.toString(2), details: `Decimal: ${dec}<br>Binary: ${dec.toString(2)}<br>Octal: ${dec.toString(8)}<br>Hex: ${dec.toString(16).toUpperCase()}` }; }
    }
];
if (typeof window !== 'undefined') window.mathCalculators = mathCalculators;
