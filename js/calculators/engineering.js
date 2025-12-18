// Engineering Calculators (30)
const engineeringCalculators = [
    {
        id: 'load-calculation', name: 'Load Calculation', icon: '🏗️', category: 'Engineering', description: 'Calculate structural load',
        fields: [{ id: 'dead', label: 'Dead Load (kN/m²)', type: 'number', placeholder: '2.5' }, { id: 'live', label: 'Live Load (kN/m²)', type: 'number', placeholder: '3' }, { id: 'area', label: 'Area (m²)', type: 'number', placeholder: '50' }],
        calculate: (v) => { const dead = parseFloat(v.dead), live = parseFloat(v.live), area = parseFloat(v.area); const total = (dead + live) * area; return { result: total.toFixed(2) + ' kN', details: `Dead: ${dead * area} kN<br>Live: ${live * area} kN<br>Total: ${total.toFixed(2)} kN` }; }
    },
    {
        id: 'stress-calc', name: 'Stress Calculator', icon: '💪', category: 'Engineering', description: 'Calculate mechanical stress',
        fields: [{ id: 'force', label: 'Force (N)', type: 'number', placeholder: '10000' }, { id: 'area', label: 'Cross-section Area (mm²)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const F = parseFloat(v.force), A = parseFloat(v.area); const stress = F / A; return { result: stress.toFixed(2) + ' MPa', details: `σ = F/A = ${F}/${A} = ${stress.toFixed(2)} MPa` }; }
    },
    {
        id: 'strain-calc', name: 'Strain Calculator', icon: '📏', category: 'Engineering', description: 'Calculate strain',
        fields: [{ id: 'deltaL', label: 'Change in Length (mm)', type: 'number', placeholder: '0.5' }, { id: 'L', label: 'Original Length (mm)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const dL = parseFloat(v.deltaL), L = parseFloat(v.L); const strain = dL / L; return { result: (strain * 1000).toFixed(4) + ' ×10⁻³', details: `ε = ΔL/L = ${dL}/${L} = ${strain.toExponential(4)}` }; }
    },
    {
        id: 'youngs-modulus', name: 'Young\'s Modulus Calculator', icon: '📊', category: 'Engineering', description: 'Calculate E from stress/strain',
        fields: [{ id: 'stress', label: 'Stress (MPa)', type: 'number', placeholder: '200' }, { id: 'strain', label: 'Strain', type: 'number', placeholder: '0.001' }],
        calculate: (v) => { const stress = parseFloat(v.stress), strain = parseFloat(v.strain); const E = stress / strain; return { result: (E / 1000).toFixed(2) + ' GPa', details: `E = σ/ε = ${stress}/${strain} = ${E.toFixed(0)} MPa<br>= ${(E / 1000).toFixed(2)} GPa` }; }
    },
    {
        id: 'beam-deflection', name: 'Beam Deflection Calculator', icon: '📐', category: 'Engineering', description: 'Simply supported beam',
        fields: [{ id: 'load', label: 'Point Load (N)', type: 'number', placeholder: '1000' }, { id: 'length', label: 'Span (m)', type: 'number', placeholder: '3' }, { id: 'E', label: 'E (GPa)', type: 'number', placeholder: '200' }, { id: 'I', label: 'Moment of Inertia (cm⁴)', type: 'number', placeholder: '1000' }],
        calculate: (v) => { const P = parseFloat(v.load), L = parseFloat(v.length), E = parseFloat(v.E) * 1e9, I = parseFloat(v.I) * 1e-8; const delta = (P * Math.pow(L, 3)) / (48 * E * I); return { result: (delta * 1000).toFixed(2) + ' mm', details: `Max deflection at center<br>δ = PL³/48EI = ${(delta * 1000).toFixed(2)} mm` }; }
    },
    {
        id: 'shear-force', name: 'Shear Force Calculator', icon: '✂️', category: 'Engineering', description: 'Calculate shear force',
        fields: [{ id: 'load', label: 'Total Load (kN)', type: 'number', placeholder: '10' }, { id: 'type', label: 'Loading Type', type: 'select', options: ['Point Load at Center', 'Uniform Load'] }],
        calculate: (v) => { const W = parseFloat(v.load); const shear = v.type === 'Point Load at Center' ? W / 2 : W / 2; return { result: shear.toFixed(2) + ' kN', details: `Max Shear Force: ${shear.toFixed(2)} kN (at supports)` }; }
    },
    {
        id: 'bending-moment', name: 'Bending Moment Calculator', icon: '↩️', category: 'Engineering', description: 'Calculate max bending moment',
        fields: [{ id: 'load', label: 'Load (kN)', type: 'number', placeholder: '10' }, { id: 'span', label: 'Span (m)', type: 'number', placeholder: '4' }, { id: 'type', label: 'Loading', type: 'select', options: ['Point at Center', 'Uniform'] }],
        calculate: (v) => { const W = parseFloat(v.load), L = parseFloat(v.span); let M; if (v.type === 'Point at Center') M = W * L / 4; else M = W * L / 8; return { result: M.toFixed(2) + ' kN·m', details: `Max Bending Moment: ${M.toFixed(2)} kN·m` }; }
    },
    {
        id: 'torque', name: 'Torque Calculator', icon: '🔧', category: 'Engineering', description: 'Calculate torque',
        fields: [{ id: 'force', label: 'Force (N)', type: 'number', placeholder: '100' }, { id: 'radius', label: 'Radius (m)', type: 'number', placeholder: '0.3' }],
        calculate: (v) => { const F = parseFloat(v.force), r = parseFloat(v.radius); const T = F * r; return { result: T.toFixed(2) + ' N·m', details: `τ = F × r = ${F} × ${r} = ${T.toFixed(2)} N·m` }; }
    },
    {
        id: 'gear-ratio', name: 'Gear Ratio Calculator', icon: '⚙️', category: 'Engineering', description: 'Calculate gear ratio',
        fields: [{ id: 'driven', label: 'Driven Gear Teeth', type: 'number', placeholder: '40' }, { id: 'driver', label: 'Driver Gear Teeth', type: 'number', placeholder: '10' }],
        calculate: (v) => { const driven = parseFloat(v.driven), driver = parseFloat(v.driver); const ratio = driven / driver; return { result: ratio.toFixed(2) + ':1', details: `Gear Ratio = ${driven}/${driver} = ${ratio.toFixed(2)}:1<br>${ratio > 1 ? 'Speed reduction, torque increase' : 'Speed increase, torque reduction'}` }; }
    },
    {
        id: 'rpm-calc', name: 'RPM Calculator', icon: '🔄', category: 'Engineering', description: 'Calculate rotational speed',
        fields: [{ id: 'velocity', label: 'Surface Velocity (m/min)', type: 'number', placeholder: '100' }, { id: 'diameter', label: 'Diameter (mm)', type: 'number', placeholder: '50' }],
        calculate: (v) => { const V = parseFloat(v.velocity), D = parseFloat(v.diameter); const rpm = (V * 1000) / (Math.PI * D); return { result: rpm.toFixed(0) + ' RPM', details: `N = V × 1000 / (π × D) = ${rpm.toFixed(0)} RPM` }; }
    },
    {
        id: 'flow-rate', name: 'Flow Rate Calculator', icon: '💧', category: 'Engineering', description: 'Calculate fluid flow rate',
        fields: [{ id: 'area', label: 'Pipe Area (m²)', type: 'number', placeholder: '0.01' }, { id: 'velocity', label: 'Flow Velocity (m/s)', type: 'number', placeholder: '2' }],
        calculate: (v) => { const A = parseFloat(v.area), V = parseFloat(v.velocity); const Q = A * V; return { result: (Q * 1000).toFixed(2) + ' L/s', details: `Q = A × V = ${A} × ${V}<br>= ${Q.toFixed(4)} m³/s = ${(Q * 1000).toFixed(2)} L/s` }; }
    },
    {
        id: 'pipe-diameter', name: 'Pipe Diameter Calculator', icon: '⭕', category: 'Engineering', description: 'Calculate required diameter',
        fields: [{ id: 'flowRate', label: 'Flow Rate (L/s)', type: 'number', placeholder: '10' }, { id: 'velocity', label: 'Max Velocity (m/s)', type: 'number', placeholder: '2' }],
        calculate: (v) => { const Q = parseFloat(v.flowRate) / 1000, V = parseFloat(v.velocity); const A = Q / V; const D = Math.sqrt(4 * A / Math.PI) * 1000; return { result: D.toFixed(0) + ' mm', details: `Required diameter: ${D.toFixed(0)} mm<br>Use next standard size up` }; }
    },
    {
        id: 'pump-power', name: 'Pump Power Calculator', icon: '🔌', category: 'Engineering', description: 'Calculate pump power',
        fields: [{ id: 'flow', label: 'Flow Rate (m³/h)', type: 'number', placeholder: '20' }, { id: 'head', label: 'Head (m)', type: 'number', placeholder: '30' }, { id: 'efficiency', label: 'Efficiency (%)', type: 'number', placeholder: '70' }],
        calculate: (v) => { const Q = parseFloat(v.flow) / 3600, H = parseFloat(v.head), eff = parseFloat(v.efficiency) / 100; const P = (Q * 9810 * H) / (eff * 1000); return { result: P.toFixed(2) + ' kW', details: `Power = ρgQH/η<br>= ${P.toFixed(2)} kW` }; }
    },
    {
        id: 'hydraulic-pressure', name: 'Hydraulic Pressure Calculator', icon: '🔴', category: 'Engineering', description: 'Calculate hydraulic pressure',
        fields: [{ id: 'force', label: 'Force (kN)', type: 'number', placeholder: '50' }, { id: 'area', label: 'Piston Area (cm²)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const F = parseFloat(v.force) * 1000, A = parseFloat(v.area) / 10000; const P = F / A / 1e6; return { result: P.toFixed(2) + ' MPa', details: `Pressure = F/A = ${P.toFixed(2)} MPa<br>= ${(P * 10).toFixed(2)} bar` }; }
    },
    {
        id: 'efficiency', name: 'Efficiency Calculator', icon: '📊', category: 'Engineering', description: 'Calculate machine efficiency',
        fields: [{ id: 'output', label: 'Output Power (kW)', type: 'number', placeholder: '85' }, { id: 'input', label: 'Input Power (kW)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const out = parseFloat(v.output), inp = parseFloat(v.input); const eff = (out / inp) * 100; const loss = inp - out; return { result: eff.toFixed(1) + '%', details: `Efficiency: ${eff.toFixed(1)}%<br>Power loss: ${loss.toFixed(2)} kW` }; }
    },
    {
        id: 'power-factor', name: 'Power Factor Calculator', icon: '⚡', category: 'Engineering', description: 'Calculate power factor',
        fields: [{ id: 'realPower', label: 'Real Power (kW)', type: 'number', placeholder: '80' }, { id: 'apparentPower', label: 'Apparent Power (kVA)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const P = parseFloat(v.realPower), S = parseFloat(v.apparentPower); const pf = P / S; const Q = Math.sqrt(S * S - P * P); return { result: 'PF = ' + pf.toFixed(3), details: `Power Factor: ${pf.toFixed(3)}<br>Reactive Power: ${Q.toFixed(2)} kVAR` }; }
    },
    {
        id: 'electrical-load', name: 'Electrical Load Calculator', icon: '🔌', category: 'Engineering', description: 'Calculate total load',
        fields: [{ id: 'devices', label: 'Number of Devices', type: 'number', placeholder: '10' }, { id: 'watts', label: 'Watts per Device', type: 'number', placeholder: '100' }, { id: 'df', label: 'Demand Factor (%)', type: 'number', placeholder: '80' }],
        calculate: (v) => { const n = parseFloat(v.devices), w = parseFloat(v.watts), df = parseFloat(v.df) / 100; const connected = n * w; const demand = connected * df; return { result: (demand / 1000).toFixed(2) + ' kW', details: `Connected: ${(connected / 1000).toFixed(2)} kW<br>Demand: ${(demand / 1000).toFixed(2)} kW` }; }
    },
    {
        id: 'circuit-breaker', name: 'Circuit Breaker Size', icon: '🔲', category: 'Engineering', description: 'Calculate breaker size',
        fields: [{ id: 'load', label: 'Load (kW)', type: 'number', placeholder: '5' }, { id: 'voltage', label: 'Voltage (V)', type: 'number', placeholder: '230' }, { id: 'pf', label: 'Power Factor', type: 'number', placeholder: '0.85' }],
        calculate: (v) => { const P = parseFloat(v.load) * 1000, V = parseFloat(v.voltage), pf = parseFloat(v.pf); const I = P / (V * pf); const breaker = Math.ceil(I * 1.25 / 5) * 5; return { result: breaker + ' A', details: `Load current: ${I.toFixed(1)} A<br>Recommended CB: ${breaker} A` }; }
    },
    {
        id: 'transformer-efficiency', name: 'Transformer Efficiency', icon: '🔄', category: 'Engineering', description: 'Calculate transformer efficiency',
        fields: [{ id: 'output', label: 'Output (kVA)', type: 'number', placeholder: '100' }, { id: 'cu', label: 'Copper Loss (kW)', type: 'number', placeholder: '1.5' }, { id: 'fe', label: 'Iron Loss (kW)', type: 'number', placeholder: '1' }, { id: 'pf', label: 'Power Factor', type: 'number', placeholder: '0.8' }],
        calculate: (v) => { const out = parseFloat(v.output), cu = parseFloat(v.cu), fe = parseFloat(v.fe), pf = parseFloat(v.pf); const eff = (out * pf) / (out * pf + cu + fe) * 100; return { result: eff.toFixed(2) + '%', details: `Efficiency at full load:<br>${eff.toFixed(2)}%` }; }
    },
    {
        id: 'voltage-drop', name: 'Voltage Drop Calculator', icon: '📉', category: 'Engineering', description: 'Calculate cable voltage drop',
        fields: [{ id: 'current', label: 'Current (A)', type: 'number', placeholder: '20' }, { id: 'length', label: 'Length (m)', type: 'number', placeholder: '50' }, { id: 'resistance', label: 'Resistance (Ω/km)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const I = parseFloat(v.current), L = parseFloat(v.length), r = parseFloat(v.resistance); const drop = 2 * I * (L / 1000) * r; return { result: drop.toFixed(2) + ' V', details: `Voltage Drop: ${drop.toFixed(2)} V<br>% Drop at 230V: ${((drop / 230) * 100).toFixed(2)}%` }; }
    },
    {
        id: 'motor-power', name: 'Motor Power Calculator', icon: '⚙️', category: 'Engineering', description: 'Calculate motor power',
        fields: [{ id: 'torque', label: 'Torque (N·m)', type: 'number', placeholder: '50' }, { id: 'rpm', label: 'Speed (RPM)', type: 'number', placeholder: '1500' }],
        calculate: (v) => { const T = parseFloat(v.torque), N = parseFloat(v.rpm); const P = (2 * Math.PI * N * T) / 60000; return { result: P.toFixed(2) + ' kW', details: `P = 2πNT/60 = ${P.toFixed(2)} kW<br>= ${(P * 1.341).toFixed(2)} HP` }; }
    },
    {
        id: 'heat-exchanger', name: 'Heat Exchanger Calculator', icon: '🔥', category: 'Engineering', description: 'Calculate heat transfer',
        fields: [{ id: 'U', label: 'U-value (W/m²K)', type: 'number', placeholder: '500' }, { id: 'A', label: 'Area (m²)', type: 'number', placeholder: '10' }, { id: 'LMTD', label: 'LMTD (K)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const U = parseFloat(v.U), A = parseFloat(v.A), LMTD = parseFloat(v.LMTD); const Q = U * A * LMTD; return { result: (Q / 1000).toFixed(2) + ' kW', details: `Q = U × A × LMTD<br>= ${(Q / 1000).toFixed(2)} kW` }; }
    },
    {
        id: 'cooling-load', name: 'Cooling Load Calculator', icon: '❄️', category: 'Engineering', description: 'Calculate cooling requirement',
        fields: [{ id: 'area', label: 'Room Area (m²)', type: 'number', placeholder: '50' }, { id: 'height', label: 'Height (m)', type: 'number', placeholder: '3' }, { id: 'factor', label: 'Load Factor (W/m³)', type: 'number', placeholder: '40' }],
        calculate: (v) => { const A = parseFloat(v.area), H = parseFloat(v.height), f = parseFloat(v.factor); const vol = A * H; const load = vol * f; const tons = load / 3517; return { result: tons.toFixed(2) + ' TR', details: `Volume: ${vol} m³<br>Load: ${(load / 1000).toFixed(2)} kW<br>= ${tons.toFixed(2)} Tons` }; }
    },
    {
        id: 'hvac-tonnage', name: 'HVAC Tonnage Calculator', icon: '🌡️', category: 'Engineering', description: 'Estimate AC tonnage',
        fields: [{ id: 'area', label: 'Area (sq ft)', type: 'number', placeholder: '1000' }, { id: 'occupancy', label: 'Occupancy', type: 'select', options: ['Residential', 'Office', 'Server Room'] }],
        calculate: (v) => { const area = parseFloat(v.area); const factors = { Residential: 600, Office: 400, 'Server Room': 150 }; const tonnage = area / factors[v.occupancy]; return { result: tonnage.toFixed(1) + ' Tons', details: `Area: ${area} sq ft<br>Type: ${v.occupancy}<br>Required: ~${tonnage.toFixed(1)} TR` }; }
    },
    {
        id: 'welding-current', name: 'Welding Current Calculator', icon: '⚡', category: 'Engineering', description: 'Calculate welding amperage',
        fields: [{ id: 'diameter', label: 'Electrode Dia (mm)', type: 'number', placeholder: '3.15' }, { id: 'type', label: 'Weld Type', type: 'select', options: ['Mild Steel', 'Stainless Steel'] }],
        calculate: (v) => { const d = parseFloat(v.diameter); const factor = v.type === 'Mild Steel' ? 40 : 35; const current = d * factor; return { result: current.toFixed(0) + ' A', details: `Electrode: ${d} mm<br>Recommended: ${current.toFixed(0)} A (±10%)` }; }
    },
    {
        id: 'material-weight', name: 'Material Weight Calculator', icon: '⚖️', category: 'Engineering', description: 'Calculate material weight',
        fields: [{ id: 'volume', label: 'Volume (m³)', type: 'number', placeholder: '0.1' }, { id: 'material', label: 'Material', type: 'select', options: ['Steel (7850)', 'Aluminum (2700)', 'Copper (8960)', 'Concrete (2400)'] }],
        calculate: (v) => { const vol = parseFloat(v.volume); const density = parseFloat(v.material.match(/\d+/)[0]); const weight = vol * density; return { result: weight.toFixed(2) + ' kg', details: `Volume: ${vol} m³<br>Density: ${density} kg/m³<br>Weight: ${weight.toFixed(2)} kg` }; }
    },
    {
        id: 'sheet-metal', name: 'Sheet Metal Thickness', icon: '📄', category: 'Engineering', description: 'Convert gauge to mm',
        fields: [{ id: 'gauge', label: 'Gauge Number', type: 'number', placeholder: '14' }],
        calculate: (v) => { const g = parseFloat(v.gauge); const mm = 0.127 * Math.pow(92, (36 - g) / 39); return { result: mm.toFixed(3) + ' mm', details: `${g} gauge = ${mm.toFixed(3)} mm<br>≈ ${(mm / 25.4).toFixed(4)} inches` }; }
    },
    {
        id: 'safety-factor', name: 'Safety Factor Calculator', icon: '🛡️', category: 'Engineering', description: 'Calculate factor of safety',
        fields: [{ id: 'ultimate', label: 'Ultimate Strength (MPa)', type: 'number', placeholder: '400' }, { id: 'working', label: 'Working Stress (MPa)', type: 'number', placeholder: '160' }],
        calculate: (v) => { const ultimate = parseFloat(v.ultimate), working = parseFloat(v.working); const fos = ultimate / working; let rating = fos >= 3 ? 'Safe' : fos >= 2 ? 'Acceptable' : 'Risky'; return { result: 'FOS = ' + fos.toFixed(2), details: `Factor of Safety: ${fos.toFixed(2)}<br>Rating: ${rating}` }; }
    },
    {
        id: 'mach-number', name: 'Mach Number Calculator', icon: '✈️', category: 'Engineering', description: 'Calculate Mach number',
        fields: [{ id: 'velocity', label: 'Velocity (m/s)', type: 'number', placeholder: '300' }, { id: 'temp', label: 'Temperature (°C)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const V = parseFloat(v.velocity), T = parseFloat(v.temp); const a = 331.3 * Math.sqrt(1 + T / 273.15); const M = V / a; let regime = M < 0.8 ? 'Subsonic' : M < 1.2 ? 'Transonic' : M < 5 ? 'Supersonic' : 'Hypersonic'; return { result: 'Mach ' + M.toFixed(3), details: `Speed of sound: ${a.toFixed(1)} m/s<br>Mach: ${M.toFixed(3)}<br>Regime: ${regime}` }; }
    }
];
if (typeof window !== 'undefined') window.engineeringCalculators = engineeringCalculators;
