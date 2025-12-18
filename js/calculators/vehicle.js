// Vehicle & Transport Calculators (30)
const vehicleCalculators = [
    {
        id: 'car-loan-emi', name: 'Car Loan EMI Calculator', icon: '🚗', category: 'Vehicle & Transport', description: 'Calculate car loan EMI',
        fields: [{ id: 'price', label: 'Car Price (₹)', type: 'number', placeholder: '800000' }, { id: 'down', label: 'Down Payment (₹)', type: 'number', placeholder: '200000' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '9' }, { id: 'tenure', label: 'Tenure (years)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const P = parseFloat(v.price) - parseFloat(v.down), r = parseFloat(v.rate) / 12 / 100, n = parseFloat(v.tenure) * 12; const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); const total = emi * n, interest = total - P; return { result: '₹' + emi.toFixed(0) + '/month', details: `Loan: ₹${P.toLocaleString()}<br>EMI: ₹${emi.toFixed(0)}<br>Total Interest: ₹${interest.toFixed(0).toLocaleString()}` }; }
    },
    {
        id: 'bike-loan-emi', name: 'Bike Loan EMI Calculator', icon: '🏍️', category: 'Vehicle & Transport', description: 'Calculate bike loan EMI',
        fields: [{ id: 'price', label: 'Bike Price (₹)', type: 'number', placeholder: '150000' }, { id: 'down', label: 'Down Payment (₹)', type: 'number', placeholder: '30000' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '12' }, { id: 'tenure', label: 'Tenure (months)', type: 'number', placeholder: '36' }],
        calculate: (v) => { const P = parseFloat(v.price) - parseFloat(v.down), r = parseFloat(v.rate) / 12 / 100, n = parseFloat(v.tenure); const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); return { result: '₹' + emi.toFixed(0) + '/month', details: `Loan: ₹${P.toLocaleString()}<br>EMI: ₹${emi.toFixed(0)}` }; }
    },
    {
        id: 'vehicle-affordability', name: 'Vehicle Affordability', icon: '💰', category: 'Vehicle & Transport', description: 'How much car can you afford',
        fields: [{ id: 'income', label: 'Monthly Income (₹)', type: 'number', placeholder: '80000' }, { id: 'expenses', label: 'Monthly Expenses (₹)', type: 'number', placeholder: '40000' }],
        calculate: (v) => { const income = parseFloat(v.income), exp = parseFloat(v.expenses); const maxEmi = (income - exp) * 0.2; const affordable = maxEmi * 48; return { result: '₹' + (affordable / 100000).toFixed(1) + ' Lakh', details: `Max EMI: ₹${maxEmi.toLocaleString()}<br>Affordable Price: ~₹${affordable.toLocaleString()}` }; }
    },
    {
        id: 'mileage-calc', name: 'Mileage Calculator', icon: '⛽', category: 'Vehicle & Transport', description: 'Calculate fuel efficiency',
        fields: [{ id: 'distance', label: 'Distance (km)', type: 'number', placeholder: '300' }, { id: 'fuel', label: 'Fuel Used (liters)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const dist = parseFloat(v.distance), fuel = parseFloat(v.fuel); const mileage = dist / fuel; return { result: mileage.toFixed(2) + ' km/l', details: `Distance: ${dist} km<br>Fuel: ${fuel} L<br>Mileage: ${mileage.toFixed(2)} km/l` }; }
    },
    {
        id: 'fuel-cost-trip', name: 'Fuel Cost per Trip', icon: '🛣️', category: 'Vehicle & Transport', description: 'Calculate trip fuel cost',
        fields: [{ id: 'distance', label: 'Distance (km)', type: 'number', placeholder: '200' }, { id: 'mileage', label: 'Mileage (km/l)', type: 'number', placeholder: '15' }, { id: 'price', label: 'Fuel Price (₹/l)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const dist = parseFloat(v.distance), mil = parseFloat(v.mileage), price = parseFloat(v.price); const liters = dist / mil; const cost = liters * price; return { result: '₹' + cost.toFixed(0), details: `Fuel needed: ${liters.toFixed(2)} L<br>Cost: ₹${cost.toFixed(0)}` }; }
    },
    {
        id: 'monthly-fuel', name: 'Monthly Fuel Expense', icon: '📅', category: 'Vehicle & Transport', description: 'Monthly fuel budget',
        fields: [{ id: 'daily', label: 'Daily Distance (km)', type: 'number', placeholder: '30' }, { id: 'mileage', label: 'Mileage (km/l)', type: 'number', placeholder: '15' }, { id: 'price', label: 'Fuel Price (₹/l)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const daily = parseFloat(v.daily), mil = parseFloat(v.mileage), price = parseFloat(v.price); const monthly = daily * 26; const liters = monthly / mil; const cost = liters * price; return { result: '₹' + cost.toFixed(0) + '/month', details: `Monthly km: ${monthly}<br>Fuel: ${liters.toFixed(1)} L<br>Cost: ₹${cost.toFixed(0)}` }; }
    },
    {
        id: 'annual-fuel', name: 'Annual Fuel Cost', icon: '📊', category: 'Vehicle & Transport', description: 'Yearly fuel expense',
        fields: [{ id: 'monthly', label: 'Monthly Fuel Cost (₹)', type: 'number', placeholder: '5000' }],
        calculate: (v) => { const monthly = parseFloat(v.monthly); const annual = monthly * 12; return { result: '₹' + annual.toLocaleString() + '/year', details: `Monthly: ₹${monthly.toLocaleString()}<br>Annual: ₹${annual.toLocaleString()}` }; }
    },
    {
        id: 'ev-charging', name: 'EV Charging Cost', icon: '⚡', category: 'Vehicle & Transport', description: 'Calculate EV charging cost',
        fields: [{ id: 'battery', label: 'Battery Capacity (kWh)', type: 'number', placeholder: '40' }, { id: 'rate', label: 'Electricity Rate (₹/kWh)', type: 'number', placeholder: '8' }, { id: 'soc', label: 'Charge from % to 100%', type: 'number', placeholder: '20' }],
        calculate: (v) => { const battery = parseFloat(v.battery), rate = parseFloat(v.rate), from = parseFloat(v.soc); const kwh = battery * (100 - from) / 100; const cost = kwh * rate; return { result: '₹' + cost.toFixed(0), details: `Energy: ${kwh.toFixed(1)} kWh<br>Cost: ₹${cost.toFixed(0)}` }; }
    },
    {
        id: 'ev-range', name: 'EV Battery Range', icon: '🔋', category: 'Vehicle & Transport', description: 'Estimate EV range',
        fields: [{ id: 'battery', label: 'Battery (kWh)', type: 'number', placeholder: '40' }, { id: 'efficiency', label: 'Efficiency (km/kWh)', type: 'number', placeholder: '6' }, { id: 'soc', label: 'Current Charge (%)', type: 'number', placeholder: '80' }],
        calculate: (v) => { const battery = parseFloat(v.battery), eff = parseFloat(v.efficiency), soc = parseFloat(v.soc); const available = battery * soc / 100; const range = available * eff; return { result: range.toFixed(0) + ' km', details: `Available: ${available.toFixed(1)} kWh<br>Range: ${range.toFixed(0)} km` }; }
    },
    {
        id: 'car-maintenance', name: 'Car Maintenance Cost', icon: '🔧', category: 'Vehicle & Transport', description: 'Annual maintenance estimate',
        fields: [{ id: 'km', label: 'Annual KM', type: 'number', placeholder: '15000' }, { id: 'segment', label: 'Car Segment', type: 'select', options: ['Budget', 'Mid', 'Premium', 'Luxury'] }],
        calculate: (v) => { const km = parseFloat(v.km); const rates = { Budget: 2, Mid: 3, Premium: 5, Luxury: 8 }; const cost = km * rates[v.segment]; return { result: '₹' + cost.toLocaleString() + '/year', details: `${v.segment} car<br>${km} km/year<br>Maintenance: ₹${cost.toLocaleString()}` }; }
    },
    {
        id: 'service-interval', name: 'Service Interval Calculator', icon: '🛠️', category: 'Vehicle & Transport', description: 'Next service due',
        fields: [{ id: 'lastService', label: 'Last Service (km)', type: 'number', placeholder: '10000' }, { id: 'current', label: 'Current Odometer', type: 'number', placeholder: '15000' }, { id: 'interval', label: 'Service Interval (km)', type: 'number', placeholder: '10000' }],
        calculate: (v) => { const last = parseFloat(v.lastService), current = parseFloat(v.current), interval = parseFloat(v.interval); const next = last + interval; const remaining = next - current; return { result: remaining > 0 ? remaining + ' km left' : 'Service Overdue!', details: `Last: ${last} km<br>Next: ${next} km<br>Remaining: ${remaining} km` }; }
    },
    {
        id: 'insurance-vehicle', name: 'Insurance Premium Estimator', icon: '🛡️', category: 'Vehicle & Transport', description: 'Estimate insurance cost',
        fields: [{ id: 'value', label: 'Vehicle Value (₹)', type: 'number', placeholder: '800000' }, { id: 'type', label: 'Insurance Type', type: 'select', options: ['Third Party', 'Comprehensive'] }, { id: 'age', label: 'Vehicle Age (years)', type: 'number', placeholder: '2' }],
        calculate: (v) => { const value = parseFloat(v.value), age = parseFloat(v.age); let premium; if (v.type === 'Third Party') { premium = 3000 + age * 200; } else { const idv = value * (1 - age * 0.1); const rate = age < 3 ? 0.028 : 0.035; premium = idv * rate + 3000; } return { result: '₹' + premium.toFixed(0) + '/year', details: `Type: ${v.type}<br>Premium: ~₹${premium.toFixed(0)}/year` }; }
    },
    {
        id: 'vehicle-depreciation', name: 'Vehicle Depreciation', icon: '📉', category: 'Vehicle & Transport', description: 'Calculate depreciation',
        fields: [{ id: 'price', label: 'Purchase Price (₹)', type: 'number', placeholder: '800000' }, { id: 'years', label: 'Years', type: 'number', placeholder: '5' }],
        calculate: (v) => { const price = parseFloat(v.price), years = parseFloat(v.years); const rates = [0, 0.15, 0.10, 0.10, 0.08, 0.08]; let value = price; for (let i = 1; i <= years && i < rates.length; i++) value *= (1 - rates[i]); const depreciation = price - value; return { result: '₹' + value.toFixed(0).toLocaleString(), details: `Original: ₹${price.toLocaleString()}<br>After ${years} years: ₹${value.toFixed(0).toLocaleString()}<br>Depreciation: ₹${depreciation.toFixed(0).toLocaleString()}` }; }
    },
    {
        id: 'resale-vehicle', name: 'Vehicle Resale Value', icon: '🏷️', category: 'Vehicle & Transport', description: 'Estimate resale value',
        fields: [{ id: 'price', label: 'Purchase Price (₹)', type: 'number', placeholder: '800000' }, { id: 'years', label: 'Years Owned', type: 'number', placeholder: '5' }, { id: 'km', label: 'Kilometers Run', type: 'number', placeholder: '50000' }],
        calculate: (v) => { const price = parseFloat(v.price), years = parseFloat(v.years), km = parseFloat(v.km); let value = price * Math.pow(0.85, years); if (km > 15000 * years) value *= 0.95; return { result: '₹' + value.toFixed(0).toLocaleString(), details: `Age: ${years} years<br>KM: ${km.toLocaleString()}<br>Resale: ~₹${value.toFixed(0).toLocaleString()}` }; }
    },
    {
        id: 'road-tax', name: 'Road Tax Calculator', icon: '🛣️', category: 'Vehicle & Transport', description: 'Estimate road tax',
        fields: [{ id: 'price', label: 'Ex-showroom Price (₹)', type: 'number', placeholder: '800000' }, { id: 'state', label: 'State', type: 'select', options: ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Other'] }],
        calculate: (v) => { const price = parseFloat(v.price); const rates = { Maharashtra: 0.11, Karnataka: 0.13, Delhi: 0.04, 'Tamil Nadu': 0.10, Other: 0.08 }; const tax = price * rates[v.state]; return { result: '₹' + tax.toFixed(0).toLocaleString(), details: `State: ${v.state}<br>Road Tax: ₹${tax.toFixed(0).toLocaleString()}` }; }
    },
    {
        id: 'toll-cost', name: 'Toll Cost Calculator', icon: '🚧', category: 'Vehicle & Transport', description: 'Estimate toll charges',
        fields: [{ id: 'distance', label: 'Highway Distance (km)', type: 'number', placeholder: '300' }, { id: 'type', label: 'Vehicle Type', type: 'select', options: ['Car', 'SUV/MUV', 'Bus', 'Truck'] }],
        calculate: (v) => { const dist = parseFloat(v.distance); const rates = { Car: 2, 'SUV/MUV': 2.5, Bus: 4, Truck: 5 }; const toll = dist * rates[v.type]; return { result: '₹' + toll.toFixed(0), details: `Distance: ${dist} km<br>Vehicle: ${v.type}<br>Toll: ~₹${toll.toFixed(0)}` }; }
    },
    {
        id: 'trip-distance', name: 'Trip Distance Calculator', icon: '📍', category: 'Vehicle & Transport', description: 'Calculate total trip distance',
        fields: [{ id: 'oneway', label: 'One-way Distance (km)', type: 'number', placeholder: '150' }, { id: 'roundtrip', label: 'Round Trip?', type: 'select', options: ['Yes', 'No'] }],
        calculate: (v) => { const one = parseFloat(v.oneway); const total = v.roundtrip === 'Yes' ? one * 2 : one; return { result: total + ' km', details: `One-way: ${one} km<br>Total: ${total} km` }; }
    },
    {
        id: 'travel-time-vehicle', name: 'Travel Time Estimator', icon: '⏱️', category: 'Vehicle & Transport', description: 'Estimate travel time',
        fields: [{ id: 'distance', label: 'Distance (km)', type: 'number', placeholder: '200' }, { id: 'avgSpeed', label: 'Average Speed (km/h)', type: 'number', placeholder: '60' }, { id: 'stops', label: 'Stop Time (minutes)', type: 'number', placeholder: '30' }],
        calculate: (v) => { const dist = parseFloat(v.distance), speed = parseFloat(v.avgSpeed), stops = parseFloat(v.stops); const driving = (dist / speed) * 60; const total = driving + stops; const hrs = Math.floor(total / 60), mins = Math.round(total % 60); return { result: `${hrs}h ${mins}m`, details: `Driving: ${Math.round(driving)} min<br>Stops: ${stops} min<br>Total: ${hrs}h ${mins}m` }; }
    },
    {
        id: 'carbon-vehicle', name: 'Vehicle Carbon Emission', icon: '🌿', category: 'Vehicle & Transport', description: 'Calculate CO2 emissions',
        fields: [{ id: 'km', label: 'Distance (km)', type: 'number', placeholder: '100' }, { id: 'fuel', label: 'Fuel Type', type: 'select', options: ['Petrol', 'Diesel', 'CNG', 'EV'] }],
        calculate: (v) => { const km = parseFloat(v.km); const factors = { Petrol: 0.12, Diesel: 0.13, CNG: 0.08, EV: 0.03 }; const co2 = km * factors[v.fuel]; return { result: co2.toFixed(2) + ' kg CO₂', details: `${km} km on ${v.fuel}<br>Emissions: ${co2.toFixed(2)} kg CO₂` }; }
    },
    {
        id: 'cost-per-km', name: 'Cost per Kilometer', icon: '📊', category: 'Vehicle & Transport', description: 'Calculate running cost/km',
        fields: [{ id: 'mileage', label: 'Mileage (km/l)', type: 'number', placeholder: '15' }, { id: 'fuelPrice', label: 'Fuel Price (₹/l)', type: 'number', placeholder: '100' }, { id: 'maintenance', label: 'Maintenance (₹/km)', type: 'number', placeholder: '1' }],
        calculate: (v) => { const mil = parseFloat(v.mileage), price = parseFloat(v.fuelPrice), maint = parseFloat(v.maintenance); const fuelCost = price / mil; const total = fuelCost + maint; return { result: '₹' + total.toFixed(2) + '/km', details: `Fuel: ₹${fuelCost.toFixed(2)}/km<br>Maintenance: ₹${maint}/km<br>Total: ₹${total.toFixed(2)}/km` }; }
    },
    {
        id: 'rideshare-fare', name: 'Ride-sharing Fare Estimator', icon: '🚕', category: 'Vehicle & Transport', description: 'Estimate Uber/Ola fare',
        fields: [{ id: 'distance', label: 'Distance (km)', type: 'number', placeholder: '15' }, { id: 'time', label: 'Est. Time (minutes)', type: 'number', placeholder: '30' }, { id: 'type', label: 'Ride Type', type: 'select', options: ['Mini', 'Sedan', 'SUV', 'Auto'] }],
        calculate: (v) => { const dist = parseFloat(v.distance), time = parseFloat(v.time); const base = { Mini: 50, Sedan: 70, SUV: 100, Auto: 30 }; const perKm = { Mini: 12, Sedan: 15, SUV: 20, Auto: 10 }; const perMin = { Mini: 1, Sedan: 1.5, SUV: 2, Auto: 0.5 }; const fare = base[v.type] + dist * perKm[v.type] + time * perMin[v.type]; return { result: '₹' + fare.toFixed(0), details: `${v.type}: ₹${base[v.type]} base<br>${dist} km × ₹${perKm[v.type]}<br>Est. Fare: ₹${fare.toFixed(0)}` }; }
    },
    {
        id: 'parking-vehicle', name: 'Parking Cost Calculator', icon: '🅿️', category: 'Vehicle & Transport', description: 'Calculate parking fees',
        fields: [{ id: 'hours', label: 'Hours', type: 'number', placeholder: '3' }, { id: 'rate', label: 'Rate per Hour (₹)', type: 'number', placeholder: '30' }, { id: 'firstHour', label: 'First Hour Rate (₹)', type: 'number', placeholder: '50' }],
        calculate: (v) => { const hrs = parseFloat(v.hours), rate = parseFloat(v.rate), first = parseFloat(v.firstHour); const cost = first + Math.max(0, hrs - 1) * rate; return { result: '₹' + cost.toFixed(0), details: `${hrs} hours<br>First hour: ₹${first}<br>Additional: ₹${rate}/hr<br>Total: ₹${cost.toFixed(0)}` }; }
    },
    {
        id: 'tyre-replacement', name: 'Tyre Replacement Cost', icon: '🛞', category: 'Vehicle & Transport', description: 'Estimate tyre costs',
        fields: [{ id: 'type', label: 'Vehicle Type', type: 'select', options: ['Bike', 'Car (Budget)', 'Car (Premium)', 'SUV'] }, { id: 'count', label: 'Number of Tyres', type: 'number', placeholder: '4' }],
        calculate: (v) => { const prices = { Bike: 2500, 'Car (Budget)': 4000, 'Car (Premium)': 8000, SUV: 10000 }; const price = prices[v.type]; const total = price * parseFloat(v.count); return { result: '₹' + total.toLocaleString(), details: `${v.type}: ₹${price}/tyre<br>${v.count} tyres<br>Total: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'loan-vs-lease', name: 'Loan vs Lease Calculator', icon: '⚖️', category: 'Vehicle & Transport', description: 'Compare loan vs lease',
        fields: [{ id: 'price', label: 'Car Price (₹)', type: 'number', placeholder: '1000000' }, { id: 'down', label: 'Down Payment (₹)', type: 'number', placeholder: '200000' }, { id: 'loanRate', label: 'Loan Rate (%)', type: 'number', placeholder: '9' }, { id: 'leaseMonthly', label: 'Lease Monthly (₹)', type: 'number', placeholder: '20000' }, { id: 'tenure', label: 'Tenure (months)', type: 'number', placeholder: '36' }],
        calculate: (v) => { const P = parseFloat(v.price) - parseFloat(v.down), r = parseFloat(v.loanRate) / 12 / 100, n = parseFloat(v.tenure), lease = parseFloat(v.leaseMonthly); const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); const loanTotal = emi * n + parseFloat(v.down); const leaseTotal = lease * n; return { result: loanTotal < leaseTotal ? 'Loan is cheaper' : 'Lease is cheaper', details: `Loan Total: ₹${loanTotal.toFixed(0).toLocaleString()}<br>Lease Total: ₹${leaseTotal.toLocaleString()}<br>Difference: ₹${Math.abs(loanTotal - leaseTotal).toFixed(0).toLocaleString()}` }; }
    },
    {
        id: 'insurance-claim', name: 'Insurance Claim Estimate', icon: '📋', category: 'Vehicle & Transport', description: 'Estimate claim amount',
        fields: [{ id: 'damage', label: 'Damage Cost (₹)', type: 'number', placeholder: '50000' }, { id: 'deductible', label: 'Deductible (₹)', type: 'number', placeholder: '5000' }],
        calculate: (v) => { const damage = parseFloat(v.damage), deduct = parseFloat(v.deductible); const claim = Math.max(0, damage - deduct); return { result: '₹' + claim.toLocaleString(), details: `Damage: ₹${damage.toLocaleString()}<br>Deductible: ₹${deduct.toLocaleString()}<br>Claim: ₹${claim.toLocaleString()}` }; }
    },
    {
        id: 'registration-renewal', name: 'Registration Renewal', icon: '📄', category: 'Vehicle & Transport', description: 'RC renewal cost',
        fields: [{ id: 'type', label: 'Vehicle Type', type: 'select', options: ['Two Wheeler', 'Car', 'Commercial'] }],
        calculate: (v) => { const fees = { 'Two Wheeler': 300, Car: 600, Commercial: 1000 }; const fee = fees[v.type]; return { result: '₹' + fee, details: `${v.type}<br>Renewal Fee: ₹${fee}<br>(Approx. fees, varies by state)` }; }
    },
    {
        id: 'rc-transfer', name: 'RC Transfer Fee', icon: '🔄', category: 'Vehicle & Transport', description: 'Vehicle ownership transfer',
        fields: [{ id: 'value', label: 'Vehicle Value (₹)', type: 'number', placeholder: '500000' }, { id: 'sameState', label: 'Same State?', type: 'select', options: ['Yes', 'No'] }],
        calculate: (v) => { const value = parseFloat(v.value); let fee = value * 0.02 + 500; if (v.sameState === 'No') fee += value * 0.05; return { result: '₹' + fee.toFixed(0), details: `Transfer Fee: ₹${fee.toFixed(0)}<br>(Includes road tax for inter-state)` }; }
    },
    {
        id: 'traffic-fine', name: 'Traffic Fine Calculator', icon: '🚦', category: 'Vehicle & Transport', description: 'Common traffic fines',
        fields: [{ id: 'violation', label: 'Violation Type', type: 'select', options: ['No Helmet', 'No Seatbelt', 'Red Light', 'Over Speeding', 'Drunk Driving', 'No License'] }],
        calculate: (v) => { const fines = { 'No Helmet': 1000, 'No Seatbelt': 1000, 'Red Light': 5000, 'Over Speeding': 2000, 'Drunk Driving': 10000, 'No License': 5000 }; const fine = fines[v.violation]; return { result: '₹' + fine.toLocaleString(), details: `Violation: ${v.violation}<br>Fine: ₹${fine.toLocaleString()}<br>(As per MV Act 2019)` }; }
    },
    {
        id: 'ev-vs-petrol', name: 'EV vs Petrol Cost Comparison', icon: '⚡', category: 'Vehicle & Transport', description: 'Compare running costs',
        fields: [{ id: 'km', label: 'Monthly KM', type: 'number', placeholder: '1000' }, { id: 'petrolMileage', label: 'Petrol Mileage (km/l)', type: 'number', placeholder: '15' }, { id: 'petrolPrice', label: 'Petrol Price (₹/l)', type: 'number', placeholder: '100' }, { id: 'evEfficiency', label: 'EV Efficiency (km/kWh)', type: 'number', placeholder: '7' }, { id: 'elecRate', label: 'Electricity (₹/kWh)', type: 'number', placeholder: '8' }],
        calculate: (v) => { const km = parseFloat(v.km); const petrolCost = (km / parseFloat(v.petrolMileage)) * parseFloat(v.petrolPrice); const evCost = (km / parseFloat(v.evEfficiency)) * parseFloat(v.elecRate); const savings = petrolCost - evCost; return { result: 'EV saves ₹' + savings.toFixed(0) + '/month', details: `Petrol: ₹${petrolCost.toFixed(0)}/month<br>EV: ₹${evCost.toFixed(0)}/month<br>Savings: ₹${savings.toFixed(0)}/month` }; }
    },
    {
        id: 'fuel-price-impact', name: 'Fuel Price Impact', icon: '📈', category: 'Vehicle & Transport', description: 'Impact of price change',
        fields: [{ id: 'monthly', label: 'Monthly Fuel (liters)', type: 'number', placeholder: '50' }, { id: 'current', label: 'Current Price (₹/l)', type: 'number', placeholder: '100' }, { id: 'new', label: 'New Price (₹/l)', type: 'number', placeholder: '105' }],
        calculate: (v) => { const liters = parseFloat(v.monthly), curr = parseFloat(v.current), newP = parseFloat(v.new); const currCost = liters * curr; const newCost = liters * newP; const impact = newCost - currCost; return { result: (impact > 0 ? '+' : '') + '₹' + impact.toFixed(0) + '/month', details: `Current: ₹${currCost}/month<br>New: ₹${newCost}/month<br>Impact: ${impact > 0 ? '+' : ''}₹${impact.toFixed(0)}/month` }; }
    }
];
if (typeof window !== 'undefined') window.vehicleCalculators = vehicleCalculators;
