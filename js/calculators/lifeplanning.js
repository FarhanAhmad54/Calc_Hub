// Life Planning & Decision Calculators
const lifeplanningCalculators = [
    {
        id: 'life-timeline', name: 'Life Goal Timeline Calculator', icon: '🎯', category: 'Life Planning', description: 'Plan goal timelines',
        fields: [{ id: 'goal', label: 'Goal Type', type: 'select', options: ['Career', 'Financial', 'Education', 'Health', 'Personal'] }, { id: 'current', label: 'Current Progress %', type: 'number', placeholder: '30' }, { id: 'deadline', label: 'Target Years', type: 'number', placeholder: '5' }],
        calculate: (v) => { const current = parseFloat(v.current), years = parseFloat(v.deadline); const remaining = 100 - current; const monthlyProgress = remaining / (years * 12); const checkpoints = [25, 50, 75, 100].filter(n => n > current); return { result: `${monthlyProgress.toFixed(1)}%/month`, details: `Current: ${current}%<br>Remaining: ${remaining}%<br>Monthly target: ${monthlyProgress.toFixed(1)}%<br>Key milestones: ${checkpoints.join('%, ')}%` }; }
    },
    {
        id: 'life-proscons', name: 'Decision Pros-Cons Score', icon: '⚖️', category: 'Life Planning', description: 'Score decisions objectively',
        fields: [{ id: 'prosCount', label: 'Number of Pros', type: 'number', placeholder: '5' }, { id: 'prosWeight', label: 'Avg Pro Weight (1-10)', type: 'number', placeholder: '7' }, { id: 'consCount', label: 'Number of Cons', type: 'number', placeholder: '3' }, { id: 'consWeight', label: 'Avg Con Weight (1-10)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const prosScore = parseInt(v.prosCount) * parseFloat(v.prosWeight); const consScore = parseInt(v.consCount) * parseFloat(v.consWeight); const net = prosScore - consScore; const recommendation = net > 10 ? '✅ Strong Yes' : net > 0 ? '🤔 Lean Yes' : net > -10 ? '🤔 Lean No' : '❌ Strong No'; return { result: recommendation, details: `Pros score: ${prosScore}<br>Cons score: ${consScore}<br>Net: ${net > 0 ? '+' : ''}${net}<br>Recommendation: ${recommendation}` }; }
    },
    {
        id: 'life-risk', name: 'Risk vs Reward Calculator', icon: '🎲', category: 'Life Planning', description: 'Evaluate risk-reward ratio',
        fields: [{ id: 'reward', label: 'Potential Reward (1-100)', type: 'number', placeholder: '80' }, { id: 'risk', label: 'Risk Level (1-100)', type: 'number', placeholder: '40' }, { id: 'probability', label: 'Success Probability %', type: 'number', placeholder: '70' }],
        calculate: (v) => { const reward = parseFloat(v.reward), risk = parseFloat(v.risk), prob = parseFloat(v.probability) / 100; const expected = reward * prob - risk * (1 - prob); const ratio = reward / risk; let verdict = expected > 30 ? 'Excellent opportunity' : expected > 10 ? 'Good opportunity' : expected > 0 ? 'Marginal' : 'Too risky'; return { result: `${ratio.toFixed(2)}:1 ratio`, details: `Expected value: ${expected.toFixed(1)}<br>Risk-reward ratio: ${ratio.toFixed(2)}:1<br>Verdict: ${verdict}` }; }
    },
    {
        id: 'life-time-value', name: 'Time Value of Life Calculator', icon: '⏳', category: 'Life Planning', description: 'Calculate time worth',
        fields: [{ id: 'income', label: 'Annual Income', type: 'number', placeholder: '1000000' }, { id: 'workHours', label: 'Work Hours/Week', type: 'number', placeholder: '45' }, { id: 'workWeeks', label: 'Work Weeks/Year', type: 'number', placeholder: '48' }],
        calculate: (v) => { const income = parseFloat(v.income), hours = parseFloat(v.workHours), weeks = parseFloat(v.workWeeks); const hourlyRate = income / (hours * weeks); const dayRate = hourlyRate * 8; const taskValue = hourlyRate / 4; return { result: `₹${hourlyRate.toFixed(0)}/hour`, details: `Hourly value: ₹${hourlyRate.toFixed(0)}<br>Daily value: ₹${dayRate.toFixed(0)}<br>15-min value: ₹${taskValue.toFixed(0)}<br>Time well spent?` }; }
    },
    {
        id: 'life-priority', name: 'Personal Priority Ranking Tool', icon: '📋', category: 'Life Planning', description: 'Rank life priorities',
        fields: [{ id: 'career', label: 'Career Importance (1-10)', type: 'number', placeholder: '8' }, { id: 'family', label: 'Family Importance (1-10)', type: 'number', placeholder: '9' }, { id: 'health', label: 'Health Importance (1-10)', type: 'number', placeholder: '8' }, { id: 'wealth', label: 'Wealth Importance (1-10)', type: 'number', placeholder: '7' }, { id: 'growth', label: 'Personal Growth (1-10)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const priorities = [{ name: 'Family', score: parseFloat(v.family) }, { name: 'Career', score: parseFloat(v.career) }, { name: 'Health', score: parseFloat(v.health) }, { name: 'Wealth', score: parseFloat(v.wealth) }, { name: 'Growth', score: parseFloat(v.growth) }].sort((a, b) => b.score - a.score); return { result: `#1: ${priorities[0].name}`, details: priorities.map((p, i) => `${i + 1}. ${p.name}: ${p.score}/10`).join('<br>') }; }
    },
    {
        id: 'life-habit', name: 'Habit Success Probability Calculator', icon: '🔄', category: 'Life Planning', description: 'Predict habit sticking',
        fields: [{ id: 'complexity', label: 'Habit Complexity (1-10)', type: 'number', placeholder: '5' }, { id: 'motivation', label: 'Motivation Level (1-10)', type: 'number', placeholder: '8' }, { id: 'environment', label: 'Environment Support (1-10)', type: 'number', placeholder: '7' }],
        calculate: (v) => { const complexity = parseFloat(v.complexity), motivation = parseFloat(v.motivation), env = parseFloat(v.environment); const probability = ((motivation + env) - complexity) * 8 + 20; const days = Math.round(21 + complexity * 5); let tip = probability < 40 ? 'Start smaller' : probability < 70 ? 'Build support systems' : 'Great setup!'; return { result: `${Math.max(10, Math.min(95, probability)).toFixed(0)}% chance`, details: `Success probability: ${Math.max(10, Math.min(95, probability)).toFixed(0)}%<br>Days to form: ~${days}<br>Tip: ${tip}` }; }
    },
    {
        id: 'life-routine', name: 'Daily Routine Optimizer', icon: '📅', category: 'Life Planning', description: 'Optimize daily schedule',
        fields: [{ id: 'wakeTime', label: 'Wake Time (24hr)', type: 'number', placeholder: '6' }, { id: 'sleepTime', label: 'Sleep Time (24hr)', type: 'number', placeholder: '22' }, { id: 'workHours', label: 'Work Hours', type: 'number', placeholder: '8' }],
        calculate: (v) => { const wake = parseFloat(v.wakeTime), sleep = parseFloat(v.sleepTime), work = parseFloat(v.workHours); const awake = sleep - wake; const personal = awake - work - 2; const sleep_hrs = 24 - awake; let quality = sleep_hrs >= 7 && personal >= 4 ? '✅ Balanced' : sleep_hrs < 7 ? '⚠️ Need more sleep' : '⚠️ Need personal time'; return { result: quality, details: `Awake hours: ${awake}<br>Work: ${work}h<br>Personal time: ${personal.toFixed(1)}h<br>Sleep: ${sleep_hrs}h<br>Assessment: ${quality}` }; }
    },
    {
        id: 'life-time-alloc', name: 'Time Allocation Calculator', icon: '⏰', category: 'Life Planning', description: 'Track time distribution',
        fields: [{ id: 'work', label: 'Work Hours/Week', type: 'number', placeholder: '45' }, { id: 'sleep', label: 'Sleep Hours/Week', type: 'number', placeholder: '49' }, { id: 'family', label: 'Family Time/Week', type: 'number', placeholder: '20' }, { id: 'personal', label: 'Personal Time/Week', type: 'number', placeholder: '15' }],
        calculate: (v) => { const total = 168; const work = parseFloat(v.work), sleep = parseFloat(v.sleep), family = parseFloat(v.family), personal = parseFloat(v.personal); const accounted = work + sleep + family + personal; const other = total - accounted; return { result: `${other.toFixed(0)}h untracked`, details: `Work: ${work}h (${(work / total * 100).toFixed(0)}%)<br>Sleep: ${sleep}h (${(sleep / total * 100).toFixed(0)}%)<br>Family: ${family}h (${(family / total * 100).toFixed(0)}%)<br>Personal: ${personal}h<br>Other: ${other.toFixed(0)}h` }; }
    },
    {
        id: 'life-productivity', name: 'Productivity Balance Calculator', icon: '📊', category: 'Life Planning', description: 'Measure productivity balance',
        fields: [{ id: 'tasks', label: 'Tasks Completed/Day', type: 'number', placeholder: '8' }, { id: 'planned', label: 'Tasks Planned/Day', type: 'number', placeholder: '10' }, { id: 'satisfaction', label: 'Satisfaction (1-10)', type: 'number', placeholder: '7' }],
        calculate: (v) => { const done = parseFloat(v.tasks), planned = parseFloat(v.planned), sat = parseFloat(v.satisfaction); const completion = (done / planned) * 100; const balance = (completion + sat * 10) / 2; let status = balance > 80 ? 'Excellent' : balance > 60 ? 'Good' : balance > 40 ? 'Needs work' : 'Rebalance now'; return { result: `${balance.toFixed(0)}/100 score`, details: `Completion: ${completion.toFixed(0)}%<br>Satisfaction: ${sat}/10<br>Balance score: ${balance.toFixed(0)}<br>Status: ${status}` }; }
    },
    {
        id: 'life-burnout', name: 'Burnout Risk Estimator', icon: '🔥', category: 'Life Planning', description: 'Assess burnout risk',
        fields: [{ id: 'workHours', label: 'Work Hours/Week', type: 'number', placeholder: '50' }, { id: 'stress', label: 'Stress Level (1-10)', type: 'number', placeholder: '7' }, { id: 'recovery', label: 'Recovery Time/Week (hrs)', type: 'number', placeholder: '10' }, { id: 'meaning', label: 'Work Meaning (1-10)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const hours = parseFloat(v.workHours), stress = parseFloat(v.stress), recovery = parseFloat(v.recovery), meaning = parseFloat(v.meaning); const risk = (hours / 10 + stress * 5 - recovery / 2 - meaning * 3); const riskPct = Math.max(0, Math.min(100, risk + 30)); let level = riskPct > 70 ? '🔴 High Risk' : riskPct > 40 ? '🟡 Moderate' : '🟢 Low Risk'; return { result: level, details: `Burnout risk: ${riskPct.toFixed(0)}%<br>Work load: ${hours}h/week<br>Stress: ${stress}/10<br>Recovery: ${recovery}h<br>Action: ${riskPct > 50 ? 'Take breaks!' : 'Maintain balance'}` }; }
    },
    {
        id: 'life-career-switch', name: 'Career Switch Readiness Calculator', icon: '🔄', category: 'Life Planning', description: 'Evaluate career change',
        fields: [{ id: 'savings', label: 'Months of Savings', type: 'number', placeholder: '6' }, { id: 'skills', label: 'Transferable Skills (1-10)', type: 'number', placeholder: '7' }, { id: 'network', label: 'Industry Network (1-10)', type: 'number', placeholder: '5' }, { id: 'passion', label: 'Passion for New Field (1-10)', type: 'number', placeholder: '9' }],
        calculate: (v) => { const savings = parseFloat(v.savings), skills = parseFloat(v.skills), network = parseFloat(v.network), passion = parseFloat(v.passion); const financial = Math.min(100, savings * 15); const readiness = (financial + skills * 5 + network * 5 + passion * 5) / 3.5; let verdict = readiness > 70 ? '✅ Ready to switch' : readiness > 50 ? '🤔 Build more runway' : '⚠️ Prepare more'; return { result: `${readiness.toFixed(0)}% ready`, details: `Financial: ${financial.toFixed(0)}%<br>Skills: ${skills}/10<br>Network: ${network}/10<br>Passion: ${passion}/10<br>Verdict: ${verdict}` }; }
    },
    {
        id: 'life-skill-time', name: 'Skill Learning Time Calculator', icon: '📚', category: 'Life Planning', description: 'Estimate skill learning time',
        fields: [{ id: 'skill', label: 'Skill Type', type: 'select', options: ['Language', 'Programming', 'Musical Instrument', 'Sport', 'Professional'] }, { id: 'level', label: 'Target Level', type: 'select', options: ['Basic', 'Intermediate', 'Advanced', 'Expert'] }, { id: 'hoursPerWeek', label: 'Practice Hours/Week', type: 'number', placeholder: '10' }],
        calculate: (v) => { const baseHours = { 'Language': { 'Basic': 200, 'Intermediate': 600, 'Advanced': 1200, 'Expert': 3000 }, 'Programming': { 'Basic': 100, 'Intermediate': 400, 'Advanced': 1000, 'Expert': 5000 }, 'Musical Instrument': { 'Basic': 300, 'Intermediate': 1000, 'Advanced': 3000, 'Expert': 10000 }, 'Sport': { 'Basic': 100, 'Intermediate': 500, 'Advanced': 2000, 'Expert': 10000 }, 'Professional': { 'Basic': 200, 'Intermediate': 800, 'Advanced': 2000, 'Expert': 10000 } }; const hours = baseHours[v.skill][v.level]; const weekly = parseFloat(v.hoursPerWeek); const weeks = hours / weekly; const months = weeks / 4.33; return { result: `${months.toFixed(0)} months`, details: `Skill: ${v.skill}<br>Target: ${v.level}<br>Hours needed: ${hours}<br>At ${weekly}h/week: ${months.toFixed(1)} months` }; }
    },
    {
        id: 'life-opportunity', name: 'Opportunity Cost Calculator', icon: '💡', category: 'Life Planning', description: 'Calculate opportunity cost',
        fields: [{ id: 'choiceA', label: 'Option A Value', type: 'number', placeholder: '100000' }, { id: 'choiceB', label: 'Option B Value', type: 'number', placeholder: '80000' }, { id: 'timeA', label: 'Option A Time (months)', type: 'number', placeholder: '12' }, { id: 'timeB', label: 'Option B Time (months)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const valA = parseFloat(v.choiceA), valB = parseFloat(v.choiceB); const timeA = parseFloat(v.timeA), timeB = parseFloat(v.timeB); const rateA = valA / timeA, rateB = valB / timeB; const best = rateA > rateB ? 'A' : 'B'; const cost = Math.abs(valA - valB); return { result: `Choose Option ${best}`, details: `Option A: ₹${valA.toLocaleString()} in ${timeA}mo (₹${rateA.toFixed(0)}/mo)<br>Option B: ₹${valB.toLocaleString()} in ${timeB}mo (₹${rateB.toFixed(0)}/mo)<br>Opportunity cost: ₹${cost.toLocaleString()}` }; }
    },
    {
        id: 'life-regret', name: 'Decision Regret Estimator', icon: '🤔', category: 'Life Planning', description: 'Minimize future regret',
        fields: [{ id: 'reversible', label: 'Reversibility (1-10)', type: 'number', placeholder: '7' }, { id: 'impact', label: 'Life Impact (1-10)', type: 'number', placeholder: '8' }, { id: 'alignment', label: 'Value Alignment (1-10)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const rev = parseFloat(v.reversible), impact = parseFloat(v.impact), align = parseFloat(v.alignment); const regretRisk = (impact * 5 - rev * 3 - align * 2 + 30); const bounded = Math.max(5, Math.min(95, regretRisk)); let advice = bounded < 30 ? 'Low regret risk - proceed' : bounded < 60 ? 'Consider carefully' : 'High regret potential'; return { result: `${bounded.toFixed(0)}% regret risk`, details: `Reversibility: ${rev}/10<br>Impact: ${impact}/10<br>Alignment: ${align}/10<br>Regret risk: ${bounded.toFixed(0)}%<br>Advice: ${advice}` }; }
    },
    {
        id: 'life-growth', name: 'Personal Growth Score', icon: '🌱', category: 'Life Planning', description: 'Measure personal growth',
        fields: [{ id: 'learning', label: 'Learning Hours/Week', type: 'number', placeholder: '5' }, { id: 'challenges', label: 'New Challenges/Month', type: 'number', placeholder: '2' }, { id: 'reflection', label: 'Reflection Time/Week (hrs)', type: 'number', placeholder: '2' }],
        calculate: (v) => { const learning = parseFloat(v.learning), challenges = parseFloat(v.challenges), reflection = parseFloat(v.reflection); const score = learning * 5 + challenges * 15 + reflection * 10; const level = score > 80 ? 'Rapid Growth' : score > 50 ? 'Steady Growth' : score > 25 ? 'Slow Growth' : 'Stagnation Risk'; return { result: `${Math.min(100, score).toFixed(0)}/100`, details: `Learning: ${learning}h/week<br>Challenges: ${challenges}/month<br>Reflection: ${reflection}h/week<br>Growth score: ${score.toFixed(0)}<br>Level: ${level}` }; }
    },
    {
        id: 'life-longterm', name: 'Long-Term Planning Calculator', icon: '🔮', category: 'Life Planning', description: 'Plan long-term goals',
        fields: [{ id: 'age', label: 'Current Age', type: 'number', placeholder: '30' }, { id: 'retireAge', label: 'Target Retire Age', type: 'number', placeholder: '55' }, { id: 'lifeGoals', label: 'Major Goals Count', type: 'number', placeholder: '5' }],
        calculate: (v) => { const current = parseInt(v.age), retire = parseInt(v.retireAge), goals = parseInt(v.lifeGoals); const years = retire - current; const perGoal = years / goals; const decades = Math.ceil(years / 10); return { result: `${years} years to plan`, details: `Working years left: ${years}<br>Major goals: ${goals}<br>Years per goal: ${perGoal.toFixed(1)}<br>Decades: ${decades}<br>Start now!` }; }
    },
    {
        id: 'life-balance', name: 'Life Balance Wheel Calculator', icon: '⚖️', category: 'Life Planning', description: 'Assess life balance',
        fields: [{ id: 'career', label: 'Career (1-10)', type: 'number', placeholder: '7' }, { id: 'finance', label: 'Finance (1-10)', type: 'number', placeholder: '6' }, { id: 'health', label: 'Health (1-10)', type: 'number', placeholder: '7' }, { id: 'relationships', label: 'Relationships (1-10)', type: 'number', placeholder: '8' }, { id: 'fun', label: 'Fun & Recreation (1-10)', type: 'number', placeholder: '5' }, { id: 'growth', label: 'Personal Growth (1-10)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const scores = [parseFloat(v.career), parseFloat(v.finance), parseFloat(v.health), parseFloat(v.relationships), parseFloat(v.fun), parseFloat(v.growth)]; const avg = scores.reduce((a, b) => a + b, 0) / scores.length; const min = Math.min(...scores); const areas = ['Career', 'Finance', 'Health', 'Relationships', 'Fun', 'Growth']; const weakest = areas[scores.indexOf(min)]; return { result: `${avg.toFixed(1)}/10 balance`, details: `Average: ${avg.toFixed(1)}/10<br>Weakest: ${weakest} (${min}/10)<br>Focus area: ${weakest}` }; }
    },
    {
        id: 'life-goal-predict', name: 'Goal Completion Predictor', icon: '🎯', category: 'Life Planning', description: 'Predict goal completion',
        fields: [{ id: 'progress', label: 'Current Progress %', type: 'number', placeholder: '40' }, { id: 'elapsed', label: 'Time Elapsed (months)', type: 'number', placeholder: '5' }, { id: 'deadline', label: 'Total Time (months)', type: 'number', placeholder: '12' }],
        calculate: (v) => { const progress = parseFloat(v.progress), elapsed = parseFloat(v.elapsed), total = parseFloat(v.deadline); const rate = progress / elapsed; const projected = rate * total; const onTrack = projected >= 100; const needed = (100 - progress) / (total - elapsed); return { result: onTrack ? '✅ On track' : '⚠️ Behind', details: `Current: ${progress}%<br>Projected: ${projected.toFixed(0)}%<br>Rate: ${rate.toFixed(1)}%/month<br>Need: ${needed.toFixed(1)}%/month to finish` }; }
    },
    {
        id: 'life-stress', name: 'Stress vs Workload Calculator', icon: '😰', category: 'Life Planning', description: 'Analyze stress levels',
        fields: [{ id: 'workload', label: 'Workload (1-10)', type: 'number', placeholder: '8' }, { id: 'stress', label: 'Stress Level (1-10)', type: 'number', placeholder: '7' }, { id: 'coping', label: 'Coping Skills (1-10)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const work = parseFloat(v.workload), stress = parseFloat(v.stress), cope = parseFloat(v.coping); const ratio = stress / work; const buffer = cope - (stress - work); let status = buffer > 2 ? '🟢 Managing well' : buffer > 0 ? '🟡 Borderline' : '🔴 Overwhelmed'; return { result: status, details: `Workload: ${work}/10<br>Stress: ${stress}/10<br>Coping: ${cope}/10<br>Stress/work ratio: ${ratio.toFixed(2)}<br>Status: ${status}` }; }
    },
    {
        id: 'life-focus', name: 'Focus Capacity Calculator', icon: '🎯', category: 'Life Planning', description: 'Calculate focus capacity',
        fields: [{ id: 'sleep', label: 'Sleep Hours', type: 'number', placeholder: '7' }, { id: 'breaks', label: 'Breaks Taken/Day', type: 'number', placeholder: '4' }, { id: 'distractions', label: 'Distraction Level (1-10)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const sleep = parseFloat(v.sleep), breaks = parseFloat(v.breaks), dist = parseFloat(v.distractions); const sleepBonus = Math.min(20, (sleep - 5) * 5); const breakBonus = Math.min(15, breaks * 3); const distPenalty = dist * 5; const capacity = 50 + sleepBonus + breakBonus - distPenalty; return { result: `${Math.max(10, Math.min(100, capacity)).toFixed(0)}% capacity`, details: `Sleep bonus: +${sleepBonus.toFixed(0)}%<br>Break bonus: +${breakBonus.toFixed(0)}%<br>Distraction penalty: -${distPenalty.toFixed(0)}%<br>Focus capacity: ${Math.max(10, Math.min(100, capacity)).toFixed(0)}%` }; }
    },
    {
        id: 'life-sleep-debt', name: 'Sleep Debt Calculator', icon: '😴', category: 'Life Planning', description: 'Calculate sleep debt',
        fields: [{ id: 'ideal', label: 'Ideal Sleep (hrs)', type: 'number', placeholder: '8' }, { id: 'actual', label: 'Actual Sleep (hrs)', type: 'number', placeholder: '6' }, { id: 'days', label: 'Days', type: 'number', placeholder: '7' }],
        calculate: (v) => { const ideal = parseFloat(v.ideal), actual = parseFloat(v.actual), days = parseFloat(v.days); const dailyDebt = ideal - actual; const totalDebt = dailyDebt * days; const recoveryDays = totalDebt / 2; let severity = totalDebt < 5 ? 'Low' : totalDebt < 15 ? 'Moderate' : 'Severe'; return { result: `${totalDebt.toFixed(0)}hrs debt`, details: `Daily deficit: ${dailyDebt}hrs<br>Total debt: ${totalDebt.toFixed(0)}hrs<br>Recovery: ~${recoveryDays.toFixed(0)} days<br>Severity: ${severity}` }; }
    },
    {
        id: 'life-energy', name: 'Energy Management Calculator', icon: '⚡', category: 'Life Planning', description: 'Track energy levels',
        fields: [{ id: 'morning', label: 'Morning Energy (1-10)', type: 'number', placeholder: '8' }, { id: 'afternoon', label: 'Afternoon Energy (1-10)', type: 'number', placeholder: '6' }, { id: 'evening', label: 'Evening Energy (1-10)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const m = parseFloat(v.morning), a = parseFloat(v.afternoon), e = parseFloat(v.evening); const avg = (m + a + e) / 3; const pattern = m > a && a > e ? 'Early bird' : e > a && a > m ? 'Night owl' : 'Variable'; const peak = m >= a && m >= e ? 'Morning' : a >= m && a >= e ? 'Afternoon' : 'Evening'; return { result: `Peak: ${peak}`, details: `Morning: ${m}/10<br>Afternoon: ${a}/10<br>Evening: ${e}/10<br>Average: ${avg.toFixed(1)}<br>Pattern: ${pattern}` }; }
    },
    {
        id: 'life-finance-health', name: 'Personal Finance Health Score', icon: '💰', category: 'Life Planning', description: 'Assess financial health',
        fields: [{ id: 'savings', label: 'Savings Rate %', type: 'number', placeholder: '20' }, { id: 'debtToIncome', label: 'Debt to Income %', type: 'number', placeholder: '30' }, { id: 'emergency', label: 'Emergency Fund (months)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const savings = parseFloat(v.savings), debt = parseFloat(v.debtToIncome), emergency = parseFloat(v.emergency); const savingsScore = Math.min(30, savings * 1.5); const debtScore = Math.max(0, 30 - debt); const emergencyScore = Math.min(40, emergency * 6); const total = savingsScore + debtScore + emergencyScore; return { result: `${total.toFixed(0)}/100`, details: `Savings: ${savingsScore.toFixed(0)}/30<br>Debt: ${debtScore.toFixed(0)}/30<br>Emergency: ${emergencyScore.toFixed(0)}/40<br>Health: ${total.toFixed(0)}/100` }; }
    },
    {
        id: 'life-relationship-time', name: 'Relationship Time Balance Calculator', icon: '❤️', category: 'Life Planning', description: 'Balance relationship time',
        fields: [{ id: 'partner', label: 'Partner Time/Week (hrs)', type: 'number', placeholder: '15' }, { id: 'family', label: 'Family Time/Week (hrs)', type: 'number', placeholder: '10' }, { id: 'friends', label: 'Friends Time/Week (hrs)', type: 'number', placeholder: '5' }, { id: 'solo', label: 'Solo Time/Week (hrs)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const partner = parseFloat(v.partner), family = parseFloat(v.family), friends = parseFloat(v.friends), solo = parseFloat(v.solo); const total = partner + family + friends + solo; const balance = solo > 5 && friends > 2 && family > 5; return { result: balance ? '✅ Balanced' : '⚠️ Adjust', details: `Partner: ${partner}h<br>Family: ${family}h<br>Friends: ${friends}h<br>Solo: ${solo}h<br>Total: ${total}h/week` }; }
    },
    {
        id: 'life-study-leisure', name: 'Study vs Leisure Ratio', icon: '📖', category: 'Life Planning', description: 'Balance study and leisure',
        fields: [{ id: 'study', label: 'Study Hours/Day', type: 'number', placeholder: '4' }, { id: 'leisure', label: 'Leisure Hours/Day', type: 'number', placeholder: '3' }],
        calculate: (v) => { const study = parseFloat(v.study), leisure = parseFloat(v.leisure); const ratio = study / leisure; const ideal = ratio >= 1 && ratio <= 2; let verdict = ratio < 0.5 ? 'More study needed' : ratio > 3 ? 'More breaks needed' : 'Good balance'; return { result: `${ratio.toFixed(1)}:1 ratio`, details: `Study: ${study}h/day<br>Leisure: ${leisure}h/day<br>Ratio: ${ratio.toFixed(1)}:1<br>Verdict: ${verdict}` }; }
    },
    {
        id: 'life-screen', name: 'Screen Life Balance Calculator', icon: '📱', category: 'Life Planning', description: 'Track screen time balance',
        fields: [{ id: 'productive', label: 'Productive Screen (hrs)', type: 'number', placeholder: '6' }, { id: 'social', label: 'Social Media (hrs)', type: 'number', placeholder: '2' }, { id: 'entertainment', label: 'Entertainment (hrs)', type: 'number', placeholder: '2' }],
        calculate: (v) => { const prod = parseFloat(v.productive), social = parseFloat(v.social), ent = parseFloat(v.entertainment); const total = prod + social + ent; const productiveRatio = (prod / total) * 100; let verdict = social > 3 ? '⚠️ Limit social media' : total > 12 ? '⚠️ Too much screen time' : '✅ Balanced'; return { result: `${total.toFixed(0)}h total`, details: `Productive: ${prod}h (${productiveRatio.toFixed(0)}%)<br>Social: ${social}h<br>Entertainment: ${ent}h<br>Verdict: ${verdict}` }; }
    },
    {
        id: 'life-confidence', name: 'Decision Confidence Score', icon: '💪', category: 'Life Planning', description: 'Rate decision confidence',
        fields: [{ id: 'information', label: 'Information Level (1-10)', type: 'number', placeholder: '7' }, { id: 'experience', label: 'Past Experience (1-10)', type: 'number', placeholder: '6' }, { id: 'intuition', label: 'Gut Feeling (1-10)', type: 'number', placeholder: '8' }],
        calculate: (v) => { const info = parseFloat(v.information), exp = parseFloat(v.experience), gut = parseFloat(v.intuition); const confidence = (info * 0.4 + exp * 0.35 + gut * 0.25) * 10; let action = confidence > 70 ? 'Proceed with confidence' : confidence > 50 ? 'Gather more info' : 'Reconsider decision'; return { result: `${confidence.toFixed(0)}% confident`, details: `Information: ${info}/10 (40%)<br>Experience: ${exp}/10 (35%)<br>Intuition: ${gut}/10 (25%)<br>Confidence: ${confidence.toFixed(0)}%<br>Action: ${action}` }; }
    },
    {
        id: 'life-satisfaction', name: 'Life Satisfaction Index', icon: '😊', category: 'Life Planning', description: 'Measure life satisfaction',
        fields: [{ id: 'health', label: 'Health Satisfaction (1-10)', type: 'number', placeholder: '7' }, { id: 'work', label: 'Work Satisfaction (1-10)', type: 'number', placeholder: '6' }, { id: 'relationships', label: 'Relationship Satisfaction (1-10)', type: 'number', placeholder: '8' }, { id: 'finance', label: 'Financial Satisfaction (1-10)', type: 'number', placeholder: '5' }, { id: 'purpose', label: 'Sense of Purpose (1-10)', type: 'number', placeholder: '7' }],
        calculate: (v) => { const scores = [parseFloat(v.health), parseFloat(v.work), parseFloat(v.relationships), parseFloat(v.finance), parseFloat(v.purpose)]; const avg = scores.reduce((a, b) => a + b, 0) / scores.length; const min = Math.min(...scores); const areas = ['Health', 'Work', 'Relationships', 'Finance', 'Purpose']; return { result: `${(avg * 10).toFixed(0)}/100`, details: `Health: ${v.health}<br>Work: ${v.work}<br>Relationships: ${v.relationships}<br>Finance: ${v.finance}<br>Purpose: ${v.purpose}<br>Index: ${(avg * 10).toFixed(0)}<br>Focus: ${areas[scores.indexOf(min)]}` }; }
    },
    {
        id: 'life-efficiency', name: 'Personal Efficiency Calculator', icon: '⚡', category: 'Life Planning', description: 'Measure personal efficiency',
        fields: [{ id: 'output', label: 'Tasks Completed', type: 'number', placeholder: '20' }, { id: 'hours', label: 'Hours Worked', type: 'number', placeholder: '40' }, { id: 'quality', label: 'Quality Rating (1-10)', type: 'number', placeholder: '8' }],
        calculate: (v) => { const output = parseFloat(v.output), hours = parseFloat(v.hours), quality = parseFloat(v.quality); const tasksPerHour = output / hours; const efficiency = tasksPerHour * quality * 10; let rating = efficiency > 40 ? 'Highly Efficient' : efficiency > 25 ? 'Efficient' : efficiency > 15 ? 'Average' : 'Needs Improvement'; return { result: `${efficiency.toFixed(0)} score`, details: `Tasks/hour: ${tasksPerHour.toFixed(2)}<br>Quality: ${quality}/10<br>Efficiency: ${efficiency.toFixed(0)}<br>Rating: ${rating}` }; }
    },
    {
        id: 'life-future-age', name: 'Future Self Age Calculator', icon: '👤', category: 'Life Planning', description: 'Visualize future milestones',
        fields: [{ id: 'currentAge', label: 'Current Age', type: 'number', placeholder: '30' }, { id: 'event', label: 'Future Event', type: 'select', options: ['Child starts school', 'Child graduates', 'Retirement', 'Grandkids', 'Golden Anniversary'] }],
        calculate: (v) => { const age = parseInt(v.currentAge); const years = { 'Child starts school': 5, 'Child graduates': 22, 'Retirement': 60 - age, 'Grandkids': 30, 'Golden Anniversary': 50 }; const futureAge = age + years[v.event]; const targetYear = new Date().getFullYear() + years[v.event]; return { result: `${futureAge} years old`, details: `Current age: ${age}<br>Event: ${v.event}<br>Years until: ${years[v.event]}<br>Your age then: ${futureAge}<br>Year: ${targetYear}` }; }
    }
];
if (typeof window !== 'undefined') window.lifeplanningCalculators = lifeplanningCalculators;
