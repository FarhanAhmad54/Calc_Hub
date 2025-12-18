// Science & Physics Calculators (30)
const scienceCalculators = [
    {
        id: 'speed-physics', name: 'Speed Calculator', icon: '🚀', category: 'Science & Physics', description: 'Calculate speed from distance and time',
        fields: [{ id: 'distance', label: 'Distance (m)', type: 'number', placeholder: '100' }, { id: 'time', label: 'Time (s)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const d = parseFloat(v.distance), t = parseFloat(v.time); const speed = d / t; return { result: speed.toFixed(2) + ' m/s', details: `Speed = Distance / Time<br>= ${d} / ${t} = ${speed.toFixed(2)} m/s` }; }
    },
    {
        id: 'velocity', name: 'Velocity Calculator', icon: '➡️', category: 'Science & Physics', description: 'Calculate velocity with direction',
        fields: [{ id: 'displacement', label: 'Displacement (m)', type: 'number', placeholder: '100' }, { id: 'time', label: 'Time (s)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const d = parseFloat(v.displacement), t = parseFloat(v.time); const vel = d / t; return { result: vel.toFixed(2) + ' m/s', details: `Velocity = Displacement / Time = ${vel.toFixed(2)} m/s` }; }
    },
    {
        id: 'acceleration', name: 'Acceleration Calculator', icon: '📈', category: 'Science & Physics', description: 'Calculate acceleration',
        fields: [{ id: 'v1', label: 'Initial Velocity (m/s)', type: 'number', placeholder: '0' }, { id: 'v2', label: 'Final Velocity (m/s)', type: 'number', placeholder: '20' }, { id: 'time', label: 'Time (s)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const v1 = parseFloat(v.v1), v2 = parseFloat(v.v2), t = parseFloat(v.time); const a = (v2 - v1) / t; return { result: a.toFixed(2) + ' m/s²', details: `a = (v₂ - v₁) / t = (${v2} - ${v1}) / ${t} = ${a.toFixed(2)} m/s²` }; }
    },
    {
        id: 'force', name: 'Force Calculator (F=ma)', icon: '💪', category: 'Science & Physics', description: 'Calculate force using Newton\'s 2nd law',
        fields: [{ id: 'mass', label: 'Mass (kg)', type: 'number', placeholder: '10' }, { id: 'acceleration', label: 'Acceleration (m/s²)', type: 'number', placeholder: '9.8' }],
        calculate: (v) => { const m = parseFloat(v.mass), a = parseFloat(v.acceleration); const F = m * a; return { result: F.toFixed(2) + ' N', details: `F = m × a = ${m} × ${a} = ${F.toFixed(2)} N` }; }
    },
    {
        id: 'work-physics', name: 'Work Calculator', icon: '⚙️', category: 'Science & Physics', description: 'Calculate work done',
        fields: [{ id: 'force', label: 'Force (N)', type: 'number', placeholder: '50' }, { id: 'distance', label: 'Distance (m)', type: 'number', placeholder: '10' }, { id: 'angle', label: 'Angle (degrees)', type: 'number', placeholder: '0' }],
        calculate: (v) => { const F = parseFloat(v.force), d = parseFloat(v.distance), angle = parseFloat(v.angle) * Math.PI / 180; const W = F * d * Math.cos(angle); return { result: W.toFixed(2) + ' J', details: `W = F × d × cos(θ) = ${W.toFixed(2)} Joules` }; }
    },
    {
        id: 'power-physics', name: 'Power Calculator (Physics)', icon: '⚡', category: 'Science & Physics', description: 'Calculate power',
        fields: [{ id: 'work', label: 'Work (J)', type: 'number', placeholder: '1000' }, { id: 'time', label: 'Time (s)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const W = parseFloat(v.work), t = parseFloat(v.time); const P = W / t; return { result: P.toFixed(2) + ' W', details: `P = W / t = ${W} / ${t} = ${P.toFixed(2)} Watts` }; }
    },
    {
        id: 'kinetic-energy', name: 'Kinetic Energy Calculator', icon: '🏃', category: 'Science & Physics', description: 'Calculate kinetic energy',
        fields: [{ id: 'mass', label: 'Mass (kg)', type: 'number', placeholder: '10' }, { id: 'velocity', label: 'Velocity (m/s)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const m = parseFloat(v.mass), vel = parseFloat(v.velocity); const KE = 0.5 * m * vel * vel; return { result: KE.toFixed(2) + ' J', details: `KE = ½mv² = ½ × ${m} × ${vel}² = ${KE.toFixed(2)} J` }; }
    },
    {
        id: 'potential-energy', name: 'Potential Energy Calculator', icon: '🏔️', category: 'Science & Physics', description: 'Calculate gravitational PE',
        fields: [{ id: 'mass', label: 'Mass (kg)', type: 'number', placeholder: '10' }, { id: 'height', label: 'Height (m)', type: 'number', placeholder: '5' }, { id: 'g', label: 'g (m/s²)', type: 'number', placeholder: '9.8' }],
        calculate: (v) => { const m = parseFloat(v.mass), h = parseFloat(v.height), g = parseFloat(v.g); const PE = m * g * h; return { result: PE.toFixed(2) + ' J', details: `PE = mgh = ${m} × ${g} × ${h} = ${PE.toFixed(2)} J` }; }
    },
    {
        id: 'momentum', name: 'Momentum Calculator', icon: '🎱', category: 'Science & Physics', description: 'Calculate linear momentum',
        fields: [{ id: 'mass', label: 'Mass (kg)', type: 'number', placeholder: '10' }, { id: 'velocity', label: 'Velocity (m/s)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const m = parseFloat(v.mass), vel = parseFloat(v.velocity); const p = m * vel; return { result: p.toFixed(2) + ' kg·m/s', details: `p = mv = ${m} × ${vel} = ${p.toFixed(2)} kg·m/s` }; }
    },
    {
        id: 'impulse', name: 'Impulse Calculator', icon: '💥', category: 'Science & Physics', description: 'Calculate impulse',
        fields: [{ id: 'force', label: 'Force (N)', type: 'number', placeholder: '100' }, { id: 'time', label: 'Time (s)', type: 'number', placeholder: '0.5' }],
        calculate: (v) => { const F = parseFloat(v.force), t = parseFloat(v.time); const J = F * t; return { result: J.toFixed(2) + ' N·s', details: `J = F × t = ${F} × ${t} = ${J.toFixed(2)} N·s` }; }
    },
    {
        id: 'pressure', name: 'Pressure Calculator', icon: '🔽', category: 'Science & Physics', description: 'Calculate pressure',
        fields: [{ id: 'force', label: 'Force (N)', type: 'number', placeholder: '100' }, { id: 'area', label: 'Area (m²)', type: 'number', placeholder: '0.5' }],
        calculate: (v) => { const F = parseFloat(v.force), A = parseFloat(v.area); const P = F / A; return { result: P.toFixed(2) + ' Pa', details: `P = F / A = ${F} / ${A} = ${P.toFixed(2)} Pascal` }; }
    },
    {
        id: 'density', name: 'Density Calculator', icon: '🧊', category: 'Science & Physics', description: 'Calculate density',
        fields: [{ id: 'mass', label: 'Mass (kg)', type: 'number', placeholder: '10' }, { id: 'volume', label: 'Volume (m³)', type: 'number', placeholder: '0.01' }],
        calculate: (v) => { const m = parseFloat(v.mass), V = parseFloat(v.volume); const rho = m / V; return { result: rho.toFixed(2) + ' kg/m³', details: `ρ = m / V = ${m} / ${V} = ${rho.toFixed(2)} kg/m³` }; }
    },
    {
        id: 'specific-heat', name: 'Specific Heat Calculator', icon: '🌡️', category: 'Science & Physics', description: 'Calculate heat energy',
        fields: [{ id: 'mass', label: 'Mass (kg)', type: 'number', placeholder: '1' }, { id: 'c', label: 'Specific Heat (J/kg·K)', type: 'number', placeholder: '4186' }, { id: 'deltaT', label: 'Temp Change (K)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const m = parseFloat(v.mass), c = parseFloat(v.c), dT = parseFloat(v.deltaT); const Q = m * c * dT; return { result: (Q / 1000).toFixed(2) + ' kJ', details: `Q = mcΔT = ${m} × ${c} × ${dT} = ${Q.toFixed(0)} J` }; }
    },
    {
        id: 'heat-transfer', name: 'Heat Transfer Calculator', icon: '🔥', category: 'Science & Physics', description: 'Calculate heat conduction',
        fields: [{ id: 'k', label: 'Conductivity (W/m·K)', type: 'number', placeholder: '0.6' }, { id: 'area', label: 'Area (m²)', type: 'number', placeholder: '1' }, { id: 'deltaT', label: 'Temp Difference (K)', type: 'number', placeholder: '20' }, { id: 'thickness', label: 'Thickness (m)', type: 'number', placeholder: '0.1' }],
        calculate: (v) => { const k = parseFloat(v.k), A = parseFloat(v.area), dT = parseFloat(v.deltaT), L = parseFloat(v.thickness); const Q = k * A * dT / L; return { result: Q.toFixed(2) + ' W', details: `Q = kAΔT/L = ${Q.toFixed(2)} Watts` }; }
    },
    {
        id: 'thermal-expansion', name: 'Thermal Expansion Calculator', icon: '📏', category: 'Science & Physics', description: 'Calculate linear expansion',
        fields: [{ id: 'L0', label: 'Original Length (m)', type: 'number', placeholder: '1' }, { id: 'alpha', label: 'Coefficient (1/K)', type: 'number', placeholder: '0.000012' }, { id: 'deltaT', label: 'Temp Change (K)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const L0 = parseFloat(v.L0), a = parseFloat(v.alpha), dT = parseFloat(v.deltaT); const dL = L0 * a * dT; const L = L0 + dL; return { result: 'ΔL = ' + (dL * 1000).toFixed(4) + ' mm', details: `Expansion: ${(dL * 1000).toFixed(4)} mm<br>New Length: ${L.toFixed(6)} m` }; }
    },
    {
        id: 'ohms-law', name: 'Ohm\'s Law Calculator', icon: '⚡', category: 'Science & Physics', description: 'V = IR calculation',
        fields: [{ id: 'calc', label: 'Calculate', type: 'select', options: ['Voltage (V)', 'Current (I)', 'Resistance (R)'] }, { id: 'val1', label: 'Value 1', type: 'number', placeholder: '10' }, { id: 'val2', label: 'Value 2', type: 'number', placeholder: '5' }],
        calculate: (v) => { const v1 = parseFloat(v.val1), v2 = parseFloat(v.val2); let result; if (v.calc === 'Voltage (V)') { result = v1 * v2; return { result: result.toFixed(2) + ' V', details: `V = I × R = ${v1} × ${v2} = ${result.toFixed(2)} V` }; } else if (v.calc === 'Current (I)') { result = v1 / v2; return { result: result.toFixed(2) + ' A', details: `I = V / R = ${v1} / ${v2} = ${result.toFixed(2)} A` }; } else { result = v1 / v2; return { result: result.toFixed(2) + ' Ω', details: `R = V / I = ${v1} / ${v2} = ${result.toFixed(2)} Ω` }; } }
    },
    {
        id: 'electrical-power', name: 'Electrical Power Calculator', icon: '💡', category: 'Science & Physics', description: 'Calculate electrical power',
        fields: [{ id: 'voltage', label: 'Voltage (V)', type: 'number', placeholder: '220' }, { id: 'current', label: 'Current (A)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const V = parseFloat(v.voltage), I = parseFloat(v.current); const P = V * I; return { result: P.toFixed(2) + ' W', details: `P = V × I = ${V} × ${I} = ${P.toFixed(2)} W` }; }
    },
    {
        id: 'resistance', name: 'Electrical Resistance Calculator', icon: '🔌', category: 'Science & Physics', description: 'Calculate resistance',
        fields: [{ id: 'rho', label: 'Resistivity (Ω·m)', type: 'number', placeholder: '0.0000000168' }, { id: 'length', label: 'Length (m)', type: 'number', placeholder: '100' }, { id: 'area', label: 'Cross-section (mm²)', type: 'number', placeholder: '2.5' }],
        calculate: (v) => { const rho = parseFloat(v.rho), L = parseFloat(v.length), A = parseFloat(v.area) / 1000000; const R = rho * L / A; return { result: R.toFixed(4) + ' Ω', details: `R = ρL/A = ${R.toFixed(4)} Ohms` }; }
    },
    {
        id: 'capacitance', name: 'Capacitance Calculator', icon: '🔋', category: 'Science & Physics', description: 'Calculate capacitor charge',
        fields: [{ id: 'capacitance', label: 'Capacitance (μF)', type: 'number', placeholder: '100' }, { id: 'voltage', label: 'Voltage (V)', type: 'number', placeholder: '12' }],
        calculate: (v) => { const C = parseFloat(v.capacitance) / 1000000, V = parseFloat(v.voltage); const Q = C * V; const E = 0.5 * C * V * V; return { result: (Q * 1000).toFixed(4) + ' mC', details: `Charge: ${(Q * 1000).toFixed(4)} mC<br>Energy: ${(E * 1000).toFixed(4)} mJ` }; }
    },
    {
        id: 'inductance', name: 'Inductance Calculator', icon: '🧲', category: 'Science & Physics', description: 'Calculate inductive reactance',
        fields: [{ id: 'inductance', label: 'Inductance (mH)', type: 'number', placeholder: '10' }, { id: 'frequency', label: 'Frequency (Hz)', type: 'number', placeholder: '50' }],
        calculate: (v) => { const L = parseFloat(v.inductance) / 1000, f = parseFloat(v.frequency); const XL = 2 * Math.PI * f * L; return { result: XL.toFixed(2) + ' Ω', details: `XL = 2πfL = ${XL.toFixed(2)} Ω` }; }
    },
    {
        id: 'wave-speed', name: 'Wave Speed Calculator', icon: '🌊', category: 'Science & Physics', description: 'Calculate wave velocity',
        fields: [{ id: 'frequency', label: 'Frequency (Hz)', type: 'number', placeholder: '440' }, { id: 'wavelength', label: 'Wavelength (m)', type: 'number', placeholder: '0.78' }],
        calculate: (v) => { const f = parseFloat(v.frequency), lambda = parseFloat(v.wavelength); const speed = f * lambda; return { result: speed.toFixed(2) + ' m/s', details: `v = fλ = ${f} × ${lambda} = ${speed.toFixed(2)} m/s` }; }
    },
    {
        id: 'frequency', name: 'Frequency Calculator', icon: '📊', category: 'Science & Physics', description: 'Calculate frequency from period',
        fields: [{ id: 'period', label: 'Period (s)', type: 'number', placeholder: '0.02' }],
        calculate: (v) => { const T = parseFloat(v.period); const f = 1 / T; return { result: f.toFixed(2) + ' Hz', details: `f = 1/T = 1/${T} = ${f.toFixed(2)} Hz` }; }
    },
    {
        id: 'wavelength', name: 'Wavelength Calculator', icon: '〰️', category: 'Science & Physics', description: 'Calculate wavelength',
        fields: [{ id: 'speed', label: 'Wave Speed (m/s)', type: 'number', placeholder: '343' }, { id: 'frequency', label: 'Frequency (Hz)', type: 'number', placeholder: '440' }],
        calculate: (v) => { const c = parseFloat(v.speed), f = parseFloat(v.frequency); const lambda = c / f; return { result: lambda.toFixed(4) + ' m', details: `λ = v/f = ${c}/${f} = ${lambda.toFixed(4)} m` }; }
    },
    {
        id: 'refractive-index', name: 'Refractive Index Calculator', icon: '🔍', category: 'Science & Physics', description: 'Calculate refractive index',
        fields: [{ id: 'c', label: 'Speed in Vacuum (m/s)', type: 'number', placeholder: '299792458' }, { id: 'v', label: 'Speed in Medium (m/s)', type: 'number', placeholder: '200000000' }],
        calculate: (v) => { const c = parseFloat(v.c), vel = parseFloat(v.v); const n = c / vel; return { result: 'n = ' + n.toFixed(4), details: `n = c/v = ${c}/${vel} = ${n.toFixed(4)}` }; }
    },
    {
        id: 'lens-formula', name: 'Lens Formula Calculator', icon: '🔎', category: 'Science & Physics', description: '1/f = 1/v - 1/u',
        fields: [{ id: 'u', label: 'Object Distance (cm)', type: 'number', placeholder: '-30' }, { id: 'f', label: 'Focal Length (cm)', type: 'number', placeholder: '15' }],
        calculate: (v) => { const u = parseFloat(v.u), f = parseFloat(v.f); const vDist = 1 / (1 / f - 1 / u); const m = -vDist / u; return { result: 'v = ' + vDist.toFixed(2) + ' cm', details: `Image distance: ${vDist.toFixed(2)} cm<br>Magnification: ${m.toFixed(2)}` }; }
    },
    {
        id: 'mirror-formula', name: 'Mirror Formula Calculator', icon: '🪞', category: 'Science & Physics', description: '1/f = 1/v + 1/u',
        fields: [{ id: 'u', label: 'Object Distance (cm)', type: 'number', placeholder: '-20' }, { id: 'f', label: 'Focal Length (cm)', type: 'number', placeholder: '-10' }],
        calculate: (v) => { const u = parseFloat(v.u), f = parseFloat(v.f); const vDist = 1 / (1 / f - 1 / u); const m = -vDist / u; return { result: 'v = ' + vDist.toFixed(2) + ' cm', details: `Image distance: ${vDist.toFixed(2)} cm<br>Magnification: ${m.toFixed(2)}` }; }
    },
    {
        id: 'sound-intensity', name: 'Sound Intensity Calculator', icon: '🔊', category: 'Science & Physics', description: 'Calculate sound intensity',
        fields: [{ id: 'power', label: 'Power (W)', type: 'number', placeholder: '0.1' }, { id: 'area', label: 'Area (m²)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const P = parseFloat(v.power), A = parseFloat(v.area); const I = P / A; const dB = 10 * Math.log10(I / 1e-12); return { result: dB.toFixed(1) + ' dB', details: `Intensity: ${I.toFixed(6)} W/m²<br>Level: ${dB.toFixed(1)} dB` }; }
    },
    {
        id: 'decibel', name: 'Decibel Calculator', icon: '📢', category: 'Science & Physics', description: 'Convert intensity to decibels',
        fields: [{ id: 'intensity', label: 'Intensity (W/m²)', type: 'number', placeholder: '0.001' }],
        calculate: (v) => { const I = parseFloat(v.intensity); const I0 = 1e-12; const dB = 10 * Math.log10(I / I0); return { result: dB.toFixed(1) + ' dB', details: `dB = 10 × log₁₀(I/I₀) = ${dB.toFixed(1)} dB` }; }
    },
    {
        id: 'photon-energy', name: 'Photon Energy Calculator', icon: '💫', category: 'Science & Physics', description: 'Calculate photon energy',
        fields: [{ id: 'wavelength', label: 'Wavelength (nm)', type: 'number', placeholder: '550' }],
        calculate: (v) => { const lambda = parseFloat(v.wavelength) * 1e-9; const h = 6.626e-34, c = 3e8; const E = h * c / lambda; const eV = E / 1.602e-19; return { result: eV.toFixed(4) + ' eV', details: `E = hc/λ<br>Energy: ${E.toExponential(4)} J<br>${eV.toFixed(4)} eV` }; }
    },
    {
        id: 'radioactive-decay', name: 'Radioactive Decay Calculator', icon: '☢️', category: 'Science & Physics', description: 'Calculate remaining activity',
        fields: [{ id: 'N0', label: 'Initial Amount', type: 'number', placeholder: '1000' }, { id: 'halfLife', label: 'Half-life', type: 'number', placeholder: '5' }, { id: 'time', label: 'Time Elapsed', type: 'number', placeholder: '15' }],
        calculate: (v) => { const N0 = parseFloat(v.N0), t12 = parseFloat(v.halfLife), t = parseFloat(v.time); const N = N0 * Math.pow(0.5, t / t12); const decayed = N0 - N; return { result: N.toFixed(2) + ' remaining', details: `Initial: ${N0}<br>Remaining: ${N.toFixed(2)}<br>Decayed: ${decayed.toFixed(2)}` }; }
    }
];
if (typeof window !== 'undefined') window.scienceCalculators = scienceCalculators;
