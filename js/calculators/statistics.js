// Statistics & Data Analysis Calculators
const statisticsCalculators = [
    {
        id: 'stat-mean', name: 'Mean Calculator', icon: '📊', category: 'Statistics', description: 'Calculate arithmetic mean',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 10,20,30,40,50' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const mean = nums.reduce((a, b) => a + b, 0) / nums.length; return { result: mean.toFixed(4), details: `Sum: ${nums.reduce((a, b) => a + b, 0)}<br>Count: ${nums.length}<br>Mean: ${mean.toFixed(4)}` }; }
    },
    {
        id: 'stat-median', name: 'Median Calculator', icon: '📈', category: 'Statistics', description: 'Find the middle value',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 3,1,4,1,5,9,2' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b); const mid = Math.floor(nums.length / 2); const median = nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2; return { result: median.toFixed(4), details: `Sorted: ${nums.join(', ')}<br>Median: ${median.toFixed(4)}` }; }
    },
    {
        id: 'stat-mode', name: 'Mode Calculator', icon: '📉', category: 'Statistics', description: 'Find most frequent value',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 1,2,2,3,3,3,4' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const freq = {}; nums.forEach(n => freq[n] = (freq[n] || 0) + 1); const maxF = Math.max(...Object.values(freq)); const modes = Object.keys(freq).filter(k => freq[k] === maxF); return { result: modes.join(', '), details: `Mode(s): ${modes.join(', ')}<br>Frequency: ${maxF}` }; }
    },
    {
        id: 'stat-range', name: 'Range Calculator', icon: '↔️', category: 'Statistics', description: 'Calculate data range',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 5,10,15,20,25' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const min = Math.min(...nums); const max = Math.max(...nums); const range = max - min; return { result: range.toFixed(4), details: `Min: ${min}<br>Max: ${max}<br>Range: ${range.toFixed(4)}` }; }
    },
    {
        id: 'stat-variance', name: 'Variance Calculator', icon: '📐', category: 'Statistics', description: 'Calculate variance',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 10,20,30,40,50' }, { id: 'type', label: 'Type', type: 'select', options: ['Population', 'Sample'] }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const mean = nums.reduce((a, b) => a + b, 0) / nums.length; const squaredDiffs = nums.map(n => Math.pow(n - mean, 2)); const divisor = v.type === 'Population' ? nums.length : nums.length - 1; const variance = squaredDiffs.reduce((a, b) => a + b, 0) / divisor; return { result: variance.toFixed(4), details: `Mean: ${mean.toFixed(4)}<br>${v.type} Variance: ${variance.toFixed(4)}` }; }
    },
    {
        id: 'stat-stddev', name: 'Standard Deviation Calculator', icon: 'σ', category: 'Statistics', description: 'Calculate standard deviation',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 10,20,30,40,50' }, { id: 'type', label: 'Type', type: 'select', options: ['Population', 'Sample'] }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const mean = nums.reduce((a, b) => a + b, 0) / nums.length; const squaredDiffs = nums.map(n => Math.pow(n - mean, 2)); const divisor = v.type === 'Population' ? nums.length : nums.length - 1; const variance = squaredDiffs.reduce((a, b) => a + b, 0) / divisor; const stdDev = Math.sqrt(variance); return { result: stdDev.toFixed(4), details: `Mean: ${mean.toFixed(4)}<br>Variance: ${variance.toFixed(4)}<br>${v.type} Std Dev: ${stdDev.toFixed(4)}` }; }
    },
    {
        id: 'stat-pop-stddev', name: 'Population Standard Deviation', icon: 'σ', category: 'Statistics', description: 'Population std deviation',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 2,4,4,4,5,5,7,9' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const mean = nums.reduce((a, b) => a + b, 0) / nums.length; const variance = nums.map(n => Math.pow(n - mean, 2)).reduce((a, b) => a + b, 0) / nums.length; const stdDev = Math.sqrt(variance); return { result: stdDev.toFixed(4), details: `Population σ = ${stdDev.toFixed(4)}<br>Mean: ${mean.toFixed(4)}<br>Variance: ${variance.toFixed(4)}` }; }
    },
    {
        id: 'stat-sample-stddev', name: 'Sample Standard Deviation', icon: 's', category: 'Statistics', description: 'Sample std deviation',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: 'e.g., 2,4,4,4,5,5,7,9' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const mean = nums.reduce((a, b) => a + b, 0) / nums.length; const variance = nums.map(n => Math.pow(n - mean, 2)).reduce((a, b) => a + b, 0) / (nums.length - 1); const stdDev = Math.sqrt(variance); return { result: stdDev.toFixed(4), details: `Sample s = ${stdDev.toFixed(4)}<br>Mean: ${mean.toFixed(4)}<br>Variance: ${variance.toFixed(4)}` }; }
    },
    {
        id: 'stat-zscore', name: 'Z-Score Calculator', icon: 'Z', category: 'Statistics', description: 'Calculate z-score',
        fields: [{ id: 'value', label: 'Value (X)', type: 'number', placeholder: '85' }, { id: 'mean', label: 'Mean (μ)', type: 'number', placeholder: '75' }, { id: 'stddev', label: 'Std Dev (σ)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const x = parseFloat(v.value), mean = parseFloat(v.mean), std = parseFloat(v.stddev); if (std === 0) return { error: 'Std dev cannot be zero' }; const z = (x - mean) / std; return { result: z.toFixed(4), details: `Z = (${x} - ${mean}) / ${std}<br>Z-score: ${z.toFixed(4)}` }; }
    },
    {
        id: 'stat-probability', name: 'Probability Calculator', icon: '🎲', category: 'Statistics', description: 'Calculate probability',
        fields: [{ id: 'favorable', label: 'Favorable Outcomes', type: 'number', placeholder: '3' }, { id: 'total', label: 'Total Outcomes', type: 'number', placeholder: '10' }],
        calculate: (v) => { const fav = parseFloat(v.favorable), total = parseFloat(v.total); if (total === 0) return { error: 'Total cannot be zero' }; const prob = fav / total; return { result: (prob * 100).toFixed(2) + '%', details: `P = ${fav}/${total} = ${prob.toFixed(4)}<br>Percentage: ${(prob * 100).toFixed(2)}%<br>Odds: ${fav}:${total - fav}` }; }
    },
    {
        id: 'stat-permutation', name: 'Permutation Calculator', icon: 'nPr', category: 'Statistics', description: 'Calculate permutations',
        fields: [{ id: 'n', label: 'n (total items)', type: 'number', placeholder: '5' }, { id: 'r', label: 'r (select)', type: 'number', placeholder: '3' }],
        calculate: (v) => { const n = parseInt(v.n), r = parseInt(v.r); if (r > n) return { error: 'r cannot exceed n' }; const fact = (x) => { let f = 1; for (let i = 2; i <= x; i++) f *= i; return f; }; const p = fact(n) / fact(n - r); return { result: p.toLocaleString(), details: `P(${n},${r}) = ${n}!/(${n}-${r})!<br>= ${p.toLocaleString()}` }; }
    },
    {
        id: 'stat-combination', name: 'Combination Calculator', icon: 'nCr', category: 'Statistics', description: 'Calculate combinations',
        fields: [{ id: 'n', label: 'n (total items)', type: 'number', placeholder: '5' }, { id: 'r', label: 'r (select)', type: 'number', placeholder: '3' }],
        calculate: (v) => { const n = parseInt(v.n), r = parseInt(v.r); if (r > n) return { error: 'r cannot exceed n' }; const fact = (x) => { let f = 1; for (let i = 2; i <= x; i++) f *= i; return f; }; const c = fact(n) / (fact(r) * fact(n - r)); return { result: c.toLocaleString(), details: `C(${n},${r}) = ${n}!/(${r}!(${n}-${r})!)<br>= ${c.toLocaleString()}` }; }
    },
    {
        id: 'stat-binomial', name: 'Binomial Distribution Calculator', icon: '📊', category: 'Statistics', description: 'Binomial probability',
        fields: [{ id: 'n', label: 'Number of Trials (n)', type: 'number', placeholder: '10' }, { id: 'k', label: 'Successes (k)', type: 'number', placeholder: '3' }, { id: 'p', label: 'Probability of Success (p)', type: 'number', placeholder: '0.5', step: '0.01' }],
        calculate: (v) => { const n = parseInt(v.n), k = parseInt(v.k), p = parseFloat(v.p); const fact = (x) => { let f = 1; for (let i = 2; i <= x; i++) f *= i; return f; }; const comb = fact(n) / (fact(k) * fact(n - k)); const prob = comb * Math.pow(p, k) * Math.pow(1 - p, n - k); return { result: prob.toFixed(6), details: `P(X=${k}) = C(${n},${k}) × ${p}^${k} × ${(1 - p).toFixed(2)}^${n - k}<br>= ${prob.toFixed(6)} (${(prob * 100).toFixed(2)}%)` }; }
    },
    {
        id: 'stat-normal', name: 'Normal Distribution Calculator', icon: '📈', category: 'Statistics', description: 'Normal distribution probability',
        fields: [{ id: 'x', label: 'Value (X)', type: 'number', placeholder: '75' }, { id: 'mean', label: 'Mean (μ)', type: 'number', placeholder: '70' }, { id: 'stddev', label: 'Std Dev (σ)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const x = parseFloat(v.x), mean = parseFloat(v.mean), std = parseFloat(v.stddev); const z = (x - mean) / std; const erf = (x) => { const a = [0.254829592, -0.284496736, 1.421413741, -1.453152027, 1.061405429]; const p = 0.3275911; const sign = x < 0 ? -1 : 1; x = Math.abs(x); const t = 1.0 / (1.0 + p * x); const y = 1.0 - (((((a[4] * t + a[3]) * t) + a[2]) * t + a[1]) * t + a[0]) * t * Math.exp(-x * x); return sign * y; }; const cdf = 0.5 * (1 + erf(z / Math.sqrt(2))); return { result: cdf.toFixed(6), details: `Z-score: ${z.toFixed(4)}<br>P(X ≤ ${x}): ${(cdf * 100).toFixed(2)}%<br>P(X > ${x}): ${((1 - cdf) * 100).toFixed(2)}%` }; }
    },
    {
        id: 'stat-poisson', name: 'Poisson Distribution Calculator', icon: '📊', category: 'Statistics', description: 'Poisson probability',
        fields: [{ id: 'k', label: 'Events (k)', type: 'number', placeholder: '3' }, { id: 'lambda', label: 'Average Rate (λ)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const k = parseInt(v.k), lambda = parseFloat(v.lambda); const fact = (x) => { let f = 1; for (let i = 2; i <= x; i++) f *= i; return f; }; const prob = (Math.pow(lambda, k) * Math.exp(-lambda)) / fact(k); return { result: prob.toFixed(6), details: `P(X=${k}) = (${lambda}^${k} × e^-${lambda}) / ${k}!<br>= ${prob.toFixed(6)} (${(prob * 100).toFixed(2)}%)` }; }
    },
    {
        id: 'stat-confidence', name: 'Confidence Interval Calculator', icon: '📏', category: 'Statistics', description: 'Calculate confidence interval',
        fields: [{ id: 'mean', label: 'Sample Mean', type: 'number', placeholder: '50' }, { id: 'stddev', label: 'Std Dev', type: 'number', placeholder: '10' }, { id: 'n', label: 'Sample Size', type: 'number', placeholder: '30' }, { id: 'conf', label: 'Confidence Level', type: 'select', options: ['90%', '95%', '99%'] }],
        calculate: (v) => { const mean = parseFloat(v.mean), std = parseFloat(v.stddev), n = parseInt(v.n); const zValues = { '90%': 1.645, '95%': 1.96, '99%': 2.576 }; const z = zValues[v.conf]; const margin = z * (std / Math.sqrt(n)); const lower = mean - margin; const upper = mean + margin; return { result: `(${lower.toFixed(2)}, ${upper.toFixed(2)})`, details: `${v.conf} CI: ${lower.toFixed(4)} to ${upper.toFixed(4)}<br>Margin of Error: ±${margin.toFixed(4)}` }; }
    },
    {
        id: 'stat-margin-error', name: 'Margin of Error Calculator', icon: '±', category: 'Statistics', description: 'Calculate margin of error',
        fields: [{ id: 'stddev', label: 'Std Dev / Std Error', type: 'number', placeholder: '10' }, { id: 'n', label: 'Sample Size', type: 'number', placeholder: '100' }, { id: 'conf', label: 'Confidence Level', type: 'select', options: ['90%', '95%', '99%'] }],
        calculate: (v) => { const std = parseFloat(v.stddev), n = parseInt(v.n); const zValues = { '90%': 1.645, '95%': 1.96, '99%': 2.576 }; const z = zValues[v.conf]; const margin = z * (std / Math.sqrt(n)); return { result: `±${margin.toFixed(4)}`, details: `Z-value (${v.conf}): ${z}<br>Standard Error: ${(std / Math.sqrt(n)).toFixed(4)}<br>Margin of Error: ±${margin.toFixed(4)}` }; }
    },
    {
        id: 'stat-correlation', name: 'Correlation Coefficient Calculator', icon: 'r', category: 'Statistics', description: 'Calculate Pearson correlation',
        fields: [{ id: 'xvals', label: 'X Values (comma separated)', type: 'text', placeholder: '1,2,3,4,5' }, { id: 'yvals', label: 'Y Values (comma separated)', type: 'text', placeholder: '2,4,5,4,5' }],
        calculate: (v) => { const x = v.xvals.split(',').map(n => parseFloat(n.trim())); const y = v.yvals.split(',').map(n => parseFloat(n.trim())); if (x.length !== y.length) return { error: 'X and Y must have same length' }; const n = x.length; const sumX = x.reduce((a, b) => a + b, 0); const sumY = y.reduce((a, b) => a + b, 0); const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0); const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0); const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0); const r = (n * sumXY - sumX * sumY) / Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)); let strength = Math.abs(r) < 0.3 ? 'Weak' : Math.abs(r) < 0.7 ? 'Moderate' : 'Strong'; return { result: r.toFixed(4), details: `r = ${r.toFixed(4)}<br>R² = ${(r * r).toFixed(4)}<br>Strength: ${strength} ${r > 0 ? 'Positive' : 'Negative'}` }; }
    },
    {
        id: 'stat-regression', name: 'Regression Line Calculator', icon: '📈', category: 'Statistics', description: 'Linear regression y = mx + b',
        fields: [{ id: 'xvals', label: 'X Values (comma separated)', type: 'text', placeholder: '1,2,3,4,5' }, { id: 'yvals', label: 'Y Values (comma separated)', type: 'text', placeholder: '2,4,5,4,5' }],
        calculate: (v) => { const x = v.xvals.split(',').map(n => parseFloat(n.trim())); const y = v.yvals.split(',').map(n => parseFloat(n.trim())); if (x.length !== y.length) return { error: 'X and Y must have same length' }; const n = x.length; const sumX = x.reduce((a, b) => a + b, 0); const sumY = y.reduce((a, b) => a + b, 0); const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0); const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0); const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX); const b = (sumY - m * sumX) / n; return { result: `y = ${m.toFixed(4)}x + ${b.toFixed(4)}`, details: `Slope (m): ${m.toFixed(4)}<br>Y-intercept (b): ${b.toFixed(4)}<br>Equation: y = ${m.toFixed(4)}x + ${b.toFixed(4)}` }; }
    },
    {
        id: 'stat-chisquare', name: 'Chi-Square Calculator', icon: 'χ²', category: 'Statistics', description: 'Chi-square test statistic',
        fields: [{ id: 'observed', label: 'Observed (comma separated)', type: 'text', placeholder: '20,30,50' }, { id: 'expected', label: 'Expected (comma separated)', type: 'text', placeholder: '25,25,50' }],
        calculate: (v) => { const obs = v.observed.split(',').map(n => parseFloat(n.trim())); const exp = v.expected.split(',').map(n => parseFloat(n.trim())); if (obs.length !== exp.length) return { error: 'Arrays must be same length' }; let chiSq = 0; for (let i = 0; i < obs.length; i++) { chiSq += Math.pow(obs[i] - exp[i], 2) / exp[i]; } const df = obs.length - 1; return { result: chiSq.toFixed(4), details: `χ² = ${chiSq.toFixed(4)}<br>Degrees of Freedom: ${df}` }; }
    },
    {
        id: 'stat-ttest', name: 'T-Test Calculator', icon: 't', category: 'Statistics', description: 'One-sample t-test',
        fields: [{ id: 'sample', label: 'Sample Mean', type: 'number', placeholder: '52' }, { id: 'pop', label: 'Population Mean', type: 'number', placeholder: '50' }, { id: 'std', label: 'Sample Std Dev', type: 'number', placeholder: '5' }, { id: 'n', label: 'Sample Size', type: 'number', placeholder: '25' }],
        calculate: (v) => { const xbar = parseFloat(v.sample), mu = parseFloat(v.pop), s = parseFloat(v.std), n = parseInt(v.n); const t = (xbar - mu) / (s / Math.sqrt(n)); const df = n - 1; return { result: t.toFixed(4), details: `t = (${xbar} - ${mu}) / (${s}/√${n})<br>t-statistic: ${t.toFixed(4)}<br>Degrees of Freedom: ${df}` }; }
    },
    {
        id: 'stat-anova', name: 'ANOVA Calculator', icon: 'F', category: 'Statistics', description: 'One-way ANOVA',
        fields: [{ id: 'group1', label: 'Group 1 (comma separated)', type: 'text', placeholder: '5,6,7' }, { id: 'group2', label: 'Group 2 (comma separated)', type: 'text', placeholder: '8,9,10' }, { id: 'group3', label: 'Group 3 (comma separated)', type: 'text', placeholder: '11,12,13' }],
        calculate: (v) => { const groups = [v.group1, v.group2, v.group3].filter(g => g.trim()).map(g => g.split(',').map(n => parseFloat(n.trim()))); const allVals = groups.flat(); const grandMean = allVals.reduce((a, b) => a + b, 0) / allVals.length; let ssBetween = 0; groups.forEach(g => { const gMean = g.reduce((a, b) => a + b, 0) / g.length; ssBetween += g.length * Math.pow(gMean - grandMean, 2); }); let ssWithin = 0; groups.forEach(g => { const gMean = g.reduce((a, b) => a + b, 0) / g.length; g.forEach(val => ssWithin += Math.pow(val - gMean, 2)); }); const dfBetween = groups.length - 1; const dfWithin = allVals.length - groups.length; const msBetween = ssBetween / dfBetween; const msWithin = ssWithin / dfWithin; const f = msBetween / msWithin; return { result: `F = ${f.toFixed(4)}`, details: `SS Between: ${ssBetween.toFixed(4)}<br>SS Within: ${ssWithin.toFixed(4)}<br>F-statistic: ${f.toFixed(4)}<br>df: (${dfBetween}, ${dfWithin})` }; }
    },
    {
        id: 'stat-outlier', name: 'Outlier Detection Calculator', icon: '🔍', category: 'Statistics', description: 'Detect outliers using IQR',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: '1,2,3,4,5,100' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b); const q1Idx = Math.floor(nums.length / 4); const q3Idx = Math.floor(3 * nums.length / 4); const q1 = nums[q1Idx]; const q3 = nums[q3Idx]; const iqr = q3 - q1; const lower = q1 - 1.5 * iqr; const upper = q3 + 1.5 * iqr; const outliers = nums.filter(n => n < lower || n > upper); return { result: outliers.length > 0 ? `Outliers: ${outliers.join(', ')}` : 'No outliers', details: `Q1: ${q1}, Q3: ${q3}<br>IQR: ${iqr}<br>Lower Bound: ${lower.toFixed(2)}<br>Upper Bound: ${upper.toFixed(2)}<br>Outliers: ${outliers.length > 0 ? outliers.join(', ') : 'None'}` }; }
    },
    {
        id: 'stat-skewness', name: 'Skewness Calculator', icon: '↗️', category: 'Statistics', description: 'Calculate data skewness',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: '1,2,2,3,4,5,10' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const n = nums.length; const mean = nums.reduce((a, b) => a + b, 0) / n; const std = Math.sqrt(nums.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / n); const skew = nums.map(x => Math.pow((x - mean) / std, 3)).reduce((a, b) => a + b, 0) / n; let interpretation = skew > 0.5 ? 'Right-skewed' : skew < -0.5 ? 'Left-skewed' : 'Approximately symmetric'; return { result: skew.toFixed(4), details: `Skewness: ${skew.toFixed(4)}<br>Interpretation: ${interpretation}` }; }
    },
    {
        id: 'stat-kurtosis', name: 'Kurtosis Calculator', icon: '📉', category: 'Statistics', description: 'Calculate data kurtosis',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: '1,2,3,4,5,6,7,8,9' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const n = nums.length; const mean = nums.reduce((a, b) => a + b, 0) / n; const std = Math.sqrt(nums.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / n); const kurt = nums.map(x => Math.pow((x - mean) / std, 4)).reduce((a, b) => a + b, 0) / n - 3; let type = kurt > 0 ? 'Leptokurtic (heavy tails)' : kurt < 0 ? 'Platykurtic (light tails)' : 'Mesokurtic (normal)'; return { result: kurt.toFixed(4), details: `Excess Kurtosis: ${kurt.toFixed(4)}<br>Type: ${type}` }; }
    },
    {
        id: 'stat-percentile', name: 'Data Percentile Calculator', icon: '%', category: 'Statistics', description: 'Find percentile value',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: '10,20,30,40,50,60,70,80,90' }, { id: 'percentile', label: 'Percentile', type: 'number', placeholder: '75' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b); const p = parseFloat(v.percentile) / 100; const idx = p * (nums.length - 1); const lower = Math.floor(idx); const upper = Math.ceil(idx); const val = nums[lower] + (nums[upper] - nums[lower]) * (idx - lower); return { result: val.toFixed(4), details: `${v.percentile}th percentile: ${val.toFixed(4)}<br>Position: ${idx.toFixed(2)}` }; }
    },
    {
        id: 'stat-quartile', name: 'Quartile Calculator', icon: 'Q', category: 'Statistics', description: 'Calculate quartiles',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: '1,2,3,4,5,6,7,8,9,10' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b); const getQuartile = (arr, q) => { const idx = q * (arr.length - 1); const lower = Math.floor(idx); const frac = idx - lower; return arr[lower] + frac * (arr[Math.ceil(idx)] - arr[lower]); }; const q1 = getQuartile(nums, 0.25); const q2 = getQuartile(nums, 0.5); const q3 = getQuartile(nums, 0.75); return { result: `Q1:${q1.toFixed(2)} Q2:${q2.toFixed(2)} Q3:${q3.toFixed(2)}`, details: `Q1 (25%): ${q1.toFixed(4)}<br>Q2 (50%/Median): ${q2.toFixed(4)}<br>Q3 (75%): ${q3.toFixed(4)}` }; }
    },
    {
        id: 'stat-iqr', name: 'Interquartile Range Calculator', icon: 'IQR', category: 'Statistics', description: 'Calculate IQR',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: '2,4,6,8,10,12,14,16' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b); const getQuartile = (arr, q) => { const idx = q * (arr.length - 1); const lower = Math.floor(idx); const frac = idx - lower; return arr[lower] + frac * (arr[Math.ceil(idx)] - arr[lower]); }; const q1 = getQuartile(nums, 0.25); const q3 = getQuartile(nums, 0.75); const iqr = q3 - q1; return { result: iqr.toFixed(4), details: `Q1: ${q1.toFixed(4)}<br>Q3: ${q3.toFixed(4)}<br>IQR: ${iqr.toFixed(4)}` }; }
    },
    {
        id: 'stat-freq-dist', name: 'Frequency Distribution Calculator', icon: '📊', category: 'Statistics', description: 'Create frequency table',
        fields: [{ id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: '1,2,2,3,3,3,4,4,5' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const freq = {}; nums.forEach(n => freq[n] = (freq[n] || 0) + 1); const sorted = Object.entries(freq).sort((a, b) => parseFloat(a[0]) - parseFloat(b[0])); const table = sorted.map(([val, count]) => `${val}: ${count} (${(count / nums.length * 100).toFixed(1)}%)`).join('<br>'); return { result: `${Object.keys(freq).length} unique values`, details: `Frequency Distribution:<br>${table}<br><br>Total: ${nums.length}` }; }
    },
    {
        id: 'stat-random', name: 'Random Number Generator', icon: '🎲', category: 'Statistics', description: 'Generate random numbers',
        fields: [{ id: 'min', label: 'Min Value', type: 'number', placeholder: '1' }, { id: 'max', label: 'Max Value', type: 'number', placeholder: '100' }, { id: 'count', label: 'How Many', type: 'number', placeholder: '5' }, { id: 'type', label: 'Type', type: 'select', options: ['Integers', 'Decimals'] }],
        calculate: (v) => { const min = parseFloat(v.min), max = parseFloat(v.max), count = parseInt(v.count); const nums = []; for (let i = 0; i < count; i++) { let rand = Math.random() * (max - min) + min; nums.push(v.type === 'Integers' ? Math.round(rand) : rand.toFixed(4)); } return { result: nums.join(', '), details: `${count} random ${v.type.toLowerCase()} between ${min} and ${max}` }; }
    }
];
if (typeof window !== 'undefined') window.statisticsCalculators = statisticsCalculators;
