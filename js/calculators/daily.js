// Daily Life & Misc Calculators (181-210)
const dailyCalculators = [
    {
        id: 'age-difference', name: 'Age Difference Calculator', icon: '👫', category: 'Daily Life', description: 'Calculate age gap',
        fields: [{ id: 'dob1', label: 'Person 1 DOB', type: 'date' }, { id: 'dob2', label: 'Person 2 DOB', type: 'date' }],
        calculate: (v) => { const d1 = new Date(v.dob1), d2 = new Date(v.dob2); const diff = Math.abs(d1 - d2); const yrs = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000)), days = Math.floor((diff % (365.25 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)); return { result: `${yrs} years ${days} days`, details: `Age difference: ${yrs} years ${days} days` }; }
    },
    {
        id: 'date-difference', name: 'Date Difference Calculator', icon: '📅', category: 'Daily Life', description: 'Days between dates',
        fields: [{ id: 'date1', label: 'Start Date', type: 'date' }, { id: 'date2', label: 'End Date', type: 'date' }],
        calculate: (v) => { const d1 = new Date(v.date1), d2 = new Date(v.date2); const diff = Math.abs(d2 - d1); const days = Math.floor(diff / (24 * 60 * 60 * 1000)); const weeks = Math.floor(days / 7); return { result: `${days} days`, details: `${days} days (${weeks} weeks ${days % 7} days)` }; }
    },
    {
        id: 'days-until', name: 'Days Until Event', icon: '🎯', category: 'Daily Life', description: 'Countdown to event',
        fields: [{ id: 'event', label: 'Event Date', type: 'date' }],
        calculate: (v) => { const event = new Date(v.event), today = new Date(); today.setHours(0, 0, 0, 0); const diff = event - today; const days = Math.ceil(diff / (24 * 60 * 60 * 1000)); if (days < 0) return { result: `${Math.abs(days)} days ago`, details: 'This date has passed' }; return { result: `${days} days to go`, details: `${days} days remaining<br>${Math.floor(days / 7)} weeks ${days % 7} days` }; }
    },
    {
        id: 'birthday-countdown', name: 'Birthday Countdown', icon: '🎂', category: 'Daily Life', description: 'Days until birthday',
        fields: [{ id: 'month', label: 'Birth Month (1-12)', type: 'number', placeholder: '6' }, { id: 'day', label: 'Birth Day', type: 'number', placeholder: '15' }],
        calculate: (v) => { const today = new Date(), year = today.getFullYear(); let bday = new Date(year, parseInt(v.month) - 1, parseInt(v.day)); if (bday < today) bday.setFullYear(year + 1); const days = Math.ceil((bday - today) / (24 * 60 * 60 * 1000)); return { result: `${days} days`, details: `Next birthday: ${bday.toLocaleDateString()}<br>${days} days to go! 🎉` }; }
    },
    {
        id: 'anniversary', name: 'Anniversary Calculator', icon: '💕', category: 'Daily Life', description: 'Calculate anniversary milestones',
        fields: [{ id: 'date', label: 'Anniversary Date', type: 'date' }],
        calculate: (v) => { const anni = new Date(v.date), today = new Date(); const years = today.getFullYear() - anni.getFullYear(); const days = Math.floor((today - anni) / (24 * 60 * 60 * 1000)); return { result: `${years} years`, details: `Together since: ${anni.toLocaleDateString()}<br>Years: ${years}<br>Total days: ${days.toLocaleString()} 💕` }; }
    },
    {
        id: 'love-percentage', name: 'Love Percentage 💕', icon: '❤️', category: 'Daily Life', description: 'Fun love compatibility',
        fields: [{ id: 'name1', label: 'Your Name', type: 'text', placeholder: 'Name 1' }, { id: 'name2', label: 'Partner Name', type: 'text', placeholder: 'Name 2' }],
        calculate: (v) => { const combined = (v.name1 + v.name2).toLowerCase(); let hash = 0; for (let i = 0; i < combined.length; i++) hash = combined.charCodeAt(i) + ((hash << 5) - hash); const pct = Math.abs(hash % 101); let msg; if (pct >= 80) msg = '🔥 Perfect Match!'; else if (pct >= 60) msg = '💕 Great Compatibility!'; else if (pct >= 40) msg = '💝 Good Potential!'; else msg = '💔 Keep trying!'; return { result: `${pct}% 💕`, details: `${v.name1} + ${v.name2}<br>Love Score: ${pct}%<br>${msg}` }; }
    },
    {
        id: 'fuel-cost', name: 'Fuel Cost Calculator', icon: '⛽', category: 'Daily Life', description: 'Calculate trip fuel cost',
        fields: [{ id: 'distance', label: 'Distance (km)', type: 'number', placeholder: '200' }, { id: 'mileage', label: 'Mileage (km/l)', type: 'number', placeholder: '15' }, { id: 'price', label: 'Fuel Price (₹/l)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const dist = parseFloat(v.distance), mil = parseFloat(v.mileage), price = parseFloat(v.price); const liters = dist / mil, cost = liters * price; return { result: '₹' + cost.toFixed(0), details: `Distance: ${dist} km<br>Fuel needed: ${liters.toFixed(2)} L<br>Cost: ₹${cost.toFixed(0)}` }; }
    },
    {
        id: 'mileage', name: 'Mileage Calculator', icon: '🚗', category: 'Daily Life', description: 'Calculate vehicle mileage',
        fields: [{ id: 'distance', label: 'Distance Traveled (km)', type: 'number', placeholder: '300' }, { id: 'fuel', label: 'Fuel Used (liters)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const dist = parseFloat(v.distance), fuel = parseFloat(v.fuel); const mileage = dist / fuel; return { result: mileage.toFixed(2) + ' km/l', details: `Distance: ${dist} km<br>Fuel: ${fuel} L<br>Mileage: ${mileage.toFixed(2)} km/l` }; }
    },
    {
        id: 'travel-time', name: 'Travel Time Calculator', icon: '🚗', category: 'Daily Life', description: 'Calculate travel time',
        fields: [{ id: 'distance', label: 'Distance (km)', type: 'number', placeholder: '200' }, { id: 'speed', label: 'Average Speed (km/h)', type: 'number', placeholder: '60' }],
        calculate: (v) => { const dist = parseFloat(v.distance), speed = parseFloat(v.speed); const hrs = dist / speed; const h = Math.floor(hrs), m = Math.round((hrs % 1) * 60); return { result: `${h}h ${m}m`, details: `Distance: ${dist} km<br>Speed: ${speed} km/h<br>Time: ${h} hours ${m} minutes` }; }
    },
    {
        id: 'electricity-bill', name: 'Electricity Bill Calculator', icon: '💡', category: 'Daily Life', description: 'Estimate electricity bill',
        fields: [{ id: 'units', label: 'Units Consumed', type: 'number', placeholder: '200' }, { id: 'rate', label: 'Rate per Unit (₹)', type: 'number', placeholder: '5' }, { id: 'fixed', label: 'Fixed Charges (₹)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const units = parseFloat(v.units), rate = parseFloat(v.rate), fixed = parseFloat(v.fixed); const energy = units * rate, total = energy + fixed; return { result: '₹' + total.toFixed(0), details: `Units: ${units}<br>Energy: ₹${energy.toFixed(0)}<br>Fixed: ₹${fixed}<br>Total: ₹${total.toFixed(0)}` }; }
    },
    {
        id: 'water-bill', name: 'Water Bill Calculator', icon: '💧', category: 'Daily Life', description: 'Estimate water bill',
        fields: [{ id: 'liters', label: 'Liters Used', type: 'number', placeholder: '10000' }, { id: 'rate', label: 'Rate per 1000L (₹)', type: 'number', placeholder: '20' }, { id: 'fixed', label: 'Fixed Charges (₹)', type: 'number', placeholder: '50' }],
        calculate: (v) => { const liters = parseFloat(v.liters), rate = parseFloat(v.rate), fixed = parseFloat(v.fixed); const usage = (liters / 1000) * rate, total = usage + fixed; return { result: '₹' + total.toFixed(0), details: `Usage: ${liters} L<br>Usage Charge: ₹${usage.toFixed(0)}<br>Fixed: ₹${fixed}<br>Total: ₹${total.toFixed(0)}` }; }
    },
    {
        id: 'mobile-data', name: 'Mobile Data Usage Calculator', icon: '📱', category: 'Daily Life', description: 'Track data usage',
        fields: [{ id: 'daily', label: 'Daily Usage (GB)', type: 'number', placeholder: '1.5' }, { id: 'plan', label: 'Plan Data (GB)', type: 'number', placeholder: '50' }, { id: 'daysUsed', label: 'Days Used', type: 'number', placeholder: '10' }],
        calculate: (v) => { const daily = parseFloat(v.daily), plan = parseFloat(v.plan), days = parseInt(v.daysUsed); const used = daily * days, remaining = plan - used, daysLeft = remaining / daily; return { result: remaining.toFixed(1) + ' GB left', details: `Used: ${used.toFixed(1)} GB<br>Remaining: ${remaining.toFixed(1)} GB<br>Days left at this rate: ${daysLeft.toFixed(0)}` }; }
    },
    {
        id: 'internet-speed', name: 'Internet Speed Calculator', icon: '🌐', category: 'Daily Life', description: 'Calculate download time',
        fields: [{ id: 'size', label: 'File Size (GB)', type: 'number', placeholder: '5' }, { id: 'speed', label: 'Speed (Mbps)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const size = parseFloat(v.size) * 1024 * 8; const speed = parseFloat(v.speed); const secs = size / speed; const mins = Math.floor(secs / 60), sec = Math.round(secs % 60); return { result: `${mins}m ${sec}s`, details: `File: ${v.size} GB<br>Speed: ${v.speed} Mbps<br>Time: ${mins} min ${sec} sec` }; }
    },
    {
        id: 'screen-time', name: 'Screen Time Calculator', icon: '📺', category: 'Daily Life', description: 'Calculate weekly screen time',
        fields: [{ id: 'daily', label: 'Daily Screen Time (hours)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const daily = parseFloat(v.daily); const weekly = daily * 7, monthly = daily * 30, yearly = daily * 365; return { result: weekly.toFixed(0) + ' hrs/week', details: `Daily: ${daily}h<br>Weekly: ${weekly.toFixed(0)}h<br>Monthly: ${monthly.toFixed(0)}h<br>Yearly: ${yearly.toFixed(0)}h 😱` }; }
    },
    {
        id: 'carbon-footprint', name: 'Carbon Footprint Calculator', icon: '🌍', category: 'Daily Life', description: 'Estimate carbon footprint',
        fields: [{ id: 'electricity', label: 'Electricity (kWh/month)', type: 'number', placeholder: '300' }, { id: 'driving', label: 'Driving (km/month)', type: 'number', placeholder: '1000' }, { id: 'flights', label: 'Flight Hours/year', type: 'number', placeholder: '10' }],
        calculate: (v) => { const elec = parseFloat(v.electricity) * 0.5; const drive = parseFloat(v.driving) * 0.21; const flight = parseFloat(v.flights) * 250 / 12; const monthly = elec + drive + flight; return { result: monthly.toFixed(0) + ' kg CO₂/month', details: `Electricity: ${elec.toFixed(0)} kg<br>Driving: ${drive.toFixed(0)} kg<br>Flights: ${flight.toFixed(0)} kg<br>Total: ${monthly.toFixed(0)} kg CO₂` }; }
    },
    {
        id: 'tree-age', name: 'Tree Age Calculator', icon: '🌳', category: 'Daily Life', description: 'Estimate tree age from circumference',
        fields: [{ id: 'circumference', label: 'Trunk Circumference (inches)', type: 'number', placeholder: '60' }, { id: 'type', label: 'Tree Type', type: 'select', options: ['Oak', 'Pine', 'Maple', 'Birch'] }],
        calculate: (v) => { const circ = parseFloat(v.circumference); const factors = { Oak: 4, Pine: 3.5, Maple: 4.5, Birch: 5 }; const diameter = circ / Math.PI; const age = diameter * factors[v.type]; return { result: `~${Math.round(age)} years`, details: `Circumference: ${circ}"<br>Diameter: ${diameter.toFixed(1)}"<br>Estimated Age: ~${Math.round(age)} years` }; }
    },
    {
        id: 'population-growth', name: 'Population Growth Calculator', icon: '👥', category: 'Daily Life', description: 'Project population growth',
        fields: [{ id: 'current', label: 'Current Population', type: 'number', placeholder: '1000000' }, { id: 'rate', label: 'Growth Rate (%/year)', type: 'number', placeholder: '1.5' }, { id: 'years', label: 'Years', type: 'number', placeholder: '10' }],
        calculate: (v) => { const pop = parseFloat(v.current), rate = parseFloat(v.rate) / 100, yrs = parseInt(v.years); const future = pop * Math.pow(1 + rate, yrs); return { result: future.toLocaleString(undefined, { maximumFractionDigits: 0 }), details: `Current: ${pop.toLocaleString()}<br>Growth: ${v.rate}%/year<br>After ${yrs} years: ${future.toLocaleString(undefined, { maximumFractionDigits: 0 })}` }; }
    },
    {
        id: 'voting-age', name: 'Voting Age Eligibility', icon: '🗳️', category: 'Daily Life', description: 'Check voting eligibility',
        fields: [{ id: 'dob', label: 'Date of Birth', type: 'date' }],
        calculate: (v) => { const dob = new Date(v.dob), today = new Date(); let age = today.getFullYear() - dob.getFullYear(); if (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate())) age--; const eligible = age >= 18; if (!eligible) { const wait = new Date(dob); wait.setFullYear(wait.getFullYear() + 18); const days = Math.ceil((wait - today) / (24 * 60 * 60 * 1000)); return { result: '❌ Not Eligible', details: `Age: ${age}<br>Wait ${days} days (${wait.toLocaleDateString()})` }; } return { result: '✅ Eligible', details: `Age: ${age}<br>You can vote! 🗳️` }; }
    },
    {
        id: 'retirement-age', name: 'Retirement Age Calculator', icon: '🎯', category: 'Daily Life', description: 'Calculate retirement date',
        fields: [{ id: 'dob', label: 'Date of Birth', type: 'date' }, { id: 'retireAge', label: 'Retirement Age', type: 'number', placeholder: '60' }],
        calculate: (v) => { const dob = new Date(v.dob), retireAge = parseInt(v.retireAge); const retireDate = new Date(dob); retireDate.setFullYear(retireDate.getFullYear() + retireAge); const today = new Date(); const days = Math.ceil((retireDate - today) / (24 * 60 * 60 * 1000)); const years = Math.floor(days / 365); if (days < 0) return { result: '🎉 Already Retired!', details: `Retirement date passed` }; return { result: retireDate.toLocaleDateString(), details: `Retire at: ${retireAge}<br>Date: ${retireDate.toLocaleDateString()}<br>${years} years to go` }; }
    },
    {
        id: 'life-expectancy', name: 'Life Expectancy Calculator', icon: '⏳', category: 'Daily Life', description: 'Estimate life expectancy',
        fields: [{ id: 'age', label: 'Current Age', type: 'number', placeholder: '30' }, { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] }, { id: 'lifestyle', label: 'Lifestyle', type: 'select', options: ['Healthy', 'Average', 'Unhealthy'] }],
        calculate: (v) => { const base = v.gender === 'Male' ? 76 : 82; const adj = { Healthy: 5, Average: 0, Unhealthy: -5 }[v.lifestyle]; const exp = base + adj; const remaining = exp - parseInt(v.age); return { result: `~${exp} years`, details: `Estimated lifespan: ${exp} years<br>Years remaining: ~${remaining} years<br>Make them count! 💪` }; }
    },
    {
        id: 'zodiac-sign', name: 'Zodiac Sign Calculator', icon: '⭐', category: 'Daily Life', description: 'Find your zodiac sign',
        fields: [{ id: 'month', label: 'Birth Month (1-12)', type: 'number', placeholder: '6' }, { id: 'day', label: 'Birth Day', type: 'number', placeholder: '15' }],
        calculate: (v) => { const m = parseInt(v.month), d = parseInt(v.day); const signs = [['Capricorn', '♑'], ['Aquarius', '♒'], ['Pisces', '♓'], ['Aries', '♈'], ['Taurus', '♉'], ['Gemini', '♊'], ['Cancer', '♋'], ['Leo', '♌'], ['Virgo', '♍'], ['Libra', '♎'], ['Scorpio', '♏'], ['Sagittarius', '♐'], ['Capricorn', '♑']]; const dates = [20, 19, 20, 20, 21, 21, 22, 23, 23, 23, 22, 21]; let sign = d < dates[m - 1] ? signs[m - 1] : signs[m]; return { result: `${sign[1]} ${sign[0]}`, details: `Birth: ${m}/${d}<br>Zodiac: ${sign[0]} ${sign[1]}` }; }
    },
    {
        id: 'numerology', name: 'Numerology Calculator', icon: '🔢', category: 'Daily Life', description: 'Calculate life path number',
        fields: [{ id: 'dob', label: 'Date of Birth', type: 'date' }],
        calculate: (v) => { const dob = v.dob.replace(/-/g, ''); let sum = dob.split('').reduce((a, b) => a + parseInt(b), 0); while (sum > 9 && sum !== 11 && sum !== 22) sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0); const meanings = { 1: 'Leader', 2: 'Peacemaker', 3: 'Creative', 4: 'Builder', 5: 'Adventurer', 6: 'Nurturer', 7: 'Seeker', 8: 'Achiever', 9: 'Humanitarian', 11: 'Intuitive', 22: 'Master Builder' }; return { result: `Life Path: ${sum}`, details: `Your number: ${sum}<br>Meaning: ${meanings[sum] || 'Special'}` }; }
    },
    {
        id: 'name-compatibility', name: 'Name Compatibility', icon: '💑', category: 'Daily Life', description: 'Check name compatibility',
        fields: [{ id: 'name1', label: 'Name 1', type: 'text', placeholder: 'Your name' }, { id: 'name2', label: 'Name 2', type: 'text', placeholder: 'Partner name' }],
        calculate: (v) => { const reduce = (name) => { let sum = 0; name.toLowerCase().split('').forEach(c => { if (c >= 'a' && c <= 'z') sum += c.charCodeAt(0) - 96; }); while (sum > 9) sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0); return sum; }; const n1 = reduce(v.name1), n2 = reduce(v.name2); const compat = 100 - Math.abs(n1 - n2) * 10; return { result: `${Math.max(0, compat)}% compatible`, details: `${v.name1}: ${n1}<br>${v.name2}: ${n2}<br>Compatibility: ${Math.max(0, compat)}%` }; }
    },
    {
        id: 'lucky-number', name: 'Lucky Number Calculator', icon: '🍀', category: 'Daily Life', description: 'Find your lucky number',
        fields: [{ id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' }, { id: 'dob', label: 'Date of Birth', type: 'date' }],
        calculate: (v) => { let sum = 0; v.name.toLowerCase().split('').forEach(c => { if (c >= 'a' && c <= 'z') sum += c.charCodeAt(0) - 96; }); const d = new Date(v.dob); sum += d.getDate() + (d.getMonth() + 1) + d.getFullYear(); while (sum > 9) sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0); return { result: `🍀 ${sum}`, details: `Your lucky number: ${sum}` }; }
    },
    {
        id: 'event-budget', name: 'Event Budget Calculator', icon: '🎉', category: 'Daily Life', description: 'Plan event budget',
        fields: [{ id: 'guests', label: 'Number of Guests', type: 'number', placeholder: '50' }, { id: 'perHead', label: 'Cost per Head (₹)', type: 'number', placeholder: '1000' }, { id: 'venue', label: 'Venue Cost (₹)', type: 'number', placeholder: '20000' }, { id: 'misc', label: 'Misc Expenses (₹)', type: 'number', placeholder: '10000' }],
        calculate: (v) => { const guests = parseInt(v.guests), perHead = parseFloat(v.perHead), venue = parseFloat(v.venue), misc = parseFloat(v.misc); const catering = guests * perHead, total = catering + venue + misc; return { result: '₹' + total.toLocaleString(), details: `Catering: ₹${catering.toLocaleString()}<br>Venue: ₹${venue.toLocaleString()}<br>Misc: ₹${misc.toLocaleString()}<br>Total: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'wedding-cost', name: 'Wedding Cost Calculator', icon: '💒', category: 'Daily Life', description: 'Estimate wedding cost',
        fields: [{ id: 'guests', label: 'Guest Count', type: 'number', placeholder: '200' }, { id: 'tier', label: 'Budget Tier', type: 'select', options: ['Budget', 'Standard', 'Premium', 'Luxury'] }],
        calculate: (v) => { const guests = parseInt(v.guests); const rates = { Budget: 2000, Standard: 5000, Premium: 10000, Luxury: 25000 }; const perGuest = rates[v.tier]; const base = guests * perGuest; const venue = base * 0.3, decor = base * 0.15, photo = base * 0.1; const total = base + venue + decor + photo; return { result: '₹' + total.toLocaleString(), details: `${v.tier} tier<br>Catering: ₹${base.toLocaleString()}<br>Venue: ₹${venue.toLocaleString()}<br>Decor: ₹${decor.toLocaleString()}<br>Photo: ₹${photo.toLocaleString()}<br>Total: ~₹${total.toLocaleString()}` }; }
    },
    {
        id: 'rent-split', name: 'House Rent Split Calculator', icon: '🏠', category: 'Daily Life', description: 'Split rent among roommates',
        fields: [{ id: 'rent', label: 'Total Rent (₹)', type: 'number', placeholder: '30000' }, { id: 'people', label: 'Number of People', type: 'number', placeholder: '3' }, { id: 'utilities', label: 'Utilities (₹)', type: 'number', placeholder: '3000' }],
        calculate: (v) => { const rent = parseFloat(v.rent), people = parseInt(v.people), util = parseFloat(v.utilities); const total = rent + util; const perPerson = total / people; return { result: '₹' + perPerson.toFixed(0) + '/person', details: `Rent: ₹${rent.toLocaleString()}<br>Utilities: ₹${util.toLocaleString()}<br>Total: ₹${total.toLocaleString()}<br>Each pays: ₹${perPerson.toFixed(0)}` }; }
    },
    {
        id: 'emi-vs-rent', name: 'EMI vs Rent Calculator', icon: '🏠', category: 'Daily Life', description: 'Compare EMI vs paying rent',
        fields: [{ id: 'rent', label: 'Monthly Rent (₹)', type: 'number', placeholder: '25000' }, { id: 'emi', label: 'Home Loan EMI (₹)', type: 'number', placeholder: '35000' }, { id: 'years', label: 'Comparison Years', type: 'number', placeholder: '20' }],
        calculate: (v) => { const rent = parseFloat(v.rent), emi = parseFloat(v.emi), years = parseInt(v.years); const totalRent = rent * 12 * years; const totalEmi = emi * 12 * years; const diff = totalRent - totalEmi; return { result: diff > 0 ? 'Buy is better' : 'Rent is better', details: `${years} year comparison:<br>Total Rent: ₹${totalRent.toLocaleString()}<br>Total EMI: ₹${totalEmi.toLocaleString()}<br>Difference: ₹${Math.abs(diff).toLocaleString()}<br>(Property value not considered)` }; }
    },
    {
        id: 'subscription', name: 'Subscription Cost Calculator', icon: '📺', category: 'Daily Life', description: 'Calculate total subscriptions',
        fields: [{ id: 'netflix', label: 'Netflix (₹)', type: 'number', placeholder: '649' }, { id: 'prime', label: 'Prime (₹/month)', type: 'number', placeholder: '179' }, { id: 'spotify', label: 'Spotify (₹)', type: 'number', placeholder: '119' }, { id: 'other', label: 'Other (₹)', type: 'number', placeholder: '200' }],
        calculate: (v) => { const n = parseFloat(v.netflix) || 0, p = parseFloat(v.prime) || 0, s = parseFloat(v.spotify) || 0, o = parseFloat(v.other) || 0; const monthly = n + p + s + o, yearly = monthly * 12; return { result: '₹' + monthly + '/month', details: `Netflix: ₹${n}<br>Prime: ₹${p}<br>Spotify: ₹${s}<br>Other: ₹${o}<br><br>Monthly: ₹${monthly}<br>Yearly: ₹${yearly.toLocaleString()}` }; }
    },
    {
        id: 'monthly-bills', name: 'Monthly Bills Calculator', icon: '💸', category: 'Daily Life', description: 'Total monthly expenses',
        fields: [{ id: 'rent', label: 'Rent/EMI (₹)', type: 'number', placeholder: '20000' }, { id: 'electricity', label: 'Electricity (₹)', type: 'number', placeholder: '1500' }, { id: 'internet', label: 'Internet (₹)', type: 'number', placeholder: '800' }, { id: 'phone', label: 'Phone (₹)', type: 'number', placeholder: '500' }, { id: 'grocery', label: 'Groceries (₹)', type: 'number', placeholder: '8000' }],
        calculate: (v) => { const items = [parseFloat(v.rent), parseFloat(v.electricity), parseFloat(v.internet), parseFloat(v.phone), parseFloat(v.grocery)]; const total = items.reduce((a, b) => a + (b || 0), 0); return { result: '₹' + total.toLocaleString(), details: `Rent: ₹${v.rent}<br>Electricity: ₹${v.electricity}<br>Internet: ₹${v.internet}<br>Phone: ₹${v.phone}<br>Groceries: ₹${v.grocery}<br><br>Total: ₹${total.toLocaleString()}/month` }; }
    }
];
if (typeof window !== 'undefined') window.dailyCalculators = dailyCalculators;
