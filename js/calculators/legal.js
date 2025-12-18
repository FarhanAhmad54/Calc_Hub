// Legal & Government Calculators (30)
const legalCalculators = [
    {
        id: 'court-fee', name: 'Court Fee Calculator', icon: '⚖️', category: 'Legal & Government', description: 'Calculate court filing fees',
        fields: [{ id: 'amount', label: 'Claim Amount (₹)', type: 'number', placeholder: '500000' }, { id: 'court', label: 'Court Type', type: 'select', options: ['Civil Court', 'High Court', 'Consumer Forum'] }],
        calculate: (v) => { const amt = parseFloat(v.amount); const rates = { 'Civil Court': 0.075, 'High Court': 0.1, 'Consumer Forum': 0.01 }; const fee = Math.min(amt * rates[v.court], 150000); return { result: '₹' + fee.toFixed(0), details: `${v.court}<br>Court Fee: ₹${fee.toFixed(0)}` }; }
    },
    {
        id: 'stamp-paper', name: 'Stamp Paper Value Calculator', icon: '📜', category: 'Legal & Government', description: 'Required stamp paper value',
        fields: [{ id: 'type', label: 'Document Type', type: 'select', options: ['Affidavit', 'Agreement', 'Power of Attorney', 'Lease Deed', 'Sale Deed'] }],
        calculate: (v) => { const values = { Affidavit: 10, Agreement: 100, 'Power of Attorney': 100, 'Lease Deed': 500, 'Sale Deed': 1000 }; return { result: '₹' + values[v.type], details: `${v.type}<br>Stamp Paper: ₹${values[v.type]}` }; }
    },
    {
        id: 'legal-notice-time', name: 'Legal Notice Time Calculator', icon: '📨', category: 'Legal & Government', description: 'Response time calculation',
        fields: [{ id: 'sentDate', label: 'Notice Sent Date', type: 'date' }, { id: 'period', label: 'Response Period (days)', type: 'number', placeholder: '15' }],
        calculate: (v) => { const sent = new Date(v.sentDate), period = parseFloat(v.period); const due = new Date(sent); due.setDate(due.getDate() + period); const today = new Date(); const remaining = Math.ceil((due - today) / (24 * 60 * 60 * 1000)); return { result: due.toLocaleDateString(), details: `Response due: ${due.toLocaleDateString()}<br>${remaining > 0 ? remaining + ' days remaining' : 'Deadline passed'}` }; }
    },
    {
        id: 'notice-period-legal', name: 'Notice Period Calculator', icon: '📋', category: 'Legal & Government', description: 'Employment notice period',
        fields: [{ id: 'startDate', label: 'Notice Start Date', type: 'date' }, { id: 'days', label: 'Notice Period (days)', type: 'number', placeholder: '30' }],
        calculate: (v) => { const start = new Date(v.startDate), days = parseFloat(v.days); const end = new Date(start); end.setDate(end.getDate() + days); return { result: end.toLocaleDateString(), details: `Last working day: ${end.toLocaleDateString()}` }; }
    },
    {
        id: 'limitation-period', name: 'Limitation Period Calculator', icon: '⏳', category: 'Legal & Government', description: 'Case filing deadline',
        fields: [{ id: 'cause', label: 'Date of Cause', type: 'date' }, { id: 'type', label: 'Case Type', type: 'select', options: ['Civil Suit (3 years)', 'Criminal (3 years)', 'Consumer (2 years)', 'Cheque Bounce (1 year)'] }],
        calculate: (v) => { const cause = new Date(v.cause); const years = parseFloat(v.type.match(/\d+/)[0]); const limit = new Date(cause); limit.setFullYear(limit.getFullYear() + years); const today = new Date(); const remaining = Math.ceil((limit - today) / (24 * 60 * 60 * 1000)); return { result: limit.toLocaleDateString(), details: `Filing deadline: ${limit.toLocaleDateString()}<br>${remaining > 0 ? remaining + ' days left' : '⚠️ Limitation expired'}` }; }
    },
    {
        id: 'case-duration', name: 'Case Duration Estimator', icon: '📅', category: 'Legal & Government', description: 'Estimate case duration',
        fields: [{ id: 'type', label: 'Case Type', type: 'select', options: ['Civil', 'Criminal', 'Consumer', 'Family', 'Labour'] }, { id: 'court', label: 'Court Level', type: 'select', options: ['Lower Court', 'District Court', 'High Court', 'Supreme Court'] }],
        calculate: (v) => { const base = { Civil: 3, Criminal: 2, Consumer: 1, Family: 2, Labour: 1.5 }; const mult = { 'Lower Court': 1, 'District Court': 1.5, 'High Court': 2, 'Supreme Court': 3 }; const years = base[v.type] * mult[v.court]; return { result: years.toFixed(1) + ' years (avg)', details: `Estimated duration: ${years.toFixed(1)} years<br>This is an average estimate` }; }
    },
    {
        id: 'compensation', name: 'Compensation Calculator', icon: '💰', category: 'Legal & Government', description: 'Calculate compensation',
        fields: [{ id: 'salary', label: 'Monthly Salary (₹)', type: 'number', placeholder: '50000' }, { id: 'years', label: 'Years of Service', type: 'number', placeholder: '10' }, { id: 'type', label: 'Termination Type', type: 'select', options: ['Voluntary', 'Retrenchment', 'Wrongful'] }],
        calculate: (v) => { const sal = parseFloat(v.salary), yrs = parseFloat(v.years); const mult = { Voluntary: 0, Retrenchment: 15, Wrongful: 30 }; const comp = sal * yrs * mult[v.type] / 26; return { result: '₹' + comp.toLocaleString(), details: `${v.type} compensation<br>Amount: ₹${comp.toLocaleString()}` }; }
    },
    {
        id: 'accident-claim', name: 'Accident Claim Calculator', icon: '🚗', category: 'Legal & Government', description: 'Motor accident claim',
        fields: [{ id: 'income', label: 'Annual Income (₹)', type: 'number', placeholder: '600000' }, { id: 'age', label: 'Age of Victim', type: 'number', placeholder: '35' }, { id: 'disability', label: 'Disability %', type: 'number', placeholder: '50' }],
        calculate: (v) => { const income = parseFloat(v.income), age = parseFloat(v.age), disability = parseFloat(v.disability); const multiplier = age <= 35 ? 16 : age <= 40 ? 15 : age <= 50 ? 12 : 8; const claim = income * disability / 100 * multiplier; return { result: '₹' + (claim / 100000).toFixed(1) + ' Lakh', details: `Multiplier: ${multiplier}<br>Estimated claim: ₹${claim.toLocaleString()}` }; }
    },
    {
        id: 'interest-compensation', name: 'Interest on Compensation', icon: '📈', category: 'Legal & Government', description: 'Calculate interest',
        fields: [{ id: 'principal', label: 'Compensation (₹)', type: 'number', placeholder: '1000000' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '9' }, { id: 'years', label: 'Years Delayed', type: 'number', placeholder: '3' }],
        calculate: (v) => { const P = parseFloat(v.principal), r = parseFloat(v.rate), t = parseFloat(v.years); const interest = P * r * t / 100; const total = P + interest; return { result: '₹' + interest.toLocaleString(), details: `Interest: ₹${interest.toLocaleString()}<br>Total: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'penalty-amount', name: 'Penalty Amount Calculator', icon: '⚠️', category: 'Legal & Government', description: 'Calculate penalties',
        fields: [{ id: 'amount', label: 'Original Amount (₹)', type: 'number', placeholder: '100000' }, { id: 'rate', label: 'Penalty Rate (%)', type: 'number', placeholder: '1' }, { id: 'months', label: 'Months Delayed', type: 'number', placeholder: '6' }],
        calculate: (v) => { const amt = parseFloat(v.amount), rate = parseFloat(v.rate), months = parseFloat(v.months); const penalty = amt * rate * months / 100; const total = amt + penalty; return { result: '₹' + penalty.toLocaleString(), details: `Penalty: ₹${penalty.toLocaleString()}<br>Total due: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'fine-calculator', name: 'Fine Calculation Tool', icon: '💸', category: 'Legal & Government', description: 'Traffic/legal fines',
        fields: [{ id: 'type', label: 'Violation Type', type: 'select', options: ['Traffic Signal', 'No License', 'Drunk Driving', 'Overspeeding', 'No Insurance'] }],
        calculate: (v) => { const fines = { 'Traffic Signal': 5000, 'No License': 5000, 'Drunk Driving': 10000, 'Overspeeding': 2000, 'No Insurance': 2000 }; return { result: '₹' + fines[v.type].toLocaleString(), details: `Violation: ${v.type}<br>Fine: ₹${fines[v.type].toLocaleString()}` }; }
    },
    {
        id: 'legal-cost', name: 'Legal Cost Estimator', icon: '📊', category: 'Legal & Government', description: 'Estimate legal expenses',
        fields: [{ id: 'case', label: 'Case Type', type: 'select', options: ['Civil', 'Criminal', 'Consumer', 'Divorce', 'Property'] }, { id: 'complexity', label: 'Complexity', type: 'select', options: ['Simple', 'Moderate', 'Complex'] }],
        calculate: (v) => { const base = { Civil: 50000, Criminal: 75000, Consumer: 25000, Divorce: 60000, Property: 80000 }; const mult = { Simple: 1, Moderate: 2, Complex: 4 }; const cost = base[v.case] * mult[v.complexity]; return { result: '₹' + cost.toLocaleString() + '+', details: `Estimated legal fees<br>₹${cost.toLocaleString()} onwards` }; }
    },
    {
        id: 'stamp-duty-legal', name: 'Stamp Duty (State-wise)', icon: '🏛️', category: 'Legal & Government', description: 'State stamp duty rates',
        fields: [{ id: 'value', label: 'Property Value (₹)', type: 'number', placeholder: '5000000' }, { id: 'state', label: 'State', type: 'select', options: ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'UP', 'Gujarat'] }],
        calculate: (v) => { const value = parseFloat(v.value); const rates = { Maharashtra: 5, Karnataka: 5.6, Delhi: 6, 'Tamil Nadu': 7, UP: 7, Gujarat: 4.9 }; const duty = value * rates[v.state] / 100; return { result: '₹' + duty.toLocaleString(), details: `${v.state}: ${rates[v.state]}%<br>Stamp Duty: ₹${duty.toLocaleString()}` }; }
    },
    {
        id: 'legal-interest', name: 'Legal Interest Calculator', icon: '📈', category: 'Legal & Government', description: 'Court-approved interest',
        fields: [{ id: 'principal', label: 'Principal (₹)', type: 'number', placeholder: '500000' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '12' }, { id: 'fromDate', label: 'From Date', type: 'date' }, { id: 'toDate', label: 'To Date', type: 'date' }],
        calculate: (v) => { const P = parseFloat(v.principal), r = parseFloat(v.rate); const from = new Date(v.fromDate), to = new Date(v.toDate); const days = (to - from) / (24 * 60 * 60 * 1000); const interest = P * r * days / 365 / 100; return { result: '₹' + interest.toFixed(0).toLocaleString(), details: `Days: ${Math.floor(days)}<br>Interest: ₹${interest.toFixed(0).toLocaleString()}<br>Total: ₹${(P + interest).toFixed(0).toLocaleString()}` }; }
    },
    {
        id: 'age-eligibility', name: 'Age Eligibility for Schemes', icon: '📋', category: 'Legal & Government', description: 'Check scheme eligibility',
        fields: [{ id: 'dob', label: 'Date of Birth', type: 'date' }, { id: 'scheme', label: 'Scheme', type: 'select', options: ['Senior Citizen (60+)', 'Youth Scheme (18-35)', 'Pension (58+)', 'Voting (18+)'] }],
        calculate: (v) => { const dob = new Date(v.dob), today = new Date(); let age = today.getFullYear() - dob.getFullYear(); const ranges = { 'Senior Citizen (60+)': [60, 120], 'Youth Scheme (18-35)': [18, 35], 'Pension (58+)': [58, 120], 'Voting (18+)': [18, 120] }; const [min, max] = ranges[v.scheme]; const eligible = age >= min && age <= max; return { result: eligible ? '✅ Eligible' : '❌ Not Eligible', details: `Age: ${age} years<br>Required: ${min}-${max} years<br>${eligible ? 'You qualify!' : 'Does not meet age criteria'}` }; }
    },
    {
        id: 'pension-eligibility', name: 'Pension Eligibility Calculator', icon: '👴', category: 'Legal & Government', description: 'Check pension eligibility',
        fields: [{ id: 'dob', label: 'Date of Birth', type: 'date' }, { id: 'service', label: 'Years of Service', type: 'number', placeholder: '25' }],
        calculate: (v) => { const dob = new Date(v.dob), today = new Date(), service = parseFloat(v.service); let age = today.getFullYear() - dob.getFullYear(); const eligible = age >= 58 && service >= 10; return { result: eligible ? '✅ Eligible' : '❌ Not Yet', details: `Age: ${age} years<br>Service: ${service} years<br>${eligible ? 'Pension eligible!' : 'Requires age ≥58 and service ≥10 years'}` }; }
    },
    {
        id: 'gratuity-eligibility', name: 'Gratuity Eligibility', icon: '💰', category: 'Legal & Government', description: 'Check gratuity eligibility',
        fields: [{ id: 'service', label: 'Years of Service', type: 'number', placeholder: '6' }, { id: 'salary', label: 'Last Drawn Salary (₹)', type: 'number', placeholder: '50000' }],
        calculate: (v) => { const service = parseFloat(v.service), salary = parseFloat(v.salary); const eligible = service >= 5; const gratuity = eligible ? salary * 15 * service / 26 : 0; return { result: eligible ? '₹' + gratuity.toLocaleString() : '❌ Not Eligible', details: `Service: ${service} years<br>${eligible ? `Gratuity: ₹${gratuity.toLocaleString()}` : 'Minimum 5 years required'}` }; }
    },
    {
        id: 'pf-calculator', name: 'Provident Fund Calculator', icon: '🏦', category: 'Legal & Government', description: 'Calculate PF accumulation',
        fields: [{ id: 'basic', label: 'Basic Salary (₹)', type: 'number', placeholder: '30000' }, { id: 'years', label: 'Years', type: 'number', placeholder: '10' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '8.15' }],
        calculate: (v) => { const basic = parseFloat(v.basic), years = parseFloat(v.years), rate = parseFloat(v.rate) / 100; const monthly = basic * 0.24; let total = 0; for (let i = 0; i < years * 12; i++) { total = (total + monthly) * (1 + rate / 12); } return { result: '₹' + (total / 100000).toFixed(1) + ' Lakh', details: `Monthly contribution: ₹${monthly.toFixed(0)}<br>After ${years} years: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'subsidy-calc', name: 'Government Subsidy Calculator', icon: '🎫', category: 'Legal & Government', description: 'Estimate subsidy amount',
        fields: [{ id: 'income', label: 'Annual Income (₹)', type: 'number', placeholder: '300000' }, { id: 'scheme', label: 'Scheme Type', type: 'select', options: ['LPG Subsidy', 'Housing Subsidy', 'Farmer Subsidy'] }],
        calculate: (v) => { const income = parseFloat(v.income); let subsidy = 0; const eligible = income < 500000; if (v.scheme === 'LPG Subsidy') subsidy = eligible ? 200 * 12 : 0; else if (v.scheme === 'Housing Subsidy') subsidy = eligible ? 250000 : 0; else subsidy = eligible ? 6000 : 0; return { result: eligible ? '₹' + subsidy.toLocaleString() : '❌ Not Eligible', details: `Income: ₹${income.toLocaleString()}<br>${eligible ? `Subsidy: ₹${subsidy.toLocaleString()}` : 'Income above limit'}` }; }
    },
    {
        id: 'welfare-eligibility', name: 'Welfare Scheme Eligibility', icon: '📄', category: 'Legal & Government', description: 'Check scheme eligibility',
        fields: [{ id: 'income', label: 'Annual Income (₹)', type: 'number', placeholder: '200000' }, { id: 'category', label: 'Category', type: 'select', options: ['BPL', 'APL', 'General'] }],
        calculate: (v) => { const income = parseFloat(v.income); let eligible = []; if (v.category === 'BPL' || income < 100000) eligible.push('Ration Card (BPL)', 'Ayushman Bharat', 'PM Kisan'); if (income < 300000) eligible.push('Subsidized Housing', 'Education Loan Subsidy'); return { result: eligible.length > 0 ? '✅ ' + eligible.length + ' Schemes' : '❌ Check criteria', details: `Eligible for:<br>${eligible.join('<br>') || 'No schemes matched'}` }; }
    },
    {
        id: 'court-date-diff', name: 'Court Date Difference', icon: '📅', category: 'Legal & Government', description: 'Days between hearings',
        fields: [{ id: 'date1', label: 'Last Hearing', type: 'date' }, { id: 'date2', label: 'Next Hearing', type: 'date' }],
        calculate: (v) => { const d1 = new Date(v.date1), d2 = new Date(v.date2); const days = Math.ceil((d2 - d1) / (24 * 60 * 60 * 1000)); const weeks = Math.floor(days / 7); return { result: days + ' days', details: `Gap: ${days} days (${weeks} weeks ${days % 7} days)` }; }
    },
    {
        id: 'rti-response', name: 'RTI Response Time', icon: '📝', category: 'Legal & Government', description: 'RTI response deadline',
        fields: [{ id: 'filedDate', label: 'RTI Filed Date', type: 'date' }, { id: 'type', label: 'Information Type', type: 'select', options: ['Normal (30 days)', 'Life/Liberty (48 hours)'] }],
        calculate: (v) => { const filed = new Date(v.filedDate); const days = v.type.includes('30') ? 30 : 2; const due = new Date(filed); due.setDate(due.getDate() + days); const today = new Date(); const remaining = Math.ceil((due - today) / (24 * 60 * 60 * 1000)); return { result: due.toLocaleDateString(), details: `Response due: ${due.toLocaleDateString()}<br>${remaining > 0 ? remaining + ' days left' : 'Deadline passed - file appeal'}` }; }
    },
    {
        id: 'retirement-benefit', name: 'Retirement Benefit Calculator', icon: '🎯', category: 'Legal & Government', description: 'Calculate total benefits',
        fields: [{ id: 'basic', label: 'Last Basic (₹)', type: 'number', placeholder: '50000' }, { id: 'service', label: 'Years of Service', type: 'number', placeholder: '25' }],
        calculate: (v) => { const basic = parseFloat(v.basic), service = parseFloat(v.service); const gratuity = basic * 15 * Math.min(service, 33) / 26; const pension = basic * 0.5 * Math.min(service / 33, 1); return { result: '₹' + (gratuity / 100000).toFixed(1) + ' L gratuity', details: `Gratuity: ₹${gratuity.toLocaleString()}<br>Monthly Pension: ₹${pension.toFixed(0)}` }; }
    },
    {
        id: 'service-bond', name: 'Service Bond Penalty', icon: '📋', category: 'Legal & Government', description: 'Bond breach penalty',
        fields: [{ id: 'amount', label: 'Bond Amount (₹)', type: 'number', placeholder: '500000' }, { id: 'total', label: 'Bond Period (months)', type: 'number', placeholder: '24' }, { id: 'served', label: 'Months Served', type: 'number', placeholder: '12' }],
        calculate: (v) => { const amount = parseFloat(v.amount), total = parseFloat(v.total), served = parseFloat(v.served); const remaining = total - served; const penalty = amount * remaining / total; return { result: '₹' + penalty.toLocaleString(), details: `Remaining: ${remaining} months<br>Penalty: ₹${penalty.toLocaleString()} (pro-rata)` }; }
    },
    {
        id: 'license-expiry', name: 'License Expiry Calculator', icon: '📄', category: 'Legal & Government', description: 'Check license validity',
        fields: [{ id: 'issueDate', label: 'Issue Date', type: 'date' }, { id: 'validity', label: 'Validity (years)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const issue = new Date(v.issueDate), validity = parseFloat(v.validity); const expiry = new Date(issue); expiry.setFullYear(expiry.getFullYear() + validity); const today = new Date(); const remaining = Math.ceil((expiry - today) / (24 * 60 * 60 * 1000)); return { result: expiry.toLocaleDateString(), details: `Expires: ${expiry.toLocaleDateString()}<br>${remaining > 0 ? remaining + ' days remaining' : '⚠️ Expired - Renew now!'}` }; }
    },
    {
        id: 'doc-validity', name: 'Legal Document Validity', icon: '📜', category: 'Legal & Government', description: 'Document validity period',
        fields: [{ id: 'type', label: 'Document Type', type: 'select', options: ['Passport (10 yrs)', 'PAN Card (Lifetime)', 'Driving License (20 yrs)', 'Aadhaar (Lifetime)', 'Voter ID (Lifetime)'] }],
        calculate: (v) => { const validity = { 'Passport (10 yrs)': '10 years', 'PAN Card (Lifetime)': 'Lifetime', 'Driving License (20 yrs)': '20 years', 'Aadhaar (Lifetime)': 'Lifetime', 'Voter ID (Lifetime)': 'Lifetime' }; return { result: validity[v.type], details: `${v.type.split('(')[0].trim()}<br>Validity: ${validity[v.type]}` }; }
    },
    {
        id: 'bail-eligibility', name: 'Bail Eligibility Calculator', icon: '⚖️', category: 'Legal & Government', description: 'Check bail possibility',
        fields: [{ id: 'offense', label: 'Offense Type', type: 'select', options: ['Bailable', 'Non-Bailable (Minor)', 'Non-Bailable (Serious)'] }, { id: 'detention', label: 'Days in Detention', type: 'number', placeholder: '30' }],
        calculate: (v) => { const offense = v.offense, days = parseFloat(v.detention); let eligible = offense === 'Bailable'; if (offense.includes('Minor') && days > 30) eligible = true; if (offense.includes('Serious') && days > 90) eligible = true; return { result: eligible ? '✅ Likely Eligible' : '⚠️ Consult Lawyer', details: `Offense: ${offense}<br>Detention: ${days} days<br>${eligible ? 'Bail application possible' : 'Complex case - legal advice needed'}` }; }
    },
    {
        id: 'fir-time', name: 'FIR Filing Time', icon: '🚔', category: 'Legal & Government', description: 'FIR delay analysis',
        fields: [{ id: 'incident', label: 'Incident Date', type: 'date' }, { id: 'fir', label: 'FIR Filed Date', type: 'date' }],
        calculate: (v) => { const incident = new Date(v.incident), fir = new Date(v.fir); const delay = Math.ceil((fir - incident) / (24 * 60 * 60 * 1000)); let status = delay <= 1 ? 'Immediate' : delay <= 7 ? 'Normal' : delay <= 30 ? 'Delayed' : 'Significantly Delayed'; return { result: delay + ' days delay', details: `Delay: ${delay} days<br>Status: ${status}<br>${delay > 7 ? 'Delay explanation needed' : ''}` }; }
    },
    {
        id: 'legal-compliance', name: 'Legal Compliance Checklist', icon: '✅', category: 'Legal & Government', description: 'Business compliance score',
        fields: [{ id: 'gst', label: 'GST Registration', type: 'select', options: ['Yes', 'No'] }, { id: 'pan', label: 'PAN/TAN', type: 'select', options: ['Yes', 'No'] }, { id: 'shop', label: 'Shop License', type: 'select', options: ['Yes', 'No'] }, { id: 'fire', label: 'Fire Safety', type: 'select', options: ['Yes', 'No'] }],
        calculate: (v) => { const items = [v.gst, v.pan, v.shop, v.fire]; const done = items.filter(i => i === 'Yes').length; const score = (done / items.length) * 100; return { result: score.toFixed(0) + '% Compliant', details: `Completed: ${done}/4<br>Compliance Score: ${score.toFixed(0)}%<br>${score < 100 ? '⚠️ Complete pending items' : '✅ Fully compliant'}` }; }
    }
];
if (typeof window !== 'undefined') window.legalCalculators = legalCalculators;
