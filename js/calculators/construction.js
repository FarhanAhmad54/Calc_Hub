// Construction Calculators
const constructionCalculators = [
    {
        id: 'con-cement', name: 'Cement Quantity Calculator', icon: '🧱', category: 'Construction', description: 'Calculate cement needed',
        fields: [{ id: 'volume', label: 'Concrete Volume (m³)', type: 'number', placeholder: '10' }, { id: 'ratio', label: 'Mix Ratio', type: 'select', options: ['1:2:4 (M15)', '1:1.5:3 (M20)', '1:1:2 (M25)'] }],
        calculate: (v) => { const vol = parseFloat(v.volume); const cementRatios = { '1:2:4 (M15)': 6.24, '1:1.5:3 (M20)': 8.2, '1:1:2 (M25)': 10.9 }; const bags = cementRatios[v.ratio] * vol; const weight = bags * 50; return { result: `${bags.toFixed(0)} bags`, details: `Volume: ${vol} m³<br>Mix: ${v.ratio}<br>Cement bags (50kg): ${bags.toFixed(1)}<br>Weight: ${weight.toFixed(0)} kg` }; }
    },
    {
        id: 'con-sand', name: 'Sand Quantity Calculator', icon: '🏖️', category: 'Construction', description: 'Calculate sand needed',
        fields: [{ id: 'volume', label: 'Concrete Volume (m³)', type: 'number', placeholder: '10' }, { id: 'ratio', label: 'Mix Ratio', type: 'select', options: ['1:2:4 (M15)', '1:1.5:3 (M20)', '1:1:2 (M25)'] }],
        calculate: (v) => { const vol = parseFloat(v.volume); const sandRatios = { '1:2:4 (M15)': 0.44, '1:1.5:3 (M20)': 0.44, '1:1:2 (M25)': 0.44 }; const sand = sandRatios[v.ratio] * vol; return { result: `${sand.toFixed(2)} m³`, details: `Concrete: ${vol} m³<br>Sand required: ${sand.toFixed(2)} m³<br>Weight: ~${(sand * 1600).toFixed(0)} kg` }; }
    },
    {
        id: 'con-aggregate', name: 'Aggregate Quantity Calculator', icon: '🪨', category: 'Construction', description: 'Calculate aggregate needed',
        fields: [{ id: 'volume', label: 'Concrete Volume (m³)', type: 'number', placeholder: '10' }, { id: 'ratio', label: 'Mix Ratio', type: 'select', options: ['1:2:4 (M15)', '1:1.5:3 (M20)', '1:1:2 (M25)'] }],
        calculate: (v) => { const vol = parseFloat(v.volume); const aggRatios = { '1:2:4 (M15)': 0.88, '1:1.5:3 (M20)': 0.66, '1:1:2 (M25)': 0.44 }; const agg = aggRatios[v.ratio] * vol; return { result: `${agg.toFixed(2)} m³`, details: `Concrete: ${vol} m³<br>Aggregate: ${agg.toFixed(2)} m³<br>Weight: ~${(agg * 1500).toFixed(0)} kg` }; }
    },
    {
        id: 'con-mix-ratio', name: 'Concrete Mix Ratio Calculator', icon: '🔢', category: 'Construction', description: 'Calculate mix proportions',
        fields: [{ id: 'grade', label: 'Concrete Grade', type: 'select', options: ['M10', 'M15', 'M20', 'M25', 'M30'] }, { id: 'volume', label: 'Required Volume (m³)', type: 'number', placeholder: '1' }],
        calculate: (v) => { const vol = parseFloat(v.volume); const mixes = { 'M10': { c: 5.3, s: 0.53, a: 1.06 }, 'M15': { c: 6.24, s: 0.44, a: 0.88 }, 'M20': { c: 8.2, s: 0.44, a: 0.66 }, 'M25': { c: 10.9, s: 0.44, a: 0.44 }, 'M30': { c: 13, s: 0.42, a: 0.42 } }; const m = mixes[v.grade]; return { result: `${(m.c * vol).toFixed(0)} bags cement`, details: `For ${vol} m³ of ${v.grade}:<br>Cement: ${(m.c * vol).toFixed(1)} bags<br>Sand: ${(m.s * vol).toFixed(2)} m³<br>Aggregate: ${(m.a * vol).toFixed(2)} m³<br>Water: ~${(vol * 180).toFixed(0)} L` }; }
    },
    {
        id: 'con-brick', name: 'Brick Quantity Calculator', icon: '🧱', category: 'Construction', description: 'Calculate bricks needed',
        fields: [{ id: 'length', label: 'Wall Length (m)', type: 'number', placeholder: '10' }, { id: 'height', label: 'Wall Height (m)', type: 'number', placeholder: '3' }, { id: 'thickness', label: 'Wall Thickness', type: 'select', options: ['4.5 inch (Half)', '9 inch (Full)'] }],
        calculate: (v) => { const area = parseFloat(v.length) * parseFloat(v.height); const bricksPerSqM = v.thickness === '4.5 inch (Half)' ? 55 : 110; const bricks = area * bricksPerSqM; const withWaste = bricks * 1.05; return { result: `${Math.ceil(withWaste)} bricks`, details: `Wall area: ${area.toFixed(1)} m²<br>Bricks/m²: ${bricksPerSqM}<br>Required: ${Math.ceil(bricks)}<br>With 5% waste: ${Math.ceil(withWaste)}` }; }
    },
    {
        id: 'con-block', name: 'Block Work Calculator', icon: '⬜', category: 'Construction', description: 'Calculate blocks needed',
        fields: [{ id: 'area', label: 'Wall Area (sq m)', type: 'number', placeholder: '50' }, { id: 'blockSize', label: 'Block Size', type: 'select', options: ['400x200x200mm', '400x200x150mm', '400x200x100mm'] }],
        calculate: (v) => { const area = parseFloat(v.area); const blocksPerSqM = { '400x200x200mm': 12.5, '400x200x150mm': 12.5, '400x200x100mm': 12.5 }; const blocks = area * blocksPerSqM[v.blockSize]; const withWaste = blocks * 1.05; return { result: `${Math.ceil(withWaste)} blocks`, details: `Area: ${area} m²<br>Block size: ${v.blockSize}<br>Blocks needed: ${Math.ceil(blocks)}<br>With waste: ${Math.ceil(withWaste)}` }; }
    },
    {
        id: 'con-plaster', name: 'Plastering Area Calculator', icon: '🪣', category: 'Construction', description: 'Calculate plastering materials',
        fields: [{ id: 'area', label: 'Plastering Area (sq m)', type: 'number', placeholder: '100' }, { id: 'thickness', label: 'Thickness (mm)', type: 'number', placeholder: '12' }, { id: 'ratio', label: 'Mix Ratio', type: 'select', options: ['1:3', '1:4', '1:5', '1:6'] }],
        calculate: (v) => { const area = parseFloat(v.area), thick = parseFloat(v.thickness) / 1000; const vol = area * thick; const ratios = { '1:3': 0.33, '1:4': 0.25, '1:5': 0.2, '1:6': 0.167 }; const cementVol = vol * ratios[v.ratio] * 1.35; const bags = cementVol / 0.035; const sand = vol * (1 - ratios[v.ratio]) * 1.35; return { result: `${bags.toFixed(1)} bags cement`, details: `Area: ${area} m²<br>Thickness: ${v.thickness} mm<br>Cement: ${bags.toFixed(1)} bags<br>Sand: ${sand.toFixed(2)} m³` }; }
    },
    {
        id: 'con-paint', name: 'Paint Quantity Calculator', icon: '🎨', category: 'Construction', description: 'Calculate paint needed',
        fields: [{ id: 'area', label: 'Wall Area (sq m)', type: 'number', placeholder: '200' }, { id: 'coats', label: 'Number of Coats', type: 'number', placeholder: '2' }, { id: 'type', label: 'Paint Type', type: 'select', options: ['Emulsion', 'Enamel', 'Primer', 'Texture'] }],
        calculate: (v) => { const area = parseFloat(v.area), coats = parseInt(v.coats); const coverage = { 'Emulsion': 12, 'Enamel': 10, 'Primer': 14, 'Texture': 3 }; const liters = (area * coats) / coverage[v.type]; return { result: `${liters.toFixed(1)} liters`, details: `Area: ${area} m²<br>Coats: ${coats}<br>Coverage: ${coverage[v.type]} m²/L<br>Paint needed: ${liters.toFixed(1)} L<br>≈ ${Math.ceil(liters / 4)} gallons` }; }
    },
    {
        id: 'con-tile', name: 'Flooring Tile Calculator', icon: '🔲', category: 'Construction', description: 'Calculate tiles needed',
        fields: [{ id: 'length', label: 'Room Length (m)', type: 'number', placeholder: '5' }, { id: 'width', label: 'Room Width (m)', type: 'number', placeholder: '4' }, { id: 'tileSize', label: 'Tile Size', type: 'select', options: ['300x300mm', '600x600mm', '800x800mm', '1200x600mm'] }],
        calculate: (v) => { const area = parseFloat(v.length) * parseFloat(v.width); const tileSizes = { '300x300mm': 0.09, '600x600mm': 0.36, '800x800mm': 0.64, '1200x600mm': 0.72 }; const tilesNeeded = area / tileSizes[v.tileSize]; const withWaste = tilesNeeded * 1.1; return { result: `${Math.ceil(withWaste)} tiles`, details: `Floor area: ${area} m²<br>Tile: ${v.tileSize}<br>Tiles: ${Math.ceil(tilesNeeded)}<br>With 10% waste: ${Math.ceil(withWaste)}<br>Boxes (4/box): ${Math.ceil(withWaste / 4)}` }; }
    },
    {
        id: 'con-wall-area', name: 'Wall Area Calculator', icon: '📐', category: 'Construction', description: 'Calculate wall surface area',
        fields: [{ id: 'length', label: 'Room Length (m)', type: 'number', placeholder: '5' }, { id: 'width', label: 'Room Width (m)', type: 'number', placeholder: '4' }, { id: 'height', label: 'Wall Height (m)', type: 'number', placeholder: '3' }, { id: 'openings', label: 'Openings Area (sq m)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const l = parseFloat(v.length), w = parseFloat(v.width), h = parseFloat(v.height), openings = parseFloat(v.openings); const perimeter = 2 * (l + w); const grossArea = perimeter * h; const netArea = grossArea - openings; return { result: `${netArea.toFixed(1)} m²`, details: `Perimeter: ${perimeter} m<br>Gross area: ${grossArea.toFixed(1)} m²<br>Openings: ${openings} m²<br>Net area: ${netArea.toFixed(1)} m²` }; }
    },
    {
        id: 'con-staircase', name: 'Staircase Calculation Tool', icon: '🪜', category: 'Construction', description: 'Design staircase dimensions',
        fields: [{ id: 'floorHeight', label: 'Floor to Floor Height (m)', type: 'number', placeholder: '3' }, { id: 'width', label: 'Stair Width (m)', type: 'number', placeholder: '1.2' }],
        calculate: (v) => { const height = parseFloat(v.floorHeight) * 1000; const riserHeight = 175; const risers = Math.ceil(height / riserHeight); const actualRiser = height / risers; const tread = 250; const totalRun = (risers - 1) * tread; return { result: `${risers} steps`, details: `Number of risers: ${risers}<br>Riser height: ${actualRiser.toFixed(0)} mm<br>Tread width: ${tread} mm<br>Total run: ${totalRun.toFixed(0)} mm<br>Slope: ${Math.atan(height / totalRun) * 180 / Math.PI}°` }; }
    },
    {
        id: 'con-beam-rebar', name: 'Beam Reinforcement Calculator', icon: '🔩', category: 'Construction', description: 'Calculate beam steel',
        fields: [{ id: 'length', label: 'Beam Length (m)', type: 'number', placeholder: '5' }, { id: 'width', label: 'Beam Width (mm)', type: 'number', placeholder: '230' }, { id: 'depth', label: 'Beam Depth (mm)', type: 'number', placeholder: '400' }],
        calculate: (v) => { const l = parseFloat(v.length), w = parseFloat(v.width), d = parseFloat(v.depth); const mainBars = 4; const mainDia = 16; const stirrupDia = 8; const cover = 40; const stirrupSpacing = 150; const stirrups = Math.ceil(l * 1000 / stirrupSpacing); const mainLength = l * mainBars * 1.1; const stirrupLength = 2 * ((w - 2 * cover) + (d - 2 * cover)) * stirrups / 1000; const mainWeight = mainLength * 0.00617 * mainDia * mainDia; const stirrupWeight = stirrupLength * 0.00617 * stirrupDia * stirrupDia; return { result: `${(mainWeight + stirrupWeight).toFixed(1)} kg`, details: `Main bars: ${mainBars} nos of ${mainDia}mm<br>Stirrups: ${stirrups} nos of ${stirrupDia}mm<br>Main steel: ${mainWeight.toFixed(1)} kg<br>Stirrup steel: ${stirrupWeight.toFixed(1)} kg<br>Total: ${(mainWeight + stirrupWeight).toFixed(1)} kg` }; }
    },
    {
        id: 'con-column-rebar', name: 'Column Reinforcement Calculator', icon: '🏗️', category: 'Construction', description: 'Calculate column steel',
        fields: [{ id: 'size', label: 'Column Size (mm)', type: 'number', placeholder: '300' }, { id: 'height', label: 'Column Height (m)', type: 'number', placeholder: '3' }, { id: 'bars', label: 'Number of Bars', type: 'number', placeholder: '8' }, { id: 'dia', label: 'Bar Diameter (mm)', type: 'number', placeholder: '16' }],
        calculate: (v) => { const size = parseFloat(v.size), h = parseFloat(v.height), bars = parseInt(v.bars), dia = parseFloat(v.dia); const mainLength = h * bars * 1.2; const tiePerimeter = 4 * (size - 80); const ties = Math.ceil(h * 1000 / 200); const tieLength = ties * tiePerimeter / 1000; const mainWeight = mainLength * 0.00617 * dia * dia; const tieWeight = tieLength * 0.00617 * 8 * 8; return { result: `${(mainWeight + tieWeight).toFixed(1)} kg`, details: `Main bars: ${bars} × ${dia}mm<br>Ties: ${ties} nos of 8mm<br>Main steel: ${mainWeight.toFixed(1)} kg<br>Tie steel: ${tieWeight.toFixed(1)} kg<br>Total: ${(mainWeight + tieWeight).toFixed(1)} kg` }; }
    },
    {
        id: 'con-slab', name: 'Slab Thickness Calculator', icon: '📏', category: 'Construction', description: 'Calculate slab thickness',
        fields: [{ id: 'span', label: 'Shorter Span (m)', type: 'number', placeholder: '4' }, { id: 'type', label: 'Slab Type', type: 'select', options: ['One-way', 'Two-way', 'Cantilever'] }, { id: 'support', label: 'Support', type: 'select', options: ['Simply Supported', 'Continuous'] }],
        calculate: (v) => { const span = parseFloat(v.span) * 1000; const ratios = { 'One-way': { 'Simply Supported': 20, 'Continuous': 26 }, 'Two-way': { 'Simply Supported': 30, 'Continuous': 35 }, 'Cantilever': { 'Simply Supported': 7, 'Continuous': 10 } }; const ratio = ratios[v.type][v.support]; const thickness = span / ratio; const rounded = Math.ceil(thickness / 25) * 25; return { result: `${rounded} mm`, details: `Span: ${span} mm<br>Type: ${v.type}<br>L/d ratio: ${ratio}<br>Calculated: ${thickness.toFixed(0)} mm<br>Provided: ${rounded} mm` }; }
    },
    {
        id: 'con-foundation', name: 'Foundation Depth Calculator', icon: '⬇️', category: 'Construction', description: 'Calculate foundation depth',
        fields: [{ id: 'load', label: 'Building Load (kN)', type: 'number', placeholder: '500' }, { id: 'sbc', label: 'Soil Bearing Capacity (kN/m²)', type: 'number', placeholder: '200' }, { id: 'width', label: 'Footing Width (m)', type: 'number', placeholder: '1.5' }],
        calculate: (v) => { const load = parseFloat(v.load), sbc = parseFloat(v.sbc), width = parseFloat(v.width); const reqArea = load / sbc; const length = reqArea / width; const depth = Math.max(0.6, width / 2); return { result: `${depth.toFixed(2)} m deep`, details: `Required area: ${reqArea.toFixed(2)} m²<br>Footing size: ${width} × ${length.toFixed(2)} m<br>Depth: ${depth.toFixed(2)} m<br>Soil capacity: ${sbc} kN/m²` }; }
    },
    {
        id: 'con-excavation', name: 'Excavation Volume Calculator', icon: '🚧', category: 'Construction', description: 'Calculate excavation volume',
        fields: [{ id: 'length', label: 'Length (m)', type: 'number', placeholder: '10' }, { id: 'width', label: 'Width (m)', type: 'number', placeholder: '8' }, { id: 'depth', label: 'Depth (m)', type: 'number', placeholder: '2' }, { id: 'sideSlope', label: 'Side Slope (H:V)', type: 'number', placeholder: '0.5' }],
        calculate: (v) => { const l = parseFloat(v.length), w = parseFloat(v.width), d = parseFloat(v.depth), slope = parseFloat(v.sideSlope); const topL = l + 2 * slope * d; const topW = w + 2 * slope * d; const vol = (d / 6) * ((l * w) + (topL * topW) + Math.sqrt(l * w * topL * topW)); return { result: `${vol.toFixed(2)} m³`, details: `Bottom: ${l} × ${w} m<br>Top: ${topL.toFixed(1)} × ${topW.toFixed(1)} m<br>Depth: ${d} m<br>Volume: ${vol.toFixed(2)} m³<br>Trucks (10m³): ${Math.ceil(vol / 10)}` }; }
    },
    {
        id: 'con-earthwork', name: 'Earthwork Calculator', icon: '🏔️', category: 'Construction', description: 'Calculate cut and fill volumes',
        fields: [{ id: 'cutVol', label: 'Cut Volume (m³)', type: 'number', placeholder: '500' }, { id: 'fillVol', label: 'Fill Volume (m³)', type: 'number', placeholder: '300' }, { id: 'shrinkage', label: 'Shrinkage Factor (%)', type: 'number', placeholder: '15' }],
        calculate: (v) => { const cut = parseFloat(v.cutVol), fill = parseFloat(v.fillVol), shrink = parseFloat(v.shrinkage) / 100; const effectiveCut = cut * (1 - shrink); const balance = effectiveCut - fill; const action = balance > 0 ? 'Dispose' : 'Import'; return { result: `${Math.abs(balance).toFixed(0)} m³ ${action}`, details: `Cut: ${cut} m³<br>After shrinkage: ${effectiveCut.toFixed(0)} m³<br>Fill required: ${fill} m³<br>${action}: ${Math.abs(balance).toFixed(0)} m³` }; }
    },
    {
        id: 'con-shuttering', name: 'Shuttering Area Calculator', icon: '📦', category: 'Construction', description: 'Calculate formwork area',
        fields: [{ id: 'element', label: 'Element Type', type: 'select', options: ['Column', 'Beam', 'Slab', 'Footing'] }, { id: 'dim1', label: 'Dimension 1 (m)', type: 'number', placeholder: '0.3' }, { id: 'dim2', label: 'Dimension 2 (m)', type: 'number', placeholder: '0.3' }, { id: 'dim3', label: 'Height/Length (m)', type: 'number', placeholder: '3' }],
        calculate: (v) => { const d1 = parseFloat(v.dim1), d2 = parseFloat(v.dim2), d3 = parseFloat(v.dim3); let area; if (v.element === 'Column') area = 4 * d1 * d3; else if (v.element === 'Beam') area = 2 * d2 * d3 + d1 * d3; else if (v.element === 'Slab') area = d1 * d2; else area = 4 * d1 * d2 + d1 * d1; return { result: `${area.toFixed(2)} m²`, details: `Element: ${v.element}<br>Shuttering area: ${area.toFixed(2)} m²<br>Plywood sheets (8×4): ${Math.ceil(area / 2.97)}` }; }
    },
    {
        id: 'con-steel-weight', name: 'Steel Bar Weight Calculator', icon: '⚖️', category: 'Construction', description: 'Calculate rebar weight',
        fields: [{ id: 'diameter', label: 'Bar Diameter (mm)', type: 'number', placeholder: '12' }, { id: 'length', label: 'Total Length (m)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const dia = parseFloat(v.diameter), len = parseFloat(v.length); const weight = len * dia * dia / 162.2; const density = dia * dia / 162.2; return { result: `${weight.toFixed(2)} kg`, details: `Diameter: ${dia} mm<br>Weight: ${density.toFixed(3)} kg/m<br>Length: ${len} m<br>Total weight: ${weight.toFixed(2)} kg` }; }
    },
    {
        id: 'con-binding-wire', name: 'Binding Wire Calculator', icon: '🔗', category: 'Construction', description: 'Calculate binding wire',
        fields: [{ id: 'steelWeight', label: 'Total Steel Weight (kg)', type: 'number', placeholder: '1000' }],
        calculate: (v) => { const steel = parseFloat(v.steelWeight); const wire = steel * 0.01; return { result: `${wire.toFixed(2)} kg`, details: `Steel weight: ${steel} kg<br>Binding wire (1%): ${wire.toFixed(2)} kg<br>≈ ${(wire / 25).toFixed(1)} bundles (25kg)` }; }
    },
    {
        id: 'con-labor', name: 'Construction Labor Cost Calculator', icon: '👷', category: 'Construction', description: 'Calculate labor costs',
        fields: [{ id: 'workers', label: 'Number of Workers', type: 'number', placeholder: '10' }, { id: 'days', label: 'Working Days', type: 'number', placeholder: '30' }, { id: 'dailyWage', label: 'Daily Wage (₹)', type: 'number', placeholder: '600' }, { id: 'overtime', label: 'Overtime Hours', type: 'number', placeholder: '50' }],
        calculate: (v) => { const workers = parseInt(v.workers), days = parseInt(v.days), wage = parseFloat(v.dailyWage), ot = parseFloat(v.overtime); const regular = workers * days * wage; const otCost = ot * (wage / 8) * 1.5; const total = regular + otCost; return { result: `₹${total.toLocaleString()}`, details: `Regular: ₹${regular.toLocaleString()}<br>Overtime: ₹${otCost.toFixed(0)}<br>Total: ₹${total.toLocaleString()}<br>Per worker/day: ₹${wage}` }; }
    },
    {
        id: 'con-material-cost', name: 'Building Material Cost Calculator', icon: '💰', category: 'Construction', description: 'Estimate material costs',
        fields: [{ id: 'area', label: 'Built-up Area (sq ft)', type: 'number', placeholder: '1000' }, { id: 'type', label: 'Construction Type', type: 'select', options: ['Standard', 'Semi-Luxury', 'Luxury'] }],
        calculate: (v) => { const area = parseFloat(v.area); const rates = { 'Standard': 1200, 'Semi-Luxury': 1800, 'Luxury': 2800 }; const materialCost = area * rates[v.type]; return { result: `₹${materialCost.toLocaleString()}`, details: `Area: ${area} sq ft<br>Type: ${v.type}<br>Rate: ₹${rates[v.type]}/sq ft<br>Material cost: ₹${materialCost.toLocaleString()}<br>Total project ~₹${(materialCost * 1.8).toLocaleString()}` }; }
    },
    {
        id: 'con-duration', name: 'Project Duration Calculator', icon: '📅', category: 'Construction', description: 'Estimate construction time',
        fields: [{ id: 'area', label: 'Built-up Area (sq ft)', type: 'number', placeholder: '2000' }, { id: 'floors', label: 'Number of Floors', type: 'number', placeholder: '2' }, { id: 'type', label: 'Construction Type', type: 'select', options: ['Conventional', 'Semi-Prefab', 'Prefabricated'] }],
        calculate: (v) => { const area = parseFloat(v.area), floors = parseInt(v.floors); const rates = { 'Conventional': 10, 'Semi-Prefab': 15, 'Prefabricated': 25 }; const months = (area / rates[v.type] / 100) + (floors * 1); return { result: `${months.toFixed(1)} months`, details: `Area: ${area} sq ft<br>Floors: ${floors}<br>Method: ${v.type}<br>Duration: ${months.toFixed(1)} months<br>≈ ${Math.ceil(months * 4)} weeks` }; }
    },
    {
        id: 'con-overhead', name: 'Site Overhead Cost Calculator', icon: '📊', category: 'Construction', description: 'Calculate site overheads',
        fields: [{ id: 'projectCost', label: 'Total Project Cost', type: 'number', placeholder: '5000000' }, { id: 'duration', label: 'Duration (months)', type: 'number', placeholder: '12' }],
        calculate: (v) => { const cost = parseFloat(v.projectCost), months = parseFloat(v.duration); const supervision = cost * 0.03; const siteOffice = months * 15000; const utilities = months * 10000; const insurance = cost * 0.01; const total = supervision + siteOffice + utilities + insurance; return { result: `₹${total.toLocaleString()}`, details: `Supervision (3%): ₹${supervision.toLocaleString()}<br>Site office: ₹${siteOffice.toLocaleString()}<br>Utilities: ₹${utilities.toLocaleString()}<br>Insurance: ₹${insurance.toLocaleString()}<br>Total: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'con-curing', name: 'Water Curing Requirement Calculator', icon: '💧', category: 'Construction', description: 'Calculate curing water',
        fields: [{ id: 'area', label: 'Concrete Surface Area (sq m)', type: 'number', placeholder: '100' }, { id: 'days', label: 'Curing Days', type: 'number', placeholder: '7' }, { id: 'frequency', label: 'Daily Frequency', type: 'number', placeholder: '3' }],
        calculate: (v) => { const area = parseFloat(v.area), days = parseInt(v.days), freq = parseInt(v.frequency); const waterPerSpray = area * 3; const totalWater = waterPerSpray * freq * days; return { result: `${totalWater.toFixed(0)} liters`, details: `Area: ${area} m²<br>Duration: ${days} days<br>Times/day: ${freq}<br>Per spray: ${waterPerSpray.toFixed(0)} L<br>Total: ${totalWater.toFixed(0)} L<br>= ${(totalWater / 1000).toFixed(1)} m³` }; }
    },
    {
        id: 'con-height', name: 'Building Height Calculator', icon: '🏢', category: 'Construction', description: 'Calculate building height',
        fields: [{ id: 'floors', label: 'Number of Floors', type: 'number', placeholder: '5' }, { id: 'floorHeight', label: 'Floor-to-Floor Height (m)', type: 'number', placeholder: '3.2' }, { id: 'parapet', label: 'Parapet Height (m)', type: 'number', placeholder: '1.2' }],
        calculate: (v) => { const floors = parseInt(v.floors), fh = parseFloat(v.floorHeight), parapet = parseFloat(v.parapet); const height = (floors * fh) + parapet; return { result: `${height.toFixed(1)} m`, details: `Floors: ${floors}<br>Floor height: ${fh} m<br>Parapet: ${parapet} m<br>Total height: ${height.toFixed(1)} m<br>= ${(height * 3.28).toFixed(1)} ft` }; }
    },
    {
        id: 'con-rcc-volume', name: 'RCC Volume Calculator', icon: '🧮', category: 'Construction', description: 'Calculate RCC concrete volume',
        fields: [{ id: 'slabArea', label: 'Slab Area (sq m)', type: 'number', placeholder: '100' }, { id: 'slabThick', label: 'Slab Thickness (mm)', type: 'number', placeholder: '150' }, { id: 'beamLength', label: 'Total Beam Length (m)', type: 'number', placeholder: '50' }, { id: 'beamSize', label: 'Beam Size W×D (mm)', type: 'text', placeholder: '230×400' }],
        calculate: (v) => { const slabVol = parseFloat(v.slabArea) * parseFloat(v.slabThick) / 1000; const beamDims = v.beamSize.split('×').map(d => parseFloat(d) / 1000); const beamVol = parseFloat(v.beamLength) * beamDims[0] * beamDims[1]; const total = slabVol + beamVol; return { result: `${total.toFixed(2)} m³`, details: `Slab volume: ${slabVol.toFixed(2)} m³<br>Beam volume: ${beamVol.toFixed(2)} m³<br>Total RCC: ${total.toFixed(2)} m³<br>Cement bags: ~${(total * 8).toFixed(0)}` }; }
    },
    {
        id: 'con-structural-load', name: 'Structural Load Calculator', icon: '🏋️', category: 'Construction', description: 'Calculate building loads',
        fields: [{ id: 'area', label: 'Floor Area (sq m)', type: 'number', placeholder: '100' }, { id: 'usage', label: 'Building Use', type: 'select', options: ['Residential', 'Office', 'Commercial', 'Industrial'] }, { id: 'floors', label: 'Number of Floors', type: 'number', placeholder: '3' }],
        calculate: (v) => { const area = parseFloat(v.area), floors = parseInt(v.floors); const liveLoads = { 'Residential': 2.0, 'Office': 2.5, 'Commercial': 4.0, 'Industrial': 5.0 }; const deadLoad = 5.0; const live = liveLoads[v.usage]; const totalLoad = area * floors * (deadLoad + live); return { result: `${totalLoad.toFixed(0)} kN`, details: `Dead load: ${deadLoad} kN/m²<br>Live load: ${live} kN/m²<br>Total: ${(deadLoad + live)} kN/m²<br>Building load: ${totalLoad.toFixed(0)} kN<br>= ${(totalLoad * 100).toFixed(0)} kg` }; }
    },
    {
        id: 'con-safety-margin', name: 'Safety Margin Calculator', icon: '✅', category: 'Construction', description: 'Calculate safety factors',
        fields: [{ id: 'capacity', label: 'Ultimate Capacity', type: 'number', placeholder: '500' }, { id: 'load', label: 'Applied Load', type: 'number', placeholder: '200' }, { id: 'requiredFOS', label: 'Required Factor of Safety', type: 'number', placeholder: '1.5' }],
        calculate: (v) => { const capacity = parseFloat(v.capacity), load = parseFloat(v.load), reqFOS = parseFloat(v.requiredFOS); const actualFOS = capacity / load; const safe = actualFOS >= reqFOS; const margin = ((actualFOS - reqFOS) / reqFOS) * 100; return { result: safe ? '✅ Safe' : '❌ Unsafe', details: `Capacity: ${capacity}<br>Load: ${load}<br>Factor of Safety: ${actualFOS.toFixed(2)}<br>Required: ${reqFOS}<br>${safe ? `Margin: +${margin.toFixed(1)}%` : `Deficit: ${margin.toFixed(1)}%`}` }; }
    },
    {
        id: 'con-waste', name: 'Construction Waste Calculator', icon: '🗑️', category: 'Construction', description: 'Estimate construction waste',
        fields: [{ id: 'area', label: 'Built-up Area (sq m)', type: 'number', placeholder: '200' }, { id: 'type', label: 'Construction Type', type: 'select', options: ['New Construction', 'Renovation', 'Demolition'] }],
        calculate: (v) => { const area = parseFloat(v.area); const rates = { 'New Construction': 50, 'Renovation': 100, 'Demolition': 500 }; const waste = area * rates[v.type] / 1000; const recyclable = waste * 0.7; return { result: `${waste.toFixed(1)} tonnes`, details: `Area: ${area} m²<br>Type: ${v.type}<br>Total waste: ${waste.toFixed(1)} tonnes<br>Recyclable (~70%): ${recyclable.toFixed(1)} tonnes<br>Disposal cost: ~₹${(waste * 1500).toFixed(0)}` }; }
    }
];
if (typeof window !== 'undefined') window.constructionCalculators = constructionCalculators;
