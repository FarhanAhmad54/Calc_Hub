// Chemistry Calculators (30)
const chemistryCalculators = [
    {
        id: 'molarity', name: 'Molarity Calculator', icon: '🧪', category: 'Chemistry', description: 'Calculate molarity',
        fields: [{ id: 'moles', label: 'Moles of Solute', type: 'number', placeholder: '0.5' }, { id: 'volume', label: 'Volume (L)', type: 'number', placeholder: '1' }],
        calculate: (v) => { const mol = parseFloat(v.moles), vol = parseFloat(v.volume); const M = mol / vol; return { result: M.toFixed(4) + ' M', details: `M = moles/volume = ${mol}/${vol} = ${M.toFixed(4)} mol/L` }; }
    },
    {
        id: 'molality', name: 'Molality Calculator', icon: '⚗️', category: 'Chemistry', description: 'Calculate molality',
        fields: [{ id: 'moles', label: 'Moles of Solute', type: 'number', placeholder: '0.5' }, { id: 'mass', label: 'Mass of Solvent (kg)', type: 'number', placeholder: '1' }],
        calculate: (v) => { const mol = parseFloat(v.moles), mass = parseFloat(v.mass); const m = mol / mass; return { result: m.toFixed(4) + ' m', details: `m = moles/kg solvent = ${mol}/${mass} = ${m.toFixed(4)} mol/kg` }; }
    },
    {
        id: 'normality', name: 'Normality Calculator', icon: '📊', category: 'Chemistry', description: 'Calculate normality',
        fields: [{ id: 'equiv', label: 'Gram Equivalents', type: 'number', placeholder: '0.5' }, { id: 'volume', label: 'Volume (L)', type: 'number', placeholder: '1' }],
        calculate: (v) => { const eq = parseFloat(v.equiv), vol = parseFloat(v.volume); const N = eq / vol; return { result: N.toFixed(4) + ' N', details: `N = equivalents/volume = ${N.toFixed(4)} eq/L` }; }
    },
    {
        id: 'molecular-weight', name: 'Molecular Weight Calculator', icon: '⚖️', category: 'Chemistry', description: 'Calculate molar mass',
        fields: [{ id: 'formula', label: 'Enter Elements', type: 'select', options: ['H2O', 'NaCl', 'H2SO4', 'NaOH', 'HCl', 'CO2', 'NH3', 'CaCO3'] }],
        calculate: (v) => { const masses = { 'H2O': 18.015, 'NaCl': 58.44, 'H2SO4': 98.079, 'NaOH': 40.00, 'HCl': 36.46, 'CO2': 44.01, 'NH3': 17.03, 'CaCO3': 100.09 }; const mw = masses[v.formula]; return { result: mw.toFixed(3) + ' g/mol', details: `Molecular weight of ${v.formula}: ${mw.toFixed(3)} g/mol` }; }
    },
    {
        id: 'empirical-formula', name: 'Empirical Formula Calculator', icon: '🔬', category: 'Chemistry', description: 'Find empirical formula',
        fields: [{ id: 'c', label: 'Carbon %', type: 'number', placeholder: '40' }, { id: 'h', label: 'Hydrogen %', type: 'number', placeholder: '6.7' }, { id: 'o', label: 'Oxygen %', type: 'number', placeholder: '53.3' }],
        calculate: (v) => { const C = parseFloat(v.c) / 12, H = parseFloat(v.h) / 1, O = parseFloat(v.o) / 16; const min = Math.min(C, H, O); const rC = Math.round(C / min), rH = Math.round(H / min), rO = Math.round(O / min); return { result: `C${rC}H${rH}O${rO}`, details: `Mole ratio: C:H:O = ${rC}:${rH}:${rO}<br>Empirical: C${rC}H${rH}O${rO}` }; }
    },
    {
        id: 'percent-composition', name: 'Percent Composition', icon: '📈', category: 'Chemistry', description: 'Calculate % composition',
        fields: [{ id: 'element', label: 'Element Mass (g)', type: 'number', placeholder: '16' }, { id: 'total', label: 'Total Mass (g)', type: 'number', placeholder: '18' }],
        calculate: (v) => { const el = parseFloat(v.element), total = parseFloat(v.total); const pct = (el / total) * 100; return { result: pct.toFixed(2) + '%', details: `% = (${el}/${total}) × 100 = ${pct.toFixed(2)}%` }; }
    },
    {
        id: 'dilution', name: 'Dilution Calculator (C1V1=C2V2)', icon: '💧', category: 'Chemistry', description: 'Calculate dilution',
        fields: [{ id: 'c1', label: 'Initial Conc (M)', type: 'number', placeholder: '1' }, { id: 'v1', label: 'Initial Vol (mL)', type: 'number', placeholder: '100' }, { id: 'c2', label: 'Final Conc (M)', type: 'number', placeholder: '0.1' }],
        calculate: (v) => { const c1 = parseFloat(v.c1), v1 = parseFloat(v.v1), c2 = parseFloat(v.c2); const v2 = (c1 * v1) / c2; return { result: v2.toFixed(2) + ' mL', details: `V₂ = C₁V₁/C₂ = (${c1} × ${v1})/${c2} = ${v2.toFixed(2)} mL` }; }
    },
    {
        id: 'ph-calculator', name: 'pH Calculator', icon: '🧫', category: 'Chemistry', description: 'Calculate pH',
        fields: [{ id: 'h', label: '[H⁺] (M)', type: 'number', placeholder: '0.001' }],
        calculate: (v) => { const h = parseFloat(v.h); const pH = -Math.log10(h); return { result: 'pH = ' + pH.toFixed(2), details: `pH = -log[H⁺] = -log(${h}) = ${pH.toFixed(2)}` }; }
    },
    {
        id: 'poh-calculator', name: 'pOH Calculator', icon: '🧫', category: 'Chemistry', description: 'Calculate pOH',
        fields: [{ id: 'oh', label: '[OH⁻] (M)', type: 'number', placeholder: '0.0001' }],
        calculate: (v) => { const oh = parseFloat(v.oh); const pOH = -Math.log10(oh); const pH = 14 - pOH; return { result: 'pOH = ' + pOH.toFixed(2), details: `pOH = ${pOH.toFixed(2)}<br>pH = ${pH.toFixed(2)}` }; }
    },
    {
        id: 'buffer-solution', name: 'Buffer Solution Calculator', icon: '⚖️', category: 'Chemistry', description: 'Henderson-Hasselbalch',
        fields: [{ id: 'pka', label: 'pKa', type: 'number', placeholder: '4.76' }, { id: 'acid', label: '[Acid] (M)', type: 'number', placeholder: '0.1' }, { id: 'base', label: '[Base] (M)', type: 'number', placeholder: '0.1' }],
        calculate: (v) => { const pka = parseFloat(v.pka), acid = parseFloat(v.acid), base = parseFloat(v.base); const pH = pka + Math.log10(base / acid); return { result: 'pH = ' + pH.toFixed(2), details: `pH = pKa + log([A⁻]/[HA])<br>= ${pka} + log(${base}/${acid})<br>= ${pH.toFixed(2)}` }; }
    },
    {
        id: 'reaction-yield', name: 'Reaction Yield Calculator', icon: '📊', category: 'Chemistry', description: 'Calculate % yield',
        fields: [{ id: 'actual', label: 'Actual Yield (g)', type: 'number', placeholder: '8' }, { id: 'theoretical', label: 'Theoretical Yield (g)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const actual = parseFloat(v.actual), theo = parseFloat(v.theoretical); const yield_ = (actual / theo) * 100; return { result: yield_.toFixed(2) + '% yield', details: `% Yield = (${actual}/${theo}) × 100 = ${yield_.toFixed(2)}%` }; }
    },
    {
        id: 'limiting-reagent', name: 'Limiting Reagent Calculator', icon: '⚗️', category: 'Chemistry', description: 'Find limiting reagent',
        fields: [{ id: 'molesA', label: 'Moles of A', type: 'number', placeholder: '2' }, { id: 'coeffA', label: 'Coefficient of A', type: 'number', placeholder: '1' }, { id: 'molesB', label: 'Moles of B', type: 'number', placeholder: '3' }, { id: 'coeffB', label: 'Coefficient of B', type: 'number', placeholder: '2' }],
        calculate: (v) => { const molA = parseFloat(v.molesA), coA = parseFloat(v.coeffA), molB = parseFloat(v.molesB), coB = parseFloat(v.coeffB); const ratioA = molA / coA, ratioB = molB / coB; const limiting = ratioA < ratioB ? 'A' : 'B'; return { result: `${limiting} is limiting`, details: `A ratio: ${ratioA.toFixed(3)}<br>B ratio: ${ratioB.toFixed(3)}<br>${limiting} is the limiting reagent` }; }
    },
    {
        id: 'ideal-gas', name: 'Ideal Gas Calculator (PV=nRT)', icon: '💨', category: 'Chemistry', description: 'Ideal gas law',
        fields: [{ id: 'calc', label: 'Solve for', type: 'select', options: ['P (Pressure)', 'V (Volume)', 'n (Moles)', 'T (Temperature)'] }, { id: 'val1', label: 'Value 1', type: 'number', placeholder: '1' }, { id: 'val2', label: 'Value 2', type: 'number', placeholder: '22.4' }, { id: 'val3', label: 'Value 3', type: 'number', placeholder: '273' }],
        calculate: (v) => { const R = 8.314; const v1 = parseFloat(v.val1), v2 = parseFloat(v.val2), v3 = parseFloat(v.val3); let result; if (v.calc === 'P (Pressure)') { result = (v1 * R * v3) / v2; return { result: result.toFixed(2) + ' kPa', details: `P = nRT/V = ${result.toFixed(2)} kPa` }; } else if (v.calc === 'V (Volume)') { result = (v1 * R * v3) / v2; return { result: result.toFixed(2) + ' L', details: `V = nRT/P = ${result.toFixed(2)} L` }; } else if (v.calc === 'n (Moles)') { result = (v1 * v2) / (R * v3); return { result: result.toFixed(4) + ' mol', details: `n = PV/RT = ${result.toFixed(4)} mol` }; } else { result = (v1 * v2) / (v3 * R); return { result: result.toFixed(2) + ' K', details: `T = PV/nR = ${result.toFixed(2)} K` }; } }
    },
    {
        id: 'boyles-law', name: 'Boyle\'s Law Calculator', icon: '🎈', category: 'Chemistry', description: 'P1V1 = P2V2',
        fields: [{ id: 'p1', label: 'P1 (atm)', type: 'number', placeholder: '1' }, { id: 'v1', label: 'V1 (L)', type: 'number', placeholder: '10' }, { id: 'p2', label: 'P2 (atm)', type: 'number', placeholder: '2' }],
        calculate: (v) => { const p1 = parseFloat(v.p1), v1 = parseFloat(v.v1), p2 = parseFloat(v.p2); const v2 = (p1 * v1) / p2; return { result: 'V2 = ' + v2.toFixed(2) + ' L', details: `V₂ = P₁V₁/P₂ = (${p1} × ${v1})/${p2} = ${v2.toFixed(2)} L` }; }
    },
    {
        id: 'charles-law', name: 'Charles\'s Law Calculator', icon: '🌡️', category: 'Chemistry', description: 'V1/T1 = V2/T2',
        fields: [{ id: 'v1', label: 'V1 (L)', type: 'number', placeholder: '10' }, { id: 't1', label: 'T1 (K)', type: 'number', placeholder: '273' }, { id: 't2', label: 'T2 (K)', type: 'number', placeholder: '373' }],
        calculate: (v) => { const v1 = parseFloat(v.v1), t1 = parseFloat(v.t1), t2 = parseFloat(v.t2); const v2 = (v1 * t2) / t1; return { result: 'V2 = ' + v2.toFixed(2) + ' L', details: `V₂ = V₁T₂/T₁ = (${v1} × ${t2})/${t1} = ${v2.toFixed(2)} L` }; }
    },
    {
        id: 'avogadro', name: 'Avogadro Calculator', icon: '🔢', category: 'Chemistry', description: 'Moles to molecules',
        fields: [{ id: 'moles', label: 'Moles', type: 'number', placeholder: '1' }],
        calculate: (v) => { const mol = parseFloat(v.moles); const NA = 6.022e23; const molecules = mol * NA; return { result: molecules.toExponential(3) + ' molecules', details: `${mol} mol × 6.022×10²³<br>= ${molecules.toExponential(3)} molecules` }; }
    },
    {
        id: 'stoichiometry', name: 'Stoichiometry Calculator', icon: '⚗️', category: 'Chemistry', description: 'Mole ratio calculations',
        fields: [{ id: 'molesA', label: 'Moles of Reactant', type: 'number', placeholder: '2' }, { id: 'coeffA', label: 'Reactant Coefficient', type: 'number', placeholder: '1' }, { id: 'coeffB', label: 'Product Coefficient', type: 'number', placeholder: '2' }],
        calculate: (v) => { const molA = parseFloat(v.molesA), coA = parseFloat(v.coeffA), coB = parseFloat(v.coeffB); const molB = molA * (coB / coA); return { result: molB.toFixed(4) + ' mol product', details: `Moles product = ${molA} × (${coB}/${coA}) = ${molB.toFixed(4)} mol` }; }
    },
    {
        id: 'oxidation-number', name: 'Oxidation Number Calculator', icon: '⚡', category: 'Chemistry', description: 'Determine oxidation state',
        fields: [{ id: 'element', label: 'Element', type: 'select', options: ['O in compounds', 'H in compounds', 'Cl in compounds', 'Na/K', 'S in H2SO4', 'N in NO3-'] }],
        calculate: (v) => { const states = { 'O in compounds': -2, 'H in compounds': +1, 'Cl in compounds': -1, 'Na/K': +1, 'S in H2SO4': +6, 'N in NO3-': +5 }; const ox = states[v.element]; return { result: (ox > 0 ? '+' : '') + ox, details: `${v.element}: oxidation state = ${ox > 0 ? '+' : ''}${ox}` }; }
    },
    {
        id: 'half-life-chem', name: 'Half-Life Calculator', icon: '⏱️', category: 'Chemistry', description: 'Chemical half-life',
        fields: [{ id: 'initial', label: 'Initial Amount', type: 'number', placeholder: '100' }, { id: 'halfLife', label: 'Half-life (min)', type: 'number', placeholder: '30' }, { id: 'time', label: 'Time Elapsed (min)', type: 'number', placeholder: '90' }],
        calculate: (v) => { const N0 = parseFloat(v.initial), t12 = parseFloat(v.halfLife), t = parseFloat(v.time); const N = N0 * Math.pow(0.5, t / t12); return { result: N.toFixed(2) + ' remaining', details: `After ${t} min: ${N.toFixed(2)} (${((N / N0) * 100).toFixed(1)}% remaining)` }; }
    },
    {
        id: 'reaction-rate', name: 'Reaction Rate Calculator', icon: '📈', category: 'Chemistry', description: 'Calculate reaction rate',
        fields: [{ id: 'deltaC', label: 'Concentration Change (M)', type: 'number', placeholder: '0.1' }, { id: 'deltaT', label: 'Time Change (s)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const dC = parseFloat(v.deltaC), dT = parseFloat(v.deltaT); const rate = dC / dT; return { result: rate.toExponential(4) + ' M/s', details: `Rate = Δ[C]/Δt = ${dC}/${dT} = ${rate.toExponential(4)} M/s` }; }
    },
    {
        id: 'solubility', name: 'Solubility Calculator', icon: '💧', category: 'Chemistry', description: 'Calculate solubility',
        fields: [{ id: 'mass', label: 'Mass Dissolved (g)', type: 'number', placeholder: '36' }, { id: 'volume', label: 'Solvent Volume (L)', type: 'number', placeholder: '0.1' }],
        calculate: (v) => { const mass = parseFloat(v.mass), vol = parseFloat(v.volume); const sol = mass / vol; return { result: sol.toFixed(2) + ' g/L', details: `Solubility = ${mass}g / ${vol}L = ${sol.toFixed(2)} g/L` }; }
    },
    {
        id: 'ionic-strength', name: 'Ionic Strength Calculator', icon: '⚡', category: 'Chemistry', description: 'Calculate ionic strength',
        fields: [{ id: 'c1', label: 'Ion 1 Conc (M)', type: 'number', placeholder: '0.1' }, { id: 'z1', label: 'Ion 1 Charge', type: 'number', placeholder: '2' }, { id: 'c2', label: 'Ion 2 Conc (M)', type: 'number', placeholder: '0.2' }, { id: 'z2', label: 'Ion 2 Charge', type: 'number', placeholder: '1' }],
        calculate: (v) => { const c1 = parseFloat(v.c1), z1 = parseFloat(v.z1), c2 = parseFloat(v.c2), z2 = parseFloat(v.z2); const I = 0.5 * (c1 * z1 * z1 + c2 * z2 * z2); return { result: 'I = ' + I.toFixed(4) + ' M', details: `I = ½Σcizi² = ${I.toFixed(4)} M` }; }
    },
    {
        id: 'titration', name: 'Titration Calculator', icon: '🧪', category: 'Chemistry', description: 'Calculate unknown concentration',
        fields: [{ id: 'ca', label: 'Acid Conc (M)', type: 'number', placeholder: '0.1' }, { id: 'va', label: 'Acid Vol (mL)', type: 'number', placeholder: '25' }, { id: 'vb', label: 'Base Vol (mL)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const ca = parseFloat(v.ca), va = parseFloat(v.va), vb = parseFloat(v.vb); const cb = (ca * va) / vb; return { result: cb.toFixed(4) + ' M', details: `[Base] = CₐVₐ/Vᵦ = (${ca} × ${va})/${vb} = ${cb.toFixed(4)} M` }; }
    },
    {
        id: 'equilibrium-constant', name: 'Equilibrium Constant', icon: '⚖️', category: 'Chemistry', description: 'Calculate Keq',
        fields: [{ id: 'products', label: '[Products]', type: 'number', placeholder: '0.5' }, { id: 'reactants', label: '[Reactants]', type: 'number', placeholder: '0.1' }],
        calculate: (v) => { const prod = parseFloat(v.products), react = parseFloat(v.reactants); const K = prod / react; return { result: 'K = ' + K.toFixed(4), details: `K = [Products]/[Reactants] = ${prod}/${react} = ${K.toFixed(4)}` }; }
    },
    {
        id: 'activation-energy', name: 'Activation Energy Calculator', icon: '📈', category: 'Chemistry', description: 'Arrhenius equation',
        fields: [{ id: 'k1', label: 'k₁ (rate constant)', type: 'number', placeholder: '0.01' }, { id: 'k2', label: 'k₂ (rate constant)', type: 'number', placeholder: '0.1' }, { id: 't1', label: 'T₁ (K)', type: 'number', placeholder: '300' }, { id: 't2', label: 'T₂ (K)', type: 'number', placeholder: '350' }],
        calculate: (v) => { const k1 = parseFloat(v.k1), k2 = parseFloat(v.k2), T1 = parseFloat(v.t1), T2 = parseFloat(v.t2); const R = 8.314; const Ea = R * Math.log(k2 / k1) / (1 / T1 - 1 / T2); return { result: (Ea / 1000).toFixed(2) + ' kJ/mol', details: `Ea = ${(Ea / 1000).toFixed(2)} kJ/mol` }; }
    },
    {
        id: 'arrhenius', name: 'Arrhenius Equation Calculator', icon: '🌡️', category: 'Chemistry', description: 'Rate constant from Ea',
        fields: [{ id: 'A', label: 'Pre-exponential (A)', type: 'number', placeholder: '1e10' }, { id: 'Ea', label: 'Ea (kJ/mol)', type: 'number', placeholder: '50' }, { id: 'T', label: 'Temperature (K)', type: 'number', placeholder: '300' }],
        calculate: (v) => { const A = parseFloat(v.A), Ea = parseFloat(v.Ea) * 1000, T = parseFloat(v.T); const R = 8.314; const k = A * Math.exp(-Ea / (R * T)); return { result: 'k = ' + k.toExponential(4), details: `k = Ae^(-Ea/RT) = ${k.toExponential(4)}` }; }
    },
    {
        id: 'solution-concentration', name: 'Solution Concentration', icon: '🧪', category: 'Chemistry', description: 'Mass/volume concentration',
        fields: [{ id: 'mass', label: 'Solute Mass (g)', type: 'number', placeholder: '10' }, { id: 'volume', label: 'Solution Volume (mL)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const mass = parseFloat(v.mass), vol = parseFloat(v.volume); const conc = (mass / vol) * 100; const gL = (mass / vol) * 1000; return { result: conc.toFixed(2) + '% w/v', details: `${conc.toFixed(2)}% w/v<br>${gL.toFixed(2)} g/L` }; }
    },
    {
        id: 'electrolysis', name: 'Electrolysis Calculator', icon: '⚡', category: 'Chemistry', description: 'Faraday\'s law',
        fields: [{ id: 'current', label: 'Current (A)', type: 'number', placeholder: '5' }, { id: 'time', label: 'Time (s)', type: 'number', placeholder: '3600' }, { id: 'molarMass', label: 'Molar Mass (g/mol)', type: 'number', placeholder: '64' }, { id: 'n', label: 'Electrons transferred', type: 'number', placeholder: '2' }],
        calculate: (v) => { const I = parseFloat(v.current), t = parseFloat(v.time), M = parseFloat(v.molarMass), n = parseFloat(v.n); const F = 96485; const mass = (I * t * M) / (n * F); return { result: mass.toFixed(4) + ' g', details: `m = ItM/nF = ${mass.toFixed(4)} g deposited` }; }
    },
    {
        id: 'redox-potential', name: 'Redox Potential Calculator', icon: '🔋', category: 'Chemistry', description: 'Calculate cell potential',
        fields: [{ id: 'cathode', label: 'E° Cathode (V)', type: 'number', placeholder: '0.80' }, { id: 'anode', label: 'E° Anode (V)', type: 'number', placeholder: '-0.76' }],
        calculate: (v) => { const Ec = parseFloat(v.cathode), Ea = parseFloat(v.anode); const Ecell = Ec - Ea; return { result: 'E°cell = ' + Ecell.toFixed(2) + ' V', details: `E°cell = E°cathode - E°anode<br>= ${Ec} - ${Ea} = ${Ecell.toFixed(2)} V` }; }
    }
];
if (typeof window !== 'undefined') window.chemistryCalculators = chemistryCalculators;
