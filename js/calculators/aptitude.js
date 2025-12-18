// Logic, Aptitude & Reasoning Calculators
const aptitudeCalculators = [
    {
        id: 'apt-reasoning-score', name: 'Logical Reasoning Score Calculator', icon: '🧠', category: 'Aptitude', description: 'Calculate reasoning test score',
        fields: [{ id: 'correct', label: 'Correct Answers', type: 'number', placeholder: '25' }, { id: 'total', label: 'Total Questions', type: 'number', placeholder: '30' }, { id: 'negative', label: 'Negative Marking (per wrong)', type: 'number', placeholder: '0.25', step: '0.01' }],
        calculate: (v) => { const correct = parseInt(v.correct), total = parseInt(v.total), neg = parseFloat(v.negative) || 0; const wrong = total - correct; const score = correct - (wrong * neg); const pct = (score / total) * 100; return { result: score.toFixed(2), details: `Correct: ${correct} × 1 = ${correct}<br>Wrong: ${wrong} × -${neg} = -${(wrong * neg).toFixed(2)}<br>Score: ${score.toFixed(2)} / ${total}<br>Percentage: ${pct.toFixed(2)}%` }; }
    },
    {
        id: 'apt-aptitude-score', name: 'Aptitude Test Score Calculator', icon: '📝', category: 'Aptitude', description: 'Calculate aptitude exam score',
        fields: [{ id: 'sections', label: 'Section Scores (comma separated)', type: 'text', placeholder: '25,30,28' }, { id: 'weights', label: 'Section Weights (comma separated)', type: 'text', placeholder: '1,1.5,1' }],
        calculate: (v) => { const scores = v.sections.split(',').map(n => parseFloat(n.trim())); const weights = v.weights.split(',').map(n => parseFloat(n.trim())); let weighted = 0, totalWeight = 0; for (let i = 0; i < scores.length; i++) { weighted += scores[i] * (weights[i] || 1); totalWeight += (weights[i] || 1); } const avg = weighted / totalWeight; return { result: avg.toFixed(2), details: `Weighted Score: ${weighted.toFixed(2)}<br>Total Weight: ${totalWeight}<br>Weighted Average: ${avg.toFixed(2)}` }; }
    },
    {
        id: 'apt-time-work', name: 'Time and Work Calculator', icon: '⏰', category: 'Aptitude', description: 'Calculate time & work problems',
        fields: [{ id: 'a', label: 'A completes work in (days)', type: 'number', placeholder: '10' }, { id: 'b', label: 'B completes work in (days)', type: 'number', placeholder: '15' }],
        calculate: (v) => { const a = parseFloat(v.a), b = parseFloat(v.b); const aRate = 1 / a, bRate = 1 / b; const combined = aRate + bRate; const days = 1 / combined; return { result: days.toFixed(2) + ' days', details: `A's rate: 1/${a} work/day<br>B's rate: 1/${b} work/day<br>Combined: 1/${days.toFixed(2)} work/day<br>Together: ${days.toFixed(2)} days` }; }
    },
    {
        id: 'apt-pipes-cistern', name: 'Pipes and Cisterns Calculator', icon: '🚰', category: 'Aptitude', description: 'Calculate pipe filling problems',
        fields: [{ id: 'fill', label: 'Inlet fills in (hours)', type: 'number', placeholder: '6' }, { id: 'empty', label: 'Outlet empties in (hours)', type: 'number', placeholder: '8' }],
        calculate: (v) => { const fill = parseFloat(v.fill), empty = parseFloat(v.empty); const fillRate = 1 / fill, emptyRate = 1 / empty; const netRate = fillRate - emptyRate; if (netRate <= 0) return { error: 'Tank will never fill (outlet faster)' }; const time = 1 / netRate; return { result: time.toFixed(2) + ' hours', details: `Fill rate: 1/${fill} tank/hr<br>Empty rate: 1/${empty} tank/hr<br>Net rate: ${netRate.toFixed(4)} tank/hr<br>Time to fill: ${time.toFixed(2)} hours` }; }
    },
    {
        id: 'apt-speed-distance', name: 'Time, Speed and Distance Calculator', icon: '🚗', category: 'Aptitude', description: 'Calculate speed problems',
        fields: [{ id: 'find', label: 'Find', type: 'select', options: ['Speed', 'Distance', 'Time'] }, { id: 'val1', label: 'Value 1', type: 'number', placeholder: '100' }, { id: 'val2', label: 'Value 2', type: 'number', placeholder: '2' }],
        calculate: (v) => { const v1 = parseFloat(v.val1), v2 = parseFloat(v.val2); let result, formula; if (v.find === 'Speed') { result = v1 / v2; formula = `Speed = Distance/Time = ${v1}/${v2} = ${result.toFixed(2)} km/hr`; } else if (v.find === 'Distance') { result = v1 * v2; formula = `Distance = Speed × Time = ${v1} × ${v2} = ${result.toFixed(2)} km`; } else { result = v1 / v2; formula = `Time = Distance/Speed = ${v1}/${v2} = ${result.toFixed(2)} hours`; } return { result: result.toFixed(2), details: formula }; }
    },
    {
        id: 'apt-train', name: 'Train Problems Calculator', icon: '🚂', category: 'Aptitude', description: 'Solve train crossing problems',
        fields: [{ id: 'type', label: 'Problem Type', type: 'select', options: ['Cross Pole', 'Cross Platform', 'Cross Another Train (Same)', 'Cross Another Train (Opposite)'] }, { id: 'length1', label: 'Train Length (m)', type: 'number', placeholder: '200' }, { id: 'speed1', label: 'Train Speed (km/hr)', type: 'number', placeholder: '60' }, { id: 'length2', label: 'Object Length / Train 2 (m)', type: 'number', placeholder: '300' }, { id: 'speed2', label: 'Train 2 Speed (km/hr)', type: 'number', placeholder: '40' }],
        calculate: (v) => { const l1 = parseFloat(v.length1), s1 = parseFloat(v.speed1) * (5 / 18), l2 = parseFloat(v.length2) || 0, s2 = (parseFloat(v.speed2) || 0) * (5 / 18); let distance, speed, time; if (v.type === 'Cross Pole') { distance = l1; speed = s1; } else if (v.type === 'Cross Platform') { distance = l1 + l2; speed = s1; } else if (v.type === 'Cross Another Train (Same)') { distance = l1 + l2; speed = Math.abs(s1 - s2); } else { distance = l1 + l2; speed = s1 + s2; } time = distance / speed; return { result: time.toFixed(2) + ' seconds', details: `Distance: ${distance} m<br>Relative Speed: ${(speed * 18 / 5).toFixed(2)} km/hr<br>Time: ${time.toFixed(2)} seconds` }; }
    },
    {
        id: 'apt-boat', name: 'Boat and Stream Calculator', icon: '⛵', category: 'Aptitude', description: 'Calculate boat speed problems',
        fields: [{ id: 'type', label: 'Find', type: 'select', options: ['Time for journey', 'Speed in still water', 'Stream speed'] }, { id: 'boat', label: 'Boat Speed (still water)', type: 'number', placeholder: '10' }, { id: 'stream', label: 'Stream Speed', type: 'number', placeholder: '2' }, { id: 'distance', label: 'Distance (km)', type: 'number', placeholder: '24' }],
        calculate: (v) => { const b = parseFloat(v.boat), s = parseFloat(v.stream), d = parseFloat(v.distance); const downstream = b + s; const upstream = b - s; const timeDown = d / downstream; const timeUp = d / upstream; return { result: `↓${timeDown.toFixed(2)}h ↑${timeUp.toFixed(2)}h`, details: `Downstream speed: ${downstream} km/hr<br>Upstream speed: ${upstream} km/hr<br>Time downstream: ${timeDown.toFixed(2)} hours<br>Time upstream: ${timeUp.toFixed(2)} hours<br>Total: ${(timeDown + timeUp).toFixed(2)} hours` }; }
    },
    {
        id: 'apt-average', name: 'Average Problems Calculator', icon: '📊', category: 'Aptitude', description: 'Solve average problems',
        fields: [{ id: 'type', label: 'Problem Type', type: 'select', options: ['Find Average', 'Find Missing Number', 'New Average After Adding'] }, { id: 'numbers', label: 'Numbers (comma separated)', type: 'text', placeholder: '10,20,30,40' }, { id: 'extra', label: 'Extra Value (for missing/new)', type: 'number', placeholder: '25' }],
        calculate: (v) => { const nums = v.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const extra = parseFloat(v.extra) || 0; if (v.type === 'Find Average') { const avg = nums.reduce((a, b) => a + b, 0) / nums.length; return { result: avg.toFixed(2), details: `Sum: ${nums.reduce((a, b) => a + b, 0)}<br>Count: ${nums.length}<br>Average: ${avg.toFixed(2)}` }; } else if (v.type === 'Find Missing Number') { const missing = extra * (nums.length + 1) - nums.reduce((a, b) => a + b, 0); return { result: missing.toFixed(2), details: `Required avg: ${extra}<br>Current sum: ${nums.reduce((a, b) => a + b, 0)}<br>Missing number: ${missing.toFixed(2)}` }; } else { const newAvg = (nums.reduce((a, b) => a + b, 0) + extra) / (nums.length + 1); return { result: newAvg.toFixed(2), details: `Old sum: ${nums.reduce((a, b) => a + b, 0)}<br>Added: ${extra}<br>New average: ${newAvg.toFixed(2)}` }; } }
    },
    {
        id: 'apt-mixture', name: 'Mixture and Allegation Calculator', icon: '🧪', category: 'Aptitude', description: 'Solve mixture problems',
        fields: [{ id: 'c1', label: 'Price/Concentration 1', type: 'number', placeholder: '20' }, { id: 'c2', label: 'Price/Concentration 2', type: 'number', placeholder: '30' }, { id: 'mean', label: 'Mean/Average Price', type: 'number', placeholder: '25' }],
        calculate: (v) => { const c1 = parseFloat(v.c1), c2 = parseFloat(v.c2), mean = parseFloat(v.mean); const ratio1 = c2 - mean; const ratio2 = mean - c1; const gcd = (a, b) => b === 0 ? a : gcd(b, a % b); const g = gcd(Math.abs(ratio1), Math.abs(ratio2)); return { result: `${ratio1 / g} : ${ratio2 / g}`, details: `Allegation Rule:<br>Cheaper quantity : Dearer quantity<br>= (${c2} - ${mean}) : (${mean} - ${c1})<br>= ${ratio1} : ${ratio2}<br>= ${ratio1 / g} : ${ratio2 / g}` }; }
    },
    {
        id: 'apt-partnership', name: 'Partnership Calculator', icon: '🤝', category: 'Aptitude', description: 'Calculate profit sharing',
        fields: [{ id: 'inv1', label: 'A Investment', type: 'number', placeholder: '10000' }, { id: 'time1', label: 'A Time (months)', type: 'number', placeholder: '12' }, { id: 'inv2', label: 'B Investment', type: 'number', placeholder: '15000' }, { id: 'time2', label: 'B Time (months)', type: 'number', placeholder: '8' }, { id: 'profit', label: 'Total Profit', type: 'number', placeholder: '50000' }],
        calculate: (v) => { const a = parseFloat(v.inv1) * parseFloat(v.time1); const b = parseFloat(v.inv2) * parseFloat(v.time2); const total = a + b; const profitA = (a / total) * parseFloat(v.profit); const profitB = (b / total) * parseFloat(v.profit); const gcd = (x, y) => y === 0 ? x : gcd(y, x % y); const g = gcd(a, b); return { result: `A:${profitA.toFixed(0)} B:${profitB.toFixed(0)}`, details: `A's capital-time: ${a}<br>B's capital-time: ${b}<br>Ratio: ${a / g}:${b / g}<br>A's share: ₹${profitA.toFixed(2)}<br>B's share: ₹${profitB.toFixed(2)}` }; }
    },
    {
        id: 'apt-profit-loss', name: 'Profit and Loss Calculator', icon: '💹', category: 'Aptitude', description: 'Calculate profit/loss percentage',
        fields: [{ id: 'cp', label: 'Cost Price', type: 'number', placeholder: '100' }, { id: 'sp', label: 'Selling Price', type: 'number', placeholder: '120' }],
        calculate: (v) => { const cp = parseFloat(v.cp), sp = parseFloat(v.sp); const diff = sp - cp; const pct = (diff / cp) * 100; const type = diff >= 0 ? 'Profit' : 'Loss'; return { result: `${type}: ${Math.abs(pct).toFixed(2)}%`, details: `Cost Price: ₹${cp}<br>Selling Price: ₹${sp}<br>${type} Amount: ₹${Math.abs(diff).toFixed(2)}<br>${type} %: ${Math.abs(pct).toFixed(2)}%` }; }
    },
    {
        id: 'apt-simple-interest', name: 'Simple Interest Aptitude Calculator', icon: '💰', category: 'Aptitude', description: 'SI aptitude problems',
        fields: [{ id: 'find', label: 'Find', type: 'select', options: ['Interest', 'Principal', 'Rate', 'Time'] }, { id: 'p', label: 'Principal', type: 'number', placeholder: '10000' }, { id: 'r', label: 'Rate (%)', type: 'number', placeholder: '5' }, { id: 't', label: 'Time (years)', type: 'number', placeholder: '2' }, { id: 'si', label: 'Simple Interest', type: 'number', placeholder: '1000' }],
        calculate: (v) => { let p = parseFloat(v.p), r = parseFloat(v.r), t = parseFloat(v.t), si = parseFloat(v.si); let result, formula; if (v.find === 'Interest') { result = (p * r * t) / 100; formula = `SI = P×R×T/100 = ${p}×${r}×${t}/100 = ₹${result.toFixed(2)}`; } else if (v.find === 'Principal') { result = (si * 100) / (r * t); formula = `P = SI×100/(R×T) = ${si}×100/(${r}×${t}) = ₹${result.toFixed(2)}`; } else if (v.find === 'Rate') { result = (si * 100) / (p * t); formula = `R = SI×100/(P×T) = ${si}×100/(${p}×${t}) = ${result.toFixed(2)}%`; } else { result = (si * 100) / (p * r); formula = `T = SI×100/(P×R) = ${si}×100/(${p}×${r}) = ${result.toFixed(2)} years`; } return { result: result.toFixed(2), details: formula }; }
    },
    {
        id: 'apt-compound-interest', name: 'Compound Interest Aptitude Calculator', icon: '📈', category: 'Aptitude', description: 'CI aptitude problems',
        fields: [{ id: 'principal', label: 'Principal', type: 'number', placeholder: '10000' }, { id: 'rate', label: 'Rate (%)', type: 'number', placeholder: '10' }, { id: 'time', label: 'Time (years)', type: 'number', placeholder: '2' }, { id: 'compound', label: 'Compounded', type: 'select', options: ['Annually', 'Half-yearly', 'Quarterly'] }],
        calculate: (v) => { const p = parseFloat(v.principal), r = parseFloat(v.rate), t = parseFloat(v.time); let n = 1; if (v.compound === 'Half-yearly') n = 2; else if (v.compound === 'Quarterly') n = 4; const amount = p * Math.pow(1 + r / (n * 100), n * t); const ci = amount - p; return { result: `₹${ci.toFixed(2)}`, details: `Principal: ₹${p}<br>Amount: ₹${amount.toFixed(2)}<br>CI: ₹${ci.toFixed(2)}<br>Effective Rate: ${((amount / p - 1) * 100).toFixed(2)}%` }; }
    },
    {
        id: 'apt-ratio', name: 'Ratio and Proportion Aptitude', icon: '⚖️', category: 'Aptitude', description: 'Solve ratio problems',
        fields: [{ id: 'type', label: 'Problem Type', type: 'select', options: ['Divide Amount', 'Find Fourth Proportional', 'Compare Ratios'] }, { id: 'ratio', label: 'Ratio (e.g. 2:3:5)', type: 'text', placeholder: '2:3:5' }, { id: 'amount', label: 'Amount/Value', type: 'number', placeholder: '1000' }],
        calculate: (v) => { const parts = v.ratio.split(':').map(n => parseFloat(n.trim())); const amount = parseFloat(v.amount); if (v.type === 'Divide Amount') { const total = parts.reduce((a, b) => a + b, 0); const shares = parts.map(p => (p / total) * amount); return { result: shares.map(s => s.toFixed(2)).join(' : '), details: `Ratio: ${v.ratio}<br>Total parts: ${total}<br>Shares: ${shares.map((s, i) => `Part ${i + 1}: ₹${s.toFixed(2)}`).join('<br>')}` }; } else if (v.type === 'Find Fourth Proportional') { const fourth = (parts[1] * amount) / parts[0]; return { result: fourth.toFixed(2), details: `${parts[0]}:${parts[1]} = ${amount}:x<br>x = ${parts[1]} × ${amount} / ${parts[0]} = ${fourth.toFixed(2)}` }; } else { const gcd = (a, b) => b === 0 ? a : gcd(b, a % b); const g = gcd(parts[0], parts[1]); return { result: `${parts[0] / g}:${parts[1] / g}`, details: `Simplified ratio: ${parts[0] / g}:${parts[1] / g}` }; } }
    },
    {
        id: 'apt-percentage', name: 'Percentage Aptitude Calculator', icon: '%', category: 'Aptitude', description: 'Percentage problems',
        fields: [{ id: 'type', label: 'Problem Type', type: 'select', options: ['What is X% of Y', 'X is what % of Y', 'Successive %'] }, { id: 'val1', label: 'Value 1 / Percentage', type: 'number', placeholder: '20' }, { id: 'val2', label: 'Value 2 / Base', type: 'number', placeholder: '500' }],
        calculate: (v) => { const x = parseFloat(v.val1), y = parseFloat(v.val2); if (v.type === 'What is X% of Y') { const result = (x / 100) * y; return { result: result.toFixed(2), details: `${x}% of ${y} = ${x}/100 × ${y} = ${result.toFixed(2)}` }; } else if (v.type === 'X is what % of Y') { const pct = (x / y) * 100; return { result: pct.toFixed(2) + '%', details: `${x} is ${pct.toFixed(2)}% of ${y}` }; } else { const effective = ((1 + x / 100) * (1 + y / 100) - 1) * 100; return { result: effective.toFixed(2) + '%', details: `Successive ${x}% and ${y}%<br>Effective: ${effective.toFixed(2)}%` }; } }
    },
    {
        id: 'apt-probability', name: 'Probability Aptitude Calculator', icon: '🎯', category: 'Aptitude', description: 'Probability problems',
        fields: [{ id: 'type', label: 'Problem Type', type: 'select', options: ['Single Event', 'AND (Both Events)', 'OR (Either Event)'] }, { id: 'p1', label: 'Probability 1', type: 'number', placeholder: '0.5', step: '0.01' }, { id: 'p2', label: 'Probability 2', type: 'number', placeholder: '0.3', step: '0.01' }],
        calculate: (v) => { const p1 = parseFloat(v.p1), p2 = parseFloat(v.p2); if (v.type === 'Single Event') { return { result: p1.toFixed(4), details: `P(A) = ${p1}<br>P(not A) = ${(1 - p1).toFixed(4)}<br>Odds: ${p1}:${(1 - p1).toFixed(4)}` }; } else if (v.type === 'AND (Both Events)') { const both = p1 * p2; return { result: both.toFixed(4), details: `P(A and B) = P(A) × P(B)<br>= ${p1} × ${p2} = ${both.toFixed(4)}` }; } else { const either = p1 + p2 - (p1 * p2); return { result: either.toFixed(4), details: `P(A or B) = P(A) + P(B) - P(A)×P(B)<br>= ${p1} + ${p2} - ${(p1 * p2).toFixed(4)} = ${either.toFixed(4)}` }; } }
    },
    {
        id: 'apt-clock', name: 'Clock Angle Calculator', icon: '🕐', category: 'Aptitude', description: 'Calculate clock hands angle',
        fields: [{ id: 'hour', label: 'Hour', type: 'number', placeholder: '3' }, { id: 'minute', label: 'Minute', type: 'number', placeholder: '30' }],
        calculate: (v) => { const h = parseFloat(v.hour) % 12, m = parseFloat(v.minute); const hourAngle = (h * 30) + (m * 0.5); const minAngle = m * 6; let angle = Math.abs(hourAngle - minAngle); if (angle > 180) angle = 360 - angle; return { result: angle.toFixed(1) + '°', details: `Hour hand: ${hourAngle}°<br>Minute hand: ${minAngle}°<br>Angle between: ${angle.toFixed(1)}°` }; }
    },
    {
        id: 'apt-calendar', name: 'Calendar Day Calculator', icon: '📅', category: 'Aptitude', description: 'Find day of the week',
        fields: [{ id: 'day', label: 'Day', type: 'number', placeholder: '15' }, { id: 'month', label: 'Month', type: 'number', placeholder: '8' }, { id: 'year', label: 'Year', type: 'number', placeholder: '2024' }],
        calculate: (v) => { const date = new Date(parseInt(v.year), parseInt(v.month) - 1, parseInt(v.day)); const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; const dayName = days[date.getDay()]; const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0); return { result: dayName, details: `${v.day}/${v.month}/${v.year} is a ${dayName}<br>Leap year: ${isLeap(parseInt(v.year)) ? 'Yes' : 'No'}` }; }
    },
    {
        id: 'apt-seating', name: 'Seating Arrangement Solver', icon: '🪑', category: 'Aptitude', description: 'Linear seating arrangements',
        fields: [{ id: 'people', label: 'Number of People', type: 'number', placeholder: '5' }, { id: 'type', label: 'Arrangement', type: 'select', options: ['Linear', 'Circular'] }],
        calculate: (v) => { const n = parseInt(v.people); const fact = (x) => { let f = 1; for (let i = 2; i <= x; i++) f *= i; return f; }; let arrangements; if (v.type === 'Linear') { arrangements = fact(n); return { result: arrangements.toLocaleString(), details: `${n}! = ${arrangements.toLocaleString()} ways<br>Linear arrangement of ${n} people` }; } else { arrangements = fact(n - 1); return { result: arrangements.toLocaleString(), details: `(${n}-1)! = ${arrangements.toLocaleString()} ways<br>Circular arrangement of ${n} people` }; } }
    },
    {
        id: 'apt-blood-relation', name: 'Blood Relation Solver', icon: '👨‍👩‍👧‍👦', category: 'Aptitude', description: 'Determine blood relations',
        fields: [{ id: 'relation1', label: 'A is ___ of B', type: 'select', options: ['Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister', 'Husband', 'Wife'] }, { id: 'relation2', label: 'B is ___ of C', type: 'select', options: ['Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister', 'Husband', 'Wife'] }],
        calculate: (v) => { const relations = { 'Father-Father': 'Grandfather', 'Father-Mother': 'Grandmother', 'Mother-Father': 'Grandfather', 'Mother-Mother': 'Grandmother', 'Father-Son': 'Brother', 'Father-Daughter': 'Sister', 'Mother-Son': 'Brother', 'Mother-Daughter': 'Sister', 'Son-Son': 'Grandson', 'Son-Daughter': 'Granddaughter', 'Daughter-Son': 'Grandson', 'Daughter-Daughter': 'Granddaughter', 'Brother-Father': 'Uncle', 'Brother-Mother': 'Aunt', 'Sister-Father': 'Uncle', 'Sister-Mother': 'Aunt' }; const key = `${v.relation1}-${v.relation2}`; const result = relations[key] || 'Complex relation'; return { result: result, details: `If A is ${v.relation1} of B,<br>and B is ${v.relation2} of C,<br>then A is ${result} of C` }; }
    },
    {
        id: 'apt-direction', name: 'Direction Sense Calculator', icon: '🧭', category: 'Aptitude', description: 'Calculate final direction',
        fields: [{ id: 'start', label: 'Starting Direction', type: 'select', options: ['North', 'South', 'East', 'West'] }, { id: 'turns', label: 'Turns (L/R, comma separated)', type: 'text', placeholder: 'L,R,L,L' }],
        calculate: (v) => { const dirs = ['North', 'East', 'South', 'West']; let idx = dirs.indexOf(v.start); const turns = v.turns.split(',').map(t => t.trim().toUpperCase()); turns.forEach(turn => { if (turn === 'L') idx = (idx + 3) % 4; else if (turn === 'R') idx = (idx + 1) % 4; }); return { result: dirs[idx], details: `Started: ${v.start}<br>Turns: ${v.turns}<br>Final direction: ${dirs[idx]}` }; }
    },
    {
        id: 'apt-number-series', name: 'Number Series Calculator', icon: '🔢', category: 'Aptitude', description: 'Find next in series',
        fields: [{ id: 'series', label: 'Series (comma separated)', type: 'text', placeholder: '2,4,6,8,10' }],
        calculate: (v) => { const nums = v.series.split(',').map(n => parseFloat(n.trim())); const diffs = []; for (let i = 1; i < nums.length; i++) diffs.push(nums[i] - nums[i - 1]); const isConstant = diffs.every(d => d === diffs[0]); if (isConstant) { const next = nums[nums.length - 1] + diffs[0]; return { result: next.toString(), details: `Pattern: AP with d = ${diffs[0]}<br>Next term: ${next}` }; } const diffs2 = []; for (let i = 1; i < diffs.length; i++) diffs2.push(diffs[i] - diffs[i - 1]); if (diffs2.every(d => d === diffs2[0])) { const nextDiff = diffs[diffs.length - 1] + diffs2[0]; const next = nums[nums.length - 1] + nextDiff; return { result: next.toString(), details: `Pattern: Quadratic with 2nd diff = ${diffs2[0]}<br>Next term: ${next}` }; } const ratios = []; for (let i = 1; i < nums.length; i++) ratios.push(nums[i] / nums[i - 1]); if (ratios.every(r => Math.abs(r - ratios[0]) < 0.001)) { const next = nums[nums.length - 1] * ratios[0]; return { result: next.toFixed(2), details: `Pattern: GP with r = ${ratios[0].toFixed(2)}<br>Next term: ${next.toFixed(2)}` }; } return { result: 'Complex pattern', details: `Differences: ${diffs.join(', ')}<br>Ratios: ${ratios.map(r => r.toFixed(2)).join(', ')}` }; }
    },
    {
        id: 'apt-coding', name: 'Coding-Decoding Solver', icon: '🔐', category: 'Aptitude', description: 'Encode/decode messages',
        fields: [{ id: 'text', label: 'Text', type: 'text', placeholder: 'HELLO' }, { id: 'shift', label: 'Shift Value', type: 'number', placeholder: '2' }, { id: 'operation', label: 'Operation', type: 'select', options: ['Encode', 'Decode'] }],
        calculate: (v) => { const text = v.text.toUpperCase(); const shift = v.operation === 'Encode' ? parseInt(v.shift) : -parseInt(v.shift); let result = ''; for (let char of text) { if (char >= 'A' && char <= 'Z') { const code = ((char.charCodeAt(0) - 65 + shift + 26) % 26) + 65; result += String.fromCharCode(code); } else { result += char; } } return { result: result, details: `Original: ${text}<br>${v.operation}d with shift ${v.shift}: ${result}` }; }
    },
    {
        id: 'apt-data-sufficiency', name: 'Data Sufficiency Checker', icon: '📋', category: 'Aptitude', description: 'Check data sufficiency',
        fields: [{ id: 'known', label: 'Known Variables', type: 'number', placeholder: '2' }, { id: 'equations', label: 'Number of Equations', type: 'number', placeholder: '2' }, { id: 'unknowns', label: 'Unknown Variables', type: 'number', placeholder: '2' }],
        calculate: (v) => { const known = parseInt(v.known), eq = parseInt(v.equations), unk = parseInt(v.unknowns); const effective = eq + known; const sufficient = effective >= unk; return { result: sufficient ? '✅ Sufficient' : '❌ Insufficient', details: `Known: ${known}<br>Equations: ${eq}<br>Unknowns: ${unk}<br>Available info: ${effective}<br>${sufficient ? 'Data is sufficient' : 'Need more data'}` }; }
    },
    {
        id: 'apt-puzzle', name: 'Logical Puzzle Solver', icon: '🧩', category: 'Aptitude', description: 'Verify logical puzzles',
        fields: [{ id: 'total', label: 'Total Items', type: 'number', placeholder: '10' }, { id: 'group1', label: 'Group 1 Count', type: 'number', placeholder: '4' }, { id: 'group2', label: 'Group 2 Count', type: 'number', placeholder: '3' }, { id: 'group3', label: 'Group 3 Count', type: 'number', placeholder: '3' }],
        calculate: (v) => { const total = parseInt(v.total); const g1 = parseInt(v.group1), g2 = parseInt(v.group2), g3 = parseInt(v.group3); const sum = g1 + g2 + g3; const valid = sum === total; return { result: valid ? '✅ Valid' : '❌ Invalid', details: `Total: ${total}<br>Groups: ${g1} + ${g2} + ${g3} = ${sum}<br>${valid ? 'Distribution is valid' : `Mismatch: ${sum} ≠ ${total}`}` }; }
    },
    {
        id: 'apt-syllogism', name: 'Syllogism Solver', icon: '🔄', category: 'Aptitude', description: 'Check syllogism validity',
        fields: [{ id: 'premise1', label: 'Premise 1 Type', type: 'select', options: ['All A are B', 'Some A are B', 'No A is B', 'Some A are not B'] }, { id: 'premise2', label: 'Premise 2 Type', type: 'select', options: ['All B are C', 'Some B are C', 'No B is C', 'Some B are not C'] }],
        calculate: (v) => { const conclusions = { 'All A are B-All B are C': 'All A are C', 'All A are B-Some B are C': 'Some A may be C', 'All A are B-No B is C': 'No A is C', 'Some A are B-All B are C': 'Some A are C', 'No A is B-All B are C': 'Some C are not A', 'No A is B-No B is C': 'No definite conclusion' }; const key = `${v.premise1}-${v.premise2}`; const result = conclusions[key] || 'No definite conclusion'; return { result: result, details: `Premise 1: ${v.premise1}<br>Premise 2: ${v.premise2}<br>Conclusion: ${result}` }; }
    },
    {
        id: 'apt-statement-conclusion', name: 'Statement-Conclusion Solver', icon: '💭', category: 'Aptitude', description: 'Evaluate statement conclusions',
        fields: [{ id: 'statements', label: 'Number of Statements', type: 'number', placeholder: '2' }, { id: 'conclusions', label: 'Number of Conclusions', type: 'number', placeholder: '2' }, { id: 'valid', label: 'Valid Conclusions', type: 'number', placeholder: '1' }],
        calculate: (v) => { const s = parseInt(v.statements), c = parseInt(v.conclusions), valid = parseInt(v.valid); let answer; if (valid === 0) answer = 'None follows'; else if (valid === c) answer = 'All follow'; else if (valid === 1) answer = 'Only I follows'; else answer = 'Some follow'; return { result: answer, details: `Statements: ${s}<br>Conclusions: ${c}<br>Valid: ${valid}<br>Answer: ${answer}` }; }
    },
    {
        id: 'apt-decision', name: 'Decision Making Solver', icon: '⚡', category: 'Aptitude', description: 'Evaluate decision scenarios',
        fields: [{ id: 'criteria', label: 'Criteria Met (out of total)', type: 'number', placeholder: '4' }, { id: 'total', label: 'Total Criteria', type: 'number', placeholder: '5' }, { id: 'min', label: 'Minimum Required', type: 'number', placeholder: '3' }],
        calculate: (v) => { const met = parseInt(v.criteria), total = parseInt(v.total), min = parseInt(v.min); const pct = (met / total) * 100; const pass = met >= min; return { result: pass ? '✅ Accept' : '❌ Reject', details: `Criteria met: ${met}/${total} (${pct.toFixed(1)}%)<br>Minimum required: ${min}<br>Decision: ${pass ? 'Accept' : 'Reject'}` }; }
    },
    {
        id: 'apt-reasoning-accuracy', name: 'Reasoning Accuracy Calculator', icon: '🎯', category: 'Aptitude', description: 'Calculate reasoning accuracy',
        fields: [{ id: 'correct', label: 'Correct Answers', type: 'number', placeholder: '45' }, { id: 'total', label: 'Total Questions', type: 'number', placeholder: '50' }, { id: 'timeSpent', label: 'Time Spent (minutes)', type: 'number', placeholder: '30' }],
        calculate: (v) => { const correct = parseInt(v.correct), total = parseInt(v.total), time = parseFloat(v.timeSpent); const accuracy = (correct / total) * 100; const speed = total / time; const efficiency = accuracy * speed / 10; return { result: accuracy.toFixed(2) + '%', details: `Accuracy: ${accuracy.toFixed(2)}%<br>Speed: ${speed.toFixed(2)} Q/min<br>Time per Q: ${(time / total).toFixed(2)} min<br>Efficiency Score: ${efficiency.toFixed(2)}` }; }
    },
    {
        id: 'apt-cutoff', name: 'Competitive Exam Cutoff Predictor', icon: '📊', category: 'Aptitude', description: 'Predict exam cutoff',
        fields: [{ id: 'avgScore', label: 'Average Score', type: 'number', placeholder: '75' }, { id: 'topScore', label: 'Top Score', type: 'number', placeholder: '95' }, { id: 'difficulty', label: 'Difficulty Level', type: 'select', options: ['Easy', 'Moderate', 'Difficult'] }, { id: 'seats', label: 'Seats Available', type: 'number', placeholder: '1000' }, { id: 'applicants', label: 'Total Applicants', type: 'number', placeholder: '50000' }],
        calculate: (v) => { const avg = parseFloat(v.avgScore), top = parseFloat(v.topScore); const diffFactor = { 'Easy': 1.1, 'Moderate': 1.0, 'Difficult': 0.85 }; const selectRatio = parseInt(v.seats) / parseInt(v.applicants); const baseCutoff = avg + (top - avg) * (1 - selectRatio); const cutoff = baseCutoff * diffFactor[v.difficulty]; return { result: cutoff.toFixed(2), details: `Average: ${avg}<br>Top Score: ${top}<br>Selection Ratio: ${(selectRatio * 100).toFixed(2)}%<br>Difficulty: ${v.difficulty}<br>Predicted Cutoff: ${cutoff.toFixed(2)}` }; }
    }
];
if (typeof window !== 'undefined') window.aptitudeCalculators = aptitudeCalculators;
