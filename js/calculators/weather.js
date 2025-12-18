// Weather & Environment Calculators (30)
const weatherCalculators = [
    {
        id: 'heat-index', name: 'Heat Index Calculator', icon: '🌡️', category: 'Weather & Environment', description: 'Feels like temperature',
        fields: [{ id: 'temp', label: 'Temperature (°C)', type: 'number', placeholder: '35' }, { id: 'humidity', label: 'Relative Humidity (%)', type: 'number', placeholder: '60' }],
        calculate: (v) => { const T = parseFloat(v.temp) * 9 / 5 + 32, R = parseFloat(v.humidity); const HI = -42.379 + 2.04901523 * T + 10.14333127 * R - 0.22475541 * T * R - 0.00683783 * T * T - 0.05481717 * R * R + 0.00122874 * T * T * R + 0.00085282 * T * R * R - 0.00000199 * T * T * R * R; const HIC = (HI - 32) * 5 / 9; let risk = HIC < 27 ? 'Low' : HIC < 32 ? 'Caution' : HIC < 41 ? 'Extreme Caution' : 'Danger'; return { result: HIC.toFixed(1) + '°C feels like', details: `Heat Index: ${HIC.toFixed(1)}°C<br>Risk Level: ${risk}` }; }
    },
    {
        id: 'wind-chill', name: 'Wind Chill Calculator', icon: '❄️', category: 'Weather & Environment', description: 'Feels like with wind',
        fields: [{ id: 'temp', label: 'Temperature (°C)', type: 'number', placeholder: '5' }, { id: 'wind', label: 'Wind Speed (km/h)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const T = parseFloat(v.temp), V = parseFloat(v.wind); const WC = 13.12 + 0.6215 * T - 11.37 * Math.pow(V, 0.16) + 0.3965 * T * Math.pow(V, 0.16); return { result: WC.toFixed(1) + '°C feels like', details: `Wind Chill: ${WC.toFixed(1)}°C<br>Actual: ${T}°C with ${V} km/h wind` }; }
    },
    {
        id: 'dew-point', name: 'Dew Point Calculator', icon: '💧', category: 'Weather & Environment', description: 'Calculate dew point',
        fields: [{ id: 'temp', label: 'Temperature (°C)', type: 'number', placeholder: '25' }, { id: 'humidity', label: 'Relative Humidity (%)', type: 'number', placeholder: '60' }],
        calculate: (v) => { const T = parseFloat(v.temp), RH = parseFloat(v.humidity); const a = 17.27, b = 237.7; const alpha = (a * T) / (b + T) + Math.log(RH / 100); const Td = (b * alpha) / (a - alpha); return { result: Td.toFixed(1) + '°C', details: `Dew Point: ${Td.toFixed(1)}°C<br>Comfort: ${Td < 10 ? 'Dry' : Td < 16 ? 'Comfortable' : Td < 21 ? 'Sticky' : 'Oppressive'}` }; }
    },
    {
        id: 'humidity-calc', name: 'Humidity Calculator', icon: '💨', category: 'Weather & Environment', description: 'Calculate relative humidity',
        fields: [{ id: 'temp', label: 'Temperature (°C)', type: 'number', placeholder: '25' }, { id: 'dewPoint', label: 'Dew Point (°C)', type: 'number', placeholder: '15' }],
        calculate: (v) => { const T = parseFloat(v.temp), Td = parseFloat(v.dewPoint); const a = 17.27, b = 237.7; const RH = 100 * Math.exp((a * Td) / (b + Td) - (a * T) / (b + T)); return { result: RH.toFixed(1) + '%', details: `Relative Humidity: ${RH.toFixed(1)}%` }; }
    },
    {
        id: 'rainfall-avg', name: 'Rainfall Average Calculator', icon: '🌧️', category: 'Weather & Environment', description: 'Calculate average rainfall',
        fields: [{ id: 'jan', label: 'Jan-Jun Total (mm)', type: 'number', placeholder: '300' }, { id: 'jul', label: 'Jul-Dec Total (mm)', type: 'number', placeholder: '400' }],
        calculate: (v) => { const h1 = parseFloat(v.jan), h2 = parseFloat(v.jul); const annual = h1 + h2; const monthly = annual / 12; return { result: annual + ' mm/year', details: `Annual: ${annual} mm<br>Monthly avg: ${monthly.toFixed(1)} mm` }; }
    },
    {
        id: 'snowfall-depth', name: 'Snowfall Depth Calculator', icon: '🌨️', category: 'Weather & Environment', description: 'Snow water equivalent',
        fields: [{ id: 'precipitation', label: 'Precipitation (mm)', type: 'number', placeholder: '25' }, { id: 'ratio', label: 'Snow Ratio', type: 'select', options: ['10:1 (Normal)', '15:1 (Fluffy)', '5:1 (Wet)'] }],
        calculate: (v) => { const precip = parseFloat(v.precipitation); const ratio = parseFloat(v.ratio.split(':')[0]); const depth = precip * ratio / 10; return { result: depth.toFixed(1) + ' cm snow', details: `${precip} mm water = ${depth.toFixed(1)} cm snow<br>Ratio: ${v.ratio}` }; }
    },
    {
        id: 'uv-index', name: 'UV Index Calculator', icon: '☀️', category: 'Weather & Environment', description: 'Estimate UV exposure',
        fields: [{ id: 'time', label: 'Time of Day', type: 'select', options: ['Early Morning', 'Late Morning', 'Noon', 'Afternoon', 'Evening'] }, { id: 'clouds', label: 'Cloud Cover', type: 'select', options: ['Clear', 'Partly Cloudy', 'Cloudy', 'Overcast'] }],
        calculate: (v) => { const timeFactors = { 'Early Morning': 2, 'Late Morning': 6, 'Noon': 11, 'Afternoon': 8, 'Evening': 3 }; const cloudFactors = { 'Clear': 1, 'Partly Cloudy': 0.75, 'Cloudy': 0.5, 'Overcast': 0.25 }; const uv = timeFactors[v.time] * cloudFactors[v.clouds]; let risk = uv < 3 ? 'Low' : uv < 6 ? 'Moderate' : uv < 8 ? 'High' : uv < 11 ? 'Very High' : 'Extreme'; return { result: 'UV Index: ' + uv.toFixed(0), details: `UV Index: ${uv.toFixed(0)}<br>Risk: ${risk}` }; }
    },
    {
        id: 'aqi', name: 'Air Quality Index Calculator', icon: '🌫️', category: 'Weather & Environment', description: 'Estimate AQI',
        fields: [{ id: 'pm25', label: 'PM2.5 (μg/m³)', type: 'number', placeholder: '35' }],
        calculate: (v) => { const pm = parseFloat(v.pm25); let aqi, category; if (pm <= 12) { aqi = pm * 50 / 12; category = 'Good'; } else if (pm <= 35.4) { aqi = 50 + (pm - 12) * 50 / 23.4; category = 'Moderate'; } else if (pm <= 55.4) { aqi = 100 + (pm - 35.4) * 50 / 20; category = 'Unhealthy for Sensitive'; } else if (pm <= 150.4) { aqi = 150 + (pm - 55.4) * 50 / 95; category = 'Unhealthy'; } else { aqi = 200 + (pm - 150.4); category = 'Very Unhealthy'; } return { result: 'AQI: ' + aqi.toFixed(0), details: `AQI: ${aqi.toFixed(0)}<br>Category: ${category}` }; }
    },
    {
        id: 'pollution-exposure', name: 'Pollution Exposure Calculator', icon: '😷', category: 'Weather & Environment', description: 'Daily pollution exposure',
        fields: [{ id: 'outdoor', label: 'Outdoor Hours', type: 'number', placeholder: '4' }, { id: 'aqi', label: 'AQI Level', type: 'number', placeholder: '100' }],
        calculate: (v) => { const hrs = parseFloat(v.outdoor), aqi = parseFloat(v.aqi); const exposure = hrs * aqi / 24; let risk = exposure < 25 ? 'Low' : exposure < 50 ? 'Moderate' : 'High'; return { result: 'Exposure Score: ' + exposure.toFixed(0), details: `Daily exposure: ${exposure.toFixed(0)}<br>Risk: ${risk}` }; }
    },
    {
        id: 'carbon-footprint-weather', name: 'Carbon Footprint Calculator', icon: '🌍', category: 'Weather & Environment', description: 'Monthly CO2 footprint',
        fields: [{ id: 'electricity', label: 'Electricity (kWh/month)', type: 'number', placeholder: '300' }, { id: 'gas', label: 'Gas (therms/month)', type: 'number', placeholder: '20' }, { id: 'driving', label: 'Driving (km/month)', type: 'number', placeholder: '1000' }],
        calculate: (v) => { const elec = parseFloat(v.electricity) * 0.5, gas = parseFloat(v.gas) * 5.3, drive = parseFloat(v.driving) * 0.21; const total = elec + gas + drive; return { result: total.toFixed(0) + ' kg CO₂/month', details: `Electricity: ${elec.toFixed(0)} kg<br>Gas: ${gas.toFixed(0)} kg<br>Driving: ${drive.toFixed(0)} kg<br>Total: ${total.toFixed(0)} kg` }; }
    },
    {
        id: 'co2-emission', name: 'CO₂ Emission Calculator', icon: '💨', category: 'Weather & Environment', description: 'Calculate CO2 emissions',
        fields: [{ id: 'fuel', label: 'Fuel Used (liters)', type: 'number', placeholder: '50' }, { id: 'type', label: 'Fuel Type', type: 'select', options: ['Petrol', 'Diesel', 'CNG'] }],
        calculate: (v) => { const fuel = parseFloat(v.fuel); const factors = { Petrol: 2.31, Diesel: 2.68, CNG: 2.75 }; const co2 = fuel * factors[v.type]; return { result: co2.toFixed(2) + ' kg CO₂', details: `${fuel}L ${v.type}<br>= ${co2.toFixed(2)} kg CO₂` }; }
    },
    {
        id: 'water-footprint', name: 'Water Footprint Calculator', icon: '💧', category: 'Weather & Environment', description: 'Daily water usage',
        fields: [{ id: 'shower', label: 'Shower (minutes)', type: 'number', placeholder: '10' }, { id: 'dishes', label: 'Dishwashing (minutes)', type: 'number', placeholder: '10' }, { id: 'laundry', label: 'Laundry Loads/week', type: 'number', placeholder: '3' }],
        calculate: (v) => { const shower = parseFloat(v.shower) * 10, dishes = parseFloat(v.dishes) * 6, laundry = parseFloat(v.laundry) * 50 / 7; const daily = shower + dishes + laundry; return { result: daily.toFixed(0) + ' L/day', details: `Shower: ${shower}L<br>Dishes: ${dishes}L<br>Laundry: ${laundry.toFixed(0)}L<br>Total: ${daily.toFixed(0)}L/day` }; }
    },
    {
        id: 'evaporation-rate', name: 'Evaporation Rate Calculator', icon: '☀️', category: 'Weather & Environment', description: 'Estimate water evaporation',
        fields: [{ id: 'temp', label: 'Temperature (°C)', type: 'number', placeholder: '30' }, { id: 'humidity', label: 'Humidity (%)', type: 'number', placeholder: '40' }, { id: 'wind', label: 'Wind Speed (km/h)', type: 'number', placeholder: '10' }],
        calculate: (v) => { const T = parseFloat(v.temp), RH = parseFloat(v.humidity), W = parseFloat(v.wind); const rate = (1 + 0.1 * W) * (25 + T) * (100 - RH) / 100 * 0.05; return { result: rate.toFixed(2) + ' mm/day', details: `Evaporation: ~${rate.toFixed(2)} mm/day` }; }
    },
    {
        id: 'cloud-base', name: 'Cloud Base Height Calculator', icon: '☁️', category: 'Weather & Environment', description: 'Estimate cloud height',
        fields: [{ id: 'temp', label: 'Surface Temp (°C)', type: 'number', placeholder: '25' }, { id: 'dewPoint', label: 'Dew Point (°C)', type: 'number', placeholder: '15' }],
        calculate: (v) => { const T = parseFloat(v.temp), Td = parseFloat(v.dewPoint); const spread = T - Td; const height = spread * 125; return { result: height.toFixed(0) + ' m AGL', details: `Temp-Dewpoint spread: ${spread}°C<br>Cloud base: ~${height.toFixed(0)} m` }; }
    },
    {
        id: 'atmospheric-pressure', name: 'Atmospheric Pressure Calculator', icon: '📊', category: 'Weather & Environment', description: 'Pressure at altitude',
        fields: [{ id: 'seaLevel', label: 'Sea Level Pressure (hPa)', type: 'number', placeholder: '1013' }, { id: 'altitude', label: 'Altitude (m)', type: 'number', placeholder: '1000' }],
        calculate: (v) => { const P0 = parseFloat(v.seaLevel), h = parseFloat(v.altitude); const P = P0 * Math.pow(1 - h / 44330, 5.255); return { result: P.toFixed(1) + ' hPa', details: `At ${h}m altitude:<br>Pressure: ${P.toFixed(1)} hPa` }; }
    },
    {
        id: 'storm-distance', name: 'Storm Distance Calculator', icon: '⛈️', category: 'Weather & Environment', description: 'Distance from lightning',
        fields: [{ id: 'seconds', label: 'Seconds After Flash', type: 'number', placeholder: '10' }],
        calculate: (v) => { const s = parseFloat(v.seconds); const km = s * 0.34; const miles = km * 0.621; return { result: km.toFixed(1) + ' km away', details: `Storm is ${km.toFixed(1)} km (${miles.toFixed(1)} miles) away` }; }
    },
    {
        id: 'lightning-distance', name: 'Lightning Distance Calculator', icon: '⚡', category: 'Weather & Environment', description: 'Calculate lightning distance',
        fields: [{ id: 'delay', label: 'Thunder Delay (s)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const delay = parseFloat(v.delay); const dist = delay * 343 / 1000; return { result: dist.toFixed(2) + ' km', details: `Sound travels 343 m/s<br>Lightning: ${dist.toFixed(2)} km away` }; }
    },
    {
        id: 'flood-risk', name: 'Flood Risk Calculator', icon: '🌊', category: 'Weather & Environment', description: 'Assess flood risk',
        fields: [{ id: 'rainfall', label: 'Expected Rainfall (mm/hr)', type: 'number', placeholder: '50' }, { id: 'drainage', label: 'Drainage Capacity', type: 'select', options: ['Good', 'Moderate', 'Poor'] }],
        calculate: (v) => { const rain = parseFloat(v.rainfall); const factors = { Good: 0.5, Moderate: 1, Poor: 1.5 }; const score = rain * factors[v.drainage]; let risk = score < 25 ? 'Low' : score < 50 ? 'Moderate' : score < 100 ? 'High' : 'Extreme'; return { result: risk + ' Risk', details: `Rainfall: ${rain} mm/hr<br>Risk Score: ${score.toFixed(0)}<br>Level: ${risk}` }; }
    },
    {
        id: 'solar-radiation', name: 'Solar Radiation Calculator', icon: '☀️', category: 'Weather & Environment', description: 'Estimate solar irradiance',
        fields: [{ id: 'latitude', label: 'Latitude (°)', type: 'number', placeholder: '28' }, { id: 'month', label: 'Month (1-12)', type: 'number', placeholder: '6' }],
        calculate: (v) => { const lat = parseFloat(v.latitude), month = parseFloat(v.month); const declination = 23.45 * Math.sin(2 * Math.PI * (284 + (month * 30)) / 365); const sunAngle = 90 - lat + declination; const irradiance = 1000 * Math.sin(sunAngle * Math.PI / 180); return { result: Math.max(0, irradiance).toFixed(0) + ' W/m²', details: `Peak irradiance: ~${Math.max(0, irradiance).toFixed(0)} W/m²` }; }
    },
    {
        id: 'wind-power-weather', name: 'Wind Power Potential', icon: '🌬️', category: 'Weather & Environment', description: 'Calculate wind energy',
        fields: [{ id: 'speed', label: 'Wind Speed (m/s)', type: 'number', placeholder: '8' }, { id: 'area', label: 'Swept Area (m²)', type: 'number', placeholder: '50' }],
        calculate: (v) => { const V = parseFloat(v.speed), A = parseFloat(v.area); const rho = 1.225; const P = 0.5 * rho * A * Math.pow(V, 3) * 0.4; return { result: (P / 1000).toFixed(2) + ' kW', details: `Power available: ${(P / 1000).toFixed(2)} kW<br>(at 40% efficiency)` }; }
    },
    {
        id: 'rainwater-harvest', name: 'Rainwater Harvesting', icon: '🏠', category: 'Weather & Environment', description: 'Calculate collection',
        fields: [{ id: 'area', label: 'Roof Area (m²)', type: 'number', placeholder: '100' }, { id: 'rainfall', label: 'Annual Rainfall (mm)', type: 'number', placeholder: '1000' }, { id: 'efficiency', label: 'Collection Efficiency (%)', type: 'number', placeholder: '80' }],
        calculate: (v) => { const A = parseFloat(v.area), R = parseFloat(v.rainfall), eff = parseFloat(v.efficiency) / 100; const liters = A * R * eff; return { result: (liters / 1000).toFixed(1) + ' kL/year', details: `Annual collection: ${liters.toFixed(0)} L<br>= ${(liters / 1000).toFixed(1)} kiloliters` }; }
    },
    {
        id: 'sea-level-rise', name: 'Sea Level Rise Impact', icon: '🌊', category: 'Weather & Environment', description: 'Future sea level',
        fields: [{ id: 'current', label: 'Current Level (m)', type: 'number', placeholder: '0' }, { id: 'years', label: 'Years from Now', type: 'number', placeholder: '50' }, { id: 'scenario', label: 'Scenario', type: 'select', options: ['Low (2mm/yr)', 'Medium (5mm/yr)', 'High (10mm/yr)'] }],
        calculate: (v) => { const current = parseFloat(v.current), years = parseFloat(v.years); const rates = { 'Low (2mm/yr)': 2, 'Medium (5mm/yr)': 5, 'High (10mm/yr)': 10 }; const rise = rates[v.scenario] * years / 1000; const future = current + rise; return { result: '+' + (rise * 100).toFixed(0) + ' cm', details: `In ${years} years: +${(rise * 100).toFixed(1)} cm<br>Future level: ${future.toFixed(2)} m` }; }
    },
    {
        id: 'temp-anomaly', name: 'Temperature Anomaly', icon: '📈', category: 'Weather & Environment', description: 'Compare to average',
        fields: [{ id: 'actual', label: 'Actual Temp (°C)', type: 'number', placeholder: '32' }, { id: 'normal', label: 'Normal Temp (°C)', type: 'number', placeholder: '28' }],
        calculate: (v) => { const actual = parseFloat(v.actual), normal = parseFloat(v.normal); const anomaly = actual - normal; let status = Math.abs(anomaly) < 2 ? 'Normal' : anomaly > 0 ? 'Warmer than normal' : 'Cooler than normal'; return { result: (anomaly > 0 ? '+' : '') + anomaly.toFixed(1) + '°C', details: `Anomaly: ${anomaly > 0 ? '+' : ''}${anomaly.toFixed(1)}°C<br>Status: ${status}` }; }
    },
    {
        id: 'heatwave-risk', name: 'Heatwave Risk Calculator', icon: '🔥', category: 'Weather & Environment', description: 'Assess heatwave risk',
        fields: [{ id: 'maxTemp', label: 'Max Temp (°C)', type: 'number', placeholder: '42' }, { id: 'days', label: 'Consecutive Days', type: 'number', placeholder: '3' }],
        calculate: (v) => { const temp = parseFloat(v.maxTemp), days = parseFloat(v.days); const score = temp * days / 10; let risk = score < 10 ? 'Low' : score < 15 ? 'Moderate' : score < 20 ? 'High' : 'Extreme'; return { result: risk + ' Risk', details: `${days} days at ${temp}°C<br>Risk Level: ${risk}` }; }
    },
    {
        id: 'coldwave-risk', name: 'Cold Wave Risk Calculator', icon: '🥶', category: 'Weather & Environment', description: 'Assess cold wave risk',
        fields: [{ id: 'minTemp', label: 'Min Temp (°C)', type: 'number', placeholder: '-5' }, { id: 'days', label: 'Consecutive Days', type: 'number', placeholder: '3' }],
        calculate: (v) => { const temp = parseFloat(v.minTemp), days = parseFloat(v.days); const severity = Math.abs(temp) * days / 5; let risk = severity < 5 ? 'Low' : severity < 10 ? 'Moderate' : severity < 20 ? 'High' : 'Extreme'; return { result: risk + ' Risk', details: `${days} days at ${temp}°C<br>Risk Level: ${risk}` }; }
    },
    {
        id: 'drought-severity', name: 'Drought Severity Index', icon: '🏜️', category: 'Weather & Environment', description: 'Assess drought level',
        fields: [{ id: 'actual', label: 'Actual Rainfall (mm)', type: 'number', placeholder: '50' }, { id: 'normal', label: 'Normal Rainfall (mm)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const actual = parseFloat(v.actual), normal = parseFloat(v.normal); const deficit = ((normal - actual) / normal) * 100; let severity = deficit < 10 ? 'No Drought' : deficit < 25 ? 'Mild' : deficit < 50 ? 'Moderate' : deficit < 75 ? 'Severe' : 'Extreme'; return { result: severity, details: `Deficit: ${deficit.toFixed(1)}%<br>Severity: ${severity}` }; }
    },
    {
        id: 'visibility', name: 'Weather Visibility Calculator', icon: '👁️', category: 'Weather & Environment', description: 'Estimate visibility',
        fields: [{ id: 'condition', label: 'Weather Condition', type: 'select', options: ['Clear', 'Mist', 'Fog', 'Heavy Fog', 'Rain', 'Heavy Rain', 'Snow'] }],
        calculate: (v) => { const visibility = { Clear: 10000, Mist: 5000, Fog: 1000, 'Heavy Fog': 200, Rain: 4000, 'Heavy Rain': 1000, Snow: 500 }; const vis = visibility[v.condition]; return { result: vis >= 1000 ? (vis / 1000).toFixed(0) + ' km' : vis + ' m', details: `Visibility: ${vis >= 1000 ? (vis / 1000).toFixed(1) + ' km' : vis + ' m'}<br>Condition: ${v.condition}` }; }
    },
    {
        id: 'weather-trend', name: 'Weather Trend Analyzer', icon: '📊', category: 'Weather & Environment', description: 'Compare temperatures',
        fields: [{ id: 'yesterday', label: 'Yesterday Temp (°C)', type: 'number', placeholder: '28' }, { id: 'today', label: 'Today Temp (°C)', type: 'number', placeholder: '30' }, { id: 'forecast', label: 'Tomorrow Forecast (°C)', type: 'number', placeholder: '32' }],
        calculate: (v) => { const y = parseFloat(v.yesterday), t = parseFloat(v.today), f = parseFloat(v.forecast); const trend = f - y; let direction = trend > 2 ? 'Warming' : trend < -2 ? 'Cooling' : 'Stable'; return { result: direction, details: `Trend: ${trend > 0 ? '+' : ''}${trend.toFixed(1)}°C over 3 days<br>Direction: ${direction}` }; }
    },
    {
        id: 'environmental-impact', name: 'Environmental Impact Score', icon: '🌱', category: 'Weather & Environment', description: 'Calculate eco-score',
        fields: [{ id: 'carbon', label: 'Carbon Footprint (kg/month)', type: 'number', placeholder: '500' }, { id: 'water', label: 'Water Usage (L/day)', type: 'number', placeholder: '150' }, { id: 'waste', label: 'Waste (kg/week)', type: 'number', placeholder: '5' }],
        calculate: (v) => { const carbon = parseFloat(v.carbon), water = parseFloat(v.water), waste = parseFloat(v.waste); const score = 100 - (carbon / 20 + water / 10 + waste * 2); const rating = score >= 70 ? 'Eco-Friendly' : score >= 50 ? 'Moderate' : 'Needs Improvement'; return { result: Math.max(0, score).toFixed(0) + '/100', details: `Environmental Score: ${Math.max(0, score).toFixed(0)}/100<br>Rating: ${rating}` }; }
    }
];
if (typeof window !== 'undefined') window.weatherCalculators = weatherCalculators;
