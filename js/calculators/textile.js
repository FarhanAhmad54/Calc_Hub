// Textile, Fashion & Tailoring Calculators
const textileCalculators = [
    {
        id: 'tex-cloth-req', name: 'Cloth Requirement Calculator', icon: '🧵', category: 'Textile', description: 'Calculate fabric needed',
        fields: [{ id: 'garment', label: 'Garment Type', type: 'select', options: ['Shirt', 'Pants', 'Dress', 'Kurta', 'Blouse', 'Saree Blouse'] }, { id: 'size', label: 'Size', type: 'select', options: ['S', 'M', 'L', 'XL', 'XXL'] }, { id: 'width', label: 'Fabric Width (inches)', type: 'number', placeholder: '45' }],
        calculate: (v) => { const base = { 'Shirt': 2.5, 'Pants': 2.75, 'Dress': 3.5, 'Kurta': 3.0, 'Blouse': 1.0, 'Saree Blouse': 0.9 }; const sizeMult = { 'S': 0.9, 'M': 1.0, 'L': 1.1, 'XL': 1.2, 'XXL': 1.35 }; const widthMult = parseFloat(v.width) < 45 ? 1.2 : 1.0; const yards = base[v.garment] * sizeMult[v.size] * widthMult; const meters = yards * 0.9144; return { result: `${yards.toFixed(2)} yards`, details: `${v.garment} (${v.size})<br>Fabric width: ${v.width}"<br>Required: ${yards.toFixed(2)} yards<br>= ${meters.toFixed(2)} meters` }; }
    },
    {
        id: 'tex-gsm', name: 'Fabric Weight (GSM) Calculator', icon: '⚖️', category: 'Textile', description: 'Calculate fabric GSM',
        fields: [{ id: 'weight', label: 'Sample Weight (grams)', type: 'number', placeholder: '25' }, { id: 'length', label: 'Sample Length (cm)', type: 'number', placeholder: '10' }, { id: 'width', label: 'Sample Width (cm)', type: 'number', placeholder: '10' }],
        calculate: (v) => {
            const w = parseFloat(v.weight), l = parseFloat(v.length), width = parseFloat(v.width); const area = (l * width) / 10000; // in sq meters
            const gsm = w / area; let category = gsm < 150 ? 'Light' : gsm < 300 ? 'Medium' : 'Heavy'; return { result: gsm.toFixed(2) + ' GSM', details: `Sample area: ${area.toFixed(4)} m²<br>Weight: ${w} g<br>GSM: ${gsm.toFixed(2)}<br>Category: ${category}weight` };
        }
    },
    {
        id: 'tex-yarn-count', name: 'Yarn Count Calculator', icon: '🧶', category: 'Textile', description: 'Calculate yarn count',
        fields: [{ id: 'system', label: 'Count System', type: 'select', options: ['Ne (English)', 'Nm (Metric)', 'Tex', 'Denier'] }, { id: 'weight', label: 'Weight (grams)', type: 'number', placeholder: '100' }, { id: 'length', label: 'Length (meters)', type: 'number', placeholder: '1000' }],
        calculate: (v) => { const w = parseFloat(v.weight), l = parseFloat(v.length); const tex = (w / l) * 1000; const denier = tex * 9; const nm = 1000 / tex; const ne = nm * 0.5905; let result; if (v.system === 'Ne (English)') result = ne.toFixed(2) + ' Ne'; else if (v.system === 'Nm (Metric)') result = nm.toFixed(2) + ' Nm'; else if (v.system === 'Tex') result = tex.toFixed(2) + ' Tex'; else result = denier.toFixed(2) + ' Den'; return { result: result, details: `Conversions:<br>Tex: ${tex.toFixed(2)}<br>Denier: ${denier.toFixed(2)}<br>Nm: ${nm.toFixed(2)}<br>Ne: ${ne.toFixed(2)}` }; }
    },
    {
        id: 'tex-stitch-length', name: 'Stitch Length Calculator', icon: '📏', category: 'Textile', description: 'Calculate stitch length',
        fields: [{ id: 'stitches', label: 'Number of Stitches', type: 'number', placeholder: '50' }, { id: 'length', label: 'Course Length (mm)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const stitches = parseInt(v.stitches), length = parseFloat(v.length); const sl = length / stitches; const spi = 25.4 / sl; return { result: sl.toFixed(3) + ' mm', details: `Stitch length: ${sl.toFixed(3)} mm<br>Stitches per inch: ${spi.toFixed(1)}<br>Stitches per cm: ${(10 / sl).toFixed(1)}` }; }
    },
    {
        id: 'tex-thread', name: 'Thread Consumption Calculator', icon: '🪡', category: 'Textile', description: 'Calculate thread needed',
        fields: [{ id: 'seamLength', label: 'Seam Length (meters)', type: 'number', placeholder: '50' }, { id: 'spi', label: 'Stitches Per Inch', type: 'number', placeholder: '12' }, { id: 'threads', label: 'Number of Threads', type: 'number', placeholder: '2' }, { id: 'factor', label: 'Stitch Factor', type: 'number', placeholder: '2.5', step: '0.1' }],
        calculate: (v) => { const seam = parseFloat(v.seamLength), spi = parseFloat(v.spi), threads = parseInt(v.threads), factor = parseFloat(v.factor); const stitchesPerMeter = spi * 39.37; const threadLength = seam * stitchesPerMeter * factor * threads / 1000; const withWaste = threadLength * 1.15; return { result: withWaste.toFixed(2) + ' meters', details: `Seam length: ${seam} m<br>Thread consumption: ${threadLength.toFixed(2)} m<br>With 15% waste: ${withWaste.toFixed(2)} m<br>≈ ${(withWaste / 100).toFixed(2)} cones (100m)` }; }
    },
    {
        id: 'tex-garment-cost', name: 'Garment Costing Calculator', icon: '💰', category: 'Textile', description: 'Calculate garment cost',
        fields: [{ id: 'fabric', label: 'Fabric Cost', type: 'number', placeholder: '150' }, { id: 'trims', label: 'Trims Cost', type: 'number', placeholder: '30' }, { id: 'labor', label: 'Labor Cost', type: 'number', placeholder: '50' }, { id: 'overhead', label: 'Overhead %', type: 'number', placeholder: '15' }, { id: 'profit', label: 'Profit Margin %', type: 'number', placeholder: '25' }],
        calculate: (v) => { const fabric = parseFloat(v.fabric), trims = parseFloat(v.trims), labor = parseFloat(v.labor); const direct = fabric + trims + labor; const overhead = direct * parseFloat(v.overhead) / 100; const total = direct + overhead; const profit = total * parseFloat(v.profit) / 100; const selling = total + profit; return { result: `₹${selling.toFixed(2)}`, details: `Fabric: ₹${fabric}<br>Trims: ₹${trims}<br>Labor: ₹${labor}<br>Direct: ₹${direct}<br>Overhead: ₹${overhead.toFixed(2)}<br>Cost: ₹${total.toFixed(2)}<br>Profit: ₹${profit.toFixed(2)}<br>Selling: ₹${selling.toFixed(2)}` }; }
    },
    {
        id: 'tex-shrinkage', name: 'Fabric Shrinkage Calculator', icon: '📐', category: 'Textile', description: 'Calculate shrinkage percentage',
        fields: [{ id: 'beforeL', label: 'Before Wash Length', type: 'number', placeholder: '100' }, { id: 'afterL', label: 'After Wash Length', type: 'number', placeholder: '95' }, { id: 'beforeW', label: 'Before Wash Width', type: 'number', placeholder: '100' }, { id: 'afterW', label: 'After Wash Width', type: 'number', placeholder: '97' }],
        calculate: (v) => { const bl = parseFloat(v.beforeL), al = parseFloat(v.afterL); const bw = parseFloat(v.beforeW), aw = parseFloat(v.afterW); const shrinkL = ((bl - al) / bl) * 100; const shrinkW = ((bw - aw) / bw) * 100; return { result: `L:${shrinkL.toFixed(1)}% W:${shrinkW.toFixed(1)}%`, details: `Length shrinkage: ${shrinkL.toFixed(2)}%<br>Width shrinkage: ${shrinkW.toFixed(2)}%<br>Total area loss: ${(shrinkL + shrinkW - shrinkL * shrinkW / 100).toFixed(2)}%` }; }
    },
    {
        id: 'tex-pattern-size', name: 'Pattern Size Calculator', icon: '📋', category: 'Textile', description: 'Grade pattern sizes',
        fields: [{ id: 'baseSize', label: 'Base Size', type: 'select', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] }, { id: 'measurement', label: 'Base Measurement (cm)', type: 'number', placeholder: '96' }, { id: 'targetSize', label: 'Target Size', type: 'select', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] }],
        calculate: (v) => { const grades = { 'XS': -8, 'S': -4, 'M': 0, 'L': 4, 'XL': 8, 'XXL': 12 }; const base = parseFloat(v.measurement); const diff = grades[v.targetSize] - grades[v.baseSize]; const target = base + diff; return { result: target.toFixed(1) + ' cm', details: `Base (${v.baseSize}): ${base} cm<br>Target (${v.targetSize}): ${target} cm<br>Difference: ${diff > 0 ? '+' : ''}${diff} cm` }; }
    },
    {
        id: 'tex-dress-measure', name: 'Dress Measurement Calculator', icon: '👗', category: 'Textile', description: 'Calculate dress measurements',
        fields: [{ id: 'bust', label: 'Bust (inches)', type: 'number', placeholder: '36' }, { id: 'waist', label: 'Waist (inches)', type: 'number', placeholder: '28' }, { id: 'hip', label: 'Hip (inches)', type: 'number', placeholder: '38' }, { id: 'ease', label: 'Ease (inches)', type: 'number', placeholder: '2' }],
        calculate: (v) => { const bust = parseFloat(v.bust), waist = parseFloat(v.waist), hip = parseFloat(v.hip), ease = parseFloat(v.ease); const patternBust = bust + ease; const patternWaist = waist + (ease * 0.75); const patternHip = hip + ease; return { result: `B:${patternBust}" W:${patternWaist.toFixed(1)}" H:${patternHip}"`, details: `Body Measurements:<br>Bust: ${bust}" → ${patternBust}"<br>Waist: ${waist}" → ${patternWaist.toFixed(1)}"<br>Hip: ${hip}" → ${patternHip}"<br>Ease added: ${ease}"` }; }
    },
    {
        id: 'tex-shirt-size', name: 'Shirt Size Calculator', icon: '👔', category: 'Textile', description: 'Determine shirt size',
        fields: [{ id: 'chest', label: 'Chest (inches)', type: 'number', placeholder: '40' }, { id: 'neck', label: 'Neck (inches)', type: 'number', placeholder: '15.5' }, { id: 'sleeve', label: 'Sleeve Length (inches)', type: 'number', placeholder: '34' }],
        calculate: (v) => { const chest = parseFloat(v.chest), neck = parseFloat(v.neck); let size; if (chest < 36) size = 'XS'; else if (chest < 38) size = 'S'; else if (chest < 40) size = 'M'; else if (chest < 42) size = 'L'; else if (chest < 44) size = 'XL'; else size = 'XXL'; return { result: size, details: `Chest: ${chest}"<br>Neck: ${neck}"<br>Sleeve: ${v.sleeve}"<br>Recommended size: ${size}<br>Dress shirt: ${neck}/${v.sleeve}` }; }
    },
    {
        id: 'tex-pant-size', name: 'Pant Size Calculator', icon: '👖', category: 'Textile', description: 'Determine pant size',
        fields: [{ id: 'waist', label: 'Waist (inches)', type: 'number', placeholder: '32' }, { id: 'hip', label: 'Hip (inches)', type: 'number', placeholder: '40' }, { id: 'inseam', label: 'Inseam (inches)', type: 'number', placeholder: '32' }],
        calculate: (v) => { const waist = parseFloat(v.waist), inseam = parseFloat(v.inseam); let size; if (waist < 28) size = 'XS (28)'; else if (waist < 30) size = 'S (30)'; else if (waist < 32) size = 'M (32)'; else if (waist < 34) size = 'L (34)'; else if (waist < 36) size = 'XL (36)'; else size = 'XXL (38+)'; return { result: `${waist}×${inseam}`, details: `Waist: ${waist}"<br>Hip: ${v.hip}"<br>Inseam: ${inseam}"<br>Pant size: ${waist}×${inseam}<br>Category: ${size}` }; }
    },
    {
        id: 'tex-blouse-size', name: 'Blouse Size Calculator', icon: '👚', category: 'Textile', description: 'Calculate blouse size',
        fields: [{ id: 'bust', label: 'Bust (inches)', type: 'number', placeholder: '36' }, { id: 'underBust', label: 'Under Bust (inches)', type: 'number', placeholder: '32' }, { id: 'shoulder', label: 'Shoulder (inches)', type: 'number', placeholder: '14' }, { id: 'armhole', label: 'Armhole (inches)', type: 'number', placeholder: '17' }],
        calculate: (v) => { const bust = parseFloat(v.bust); let size; if (bust < 32) size = '30'; else if (bust < 34) size = '32'; else if (bust < 36) size = '34'; else if (bust < 38) size = '36'; else if (bust < 40) size = '38'; else size = '40+'; const cup = bust - parseFloat(v.underBust); let cupSize = cup < 2 ? 'A' : cup < 3 ? 'B' : cup < 4 ? 'C' : 'D+'; return { result: `Size ${size} (${cupSize})`, details: `Bust: ${bust}"<br>Under bust: ${v.underBust}"<br>Cup difference: ${cup}"<br>Blouse size: ${size}<br>Cup: ${cupSize}` }; }
    },
    {
        id: 'tex-saree', name: 'Saree Fabric Calculator', icon: '🥻', category: 'Textile', description: 'Calculate saree requirements',
        fields: [{ id: 'type', label: 'Saree Type', type: 'select', options: ['Regular (5.5m)', 'Nivi Style (6m)', 'Bengali (6.5m)', 'Gujarati (5.5m)'] }, { id: 'blouseIncl', label: 'Blouse Included', type: 'select', options: ['Yes (0.9m)', 'No'] }],
        calculate: (v) => { const lengths = { 'Regular (5.5m)': 5.5, 'Nivi Style (6m)': 6.0, 'Bengali (6.5m)': 6.5, 'Gujarati (5.5m)': 5.5 }; let total = lengths[v.type]; const blouse = v.blouseIncl === 'Yes (0.9m)' ? 0.9 : 0; total += blouse; return { result: total.toFixed(1) + ' meters', details: `Saree length: ${lengths[v.type]} m<br>Blouse piece: ${blouse} m<br>Total fabric: ${total.toFixed(1)} m<br>Width: Standard 1.15m` }; }
    },
    {
        id: 'tex-cutting-eff', name: 'Cutting Efficiency Calculator', icon: '✂️', category: 'Textile', description: 'Calculate marker efficiency',
        fields: [{ id: 'usedArea', label: 'Pattern Area Used (sq m)', type: 'number', placeholder: '8.5' }, { id: 'totalArea', label: 'Marker Total Area (sq m)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const used = parseFloat(v.usedArea), total = parseFloat(v.totalArea); const eff = (used / total) * 100; const waste = 100 - eff; let rating = eff > 85 ? 'Excellent' : eff > 80 ? 'Good' : eff > 75 ? 'Fair' : 'Poor'; return { result: eff.toFixed(2) + '%', details: `Used area: ${used} m²<br>Total area: ${total} m²<br>Efficiency: ${eff.toFixed(2)}%<br>Waste: ${waste.toFixed(2)}%<br>Rating: ${rating}` }; }
    },
    {
        id: 'tex-wastage', name: 'Fabric Wastage Calculator', icon: '🗑️', category: 'Textile', description: 'Calculate fabric wastage',
        fields: [{ id: 'issued', label: 'Fabric Issued (meters)', type: 'number', placeholder: '100' }, { id: 'produced', label: 'Pieces Produced', type: 'number', placeholder: '45' }, { id: 'perPiece', label: 'Fabric Per Piece (m)', type: 'number', placeholder: '2' }],
        calculate: (v) => { const issued = parseFloat(v.issued), produced = parseInt(v.produced), perPiece = parseFloat(v.perPiece); const used = produced * perPiece; const waste = issued - used; const wastePct = (waste / issued) * 100; return { result: wastePct.toFixed(2) + '%', details: `Issued: ${issued} m<br>Used: ${used} m<br>Waste: ${waste} m<br>Wastage: ${wastePct.toFixed(2)}%<br>Cost impact: ₹${(waste * 100).toFixed(0)} @₹100/m` }; }
    },
    {
        id: 'tex-dye-qty', name: 'Dye Quantity Calculator', icon: '🎨', category: 'Textile', description: 'Calculate dye requirements',
        fields: [{ id: 'fabricWeight', label: 'Fabric Weight (kg)', type: 'number', placeholder: '10' }, { id: 'dyePct', label: 'Dye Percentage (OWF)', type: 'number', placeholder: '2' }, { id: 'liquorRatio', label: 'Liquor Ratio (1:x)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const fabric = parseFloat(v.fabricWeight), dyePct = parseFloat(v.dyePct), lr = parseFloat(v.liquorRatio); const dyeQty = fabric * (dyePct / 100) * 1000; const waterQty = fabric * lr; return { result: dyeQty.toFixed(0) + ' grams', details: `Fabric: ${fabric} kg<br>Dye %: ${dyePct}% OWF<br>Dye needed: ${dyeQty.toFixed(0)} g<br>Water needed: ${waterQty} liters<br>Liquor ratio: 1:${lr}` }; }
    },
    {
        id: 'tex-color-ratio', name: 'Color Ratio Calculator', icon: '🌈', category: 'Textile', description: 'Mix color ratios',
        fields: [{ id: 'color1', label: 'Color 1 Parts', type: 'number', placeholder: '3' }, { id: 'color2', label: 'Color 2 Parts', type: 'number', placeholder: '2' }, { id: 'color3', label: 'Color 3 Parts', type: 'number', placeholder: '1' }, { id: 'totalQty', label: 'Total Quantity (g)', type: 'number', placeholder: '600' }],
        calculate: (v) => { const c1 = parseFloat(v.color1) || 0, c2 = parseFloat(v.color2) || 0, c3 = parseFloat(v.color3) || 0; const total = c1 + c2 + c3; const qty = parseFloat(v.totalQty); const q1 = (c1 / total) * qty, q2 = (c2 / total) * qty, q3 = (c3 / total) * qty; return { result: `${q1.toFixed(0)}:${q2.toFixed(0)}:${q3.toFixed(0)} g`, details: `Ratio: ${c1}:${c2}:${c3}<br>Color 1: ${q1.toFixed(2)} g<br>Color 2: ${q2.toFixed(2)} g<br>Color 3: ${q3.toFixed(2)} g<br>Total: ${qty} g` }; }
    },
    {
        id: 'tex-knit-gauge', name: 'Knitting Gauge Calculator', icon: '🧶', category: 'Textile', description: 'Calculate knitting gauge',
        fields: [{ id: 'stitches', label: 'Stitches in Swatch', type: 'number', placeholder: '24' }, { id: 'rows', label: 'Rows in Swatch', type: 'number', placeholder: '32' }, { id: 'swatchSize', label: 'Swatch Size (inches)', type: 'number', placeholder: '4' }],
        calculate: (v) => { const stitches = parseInt(v.stitches), rows = parseInt(v.rows), size = parseFloat(v.swatchSize); const spi = stitches / size; const rpi = rows / size; return { result: `${spi.toFixed(1)} st × ${rpi.toFixed(1)} rows`, details: `Stitches per inch: ${spi.toFixed(2)}<br>Rows per inch: ${rpi.toFixed(2)}<br>Stitches per 10cm: ${(spi * 3.937).toFixed(1)}<br>Rows per 10cm: ${(rpi * 3.937).toFixed(1)}` }; }
    },
    {
        id: 'tex-weave-density', name: 'Weaving Density Calculator', icon: '🪢', category: 'Textile', description: 'Calculate fabric density',
        fields: [{ id: 'epi', label: 'Ends Per Inch (EPI)', type: 'number', placeholder: '60' }, { id: 'ppi', label: 'Picks Per Inch (PPI)', type: 'number', placeholder: '50' }, { id: 'warpCount', label: 'Warp Count (Ne)', type: 'number', placeholder: '40' }, { id: 'weftCount', label: 'Weft Count (Ne)', type: 'number', placeholder: '40' }],
        calculate: (v) => { const epi = parseInt(v.epi), ppi = parseInt(v.ppi); const warpC = parseFloat(v.warpCount), weftC = parseFloat(v.weftCount); const coverFactor = Math.sqrt(epi / warpC) + Math.sqrt(ppi / weftC); const totalDensity = epi + ppi; return { result: `${totalDensity} threads/inch`, details: `EPI: ${epi}<br>PPI: ${ppi}<br>Total density: ${totalDensity}<br>Warp cover factor: ${Math.sqrt(epi / warpC).toFixed(2)}<br>Weft cover factor: ${Math.sqrt(ppi / weftC).toFixed(2)}<br>Total cover: ${coverFactor.toFixed(2)}` }; }
    },
    {
        id: 'tex-production', name: 'Apparel Production Capacity Calculator', icon: '🏭', category: 'Textile', description: 'Calculate production capacity',
        fields: [{ id: 'operators', label: 'Number of Operators', type: 'number', placeholder: '50' }, { id: 'hours', label: 'Working Hours/Day', type: 'number', placeholder: '8' }, { id: 'sam', label: 'SAM (minutes)', type: 'number', placeholder: '15' }, { id: 'efficiency', label: 'Line Efficiency %', type: 'number', placeholder: '65' }],
        calculate: (v) => { const ops = parseInt(v.operators), hours = parseFloat(v.hours), sam = parseFloat(v.sam), eff = parseFloat(v.efficiency); const availMins = ops * hours * 60; const capacity = (availMins * (eff / 100)) / sam; const daily = Math.floor(capacity); return { result: daily + ' pieces/day', details: `Operators: ${ops}<br>Available mins: ${availMins}<br>SAM: ${sam} mins<br>Efficiency: ${eff}%<br>Daily capacity: ${daily} pcs<br>Monthly (26 days): ${(daily * 26).toLocaleString()} pcs` }; }
    },
    {
        id: 'tex-tailor-time', name: 'Tailoring Time Calculator', icon: '⏱️', category: 'Textile', description: 'Estimate tailoring time',
        fields: [{ id: 'garment', label: 'Garment Type', type: 'select', options: ['Simple Shirt', 'Formal Shirt', 'Pants', 'Dress', 'Suit Jacket', 'Wedding Dress'] }, { id: 'skill', label: 'Skill Level', type: 'select', options: ['Beginner', 'Intermediate', 'Expert'] }],
        calculate: (v) => { const baseTimes = { 'Simple Shirt': 2, 'Formal Shirt': 3.5, 'Pants': 2.5, 'Dress': 4, 'Suit Jacket': 8, 'Wedding Dress': 40 }; const skillMult = { 'Beginner': 2.0, 'Intermediate': 1.3, 'Expert': 1.0 }; const time = baseTimes[v.garment] * skillMult[v.skill]; return { result: time.toFixed(1) + ' hours', details: `${v.garment}<br>Skill: ${v.skill}<br>Estimated time: ${time.toFixed(1)} hours<br>≈ ${Math.ceil(time / 8)} working days` }; }
    },
    {
        id: 'tex-roll-length', name: 'Fabric Roll Length Calculator', icon: '🎞️', category: 'Textile', description: 'Calculate roll length',
        fields: [{ id: 'outerDia', label: 'Outer Diameter (cm)', type: 'number', placeholder: '30' }, { id: 'innerDia', label: 'Inner/Core Diameter (cm)', type: 'number', placeholder: '5' }, { id: 'thickness', label: 'Fabric Thickness (mm)', type: 'number', placeholder: '0.5' }],
        calculate: (v) => { const outer = parseFloat(v.outerDia), inner = parseFloat(v.innerDia), thick = parseFloat(v.thickness) / 10; const length = Math.PI * (Math.pow(outer / 2, 2) - Math.pow(inner / 2, 2)) / thick / 100; return { result: length.toFixed(1) + ' meters', details: `Outer diameter: ${outer} cm<br>Core diameter: ${inner} cm<br>Thickness: ${v.thickness} mm<br>Estimated length: ${length.toFixed(2)} m<br>≈ ${(length * 1.094).toFixed(1)} yards` }; }
    },
    {
        id: 'tex-alteration', name: 'Alteration Cost Calculator', icon: '✂️', category: 'Textile', description: 'Calculate alteration costs',
        fields: [{ id: 'type', label: 'Alteration Type', type: 'select', options: ['Hemming', 'Waist Adjustment', 'Length Adjustment', 'Sleeve Shortening', 'Full Resizing'] }, { id: 'complexity', label: 'Complexity', type: 'select', options: ['Simple', 'Moderate', 'Complex'] }],
        calculate: (v) => { const baseCosts = { 'Hemming': 100, 'Waist Adjustment': 200, 'Length Adjustment': 150, 'Sleeve Shortening': 120, 'Full Resizing': 500 }; const complexMult = { 'Simple': 1, 'Moderate': 1.5, 'Complex': 2.5 }; const cost = baseCosts[v.type] * complexMult[v.complexity]; const time = Math.ceil(cost / 100) * 0.5; return { result: `₹${cost.toFixed(0)}`, details: `${v.type}<br>Complexity: ${v.complexity}<br>Cost: ₹${cost.toFixed(0)}<br>Est. time: ${time} hours` }; }
    },
    {
        id: 'tex-fashion-price', name: 'Fashion Pricing Calculator', icon: '🏷️', category: 'Textile', description: 'Calculate fashion retail price',
        fields: [{ id: 'cost', label: 'Total Cost', type: 'number', placeholder: '500' }, { id: 'markup', label: 'Markup %', type: 'number', placeholder: '100' }, { id: 'discount', label: 'Expected Discount %', type: 'number', placeholder: '20' }],
        calculate: (v) => { const cost = parseFloat(v.cost), markup = parseFloat(v.markup), disc = parseFloat(v.discount); const mrp = cost * (1 + markup / 100) / (1 - disc / 100); const selling = mrp * (1 - disc / 100); return { result: `MRP: ₹${mrp.toFixed(0)}`, details: `Cost: ₹${cost}<br>Markup: ${markup}%<br>MRP: ₹${mrp.toFixed(2)}<br>After ${disc}% discount: ₹${selling.toFixed(2)}<br>Profit: ₹${(selling - cost).toFixed(2)}` }; }
    },
    {
        id: 'tex-wholesale', name: 'Wholesale Margin Calculator', icon: '📦', category: 'Textile', description: 'Calculate wholesale margins',
        fields: [{ id: 'mfgCost', label: 'Manufacturing Cost', type: 'number', placeholder: '200' }, { id: 'wholesaleMargin', label: 'Wholesale Margin %', type: 'number', placeholder: '30' }, { id: 'qty', label: 'Quantity', type: 'number', placeholder: '1000' }],
        calculate: (v) => { const cost = parseFloat(v.mfgCost), margin = parseFloat(v.wholesaleMargin), qty = parseInt(v.qty); const wholesale = cost * (1 + margin / 100); const totalRevenue = wholesale * qty; const profit = (wholesale - cost) * qty; return { result: `₹${wholesale.toFixed(2)}/pc`, details: `Mfg cost: ₹${cost}<br>Wholesale price: ₹${wholesale.toFixed(2)}<br>Margin: ${margin}%<br>Order qty: ${qty}<br>Revenue: ₹${totalRevenue.toLocaleString()}<br>Profit: ₹${profit.toLocaleString()}` }; }
    },
    {
        id: 'tex-retail', name: 'Retail Price Calculator', icon: '🛍️', category: 'Textile', description: 'Calculate retail pricing',
        fields: [{ id: 'wholesale', label: 'Wholesale Price', type: 'number', placeholder: '300' }, { id: 'retailMargin', label: 'Retail Margin %', type: 'number', placeholder: '50' }, { id: 'overhead', label: 'Store Overhead %', type: 'number', placeholder: '15' }],
        calculate: (v) => { const wholesale = parseFloat(v.wholesale), margin = parseFloat(v.retailMargin), overhead = parseFloat(v.overhead); const retCost = wholesale * (1 + overhead / 100); const retail = retCost * (1 + margin / 100); const profit = retail - retCost; return { result: `₹${retail.toFixed(2)}`, details: `Wholesale: ₹${wholesale}<br>+ Overhead ${overhead}%: ₹${retCost.toFixed(2)}<br>+ Margin ${margin}%: ₹${retail.toFixed(2)}<br>Profit per piece: ₹${profit.toFixed(2)}` }; }
    },
    {
        id: 'tex-export-cost', name: 'Export Costing Calculator', icon: '🌍', category: 'Textile', description: 'Calculate export pricing',
        fields: [{ id: 'fobPrice', label: 'FOB Price (USD)', type: 'number', placeholder: '10' }, { id: 'freight', label: 'Freight (USD)', type: 'number', placeholder: '2' }, { id: 'insurance', label: 'Insurance %', type: 'number', placeholder: '1' }, { id: 'exchangeRate', label: 'Exchange Rate', type: 'number', placeholder: '83' }],
        calculate: (v) => { const fob = parseFloat(v.fobPrice), freight = parseFloat(v.freight), ins = parseFloat(v.insurance), rate = parseFloat(v.exchangeRate); const cif = fob + freight + (fob * ins / 100); const inINR = cif * rate; return { result: `$${cif.toFixed(2)} CIF`, details: `FOB: $${fob}<br>Freight: $${freight}<br>Insurance: $${(fob * ins / 100).toFixed(2)}<br>CIF: $${cif.toFixed(2)}<br>In INR: ₹${inINR.toFixed(2)}` }; }
    },
    {
        id: 'tex-import-duty', name: 'Fabric Import Duty Calculator', icon: '🛃', category: 'Textile', description: 'Calculate import duties',
        fields: [{ id: 'cifValue', label: 'CIF Value (INR)', type: 'number', placeholder: '100000' }, { id: 'bcd', label: 'Basic Customs Duty %', type: 'number', placeholder: '10' }, { id: 'igst', label: 'IGST %', type: 'number', placeholder: '12' }, { id: 'socialWelfare', label: 'Social Welfare Cess %', type: 'number', placeholder: '10' }],
        calculate: (v) => { const cif = parseFloat(v.cifValue), bcd = parseFloat(v.bcd), igst = parseFloat(v.igst), swc = parseFloat(v.socialWelfare); const bcdAmt = cif * bcd / 100; const swcAmt = bcdAmt * swc / 100; const assessableValue = cif + bcdAmt + swcAmt; const igstAmt = assessableValue * igst / 100; const totalDuty = bcdAmt + swcAmt + igstAmt; const landedCost = cif + totalDuty; return { result: `₹${landedCost.toFixed(0)}`, details: `CIF: ₹${cif.toLocaleString()}<br>BCD (${bcd}%): ₹${bcdAmt.toFixed(0)}<br>SWC (${swc}%): ₹${swcAmt.toFixed(0)}<br>IGST (${igst}%): ₹${igstAmt.toFixed(0)}<br>Total Duty: ₹${totalDuty.toFixed(0)}<br>Landed Cost: ₹${landedCost.toFixed(0)}` }; }
    },
    {
        id: 'tex-stitch-rate', name: 'Stitch Rate Calculator', icon: '💵', category: 'Textile', description: 'Calculate stitching rates',
        fields: [{ id: 'sam', label: 'SAM (minutes)', type: 'number', placeholder: '15' }, { id: 'hourlyRate', label: 'Hourly Rate (INR)', type: 'number', placeholder: '80' }, { id: 'efficiency', label: 'Efficiency %', type: 'number', placeholder: '70' }],
        calculate: (v) => { const sam = parseFloat(v.sam), hourly = parseFloat(v.hourlyRate), eff = parseFloat(v.efficiency); const earnedMins = sam / (eff / 100); const rate = (earnedMins / 60) * hourly; return { result: `₹${rate.toFixed(2)}/piece`, details: `SAM: ${sam} mins<br>At ${eff}% efficiency: ${earnedMins.toFixed(1)} mins<br>Hourly rate: ₹${hourly}<br>Stitch rate: ₹${rate.toFixed(2)}/pc` }; }
    },
    {
        id: 'tex-roi', name: 'Fashion ROI Calculator', icon: '📈', category: 'Textile', description: 'Calculate fashion business ROI',
        fields: [{ id: 'investment', label: 'Total Investment', type: 'number', placeholder: '500000' }, { id: 'revenue', label: 'Annual Revenue', type: 'number', placeholder: '1200000' }, { id: 'costs', label: 'Annual Costs', type: 'number', placeholder: '800000' }],
        calculate: (v) => { const inv = parseFloat(v.investment), rev = parseFloat(v.revenue), costs = parseFloat(v.costs); const profit = rev - costs; const roi = (profit / inv) * 100; const payback = inv / (profit / 12); return { result: roi.toFixed(2) + '% ROI', details: `Investment: ₹${inv.toLocaleString()}<br>Revenue: ₹${rev.toLocaleString()}<br>Costs: ₹${costs.toLocaleString()}<br>Profit: ₹${profit.toLocaleString()}<br>ROI: ${roi.toFixed(2)}%<br>Payback: ${payback.toFixed(1)} months` }; }
    }
];
if (typeof window !== 'undefined') window.textileCalculators = textileCalculators;
