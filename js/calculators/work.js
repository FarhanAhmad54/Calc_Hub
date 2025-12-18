// Work, Office & Productivity Calculators (156-180)
const workCalculators = [
    {
        id: 'working-hours', name: 'Working Hours Calculator', icon: '⏰', category: 'Work & Productivity', description: 'Calculate total working hours',
        fields: [{ id: 'start', label: 'Start Time', type: 'time' }, { id: 'end', label: 'End Time', type: 'time' }, { id: 'break', label: 'Break (minutes)', type: 'number', placeholder: '60' }],
        calculate: (v) => { const [sh, sm] = v.start.split(':').map(Number), [eh, em] = v.end.split(':').map(Number); let mins = (eh * 60 + em) - (sh * 60 + sm) - parseInt(v.break); const hrs = Math.floor(mins / 60), min = mins % 60; return { result: `${hrs}h ${min}m`, details: `Start: ${v.start}<br>End: ${v.end}<br>Break: ${v.break}m<br>Net Hours: ${hrs}h ${min}m` }; }
    },
    {
        id: 'overtime', name: 'Overtime Calculator', icon: '💰', category: 'Work & Productivity', description: 'Calculate overtime pay',
        fields: [{ id: 'hours', label: 'Overtime Hours', type: 'number', placeholder: '10' }, { id: 'rate', label: 'Hourly Rate (₹)', type: 'number', placeholder: '200' }, { id: 'multiplier', label: 'OT Multiplier', type: 'select', options: ['1.5x', '2x', '2.5x'] }],
        calculate: (v) => { const hrs = parseFloat(v.hours), rate = parseFloat(v.rate); const mult = parseFloat(v.multiplier); const pay = hrs * rate * mult; return { result: '₹' + pay.toFixed(0), details: `${hrs} hrs × ₹${rate} × ${v.multiplier} = ₹${pay.toFixed(0)}` }; }
    },
    {
        id: 'leave-balance', name: 'Leave Balance Calculator', icon: '🏖️', category: 'Work & Productivity', description: 'Calculate remaining leaves',
        fields: [{ id: 'total', label: 'Total Annual Leaves', type: 'number', placeholder: '24' }, { id: 'used', label: 'Leaves Used', type: 'number', placeholder: '10' }, { id: 'pending', label: 'Pending Approval', type: 'number', placeholder: '2' }],
        calculate: (v) => { const total = parseInt(v.total), used = parseInt(v.used), pending = parseInt(v.pending); const balance = total - used - pending; return { result: balance + ' days', details: `Total: ${total}<br>Used: ${used}<br>Pending: ${pending}<br>Balance: ${balance}` }; }
    },
    {
        id: 'shift-hours', name: 'Shift Hours Calculator', icon: '🔄', category: 'Work & Productivity', description: 'Calculate shift duration',
        fields: [{ id: 'start', label: 'Shift Start', type: 'time' }, { id: 'end', label: 'Shift End', type: 'time' }, { id: 'night', label: 'Night Shift?', type: 'select', options: ['No', 'Yes'] }],
        calculate: (v) => { let [sh, sm] = v.start.split(':').map(Number), [eh, em] = v.end.split(':').map(Number); let mins = (eh * 60 + em) - (sh * 60 + sm); if (v.night === 'Yes' && mins < 0) mins += 24 * 60; const hrs = Math.floor(mins / 60), min = mins % 60; return { result: `${hrs}h ${min}m`, details: `Shift Duration: ${hrs} hours ${min} minutes` }; }
    },
    {
        id: 'timesheet', name: 'Timesheet Calculator', icon: '📋', category: 'Work & Productivity', description: 'Calculate weekly hours',
        fields: [{ id: 'mon', label: 'Monday', type: 'number', placeholder: '8' }, { id: 'tue', label: 'Tuesday', type: 'number', placeholder: '8' }, { id: 'wed', label: 'Wednesday', type: 'number', placeholder: '8' }, { id: 'thu', label: 'Thursday', type: 'number', placeholder: '8' }, { id: 'fri', label: 'Friday', type: 'number', placeholder: '8' }],
        calculate: (v) => { const days = [v.mon, v.tue, v.wed, v.thu, v.fri].map(d => parseFloat(d) || 0); const total = days.reduce((a, b) => a + b, 0); const avg = total / 5; return { result: total + ' hours', details: `Mon-Fri: ${days.join(', ')}<br>Total: ${total}h<br>Average: ${avg.toFixed(1)}h/day` }; }
    },
    {
        id: 'productivity', name: 'Productivity Score Calculator', icon: '📊', category: 'Work & Productivity', description: 'Calculate productivity %',
        fields: [{ id: 'completed', label: 'Tasks Completed', type: 'number', placeholder: '15' }, { id: 'assigned', label: 'Tasks Assigned', type: 'number', placeholder: '20' }],
        calculate: (v) => { const comp = parseInt(v.completed), total = parseInt(v.assigned); const pct = (comp / total) * 100; return { result: pct.toFixed(1) + '%', details: `Completed: ${comp}/${total}<br>Productivity: ${pct.toFixed(1)}%` }; }
    },
    {
        id: 'task-time', name: 'Task Time Estimator', icon: '⏱️', category: 'Work & Productivity', description: 'Estimate task completion time',
        fields: [{ id: 'tasks', label: 'Number of Tasks', type: 'number', placeholder: '10' }, { id: 'avgTime', label: 'Avg Time per Task (min)', type: 'number', placeholder: '30' }, { id: 'buffer', label: 'Buffer %', type: 'number', placeholder: '20' }],
        calculate: (v) => { const tasks = parseInt(v.tasks), avg = parseInt(v.avgTime), buffer = parseInt(v.buffer); const total = tasks * avg * (1 + buffer / 100); const hrs = Math.floor(total / 60), mins = Math.round(total % 60); return { result: `${hrs}h ${mins}m`, details: `Tasks: ${tasks}<br>Base Time: ${tasks * avg}m<br>With ${buffer}% buffer: ${total.toFixed(0)}m` }; }
    },
    {
        id: 'deadline', name: 'Deadline Calculator', icon: '📅', category: 'Work & Productivity', description: 'Calculate deadline from workdays',
        fields: [{ id: 'start', label: 'Start Date', type: 'date' }, { id: 'days', label: 'Working Days Needed', type: 'number', placeholder: '10' }],
        calculate: (v) => { const start = new Date(v.start); let days = parseInt(v.days), current = new Date(start); while (days > 0) { current.setDate(current.getDate() + 1); if (current.getDay() !== 0 && current.getDay() !== 6) days--; } return { result: current.toLocaleDateString(), details: `Start: ${start.toLocaleDateString()}<br>Working Days: ${v.days}<br>Deadline: ${current.toLocaleDateString()}` }; }
    },
    {
        id: 'meeting-overlap', name: 'Meeting Time Overlap', icon: '🕐', category: 'Work & Productivity', description: 'Find overlapping meeting time',
        fields: [{ id: 'tz1', label: 'Your Timezone (UTC+)', type: 'number', placeholder: '5.5' }, { id: 'tz2', label: 'Their Timezone (UTC+)', type: 'number', placeholder: '-5' }, { id: 'workStart', label: 'Work Start (9-17)', type: 'number', placeholder: '9' }],
        calculate: (v) => { const diff = parseFloat(v.tz1) - parseFloat(v.tz2); const theirStart = 9 + diff, theirEnd = 17 + diff; const overlapStart = Math.max(9, theirStart), overlapEnd = Math.min(17, theirEnd); if (overlapStart >= overlapEnd) return { result: 'No overlap', details: 'No common working hours found' }; return { result: `${overlapStart}:00 - ${overlapEnd}:00`, details: `Overlap: ${overlapStart}:00 - ${overlapEnd}:00 (your time)<br>Time difference: ${Math.abs(diff)} hours` }; }
    },
    {
        id: 'freelance-rate', name: 'Freelance Hourly Rate', icon: '💵', category: 'Work & Productivity', description: 'Calculate freelance rate',
        fields: [{ id: 'annual', label: 'Desired Annual Income (₹)', type: 'number', placeholder: '1200000' }, { id: 'weeks', label: 'Working Weeks/Year', type: 'number', placeholder: '48' }, { id: 'hours', label: 'Hours/Week', type: 'number', placeholder: '40' }],
        calculate: (v) => { const annual = parseFloat(v.annual), weeks = parseInt(v.weeks), hrs = parseInt(v.hours); const hourly = annual / (weeks * hrs); return { result: '₹' + hourly.toFixed(0) + '/hour', details: `Annual Goal: ₹${annual.toLocaleString()}<br>Work: ${weeks} weeks × ${hrs} hrs<br>Hourly Rate: ₹${hourly.toFixed(0)}` }; }
    },
    {
        id: 'project-cost', name: 'Project Cost Estimator', icon: '💰', category: 'Work & Productivity', description: 'Estimate project cost',
        fields: [{ id: 'hours', label: 'Estimated Hours', type: 'number', placeholder: '100' }, { id: 'rate', label: 'Hourly Rate (₹)', type: 'number', placeholder: '1000' }, { id: 'expenses', label: 'Additional Expenses (₹)', type: 'number', placeholder: '5000' }],
        calculate: (v) => { const hrs = parseInt(v.hours), rate = parseInt(v.rate), exp = parseInt(v.expenses); const labor = hrs * rate, total = labor + exp; return { result: '₹' + total.toLocaleString(), details: `Labor: ${hrs}h × ₹${rate} = ₹${labor.toLocaleString()}<br>Expenses: ₹${exp.toLocaleString()}<br>Total: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'invoice', name: 'Invoice Total Calculator', icon: '🧾', category: 'Work & Productivity', description: 'Calculate invoice total',
        fields: [{ id: 'subtotal', label: 'Subtotal (₹)', type: 'number', placeholder: '50000' }, { id: 'tax', label: 'Tax %', type: 'number', placeholder: '18' }, { id: 'discount', label: 'Discount %', type: 'number', placeholder: '5' }],
        calculate: (v) => { const sub = parseFloat(v.subtotal), tax = parseFloat(v.tax), disc = parseFloat(v.discount); const discAmt = sub * disc / 100, afterDisc = sub - discAmt; const taxAmt = afterDisc * tax / 100, total = afterDisc + taxAmt; return { result: '₹' + total.toFixed(0), details: `Subtotal: ₹${sub}<br>Discount: -₹${discAmt.toFixed(0)}<br>Tax: +₹${taxAmt.toFixed(0)}<br>Total: ₹${total.toFixed(0)}` }; }
    },
    {
        id: 'commission', name: 'Commission Calculator', icon: '💵', category: 'Work & Productivity', description: 'Calculate sales commission',
        fields: [{ id: 'sales', label: 'Total Sales (₹)', type: 'number', placeholder: '1000000' }, { id: 'rate', label: 'Commission Rate (%)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const sales = parseFloat(v.sales), rate = parseFloat(v.rate); const comm = sales * rate / 100; return { result: '₹' + comm.toLocaleString(), details: `Sales: ₹${sales.toLocaleString()}<br>Rate: ${rate}%<br>Commission: ₹${comm.toLocaleString()}` }; }
    },
    {
        id: 'bonus', name: 'Bonus Calculator', icon: '🎁', category: 'Work & Productivity', description: 'Calculate performance bonus',
        fields: [{ id: 'salary', label: 'Monthly Salary (₹)', type: 'number', placeholder: '50000' }, { id: 'months', label: 'Bonus Months', type: 'number', placeholder: '2' }, { id: 'performance', label: 'Performance Multiplier', type: 'select', options: ['0.5x', '1x', '1.5x', '2x'] }],
        calculate: (v) => { const sal = parseFloat(v.salary), months = parseFloat(v.months), mult = parseFloat(v.performance); const bonus = sal * months * mult; return { result: '₹' + bonus.toLocaleString(), details: `Base: ₹${sal} × ${months} months<br>Performance: ${v.performance}<br>Bonus: ₹${bonus.toLocaleString()}` }; }
    },
    {
        id: 'notice-period', name: 'Notice Period Calculator', icon: '📋', category: 'Work & Productivity', description: 'Calculate last working day',
        fields: [{ id: 'resignation', label: 'Resignation Date', type: 'date' }, { id: 'days', label: 'Notice Period (days)', type: 'number', placeholder: '30' }],
        calculate: (v) => { const resign = new Date(v.resignation), days = parseInt(v.days); const lwd = new Date(resign); lwd.setDate(lwd.getDate() + days); return { result: lwd.toLocaleDateString(), details: `Resignation: ${resign.toLocaleDateString()}<br>Notice: ${days} days<br>Last Working Day: ${lwd.toLocaleDateString()}` }; }
    },
    {
        id: 'experience', name: 'Experience Calculator', icon: '📊', category: 'Work & Productivity', description: 'Calculate total experience',
        fields: [{ id: 'start', label: 'Start Date', type: 'date' }, { id: 'end', label: 'End Date (or today)', type: 'date' }],
        calculate: (v) => { const start = new Date(v.start), end = new Date(v.end); const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()); const yrs = Math.floor(months / 12), mon = months % 12; return { result: `${yrs} years ${mon} months`, details: `From: ${start.toLocaleDateString()}<br>To: ${end.toLocaleDateString()}<br>Experience: ${yrs}y ${mon}m` }; }
    },
    {
        id: 'years-service', name: 'Years of Service', icon: '🏆', category: 'Work & Productivity', description: 'Calculate service tenure',
        fields: [{ id: 'joining', label: 'Joining Date', type: 'date' }],
        calculate: (v) => { const join = new Date(v.joining), today = new Date(); const months = (today.getFullYear() - join.getFullYear()) * 12 + (today.getMonth() - join.getMonth()); const yrs = Math.floor(months / 12), mon = months % 12; return { result: `${yrs} years ${mon} months`, details: `Joined: ${join.toLocaleDateString()}<br>Tenure: ${yrs} years ${mon} months` }; }
    },
    {
        id: 'resignation-date', name: 'Resignation Date Calculator', icon: '📅', category: 'Work & Productivity', description: 'When to resign for target LWD',
        fields: [{ id: 'target', label: 'Target Last Working Day', type: 'date' }, { id: 'notice', label: 'Notice Period (days)', type: 'number', placeholder: '60' }],
        calculate: (v) => { const target = new Date(v.target), notice = parseInt(v.notice); const resign = new Date(target); resign.setDate(resign.getDate() - notice); return { result: resign.toLocaleDateString(), details: `Target LWD: ${target.toLocaleDateString()}<br>Notice: ${notice} days<br>Resign by: ${resign.toLocaleDateString()}` }; }
    },
    {
        id: 'appraisal-hike', name: 'Appraisal Hike Calculator', icon: '📈', category: 'Work & Productivity', description: 'Calculate salary after hike',
        fields: [{ id: 'current', label: 'Current Salary (₹)', type: 'number', placeholder: '50000' }, { id: 'hike', label: 'Hike Percentage', type: 'number', placeholder: '15' }],
        calculate: (v) => { const curr = parseFloat(v.current), hike = parseFloat(v.hike); const increase = curr * hike / 100, newSal = curr + increase; return { result: '₹' + newSal.toLocaleString(), details: `Current: ₹${curr.toLocaleString()}<br>Hike: ${hike}% (+₹${increase.toLocaleString()})<br>New Salary: ₹${newSal.toLocaleString()}` }; }
    },
    {
        id: 'promotion', name: 'Promotion Eligibility', icon: '🎯', category: 'Work & Productivity', description: 'Check promotion eligibility',
        fields: [{ id: 'tenure', label: 'Years in Current Role', type: 'number', placeholder: '3' }, { id: 'rating', label: 'Last Rating (1-5)', type: 'number', placeholder: '4' }, { id: 'required', label: 'Required Years', type: 'number', placeholder: '2' }],
        calculate: (v) => { const tenure = parseFloat(v.tenure), rating = parseFloat(v.rating), req = parseFloat(v.required); const eligible = tenure >= req && rating >= 4; return { result: eligible ? '✅ Eligible' : '❌ Not Yet', details: `Tenure: ${tenure} years (need ${req})<br>Rating: ${rating}/5 (need 4+)<br>Status: ${eligible ? 'Eligible!' : 'Keep going!'}` }; }
    },
    {
        id: 'workdays', name: 'Workdays Calculator', icon: '📅', category: 'Work & Productivity', description: 'Count workdays between dates',
        fields: [{ id: 'start', label: 'Start Date', type: 'date' }, { id: 'end', label: 'End Date', type: 'date' }],
        calculate: (v) => { const start = new Date(v.start), end = new Date(v.end); let count = 0, current = new Date(start); while (current <= end) { if (current.getDay() !== 0 && current.getDay() !== 6) count++; current.setDate(current.getDate() + 1); } return { result: count + ' workdays', details: `From: ${start.toLocaleDateString()}<br>To: ${end.toLocaleDateString()}<br>Workdays: ${count}` }; }
    },
    {
        id: 'holiday', name: 'Holiday Calculator', icon: '🎉', category: 'Work & Productivity', description: 'Calculate remaining holidays',
        fields: [{ id: 'total', label: 'Total Holidays/Year', type: 'number', placeholder: '12' }, { id: 'passed', label: 'Holidays Passed', type: 'number', placeholder: '5' }],
        calculate: (v) => { const total = parseInt(v.total), passed = parseInt(v.passed); const remaining = total - passed; return { result: remaining + ' remaining', details: `Total: ${total}<br>Passed: ${passed}<br>Remaining: ${remaining}` }; }
    },
    {
        id: 'monthly-target', name: 'Monthly Target Calculator', icon: '🎯', category: 'Work & Productivity', description: 'Calculate target per day',
        fields: [{ id: 'target', label: 'Monthly Target', type: 'number', placeholder: '100' }, { id: 'workdays', label: 'Working Days', type: 'number', placeholder: '22' }, { id: 'achieved', label: 'Already Achieved', type: 'number', placeholder: '30' }],
        calculate: (v) => { const target = parseFloat(v.target), days = parseInt(v.workdays), achieved = parseFloat(v.achieved); const remaining = target - achieved, perDay = remaining / days; return { result: perDay.toFixed(1) + '/day needed', details: `Target: ${target}<br>Achieved: ${achieved}<br>Remaining: ${remaining}<br>Per Day: ${perDay.toFixed(1)}` }; }
    },
    {
        id: 'performance-score', name: 'Performance Score', icon: '📊', category: 'Work & Productivity', description: 'Calculate performance score',
        fields: [{ id: 'tasks', label: 'Task Completion (0-100)', type: 'number', placeholder: '85' }, { id: 'quality', label: 'Quality Score (0-100)', type: 'number', placeholder: '90' }, { id: 'attendance', label: 'Attendance (0-100)', type: 'number', placeholder: '95' }],
        calculate: (v) => { const tasks = parseFloat(v.tasks) * 0.4, quality = parseFloat(v.quality) * 0.4, att = parseFloat(v.attendance) * 0.2; const score = tasks + quality + att; let rating; if (score >= 90) rating = 'Exceptional'; else if (score >= 80) rating = 'Excellent'; else if (score >= 70) rating = 'Good'; else rating = 'Needs Improvement'; return { result: score.toFixed(1) + '/100', details: `Tasks (40%): ${v.tasks}<br>Quality (40%): ${v.quality}<br>Attendance (20%): ${v.attendance}<br>Score: ${score.toFixed(1)} - ${rating}` }; }
    },
    {
        id: 'client-billing', name: 'Client Billing Calculator', icon: '💳', category: 'Work & Productivity', description: 'Calculate client bill',
        fields: [{ id: 'hours', label: 'Billable Hours', type: 'number', placeholder: '40' }, { id: 'rate', label: 'Hourly Rate (₹)', type: 'number', placeholder: '2000' }, { id: 'expenses', label: 'Reimbursable Expenses (₹)', type: 'number', placeholder: '5000' }, { id: 'gst', label: 'GST %', type: 'number', placeholder: '18' }],
        calculate: (v) => { const hrs = parseFloat(v.hours), rate = parseFloat(v.rate), exp = parseFloat(v.expenses), gst = parseFloat(v.gst); const fees = hrs * rate, subtotal = fees + exp, tax = subtotal * gst / 100, total = subtotal + tax; return { result: '₹' + total.toFixed(0), details: `Fees: ₹${fees.toLocaleString()}<br>Expenses: ₹${exp.toLocaleString()}<br>GST: ₹${tax.toFixed(0)}<br>Total: ₹${total.toFixed(0)}` }; }
    }
];
if (typeof window !== 'undefined') window.workCalculators = workCalculators;
