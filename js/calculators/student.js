// ================================================
// Student & Education Calculators (1-30)
// ================================================

const studentCalculators = [
    {
        id: 'percentage',
        name: 'Percentage Calculator',
        icon: '📊',
        category: 'Student & Education',
        description: 'Calculate percentage from marks',
        fields: [
            { id: 'obtained', label: 'Obtained Marks', type: 'number', placeholder: 'e.g., 85' },
            { id: 'total', label: 'Total Marks', type: 'number', placeholder: 'e.g., 100' }
        ],
        calculate: (values) => {
            const obtained = parseFloat(values.obtained);
            const total = parseFloat(values.total);
            if (total === 0) return { error: 'Total marks cannot be zero' };
            const percentage = (obtained / total) * 100;
            return {
                result: percentage.toFixed(2) + '%',
                details: `${obtained} out of ${total} = ${percentage.toFixed(2)}%`
            };
        }
    },
    {
        id: 'cgpa-to-percentage',
        name: 'CGPA to Percentage',
        icon: '🎓',
        category: 'Student & Education',
        description: 'Convert CGPA to percentage',
        fields: [
            { id: 'cgpa', label: 'CGPA (out of 10)', type: 'number', placeholder: 'e.g., 8.5', step: '0.01' }
        ],
        calculate: (values) => {
            const cgpa = parseFloat(values.cgpa);
            if (cgpa < 0 || cgpa > 10) return { error: 'CGPA should be between 0 and 10' };
            const percentage = (cgpa - 0.75) * 10; // Standard formula
            return {
                result: percentage.toFixed(2) + '%',
                details: `CGPA ${cgpa} = ${percentage.toFixed(2)}% (Using formula: (CGPA - 0.75) × 10)`
            };
        }
    },
    {
        id: 'percentage-to-cgpa',
        name: 'Percentage to CGPA',
        icon: '📈',
        category: 'Student & Education',
        description: 'Convert percentage to CGPA',
        fields: [
            { id: 'percentage', label: 'Percentage', type: 'number', placeholder: 'e.g., 85', step: '0.01' }
        ],
        calculate: (values) => {
            const percentage = parseFloat(values.percentage);
            if (percentage < 0 || percentage > 100) return { error: 'Percentage should be between 0 and 100' };
            const cgpa = (percentage / 10) + 0.75;
            return {
                result: Math.min(cgpa, 10).toFixed(2),
                details: `${percentage}% = CGPA ${Math.min(cgpa, 10).toFixed(2)} (Using formula: (Percentage ÷ 10) + 0.75)`
            };
        }
    },
    {
        id: 'sgpa-calculator',
        name: 'SGPA Calculator',
        icon: '📋',
        category: 'Student & Education',
        description: 'Calculate Semester GPA',
        fields: [
            { id: 'credits', label: 'Credits (comma separated)', type: 'text', placeholder: 'e.g., 4,3,3,4,2' },
            { id: 'grades', label: 'Grade Points (comma separated)', type: 'text', placeholder: 'e.g., 9,8,7,9,10' }
        ],
        calculate: (values) => {
            const credits = values.credits.split(',').map(c => parseFloat(c.trim()));
            const grades = values.grades.split(',').map(g => parseFloat(g.trim()));
            if (credits.length !== grades.length) return { error: 'Number of credits and grades must match' };
            const totalCredits = credits.reduce((a, b) => a + b, 0);
            const weightedSum = credits.reduce((sum, c, i) => sum + c * grades[i], 0);
            const sgpa = weightedSum / totalCredits;
            return {
                result: sgpa.toFixed(2),
                details: `Total Credits: ${totalCredits}<br>Weighted Sum: ${weightedSum.toFixed(2)}<br>SGPA: ${sgpa.toFixed(2)}`
            };
        }
    },
    {
        id: 'gpa-calculator',
        name: 'GPA Calculator',
        icon: '🏆',
        category: 'Student & Education',
        description: 'Calculate Grade Point Average',
        fields: [
            { id: 'credits', label: 'Credits (comma separated)', type: 'text', placeholder: 'e.g., 3,4,3,4' },
            { id: 'grades', label: 'Letter Grades (comma separated)', type: 'text', placeholder: 'e.g., A,B+,A-,B' }
        ],
        calculate: (values) => {
            const gradePoints = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0.0 };
            const credits = values.credits.split(',').map(c => parseFloat(c.trim()));
            const grades = values.grades.split(',').map(g => g.trim().toUpperCase());
            if (credits.length !== grades.length) return { error: 'Number of credits and grades must match' };
            let totalCredits = 0, weightedSum = 0;
            for (let i = 0; i < credits.length; i++) {
                if (gradePoints[grades[i]] === undefined) return { error: `Invalid grade: ${grades[i]}` };
                totalCredits += credits[i];
                weightedSum += credits[i] * gradePoints[grades[i]];
            }
            const gpa = weightedSum / totalCredits;
            return {
                result: gpa.toFixed(2),
                details: `Total Credits: ${totalCredits}<br>GPA: ${gpa.toFixed(2)} / 4.0`
            };
        }
    },
    {
        id: 'marks-to-grade',
        name: 'Marks to Grade',
        icon: '📝',
        category: 'Student & Education',
        description: 'Convert marks to letter grade',
        fields: [
            { id: 'marks', label: 'Marks (percentage)', type: 'number', placeholder: 'e.g., 85' }
        ],
        calculate: (values) => {
            const marks = parseFloat(values.marks);
            let grade, gpa;
            if (marks >= 90) { grade = 'A+'; gpa = 4.0; }
            else if (marks >= 85) { grade = 'A'; gpa = 4.0; }
            else if (marks >= 80) { grade = 'A-'; gpa = 3.7; }
            else if (marks >= 75) { grade = 'B+'; gpa = 3.3; }
            else if (marks >= 70) { grade = 'B'; gpa = 3.0; }
            else if (marks >= 65) { grade = 'B-'; gpa = 2.7; }
            else if (marks >= 60) { grade = 'C+'; gpa = 2.3; }
            else if (marks >= 55) { grade = 'C'; gpa = 2.0; }
            else if (marks >= 50) { grade = 'C-'; gpa = 1.7; }
            else if (marks >= 45) { grade = 'D'; gpa = 1.0; }
            else { grade = 'F'; gpa = 0.0; }
            return {
                result: grade,
                details: `${marks}% = Grade ${grade} (GPA: ${gpa})`
            };
        }
    },
    {
        id: 'grade-to-marks',
        name: 'Grade to Marks',
        icon: '🔢',
        category: 'Student & Education',
        description: 'Convert letter grade to marks range',
        fields: [
            { id: 'grade', label: 'Letter Grade', type: 'select', options: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'] }
        ],
        calculate: (values) => {
            const ranges = {
                'A+': '90-100%', 'A': '85-89%', 'A-': '80-84%',
                'B+': '75-79%', 'B': '70-74%', 'B-': '65-69%',
                'C+': '60-64%', 'C': '55-59%', 'C-': '50-54%',
                'D': '45-49%', 'F': 'Below 45%'
            };
            return {
                result: ranges[values.grade],
                details: `Grade ${values.grade} = ${ranges[values.grade]}`
            };
        }
    },
    {
        id: 'attendance-percentage',
        name: 'Attendance Percentage',
        icon: '✅',
        category: 'Student & Education',
        description: 'Calculate attendance percentage',
        fields: [
            { id: 'attended', label: 'Classes Attended', type: 'number', placeholder: 'e.g., 45' },
            { id: 'total', label: 'Total Classes', type: 'number', placeholder: 'e.g., 50' }
        ],
        calculate: (values) => {
            const attended = parseFloat(values.attended);
            const total = parseFloat(values.total);
            if (total === 0) return { error: 'Total classes cannot be zero' };
            const percentage = (attended / total) * 100;
            const status = percentage >= 75 ? '✅ Eligible' : '⚠️ Below required (75%)';
            return {
                result: percentage.toFixed(2) + '%',
                details: `${attended} / ${total} classes = ${percentage.toFixed(2)}%<br>${status}`
            };
        }
    },
    {
        id: 'required-attendance',
        name: 'Required Attendance Calculator',
        icon: '🎯',
        category: 'Student & Education',
        description: 'Calculate classes needed for 75% attendance',
        fields: [
            { id: 'attended', label: 'Classes Attended', type: 'number', placeholder: 'e.g., 30' },
            { id: 'total', label: 'Total Classes Held', type: 'number', placeholder: 'e.g., 50' },
            { id: 'remaining', label: 'Remaining Classes', type: 'number', placeholder: 'e.g., 20' }
        ],
        calculate: (values) => {
            const attended = parseFloat(values.attended);
            const total = parseFloat(values.total);
            const remaining = parseFloat(values.remaining);
            const currentPercentage = (attended / total) * 100;
            const requiredFor75 = Math.ceil(0.75 * (total + remaining) - attended);
            const canSkip = remaining - requiredFor75;
            return {
                result: `Need ${Math.max(0, requiredFor75)} more`,
                details: `Current: ${currentPercentage.toFixed(1)}%<br>Required for 75%: Attend ${Math.max(0, requiredFor75)} of ${remaining} remaining<br>Can skip: ${Math.max(0, canSkip)} classes`
            };
        }
    },
    {
        id: 'exam-score',
        name: 'Exam Score Calculator',
        icon: '📑',
        category: 'Student & Education',
        description: 'Calculate weighted exam score',
        fields: [
            { id: 'midterm', label: 'Midterm Score', type: 'number', placeholder: 'e.g., 80' },
            { id: 'midtermWeight', label: 'Midterm Weight (%)', type: 'number', placeholder: 'e.g., 30' },
            { id: 'final', label: 'Final Score', type: 'number', placeholder: 'e.g., 90' },
            { id: 'finalWeight', label: 'Final Weight (%)', type: 'number', placeholder: 'e.g., 70' }
        ],
        calculate: (values) => {
            const midterm = parseFloat(values.midterm);
            const midtermWeight = parseFloat(values.midtermWeight) / 100;
            const final = parseFloat(values.final);
            const finalWeight = parseFloat(values.finalWeight) / 100;
            const total = midterm * midtermWeight + final * finalWeight;
            return {
                result: total.toFixed(2) + '%',
                details: `Midterm: ${midterm} × ${midtermWeight * 100}% = ${(midterm * midtermWeight).toFixed(2)}<br>Final: ${final} × ${finalWeight * 100}% = ${(final * finalWeight).toFixed(2)}<br>Total: ${total.toFixed(2)}%`
            };
        }
    },
    {
        id: 'weighted-average',
        name: 'Weighted Average Marks',
        icon: '⚖️',
        category: 'Student & Education',
        description: 'Calculate weighted average of marks',
        fields: [
            { id: 'marks', label: 'Marks (comma separated)', type: 'text', placeholder: 'e.g., 85,90,78' },
            { id: 'weights', label: 'Weights (comma separated)', type: 'text', placeholder: 'e.g., 3,4,3' }
        ],
        calculate: (values) => {
            const marks = values.marks.split(',').map(m => parseFloat(m.trim()));
            const weights = values.weights.split(',').map(w => parseFloat(w.trim()));
            if (marks.length !== weights.length) return { error: 'Number of marks and weights must match' };
            const totalWeight = weights.reduce((a, b) => a + b, 0);
            const weightedSum = marks.reduce((sum, m, i) => sum + m * weights[i], 0);
            const average = weightedSum / totalWeight;
            return {
                result: average.toFixed(2),
                details: `Total Weight: ${totalWeight}<br>Weighted Sum: ${weightedSum.toFixed(2)}<br>Weighted Average: ${average.toFixed(2)}`
            };
        }
    },
    {
        id: 'internal-marks',
        name: 'Internal Marks Calculator',
        icon: '📚',
        category: 'Student & Education',
        description: 'Calculate internal assessment marks',
        fields: [
            { id: 'assignment', label: 'Assignment Marks', type: 'number', placeholder: 'e.g., 18' },
            { id: 'assignmentMax', label: 'Assignment Max', type: 'number', placeholder: 'e.g., 20' },
            { id: 'quiz', label: 'Quiz Marks', type: 'number', placeholder: 'e.g., 8' },
            { id: 'quizMax', label: 'Quiz Max', type: 'number', placeholder: 'e.g., 10' },
            { id: 'attendance', label: 'Attendance Marks', type: 'number', placeholder: 'e.g., 9' },
            { id: 'attendanceMax', label: 'Attendance Max', type: 'number', placeholder: 'e.g., 10' }
        ],
        calculate: (values) => {
            const total = parseFloat(values.assignment) + parseFloat(values.quiz) + parseFloat(values.attendance);
            const max = parseFloat(values.assignmentMax) + parseFloat(values.quizMax) + parseFloat(values.attendanceMax);
            const percentage = (total / max) * 100;
            return {
                result: `${total} / ${max}`,
                details: `Assignment: ${values.assignment}/${values.assignmentMax}<br>Quiz: ${values.quiz}/${values.quizMax}<br>Attendance: ${values.attendance}/${values.attendanceMax}<br>Percentage: ${percentage.toFixed(2)}%`
            };
        }
    },
    {
        id: 'external-marks',
        name: 'External Marks Calculator',
        icon: '📄',
        category: 'Student & Education',
        description: 'Calculate external exam marks',
        fields: [
            { id: 'obtained', label: 'Marks Obtained', type: 'number', placeholder: 'e.g., 65' },
            { id: 'total', label: 'Total Marks', type: 'number', placeholder: 'e.g., 100' },
            { id: 'convertTo', label: 'Convert to (out of)', type: 'number', placeholder: 'e.g., 60' }
        ],
        calculate: (values) => {
            const obtained = parseFloat(values.obtained);
            const total = parseFloat(values.total);
            const convertTo = parseFloat(values.convertTo);
            const converted = (obtained / total) * convertTo;
            return {
                result: converted.toFixed(2),
                details: `${obtained}/${total} converted to ${convertTo} = ${converted.toFixed(2)}`
            };
        }
    },
    {
        id: 'semester-result',
        name: 'Semester Result Calculator',
        icon: '🎓',
        category: 'Student & Education',
        description: 'Calculate overall semester result',
        fields: [
            { id: 'internal', label: 'Internal Marks', type: 'number', placeholder: 'e.g., 35' },
            { id: 'internalMax', label: 'Internal Max', type: 'number', placeholder: 'e.g., 40' },
            { id: 'external', label: 'External Marks', type: 'number', placeholder: 'e.g., 52' },
            { id: 'externalMax', label: 'External Max', type: 'number', placeholder: 'e.g., 60' }
        ],
        calculate: (values) => {
            const internal = parseFloat(values.internal);
            const internalMax = parseFloat(values.internalMax);
            const external = parseFloat(values.external);
            const externalMax = parseFloat(values.externalMax);
            const total = internal + external;
            const max = internalMax + externalMax;
            const percentage = (total / max) * 100;
            const pass = percentage >= 40;
            return {
                result: `${total} / ${max}`,
                details: `Internal: ${internal}/${internalMax}<br>External: ${external}/${externalMax}<br>Percentage: ${percentage.toFixed(2)}%<br>Status: ${pass ? '✅ Pass' : '❌ Fail'}`
            };
        }
    },
    {
        id: 'backlog-clearance',
        name: 'Backlog Clearance Calculator',
        icon: '🔄',
        category: 'Student & Education',
        description: 'Calculate marks needed to clear backlog',
        fields: [
            { id: 'internal', label: 'Your Internal Marks', type: 'number', placeholder: 'e.g., 15' },
            { id: 'internalMax', label: 'Internal Max', type: 'number', placeholder: 'e.g., 40' },
            { id: 'externalMax', label: 'External Max', type: 'number', placeholder: 'e.g., 60' },
            { id: 'passingPercent', label: 'Passing Percentage', type: 'number', placeholder: 'e.g., 40' }
        ],
        calculate: (values) => {
            const internal = parseFloat(values.internal);
            const internalMax = parseFloat(values.internalMax);
            const externalMax = parseFloat(values.externalMax);
            const passingPercent = parseFloat(values.passingPercent) / 100;
            const totalMax = internalMax + externalMax;
            const passingMarks = totalMax * passingPercent;
            const neededExternal = Math.max(0, passingMarks - internal);
            const externalPercent = (neededExternal / externalMax) * 100;
            return {
                result: `Need ${neededExternal.toFixed(0)} in external`,
                details: `Total passing marks needed: ${passingMarks}<br>Your internal: ${internal}<br>External marks needed: ${neededExternal.toFixed(0)} / ${externalMax}<br>External percentage needed: ${externalPercent.toFixed(1)}%`
            };
        }
    },
    {
        id: 'passing-marks',
        name: 'Passing Marks Calculator',
        icon: '✔️',
        category: 'Student & Education',
        description: 'Calculate minimum passing marks',
        fields: [
            { id: 'total', label: 'Total Marks', type: 'number', placeholder: 'e.g., 100' },
            { id: 'passingPercent', label: 'Passing Percentage', type: 'number', placeholder: 'e.g., 33' }
        ],
        calculate: (values) => {
            const total = parseFloat(values.total);
            const passingPercent = parseFloat(values.passingPercent);
            const passingMarks = (total * passingPercent) / 100;
            return {
                result: Math.ceil(passingMarks) + ' marks',
                details: `Total: ${total}<br>Passing %: ${passingPercent}%<br>Minimum marks to pass: ${Math.ceil(passingMarks)}`
            };
        }
    },
    {
        id: 'rank-predictor',
        name: 'Rank Predictor',
        icon: '🏅',
        category: 'Student & Education',
        description: 'Predict rank based on percentile',
        fields: [
            { id: 'percentile', label: 'Your Percentile', type: 'number', placeholder: 'e.g., 95.5', step: '0.01' },
            { id: 'totalStudents', label: 'Total Students', type: 'number', placeholder: 'e.g., 1000000' }
        ],
        calculate: (values) => {
            const percentile = parseFloat(values.percentile);
            const totalStudents = parseFloat(values.totalStudents);
            const rank = Math.round((100 - percentile) * totalStudents / 100);
            return {
                result: `Rank ~${rank.toLocaleString()}`,
                details: `Percentile: ${percentile}%<br>Total Students: ${totalStudents.toLocaleString()}<br>Predicted Rank: ${rank.toLocaleString()}`
            };
        }
    },
    {
        id: 'study-hours',
        name: 'Study Hours Calculator',
        icon: '⏰',
        category: 'Student & Education',
        description: 'Calculate daily study hours needed',
        fields: [
            { id: 'subjects', label: 'Number of Subjects', type: 'number', placeholder: 'e.g., 5' },
            { id: 'hoursPerSubject', label: 'Required Hours per Subject', type: 'number', placeholder: 'e.g., 50' },
            { id: 'daysRemaining', label: 'Days Until Exam', type: 'number', placeholder: 'e.g., 30' }
        ],
        calculate: (values) => {
            const subjects = parseFloat(values.subjects);
            const hoursPerSubject = parseFloat(values.hoursPerSubject);
            const days = parseFloat(values.daysRemaining);
            const totalHours = subjects * hoursPerSubject;
            const dailyHours = totalHours / days;
            return {
                result: `${dailyHours.toFixed(1)} hours/day`,
                details: `Total hours needed: ${totalHours}<br>Days available: ${days}<br>Daily study: ${dailyHours.toFixed(1)} hours`
            };
        }
    },
    {
        id: 'revision-planner',
        name: 'Revision Planner Calculator',
        icon: '📅',
        category: 'Student & Education',
        description: 'Plan revision schedule',
        fields: [
            { id: 'topics', label: 'Number of Topics', type: 'number', placeholder: 'e.g., 20' },
            { id: 'minutesPerTopic', label: 'Minutes per Topic', type: 'number', placeholder: 'e.g., 45' },
            { id: 'hoursPerDay', label: 'Study Hours per Day', type: 'number', placeholder: 'e.g., 6' }
        ],
        calculate: (values) => {
            const topics = parseFloat(values.topics);
            const minutesPerTopic = parseFloat(values.minutesPerTopic);
            const hoursPerDay = parseFloat(values.hoursPerDay);
            const totalMinutes = topics * minutesPerTopic;
            const totalHours = totalMinutes / 60;
            const daysNeeded = Math.ceil(totalHours / hoursPerDay);
            const topicsPerDay = topics / daysNeeded;
            return {
                result: `${daysNeeded} days needed`,
                details: `Total revision time: ${totalHours.toFixed(1)} hours<br>Days needed: ${daysNeeded}<br>Topics per day: ${topicsPerDay.toFixed(1)}`
            };
        }
    },
    {
        id: 'syllabus-completion',
        name: 'Time to Finish Syllabus',
        icon: '📖',
        category: 'Student & Education',
        description: 'Calculate time to complete syllabus',
        fields: [
            { id: 'chapters', label: 'Total Chapters', type: 'number', placeholder: 'e.g., 15' },
            { id: 'hoursPerChapter', label: 'Hours per Chapter', type: 'number', placeholder: 'e.g., 4' },
            { id: 'dailyHours', label: 'Study Hours per Day', type: 'number', placeholder: 'e.g., 3' }
        ],
        calculate: (values) => {
            const chapters = parseFloat(values.chapters);
            const hoursPerChapter = parseFloat(values.hoursPerChapter);
            const dailyHours = parseFloat(values.dailyHours);
            const totalHours = chapters * hoursPerChapter;
            const days = Math.ceil(totalHours / dailyHours);
            const weeks = Math.ceil(days / 7);
            return {
                result: `${days} days (${weeks} weeks)`,
                details: `Total chapters: ${chapters}<br>Total hours needed: ${totalHours}<br>Days to complete: ${days}<br>Weeks: ~${weeks}`
            };
        }
    },
    {
        id: 'credits-calculator',
        name: 'Credits Calculator',
        icon: '💳',
        category: 'Student & Education',
        description: 'Calculate total semester credits',
        fields: [
            { id: 'subjects', label: 'Subject Credits (comma separated)', type: 'text', placeholder: 'e.g., 4,3,3,4,2,3' }
        ],
        calculate: (values) => {
            const credits = values.subjects.split(',').map(c => parseFloat(c.trim()));
            const total = credits.reduce((a, b) => a + b, 0);
            return {
                result: `${total} credits`,
                details: `Subjects: ${credits.length}<br>Credits: ${credits.join(', ')}<br>Total: ${total} credits`
            };
        }
    },
    {
        id: 'assignment-weight',
        name: 'Assignment Weight Calculator',
        icon: '📝',
        category: 'Student & Education',
        description: 'Calculate assignment contribution to grade',
        fields: [
            { id: 'assignmentScore', label: 'Assignment Score', type: 'number', placeholder: 'e.g., 85' },
            { id: 'assignmentMax', label: 'Assignment Max', type: 'number', placeholder: 'e.g., 100' },
            { id: 'weight', label: 'Weight in Final Grade (%)', type: 'number', placeholder: 'e.g., 20' }
        ],
        calculate: (values) => {
            const score = parseFloat(values.assignmentScore);
            const max = parseFloat(values.assignmentMax);
            const weight = parseFloat(values.weight);
            const percentage = (score / max) * 100;
            const contribution = (percentage * weight) / 100;
            return {
                result: `${contribution.toFixed(2)}% contribution`,
                details: `Assignment score: ${percentage.toFixed(1)}%<br>Weight: ${weight}%<br>Contribution to final grade: ${contribution.toFixed(2)}%`
            };
        }
    },
    {
        id: 'practical-marks',
        name: 'Practical Marks Calculator',
        icon: '🔬',
        category: 'Student & Education',
        description: 'Calculate practical/lab marks',
        fields: [
            { id: 'experiment', label: 'Experiment Marks', type: 'number', placeholder: 'e.g., 15' },
            { id: 'viva', label: 'Viva Marks', type: 'number', placeholder: 'e.g., 8' },
            { id: 'record', label: 'Record Marks', type: 'number', placeholder: 'e.g., 5' },
            { id: 'total', label: 'Total Max Marks', type: 'number', placeholder: 'e.g., 30' }
        ],
        calculate: (values) => {
            const experiment = parseFloat(values.experiment);
            const viva = parseFloat(values.viva);
            const record = parseFloat(values.record);
            const total = parseFloat(values.total);
            const obtained = experiment + viva + record;
            const percentage = (obtained / total) * 100;
            return {
                result: `${obtained} / ${total}`,
                details: `Experiment: ${experiment}<br>Viva: ${viva}<br>Record: ${record}<br>Total: ${obtained}/${total} (${percentage.toFixed(1)}%)`
            };
        }
    },
    {
        id: 'theory-marks',
        name: 'Theory Marks Calculator',
        icon: '📕',
        category: 'Student & Education',
        description: 'Calculate theory exam marks',
        fields: [
            { id: 'section1', label: 'Section A Marks', type: 'number', placeholder: 'e.g., 20' },
            { id: 'section2', label: 'Section B Marks', type: 'number', placeholder: 'e.g., 35' },
            { id: 'section3', label: 'Section C Marks', type: 'number', placeholder: 'e.g., 25' },
            { id: 'total', label: 'Total Marks', type: 'number', placeholder: 'e.g., 100' }
        ],
        calculate: (values) => {
            const s1 = parseFloat(values.section1);
            const s2 = parseFloat(values.section2);
            const s3 = parseFloat(values.section3);
            const total = parseFloat(values.total);
            const obtained = s1 + s2 + s3;
            const percentage = (obtained / total) * 100;
            return {
                result: `${obtained} / ${total}`,
                details: `Section A: ${s1}<br>Section B: ${s2}<br>Section C: ${s3}<br>Total: ${obtained} (${percentage.toFixed(1)}%)`
            };
        }
    },
    {
        id: 'scholarship-eligibility',
        name: 'Scholarship Eligibility Calculator',
        icon: '🎖️',
        category: 'Student & Education',
        description: 'Check scholarship eligibility',
        fields: [
            { id: 'percentage', label: 'Your Percentage', type: 'number', placeholder: 'e.g., 85' },
            { id: 'minRequired', label: 'Minimum Required (%)', type: 'number', placeholder: 'e.g., 80' },
            { id: 'familyIncome', label: 'Annual Family Income', type: 'number', placeholder: 'e.g., 500000' },
            { id: 'incomeLimit', label: 'Income Limit', type: 'number', placeholder: 'e.g., 800000' }
        ],
        calculate: (values) => {
            const percentage = parseFloat(values.percentage);
            const minRequired = parseFloat(values.minRequired);
            const income = parseFloat(values.familyIncome);
            const incomeLimit = parseFloat(values.incomeLimit);
            const meritEligible = percentage >= minRequired;
            const incomeEligible = income <= incomeLimit;
            const eligible = meritEligible && incomeEligible;
            return {
                result: eligible ? '✅ Eligible' : '❌ Not Eligible',
                details: `Merit: ${meritEligible ? '✅' : '❌'} (${percentage}% vs ${minRequired}% required)<br>Income: ${incomeEligible ? '✅' : '❌'} (₹${income.toLocaleString()} vs ₹${incomeLimit.toLocaleString()} limit)`
            };
        }
    },
    {
        id: 'cutoff-marks',
        name: 'Cut-off Marks Calculator',
        icon: '✂️',
        category: 'Student & Education',
        description: 'Calculate engineering cut-off marks',
        fields: [
            { id: 'maths', label: 'Maths Marks (out of 100)', type: 'number', placeholder: 'e.g., 95' },
            { id: 'physics', label: 'Physics Marks (out of 100)', type: 'number', placeholder: 'e.g., 90' },
            { id: 'chemistry', label: 'Chemistry Marks (out of 100)', type: 'number', placeholder: 'e.g., 85' }
        ],
        calculate: (values) => {
            const maths = parseFloat(values.maths);
            const physics = parseFloat(values.physics);
            const chemistry = parseFloat(values.chemistry);
            // Standard engineering cut-off formula
            const cutoff = (maths) + (physics / 2) + (chemistry / 2);
            return {
                result: cutoff.toFixed(2),
                details: `Maths: ${maths} × 1 = ${maths}<br>Physics: ${physics} × 0.5 = ${physics / 2}<br>Chemistry: ${chemistry} × 0.5 = ${chemistry / 2}<br>Cut-off: ${cutoff.toFixed(2)} / 200`
            };
        }
    },
    {
        id: 'result-percentage',
        name: 'Result Percentage Calculator',
        icon: '📊',
        category: 'Student & Education',
        description: 'Calculate overall result percentage',
        fields: [
            { id: 'marks', label: 'Marks in each subject (comma separated)', type: 'text', placeholder: 'e.g., 85,90,78,92,88' },
            { id: 'maxMarks', label: 'Max marks per subject', type: 'number', placeholder: 'e.g., 100' }
        ],
        calculate: (values) => {
            const marks = values.marks.split(',').map(m => parseFloat(m.trim()));
            const max = parseFloat(values.maxMarks);
            const totalObtained = marks.reduce((a, b) => a + b, 0);
            const totalMax = marks.length * max;
            const percentage = (totalObtained / totalMax) * 100;
            return {
                result: percentage.toFixed(2) + '%',
                details: `Subjects: ${marks.length}<br>Total obtained: ${totalObtained}<br>Total max: ${totalMax}<br>Percentage: ${percentage.toFixed(2)}%`
            };
        }
    },
    {
        id: 'improvement-marks',
        name: 'Improvement Marks Calculator',
        icon: '📈',
        category: 'Student & Education',
        description: 'Calculate improvement needed',
        fields: [
            { id: 'current', label: 'Current Percentage', type: 'number', placeholder: 'e.g., 70' },
            { id: 'target', label: 'Target Percentage', type: 'number', placeholder: 'e.g., 80' },
            { id: 'subjects', label: 'Number of Subjects', type: 'number', placeholder: 'e.g., 5' },
            { id: 'maxPerSubject', label: 'Max Marks per Subject', type: 'number', placeholder: 'e.g., 100' }
        ],
        calculate: (values) => {
            const current = parseFloat(values.current);
            const target = parseFloat(values.target);
            const subjects = parseFloat(values.subjects);
            const maxPerSubject = parseFloat(values.maxPerSubject);
            const totalMax = subjects * maxPerSubject;
            const currentMarks = (current / 100) * totalMax;
            const targetMarks = (target / 100) * totalMax;
            const improvement = targetMarks - currentMarks;
            const perSubject = improvement / subjects;
            return {
                result: `+${improvement.toFixed(0)} marks needed`,
                details: `Current: ${currentMarks.toFixed(0)} marks (${current}%)<br>Target: ${targetMarks.toFixed(0)} marks (${target}%)<br>Improvement needed: ${improvement.toFixed(0)} marks<br>Per subject: +${perSubject.toFixed(1)} marks`
            };
        }
    },
    {
        id: 'board-exam-percentage',
        name: 'Board Exam Percentage',
        icon: '🏫',
        category: 'Student & Education',
        description: 'Calculate board exam result',
        fields: [
            { id: 'subject1', label: 'Subject 1 Marks', type: 'number', placeholder: 'e.g., 90' },
            { id: 'subject2', label: 'Subject 2 Marks', type: 'number', placeholder: 'e.g., 85' },
            { id: 'subject3', label: 'Subject 3 Marks', type: 'number', placeholder: 'e.g., 88' },
            { id: 'subject4', label: 'Subject 4 Marks', type: 'number', placeholder: 'e.g., 92' },
            { id: 'subject5', label: 'Subject 5 Marks', type: 'number', placeholder: 'e.g., 78' },
            { id: 'maxMarks', label: 'Max Marks per Subject', type: 'number', placeholder: 'e.g., 100' }
        ],
        calculate: (values) => {
            const marks = [
                parseFloat(values.subject1),
                parseFloat(values.subject2),
                parseFloat(values.subject3),
                parseFloat(values.subject4),
                parseFloat(values.subject5)
            ];
            const max = parseFloat(values.maxMarks);
            const total = marks.reduce((a, b) => a + b, 0);
            const percentage = (total / (5 * max)) * 100;
            let division;
            if (percentage >= 60) division = 'First Division';
            else if (percentage >= 45) division = 'Second Division';
            else if (percentage >= 33) division = 'Third Division';
            else division = 'Fail';
            return {
                result: percentage.toFixed(2) + '%',
                details: `Total: ${total}/${5 * max}<br>Percentage: ${percentage.toFixed(2)}%<br>Result: ${division}`
            };
        }
    },
    {
        id: 'competitive-percentile',
        name: 'Competitive Exam Percentile',
        icon: '🎯',
        category: 'Student & Education',
        description: 'Calculate percentile from rank',
        fields: [
            { id: 'rank', label: 'Your Rank', type: 'number', placeholder: 'e.g., 5000' },
            { id: 'totalStudents', label: 'Total Students', type: 'number', placeholder: 'e.g., 1000000' }
        ],
        calculate: (values) => {
            const rank = parseFloat(values.rank);
            const total = parseFloat(values.totalStudents);
            const percentile = ((total - rank) / total) * 100;
            return {
                result: percentile.toFixed(4) + ' percentile',
                details: `Rank: ${rank.toLocaleString()}<br>Total students: ${total.toLocaleString()}<br>Percentile: ${percentile.toFixed(4)}`
            };
        }
    }
];

// Export for use in main app
if (typeof window !== 'undefined') {
    window.studentCalculators = studentCalculators;
}
