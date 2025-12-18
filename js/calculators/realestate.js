// Real Estate & Housing Calculators (30)
const realEstateCalculators = [
    {
        id: 'house-affordability', name: 'House Affordability Calculator', icon: '🏠', category: 'Real Estate', description: 'How much house can you afford',
        fields: [{ id: 'income', label: 'Monthly Income (₹)', type: 'number', placeholder: '100000' }, { id: 'expenses', label: 'Monthly Expenses (₹)', type: 'number', placeholder: '40000' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '8.5' }, { id: 'tenure', label: 'Loan Tenure (years)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const income = parseFloat(v.income), exp = parseFloat(v.expenses); const maxEmi = (income - exp) * 0.5; const r = parseFloat(v.rate) / 12 / 100, n = parseFloat(v.tenure) * 12; const loan = maxEmi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)); return { result: '₹' + (loan / 100000).toFixed(1) + ' Lakh', details: `Max EMI: ₹${maxEmi.toLocaleString()}<br>Affordable Loan: ₹${loan.toLocaleString()}` }; }
    },
    {
        id: 'rent-affordability', name: 'Rent Affordability Calculator', icon: '🏢', category: 'Real Estate', description: 'How much rent can you afford',
        fields: [{ id: 'income', label: 'Monthly Income (₹)', type: 'number', placeholder: '80000' }],
        calculate: (v) => { const income = parseFloat(v.income); const maxRent = income * 0.30; const comfortRent = income * 0.25; return { result: '₹' + maxRent.toLocaleString(), details: `Max Rent (30%): ₹${maxRent.toLocaleString()}<br>Comfortable (25%): ₹${comfortRent.toLocaleString()}` }; }
    },
    {
        id: 'home-loan-eligibility', name: 'Home Loan Eligibility', icon: '🏦', category: 'Real Estate', description: 'Check loan eligibility',
        fields: [{ id: 'income', label: 'Monthly Income (₹)', type: 'number', placeholder: '80000' }, { id: 'existingEmi', label: 'Existing EMIs (₹)', type: 'number', placeholder: '10000' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '8.5' }, { id: 'tenure', label: 'Tenure (years)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const income = parseFloat(v.income), existing = parseFloat(v.existingEmi); const maxFoir = income * 0.5, availableEmi = maxFoir - existing; const r = parseFloat(v.rate) / 12 / 100, n = parseFloat(v.tenure) * 12; const loan = availableEmi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)); return { result: '₹' + (loan / 100000).toFixed(1) + ' Lakh', details: `FOIR Limit: ₹${maxFoir.toLocaleString()}<br>Available for EMI: ₹${availableEmi.toLocaleString()}<br>Eligible Loan: ₹${loan.toLocaleString()}` }; }
    },
    {
        id: 'down-payment', name: 'Down Payment Calculator', icon: '💵', category: 'Real Estate', description: 'Calculate required down payment',
        fields: [{ id: 'price', label: 'Property Price (₹)', type: 'number', placeholder: '5000000' }, { id: 'ltv', label: 'LTV Ratio (%)', type: 'number', placeholder: '80' }],
        calculate: (v) => { const price = parseFloat(v.price), ltv = parseFloat(v.ltv); const loan = price * ltv / 100; const down = price - loan; return { result: '₹' + down.toLocaleString(), details: `Property: ₹${price.toLocaleString()}<br>Loan (${ltv}%): ₹${loan.toLocaleString()}<br>Down Payment: ₹${down.toLocaleString()}` }; }
    },
    {
        id: 'mortgage-interest', name: 'Mortgage Interest Calculator', icon: '📊', category: 'Real Estate', description: 'Total interest on home loan',
        fields: [{ id: 'principal', label: 'Loan Amount (₹)', type: 'number', placeholder: '4000000' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '8.5' }, { id: 'tenure', label: 'Tenure (years)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const P = parseFloat(v.principal), r = parseFloat(v.rate) / 12 / 100, n = parseFloat(v.tenure) * 12; const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); const total = emi * n, interest = total - P; return { result: '₹' + (interest / 100000).toFixed(1) + ' Lakh', details: `Principal: ₹${P.toLocaleString()}<br>Total Interest: ₹${interest.toLocaleString()}<br>Total Payment: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'rent-vs-buy', name: 'Rent vs Buy Calculator', icon: '⚖️', category: 'Real Estate', description: 'Should you rent or buy',
        fields: [{ id: 'rent', label: 'Monthly Rent (₹)', type: 'number', placeholder: '25000' }, { id: 'price', label: 'Property Price (₹)', type: 'number', placeholder: '5000000' }, { id: 'appreciation', label: 'Annual Appreciation (%)', type: 'number', placeholder: '5' }, { id: 'years', label: 'Years to Compare', type: 'number', placeholder: '10' }],
        calculate: (v) => { const rent = parseFloat(v.rent), price = parseFloat(v.price), app = parseFloat(v.appreciation) / 100, yrs = parseFloat(v.years); const totalRent = rent * 12 * yrs; const futureValue = price * Math.pow(1 + app, yrs); const gain = futureValue - price; const better = gain > totalRent ? 'Buy' : 'Rent'; return { result: `${better} is better`, details: `Total Rent: ₹${totalRent.toLocaleString()}<br>Property Gain: ₹${gain.toLocaleString()}<br>Recommendation: ${better}` }; }
    },
    {
        id: 'property-tax', name: 'Property Tax Calculator', icon: '🏛️', category: 'Real Estate', description: 'Estimate property tax',
        fields: [{ id: 'value', label: 'Property Value (₹)', type: 'number', placeholder: '5000000' }, { id: 'rate', label: 'Tax Rate (%)', type: 'number', placeholder: '0.5' }],
        calculate: (v) => { const value = parseFloat(v.value), rate = parseFloat(v.rate); const tax = value * rate / 100; return { result: '₹' + tax.toLocaleString() + '/year', details: `Property Value: ₹${value.toLocaleString()}<br>Tax Rate: ${rate}%<br>Annual Tax: ₹${tax.toLocaleString()}` }; }
    },
    {
        id: 'stamp-duty', name: 'Stamp Duty Calculator', icon: '📜', category: 'Real Estate', description: 'Calculate stamp duty',
        fields: [{ id: 'value', label: 'Property Value (₹)', type: 'number', placeholder: '5000000' }, { id: 'state', label: 'State', type: 'select', options: ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Other'] }],
        calculate: (v) => { const value = parseFloat(v.value); const rates = { Maharashtra: 5, Karnataka: 5.6, Delhi: 6, 'Tamil Nadu': 7, Other: 5 }; const rate = rates[v.state]; const duty = value * rate / 100; return { result: '₹' + duty.toLocaleString(), details: `Value: ₹${value.toLocaleString()}<br>State: ${v.state} (${rate}%)<br>Stamp Duty: ₹${duty.toLocaleString()}` }; }
    },
    {
        id: 'registration-charges', name: 'Registration Charges Calculator', icon: '📋', category: 'Real Estate', description: 'Calculate registration fees',
        fields: [{ id: 'value', label: 'Property Value (₹)', type: 'number', placeholder: '5000000' }, { id: 'rate', label: 'Registration Rate (%)', type: 'number', placeholder: '1' }],
        calculate: (v) => { const value = parseFloat(v.value), rate = parseFloat(v.rate); const reg = value * rate / 100; return { result: '₹' + reg.toLocaleString(), details: `Registration: ₹${reg.toLocaleString()}` }; }
    },
    {
        id: 'emi-prepayment', name: 'Home EMI Prepayment Calculator', icon: '💰', category: 'Real Estate', description: 'Savings from prepayment',
        fields: [{ id: 'outstanding', label: 'Outstanding Loan (₹)', type: 'number', placeholder: '3000000' }, { id: 'emi', label: 'Current EMI (₹)', type: 'number', placeholder: '30000' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '8.5' }, { id: 'prepay', label: 'Prepayment Amount (₹)', type: 'number', placeholder: '500000' }],
        calculate: (v) => { const out = parseFloat(v.outstanding), emi = parseFloat(v.emi), r = parseFloat(v.rate) / 12 / 100, prepay = parseFloat(v.prepay); const newOut = out - prepay; const origMonths = Math.log(emi / (emi - out * r)) / Math.log(1 + r); const newMonths = Math.log(emi / (emi - newOut * r)) / Math.log(1 + r); const savedMonths = Math.round(origMonths - newMonths); const savedInterest = savedMonths * emi - prepay; return { result: `Save ${savedMonths} months`, details: `Months reduced: ${savedMonths}<br>Interest saved: ~₹${Math.max(0, savedInterest).toLocaleString()}` }; }
    },
    {
        id: 'amortization', name: 'Loan Amortization Schedule', icon: '📅', category: 'Real Estate', description: 'Year-wise loan breakdown',
        fields: [{ id: 'principal', label: 'Loan Amount (₹)', type: 'number', placeholder: '4000000' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '8.5' }, { id: 'tenure', label: 'Tenure (years)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const P = parseFloat(v.principal), r = parseFloat(v.rate) / 12 / 100, n = parseFloat(v.tenure) * 12; const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); let bal = P, y1Int = 0, y1Prin = 0; for (let i = 0; i < 12; i++) { const intPart = bal * r; y1Int += intPart; y1Prin += emi - intPart; bal -= (emi - intPart); } return { result: 'EMI: ₹' + emi.toFixed(0), details: `Year 1 Interest: ₹${y1Int.toFixed(0).toLocaleString()}<br>Year 1 Principal: ₹${y1Prin.toFixed(0).toLocaleString()}<br>Balance after Y1: ₹${bal.toFixed(0).toLocaleString()}` }; }
    },
    {
        id: 'rental-yield', name: 'Rental Yield Calculator', icon: '📈', category: 'Real Estate', description: 'Calculate rental yield %',
        fields: [{ id: 'price', label: 'Property Price (₹)', type: 'number', placeholder: '5000000' }, { id: 'rent', label: 'Monthly Rent (₹)', type: 'number', placeholder: '20000' }],
        calculate: (v) => { const price = parseFloat(v.price), rent = parseFloat(v.rent); const annual = rent * 12; const yield_ = (annual / price) * 100; return { result: yield_.toFixed(2) + '%', details: `Annual Rent: ₹${annual.toLocaleString()}<br>Gross Yield: ${yield_.toFixed(2)}%` }; }
    },
    {
        id: 'property-appreciation', name: 'Property Appreciation Calculator', icon: '📊', category: 'Real Estate', description: 'Future property value',
        fields: [{ id: 'current', label: 'Current Value (₹)', type: 'number', placeholder: '5000000' }, { id: 'rate', label: 'Annual Appreciation (%)', type: 'number', placeholder: '7' }, { id: 'years', label: 'Years', type: 'number', placeholder: '10' }],
        calculate: (v) => { const curr = parseFloat(v.current), rate = parseFloat(v.rate) / 100, yrs = parseFloat(v.years); const future = curr * Math.pow(1 + rate, yrs); const gain = future - curr; return { result: '₹' + (future / 100000).toFixed(1) + ' Lakh', details: `Current: ₹${curr.toLocaleString()}<br>After ${yrs} years: ₹${future.toLocaleString()}<br>Gain: ₹${gain.toLocaleString()}` }; }
    },
    {
        id: 'cost-per-sqft', name: 'Cost per Square Foot', icon: '📐', category: 'Real Estate', description: 'Calculate price per sq ft',
        fields: [{ id: 'price', label: 'Property Price (₹)', type: 'number', placeholder: '5000000' }, { id: 'area', label: 'Area (sq ft)', type: 'number', placeholder: '1200' }],
        calculate: (v) => { const price = parseFloat(v.price), area = parseFloat(v.area); const perSqft = price / area; return { result: '₹' + perSqft.toFixed(0) + '/sq ft', details: `Total: ₹${price.toLocaleString()}<br>Area: ${area} sq ft<br>Rate: ₹${perSqft.toFixed(0)}/sq ft` }; }
    },
    {
        id: 'carpet-to-buildup', name: 'Carpet to Built-up Area', icon: '📏', category: 'Real Estate', description: 'Convert carpet to built-up',
        fields: [{ id: 'carpet', label: 'Carpet Area (sq ft)', type: 'number', placeholder: '1000' }, { id: 'loading', label: 'Loading Factor (%)', type: 'number', placeholder: '25' }],
        calculate: (v) => { const carpet = parseFloat(v.carpet), loading = parseFloat(v.loading); const buildup = carpet * (1 + loading / 100); const superBuiltup = buildup * 1.15; return { result: buildup.toFixed(0) + ' sq ft built-up', details: `Carpet: ${carpet} sq ft<br>Built-up: ${buildup.toFixed(0)} sq ft<br>Super Built-up: ~${superBuiltup.toFixed(0)} sq ft` }; }
    },
    {
        id: 'construction-cost', name: 'Construction Cost Calculator', icon: '🏗️', category: 'Real Estate', description: 'Estimate construction cost',
        fields: [{ id: 'area', label: 'Area (sq ft)', type: 'number', placeholder: '2000' }, { id: 'quality', label: 'Construction Quality', type: 'select', options: ['Basic (₹1500/sqft)', 'Standard (₹2000/sqft)', 'Premium (₹3000/sqft)', 'Luxury (₹5000/sqft)'] }],
        calculate: (v) => { const area = parseFloat(v.area); const rates = { 'Basic (₹1500/sqft)': 1500, 'Standard (₹2000/sqft)': 2000, 'Premium (₹3000/sqft)': 3000, 'Luxury (₹5000/sqft)': 5000 }; const rate = rates[v.quality]; const cost = area * rate; return { result: '₹' + (cost / 100000).toFixed(1) + ' Lakh', details: `Area: ${area} sq ft<br>Rate: ₹${rate}/sq ft<br>Total: ₹${cost.toLocaleString()}` }; }
    },
    {
        id: 'renovation-cost', name: 'Renovation Cost Calculator', icon: '🔨', category: 'Real Estate', description: 'Estimate renovation cost',
        fields: [{ id: 'area', label: 'Area (sq ft)', type: 'number', placeholder: '1500' }, { id: 'level', label: 'Renovation Level', type: 'select', options: ['Minor (₹300/sqft)', 'Moderate (₹600/sqft)', 'Major (₹1000/sqft)', 'Complete (₹1500/sqft)'] }],
        calculate: (v) => { const area = parseFloat(v.area); const rates = { 'Minor (₹300/sqft)': 300, 'Moderate (₹600/sqft)': 600, 'Major (₹1000/sqft)': 1000, 'Complete (₹1500/sqft)': 1500 }; const rate = rates[v.level]; const cost = area * rate; return { result: '₹' + cost.toLocaleString(), details: `Area: ${area} sq ft<br>Level: ${v.level}<br>Cost: ₹${cost.toLocaleString()}` }; }
    },
    {
        id: 'home-insurance', name: 'Home Insurance Premium', icon: '🛡️', category: 'Real Estate', description: 'Estimate insurance premium',
        fields: [{ id: 'value', label: 'Property Value (₹)', type: 'number', placeholder: '5000000' }, { id: 'coverage', label: 'Coverage Type', type: 'select', options: ['Basic', 'Standard', 'Comprehensive'] }],
        calculate: (v) => { const value = parseFloat(v.value); const rates = { Basic: 0.1, Standard: 0.15, Comprehensive: 0.25 }; const rate = rates[v.coverage]; const premium = value * rate / 100; return { result: '₹' + premium.toLocaleString() + '/year', details: `Sum Insured: ₹${value.toLocaleString()}<br>Coverage: ${v.coverage}<br>Premium: ₹${premium.toLocaleString()}/year` }; }
    },
    {
        id: 'maintenance-cost', name: 'Maintenance Cost Calculator', icon: '🔧', category: 'Real Estate', description: 'Annual maintenance estimate',
        fields: [{ id: 'value', label: 'Property Value (₹)', type: 'number', placeholder: '5000000' }, { id: 'age', label: 'Property Age (years)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const value = parseFloat(v.value), age = parseFloat(v.age); const baseRate = 0.5 + (age * 0.1); const annual = value * baseRate / 100; return { result: '₹' + annual.toLocaleString() + '/year', details: `Property Age: ${age} years<br>Maintenance Rate: ${baseRate.toFixed(1)}%<br>Annual Cost: ₹${annual.toLocaleString()}` }; }
    },
    {
        id: 'society-maintenance', name: 'Society Maintenance Split', icon: '🏘️', category: 'Real Estate', description: 'Split maintenance costs',
        fields: [{ id: 'total', label: 'Total Monthly Expense (₹)', type: 'number', placeholder: '50000' }, { id: 'units', label: 'Number of Flats', type: 'number', placeholder: '20' }, { id: 'yourArea', label: 'Your Area (sq ft)', type: 'number', placeholder: '1200' }, { id: 'totalArea', label: 'Total Society Area (sq ft)', type: 'number', placeholder: '24000' }],
        calculate: (v) => { const total = parseFloat(v.total), units = parseFloat(v.units), yours = parseFloat(v.yourArea), all = parseFloat(v.totalArea); const equal = total / units; const byArea = total * (yours / all); return { result: '₹' + byArea.toFixed(0) + '/month', details: `Equal split: ₹${equal.toFixed(0)}<br>By area: ₹${byArea.toFixed(0)}<br>Your share: ${((yours / all) * 100).toFixed(1)}%` }; }
    },
    {
        id: 'utility-cost', name: 'Utility Cost Estimator', icon: '💡', category: 'Real Estate', description: 'Monthly utility estimate',
        fields: [{ id: 'area', label: 'Home Area (sq ft)', type: 'number', placeholder: '1200' }, { id: 'people', label: 'Number of People', type: 'number', placeholder: '4' }],
        calculate: (v) => { const area = parseFloat(v.area), people = parseFloat(v.people); const elec = area * 2 + people * 300; const water = people * 200; const gas = people * 150; const total = elec + water + gas; return { result: '₹' + total.toLocaleString() + '/month', details: `Electricity: ~₹${elec}<br>Water: ~₹${water}<br>Gas: ~₹${gas}<br>Total: ₹${total}` }; }
    },
    {
        id: 'parking-cost-re', name: 'Parking Cost Calculator', icon: '🅿️', category: 'Real Estate', description: 'Calculate parking charges',
        fields: [{ id: 'type', label: 'Parking Type', type: 'select', options: ['Open', 'Covered', 'Basement'] }, { id: 'city', label: 'City Tier', type: 'select', options: ['Tier 1', 'Tier 2', 'Tier 3'] }],
        calculate: (v) => { const prices = { Open: { 'Tier 1': 300000, 'Tier 2': 150000, 'Tier 3': 75000 }, Covered: { 'Tier 1': 500000, 'Tier 2': 250000, 'Tier 3': 125000 }, Basement: { 'Tier 1': 700000, 'Tier 2': 350000, 'Tier 3': 175000 } }; const price = prices[v.type][v.city]; return { result: '₹' + (price / 100000).toFixed(1) + ' Lakh', details: `Type: ${v.type}<br>City: ${v.city}<br>Approx Cost: ₹${price.toLocaleString()}` }; }
    },
    {
        id: 'resale-value', name: 'Home Resale Value Calculator', icon: '🏷️', category: 'Real Estate', description: 'Estimate resale value',
        fields: [{ id: 'purchase', label: 'Purchase Price (₹)', type: 'number', placeholder: '4000000' }, { id: 'years', label: 'Years Owned', type: 'number', placeholder: '5' }, { id: 'appreciation', label: 'Annual Appreciation (%)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const purchase = parseFloat(v.purchase), years = parseFloat(v.years), app = parseFloat(v.appreciation) / 100; const current = purchase * Math.pow(1 + app, years); const gain = current - purchase; return { result: '₹' + (current / 100000).toFixed(1) + ' Lakh', details: `Purchase: ₹${purchase.toLocaleString()}<br>Current Value: ₹${current.toLocaleString()}<br>Gain: ₹${gain.toLocaleString()} (${((gain / purchase) * 100).toFixed(0)}%)` }; }
    },
    {
        id: 'lease-agreement', name: 'Lease Agreement Cost', icon: '📝', category: 'Real Estate', description: 'Calculate lease registration',
        fields: [{ id: 'rent', label: 'Monthly Rent (₹)', type: 'number', placeholder: '25000' }, { id: 'deposit', label: 'Security Deposit (₹)', type: 'number', placeholder: '100000' }, { id: 'tenure', label: 'Lease Period (months)', type: 'number', placeholder: '11' }],
        calculate: (v) => { const rent = parseFloat(v.rent), deposit = parseFloat(v.deposit), tenure = parseFloat(v.tenure); const totalRent = rent * tenure; const stampDuty = (totalRent + deposit) * 0.001; const registration = 1000; const total = stampDuty + registration; return { result: '₹' + total.toFixed(0), details: `Stamp Duty: ₹${stampDuty.toFixed(0)}<br>Registration: ₹${registration}<br>Total: ₹${total.toFixed(0)}` }; }
    },
    {
        id: 'property-roi', name: 'Property ROI Calculator', icon: '📈', category: 'Real Estate', description: 'Calculate property ROI',
        fields: [{ id: 'purchase', label: 'Purchase Price (₹)', type: 'number', placeholder: '5000000' }, { id: 'current', label: 'Current Value (₹)', type: 'number', placeholder: '7000000' }, { id: 'rental', label: 'Total Rental Income (₹)', type: 'number', placeholder: '500000' }, { id: 'expenses', label: 'Total Expenses (₹)', type: 'number', placeholder: '200000' }],
        calculate: (v) => { const purchase = parseFloat(v.purchase), current = parseFloat(v.current), rental = parseFloat(v.rental), exp = parseFloat(v.expenses); const gain = current - purchase + rental - exp; const roi = (gain / purchase) * 100; return { result: roi.toFixed(1) + '% ROI', details: `Capital Gain: ₹${(current - purchase).toLocaleString()}<br>Net Rental: ₹${(rental - exp).toLocaleString()}<br>Total ROI: ${roi.toFixed(1)}%` }; }
    },
    {
        id: 'tenure-reduction', name: 'Loan Tenure Reduction', icon: '📉', category: 'Real Estate', description: 'Impact of extra EMI payment',
        fields: [{ id: 'outstanding', label: 'Outstanding (₹)', type: 'number', placeholder: '3000000' }, { id: 'emi', label: 'Current EMI (₹)', type: 'number', placeholder: '30000' }, { id: 'extra', label: 'Extra Monthly (₹)', type: 'number', placeholder: '5000' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '8.5' }],
        calculate: (v) => { const out = parseFloat(v.outstanding), emi = parseFloat(v.emi), extra = parseFloat(v.extra), r = parseFloat(v.rate) / 12 / 100; const newEmi = emi + extra; const origM = Math.log(emi / (emi - out * r)) / Math.log(1 + r); const newM = Math.log(newEmi / (newEmi - out * r)) / Math.log(1 + r); const saved = Math.round(origM - newM); return { result: `Save ${saved} months`, details: `Original: ${Math.round(origM)} months<br>New: ${Math.round(newM)} months<br>Saved: ${saved} months` }; }
    },
    {
        id: 'property-breakeven', name: 'Property Break-even Calculator', icon: '⚖️', category: 'Real Estate', description: 'When does property pay off',
        fields: [{ id: 'price', label: 'Property Price (₹)', type: 'number', placeholder: '5000000' }, { id: 'rent', label: 'Monthly Rent (₹)', type: 'number', placeholder: '20000' }, { id: 'expenses', label: 'Annual Expenses (₹)', type: 'number', placeholder: '50000' }],
        calculate: (v) => { const price = parseFloat(v.price), rent = parseFloat(v.rent), exp = parseFloat(v.expenses); const annualNet = (rent * 12) - exp; const years = price / annualNet; return { result: years.toFixed(1) + ' years', details: `Annual Net Income: ₹${annualNet.toLocaleString()}<br>Break-even: ${years.toFixed(1)} years` }; }
    },
    {
        id: 'rental-escalation', name: 'Rental Escalation Calculator', icon: '📈', category: 'Real Estate', description: 'Future rent with escalation',
        fields: [{ id: 'current', label: 'Current Rent (₹)', type: 'number', placeholder: '25000' }, { id: 'rate', label: 'Annual Escalation (%)', type: 'number', placeholder: '10' }, { id: 'years', label: 'Years', type: 'number', placeholder: '5' }],
        calculate: (v) => { const rent = parseFloat(v.current), rate = parseFloat(v.rate) / 100, years = parseFloat(v.years); const future = rent * Math.pow(1 + rate, years); return { result: '₹' + future.toFixed(0) + '/month', details: `Current: ₹${rent}<br>After ${years} years: ₹${future.toFixed(0)}<br>Increase: ₹${(future - rent).toFixed(0)}` }; }
    },
    {
        id: 'vacancy-loss', name: 'Vacancy Loss Calculator', icon: '📉', category: 'Real Estate', description: 'Calculate rental vacancy loss',
        fields: [{ id: 'rent', label: 'Monthly Rent (₹)', type: 'number', placeholder: '25000' }, { id: 'vacancy', label: 'Vacancy Rate (%)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const rent = parseFloat(v.rent), vacancy = parseFloat(v.vacancy); const annual = rent * 12; const loss = annual * vacancy / 100; const effective = annual - loss; return { result: '₹' + loss.toLocaleString() + '/year loss', details: `Gross Annual: ₹${annual.toLocaleString()}<br>Vacancy Loss: ₹${loss.toLocaleString()}<br>Effective: ₹${effective.toLocaleString()}` }; }
    },
    {
        id: 'house-flipping', name: 'House Flipping Profit', icon: '💎', category: 'Real Estate', description: 'Calculate flipping profit',
        fields: [{ id: 'purchase', label: 'Purchase Price (₹)', type: 'number', placeholder: '4000000' }, { id: 'renovation', label: 'Renovation Cost (₹)', type: 'number', placeholder: '500000' }, { id: 'selling', label: 'Selling Price (₹)', type: 'number', placeholder: '6000000' }, { id: 'costs', label: 'Other Costs (₹)', type: 'number', placeholder: '200000' }],
        calculate: (v) => { const buy = parseFloat(v.purchase), reno = parseFloat(v.renovation), sell = parseFloat(v.selling), costs = parseFloat(v.costs); const totalInvest = buy + reno + costs; const profit = sell - totalInvest; const roi = (profit / totalInvest) * 100; return { result: '₹' + profit.toLocaleString() + ' profit', details: `Total Investment: ₹${totalInvest.toLocaleString()}<br>Selling Price: ₹${sell.toLocaleString()}<br>Profit: ₹${profit.toLocaleString()}<br>ROI: ${roi.toFixed(1)}%` }; }
    }
];
if (typeof window !== 'undefined') window.realEstateCalculators = realEstateCalculators;
