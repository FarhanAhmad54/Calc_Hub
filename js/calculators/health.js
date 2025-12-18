// ================================================
// Health & Fitness Calculators (71-100)
// ================================================

const healthCalculators = [
    {
        id: 'bmi-calculator',
        name: 'BMI Calculator',
        icon: '⚖️',
        category: 'Health & Fitness',
        description: 'Calculate Body Mass Index',
        fields: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'height', label: 'Height (cm)', type: 'number', placeholder: 'e.g., 175' }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const height = parseFloat(values.height) / 100;
            const bmi = weight / (height * height);
            let category;
            if (bmi < 18.5) category = 'Underweight';
            else if (bmi < 25) category = 'Normal weight';
            else if (bmi < 30) category = 'Overweight';
            else category = 'Obese';
            return {
                result: bmi.toFixed(1) + ' BMI',
                details: `Weight: ${weight} kg<br>Height: ${values.height} cm<br>BMI: ${bmi.toFixed(2)}<br>Category: ${category}`
            };
        }
    },
    {
        id: 'bmr-calculator',
        name: 'BMR Calculator',
        icon: '🔥',
        category: 'Health & Fitness',
        description: 'Calculate Basal Metabolic Rate',
        fields: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'height', label: 'Height (cm)', type: 'number', placeholder: 'e.g., 175' },
            { id: 'age', label: 'Age (years)', type: 'number', placeholder: 'e.g., 25' },
            { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const height = parseFloat(values.height);
            const age = parseFloat(values.age);
            let bmr;
            if (values.gender === 'Male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
            return {
                result: Math.round(bmr) + ' kcal/day',
                details: `Your body burns approximately ${Math.round(bmr)} calories per day at complete rest.<br><br>This is your baseline calorie need.`
            };
        }
    },
    {
        id: 'daily-calorie',
        name: 'Daily Calorie Requirement',
        icon: '🍽️',
        category: 'Health & Fitness',
        description: 'Calculate daily calorie needs',
        fields: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'height', label: 'Height (cm)', type: 'number', placeholder: 'e.g., 175' },
            { id: 'age', label: 'Age (years)', type: 'number', placeholder: 'e.g., 25' },
            { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
            { id: 'activity', label: 'Activity Level', type: 'select', options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active'] }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const height = parseFloat(values.height);
            const age = parseFloat(values.age);
            let bmr;
            if (values.gender === 'Male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
            const activityMultipliers = {
                'Sedentary': 1.2,
                'Lightly Active': 1.375,
                'Moderately Active': 1.55,
                'Very Active': 1.725,
                'Extra Active': 1.9
            };
            const tdee = bmr * activityMultipliers[values.activity];
            return {
                result: Math.round(tdee) + ' kcal/day',
                details: `BMR: ${Math.round(bmr)} kcal<br>Activity Level: ${values.activity}<br>Daily Calories: ${Math.round(tdee)} kcal<br><br>For weight loss: ${Math.round(tdee - 500)} kcal<br>For weight gain: ${Math.round(tdee + 500)} kcal`
            };
        }
    },
    {
        id: 'calorie-burn',
        name: 'Calorie Burn Calculator',
        icon: '🏃',
        category: 'Health & Fitness',
        description: 'Calculate calories burned during exercise',
        fields: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'activity', label: 'Activity', type: 'select', options: ['Walking', 'Running', 'Cycling', 'Swimming', 'Yoga', 'Weight Training', 'HIIT'] },
            { id: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: 'e.g., 30' }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const duration = parseFloat(values.duration);
            const metValues = {
                'Walking': 3.5,
                'Running': 9.8,
                'Cycling': 7.5,
                'Swimming': 8.0,
                'Yoga': 3.0,
                'Weight Training': 6.0,
                'HIIT': 12.0
            };
            const met = metValues[values.activity];
            const calories = (met * weight * duration) / 60;
            return {
                result: Math.round(calories) + ' calories',
                details: `Activity: ${values.activity}<br>Duration: ${duration} minutes<br>Calories Burned: ~${Math.round(calories)} kcal`
            };
        }
    },
    {
        id: 'ideal-weight',
        name: 'Ideal Weight Calculator',
        icon: '🎯',
        category: 'Health & Fitness',
        description: 'Calculate ideal body weight',
        fields: [
            { id: 'height', label: 'Height (cm)', type: 'number', placeholder: 'e.g., 175' },
            { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] }
        ],
        calculate: (values) => {
            const height = parseFloat(values.height);
            const inches = height / 2.54;
            let ideal;
            if (values.gender === 'Male') {
                ideal = 50 + 2.3 * (inches - 60);
            } else {
                ideal = 45.5 + 2.3 * (inches - 60);
            }
            const minHealthy = 18.5 * Math.pow(height / 100, 2);
            const maxHealthy = 24.9 * Math.pow(height / 100, 2);
            return {
                result: ideal.toFixed(1) + ' kg',
                details: `Ideal Weight: ${ideal.toFixed(1)} kg<br>Healthy Range: ${minHealthy.toFixed(1)} - ${maxHealthy.toFixed(1)} kg`
            };
        }
    },
    {
        id: 'body-fat',
        name: 'Body Fat Percentage',
        icon: '📊',
        category: 'Health & Fitness',
        description: 'Estimate body fat percentage',
        fields: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'height', label: 'Height (cm)', type: 'number', placeholder: 'e.g., 175' },
            { id: 'age', label: 'Age (years)', type: 'number', placeholder: 'e.g., 25' },
            { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const height = parseFloat(values.height) / 100;
            const age = parseFloat(values.age);
            const bmi = weight / (height * height);
            let bodyFat;
            if (values.gender === 'Male') {
                bodyFat = (1.20 * bmi) + (0.23 * age) - 16.2;
            } else {
                bodyFat = (1.20 * bmi) + (0.23 * age) - 5.4;
            }
            let category;
            if (values.gender === 'Male') {
                if (bodyFat < 6) category = 'Essential Fat';
                else if (bodyFat < 14) category = 'Athletes';
                else if (bodyFat < 18) category = 'Fitness';
                else if (bodyFat < 25) category = 'Average';
                else category = 'Above Average';
            } else {
                if (bodyFat < 14) category = 'Essential Fat';
                else if (bodyFat < 21) category = 'Athletes';
                else if (bodyFat < 25) category = 'Fitness';
                else if (bodyFat < 32) category = 'Average';
                else category = 'Above Average';
            }
            return {
                result: bodyFat.toFixed(1) + '%',
                details: `Estimated Body Fat: ${bodyFat.toFixed(1)}%<br>Category: ${category}`
            };
        }
    },
    {
        id: 'protein-requirement',
        name: 'Protein Requirement Calculator',
        icon: '🥩',
        category: 'Health & Fitness',
        description: 'Calculate daily protein needs',
        fields: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'goal', label: 'Goal', type: 'select', options: ['Sedentary', 'Weight Loss', 'Muscle Maintenance', 'Muscle Building', 'Athlete'] }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const multipliers = {
                'Sedentary': 0.8,
                'Weight Loss': 1.2,
                'Muscle Maintenance': 1.4,
                'Muscle Building': 1.8,
                'Athlete': 2.2
            };
            const protein = weight * multipliers[values.goal];
            return {
                result: Math.round(protein) + 'g/day',
                details: `Weight: ${weight} kg<br>Goal: ${values.goal}<br>Daily Protein: ${Math.round(protein)}g<br><br>~${Math.round(protein / 4)} per meal (4 meals)`
            };
        }
    },
    {
        id: 'water-intake',
        name: 'Water Intake Calculator',
        icon: '💧',
        category: 'Health & Fitness',
        description: 'Calculate daily water requirement',
        fields: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'activity', label: 'Activity Level', type: 'select', options: ['Low', 'Moderate', 'High', 'Very High'] }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const activityMultipliers = {
                'Low': 30,
                'Moderate': 35,
                'High': 40,
                'Very High': 45
            };
            const waterMl = weight * activityMultipliers[values.activity];
            const waterLiters = waterMl / 1000;
            const glasses = Math.round(waterMl / 250);
            return {
                result: waterLiters.toFixed(1) + ' liters/day',
                details: `Daily Water: ${waterMl} ml<br>That's about ${glasses} glasses (250ml each)`
            };
        }
    },
    {
        id: 'steps-calories',
        name: 'Steps to Calories Calculator',
        icon: '👟',
        category: 'Health & Fitness',
        description: 'Convert steps to calories burned',
        fields: [
            { id: 'steps', label: 'Number of Steps', type: 'number', placeholder: 'e.g., 10000' },
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70' }
        ],
        calculate: (values) => {
            const steps = parseFloat(values.steps);
            const weight = parseFloat(values.weight);
            const distance = (steps * 0.76) / 1000; // km
            const calories = steps * 0.04 * (weight / 70);
            return {
                result: Math.round(calories) + ' calories',
                details: `Steps: ${steps.toLocaleString()}<br>Distance: ~${distance.toFixed(2)} km<br>Calories Burned: ~${Math.round(calories)} kcal`
            };
        }
    },
    {
        id: 'heart-rate',
        name: 'Heart Rate Calculator',
        icon: '❤️',
        category: 'Health & Fitness',
        description: 'Calculate max heart rate zones',
        fields: [
            { id: 'age', label: 'Age (years)', type: 'number', placeholder: 'e.g., 25' }
        ],
        calculate: (values) => {
            const age = parseFloat(values.age);
            const maxHR = 220 - age;
            const zones = {
                'Zone 1 (50-60%)': `${Math.round(maxHR * 0.5)} - ${Math.round(maxHR * 0.6)} bpm`,
                'Zone 2 (60-70%)': `${Math.round(maxHR * 0.6)} - ${Math.round(maxHR * 0.7)} bpm`,
                'Zone 3 (70-80%)': `${Math.round(maxHR * 0.7)} - ${Math.round(maxHR * 0.8)} bpm`,
                'Zone 4 (80-90%)': `${Math.round(maxHR * 0.8)} - ${Math.round(maxHR * 0.9)} bpm`,
                'Zone 5 (90-100%)': `${Math.round(maxHR * 0.9)} - ${maxHR} bpm`
            };
            return {
                result: maxHR + ' bpm (max)',
                details: `Max Heart Rate: ${maxHR} bpm<br><br>Zone 1 (Recovery): ${zones['Zone 1 (50-60%)']}<br>Zone 2 (Fat Burn): ${zones['Zone 2 (60-70%)']}<br>Zone 3 (Cardio): ${zones['Zone 3 (70-80%)']}<br>Zone 4 (Threshold): ${zones['Zone 4 (80-90%)']}<br>Zone 5 (Max): ${zones['Zone 5 (90-100%)']}`
            };
        }
    },
    {
        id: 'target-heart-rate',
        name: 'Target Heart Rate',
        icon: '💓',
        category: 'Health & Fitness',
        description: 'Calculate target heart rate for exercise',
        fields: [
            { id: 'age', label: 'Age (years)', type: 'number', placeholder: 'e.g., 25' },
            { id: 'restingHR', label: 'Resting Heart Rate (bpm)', type: 'number', placeholder: 'e.g., 60' },
            { id: 'intensity', label: 'Exercise Intensity', type: 'select', options: ['Light (50-60%)', 'Moderate (60-70%)', 'Hard (70-80%)', 'Very Hard (80-90%)'] }
        ],
        calculate: (values) => {
            const age = parseFloat(values.age);
            const restingHR = parseFloat(values.restingHR);
            const maxHR = 220 - age;
            const hrReserve = maxHR - restingHR;
            const intensities = {
                'Light (50-60%)': [0.5, 0.6],
                'Moderate (60-70%)': [0.6, 0.7],
                'Hard (70-80%)': [0.7, 0.8],
                'Very Hard (80-90%)': [0.8, 0.9]
            };
            const [min, max] = intensities[values.intensity];
            const targetMin = Math.round(hrReserve * min + restingHR);
            const targetMax = Math.round(hrReserve * max + restingHR);
            return {
                result: `${targetMin} - ${targetMax} bpm`,
                details: `Max HR: ${maxHR} bpm<br>HR Reserve: ${hrReserve} bpm<br>Target Zone: ${targetMin} - ${targetMax} bpm`
            };
        }
    },
    {
        id: 'pregnancy-due-date',
        name: 'Pregnancy Due Date',
        icon: '👶',
        category: 'Health & Fitness',
        description: 'Calculate expected due date',
        fields: [
            { id: 'lastPeriod', label: 'First Day of Last Period', type: 'date' }
        ],
        calculate: (values) => {
            const lmp = new Date(values.lastPeriod);
            const dueDate = new Date(lmp);
            dueDate.setDate(dueDate.getDate() + 280);
            const today = new Date();
            const weeksPregnant = Math.floor((today - lmp) / (7 * 24 * 60 * 60 * 1000));
            const daysRemaining = Math.ceil((dueDate - today) / (24 * 60 * 60 * 1000));
            return {
                result: dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                details: `Due Date: ${dueDate.toLocaleDateString()}<br>Currently: ~${weeksPregnant} weeks<br>Days Remaining: ~${daysRemaining} days`
            };
        }
    },
    {
        id: 'ovulation',
        name: 'Ovulation Calculator',
        icon: '📅',
        category: 'Health & Fitness',
        description: 'Calculate ovulation date',
        fields: [
            { id: 'lastPeriod', label: 'First Day of Last Period', type: 'date' },
            { id: 'cycleLength', label: 'Average Cycle Length (days)', type: 'number', placeholder: 'e.g., 28' }
        ],
        calculate: (values) => {
            const lmp = new Date(values.lastPeriod);
            const cycle = parseFloat(values.cycleLength);
            const ovulationDay = new Date(lmp);
            ovulationDay.setDate(ovulationDay.getDate() + cycle - 14);
            const fertileStart = new Date(ovulationDay);
            fertileStart.setDate(fertileStart.getDate() - 5);
            const fertileEnd = new Date(ovulationDay);
            fertileEnd.setDate(fertileEnd.getDate() + 1);
            return {
                result: ovulationDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                details: `Estimated Ovulation: ${ovulationDay.toLocaleDateString()}<br>Fertile Window: ${fertileStart.toLocaleDateString()} - ${fertileEnd.toLocaleDateString()}`
            };
        }
    },
    {
        id: 'period-cycle',
        name: 'Period Cycle Calculator',
        icon: '🔄',
        category: 'Health & Fitness',
        description: 'Predict next period date',
        fields: [
            { id: 'lastPeriod', label: 'First Day of Last Period', type: 'date' },
            { id: 'cycleLength', label: 'Average Cycle Length (days)', type: 'number', placeholder: 'e.g., 28' }
        ],
        calculate: (values) => {
            const lmp = new Date(values.lastPeriod);
            const cycle = parseFloat(values.cycleLength);
            const nextPeriod = new Date(lmp);
            nextPeriod.setDate(nextPeriod.getDate() + cycle);
            const today = new Date();
            const daysUntil = Math.ceil((nextPeriod - today) / (24 * 60 * 60 * 1000));
            return {
                result: nextPeriod.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                details: `Next Period: ${nextPeriod.toLocaleDateString()}<br>Days Until: ${daysUntil} days`
            };
        }
    },
    {
        id: 'age-calculator',
        name: 'Age Calculator',
        icon: '🎂',
        category: 'Health & Fitness',
        description: 'Calculate exact age',
        fields: [
            { id: 'birthDate', label: 'Date of Birth', type: 'date' }
        ],
        calculate: (values) => {
            const birth = new Date(values.birthDate);
            const today = new Date();
            let years = today.getFullYear() - birth.getFullYear();
            let months = today.getMonth() - birth.getMonth();
            let days = today.getDate() - birth.getDate();
            if (days < 0) {
                months--;
                const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                days += lastMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }
            const totalDays = Math.floor((today - birth) / (24 * 60 * 60 * 1000));
            const totalWeeks = Math.floor(totalDays / 7);
            const totalMonths = years * 12 + months;
            return {
                result: `${years} years ${months} months ${days} days`,
                details: `Total Days: ${totalDays.toLocaleString()}<br>Total Weeks: ${totalWeeks.toLocaleString()}<br>Total Months: ${totalMonths}`
            };
        }
    },
    {
        id: 'sleep-cycle',
        name: 'Sleep Cycle Calculator',
        icon: '😴',
        category: 'Health & Fitness',
        description: 'Calculate optimal wake/sleep times',
        fields: [
            { id: 'type', label: 'I want to...', type: 'select', options: ['Wake up at', 'Go to sleep at'] },
            { id: 'time', label: 'Time (HH:MM)', type: 'time' }
        ],
        calculate: (values) => {
            const [hours, minutes] = values.time.split(':').map(Number);
            const time = new Date();
            time.setHours(hours, minutes, 0, 0);
            const cycles = [4, 5, 6]; // 90 min cycles
            const results = [];
            if (values.type === 'Wake up at') {
                cycles.forEach(c => {
                    const sleepTime = new Date(time);
                    sleepTime.setMinutes(sleepTime.getMinutes() - (c * 90) - 15);
                    results.push(`${c} cycles: ${sleepTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);
                });
                return {
                    result: 'Optimal sleep times',
                    details: `To wake at ${values.time}:<br>${results.join('<br>')}<br><br>(Each cycle = 90 min + 15 min to fall asleep)`
                };
            } else {
                cycles.forEach(c => {
                    const wakeTime = new Date(time);
                    wakeTime.setMinutes(wakeTime.getMinutes() + (c * 90) + 15);
                    results.push(`${c} cycles: ${wakeTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);
                });
                return {
                    result: 'Optimal wake times',
                    details: `If sleeping at ${values.time}:<br>${results.join('<br>')}`
                };
            }
        }
    },
    {
        id: 'workout-calories',
        name: 'Workout Calorie Calculator',
        icon: '💪',
        category: 'Health & Fitness',
        description: 'Calculate calories by workout type',
        fields: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'workout', label: 'Workout Type', type: 'select', options: ['Push-ups', 'Squats', 'Plank', 'Jumping Jacks', 'Burpees', 'Mountain Climbers'] },
            { id: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: 'e.g., 20' }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const duration = parseFloat(values.duration);
            const mets = {
                'Push-ups': 8,
                'Squats': 5,
                'Plank': 3,
                'Jumping Jacks': 8,
                'Burpees': 10,
                'Mountain Climbers': 8
            };
            const met = mets[values.workout];
            const calories = (met * weight * duration) / 60;
            return {
                result: Math.round(calories) + ' calories',
                details: `Workout: ${values.workout}<br>Duration: ${duration} min<br>Calories: ~${Math.round(calories)} kcal`
            };
        }
    },
    {
        id: 'fat-loss',
        name: 'Fat Loss Calculator',
        icon: '📉',
        category: 'Health & Fitness',
        description: 'Calculate time to reach fat loss goal',
        fields: [
            { id: 'current', label: 'Current Weight (kg)', type: 'number', placeholder: 'e.g., 80' },
            { id: 'target', label: 'Target Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'deficit', label: 'Daily Calorie Deficit', type: 'number', placeholder: 'e.g., 500' }
        ],
        calculate: (values) => {
            const current = parseFloat(values.current);
            const target = parseFloat(values.target);
            const deficit = parseFloat(values.deficit);
            const kgToLose = current - target;
            const caloriesToBurn = kgToLose * 7700; // 1 kg fat = 7700 calories
            const days = Math.ceil(caloriesToBurn / deficit);
            const weeks = Math.ceil(days / 7);
            return {
                result: `~${weeks} weeks`,
                details: `Weight to lose: ${kgToLose} kg<br>Daily deficit: ${deficit} kcal<br>Estimated time: ${days} days (~${weeks} weeks)<br><br>⚠️ Safe loss: 0.5-1 kg/week`
            };
        }
    },
    {
        id: 'muscle-gain-calories',
        name: 'Muscle Gain Calorie Calculator',
        icon: '💪',
        category: 'Health & Fitness',
        description: 'Calculate calories for muscle gain',
        fields: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'height', label: 'Height (cm)', type: 'number', placeholder: 'e.g., 175' },
            { id: 'age', label: 'Age (years)', type: 'number', placeholder: 'e.g., 25' },
            { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const height = parseFloat(values.height);
            const age = parseFloat(values.age);
            let bmr;
            if (values.gender === 'Male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
            const tdee = bmr * 1.55; // Moderately active
            const bulkCalories = tdee + 300;
            const protein = weight * 2;
            return {
                result: Math.round(bulkCalories) + ' kcal/day',
                details: `Maintenance: ${Math.round(tdee)} kcal<br>Muscle Gain: ${Math.round(bulkCalories)} kcal<br><br>Protein: ${Math.round(protein)}g/day<br>Carbs: ${Math.round(bulkCalories * 0.5 / 4)}g<br>Fats: ${Math.round(bulkCalories * 0.25 / 9)}g`
            };
        }
    },
    {
        id: 'running-pace',
        name: 'Running Pace Calculator',
        icon: '🏃',
        category: 'Health & Fitness',
        description: 'Calculate running pace and time',
        fields: [
            { id: 'distance', label: 'Distance (km)', type: 'number', placeholder: 'e.g., 5' },
            { id: 'hours', label: 'Hours', type: 'number', placeholder: 'e.g., 0' },
            { id: 'minutes', label: 'Minutes', type: 'number', placeholder: 'e.g., 25' },
            { id: 'seconds', label: 'Seconds', type: 'number', placeholder: 'e.g., 0' }
        ],
        calculate: (values) => {
            const distance = parseFloat(values.distance);
            const totalSeconds = parseFloat(values.hours) * 3600 + parseFloat(values.minutes) * 60 + parseFloat(values.seconds);
            const paceSeconds = totalSeconds / distance;
            const paceMin = Math.floor(paceSeconds / 60);
            const paceSec = Math.round(paceSeconds % 60);
            const speedKmh = (distance / totalSeconds) * 3600;
            return {
                result: `${paceMin}:${paceSec.toString().padStart(2, '0')} /km`,
                details: `Distance: ${distance} km<br>Time: ${values.hours}h ${values.minutes}m ${values.seconds}s<br>Pace: ${paceMin}:${paceSec.toString().padStart(2, '0')} per km<br>Speed: ${speedKmh.toFixed(2)} km/h`
            };
        }
    },
    {
        id: 'walking-distance',
        name: 'Walking Distance Calculator',
        icon: '🚶',
        category: 'Health & Fitness',
        description: 'Calculate walking distance and time',
        fields: [
            { id: 'steps', label: 'Number of Steps', type: 'number', placeholder: 'e.g., 10000' },
            { id: 'strideLength', label: 'Stride Length (cm)', type: 'number', placeholder: 'e.g., 75' }
        ],
        calculate: (values) => {
            const steps = parseFloat(values.steps);
            const stride = parseFloat(values.strideLength) / 100;
            const distance = (steps * stride) / 1000;
            const walkingSpeed = 5; // km/h average
            const time = (distance / walkingSpeed) * 60;
            return {
                result: distance.toFixed(2) + ' km',
                details: `Steps: ${steps.toLocaleString()}<br>Distance: ${distance.toFixed(2)} km<br>Estimated Time: ~${Math.round(time)} minutes`
            };
        }
    },
    {
        id: 'cycling-calories',
        name: 'Cycling Calorie Calculator',
        icon: '🚴',
        category: 'Health & Fitness',
        description: 'Calculate calories burned cycling',
        fields: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'speed', label: 'Average Speed', type: 'select', options: ['Leisure (<16 km/h)', 'Moderate (16-20 km/h)', 'Fast (20-25 km/h)', 'Racing (>25 km/h)'] },
            { id: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: 'e.g., 60' }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const duration = parseFloat(values.duration);
            const mets = {
                'Leisure (<16 km/h)': 4,
                'Moderate (16-20 km/h)': 6.8,
                'Fast (20-25 km/h)': 8,
                'Racing (>25 km/h)': 10
            };
            const met = mets[values.speed];
            const calories = (met * weight * duration) / 60;
            return {
                result: Math.round(calories) + ' calories',
                details: `Speed: ${values.speed}<br>Duration: ${duration} min<br>Calories: ~${Math.round(calories)} kcal`
            };
        }
    },
    {
        id: 'blood-pressure',
        name: 'Blood Pressure Calculator',
        icon: '🩺',
        category: 'Health & Fitness',
        description: 'Check blood pressure level',
        fields: [
            { id: 'systolic', label: 'Systolic (upper number)', type: 'number', placeholder: 'e.g., 120' },
            { id: 'diastolic', label: 'Diastolic (lower number)', type: 'number', placeholder: 'e.g., 80' }
        ],
        calculate: (values) => {
            const sys = parseFloat(values.systolic);
            const dia = parseFloat(values.diastolic);
            let category, emoji;
            if (sys < 120 && dia < 80) { category = 'Normal'; emoji = '✅'; }
            else if (sys < 130 && dia < 80) { category = 'Elevated'; emoji = '⚠️'; }
            else if (sys < 140 || dia < 90) { category = 'High BP Stage 1'; emoji = '🔶'; }
            else if (sys >= 140 || dia >= 90) { category = 'High BP Stage 2'; emoji = '🔴'; }
            if (sys > 180 || dia > 120) { category = 'Hypertensive Crisis'; emoji = '🚨'; }
            return {
                result: `${emoji} ${category}`,
                details: `Reading: ${sys}/${dia} mmHg<br>Category: ${category}<br><br>Normal: <120/80<br>Elevated: 120-129/<80`
            };
        }
    },
    {
        id: 'blood-sugar',
        name: 'Blood Sugar Level Calculator',
        icon: '🩸',
        category: 'Health & Fitness',
        description: 'Check blood sugar category',
        fields: [
            { id: 'level', label: 'Blood Sugar Level (mg/dL)', type: 'number', placeholder: 'e.g., 100' },
            { id: 'type', label: 'Measurement Type', type: 'select', options: ['Fasting', 'After Meal (2 hours)', 'Random'] }
        ],
        calculate: (values) => {
            const level = parseFloat(values.level);
            const type = values.type;
            let category, emoji;
            if (type === 'Fasting') {
                if (level < 100) { category = 'Normal'; emoji = '✅'; }
                else if (level < 126) { category = 'Prediabetes'; emoji = '⚠️'; }
                else { category = 'Diabetes'; emoji = '🔴'; }
            } else if (type === 'After Meal (2 hours)') {
                if (level < 140) { category = 'Normal'; emoji = '✅'; }
                else if (level < 200) { category = 'Prediabetes'; emoji = '⚠️'; }
                else { category = 'Diabetes'; emoji = '🔴'; }
            } else {
                if (level < 140) { category = 'Normal'; emoji = '✅'; }
                else if (level < 200) { category = 'Elevated'; emoji = '⚠️'; }
                else { category = 'High'; emoji = '🔴'; }
            }
            return {
                result: `${emoji} ${category}`,
                details: `Level: ${level} mg/dL (${type})<br>Category: ${category}`
            };
        }
    },
    {
        id: 'medicine-dosage',
        name: 'Medicine Dosage Calculator',
        icon: '💊',
        category: 'Health & Fitness',
        description: 'Calculate medicine dosage by weight',
        fields: [
            { id: 'weight', label: 'Body Weight (kg)', type: 'number', placeholder: 'e.g., 70' },
            { id: 'dosePerKg', label: 'Dose per kg (mg/kg)', type: 'number', placeholder: 'e.g., 10' },
            { id: 'frequency', label: 'Doses per Day', type: 'number', placeholder: 'e.g., 3' }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const dosePerKg = parseFloat(values.dosePerKg);
            const frequency = parseFloat(values.frequency);
            const totalDaily = weight * dosePerKg;
            const perDose = totalDaily / frequency;
            return {
                result: perDose.toFixed(1) + ' mg/dose',
                details: `Body Weight: ${weight} kg<br>Total Daily: ${totalDaily} mg<br>Per Dose: ${perDose.toFixed(1)} mg<br>Frequency: ${frequency}x/day<br><br>⚠️ Always consult a doctor!`
            };
        }
    },
    {
        id: 'bmi-kids',
        name: 'BMI Calculator for Kids',
        icon: '👶',
        category: 'Health & Fitness',
        description: 'Calculate BMI for children',
        fields: [
            { id: 'weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 25' },
            { id: 'height', label: 'Height (cm)', type: 'number', placeholder: 'e.g., 120' },
            { id: 'age', label: 'Age (years)', type: 'number', placeholder: 'e.g., 8' },
            { id: 'gender', label: 'Gender', type: 'select', options: ['Boy', 'Girl'] }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const height = parseFloat(values.height) / 100;
            const bmi = weight / (height * height);
            // Simplified interpretation for children
            return {
                result: bmi.toFixed(1) + ' BMI',
                details: `BMI: ${bmi.toFixed(2)}<br><br>For children, BMI is compared to growth charts.<br>Consult a pediatrician for accurate assessment.`
            };
        }
    },
    {
        id: 'fitness-progress',
        name: 'Fitness Progress Calculator',
        icon: '📈',
        category: 'Health & Fitness',
        description: 'Track weight change progress',
        fields: [
            { id: 'startWeight', label: 'Starting Weight (kg)', type: 'number', placeholder: 'e.g., 85' },
            { id: 'currentWeight', label: 'Current Weight (kg)', type: 'number', placeholder: 'e.g., 78' },
            { id: 'targetWeight', label: 'Target Weight (kg)', type: 'number', placeholder: 'e.g., 70' }
        ],
        calculate: (values) => {
            const start = parseFloat(values.startWeight);
            const current = parseFloat(values.currentWeight);
            const target = parseFloat(values.targetWeight);
            const lost = start - current;
            const remaining = current - target;
            const total = start - target;
            const progress = ((lost / total) * 100);
            return {
                result: progress.toFixed(1) + '% complete',
                details: `Lost: ${lost.toFixed(1)} kg<br>Remaining: ${remaining.toFixed(1)} kg<br>Progress: ${progress.toFixed(1)}%<br><br>Keep going! 💪`
            };
        }
    },
    {
        id: 'calories-food',
        name: 'Calories from Food Calculator',
        icon: '🍔',
        category: 'Health & Fitness',
        description: 'Calculate calories from macros',
        fields: [
            { id: 'protein', label: 'Protein (grams)', type: 'number', placeholder: 'e.g., 30' },
            { id: 'carbs', label: 'Carbohydrates (grams)', type: 'number', placeholder: 'e.g., 50' },
            { id: 'fat', label: 'Fat (grams)', type: 'number', placeholder: 'e.g., 15' }
        ],
        calculate: (values) => {
            const protein = parseFloat(values.protein);
            const carbs = parseFloat(values.carbs);
            const fat = parseFloat(values.fat);
            const proteinCal = protein * 4;
            const carbsCal = carbs * 4;
            const fatCal = fat * 9;
            const total = proteinCal + carbsCal + fatCal;
            return {
                result: total + ' calories',
                details: `Protein: ${protein}g × 4 = ${proteinCal} kcal<br>Carbs: ${carbs}g × 4 = ${carbsCal} kcal<br>Fat: ${fat}g × 9 = ${fatCal} kcal<br><br>Total: ${total} kcal`
            };
        }
    },
    {
        id: 'macro-calculator',
        name: 'Macro Nutrients Calculator',
        icon: '🥗',
        category: 'Health & Fitness',
        description: 'Calculate daily macro needs',
        fields: [
            { id: 'calories', label: 'Daily Calories', type: 'number', placeholder: 'e.g., 2000' },
            { id: 'goal', label: 'Goal', type: 'select', options: ['Balanced', 'Low Carb', 'High Protein', 'Keto'] }
        ],
        calculate: (values) => {
            const calories = parseFloat(values.calories);
            const ratios = {
                'Balanced': { protein: 0.30, carbs: 0.40, fat: 0.30 },
                'Low Carb': { protein: 0.35, carbs: 0.25, fat: 0.40 },
                'High Protein': { protein: 0.40, carbs: 0.35, fat: 0.25 },
                'Keto': { protein: 0.25, carbs: 0.05, fat: 0.70 }
            };
            const r = ratios[values.goal];
            const protein = (calories * r.protein) / 4;
            const carbs = (calories * r.carbs) / 4;
            const fat = (calories * r.fat) / 9;
            return {
                result: `${values.goal} Diet`,
                details: `For ${calories} kcal/day:<br><br>Protein: ${Math.round(protein)}g (${r.protein * 100}%)<br>Carbs: ${Math.round(carbs)}g (${r.carbs * 100}%)<br>Fat: ${Math.round(fat)}g (${r.fat * 100}%)`
            };
        }
    },
    {
        id: 'rest-day',
        name: 'Rest Day Calculator',
        icon: '🛏️',
        category: 'Health & Fitness',
        description: 'Calculate optimal rest days',
        fields: [
            { id: 'workoutDays', label: 'Workout Days per Week', type: 'number', placeholder: 'e.g., 5' },
            { id: 'intensity', label: 'Workout Intensity', type: 'select', options: ['Light', 'Moderate', 'Intense', 'Very Intense'] }
        ],
        calculate: (values) => {
            const days = parseFloat(values.workoutDays);
            const intensityRest = {
                'Light': 1,
                'Moderate': 2,
                'Intense': 2,
                'Very Intense': 3
            };
            const recommendedRest = intensityRest[values.intensity];
            const actualRest = 7 - days;
            const adequate = actualRest >= recommendedRest;
            return {
                result: adequate ? '✅ Adequate rest' : '⚠️ Need more rest',
                details: `Workout Days: ${days}/week<br>Rest Days: ${actualRest}/week<br>Recommended Rest: ${recommendedRest}+ days<br><br>${adequate ? 'Your rest schedule is good!' : 'Consider adding more rest days for recovery.'}`
            };
        }
    }
];

// Export for use in main app
if (typeof window !== 'undefined') {
    window.healthCalculators = healthCalculators;
}
