// Agriculture & Farming Calculators
const agricultureCalculators = [
    {
        id: 'agri-crop-yield', name: 'Crop Yield Calculator', icon: '🌾', category: 'Agriculture', description: 'Estimate crop yield',
        fields: [{ id: 'area', label: 'Field Area (acres)', type: 'number', placeholder: '10' }, { id: 'crop', label: 'Crop Type', type: 'select', options: ['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton'] }, { id: 'quality', label: 'Field Quality', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] }],
        calculate: (v) => { const yields = { 'Wheat': 35, 'Rice': 45, 'Corn': 150, 'Soybean': 40, 'Cotton': 800 }; const quality = { 'Excellent': 1.2, 'Good': 1.0, 'Average': 0.8, 'Poor': 0.6 }; const base = yields[v.crop] * quality[v.quality]; const total = base * parseFloat(v.area); const unit = v.crop === 'Cotton' ? 'lbs' : 'bushels'; return { result: `${total.toFixed(0)} ${unit}`, details: `Crop: ${v.crop}<br>Area: ${v.area} acres<br>Yield rate: ${base.toFixed(1)} ${unit}/acre<br>Total yield: ${total.toFixed(0)} ${unit}` }; }
    },
    {
        id: 'agri-seed-rate', name: 'Seed Rate Calculator', icon: '🌱', category: 'Agriculture', description: 'Calculate seed requirements',
        fields: [{ id: 'area', label: 'Field Area (hectares)', type: 'number', placeholder: '5' }, { id: 'crop', label: 'Crop', type: 'select', options: ['Wheat', 'Rice', 'Maize', 'Pulses', 'Vegetables'] }, { id: 'spacing', label: 'Planting Method', type: 'select', options: ['Broadcasting', 'Line Sowing', 'Dibbling'] }],
        calculate: (v) => { const rates = { 'Wheat': 100, 'Rice': 30, 'Maize': 20, 'Pulses': 80, 'Vegetables': 5 }; const method = { 'Broadcasting': 1.2, 'Line Sowing': 1.0, 'Dibbling': 0.8 }; const rate = rates[v.crop] * method[v.spacing]; const total = rate * parseFloat(v.area); return { result: `${total.toFixed(1)} kg`, details: `Seed rate: ${rate.toFixed(1)} kg/ha<br>Area: ${v.area} ha<br>Total seed: ${total.toFixed(1)} kg` }; }
    },
    {
        id: 'agri-fertilizer', name: 'Fertilizer Requirement Calculator', icon: '🧪', category: 'Agriculture', description: 'Calculate fertilizer needs',
        fields: [{ id: 'area', label: 'Area (acres)', type: 'number', placeholder: '10' }, { id: 'crop', label: 'Crop', type: 'select', options: ['Cereals', 'Pulses', 'Vegetables', 'Fruits', 'Cotton'] }, { id: 'soil', label: 'Soil Fertility', type: 'select', options: ['High', 'Medium', 'Low'] }],
        calculate: (v) => { const npk = { 'Cereals': [120, 60, 40], 'Pulses': [20, 50, 30], 'Vegetables': [100, 80, 80], 'Fruits': [80, 40, 80], 'Cotton': [150, 60, 60] }; const mult = { 'High': 0.8, 'Medium': 1.0, 'Low': 1.3 }; const base = npk[v.crop]; const area = parseFloat(v.area); const m = mult[v.soil]; const n = base[0] * m * area, p = base[1] * m * area, k = base[2] * m * area; return { result: `N:${n.toFixed(0)} P:${p.toFixed(0)} K:${k.toFixed(0)} kg`, details: `For ${area} acres of ${v.crop}:<br>Nitrogen (N): ${n.toFixed(0)} kg<br>Phosphorus (P): ${p.toFixed(0)} kg<br>Potassium (K): ${k.toFixed(0)} kg` }; }
    },
    {
        id: 'agri-npk', name: 'NPK Dosage Calculator', icon: '⚗️', category: 'Agriculture', description: 'Calculate NPK fertilizer dosage',
        fields: [{ id: 'nReq', label: 'N Required (kg/acre)', type: 'number', placeholder: '120' }, { id: 'pReq', label: 'P Required (kg/acre)', type: 'number', placeholder: '60' }, { id: 'kReq', label: 'K Required (kg/acre)', type: 'number', placeholder: '40' }, { id: 'area', label: 'Area (acres)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const n = parseFloat(v.nReq), p = parseFloat(v.pReq), k = parseFloat(v.kReq), area = parseFloat(v.area); const urea = (n * area) / 0.46; const dap = (p * area) / 0.46; const mop = (k * area) / 0.6; return { result: `Urea: ${urea.toFixed(0)} kg`, details: `For ${area} acres:<br>Urea (46% N): ${urea.toFixed(1)} kg<br>DAP (46% P): ${dap.toFixed(1)} kg<br>MOP (60% K): ${mop.toFixed(1)} kg` }; }
    },
    {
        id: 'agri-irrigation', name: 'Irrigation Water Requirement', icon: '💧', category: 'Agriculture', description: 'Calculate water needs',
        fields: [{ id: 'area', label: 'Area (hectares)', type: 'number', placeholder: '5' }, { id: 'crop', label: 'Crop', type: 'select', options: ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Vegetables'] }, { id: 'stage', label: 'Growth Stage', type: 'select', options: ['Seedling', 'Vegetative', 'Flowering', 'Maturity'] }],
        calculate: (v) => { const base = { 'Wheat': 450, 'Rice': 1200, 'Cotton': 700, 'Sugarcane': 1800, 'Vegetables': 500 }; const stage = { 'Seedling': 0.6, 'Vegetative': 1.0, 'Flowering': 1.2, 'Maturity': 0.7 }; const waterMM = base[v.crop] * stage[v.stage]; const area = parseFloat(v.area); const waterLiters = waterMM * 10000 * area; return { result: `${(waterLiters / 1000).toFixed(0)} m³`, details: `Crop: ${v.crop}<br>Stage: ${v.stage}<br>Water depth: ${waterMM.toFixed(0)} mm<br>Total: ${(waterLiters / 1000).toFixed(0)} cubic meters` }; }
    },
    {
        id: 'agri-drip', name: 'Drip Irrigation Calculator', icon: '🚿', category: 'Agriculture', description: 'Design drip irrigation system',
        fields: [{ id: 'area', label: 'Area (sq meters)', type: 'number', placeholder: '1000' }, { id: 'spacing', label: 'Emitter Spacing (cm)', type: 'number', placeholder: '30' }, { id: 'flowRate', label: 'Emitter Flow Rate (LPH)', type: 'number', placeholder: '4' }],
        calculate: (v) => { const area = parseFloat(v.area), spacing = parseFloat(v.spacing) / 100, flow = parseFloat(v.flowRate); const emitters = Math.ceil(area / (spacing * spacing)); const totalFlow = emitters * flow; const pipeLength = Math.sqrt(area) * 2 * (Math.sqrt(area) / spacing); return { result: `${emitters} emitters`, details: `Emitters needed: ${emitters}<br>Total flow: ${totalFlow.toFixed(0)} LPH<br>Lateral pipe: ~${pipeLength.toFixed(0)} m<br>Operating time: 1-2 hrs/day` }; }
    },
    {
        id: 'agri-sprinkler', name: 'Sprinkler Coverage Calculator', icon: '🌧️', category: 'Agriculture', description: 'Calculate sprinkler coverage',
        fields: [{ id: 'area', label: 'Field Area (sq meters)', type: 'number', placeholder: '5000' }, { id: 'radius', label: 'Sprinkler Radius (m)', type: 'number', placeholder: '10' }, { id: 'overlap', label: 'Overlap %', type: 'number', placeholder: '15' }],
        calculate: (v) => { const area = parseFloat(v.area), radius = parseFloat(v.radius), overlap = parseFloat(v.overlap) / 100; const coverage = Math.PI * radius * radius; const effectiveCoverage = coverage * (1 - overlap); const sprinklers = Math.ceil(area / effectiveCoverage); return { result: `${sprinklers} sprinklers`, details: `Coverage per sprinkler: ${coverage.toFixed(0)} m²<br>Effective (with overlap): ${effectiveCoverage.toFixed(0)} m²<br>Sprinklers needed: ${sprinklers}` }; }
    },
    {
        id: 'agri-land-area', name: 'Farm Land Area Calculator', icon: '🗺️', category: 'Agriculture', description: 'Convert land area units',
        fields: [{ id: 'value', label: 'Area Value', type: 'number', placeholder: '10' }, { id: 'from', label: 'From Unit', type: 'select', options: ['Acres', 'Hectares', 'Bigha', 'Guntha', 'Square Feet'] }, { id: 'to', label: 'To Unit', type: 'select', options: ['Acres', 'Hectares', 'Bigha', 'Guntha', 'Square Feet'] }],
        calculate: (v) => { const toSqFt = { 'Acres': 43560, 'Hectares': 107639, 'Bigha': 27000, 'Guntha': 1089, 'Square Feet': 1 }; const sqFt = parseFloat(v.value) * toSqFt[v.from]; const result = sqFt / toSqFt[v.to]; return { result: `${result.toFixed(4)} ${v.to}`, details: `${v.value} ${v.from} = ${result.toFixed(4)} ${v.to}<br>= ${sqFt.toLocaleString()} sq ft` }; }
    },
    {
        id: 'agri-soil-moisture', name: 'Soil Moisture Calculator', icon: '🌡️', category: 'Agriculture', description: 'Calculate soil moisture content',
        fields: [{ id: 'wetWeight', label: 'Wet Soil Weight (g)', type: 'number', placeholder: '150' }, { id: 'dryWeight', label: 'Dry Soil Weight (g)', type: 'number', placeholder: '120' }],
        calculate: (v) => { const wet = parseFloat(v.wetWeight), dry = parseFloat(v.dryWeight); const moisture = ((wet - dry) / dry) * 100; let status = moisture < 10 ? 'Very Dry - Irrigate' : moisture < 20 ? 'Optimal' : moisture < 30 ? 'Moist' : 'Waterlogged'; return { result: `${moisture.toFixed(2)}%`, details: `Water content: ${(wet - dry).toFixed(1)} g<br>Moisture %: ${moisture.toFixed(2)}%<br>Status: ${status}` }; }
    },
    {
        id: 'agri-soil-ph', name: 'Soil pH Adjustment Calculator', icon: '⚖️', category: 'Agriculture', description: 'Calculate lime/sulfur needs',
        fields: [{ id: 'currentPH', label: 'Current pH', type: 'number', placeholder: '5.5', step: '0.1' }, { id: 'targetPH', label: 'Target pH', type: 'number', placeholder: '6.5', step: '0.1' }, { id: 'area', label: 'Area (sq meters)', type: 'number', placeholder: '1000' }, { id: 'soilType', label: 'Soil Type', type: 'select', options: ['Sandy', 'Loam', 'Clay'] }],
        calculate: (v) => { const current = parseFloat(v.currentPH), target = parseFloat(v.targetPH), area = parseFloat(v.area); const bufferCapacity = { 'Sandy': 1, 'Loam': 1.5, 'Clay': 2 }; const diff = target - current; const limePerSqM = diff > 0 ? diff * 0.15 * bufferCapacity[v.soilType] : 0; const sulfurPerSqM = diff < 0 ? Math.abs(diff) * 0.03 * bufferCapacity[v.soilType] : 0; const totalLime = limePerSqM * area; const totalSulfur = sulfurPerSqM * area; return { result: diff > 0 ? `${totalLime.toFixed(1)} kg lime` : `${totalSulfur.toFixed(1)} kg sulfur`, details: `pH change needed: ${diff > 0 ? '+' : ''}${diff.toFixed(1)}<br>${diff > 0 ? `Lime: ${totalLime.toFixed(1)} kg` : `Sulfur: ${totalSulfur.toFixed(1)} kg`}` }; }
    },
    {
        id: 'agri-pesticide', name: 'Pesticide Dilution Calculator', icon: '🧴', category: 'Agriculture', description: 'Calculate pesticide mixing',
        fields: [{ id: 'concentration', label: 'Product Concentration (%)', type: 'number', placeholder: '25' }, { id: 'targetConc', label: 'Target Concentration (%)', type: 'number', placeholder: '0.5' }, { id: 'waterVolume', label: 'Water Volume (liters)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const conc = parseFloat(v.concentration), target = parseFloat(v.targetConc), water = parseFloat(v.waterVolume); const productML = (target * water * 1000) / conc; return { result: `${productML.toFixed(1)} ml`, details: `Add ${productML.toFixed(1)} ml of product<br>to ${water} liters of water<br>Final concentration: ${target}%` }; }
    },
    {
        id: 'agri-herbicide', name: 'Herbicide Application Calculator', icon: '🌿', category: 'Agriculture', description: 'Calculate herbicide rate',
        fields: [{ id: 'area', label: 'Area (acres)', type: 'number', placeholder: '10' }, { id: 'rate', label: 'Application Rate (ml/acre)', type: 'number', placeholder: '500' }, { id: 'tankSize', label: 'Tank Size (liters)', type: 'number', placeholder: '200' }],
        calculate: (v) => { const area = parseFloat(v.area), rate = parseFloat(v.rate), tank = parseFloat(v.tankSize); const totalProduct = rate * area; const fills = Math.ceil((totalProduct / 1000) / tank); const perFill = totalProduct / fills; return { result: `${totalProduct.toFixed(0)} ml total`, details: `Total herbicide: ${totalProduct.toFixed(0)} ml<br>Tank fills: ${fills}<br>Per fill: ${perFill.toFixed(0)} ml + water` }; }
    },
    {
        id: 'agri-rotation', name: 'Crop Rotation Planner', icon: '🔄', category: 'Agriculture', description: 'Plan crop rotation',
        fields: [{ id: 'current', label: 'Current Crop', type: 'select', options: ['Cereals', 'Legumes', 'Root Crops', 'Leafy Vegetables', 'Fallow'] }, { id: 'seasons', label: 'Seasons to Plan', type: 'number', placeholder: '4' }],
        calculate: (v) => { const rotation = { 'Cereals': ['Legumes', 'Root Crops', 'Leafy Vegetables', 'Cereals'], 'Legumes': ['Cereals', 'Leafy Vegetables', 'Root Crops', 'Legumes'], 'Root Crops': ['Legumes', 'Cereals', 'Fallow', 'Root Crops'], 'Leafy Vegetables': ['Legumes', 'Cereals', 'Root Crops', 'Leafy Vegetables'], 'Fallow': ['Legumes', 'Cereals', 'Vegetables', 'Fallow'] }; const plan = [v.current]; const seq = rotation[v.current]; for (let i = 0; i < parseInt(v.seasons) - 1; i++) { plan.push(seq[i % seq.length]); } return { result: plan.join(' → '), details: `Recommended rotation:<br>${plan.map((c, i) => `Season ${i + 1}: ${c}`).join('<br>')}` }; }
    },
    {
        id: 'agri-harvest', name: 'Harvest Time Estimator', icon: '📅', category: 'Agriculture', description: 'Estimate harvest date',
        fields: [{ id: 'crop', label: 'Crop', type: 'select', options: ['Wheat', 'Rice', 'Corn', 'Tomato', 'Potato'] }, { id: 'plantDate', label: 'Planting Date', type: 'text', placeholder: 'DD/MM/YYYY' }],
        calculate: (v) => { const days = { 'Wheat': 120, 'Rice': 135, 'Corn': 90, 'Tomato': 75, 'Potato': 100 }; const parts = v.plantDate.split('/'); const plantDate = new Date(parts[2], parts[1] - 1, parts[0]); const harvestDate = new Date(plantDate.getTime() + days[v.crop] * 24 * 60 * 60 * 1000); return { result: `${harvestDate.getDate()}/${harvestDate.getMonth() + 1}/${harvestDate.getFullYear()}`, details: `Crop: ${v.crop}<br>Days to maturity: ${days[v.crop]}<br>Expected harvest: ${harvestDate.toDateString()}` }; }
    },
    {
        id: 'agri-profit', name: 'Farm Profit Calculator', icon: '💰', category: 'Agriculture', description: 'Calculate farm profitability',
        fields: [{ id: 'yield', label: 'Yield (quintals)', type: 'number', placeholder: '50' }, { id: 'price', label: 'Price per quintal', type: 'number', placeholder: '2000' }, { id: 'inputCost', label: 'Total Input Cost', type: 'number', placeholder: '40000' }, { id: 'laborCost', label: 'Labor Cost', type: 'number', placeholder: '15000' }],
        calculate: (v) => { const revenue = parseFloat(v.yield) * parseFloat(v.price); const totalCost = parseFloat(v.inputCost) + parseFloat(v.laborCost); const profit = revenue - totalCost; const margin = (profit / revenue) * 100; return { result: `₹${profit.toLocaleString()}`, details: `Revenue: ₹${revenue.toLocaleString()}<br>Total Cost: ₹${totalCost.toLocaleString()}<br>Profit: ₹${profit.toLocaleString()}<br>Margin: ${margin.toFixed(1)}%` }; }
    },
    {
        id: 'agri-input-cost', name: 'Input Cost Calculator', icon: '📊', category: 'Agriculture', description: 'Calculate farming input costs',
        fields: [{ id: 'seeds', label: 'Seed Cost', type: 'number', placeholder: '5000' }, { id: 'fertilizer', label: 'Fertilizer Cost', type: 'number', placeholder: '15000' }, { id: 'pesticide', label: 'Pesticide Cost', type: 'number', placeholder: '8000' }, { id: 'irrigation', label: 'Irrigation Cost', type: 'number', placeholder: '10000' }, { id: 'misc', label: 'Miscellaneous', type: 'number', placeholder: '5000' }],
        calculate: (v) => { const seeds = parseFloat(v.seeds), fert = parseFloat(v.fertilizer), pest = parseFloat(v.pesticide), irr = parseFloat(v.irrigation), misc = parseFloat(v.misc); const total = seeds + fert + pest + irr + misc; return { result: `₹${total.toLocaleString()}`, details: `Seeds: ₹${seeds.toLocaleString()}<br>Fertilizer: ₹${fert.toLocaleString()}<br>Pesticide: ₹${pest.toLocaleString()}<br>Irrigation: ₹${irr.toLocaleString()}<br>Misc: ₹${misc.toLocaleString()}<br>Total: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'agri-loan-emi', name: 'Farm Loan EMI Calculator', icon: '🏦', category: 'Agriculture', description: 'Calculate farm loan EMI',
        fields: [{ id: 'principal', label: 'Loan Amount', type: 'number', placeholder: '500000' }, { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '7' }, { id: 'tenure', label: 'Tenure (years)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const p = parseFloat(v.principal), r = parseFloat(v.rate) / 100 / 12, n = parseFloat(v.tenure) * 12; const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); const totalPayment = emi * n; const interest = totalPayment - p; return { result: `₹${emi.toFixed(0)}/month`, details: `Loan: ₹${p.toLocaleString()}<br>EMI: ₹${emi.toFixed(0)}<br>Total Interest: ₹${interest.toFixed(0)}<br>Total Payment: ₹${totalPayment.toFixed(0)}` }; }
    },
    {
        id: 'agri-tractor-fuel', name: 'Tractor Fuel Consumption Calculator', icon: '🚜', category: 'Agriculture', description: 'Calculate tractor fuel usage',
        fields: [{ id: 'hp', label: 'Tractor HP', type: 'number', placeholder: '45' }, { id: 'hours', label: 'Working Hours', type: 'number', placeholder: '8' }, { id: 'load', label: 'Load Factor', type: 'select', options: ['Light (50%)', 'Medium (70%)', 'Heavy (85%)'] }],
        calculate: (v) => { const hp = parseFloat(v.hp), hours = parseFloat(v.hours); const loadFactor = { 'Light (50%)': 0.5, 'Medium (70%)': 0.7, 'Heavy (85%)': 0.85 }; const load = loadFactor[v.load]; const fuelPerHour = hp * 0.15 * load; const totalFuel = fuelPerHour * hours; return { result: `${totalFuel.toFixed(1)} liters`, details: `Fuel rate: ${fuelPerHour.toFixed(2)} L/hr<br>Hours: ${hours}<br>Total fuel: ${totalFuel.toFixed(1)} L<br>Cost @₹100/L: ₹${(totalFuel * 100).toFixed(0)}` }; }
    },
    {
        id: 'agri-depreciation', name: 'Equipment Depreciation Calculator', icon: '📉', category: 'Agriculture', description: 'Calculate equipment depreciation',
        fields: [{ id: 'cost', label: 'Purchase Cost', type: 'number', placeholder: '800000' }, { id: 'salvage', label: 'Salvage Value', type: 'number', placeholder: '100000' }, { id: 'life', label: 'Useful Life (years)', type: 'number', placeholder: '10' }, { id: 'age', label: 'Current Age (years)', type: 'number', placeholder: '3' }],
        calculate: (v) => { const cost = parseFloat(v.cost), salvage = parseFloat(v.salvage), life = parseFloat(v.life), age = parseFloat(v.age); const annualDep = (cost - salvage) / life; const totalDep = annualDep * age; const currentValue = cost - totalDep; return { result: `₹${currentValue.toLocaleString()}`, details: `Original: ₹${cost.toLocaleString()}<br>Annual depreciation: ₹${annualDep.toFixed(0)}<br>Total depreciation: ₹${totalDep.toFixed(0)}<br>Current value: ₹${currentValue.toLocaleString()}` }; }
    },
    {
        id: 'agri-weather-yield', name: 'Weather-Based Yield Estimator', icon: '🌤️', category: 'Agriculture', description: 'Estimate yield based on weather',
        fields: [{ id: 'baseYield', label: 'Normal Yield (quintal/acre)', type: 'number', placeholder: '20' }, { id: 'rainfall', label: 'Rainfall', type: 'select', options: ['Excess', 'Normal', 'Deficit', 'Drought'] }, { id: 'temperature', label: 'Temperature', type: 'select', options: ['Optimal', 'Warm', 'Hot', 'Cold'] }],
        calculate: (v) => { const base = parseFloat(v.baseYield); const rain = { 'Excess': 0.85, 'Normal': 1.0, 'Deficit': 0.7, 'Drought': 0.4 }; const temp = { 'Optimal': 1.0, 'Warm': 0.95, 'Hot': 0.8, 'Cold': 0.85 }; const estimated = base * rain[v.rainfall] * temp[v.temperature]; const change = ((estimated - base) / base) * 100; return { result: `${estimated.toFixed(1)} q/acre`, details: `Base yield: ${base} q/acre<br>Rainfall impact: ${v.rainfall}<br>Temperature impact: ${v.temperature}<br>Estimated: ${estimated.toFixed(1)} q/acre<br>Change: ${change > 0 ? '+' : ''}${change.toFixed(1)}%` }; }
    },
    {
        id: 'agri-rainfall', name: 'Rainfall Adequacy Calculator', icon: '🌧️', category: 'Agriculture', description: 'Check rainfall adequacy',
        fields: [{ id: 'actual', label: 'Actual Rainfall (mm)', type: 'number', placeholder: '800' }, { id: 'normal', label: 'Normal Rainfall (mm)', type: 'number', placeholder: '1000' }, { id: 'crop', label: 'Crop Water Need (mm)', type: 'number', placeholder: '600' }],
        calculate: (v) => { const actual = parseFloat(v.actual), normal = parseFloat(v.normal), need = parseFloat(v.crop); const deviation = ((actual - normal) / normal) * 100; const adequacy = (actual / need) * 100; let status = adequacy >= 100 ? '✅ Adequate' : adequacy >= 75 ? '⚠️ Marginally Adequate' : '❌ Deficit'; return { result: status, details: `Actual: ${actual} mm<br>Normal: ${normal} mm<br>Deviation: ${deviation > 0 ? '+' : ''}${deviation.toFixed(1)}%<br>Crop need: ${need} mm<br>Adequacy: ${adequacy.toFixed(1)}%` }; }
    },
    {
        id: 'agri-insurance', name: 'Crop Insurance Premium Calculator', icon: '🛡️', category: 'Agriculture', description: 'Calculate insurance premium',
        fields: [{ id: 'sumInsured', label: 'Sum Insured (₹)', type: 'number', placeholder: '100000' }, { id: 'crop', label: 'Crop Type', type: 'select', options: ['Kharif', 'Rabi', 'Commercial', 'Horticulture'] }, { id: 'subsidy', label: 'Govt Subsidy', type: 'select', options: ['Yes', 'No'] }],
        calculate: (v) => { const sum = parseFloat(v.sumInsured); const rates = { 'Kharif': 2.0, 'Rabi': 1.5, 'Commercial': 5.0, 'Horticulture': 5.0 }; const premium = sum * (rates[v.crop] / 100); const farmerShare = v.subsidy === 'Yes' ? premium * 0.5 : premium; return { result: `₹${farmerShare.toFixed(0)}`, details: `Sum Insured: ₹${sum.toLocaleString()}<br>Premium rate: ${rates[v.crop]}%<br>Total premium: ₹${premium.toFixed(0)}<br>Farmer pays: ₹${farmerShare.toFixed(0)}` }; }
    },
    {
        id: 'agri-greenhouse', name: 'Greenhouse Cost Calculator', icon: '🏡', category: 'Agriculture', description: 'Calculate greenhouse setup cost',
        fields: [{ id: 'area', label: 'Area (sq meters)', type: 'number', placeholder: '500' }, { id: 'type', label: 'Structure Type', type: 'select', options: ['Polyhouse', 'Greenhouse', 'Shade Net', 'Low Tunnel'] }],
        calculate: (v) => { const area = parseFloat(v.area); const costs = { 'Polyhouse': 800, 'Greenhouse': 1500, 'Shade Net': 300, 'Low Tunnel': 150 }; const structureCost = area * costs[v.type]; const irrigation = area * 50; const misc = structureCost * 0.1; const total = structureCost + irrigation + misc; return { result: `₹${total.toLocaleString()}`, details: `Structure: ₹${structureCost.toLocaleString()}<br>Irrigation: ₹${irrigation.toLocaleString()}<br>Miscellaneous: ₹${misc.toFixed(0)}<br>Total: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'agri-organic', name: 'Organic Farming Cost Calculator', icon: '🌿', category: 'Agriculture', description: 'Calculate organic farming costs',
        fields: [{ id: 'area', label: 'Area (acres)', type: 'number', placeholder: '5' }, { id: 'crop', label: 'Crop Category', type: 'select', options: ['Cereals', 'Vegetables', 'Fruits', 'Spices'] }],
        calculate: (v) => { const area = parseFloat(v.area); const baseCosts = { 'Cereals': 25000, 'Vegetables': 45000, 'Fruits': 60000, 'Spices': 50000 }; const certification = 15000; const premiumIncome = baseCosts[v.crop] * 0.3; const cost = baseCosts[v.crop] * area + certification; return { result: `₹${cost.toLocaleString()}`, details: `Per acre cost: ₹${baseCosts[v.crop].toLocaleString()}<br>Total for ${area} acres: ₹${(baseCosts[v.crop] * area).toLocaleString()}<br>Certification: ₹${certification}<br>Total: ₹${cost.toLocaleString()}<br>Premium potential: +30%` }; }
    },
    {
        id: 'agri-compost', name: 'Compost Quantity Calculator', icon: '🍂', category: 'Agriculture', description: 'Calculate compost requirements',
        fields: [{ id: 'area', label: 'Area (sq meters)', type: 'number', placeholder: '1000' }, { id: 'depth', label: 'Application Depth (cm)', type: 'number', placeholder: '5' }, { id: 'type', label: 'Compost Type', type: 'select', options: ['Vermicompost', 'Farm Compost', 'Green Manure', 'Biogas Slurry'] }],
        calculate: (v) => { const area = parseFloat(v.area), depth = parseFloat(v.depth) / 100; const volume = area * depth; const density = { 'Vermicompost': 600, 'Farm Compost': 500, 'Green Manure': 400, 'Biogas Slurry': 800 }; const weight = volume * density[v.type]; return { result: `${weight.toFixed(0)} kg`, details: `Volume needed: ${volume.toFixed(2)} m³<br>Density: ${density[v.type]} kg/m³<br>Total: ${weight.toFixed(0)} kg<br>= ${(weight / 1000).toFixed(2)} tonnes` }; }
    },
    {
        id: 'agri-livestock-feed', name: 'Livestock Feed Calculator', icon: '🐄', category: 'Agriculture', description: 'Calculate animal feed requirements',
        fields: [{ id: 'animal', label: 'Animal Type', type: 'select', options: ['Dairy Cow', 'Buffalo', 'Goat', 'Sheep'] }, { id: 'weight', label: 'Body Weight (kg)', type: 'number', placeholder: '400' }, { id: 'days', label: 'Days', type: 'number', placeholder: '30' }],
        calculate: (v) => { const weight = parseFloat(v.weight), days = parseFloat(v.days); const dryMatter = { 'Dairy Cow': 0.03, 'Buffalo': 0.025, 'Goat': 0.04, 'Sheep': 0.035 }; const dailyFeed = weight * dryMatter[v.animal]; const totalFeed = dailyFeed * days; const green = totalFeed * 4; return { result: `${totalFeed.toFixed(0)} kg dry matter`, details: `Daily requirement: ${dailyFeed.toFixed(1)} kg DM<br>For ${days} days: ${totalFeed.toFixed(0)} kg DM<br>Green fodder equivalent: ~${green.toFixed(0)} kg` }; }
    },
    {
        id: 'agri-milk-yield', name: 'Milk Yield Calculator', icon: '🥛', category: 'Agriculture', description: 'Estimate milk production',
        fields: [{ id: 'breed', label: 'Breed', type: 'select', options: ['HF Crossbred', 'Jersey Crossbred', 'Indigenous', 'Buffalo'] }, { id: 'lactation', label: 'Lactation Stage', type: 'select', options: ['Early', 'Mid', 'Late'] }, { id: 'feedQuality', label: 'Feed Quality', type: 'select', options: ['Excellent', 'Good', 'Average'] }],
        calculate: (v) => { const baseYield = { 'HF Crossbred': 15, 'Jersey Crossbred': 12, 'Indigenous': 5, 'Buffalo': 8 }; const stage = { 'Early': 1.2, 'Mid': 1.0, 'Late': 0.7 }; const feed = { 'Excellent': 1.1, 'Good': 1.0, 'Average': 0.85 }; const daily = baseYield[v.breed] * stage[v.lactation] * feed[v.feedQuality]; const monthly = daily * 30; return { result: `${daily.toFixed(1)} L/day`, details: `Breed: ${v.breed}<br>Stage: ${v.lactation}<br>Daily yield: ${daily.toFixed(1)} L<br>Monthly: ${monthly.toFixed(0)} L` }; }
    },
    {
        id: 'agri-poultry-feed', name: 'Poultry Feed Calculator', icon: '🐔', category: 'Agriculture', description: 'Calculate poultry feed needs',
        fields: [{ id: 'birds', label: 'Number of Birds', type: 'number', placeholder: '500' }, { id: 'type', label: 'Bird Type', type: 'select', options: ['Broiler', 'Layer', 'Desi Chicken'] }, { id: 'age', label: 'Age (weeks)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const birds = parseInt(v.birds), age = parseInt(v.age); const feedRates = { 'Broiler': age < 3 ? 50 : age < 6 ? 100 : 150, 'Layer': age < 8 ? 60 : 120, 'Desi Chicken': age < 4 ? 30 : 80 }; const dailyPerBird = feedRates[v.type]; const totalDaily = (dailyPerBird * birds) / 1000; const monthlyFeed = totalDaily * 30; return { result: `${totalDaily.toFixed(1)} kg/day`, details: `Per bird: ${dailyPerBird} g/day<br>Daily total: ${totalDaily.toFixed(1)} kg<br>Monthly: ${monthlyFeed.toFixed(0)} kg<br>Cost @₹35/kg: ₹${(monthlyFeed * 35).toFixed(0)}` }; }
    },
    {
        id: 'agri-fish-density', name: 'Fish Farming Density Calculator', icon: '🐟', category: 'Agriculture', description: 'Calculate fish stocking density',
        fields: [{ id: 'pondArea', label: 'Pond Area (sq meters)', type: 'number', placeholder: '1000' }, { id: 'depth', label: 'Average Depth (m)', type: 'number', placeholder: '1.5' }, { id: 'species', label: 'Fish Species', type: 'select', options: ['Catla', 'Rohu', 'Tilapia', 'Pangasius'] }],
        calculate: (v) => { const area = parseFloat(v.pondArea), depth = parseFloat(v.depth); const volume = area * depth; const density = { 'Catla': 3, 'Rohu': 4, 'Tilapia': 10, 'Pangasius': 15 }; const fishPerCubic = density[v.species]; const totalFish = volume * fishPerCubic; return { result: `${totalFish.toFixed(0)} fish`, details: `Pond volume: ${volume.toFixed(0)} m³<br>Stocking density: ${fishPerCubic}/m³<br>Total fingerlings: ${totalFish.toFixed(0)}<br>Expected harvest: ${(totalFish * 0.8).toFixed(0)} fish` }; }
    },
    {
        id: 'agri-subsidy', name: 'Agriculture Subsidy Eligibility Calculator', icon: '📋', category: 'Agriculture', description: 'Check subsidy eligibility',
        fields: [{ id: 'landSize', label: 'Land Holding (acres)', type: 'number', placeholder: '2' }, { id: 'category', label: 'Farmer Category', type: 'select', options: ['Small/Marginal', 'Small', 'Medium', 'Large'] }, { id: 'scheme', label: 'Scheme Type', type: 'select', options: ['PM-KISAN', 'Irrigation', 'Equipment', 'Crop Insurance'] }],
        calculate: (v) => {
            const land = parseFloat(v.landSize); const eligibility = {
                'PM-KISAN': land <= 5
                    ? '✅ Eligible - ₹6000/year' : '❌ Not Eligible', 'Irrigation': v.category !== 'Large' ? '✅ Eligible - 50-90% subsidy' : '✅ Eligible - 35% subsidy', 'Equipment': v.category === 'Small/Marginal' ? '✅ Eligible - 50% subsidy' : '✅ Eligible - 40% subsidy', 'Crop Insurance': '✅ Eligible - Premium subsidy'
            }; return { result: eligibility[v.scheme], details: `Land: ${land} acres<br>Category: ${v.category}<br>Scheme: ${v.scheme}<br>Status: ${eligibility[v.scheme]}` };
        }
    }
];
if (typeof window !== 'undefined') window.agricultureCalculators = agricultureCalculators;
