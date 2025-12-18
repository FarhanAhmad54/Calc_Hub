// Biology & Medical Calculators (30) - Unique ones not in health.js
const biologyCalculators = [
    {
        id: 'body-surface-area', name: 'Body Surface Area (BSA)', icon: '📐', category: 'Biology & Medical', description: 'Calculate BSA',
        fields: [{ id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '70' }, { id: 'height', label: 'Height (cm)', type: 'number', placeholder: '175' }],
        calculate: (v) => { const w = parseFloat(v.weight), h = parseFloat(v.height); const bsa = Math.sqrt((h * w) / 3600); return { result: bsa.toFixed(2) + ' m²', details: `BSA (Mosteller) = √(H×W/3600)<br>= ${bsa.toFixed(2)} m²` }; }
    },
    {
        id: 'blood-volume', name: 'Blood Volume Calculator', icon: '🩸', category: 'Biology & Medical', description: 'Estimate blood volume',
        fields: [{ id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '70' }, { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] }],
        calculate: (v) => { const w = parseFloat(v.weight); const factor = v.gender === 'Male' ? 70 : 65; const vol = w * factor; return { result: (vol / 1000).toFixed(2) + ' L', details: `Blood volume: ${vol} mL (${(vol / 1000).toFixed(2)} L)` }; }
    },
    {
        id: 'oxygen-saturation', name: 'Oxygen Saturation Analyzer', icon: '💨', category: 'Biology & Medical', description: 'SpO2 interpretation',
        fields: [{ id: 'spo2', label: 'SpO2 (%)', type: 'number', placeholder: '98' }],
        calculate: (v) => { const spo2 = parseFloat(v.spo2); let status; if (spo2 >= 95) status = '✅ Normal'; else if (spo2 >= 90) status = '⚠️ Mild hypoxemia'; else if (spo2 >= 85) status = '🔴 Moderate hypoxemia'; else status = '🚨 Severe hypoxemia'; return { result: status, details: `SpO2: ${spo2}%<br>${status}` }; }
    },
    {
        id: 'dosage-per-kg', name: 'Dosage per kg Calculator', icon: '💊', category: 'Biology & Medical', description: 'Calculate drug dosage',
        fields: [{ id: 'dose', label: 'Dose (mg/kg)', type: 'number', placeholder: '10' }, { id: 'weight', label: 'Patient Weight (kg)', type: 'number', placeholder: '70' }],
        calculate: (v) => { const dose = parseFloat(v.dose), weight = parseFloat(v.weight); const total = dose * weight; return { result: total.toFixed(2) + ' mg', details: `Total dose = ${dose} mg/kg × ${weight} kg = ${total.toFixed(2)} mg` }; }
    },
    {
        id: 'iv-drip-rate', name: 'IV Drip Rate Calculator', icon: '💉', category: 'Biology & Medical', description: 'Calculate IV drip rate',
        fields: [{ id: 'volume', label: 'Volume (mL)', type: 'number', placeholder: '1000' }, { id: 'time', label: 'Time (hours)', type: 'number', placeholder: '8' }, { id: 'dropFactor', label: 'Drop Factor (gtt/mL)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const vol = parseFloat(v.volume), time = parseFloat(v.time), df = parseFloat(v.dropFactor); const rate = (vol * df) / (time * 60); return { result: rate.toFixed(1) + ' gtt/min', details: `Drip rate = ${vol} × ${df} / ${time * 60} min<br>= ${rate.toFixed(1)} drops/minute` }; }
    },
    {
        id: 'heart-rate-reserve', name: 'Heart Rate Reserve', icon: '❤️', category: 'Biology & Medical', description: 'Calculate HRR',
        fields: [{ id: 'maxHR', label: 'Max HR', type: 'number', placeholder: '190' }, { id: 'restingHR', label: 'Resting HR', type: 'number', placeholder: '60' }],
        calculate: (v) => { const max = parseFloat(v.maxHR), rest = parseFloat(v.restingHR); const hrr = max - rest; const target50 = rest + hrr * 0.5, target70 = rest + hrr * 0.7; return { result: hrr + ' bpm', details: `HRR: ${hrr} bpm<br>50% intensity: ${target50.toFixed(0)} bpm<br>70% intensity: ${target70.toFixed(0)} bpm` }; }
    },
    {
        id: 'blood-sugar-avg', name: 'Blood Sugar Average', icon: '🩸', category: 'Biology & Medical', description: 'Average glucose',
        fields: [{ id: 'fasting', label: 'Fasting (mg/dL)', type: 'number', placeholder: '90' }, { id: 'postMeal', label: 'Post-meal (mg/dL)', type: 'number', placeholder: '140' }],
        calculate: (v) => { const fasting = parseFloat(v.fasting), post = parseFloat(v.postMeal); const avg = (fasting + post) / 2; let status = avg < 100 ? 'Normal' : avg < 126 ? 'Pre-diabetic' : 'Diabetic range'; return { result: avg.toFixed(0) + ' mg/dL', details: `Average: ${avg.toFixed(0)} mg/dL<br>Status: ${status}` }; }
    },
    {
        id: 'hba1c', name: 'HbA1c Calculator', icon: '📊', category: 'Biology & Medical', description: 'Estimate HbA1c from glucose',
        fields: [{ id: 'avgGlucose', label: 'Avg Glucose (mg/dL)', type: 'number', placeholder: '154' }],
        calculate: (v) => { const glucose = parseFloat(v.avgGlucose); const hba1c = (glucose + 46.7) / 28.7; return { result: hba1c.toFixed(1) + '%', details: `HbA1c ≈ ${hba1c.toFixed(1)}%<br>${hba1c < 5.7 ? 'Normal' : hba1c < 6.5 ? 'Pre-diabetic' : 'Diabetic'}` }; }
    },
    {
        id: 'cholesterol-ratio', name: 'Cholesterol Ratio', icon: '📈', category: 'Biology & Medical', description: 'Calculate cholesterol ratios',
        fields: [{ id: 'total', label: 'Total Cholesterol', type: 'number', placeholder: '200' }, { id: 'hdl', label: 'HDL', type: 'number', placeholder: '50' }, { id: 'ldl', label: 'LDL', type: 'number', placeholder: '130' }],
        calculate: (v) => { const total = parseFloat(v.total), hdl = parseFloat(v.hdl), ldl = parseFloat(v.ldl); const ratio = total / hdl; const ldlHdl = ldl / hdl; return { result: 'Ratio: ' + ratio.toFixed(1), details: `Total/HDL: ${ratio.toFixed(1)} (goal <4.5)<br>LDL/HDL: ${ldlHdl.toFixed(1)} (goal <3.5)` }; }
    },
    {
        id: 'gfr', name: 'Kidney Function (GFR)', icon: '🫀', category: 'Biology & Medical', description: 'Estimate GFR',
        fields: [{ id: 'creatinine', label: 'Creatinine (mg/dL)', type: 'number', placeholder: '1.0' }, { id: 'age', label: 'Age', type: 'number', placeholder: '40' }, { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] }],
        calculate: (v) => { const cr = parseFloat(v.creatinine), age = parseFloat(v.age); const k = v.gender === 'Male' ? 0.9 : 0.7; const a = v.gender === 'Male' ? -0.302 : -0.241; let gfr = 142 * Math.pow(Math.min(cr / k, 1), a) * Math.pow(Math.max(cr / k, 1), -1.200) * Math.pow(0.9938, age); if (v.gender === 'Female') gfr *= 1.012; let stage = gfr >= 90 ? 'Normal' : gfr >= 60 ? 'Mild decrease' : gfr >= 30 ? 'Moderate' : 'Severe'; return { result: gfr.toFixed(0) + ' mL/min', details: `eGFR: ${gfr.toFixed(0)} mL/min/1.73m²<br>Status: ${stage}` }; }
    },
    {
        id: 'creatinine-clearance', name: 'Creatinine Clearance', icon: '🧪', category: 'Biology & Medical', description: 'Cockcroft-Gault formula',
        fields: [{ id: 'age', label: 'Age', type: 'number', placeholder: '40' }, { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '70' }, { id: 'creatinine', label: 'Creatinine (mg/dL)', type: 'number', placeholder: '1.0' }, { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] }],
        calculate: (v) => { const age = parseFloat(v.age), w = parseFloat(v.weight), cr = parseFloat(v.creatinine); let crcl = ((140 - age) * w) / (72 * cr); if (v.gender === 'Female') crcl *= 0.85; return { result: crcl.toFixed(0) + ' mL/min', details: `CrCl = ${crcl.toFixed(0)} mL/min` }; }
    },
    {
        id: 'pregnancy-weeks', name: 'Pregnancy Weeks Calculator', icon: '🤰', category: 'Biology & Medical', description: 'Calculate pregnancy week',
        fields: [{ id: 'lmp', label: 'Last Menstrual Period', type: 'date' }],
        calculate: (v) => { const lmp = new Date(v.lmp), today = new Date(); const days = Math.floor((today - lmp) / (24 * 60 * 60 * 1000)); const weeks = Math.floor(days / 7), d = days % 7; const trimester = weeks < 13 ? '1st' : weeks < 27 ? '2nd' : '3rd'; return { result: `${weeks}w ${d}d`, details: `${weeks} weeks, ${d} days<br>Trimester: ${trimester}` }; }
    },
    {
        id: 'fetal-growth', name: 'Fetal Growth Percentile', icon: '👶', category: 'Biology & Medical', description: 'Estimate fetal weight',
        fields: [{ id: 'week', label: 'Gestational Week', type: 'number', placeholder: '30' }, { id: 'weight', label: 'Estimated Weight (g)', type: 'number', placeholder: '1500' }],
        calculate: (v) => { const week = parseFloat(v.week), weight = parseFloat(v.weight); const expected = Math.pow(week, 2.5) * 0.8; const percentile = 50 + (weight - expected) / expected * 50; return { result: Math.min(99, Math.max(1, percentile)).toFixed(0) + 'th percentile', details: `Week ${week}: ${weight}g<br>~${Math.min(99, Math.max(1, percentile)).toFixed(0)}th percentile` }; }
    },
    {
        id: 'medication-interval', name: 'Medication Interval Calculator', icon: '⏰', category: 'Biology & Medical', description: 'Calculate dose schedule',
        fields: [{ id: 'frequency', label: 'Times per Day', type: 'number', placeholder: '3' }],
        calculate: (v) => { const freq = parseFloat(v.frequency); const interval = 24 / freq; const times = []; for (let i = 0; i < freq; i++) { const h = 8 + i * interval; times.push(`${Math.floor(h).toString().padStart(2, '0')}:${((h % 1) * 60).toFixed(0).padStart(2, '0')}`); } return { result: `Every ${interval.toFixed(1)} hours`, details: `${freq}× daily<br>Suggested times: ${times.join(', ')}` }; }
    },
    {
        id: 'calorie-deficit', name: 'Calorie Deficit Calculator', icon: '📉', category: 'Biology & Medical', description: 'Calculate for weight loss',
        fields: [{ id: 'tdee', label: 'TDEE (calories)', type: 'number', placeholder: '2000' }, { id: 'deficit', label: 'Deficit (%)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const tdee = parseFloat(v.tdee), pct = parseFloat(v.deficit); const deficit = tdee * pct / 100; const target = tdee - deficit; const weeklyLoss = (deficit * 7) / 7700; return { result: target.toFixed(0) + ' cal/day', details: `TDEE: ${tdee}<br>Target: ${target.toFixed(0)}<br>Weekly loss: ~${weeklyLoss.toFixed(2)} kg` }; }
    },
    {
        id: 'calorie-surplus', name: 'Calorie Surplus Calculator', icon: '📈', category: 'Biology & Medical', description: 'Calculate for weight gain',
        fields: [{ id: 'tdee', label: 'TDEE (calories)', type: 'number', placeholder: '2000' }, { id: 'surplus', label: 'Surplus (calories)', type: 'number', placeholder: '300' }],
        calculate: (v) => { const tdee = parseFloat(v.tdee), surplus = parseFloat(v.surplus); const target = tdee + surplus; const weeklyGain = (surplus * 7) / 7700; return { result: target.toFixed(0) + ' cal/day', details: `TDEE: ${tdee}<br>Target: ${target.toFixed(0)}<br>Weekly gain: ~${weeklyGain.toFixed(2)} kg` }; }
    },
    {
        id: 'lean-body-mass', name: 'Lean Body Mass', icon: '💪', category: 'Biology & Medical', description: 'Calculate LBM',
        fields: [{ id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '70' }, { id: 'bodyFat', label: 'Body Fat %', type: 'number', placeholder: '20' }],
        calculate: (v) => { const w = parseFloat(v.weight), bf = parseFloat(v.bodyFat); const lbm = w * (1 - bf / 100); return { result: lbm.toFixed(1) + ' kg', details: `Total weight: ${w} kg<br>Fat: ${(w - lbm).toFixed(1)} kg<br>Lean mass: ${lbm.toFixed(1)} kg` }; }
    },
    {
        id: 'waist-hip-ratio', name: 'Waist-to-Hip Ratio', icon: '📏', category: 'Biology & Medical', description: 'Calculate WHR',
        fields: [{ id: 'waist', label: 'Waist (cm)', type: 'number', placeholder: '80' }, { id: 'hip', label: 'Hip (cm)', type: 'number', placeholder: '100' }, { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] }],
        calculate: (v) => { const waist = parseFloat(v.waist), hip = parseFloat(v.hip); const whr = waist / hip; const risk = v.gender === 'Male' ? (whr > 0.9 ? 'High' : 'Low') : (whr > 0.85 ? 'High' : 'Low'); return { result: whr.toFixed(2), details: `WHR: ${whr.toFixed(2)}<br>Health Risk: ${risk}` }; }
    },
    {
        id: 'ideal-body-weight', name: 'Ideal Body Weight', icon: '⚖️', category: 'Biology & Medical', description: 'Calculate IBW (Devine)',
        fields: [{ id: 'height', label: 'Height (cm)', type: 'number', placeholder: '175' }, { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] }],
        calculate: (v) => { const h = parseFloat(v.height); const base = v.gender === 'Male' ? 50 : 45.5; const ibw = base + 0.91 * (h - 152.4); return { result: ibw.toFixed(1) + ' kg', details: `Ideal Body Weight: ${ibw.toFixed(1)} kg<br>Healthy range: ${(ibw * 0.9).toFixed(0)}-${(ibw * 1.1).toFixed(0)} kg` }; }
    },
    {
        id: 'vision-prescription', name: 'Vision Prescription Helper', icon: '👓', category: 'Biology & Medical', description: 'Interpret prescription',
        fields: [{ id: 'sphere', label: 'Sphere (D)', type: 'number', placeholder: '-2.5' }],
        calculate: (v) => { const sph = parseFloat(v.sphere); let condition = sph < 0 ? 'Myopia (nearsighted)' : sph > 0 ? 'Hyperopia (farsighted)' : 'No correction needed'; let severity = Math.abs(sph) < 3 ? 'Mild' : Math.abs(sph) < 6 ? 'Moderate' : 'High'; return { result: severity + ' ' + condition, details: `Sphere: ${sph} D<br>${severity} ${condition}` }; }
    },
    {
        id: 'hydration-level', name: 'Hydration Level Calculator', icon: '💧', category: 'Biology & Medical', description: 'Check hydration',
        fields: [{ id: 'intake', label: 'Water Intake (L)', type: 'number', placeholder: '2' }, { id: 'weight', label: 'Body Weight (kg)', type: 'number', placeholder: '70' }],
        calculate: (v) => { const intake = parseFloat(v.intake), weight = parseFloat(v.weight); const needed = weight * 0.033; const pct = (intake / needed) * 100; let status = pct >= 100 ? '✅ Well hydrated' : pct >= 75 ? '🟡 Mild dehydration' : '🔴 Dehydrated'; return { result: pct.toFixed(0) + '% of goal', details: `Needed: ${needed.toFixed(1)} L<br>Consumed: ${intake} L<br>${status}` }; }
    },
    {
        id: 'stress-score', name: 'Stress Score Calculator', icon: '😰', category: 'Biology & Medical', description: 'Assess stress level',
        fields: [{ id: 'sleep', label: 'Sleep Quality (1-10)', type: 'number', placeholder: '7' }, { id: 'workload', label: 'Workload Stress (1-10)', type: 'number', placeholder: '6' }, { id: 'exercise', label: 'Exercise (hrs/week)', type: 'number', placeholder: '3' }],
        calculate: (v) => { const sleep = parseFloat(v.sleep), work = parseFloat(v.workload), ex = parseFloat(v.exercise); const score = 50 - (sleep * 3) + (work * 4) - (ex * 2); const level = score < 30 ? 'Low stress' : score < 50 ? 'Moderate stress' : 'High stress'; return { result: Math.max(0, Math.min(100, score)).toFixed(0) + '/100', details: `Stress Score: ${Math.max(0, Math.min(100, score)).toFixed(0)}<br>Level: ${level}` }; }
    },
    {
        id: 'metabolic-age', name: 'Metabolic Age Estimator', icon: '📆', category: 'Biology & Medical', description: 'Estimate metabolic age',
        fields: [{ id: 'age', label: 'Actual Age', type: 'number', placeholder: '35' }, { id: 'bmr', label: 'Your BMR', type: 'number', placeholder: '1500' }, { id: 'avgBmr', label: 'Average BMR for Age', type: 'number', placeholder: '1600' }],
        calculate: (v) => { const age = parseFloat(v.age), bmr = parseFloat(v.bmr), avg = parseFloat(v.avgBmr); const diff = (avg - bmr) / avg * 10; const metAge = age + diff; return { result: metAge.toFixed(0) + ' years', details: `Actual age: ${age}<br>Metabolic age: ~${metAge.toFixed(0)}<br>${metAge < age ? '✅ Below actual age!' : '⚠️ Above actual age'}` }; }
    },
    {
        id: 'vaccination-schedule', name: 'Vaccination Schedule', icon: '💉', category: 'Biology & Medical', description: 'Child vaccination timeline',
        fields: [{ id: 'dob', label: 'Date of Birth', type: 'date' }],
        calculate: (v) => { const dob = new Date(v.dob), today = new Date(); const weeks = Math.floor((today - dob) / (7 * 24 * 60 * 60 * 1000)); let next; if (weeks < 6) next = 'At 6 weeks: DTaP, Polio, Hep B'; else if (weeks < 10) next = 'At 10 weeks: DTaP, Polio'; else if (weeks < 14) next = 'At 14 weeks: DTaP, Polio'; else if (weeks < 36) next = 'At 9 months: Measles, Vitamin A'; else next = 'Consult doctor for booster schedule'; return { result: `Age: ${weeks} weeks`, details: `Current age: ${weeks} weeks<br>Next: ${next}` }; }
    },
    {
        id: 'life-expectancy-bio', name: 'Life Expectancy Estimator', icon: '⏳', category: 'Biology & Medical', description: 'Estimate lifespan',
        fields: [{ id: 'age', label: 'Current Age', type: 'number', placeholder: '40' }, { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] }, { id: 'smoker', label: 'Smoker?', type: 'select', options: ['No', 'Yes'] }, { id: 'exercise', label: 'Regular Exercise?', type: 'select', options: ['Yes', 'No'] }],
        calculate: (v) => { let base = v.gender === 'Male' ? 76 : 82; if (v.smoker === 'Yes') base -= 10; if (v.exercise === 'Yes') base += 5; const remaining = Math.max(0, base - parseFloat(v.age)); return { result: `~${base} years`, details: `Estimated lifespan: ${base} years<br>Remaining: ~${remaining} years` }; }
    },
    {
        id: 'fat-free-mass', name: 'Fat-Free Mass Index', icon: '💪', category: 'Biology & Medical', description: 'Calculate FFMI',
        fields: [{ id: 'lbm', label: 'Lean Body Mass (kg)', type: 'number', placeholder: '60' }, { id: 'height', label: 'Height (m)', type: 'number', placeholder: '1.75' }],
        calculate: (v) => { const lbm = parseFloat(v.lbm), h = parseFloat(v.height); const ffmi = lbm / (h * h); const adjusted = ffmi + 6.1 * (1.8 - h); let rating = ffmi < 18 ? 'Below average' : ffmi < 20 ? 'Average' : ffmi < 23 ? 'Above average' : 'Elite/Steroid range'; return { result: ffmi.toFixed(1) + ' FFMI', details: `FFMI: ${ffmi.toFixed(1)}<br>Normalized: ${adjusted.toFixed(1)}<br>Rating: ${rating}` }; }
    },
    {
        id: 'hearing-loss', name: 'Hearing Loss Calculator', icon: '👂', category: 'Biology & Medical', description: 'Assess hearing level',
        fields: [{ id: 'threshold', label: 'Hearing Threshold (dB)', type: 'number', placeholder: '30' }],
        calculate: (v) => { const db = parseFloat(v.threshold); let level = db <= 20 ? 'Normal' : db <= 40 ? 'Mild loss' : db <= 55 ? 'Moderate loss' : db <= 70 ? 'Moderately severe' : db <= 90 ? 'Severe' : 'Profound'; return { result: level, details: `Threshold: ${db} dB<br>Classification: ${level}` }; }
    },
    {
        id: 'resilience-score', name: 'Resilience Score Calculator', icon: '🧠', category: 'Biology & Medical', description: 'Mental resilience assessment',
        fields: [{ id: 'adapt', label: 'Adaptability (1-10)', type: 'number', placeholder: '7' }, { id: 'social', label: 'Social Support (1-10)', type: 'number', placeholder: '8' }, { id: 'optimism', label: 'Optimism (1-10)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const adapt = parseFloat(v.adapt), social = parseFloat(v.social), opt = parseFloat(v.optimism); const score = (adapt + social + opt) / 3 * 10; const level = score >= 80 ? 'High' : score >= 50 ? 'Moderate' : 'Low'; return { result: score.toFixed(0) + '/100', details: `Resilience Score: ${score.toFixed(0)}/100<br>Level: ${level} resilience` }; }
    },
    {
        id: 'bmi-children', name: 'BMI for Children', icon: '👶', category: 'Biology & Medical', description: 'Pediatric BMI percentile',
        fields: [{ id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '25' }, { id: 'height', label: 'Height (cm)', type: 'number', placeholder: '120' }, { id: 'age', label: 'Age (years)', type: 'number', placeholder: '8' }],
        calculate: (v) => { const w = parseFloat(v.weight), h = parseFloat(v.height) / 100; const bmi = w / (h * h); let category = bmi < 15 ? 'Underweight' : bmi < 18 ? 'Normal' : bmi < 25 ? 'Overweight' : 'Obese'; return { result: bmi.toFixed(1) + ' BMI', details: `BMI: ${bmi.toFixed(1)}<br>Category: ${category}<br>(Consult growth charts for percentile)` }; }
    }
];
if (typeof window !== 'undefined') window.biologyCalculators = biologyCalculators;
