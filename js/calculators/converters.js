// Unit & Conversion Calculators (131-155)
const converterCalculators = [
    {
        id: 'length-converter', name: 'Length Converter', icon: '📏', category: 'Unit Conversion', description: 'Convert length units',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '100' }, { id: 'from', label: 'From', type: 'select', options: ['Meters', 'Centimeters', 'Kilometers', 'Miles', 'Feet', 'Inches', 'Yards'] }, { id: 'to', label: 'To', type: 'select', options: ['Meters', 'Centimeters', 'Kilometers', 'Miles', 'Feet', 'Inches', 'Yards'] }],
        calculate: (v) => { const rates = { Meters: 1, Centimeters: 0.01, Kilometers: 1000, Miles: 1609.34, Feet: 0.3048, Inches: 0.0254, Yards: 0.9144 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(6) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(6)} ${v.to}` }; }
    },
    {
        id: 'cm-to-inch', name: 'Centimeters to Inches', icon: '📐', category: 'Unit Conversion', description: 'Convert cm to inches',
        fields: [{ id: 'cm', label: 'Centimeters', type: 'number', placeholder: '10' }],
        calculate: (v) => { const cm = parseFloat(v.cm); const inch = cm / 2.54; return { result: inch.toFixed(4) + ' inches', details: `${cm} cm = ${inch.toFixed(4)} inches` }; }
    },
    {
        id: 'inch-to-cm', name: 'Inches to Centimeters', icon: '📐', category: 'Unit Conversion', description: 'Convert inches to cm',
        fields: [{ id: 'inch', label: 'Inches', type: 'number', placeholder: '5' }],
        calculate: (v) => { const inch = parseFloat(v.inch); const cm = inch * 2.54; return { result: cm.toFixed(4) + ' cm', details: `${inch} inches = ${cm.toFixed(4)} cm` }; }
    },
    {
        id: 'meter-to-feet', name: 'Meters to Feet', icon: '📏', category: 'Unit Conversion', description: 'Convert meters to feet',
        fields: [{ id: 'meter', label: 'Meters', type: 'number', placeholder: '10' }],
        calculate: (v) => { const m = parseFloat(v.meter); const ft = m * 3.28084; return { result: ft.toFixed(4) + ' feet', details: `${m} meters = ${ft.toFixed(4)} feet` }; }
    },
    {
        id: 'km-to-miles', name: 'Kilometers to Miles', icon: '🛣️', category: 'Unit Conversion', description: 'Convert km to miles',
        fields: [{ id: 'km', label: 'Kilometers', type: 'number', placeholder: '100' }],
        calculate: (v) => { const km = parseFloat(v.km); const mi = km * 0.621371; return { result: mi.toFixed(4) + ' miles', details: `${km} km = ${mi.toFixed(4)} miles` }; }
    },
    {
        id: 'miles-to-km', name: 'Miles to Kilometers', icon: '🛣️', category: 'Unit Conversion', description: 'Convert miles to km',
        fields: [{ id: 'miles', label: 'Miles', type: 'number', placeholder: '60' }],
        calculate: (v) => { const mi = parseFloat(v.miles); const km = mi * 1.60934; return { result: km.toFixed(4) + ' km', details: `${mi} miles = ${km.toFixed(4)} km` }; }
    },
    {
        id: 'weight-converter', name: 'Weight Converter', icon: '⚖️', category: 'Unit Conversion', description: 'Convert weight units',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '100' }, { id: 'from', label: 'From', type: 'select', options: ['Kilograms', 'Grams', 'Pounds', 'Ounces', 'Milligrams'] }, { id: 'to', label: 'To', type: 'select', options: ['Kilograms', 'Grams', 'Pounds', 'Ounces', 'Milligrams'] }],
        calculate: (v) => { const rates = { Kilograms: 1, Grams: 0.001, Pounds: 0.453592, Ounces: 0.0283495, Milligrams: 0.000001 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(6) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(6)} ${v.to}` }; }
    },
    {
        id: 'kg-to-pound', name: 'Kilograms to Pounds', icon: '⚖️', category: 'Unit Conversion', description: 'Convert kg to pounds',
        fields: [{ id: 'kg', label: 'Kilograms', type: 'number', placeholder: '70' }],
        calculate: (v) => { const kg = parseFloat(v.kg); const lb = kg * 2.20462; return { result: lb.toFixed(4) + ' lbs', details: `${kg} kg = ${lb.toFixed(4)} pounds` }; }
    },
    {
        id: 'pound-to-kg', name: 'Pounds to Kilograms', icon: '⚖️', category: 'Unit Conversion', description: 'Convert pounds to kg',
        fields: [{ id: 'lb', label: 'Pounds', type: 'number', placeholder: '150' }],
        calculate: (v) => { const lb = parseFloat(v.lb); const kg = lb * 0.453592; return { result: kg.toFixed(4) + ' kg', details: `${lb} pounds = ${kg.toFixed(4)} kg` }; }
    },
    {
        id: 'temp-converter', name: 'Temperature Converter', icon: '🌡️', category: 'Unit Conversion', description: 'Convert temperature',
        fields: [{ id: 'value', label: 'Temperature', type: 'number', placeholder: '100' }, { id: 'from', label: 'From', type: 'select', options: ['Celsius', 'Fahrenheit', 'Kelvin'] }, { id: 'to', label: 'To', type: 'select', options: ['Celsius', 'Fahrenheit', 'Kelvin'] }],
        calculate: (v) => { const val = parseFloat(v.value); let celsius; if (v.from === 'Celsius') celsius = val; else if (v.from === 'Fahrenheit') celsius = (val - 32) * 5 / 9; else celsius = val - 273.15; let result; if (v.to === 'Celsius') result = celsius; else if (v.to === 'Fahrenheit') result = celsius * 9 / 5 + 32; else result = celsius + 273.15; return { result: result.toFixed(2) + '°' + v.to[0], details: `${val}° ${v.from} = ${result.toFixed(2)}° ${v.to}` }; }
    },
    {
        id: 'celsius-to-fahrenheit', name: 'Celsius to Fahrenheit', icon: '🌡️', category: 'Unit Conversion', description: 'Convert °C to °F',
        fields: [{ id: 'c', label: 'Celsius', type: 'number', placeholder: '100' }],
        calculate: (v) => { const c = parseFloat(v.c); const f = c * 9 / 5 + 32; return { result: f.toFixed(2) + '°F', details: `${c}°C = ${f.toFixed(2)}°F<br>Formula: (°C × 9/5) + 32` }; }
    },
    {
        id: 'fahrenheit-to-celsius', name: 'Fahrenheit to Celsius', icon: '🌡️', category: 'Unit Conversion', description: 'Convert °F to °C',
        fields: [{ id: 'f', label: 'Fahrenheit', type: 'number', placeholder: '212' }],
        calculate: (v) => { const f = parseFloat(v.f); const c = (f - 32) * 5 / 9; return { result: c.toFixed(2) + '°C', details: `${f}°F = ${c.toFixed(2)}°C<br>Formula: (°F - 32) × 5/9` }; }
    },
    {
        id: 'area-converter', name: 'Area Unit Converter', icon: '📐', category: 'Unit Conversion', description: 'Convert area units',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '100' }, { id: 'from', label: 'From', type: 'select', options: ['Sq Meters', 'Sq Feet', 'Sq Yards', 'Acres', 'Hectares'] }, { id: 'to', label: 'To', type: 'select', options: ['Sq Meters', 'Sq Feet', 'Sq Yards', 'Acres', 'Hectares'] }],
        calculate: (v) => { const rates = { 'Sq Meters': 1, 'Sq Feet': 0.092903, 'Sq Yards': 0.836127, 'Acres': 4046.86, 'Hectares': 10000 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(6) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(6)} ${v.to}` }; }
    },
    {
        id: 'volume-converter', name: 'Volume Unit Converter', icon: '🧊', category: 'Unit Conversion', description: 'Convert volume units',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '100' }, { id: 'from', label: 'From', type: 'select', options: ['Liters', 'Milliliters', 'Gallons', 'Cubic Meters', 'Cubic Feet'] }, { id: 'to', label: 'To', type: 'select', options: ['Liters', 'Milliliters', 'Gallons', 'Cubic Meters', 'Cubic Feet'] }],
        calculate: (v) => { const rates = { Liters: 1, Milliliters: 0.001, Gallons: 3.78541, 'Cubic Meters': 1000, 'Cubic Feet': 28.3168 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(6) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(6)} ${v.to}` }; }
    },
    {
        id: 'speed-converter', name: 'Speed Unit Converter', icon: '🚀', category: 'Unit Conversion', description: 'Convert speed units',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '100' }, { id: 'from', label: 'From', type: 'select', options: ['km/h', 'm/s', 'mph', 'knots'] }, { id: 'to', label: 'To', type: 'select', options: ['km/h', 'm/s', 'mph', 'knots'] }],
        calculate: (v) => { const rates = { 'km/h': 1, 'm/s': 3.6, 'mph': 1.60934, 'knots': 1.852 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(4) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(4)} ${v.to}` }; }
    },
    {
        id: 'time-converter', name: 'Time Unit Converter', icon: '⏰', category: 'Unit Conversion', description: 'Convert time units',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '60' }, { id: 'from', label: 'From', type: 'select', options: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks'] }, { id: 'to', label: 'To', type: 'select', options: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks'] }],
        calculate: (v) => { const rates = { Seconds: 1, Minutes: 60, Hours: 3600, Days: 86400, Weeks: 604800 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(4) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(4)} ${v.to}` }; }
    },
    {
        id: 'byte-converter', name: 'Byte to KB/MB/GB', icon: '💾', category: 'Unit Conversion', description: 'Convert data sizes',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '1024' }, { id: 'from', label: 'From', type: 'select', options: ['Bytes', 'KB', 'MB', 'GB', 'TB'] }, { id: 'to', label: 'To', type: 'select', options: ['Bytes', 'KB', 'MB', 'GB', 'TB'] }],
        calculate: (v) => { const rates = { Bytes: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(4) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(4)} ${v.to}` }; }
    },
    {
        id: 'mb-to-gb', name: 'MB to GB', icon: '💾', category: 'Unit Conversion', description: 'Convert MB to GB',
        fields: [{ id: 'mb', label: 'Megabytes', type: 'number', placeholder: '1024' }],
        calculate: (v) => { const mb = parseFloat(v.mb); const gb = mb / 1024; return { result: gb.toFixed(4) + ' GB', details: `${mb} MB = ${gb.toFixed(4)} GB` }; }
    },
    {
        id: 'data-speed', name: 'Data Speed Converter', icon: '📶', category: 'Unit Conversion', description: 'Convert data speeds',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '100' }, { id: 'from', label: 'From', type: 'select', options: ['bps', 'Kbps', 'Mbps', 'Gbps'] }, { id: 'to', label: 'To', type: 'select', options: ['bps', 'Kbps', 'Mbps', 'Gbps'] }],
        calculate: (v) => { const rates = { bps: 1, Kbps: 1000, Mbps: 1000000, Gbps: 1000000000 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(4) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(4)} ${v.to}` }; }
    },
    {
        id: 'degree-to-radian', name: 'Degrees to Radians', icon: '🔄', category: 'Unit Conversion', description: 'Convert degrees to radians',
        fields: [{ id: 'deg', label: 'Degrees', type: 'number', placeholder: '180' }],
        calculate: (v) => { const deg = parseFloat(v.deg); const rad = deg * (Math.PI / 180); return { result: rad.toFixed(6) + ' rad', details: `${deg}° = ${rad.toFixed(6)} radians` }; }
    },
    {
        id: 'radian-to-degree', name: 'Radians to Degrees', icon: '🔄', category: 'Unit Conversion', description: 'Convert radians to degrees',
        fields: [{ id: 'rad', label: 'Radians', type: 'number', placeholder: '3.14159' }],
        calculate: (v) => { const rad = parseFloat(v.rad); const deg = rad * (180 / Math.PI); return { result: deg.toFixed(4) + '°', details: `${rad} rad = ${deg.toFixed(4)}°` }; }
    },
    {
        id: 'pressure-converter', name: 'Pressure Unit Converter', icon: '🌡️', category: 'Unit Conversion', description: 'Convert pressure units',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '1' }, { id: 'from', label: 'From', type: 'select', options: ['Pascal', 'Bar', 'PSI', 'atm'] }, { id: 'to', label: 'To', type: 'select', options: ['Pascal', 'Bar', 'PSI', 'atm'] }],
        calculate: (v) => { const rates = { Pascal: 1, Bar: 100000, PSI: 6894.76, atm: 101325 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(6) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(6)} ${v.to}` }; }
    },
    {
        id: 'energy-converter', name: 'Energy Unit Converter', icon: '⚡', category: 'Unit Conversion', description: 'Convert energy units',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '1000' }, { id: 'from', label: 'From', type: 'select', options: ['Joules', 'Kilojoules', 'Calories', 'Kilocalories', 'Watt-hours'] }, { id: 'to', label: 'To', type: 'select', options: ['Joules', 'Kilojoules', 'Calories', 'Kilocalories', 'Watt-hours'] }],
        calculate: (v) => { const rates = { Joules: 1, Kilojoules: 1000, Calories: 4.184, Kilocalories: 4184, 'Watt-hours': 3600 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(4) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(4)} ${v.to}` }; }
    },
    {
        id: 'power-converter', name: 'Power Unit Converter', icon: '💡', category: 'Unit Conversion', description: 'Convert power units',
        fields: [{ id: 'value', label: 'Value', type: 'number', placeholder: '1000' }, { id: 'from', label: 'From', type: 'select', options: ['Watts', 'Kilowatts', 'Horsepower', 'BTU/hr'] }, { id: 'to', label: 'To', type: 'select', options: ['Watts', 'Kilowatts', 'Horsepower', 'BTU/hr'] }],
        calculate: (v) => { const rates = { Watts: 1, Kilowatts: 1000, Horsepower: 745.7, 'BTU/hr': 0.293071 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(4) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(4)} ${v.to}` }; }
    },
    {
        id: 'currency-converter', name: 'Currency Converter', icon: '💱', category: 'Unit Conversion', description: 'Convert currencies',
        fields: [{ id: 'value', label: 'Amount', type: 'number', placeholder: '1000' }, { id: 'from', label: 'From', type: 'select', options: ['INR', 'USD', 'EUR', 'GBP', 'AED', 'JPY'] }, { id: 'to', label: 'To', type: 'select', options: ['USD', 'INR', 'EUR', 'GBP', 'AED', 'JPY'] }],
        calculate: (v) => { const rates = { INR: 1, USD: 83.5, EUR: 90.5, GBP: 106, AED: 22.7, JPY: 0.56 }; const val = parseFloat(v.value); const r = (val * rates[v.from]) / rates[v.to]; return { result: r.toFixed(2) + ' ' + v.to, details: `${val} ${v.from} = ${r.toFixed(2)} ${v.to}<br>(Approximate rates)` }; }
    }
];
if (typeof window !== 'undefined') window.converterCalculators = converterCalculators;
