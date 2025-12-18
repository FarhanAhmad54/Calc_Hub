// Gaming & Esports Calculators
const gamingCalculators = [
    {
        id: 'game-fps', name: 'Gaming FPS Calculator', icon: '🎮', category: 'Gaming', description: 'Estimate achievable FPS',
        fields: [{ id: 'gpu', label: 'GPU Tier', type: 'select', options: ['Entry (GTX 1650)', 'Mid (RTX 3060)', 'High (RTX 4070)', 'Ultra (RTX 4090)'] }, { id: 'resolution', label: 'Resolution', type: 'select', options: ['1080p', '1440p', '4K'] }, { id: 'settings', label: 'Graphics Settings', type: 'select', options: ['Low', 'Medium', 'High', 'Ultra'] }],
        calculate: (v) => { const baseFPS = { 'Entry (GTX 1650)': 90, 'Mid (RTX 3060)': 144, 'High (RTX 4070)': 200, 'Ultra (RTX 4090)': 300 }; const resScale = { '1080p': 1, '1440p': 0.65, '4K': 0.35 }; const setScale = { 'Low': 1.4, 'Medium': 1.15, 'High': 0.85, 'Ultra': 0.6 }; const fps = baseFPS[v.gpu] * resScale[v.resolution] * setScale[v.settings]; return { result: `~${Math.round(fps)} FPS`, details: `GPU: ${v.gpu}<br>Resolution: ${v.resolution}<br>Settings: ${v.settings}<br>Estimated FPS: ${Math.round(fps)}` }; }
    },
    {
        id: 'game-refresh', name: 'Monitor Refresh Rate Calculator', icon: '🖥️', category: 'Gaming', description: 'Optimal refresh rate',
        fields: [{ id: 'avgFPS', label: 'Average FPS', type: 'number', placeholder: '120' }, { id: 'gameType', label: 'Game Type', type: 'select', options: ['Competitive FPS', 'Action RPG', 'Strategy', 'Casual'] }],
        calculate: (v) => { const fps = parseFloat(v.avgFPS); const priority = { 'Competitive FPS': 1.5, 'Action RPG': 1.2, 'Strategy': 1.0, 'Casual': 0.8 }; const ideal = Math.min(360, Math.ceil(fps * priority[v.gameType] / 60) * 60); const options = [60, 75, 120, 144, 165, 240, 360].filter(r => r <= ideal + 60); return { result: `${ideal}Hz recommended`, details: `Your FPS: ${fps}<br>Game type: ${v.gameType}<br>Ideal: ${ideal}Hz<br>Options: ${options.join(', ')}Hz` }; }
    },
    {
        id: 'game-sensitivity', name: 'Mouse Sensitivity Calculator', icon: '🖱️', category: 'Gaming', description: 'Calculate effective sensitivity',
        fields: [{ id: 'dpi', label: 'Mouse DPI', type: 'number', placeholder: '800' }, { id: 'sens', label: 'In-Game Sensitivity', type: 'number', placeholder: '1.5' }],
        calculate: (v) => { const dpi = parseFloat(v.dpi), sens = parseFloat(v.sens); const edpi = dpi * sens; const cm360 = (360 / edpi) * 2.54 * 100; let category = cm360 < 20 ? 'High (twitchy)' : cm360 < 35 ? 'Medium (balanced)' : cm360 < 50 ? 'Low (precision)' : 'Very Low (arm aimer)'; return { result: `${edpi.toFixed(0)} eDPI`, details: `DPI: ${dpi}<br>Sensitivity: ${sens}<br>eDPI: ${edpi.toFixed(0)}<br>cm/360°: ${cm360.toFixed(1)}<br>Style: ${category}` }; }
    },
    {
        id: 'game-dpi-convert', name: 'DPI to Sensitivity Converter', icon: '🔄', category: 'Gaming', description: 'Convert between DPI settings',
        fields: [{ id: 'oldDPI', label: 'Old DPI', type: 'number', placeholder: '400' }, { id: 'oldSens', label: 'Old Sensitivity', type: 'number', placeholder: '2.0' }, { id: 'newDPI', label: 'New DPI', type: 'number', placeholder: '800' }],
        calculate: (v) => { const oldDPI = parseFloat(v.oldDPI), oldSens = parseFloat(v.oldSens), newDPI = parseFloat(v.newDPI); const edpi = oldDPI * oldSens; const newSens = edpi / newDPI; return { result: `New sens: ${newSens.toFixed(3)}`, details: `Old: ${oldDPI} DPI × ${oldSens}<br>eDPI: ${edpi.toFixed(0)}<br>New: ${newDPI} DPI × ${newSens.toFixed(3)}<br>Same effective sensitivity!` }; }
    },
    {
        id: 'game-aim-score', name: 'Aim Training Score Calculator', icon: '🎯', category: 'Gaming', description: 'Calculate aim score',
        fields: [{ id: 'hits', label: 'Hits', type: 'number', placeholder: '85' }, { id: 'shots', label: 'Total Shots', type: 'number', placeholder: '100' }, { id: 'time', label: 'Time (seconds)', type: 'number', placeholder: '60' }, { id: 'targetSize', label: 'Target Size', type: 'select', options: ['Small', 'Medium', 'Large'] }],
        calculate: (v) => { const hits = parseInt(v.hits), shots = parseInt(v.shots), time = parseFloat(v.time); const sizeMult = { 'Small': 1.5, 'Medium': 1.0, 'Large': 0.7 }; const accuracy = (hits / shots) * 100; const hitsPerSec = hits / time; const score = Math.round(accuracy * hitsPerSec * sizeMult[v.targetSize] * 10); return { result: `Score: ${score}`, details: `Accuracy: ${accuracy.toFixed(1)}%<br>Hits/sec: ${hitsPerSec.toFixed(2)}<br>Target: ${v.targetSize}<br>Score: ${score}` }; }
    },
    {
        id: 'game-reaction', name: 'Reaction Time Calculator', icon: '⚡', category: 'Gaming', description: 'Evaluate reaction time',
        fields: [{ id: 'times', label: 'Reaction Times (ms, comma sep)', type: 'text', placeholder: '210,195,225,180,205' }],
        calculate: (v) => { const times = v.times.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)); const avg = times.reduce((a, b) => a + b, 0) / times.length; const best = Math.min(...times); let rating = avg < 180 ? 'Pro level' : avg < 220 ? 'Above average' : avg < 260 ? 'Average' : 'Below average'; return { result: `${avg.toFixed(0)}ms avg`, details: `Average: ${avg.toFixed(0)}ms<br>Best: ${best}ms<br>Worst: ${Math.max(...times)}ms<br>Rating: ${rating}` }; }
    },
    {
        id: 'game-latency', name: 'Game Latency (Ping) Calculator', icon: '📡', category: 'Gaming', description: 'Calculate total latency',
        fields: [{ id: 'ping', label: 'Network Ping (ms)', type: 'number', placeholder: '30' }, { id: 'fps', label: 'Game FPS', type: 'number', placeholder: '144' }, { id: 'refreshRate', label: 'Monitor Refresh (Hz)', type: 'number', placeholder: '144' }],
        calculate: (v) => { const ping = parseFloat(v.ping), fps = parseFloat(v.fps), hz = parseFloat(v.refreshRate); const frameTime = 1000 / fps; const displayLag = 1000 / hz; const totalLag = ping + frameTime + displayLag; return { result: `${totalLag.toFixed(1)}ms total`, details: `Network: ${ping}ms<br>Frame time: ${frameTime.toFixed(1)}ms<br>Display: ${displayLag.toFixed(1)}ms<br>Total input lag: ${totalLag.toFixed(1)}ms` }; }
    },
    {
        id: 'game-download', name: 'Download Size Time Calculator', icon: '⬇️', category: 'Gaming', description: 'Calculate download time',
        fields: [{ id: 'size', label: 'File Size (GB)', type: 'number', placeholder: '100' }, { id: 'speed', label: 'Internet Speed (Mbps)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const sizeGB = parseFloat(v.size), speedMbps = parseFloat(v.speed); const sizeMb = sizeGB * 8 * 1024; const seconds = sizeMb / speedMbps; const hours = Math.floor(seconds / 3600); const mins = Math.floor((seconds % 3600) / 60); return { result: hours > 0 ? `${hours}h ${mins}m` : `${mins} minutes`, details: `Size: ${sizeGB} GB<br>Speed: ${speedMbps} Mbps<br>Time: ${hours}h ${mins}m ${Math.floor(seconds % 60)}s` }; }
    },
    {
        id: 'game-currency', name: 'In-Game Currency Converter', icon: '💎', category: 'Gaming', description: 'Convert game currencies',
        fields: [{ id: 'amount', label: 'Currency Amount', type: 'number', placeholder: '1000' }, { id: 'rate', label: 'Exchange Rate (₹/unit)', type: 'number', placeholder: '0.8' }],
        calculate: (v) => { const amount = parseFloat(v.amount), rate = parseFloat(v.rate); const realValue = amount * rate; return { result: `₹${realValue.toFixed(2)}`, details: `In-game: ${amount} units<br>Rate: ₹${rate}/unit<br>Real value: ₹${realValue.toFixed(2)}` }; }
    },
    {
        id: 'game-xp', name: 'XP to Level Calculator', icon: '📊', category: 'Gaming', description: 'Calculate XP requirements',
        fields: [{ id: 'currentLevel', label: 'Current Level', type: 'number', placeholder: '25' }, { id: 'targetLevel', label: 'Target Level', type: 'number', placeholder: '50' }, { id: 'xpPerLevel', label: 'XP Per Level', type: 'number', placeholder: '1000' }, { id: 'scaling', label: 'XP Scaling %', type: 'number', placeholder: '10' }],
        calculate: (v) => { const current = parseInt(v.currentLevel), target = parseInt(v.targetLevel); const base = parseFloat(v.xpPerLevel), scale = parseFloat(v.scaling) / 100; let totalXP = 0; for (let i = current; i < target; i++) { totalXP += base * Math.pow(1 + scale, i - 1); } return { result: `${totalXP.toLocaleString()} XP`, details: `Levels: ${current} → ${target}<br>XP needed: ${totalXP.toLocaleString()}<br>Avg per level: ${(totalXP / (target - current)).toLocaleString()}` }; }
    },
    {
        id: 'game-progression', name: 'Level Progression Calculator', icon: '📈', category: 'Gaming', description: 'Estimate time to level',
        fields: [{ id: 'xpNeeded', label: 'XP Needed', type: 'number', placeholder: '50000' }, { id: 'xpPerHour', label: 'XP Per Hour', type: 'number', placeholder: '5000' }, { id: 'hoursPerDay', label: 'Play Hours/Day', type: 'number', placeholder: '3' }],
        calculate: (v) => { const needed = parseFloat(v.xpNeeded), perHour = parseFloat(v.xpPerHour), daily = parseFloat(v.hoursPerDay); const totalHours = needed / perHour; const days = totalHours / daily; return { result: `${days.toFixed(1)} days`, details: `XP needed: ${needed.toLocaleString()}<br>Hours of play: ${totalHours.toFixed(1)}<br>At ${daily} hrs/day: ${days.toFixed(1)} days` }; }
    },
    {
        id: 'game-loot', name: 'Loot Drop Probability Calculator', icon: '🎁', category: 'Gaming', description: 'Calculate drop chances',
        fields: [{ id: 'dropRate', label: 'Drop Rate (%)', type: 'number', placeholder: '5' }, { id: 'attempts', label: 'Number of Attempts', type: 'number', placeholder: '20' }],
        calculate: (v) => { const rate = parseFloat(v.dropRate) / 100, attempts = parseInt(v.attempts); const probNone = Math.pow(1 - rate, attempts); const probAtLeastOne = 1 - probNone; const expectedDrops = rate * attempts; return { result: `${(probAtLeastOne * 100).toFixed(1)}% chance`, details: `Drop rate: ${v.dropRate}%<br>Attempts: ${attempts}<br>Chance of at least 1: ${(probAtLeastOne * 100).toFixed(1)}%<br>Expected drops: ${expectedDrops.toFixed(2)}` }; }
    },
    {
        id: 'game-crit', name: 'Critical Hit Chance Calculator', icon: '💥', category: 'Gaming', description: 'Calculate crit probability',
        fields: [{ id: 'baseCrit', label: 'Base Crit %', type: 'number', placeholder: '5' }, { id: 'bonusCrit', label: 'Bonus Crit %', type: 'number', placeholder: '15' }, { id: 'critDmg', label: 'Crit Damage %', type: 'number', placeholder: '150' }],
        calculate: (v) => { const base = parseFloat(v.baseCrit), bonus = parseFloat(v.bonusCrit), dmg = parseFloat(v.critDmg); const totalCrit = Math.min(100, base + bonus); const avgMultiplier = 1 + (totalCrit / 100) * (dmg / 100 - 1); return { result: `${totalCrit.toFixed(1)}% crit`, details: `Total crit: ${totalCrit.toFixed(1)}%<br>Crit damage: ${dmg}%<br>Avg damage multiplier: ${avgMultiplier.toFixed(2)}x` }; }
    },
    {
        id: 'game-dps', name: 'Damage Per Second (DPS)', icon: '⚔️', category: 'Gaming', description: 'Calculate DPS',
        fields: [{ id: 'damage', label: 'Damage Per Hit', type: 'number', placeholder: '150' }, { id: 'attackSpeed', label: 'Attacks Per Second', type: 'number', placeholder: '2' }, { id: 'critChance', label: 'Crit Chance %', type: 'number', placeholder: '20' }, { id: 'critDmg', label: 'Crit Damage %', type: 'number', placeholder: '200' }],
        calculate: (v) => { const dmg = parseFloat(v.damage), speed = parseFloat(v.attackSpeed); const crit = parseFloat(v.critChance) / 100, critMult = parseFloat(v.critDmg) / 100; const avgDmg = dmg * (1 - crit) + dmg * crit * critMult; const dps = avgDmg * speed; return { result: `${dps.toFixed(0)} DPS`, details: `Damage: ${dmg}<br>Speed: ${speed}/sec<br>Avg hit: ${avgDmg.toFixed(0)}<br>DPS: ${dps.toFixed(0)}` }; }
    },
    {
        id: 'game-build', name: 'Build Stat Optimizer', icon: '🛠️', category: 'Gaming', description: 'Optimize stat distribution',
        fields: [{ id: 'points', label: 'Available Points', type: 'number', placeholder: '100' }, { id: 'focus', label: 'Build Focus', type: 'select', options: ['Balanced', 'DPS', 'Tank', 'Support'] }],
        calculate: (v) => { const pts = parseInt(v.points); const dist = { 'Balanced': { str: 0.25, dex: 0.25, vit: 0.25, int: 0.25 }, 'DPS': { str: 0.4, dex: 0.35, vit: 0.15, int: 0.1 }, 'Tank': { str: 0.2, dex: 0.1, vit: 0.6, int: 0.1 }, 'Support': { str: 0.1, dex: 0.15, vit: 0.25, int: 0.5 } }; const d = dist[v.focus]; return { result: `${v.focus} build`, details: `STR: ${Math.round(pts * d.str)}<br>DEX: ${Math.round(pts * d.dex)}<br>VIT: ${Math.round(pts * d.vit)}<br>INT: ${Math.round(pts * d.int)}` }; }
    },
    {
        id: 'game-cooldown', name: 'Skill Cooldown Calculator', icon: '⏱️', category: 'Gaming', description: 'Calculate reduced cooldowns',
        fields: [{ id: 'baseCd', label: 'Base Cooldown (sec)', type: 'number', placeholder: '60' }, { id: 'cdr', label: 'Cooldown Reduction %', type: 'number', placeholder: '40' }],
        calculate: (v) => { const base = parseFloat(v.baseCd), cdr = parseFloat(v.cdr); const reduced = base * (1 - cdr / 100); const uptime = (base - reduced) / base * 100; return { result: `${reduced.toFixed(1)}s cooldown`, details: `Base: ${base}s<br>CDR: ${cdr}%<br>Reduced: ${reduced.toFixed(1)}s<br>Time saved: ${(base - reduced).toFixed(1)}s` }; }
    },
    {
        id: 'game-mmr', name: 'Matchmaking Rating Calculator', icon: '📊', category: 'Gaming', description: 'Estimate MMR change',
        fields: [{ id: 'currentMMR', label: 'Current MMR', type: 'number', placeholder: '1500' }, { id: 'kFactor', label: 'K-Factor', type: 'number', placeholder: '32' }, { id: 'result', label: 'Match Result', type: 'select', options: ['Win', 'Loss', 'Draw'] }, { id: 'oppMMR', label: 'Opponent MMR', type: 'number', placeholder: '1550' }],
        calculate: (v) => { const myMMR = parseFloat(v.currentMMR), k = parseFloat(v.kFactor), oppMMR = parseFloat(v.oppMMR); const expected = 1 / (1 + Math.pow(10, (oppMMR - myMMR) / 400)); const actual = v.result === 'Win' ? 1 : v.result === 'Loss' ? 0 : 0.5; const change = k * (actual - expected); const newMMR = myMMR + change; return { result: `${newMMR.toFixed(0)} MMR`, details: `Expected win%: ${(expected * 100).toFixed(1)}%<br>Result: ${v.result}<br>Change: ${change > 0 ? '+' : ''}${change.toFixed(0)}<br>New MMR: ${newMMR.toFixed(0)}` }; }
    },
    {
        id: 'game-winloss', name: 'Win-Loss Ratio Calculator', icon: '📈', category: 'Gaming', description: 'Calculate win rate stats',
        fields: [{ id: 'wins', label: 'Wins', type: 'number', placeholder: '150' }, { id: 'losses', label: 'Losses', type: 'number', placeholder: '100' }],
        calculate: (v) => { const wins = parseInt(v.wins), losses = parseInt(v.losses); const total = wins + losses; const winRate = (wins / total) * 100; const ratio = losses > 0 ? wins / losses : wins; return { result: `${winRate.toFixed(1)}% WR`, details: `Wins: ${wins}<br>Losses: ${losses}<br>Win rate: ${winRate.toFixed(1)}%<br>W/L ratio: ${ratio.toFixed(2)}` }; }
    },
    {
        id: 'game-rank', name: 'Rank Progression Calculator', icon: '🏆', category: 'Gaming', description: 'Calculate games to rank up',
        fields: [{ id: 'currentLP', label: 'Current LP/Points', type: 'number', placeholder: '50' }, { id: 'lpPerWin', label: 'LP Per Win', type: 'number', placeholder: '25' }, { id: 'lpPerLoss', label: 'LP Per Loss', type: 'number', placeholder: '15' }, { id: 'winRate', label: 'Win Rate %', type: 'number', placeholder: '55' }],
        calculate: (v) => { const current = parseFloat(v.currentLP), lpWin = parseFloat(v.lpPerWin), lpLoss = parseFloat(v.lpPerLoss); const wr = parseFloat(v.winRate) / 100; const needed = 100 - current; const netLP = lpWin * wr - lpLoss * (1 - wr); const games = netLP > 0 ? needed / netLP : Infinity; return { result: games < 1000 ? `~${Math.ceil(games)} games` : 'Unlikely', details: `Need: ${needed} LP<br>Net LP/game: ${netLP.toFixed(1)}<br>Games to rank up: ${games < 1000 ? Math.ceil(games) : 'Win more!'}` }; }
    },
    {
        id: 'game-prize', name: 'Tournament Prize Split Calculator', icon: '💰', category: 'Gaming', description: 'Calculate prize distribution',
        fields: [{ id: 'total', label: 'Total Prize Pool', type: 'number', placeholder: '100000' }, { id: 'placement', label: 'Your Placement', type: 'number', placeholder: '1' }, { id: 'teamSize', label: 'Team Size', type: 'number', placeholder: '5' }],
        calculate: (v) => { const pool = parseFloat(v.total), place = parseInt(v.placement), team = parseInt(v.teamSize); const shares = { 1: 0.5, 2: 0.25, 3: 0.15, 4: 0.1 }; const share = shares[place] || 0; const teamPrize = pool * share; const perPlayer = teamPrize / team; return { result: `₹${perPlayer.toLocaleString()}/player`, details: `Pool: ₹${pool.toLocaleString()}<br>Place: ${place}${place === 1 ? 'st' : place === 2 ? 'nd' : place === 3 ? 'rd' : 'th'}<br>Team share: ₹${teamPrize.toLocaleString()}<br>Per player: ₹${perPlayer.toLocaleString()}` }; }
    },
    {
        id: 'game-earnings', name: 'Esports Earnings Calculator', icon: '💵', category: 'Gaming', description: 'Calculate annual earnings',
        fields: [{ id: 'salary', label: 'Monthly Salary', type: 'number', placeholder: '50000' }, { id: 'tournaments', label: 'Tournament Earnings/Year', type: 'number', placeholder: '200000' }, { id: 'sponsors', label: 'Sponsorship/Year', type: 'number', placeholder: '100000' }],
        calculate: (v) => { const salary = parseFloat(v.salary) * 12; const tourney = parseFloat(v.tournaments); const sponsors = parseFloat(v.sponsors); const total = salary + tourney + sponsors; return { result: `₹${total.toLocaleString()}/year`, details: `Salary: ₹${salary.toLocaleString()}<br>Tournaments: ₹${tourney.toLocaleString()}<br>Sponsors: ₹${sponsors.toLocaleString()}<br>Total: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'game-stream-rev', name: 'Streaming Revenue Calculator', icon: '📺', category: 'Gaming', description: 'Calculate streaming income',
        fields: [{ id: 'subs', label: 'Subscribers', type: 'number', placeholder: '500' }, { id: 'avgViewers', label: 'Average Viewers', type: 'number', placeholder: '200' }, { id: 'hoursStreamed', label: 'Hours/Month', type: 'number', placeholder: '100' }],
        calculate: (v) => { const subs = parseInt(v.subs), viewers = parseInt(v.avgViewers), hours = parseFloat(v.hoursStreamed); const subRevenue = subs * 2.5 * 83; const adRevenue = viewers * hours * 0.01 * 83; const bits = viewers * 0.05 * hours * 83; const total = subRevenue + adRevenue + bits; return { result: `₹${total.toLocaleString()}/month`, details: `Subs (50%): ₹${subRevenue.toLocaleString()}<br>Ads: ₹${adRevenue.toLocaleString()}<br>Bits/Donations: ₹${bits.toLocaleString()}<br>Total: ₹${total.toLocaleString()}` }; }
    },
    {
        id: 'game-viewer', name: 'Viewer Growth Calculator', icon: '📈', category: 'Gaming', description: 'Predict viewer growth',
        fields: [{ id: 'current', label: 'Current Avg Viewers', type: 'number', placeholder: '50' }, { id: 'growth', label: 'Monthly Growth %', type: 'number', placeholder: '15' }, { id: 'months', label: 'Months', type: 'number', placeholder: '12' }],
        calculate: (v) => { const current = parseFloat(v.current), growth = parseFloat(v.growth) / 100, months = parseInt(v.months); const projected = current * Math.pow(1 + growth, months); return { result: `${Math.round(projected)} viewers`, details: `Start: ${current} viewers<br>Growth: ${v.growth}%/month<br>After ${months} months: ${Math.round(projected)}<br>Increase: ${Math.round(projected - current)} viewers` }; }
    },
    {
        id: 'game-bitrate', name: 'Stream Bitrate Calculator', icon: '📶', category: 'Gaming', description: 'Calculate optimal bitrate',
        fields: [{ id: 'resolution', label: 'Resolution', type: 'select', options: ['720p30', '720p60', '1080p30', '1080p60', '1440p60', '4K60'] }, { id: 'upload', label: 'Upload Speed (Mbps)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const bitrates = { '720p30': 2500, '720p60': 4000, '1080p30': 4500, '1080p60': 6000, '1440p60': 9000, '4K60': 20000 }; const recommended = bitrates[v.resolution]; const maxBitrate = parseFloat(v.upload) * 0.7 * 1000; const canStream = maxBitrate >= recommended; return { result: `${recommended} kbps`, details: `Resolution: ${v.resolution}<br>Recommended: ${recommended} kbps<br>Your max: ${maxBitrate.toFixed(0)} kbps<br>Possible: ${canStream ? '✅ Yes' : '❌ Lower resolution'}` }; }
    },
    {
        id: 'game-server', name: 'Game Server Cost Calculator', icon: '🖧', category: 'Gaming', description: 'Estimate server costs',
        fields: [{ id: 'players', label: 'Max Concurrent Players', type: 'number', placeholder: '100' }, { id: 'hours', label: 'Hours Online/Day', type: 'number', placeholder: '24' }, { id: 'region', label: 'Server Region', type: 'select', options: ['US', 'EU', 'Asia'] }],
        calculate: (v) => { const players = parseInt(v.players), hours = parseFloat(v.hours); const regionMult = { 'US': 1, 'EU': 1.1, 'Asia': 0.9 }; const baseCost = 20 + (players * 0.5); const monthly = baseCost * 30 * (hours / 24) * regionMult[v.region]; return { result: `$${monthly.toFixed(0)}/month`, details: `Players: ${players}<br>Uptime: ${hours}h/day<br>Region: ${v.region}<br>Monthly: $${monthly.toFixed(0)}` }; }
    },
    {
        id: 'game-vr', name: 'VR Space Requirement Calculator', icon: '🥽', category: 'Gaming', description: 'Calculate VR play space',
        fields: [{ id: 'style', label: 'Play Style', type: 'select', options: ['Seated', 'Standing', 'Room-Scale'] }, { id: 'game', label: 'Game Type', type: 'select', options: ['Casual', 'Action', 'Fitness', 'Social'] }],
        calculate: (v) => { const space = { 'Seated': { 'Casual': 1, 'Action': 1.5, 'Fitness': 2, 'Social': 1 }, 'Standing': { 'Casual': 2, 'Action': 3, 'Fitness': 4, 'Social': 2 }, 'Room-Scale': { 'Casual': 4, 'Action': 6, 'Fitness': 9, 'Social': 4 } }; const area = space[v.style][v.game]; const side = Math.sqrt(area); return { result: `${area} m² minimum`, details: `Style: ${v.style}<br>Game: ${v.game}<br>Area: ${area} m²<br>Approx: ${side.toFixed(1)}m × ${side.toFixed(1)}m` }; }
    },
    {
        id: 'game-deadzone', name: 'Controller Deadzone Calculator', icon: '🎮', category: 'Gaming', description: 'Calculate optimal deadzone',
        fields: [{ id: 'stickDrift', label: 'Stick Drift Amount', type: 'select', options: ['None', 'Slight', 'Moderate', 'Severe'] }, { id: 'gameType', label: 'Game Type', type: 'select', options: ['FPS', 'Racing', 'Sports', 'Action'] }],
        calculate: (v) => { const baseDZ = { 'FPS': 5, 'Racing': 3, 'Sports': 8, 'Action': 10 }; const driftAdd = { 'None': 0, 'Slight': 3, 'Moderate': 7, 'Severe': 12 }; const deadzone = baseDZ[v.gameType] + driftAdd[v.stickDrift]; let tip = deadzone > 15 ? 'Consider replacing controller' : 'Setting looks good'; return { result: `${deadzone}% deadzone`, details: `Base for ${v.gameType}: ${baseDZ[v.gameType]}%<br>Drift compensation: +${driftAdd[v.stickDrift]}%<br>Recommended: ${deadzone}%<br>${tip}` }; }
    },
    {
        id: 'game-battery', name: 'Battery Life for Controllers', icon: '🔋', category: 'Gaming', description: 'Estimate controller battery',
        fields: [{ id: 'controller', label: 'Controller Type', type: 'select', options: ['Xbox Wireless', 'PS5 DualSense', 'Switch Pro', 'Generic'] }, { id: 'features', label: 'Features Used', type: 'select', options: ['Basic', 'Haptics On', 'All Features'] }],
        calculate: (v) => { const base = { 'Xbox Wireless': 40, 'PS5 DualSense': 12, 'Switch Pro': 40, 'Generic': 30 }; const drain = { 'Basic': 1, 'Haptics On': 0.7, 'All Features': 0.5 }; const hours = base[v.controller] * drain[v.features]; return { result: `~${hours.toFixed(0)} hours`, details: `Controller: ${v.controller}<br>Base life: ${base[v.controller]} hrs<br>With ${v.features}: ${hours.toFixed(0)} hrs<br>Sessions (3hr): ${Math.floor(hours / 3)}` }; }
    },
    {
        id: 'game-session', name: 'Gaming Session Time Calculator', icon: '⏰', category: 'Gaming', description: 'Track gaming time',
        fields: [{ id: 'dailyHours', label: 'Hours Per Day', type: 'number', placeholder: '3' }, { id: 'daysPerWeek', label: 'Days Per Week', type: 'number', placeholder: '5' }],
        calculate: (v) => { const daily = parseFloat(v.dailyHours), days = parseInt(v.daysPerWeek); const weekly = daily * days; const monthly = weekly * 4.33; const yearly = weekly * 52; return { result: `${weekly.toFixed(0)} hrs/week`, details: `Daily: ${daily} hrs<br>Weekly: ${weekly.toFixed(0)} hrs<br>Monthly: ${monthly.toFixed(0)} hrs<br>Yearly: ${yearly.toFixed(0)} hrs` }; }
    },
    {
        id: 'game-team-budget', name: 'Esports Team Budget Calculator', icon: '💼', category: 'Gaming', description: 'Calculate team expenses',
        fields: [{ id: 'players', label: 'Number of Players', type: 'number', placeholder: '5' }, { id: 'salary', label: 'Avg Player Salary/Month', type: 'number', placeholder: '50000' }, { id: 'coach', label: 'Coach Salary/Month', type: 'number', placeholder: '40000' }, { id: 'infra', label: 'Infrastructure/Month', type: 'number', placeholder: '100000' }],
        calculate: (v) => { const players = parseInt(v.players), salary = parseFloat(v.salary); const coach = parseFloat(v.coach), infra = parseFloat(v.infra); const monthlySalaries = players * salary + coach; const monthly = monthlySalaries + infra; const yearly = monthly * 12; return { result: `₹${yearly.toLocaleString()}/year`, details: `Salaries: ₹${monthlySalaries.toLocaleString()}/mo<br>Infrastructure: ₹${infra.toLocaleString()}/mo<br>Monthly: ₹${monthly.toLocaleString()}<br>Yearly: ₹${yearly.toLocaleString()}` }; }
    }
];
if (typeof window !== 'undefined') window.gamingCalculators = gamingCalculators;
