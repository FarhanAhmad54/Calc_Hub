// Cooking, Food & Kitchen Calculators
const cookingCalculators = [
    {
        id: 'cook-scale', name: 'Recipe Ingredient Scaler', icon: '📏', category: 'Cooking', description: 'Scale recipe ingredients',
        fields: [{ id: 'original', label: 'Original Servings', type: 'number', placeholder: '4' }, { id: 'desired', label: 'Desired Servings', type: 'number', placeholder: '8' }, { id: 'amount', label: 'Ingredient Amount', type: 'number', placeholder: '200' }, { id: 'unit', label: 'Unit', type: 'text', placeholder: 'grams' }],
        calculate: (v) => { const orig = parseFloat(v.original), desired = parseFloat(v.desired), amount = parseFloat(v.amount); const scaled = (amount / orig) * desired; const ratio = desired / orig; return { result: `${scaled.toFixed(1)} ${v.unit}`, details: `Scale factor: ${ratio.toFixed(2)}x<br>Original: ${amount} ${v.unit} for ${orig}<br>Scaled: ${scaled.toFixed(1)} ${v.unit} for ${desired}` }; }
    },
    {
        id: 'cook-serving', name: 'Serving Size Calculator', icon: '🍽️', category: 'Cooking', description: 'Calculate portions',
        fields: [{ id: 'totalWeight', label: 'Total Dish Weight (g)', type: 'number', placeholder: '1000' }, { id: 'servings', label: 'Number of Servings', type: 'number', placeholder: '4' }, { id: 'calories', label: 'Total Calories', type: 'number', placeholder: '1200' }],
        calculate: (v) => { const weight = parseFloat(v.totalWeight), servings = parseInt(v.servings), cals = parseFloat(v.calories); const perServing = weight / servings; const calsPerServing = cals / servings; return { result: `${perServing.toFixed(0)} g/serving`, details: `Per serving:<br>Weight: ${perServing.toFixed(0)} g<br>Calories: ${calsPerServing.toFixed(0)} kcal` }; }
    },
    {
        id: 'cook-time', name: 'Cooking Time Adjustment Calculator', icon: '⏱️', category: 'Cooking', description: 'Adjust cooking time for quantity',
        fields: [{ id: 'baseTime', label: 'Base Cooking Time (min)', type: 'number', placeholder: '30' }, { id: 'baseWeight', label: 'Base Weight (kg)', type: 'number', placeholder: '1' }, { id: 'actualWeight', label: 'Actual Weight (kg)', type: 'number', placeholder: '2' }],
        calculate: (v) => { const baseTime = parseFloat(v.baseTime), baseW = parseFloat(v.baseWeight), actualW = parseFloat(v.actualWeight); const ratio = actualW / baseW; const adjusted = baseTime * Math.pow(ratio, 0.5); return { result: `${adjusted.toFixed(0)} minutes`, details: `Base: ${baseTime} min for ${baseW} kg<br>Ratio: ${ratio.toFixed(2)}x<br>Adjusted: ${adjusted.toFixed(0)} min for ${actualW} kg` }; }
    },
    {
        id: 'cook-temp', name: 'Baking Temperature Converter', icon: '🌡️', category: 'Cooking', description: 'Convert oven temperatures',
        fields: [{ id: 'temp', label: 'Temperature', type: 'number', placeholder: '180' }, { id: 'from', label: 'From', type: 'select', options: ['Celsius', 'Fahrenheit', 'Gas Mark'] }],
        calculate: (v) => { const temp = parseFloat(v.temp); let c, f, gas; if (v.from === 'Celsius') { c = temp; f = (temp * 9 / 5) + 32; gas = (c - 135) / 14 + 1; } else if (v.from === 'Fahrenheit') { f = temp; c = (temp - 32) * 5 / 9; gas = (c - 135) / 14 + 1; } else { gas = temp; c = 135 + (temp - 1) * 14; f = (c * 9 / 5) + 32; } return { result: `${c.toFixed(0)}°C = ${f.toFixed(0)}°F`, details: `Celsius: ${c.toFixed(0)}°C<br>Fahrenheit: ${f.toFixed(0)}°F<br>Gas Mark: ${Math.round(gas)}` }; }
    },
    {
        id: 'cook-calories', name: 'Calories Per Recipe Calculator', icon: '🔥', category: 'Cooking', description: 'Calculate total recipe calories',
        fields: [{ id: 'ingredients', label: 'Calories per ingredient (comma sep)', type: 'text', placeholder: '200,150,100,50' }, { id: 'servings', label: 'Number of Servings', type: 'number', placeholder: '4' }],
        calculate: (v) => { const cals = v.ingredients.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const total = cals.reduce((a, b) => a + b, 0); const perServing = total / parseInt(v.servings); return { result: `${total.toFixed(0)} kcal total`, details: `Total: ${total.toFixed(0)} kcal<br>Per serving: ${perServing.toFixed(0)} kcal<br>Ingredients: ${cals.length}` }; }
    },
    {
        id: 'cook-macros', name: 'Macronutrients Per Meal', icon: '📊', category: 'Cooking', description: 'Calculate meal macros',
        fields: [{ id: 'protein', label: 'Protein (g)', type: 'number', placeholder: '30' }, { id: 'carbs', label: 'Carbs (g)', type: 'number', placeholder: '50' }, { id: 'fat', label: 'Fat (g)', type: 'number', placeholder: '15' }],
        calculate: (v) => { const p = parseFloat(v.protein), c = parseFloat(v.carbs), f = parseFloat(v.fat); const cals = (p * 4) + (c * 4) + (f * 9); const pPct = (p * 4 / cals) * 100; const cPct = (c * 4 / cals) * 100; const fPct = (f * 9 / cals) * 100; return { result: `${cals.toFixed(0)} kcal`, details: `Protein: ${p}g (${pPct.toFixed(1)}%)<br>Carbs: ${c}g (${cPct.toFixed(1)}%)<br>Fat: ${f}g (${fPct.toFixed(1)}%)<br>Total: ${cals.toFixed(0)} kcal` }; }
    },
    {
        id: 'cook-portion', name: 'Portion Control Calculator', icon: '⚖️', category: 'Cooking', description: 'Calculate ideal portions',
        fields: [{ id: 'type', label: 'Food Type', type: 'select', options: ['Protein', 'Carbs', 'Vegetables', 'Fats'] }, { id: 'goal', label: 'Diet Goal', type: 'select', options: ['Weight Loss', 'Maintenance', 'Muscle Gain'] }],
        calculate: (v) => { const portions = { 'Protein': { 'Weight Loss': 150, 'Maintenance': 180, 'Muscle Gain': 220 }, 'Carbs': { 'Weight Loss': 80, 'Maintenance': 150, 'Muscle Gain': 200 }, 'Vegetables': { 'Weight Loss': 200, 'Maintenance': 200, 'Muscle Gain': 200 }, 'Fats': { 'Weight Loss': 20, 'Maintenance': 30, 'Muscle Gain': 40 } }; const portion = portions[v.type][v.goal]; return { result: `${portion}g per meal`, details: `${v.type} portion for ${v.goal}:<br>Recommended: ${portion}g<br>Tip: Use a food scale for accuracy` }; }
    },
    {
        id: 'cook-rice', name: 'Water-to-Rice Ratio Calculator', icon: '🍚', category: 'Cooking', description: 'Calculate rice water ratio',
        fields: [{ id: 'rice', label: 'Rice Amount (cups)', type: 'number', placeholder: '2' }, { id: 'type', label: 'Rice Type', type: 'select', options: ['Long Grain', 'Basmati', 'Jasmine', 'Short Grain', 'Brown Rice'] }],
        calculate: (v) => { const rice = parseFloat(v.rice); const ratios = { 'Long Grain': 1.5, 'Basmati': 1.5, 'Jasmine': 1.25, 'Short Grain': 1.25, 'Brown Rice': 2.5 }; const water = rice * ratios[v.type]; return { result: `${water.toFixed(1)} cups water`, details: `${v.type}: ${ratios[v.type]}:1 ratio<br>Rice: ${rice} cups<br>Water: ${water.toFixed(1)} cups` }; }
    },
    {
        id: 'cook-hydration', name: 'Dough Hydration Calculator', icon: '🥖', category: 'Cooking', description: 'Calculate bread dough hydration',
        fields: [{ id: 'flour', label: 'Flour Weight (g)', type: 'number', placeholder: '500' }, { id: 'water', label: 'Water Weight (g)', type: 'number', placeholder: '325' }],
        calculate: (v) => { const flour = parseFloat(v.flour), water = parseFloat(v.water); const hydration = (water / flour) * 100; let type = hydration < 60 ? 'Low (stiff)' : hydration < 70 ? 'Medium' : hydration < 80 ? 'High' : 'Very High (ciabatta)'; return { result: `${hydration.toFixed(1)}% hydration`, details: `Flour: ${flour}g<br>Water: ${water}g<br>Hydration: ${hydration.toFixed(1)}%<br>Type: ${type}` }; }
    },
    {
        id: 'cook-yeast', name: 'Yeast Quantity Calculator', icon: '🧫', category: 'Cooking', description: 'Calculate yeast for bread',
        fields: [{ id: 'flour', label: 'Flour Weight (g)', type: 'number', placeholder: '500' }, { id: 'yeastType', label: 'Yeast Type', type: 'select', options: ['Active Dry', 'Instant', 'Fresh'] }, { id: 'method', label: 'Method', type: 'select', options: ['Quick Rise', 'Standard', 'Slow Rise'] }],
        calculate: (v) => { const flour = parseFloat(v.flour); const baseRate = { 'Quick Rise': 0.02, 'Standard': 0.01, 'Slow Rise': 0.005 }; const conversion = { 'Active Dry': 1, 'Instant': 0.75, 'Fresh': 3 }; const yeast = flour * baseRate[v.method] * conversion[v.yeastType]; return { result: `${yeast.toFixed(1)}g yeast`, details: `Flour: ${flour}g<br>Yeast type: ${v.yeastType}<br>Method: ${v.method}<br>Yeast needed: ${yeast.toFixed(1)}g` }; }
    },
    {
        id: 'cook-sugar', name: 'Sugar Reduction Calculator', icon: '🍬', category: 'Cooking', description: 'Reduce sugar in recipes',
        fields: [{ id: 'original', label: 'Original Sugar (g)', type: 'number', placeholder: '200' }, { id: 'reduction', label: 'Reduction %', type: 'number', placeholder: '25' }, { id: 'substitute', label: 'Substitute', type: 'select', options: ['None', 'Honey', 'Stevia', 'Maple Syrup'] }],
        calculate: (v) => { const original = parseFloat(v.original), reduction = parseFloat(v.reduction); const reduced = original * (1 - reduction / 100); const subs = { 'None': 0, 'Honey': 0.75, 'Stevia': 0.005, 'Maple Syrup': 0.75 }; const subAmount = (original - reduced) * subs[v.substitute]; return { result: `${reduced.toFixed(0)}g sugar`, details: `Original: ${original}g<br>Reduced by ${reduction}%: ${reduced.toFixed(0)}g<br>${v.substitute !== 'None' ? `${v.substitute}: ${subAmount.toFixed(1)}g` : ''}` }; }
    },
    {
        id: 'cook-oil', name: 'Oil Absorption Calculator', icon: '🫒', category: 'Cooking', description: 'Calculate oil absorbed',
        fields: [{ id: 'foodWeight', label: 'Food Weight (g)', type: 'number', placeholder: '500' }, { id: 'method', label: 'Cooking Method', type: 'select', options: ['Deep Fry', 'Shallow Fry', 'Pan Fry', 'Air Fry'] }],
        calculate: (v) => { const weight = parseFloat(v.foodWeight); const absorption = { 'Deep Fry': 0.15, 'Shallow Fry': 0.08, 'Pan Fry': 0.05, 'Air Fry': 0.01 }; const oil = weight * absorption[v.method]; const calories = oil * 9; return { result: `${oil.toFixed(0)}g oil absorbed`, details: `Method: ${v.method}<br>Absorption: ${(absorption[v.method] * 100).toFixed(0)}%<br>Oil absorbed: ${oil.toFixed(0)}g<br>Added calories: ${calories.toFixed(0)} kcal` }; }
    },
    {
        id: 'cook-spice', name: 'Spice Ratio Calculator', icon: '🌶️', category: 'Cooking', description: 'Calculate spice blends',
        fields: [{ id: 'base', label: 'Base Spice (parts)', type: 'number', placeholder: '4' }, { id: 'secondary', label: 'Secondary (parts)', type: 'number', placeholder: '2' }, { id: 'accent', label: 'Accent (parts)', type: 'number', placeholder: '1' }, { id: 'total', label: 'Total Blend (g)', type: 'number', placeholder: '70' }],
        calculate: (v) => { const base = parseFloat(v.base), sec = parseFloat(v.secondary), acc = parseFloat(v.accent), total = parseFloat(v.total); const sum = base + sec + acc; const baseG = (base / sum) * total; const secG = (sec / sum) * total; const accG = (acc / sum) * total; return { result: `${baseG.toFixed(0)}g : ${secG.toFixed(0)}g : ${accG.toFixed(0)}g`, details: `Ratio: ${base}:${sec}:${acc}<br>Base: ${baseG.toFixed(1)}g<br>Secondary: ${secG.toFixed(1)}g<br>Accent: ${accG.toFixed(1)}g` }; }
    },
    {
        id: 'cook-plate-cost', name: 'Food Cost Per Plate Calculator', icon: '💵', category: 'Cooking', description: 'Calculate cost per plate',
        fields: [{ id: 'ingredients', label: 'Total Ingredient Cost (₹)', type: 'number', placeholder: '500' }, { id: 'servings', label: 'Number of Servings', type: 'number', placeholder: '5' }, { id: 'overhead', label: 'Overhead %', type: 'number', placeholder: '20' }],
        calculate: (v) => { const cost = parseFloat(v.ingredients), servings = parseInt(v.servings), overhead = parseFloat(v.overhead); const perPlate = cost / servings; const withOverhead = perPlate * (1 + overhead / 100); return { result: `₹${withOverhead.toFixed(2)}/plate`, details: `Ingredient cost: ₹${cost}<br>Per plate: ₹${perPlate.toFixed(2)}<br>With ${overhead}% overhead: ₹${withOverhead.toFixed(2)}` }; }
    },
    {
        id: 'cook-catering', name: 'Catering Cost Calculator', icon: '🍱', category: 'Cooking', description: 'Calculate catering costs',
        fields: [{ id: 'guests', label: 'Number of Guests', type: 'number', placeholder: '100' }, { id: 'courses', label: 'Number of Courses', type: 'number', placeholder: '3' }, { id: 'perCourse', label: 'Cost Per Course (₹)', type: 'number', placeholder: '150' }],
        calculate: (v) => { const guests = parseInt(v.guests), courses = parseInt(v.courses), perCourse = parseFloat(v.perCourse); const foodCost = guests * courses * perCourse; const service = foodCost * 0.15; const total = foodCost + service; return { result: `₹${total.toLocaleString()}`, details: `Guests: ${guests}<br>Courses: ${courses}<br>Food: ₹${foodCost.toLocaleString()}<br>Service (15%): ₹${service.toFixed(0)}<br>Total: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'cook-menu-price', name: 'Restaurant Menu Pricing Calculator', icon: '📋', category: 'Cooking', description: 'Calculate menu prices',
        fields: [{ id: 'foodCost', label: 'Food Cost (₹)', type: 'number', placeholder: '80' }, { id: 'foodCostPct', label: 'Target Food Cost %', type: 'number', placeholder: '30' }],
        calculate: (v) => { const cost = parseFloat(v.foodCost), pct = parseFloat(v.foodCostPct); const price = cost / (pct / 100); const profit = price - cost; const profitPct = (profit / price) * 100; return { result: `₹${price.toFixed(0)}`, details: `Food cost: ₹${cost}<br>Target: ${pct}%<br>Menu price: ₹${price.toFixed(0)}<br>Gross profit: ₹${profit.toFixed(0)} (${profitPct.toFixed(1)}%)` }; }
    },
    {
        id: 'cook-gross-cost', name: 'Gross Food Cost Calculator', icon: '📊', category: 'Cooking', description: 'Calculate gross food cost %',
        fields: [{ id: 'foodPurchase', label: 'Food Purchases (₹)', type: 'number', placeholder: '50000' }, { id: 'sales', label: 'Food Sales (₹)', type: 'number', placeholder: '150000' }],
        calculate: (v) => { const purchases = parseFloat(v.foodPurchase), sales = parseFloat(v.sales); const pct = (purchases / sales) * 100; let status = pct < 25 ? 'Excellent' : pct < 30 ? 'Good' : pct < 35 ? 'Average' : 'High'; return { result: `${pct.toFixed(1)}%`, details: `Purchases: ₹${purchases.toLocaleString()}<br>Sales: ₹${sales.toLocaleString()}<br>Food Cost: ${pct.toFixed(1)}%<br>Status: ${status}` }; }
    },
    {
        id: 'cook-wastage', name: 'Food Wastage Calculator', icon: '🗑️', category: 'Cooking', description: 'Calculate food waste',
        fields: [{ id: 'prepared', label: 'Food Prepared (kg)', type: 'number', placeholder: '50' }, { id: 'served', label: 'Food Served (kg)', type: 'number', placeholder: '45' }, { id: 'returned', label: 'Plate Waste (kg)', type: 'number', placeholder: '3' }],
        calculate: (v) => { const prepared = parseFloat(v.prepared), served = parseFloat(v.served), returned = parseFloat(v.returned); const prepWaste = prepared - served; const totalWaste = prepWaste + returned; const pct = (totalWaste / prepared) * 100; return { result: `${pct.toFixed(1)}% waste`, details: `Prepared: ${prepared} kg<br>Prep waste: ${prepWaste} kg<br>Plate waste: ${returned} kg<br>Total: ${totalWaste} kg (${pct.toFixed(1)}%)` }; }
    },
    {
        id: 'cook-shelf', name: 'Shelf Life Estimator', icon: '📅', category: 'Cooking', description: 'Estimate food shelf life',
        fields: [{ id: 'food', label: 'Food Type', type: 'select', options: ['Cooked Rice', 'Cooked Meat', 'Fresh Salad', 'Soup', 'Baked Goods', 'Dairy'] }, { id: 'storage', label: 'Storage', type: 'select', options: ['Room Temp', 'Refrigerator', 'Freezer'] }],
        calculate: (v) => { const shelf = { 'Cooked Rice': { 'Room Temp': '4 hours', 'Refrigerator': '4-6 days', 'Freezer': '6 months' }, 'Cooked Meat': { 'Room Temp': '2 hours', 'Refrigerator': '3-4 days', 'Freezer': '3 months' }, 'Fresh Salad': { 'Room Temp': '2 hours', 'Refrigerator': '3-5 days', 'Freezer': 'Not recommended' }, 'Soup': { 'Room Temp': '2 hours', 'Refrigerator': '4-5 days', 'Freezer': '3 months' }, 'Baked Goods': { 'Room Temp': '3-5 days', 'Refrigerator': '1 week', 'Freezer': '3 months' }, 'Dairy': { 'Room Temp': '2 hours', 'Refrigerator': '1-2 weeks', 'Freezer': '3 months' } }; const life = shelf[v.food][v.storage]; return { result: life, details: `${v.food}<br>Storage: ${v.storage}<br>Shelf life: ${life}` }; }
    },
    {
        id: 'cook-freezer', name: 'Freezer Storage Time Calculator', icon: '🧊', category: 'Cooking', description: 'Calculate safe freezer storage',
        fields: [{ id: 'food', label: 'Food Type', type: 'select', options: ['Raw Meat', 'Cooked Meat', 'Fish', 'Vegetables', 'Bread', 'Ice Cream'] }],
        calculate: (v) => { const times = { 'Raw Meat': { optimal: '4-12 months', max: '12 months' }, 'Cooked Meat': { optimal: '2-3 months', max: '6 months' }, 'Fish': { optimal: '2-3 months', max: '6 months' }, 'Vegetables': { optimal: '8-12 months', max: '12 months' }, 'Bread': { optimal: '3-6 months', max: '12 months' }, 'Ice Cream': { optimal: '2-4 months', max: '6 months' } }; const t = times[v.food]; return { result: t.optimal, details: `${v.food}<br>Optimal quality: ${t.optimal}<br>Maximum safe: ${t.max}<br>Tip: Label with date!` }; }
    },
    {
        id: 'cook-defrost', name: 'Defrost Time Calculator', icon: '⏰', category: 'Cooking', description: 'Calculate defrosting time',
        fields: [{ id: 'weight', label: 'Food Weight (kg)', type: 'number', placeholder: '2' }, { id: 'method', label: 'Method', type: 'select', options: ['Refrigerator', 'Cold Water', 'Microwave'] }],
        calculate: (v) => { const weight = parseFloat(v.weight); const rates = { 'Refrigerator': 24, 'Cold Water': 2, 'Microwave': 0.1 }; const hours = weight * rates[v.method]; const display = v.method === 'Microwave' ? `${(hours * 60).toFixed(0)} minutes` : `${hours.toFixed(1)} hours`; return { result: display, details: `Weight: ${weight} kg<br>Method: ${v.method}<br>Time: ${display}<br>${v.method === 'Refrigerator' ? 'Safest method' : 'Cook immediately after'}` }; }
    },
    {
        id: 'cook-marinade', name: 'Marinade Ratio Calculator', icon: '🥩', category: 'Cooking', description: 'Calculate marinade proportions',
        fields: [{ id: 'meat', label: 'Meat Weight (kg)', type: 'number', placeholder: '1' }, { id: 'type', label: 'Marinade Type', type: 'select', options: ['Asian Style', 'Mediterranean', 'Indian', 'BBQ'] }],
        calculate: (v) => { const weight = parseFloat(v.meat); const ratios = { 'Asian Style': { oil: 30, acid: 30, flavor: 40 }, 'Mediterranean': { oil: 40, acid: 30, flavor: 30 }, 'Indian': { oil: 20, acid: 30, flavor: 50 }, 'BBQ': { oil: 25, acid: 25, flavor: 50 } }; const total = weight * 200; const r = ratios[v.type]; return { result: `${total.toFixed(0)}ml marinade`, details: `For ${weight} kg meat:<br>Oil: ${(total * r.oil / 100).toFixed(0)}ml<br>Acid: ${(total * r.acid / 100).toFixed(0)}ml<br>Flavoring: ${(total * r.flavor / 100).toFixed(0)}ml` }; }
    },
    {
        id: 'cook-coffee', name: 'Coffee Brew Ratio Calculator', icon: '☕', category: 'Cooking', description: 'Calculate coffee-water ratio',
        fields: [{ id: 'water', label: 'Water Amount (ml)', type: 'number', placeholder: '250' }, { id: 'method', label: 'Brew Method', type: 'select', options: ['Pour Over', 'French Press', 'Espresso', 'Cold Brew'] }],
        calculate: (v) => { const water = parseFloat(v.water); const ratios = { 'Pour Over': 16, 'French Press': 15, 'Espresso': 2, 'Cold Brew': 8 }; const coffee = water / ratios[v.method]; return { result: `${coffee.toFixed(1)}g coffee`, details: `Method: ${v.method}<br>Ratio: 1:${ratios[v.method]}<br>Water: ${water}ml<br>Coffee: ${coffee.toFixed(1)}g` }; }
    },
    {
        id: 'cook-tea', name: 'Tea Strength Calculator', icon: '🍵', category: 'Cooking', description: 'Calculate tea brewing',
        fields: [{ id: 'cups', label: 'Number of Cups', type: 'number', placeholder: '4' }, { id: 'strength', label: 'Strength', type: 'select', options: ['Light', 'Medium', 'Strong'] }, { id: 'type', label: 'Tea Type', type: 'select', options: ['Green', 'Black', 'Oolong', 'Herbal'] }],
        calculate: (v) => { const cups = parseInt(v.cups); const tspPerCup = { 'Light': 0.75, 'Medium': 1, 'Strong': 1.5 }; const steepTime = { 'Green': 2, 'Black': 4, 'Oolong': 3, 'Herbal': 5 }; const tea = cups * tspPerCup[v.strength]; return { result: `${tea.toFixed(1)} tsp tea`, details: `${cups} cups ${v.strength}<br>Tea: ${tea.toFixed(1)} tsp<br>Steep: ${steepTime[v.type]} min<br>Temp: ${v.type === 'Green' ? '75-80°C' : '95-100°C'}` }; }
    },
    {
        id: 'cook-smoothie', name: 'Smoothie Nutrition Calculator', icon: '🥤', category: 'Cooking', description: 'Calculate smoothie nutrition',
        fields: [{ id: 'banana', label: 'Banana (pieces)', type: 'number', placeholder: '1' }, { id: 'berries', label: 'Berries (g)', type: 'number', placeholder: '100' }, { id: 'milk', label: 'Milk (ml)', type: 'number', placeholder: '200' }, { id: 'protein', label: 'Protein Powder (g)', type: 'number', placeholder: '25' }],
        calculate: (v) => { const banana = parseFloat(v.banana) * 90; const berries = parseFloat(v.berries) * 0.5; const milk = parseFloat(v.milk) * 0.42; const protein = parseFloat(v.protein) * 4; const total = banana + berries + milk + protein; const proteinG = (parseFloat(v.protein) * 0.8) + (parseFloat(v.milk) * 0.034); return { result: `${total.toFixed(0)} kcal`, details: `Banana: ${banana.toFixed(0)} kcal<br>Berries: ${berries.toFixed(0)} kcal<br>Milk: ${milk.toFixed(0)} kcal<br>Protein: ~${proteinG.toFixed(0)}g<br>Total: ${total.toFixed(0)} kcal` }; }
    },
    {
        id: 'cook-party', name: 'Party Food Quantity Calculator', icon: '🎉', category: 'Cooking', description: 'Calculate party portions',
        fields: [{ id: 'guests', label: 'Number of Guests', type: 'number', placeholder: '50' }, { id: 'duration', label: 'Party Duration (hours)', type: 'number', placeholder: '4' }, { id: 'type', label: 'Party Type', type: 'select', options: ['Appetizers Only', 'Dinner Party', 'Cocktail Party', 'Full Buffet'] }],
        calculate: (v) => { const guests = parseInt(v.guests), hours = parseFloat(v.duration); const portions = { 'Appetizers Only': { pieces: 8, drinks: 2 }, 'Dinner Party': { pieces: 1, drinks: 3 }, 'Cocktail Party': { pieces: 12, drinks: 4 }, 'Full Buffet': { pieces: 1, drinks: 3 } }; const p = portions[v.type]; const food = guests * p.pieces * (hours / 3); const drinks = guests * p.drinks * hours; return { result: `${food.toFixed(0)} portions`, details: `Guests: ${guests}<br>Food portions: ${food.toFixed(0)}<br>Drinks: ${drinks.toFixed(0)}<br>Tip: Add 10% buffer` }; }
    },
    {
        id: 'cook-event', name: 'Event Catering Planner', icon: '📝', category: 'Cooking', description: 'Plan event catering',
        fields: [{ id: 'guests', label: 'Expected Guests', type: 'number', placeholder: '150' }, { id: 'mealType', label: 'Meal Type', type: 'select', options: ['Breakfast', 'Lunch', 'Dinner', 'High Tea'] }, { id: 'budget', label: 'Budget Per Head (₹)', type: 'number', placeholder: '500' }],
        calculate: (v) => { const guests = parseInt(v.guests), budget = parseFloat(v.budget); const foodPct = { 'Breakfast': 0.6, 'Lunch': 0.65, 'Dinner': 0.65, 'High Tea': 0.55 }; const totalBudget = guests * budget; const foodBudget = totalBudget * foodPct[v.mealType]; const staffBudget = totalBudget * 0.15; const decor = totalBudget * 0.1; return { result: `₹${totalBudget.toLocaleString()} total`, details: `Food (${(foodPct[v.mealType] * 100).toFixed(0)}%): ₹${foodBudget.toLocaleString()}<br>Staff: ₹${staffBudget.toLocaleString()}<br>Decor: ₹${decor.toLocaleString()}<br>Buffer: ₹${(totalBudget * 0.1).toLocaleString()}` }; }
    },
    {
        id: 'cook-home-budget', name: 'Home Cooking Budget Calculator', icon: '🏠', category: 'Cooking', description: 'Plan home cooking budget',
        fields: [{ id: 'family', label: 'Family Size', type: 'number', placeholder: '4' }, { id: 'meals', label: 'Meals at Home/Day', type: 'number', placeholder: '2' }, { id: 'type', label: 'Diet Type', type: 'select', options: ['Vegetarian', 'Non-Veg', 'Mixed'] }],
        calculate: (v) => { const family = parseInt(v.family), meals = parseInt(v.meals); const perMeal = { 'Vegetarian': 50, 'Non-Veg': 80, 'Mixed': 65 }; const daily = family * meals * perMeal[v.type]; const monthly = daily * 30; return { result: `₹${monthly.toLocaleString()}/month`, details: `Daily: ₹${daily.toFixed(0)}<br>Weekly: ₹${(daily * 7).toLocaleString()}<br>Monthly: ₹${monthly.toLocaleString()}<br>Per person/meal: ₹${perMeal[v.type]}` }; }
    },
    {
        id: 'cook-restaurant-profit', name: 'Restaurant Profit Calculator', icon: '📈', category: 'Cooking', description: 'Calculate restaurant profit',
        fields: [{ id: 'revenue', label: 'Monthly Revenue (₹)', type: 'number', placeholder: '500000' }, { id: 'foodCost', label: 'Food Cost %', type: 'number', placeholder: '30' }, { id: 'laborCost', label: 'Labor Cost %', type: 'number', placeholder: '25' }, { id: 'overhead', label: 'Overhead %', type: 'number', placeholder: '20' }],
        calculate: (v) => { const revenue = parseFloat(v.revenue); const food = revenue * parseFloat(v.foodCost) / 100; const labor = revenue * parseFloat(v.laborCost) / 100; const overhead = revenue * parseFloat(v.overhead) / 100; const profit = revenue - food - labor - overhead; const margin = (profit / revenue) * 100; return { result: `₹${profit.toLocaleString()} profit`, details: `Revenue: ₹${revenue.toLocaleString()}<br>Food: ₹${food.toLocaleString()}<br>Labor: ₹${labor.toLocaleString()}<br>Overhead: ₹${overhead.toLocaleString()}<br>Profit: ₹${profit.toLocaleString()} (${margin.toFixed(1)}%)` }; }
    },
    {
        id: 'cook-meal-plan', name: 'Daily Meal Planner Calculator', icon: '📅', category: 'Cooking', description: 'Plan daily calorie intake',
        fields: [{ id: 'calories', label: 'Daily Calorie Target', type: 'number', placeholder: '2000' }, { id: 'meals', label: 'Number of Meals', type: 'number', placeholder: '3' }, { id: 'snacks', label: 'Number of Snacks', type: 'number', placeholder: '2' }],
        calculate: (v) => { const total = parseFloat(v.calories), meals = parseInt(v.meals), snacks = parseInt(v.snacks); const mealCals = total * 0.8 / meals; const snackCals = total * 0.2 / snacks; return { result: `${mealCals.toFixed(0)} kcal/meal`, details: `Total: ${total} kcal<br>Per meal: ${mealCals.toFixed(0)} kcal<br>Per snack: ${snackCals.toFixed(0)} kcal<br>Meals: ${meals} × ${mealCals.toFixed(0)} = ${(mealCals * meals).toFixed(0)}<br>Snacks: ${snacks} × ${snackCals.toFixed(0)} = ${(snackCals * snacks).toFixed(0)}` }; }
    }
];
if (typeof window !== 'undefined') window.cookingCalculators = cookingCalculators;
