// Digital, Tech & Internet Calculators (30)
const digitalCalculators = [
    {
        id: 'internet-speed', name: 'Internet Speed Calculator', icon: '🌐', category: 'Digital & Tech', description: 'Test speed requirements',
        fields: [{ id: 'users', label: 'Number of Users', type: 'number', placeholder: '4' }, { id: 'usage', label: 'Usage Type', type: 'select', options: ['Basic (Email, Browse)', 'Moderate (HD Video)', 'Heavy (4K, Gaming)', 'Work from Home'] }],
        calculate: (v) => { const users = parseFloat(v.users); const speeds = { 'Basic (Email, Browse)': 5, 'Moderate (HD Video)': 10, 'Heavy (4K, Gaming)': 25, 'Work from Home': 20 }; const needed = users * speeds[v.usage]; return { result: needed + ' Mbps', details: `${users} users × ${speeds[v.usage]} Mbps<br>Recommended: ${needed} Mbps` }; }
    },
    {
        id: 'download-time', name: 'Download Time Calculator', icon: '⬇️', category: 'Digital & Tech', description: 'Time to download file',
        fields: [{ id: 'size', label: 'File Size (GB)', type: 'number', placeholder: '5' }, { id: 'speed', label: 'Speed (Mbps)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const size = parseFloat(v.size) * 1024 * 8; const speed = parseFloat(v.speed); const secs = size / speed; const mins = Math.floor(secs / 60), sec = Math.round(secs % 60); return { result: `${mins}m ${sec}s`, details: `Size: ${v.size} GB<br>Speed: ${v.speed} Mbps<br>Time: ${mins} min ${sec} sec` }; }
    },
    {
        id: 'upload-time', name: 'Upload Time Calculator', icon: '⬆️', category: 'Digital & Tech', description: 'Time to upload file',
        fields: [{ id: 'size', label: 'File Size (MB)', type: 'number', placeholder: '500' }, { id: 'speed', label: 'Upload Speed (Mbps)', type: 'number', placeholder: '20' }],
        calculate: (v) => { const size = parseFloat(v.size) * 8; const speed = parseFloat(v.speed); const secs = size / speed; const mins = Math.floor(secs / 60), sec = Math.round(secs % 60); return { result: `${mins}m ${sec}s`, details: `Size: ${v.size} MB<br>Speed: ${v.speed} Mbps<br>Time: ${mins}m ${sec}s` }; }
    },
    {
        id: 'file-size', name: 'File Size Calculator', icon: '📁', category: 'Digital & Tech', description: 'Convert file sizes',
        fields: [{ id: 'size', label: 'Size', type: 'number', placeholder: '1024' }, { id: 'from', label: 'From', type: 'select', options: ['Bytes', 'KB', 'MB', 'GB', 'TB'] }, { id: 'to', label: 'To', type: 'select', options: ['Bytes', 'KB', 'MB', 'GB', 'TB'] }],
        calculate: (v) => { const rates = { Bytes: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 }; const bytes = parseFloat(v.size) * rates[v.from]; const result = bytes / rates[v.to]; return { result: result.toFixed(4) + ' ' + v.to, details: `${v.size} ${v.from} = ${result.toFixed(4)} ${v.to}` }; }
    },
    {
        id: 'video-file-size', name: 'Video File Size Calculator', icon: '🎬', category: 'Digital & Tech', description: 'Estimate video size',
        fields: [{ id: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: '60' }, { id: 'quality', label: 'Quality', type: 'select', options: ['720p (3 Mbps)', '1080p (8 Mbps)', '4K (25 Mbps)', '4K HDR (50 Mbps)'] }],
        calculate: (v) => { const mins = parseFloat(v.duration); const bitrates = { '720p (3 Mbps)': 3, '1080p (8 Mbps)': 8, '4K (25 Mbps)': 25, '4K HDR (50 Mbps)': 50 }; const mbps = bitrates[v.quality]; const sizeMB = (mbps * mins * 60) / 8; const sizeGB = sizeMB / 1024; return { result: sizeGB.toFixed(2) + ' GB', details: `Duration: ${mins} min<br>Bitrate: ${mbps} Mbps<br>Size: ${sizeGB.toFixed(2)} GB` }; }
    },
    {
        id: 'image-compression', name: 'Image Compression Ratio', icon: '🖼️', category: 'Digital & Tech', description: 'Calculate compression',
        fields: [{ id: 'original', label: 'Original Size (MB)', type: 'number', placeholder: '5' }, { id: 'compressed', label: 'Compressed Size (MB)', type: 'number', placeholder: '1' }],
        calculate: (v) => { const orig = parseFloat(v.original), comp = parseFloat(v.compressed); const ratio = orig / comp; const savings = ((orig - comp) / orig) * 100; return { result: ratio.toFixed(1) + ':1', details: `Ratio: ${ratio.toFixed(1)}:1<br>Space saved: ${savings.toFixed(1)}%` }; }
    },
    {
        id: 'data-usage', name: 'Data Usage Calculator', icon: '📊', category: 'Digital & Tech', description: 'Monthly data estimate',
        fields: [{ id: 'streaming', label: 'Streaming (hrs/day)', type: 'number', placeholder: '2' }, { id: 'quality', label: 'Stream Quality', type: 'select', options: ['SD (1 GB/hr)', 'HD (3 GB/hr)', '4K (7 GB/hr)'] }, { id: 'browsing', label: 'Browsing (hrs/day)', type: 'number', placeholder: '3' }],
        calculate: (v) => { const streaming = parseFloat(v.streaming), browsing = parseFloat(v.browsing); const rates = { 'SD (1 GB/hr)': 1, 'HD (3 GB/hr)': 3, '4K (7 GB/hr)': 7 }; const streamGB = streaming * rates[v.quality] * 30; const browseGB = browsing * 0.1 * 30; const total = streamGB + browseGB; return { result: total.toFixed(0) + ' GB/month', details: `Streaming: ${streamGB.toFixed(0)} GB<br>Browsing: ${browseGB.toFixed(0)} GB<br>Total: ${total.toFixed(0)} GB` }; }
    },
    {
        id: 'mobile-data', name: 'Mobile Data Consumption', icon: '📱', category: 'Digital & Tech', description: 'Track mobile data',
        fields: [{ id: 'plan', label: 'Plan Data (GB)', type: 'number', placeholder: '50' }, { id: 'used', label: 'Data Used (GB)', type: 'number', placeholder: '20' }, { id: 'daysLeft', label: 'Days Left', type: 'number', placeholder: '15' }],
        calculate: (v) => { const plan = parseFloat(v.plan), used = parseFloat(v.used), days = parseFloat(v.daysLeft); const remaining = plan - used; const perDay = remaining / days; return { result: perDay.toFixed(2) + ' GB/day', details: `Remaining: ${remaining} GB<br>Days left: ${days}<br>Daily budget: ${perDay.toFixed(2)} GB` }; }
    },
    {
        id: 'cloud-storage', name: 'Cloud Storage Requirement', icon: '☁️', category: 'Digital & Tech', description: 'Estimate cloud needs',
        fields: [{ id: 'photos', label: 'Photos (count)', type: 'number', placeholder: '5000' }, { id: 'videos', label: 'Videos (hours)', type: 'number', placeholder: '10' }, { id: 'docs', label: 'Documents (count)', type: 'number', placeholder: '500' }],
        calculate: (v) => { const photos = parseFloat(v.photos) * 3; const videos = parseFloat(v.videos) * 2000; const docs = parseFloat(v.docs) * 0.5; const totalMB = photos + videos + docs; const totalGB = totalMB / 1024; return { result: totalGB.toFixed(1) + ' GB', details: `Photos: ${(photos / 1024).toFixed(1)} GB<br>Videos: ${(videos / 1024).toFixed(1)} GB<br>Docs: ${(docs / 1024).toFixed(2)} GB<br>Total: ${totalGB.toFixed(1)} GB` }; }
    },
    {
        id: 'website-bandwidth', name: 'Website Bandwidth Calculator', icon: '🌐', category: 'Digital & Tech', description: 'Estimate bandwidth needs',
        fields: [{ id: 'pageSize', label: 'Avg Page Size (MB)', type: 'number', placeholder: '2' }, { id: 'visitors', label: 'Daily Visitors', type: 'number', placeholder: '1000' }, { id: 'pages', label: 'Avg Pages/Visit', type: 'number', placeholder: '5' }],
        calculate: (v) => { const size = parseFloat(v.pageSize), visitors = parseFloat(v.visitors), pages = parseFloat(v.pages); const dailyGB = (size * visitors * pages) / 1024; const monthlyGB = dailyGB * 30; return { result: monthlyGB.toFixed(0) + ' GB/month', details: `Daily: ${dailyGB.toFixed(1)} GB<br>Monthly: ${monthlyGB.toFixed(0)} GB` }; }
    },
    {
        id: 'server-cost', name: 'Server Cost Estimator', icon: '🖥️', category: 'Digital & Tech', description: 'Monthly server cost',
        fields: [{ id: 'cpu', label: 'CPU Cores', type: 'number', placeholder: '4' }, { id: 'ram', label: 'RAM (GB)', type: 'number', placeholder: '16' }, { id: 'storage', label: 'Storage (GB)', type: 'number', placeholder: '100' }],
        calculate: (v) => { const cpu = parseFloat(v.cpu) * 500, ram = parseFloat(v.ram) * 100, storage = parseFloat(v.storage) * 5; const monthly = cpu + ram + storage; return { result: '₹' + monthly.toLocaleString() + '/month', details: `CPU: ₹${cpu}<br>RAM: ₹${ram}<br>Storage: ₹${storage}<br>Total: ₹${monthly}/month` }; }
    },
    {
        id: 'app-dev-cost', name: 'App Development Cost', icon: '📱', category: 'Digital & Tech', description: 'Estimate app dev cost',
        fields: [{ id: 'complexity', label: 'Complexity', type: 'select', options: ['Simple', 'Medium', 'Complex', 'Enterprise'] }, { id: 'platforms', label: 'Platforms', type: 'select', options: ['Android Only', 'iOS Only', 'Both', 'Cross-platform'] }],
        calculate: (v) => { const base = { Simple: 200000, Medium: 500000, Complex: 1500000, Enterprise: 5000000 }; const mult = { 'Android Only': 1, 'iOS Only': 1, Both: 1.8, 'Cross-platform': 1.3 }; const cost = base[v.complexity] * mult[v.platforms]; return { result: '₹' + (cost / 100000).toFixed(1) + ' Lakh', details: `Complexity: ${v.complexity}<br>Platforms: ${v.platforms}<br>Est. Cost: ₹${cost.toLocaleString()}` }; }
    },
    {
        id: 'website-dev-cost', name: 'Website Development Cost', icon: '🌐', category: 'Digital & Tech', description: 'Estimate website cost',
        fields: [{ id: 'type', label: 'Website Type', type: 'select', options: ['Landing Page', 'Blog', 'E-commerce', 'Web App', 'Enterprise'] }, { id: 'pages', label: 'Number of Pages', type: 'number', placeholder: '10' }],
        calculate: (v) => { const base = { 'Landing Page': 20000, Blog: 50000, 'E-commerce': 150000, 'Web App': 300000, Enterprise: 1000000 }; const perPage = 5000; const cost = base[v.type] + parseFloat(v.pages) * perPage; return { result: '₹' + cost.toLocaleString(), details: `Type: ${v.type}<br>Pages: ${v.pages}<br>Est. Cost: ₹${cost.toLocaleString()}` }; }
    },
    {
        id: 'hosting-cost', name: 'Hosting Cost Calculator', icon: '🖥️', category: 'Digital & Tech', description: 'Compare hosting costs',
        fields: [{ id: 'type', label: 'Hosting Type', type: 'select', options: ['Shared', 'VPS', 'Dedicated', 'Cloud'] }, { id: 'traffic', label: 'Monthly Traffic', type: 'select', options: ['Low (<1K)', 'Medium (1-10K)', 'High (10-100K)', 'Very High (100K+)'] }],
        calculate: (v) => { const costs = { Shared: { 'Low (<1K)': 200, 'Medium (1-10K)': 500, 'High (10-100K)': 1000, 'Very High (100K+)': 2000 }, VPS: { 'Low (<1K)': 1000, 'Medium (1-10K)': 2000, 'High (10-100K)': 5000, 'Very High (100K+)': 10000 }, Dedicated: { 'Low (<1K)': 5000, 'Medium (1-10K)': 8000, 'High (10-100K)': 15000, 'Very High (100K+)': 30000 }, Cloud: { 'Low (<1K)': 500, 'Medium (1-10K)': 2000, 'High (10-100K)': 8000, 'Very High (100K+)': 20000 } }; const cost = costs[v.type][v.traffic]; return { result: '₹' + cost + '/month', details: `${v.type} hosting<br>Traffic: ${v.traffic}<br>Cost: ~₹${cost}/month` }; }
    },
    {
        id: 'domain-cost', name: 'Domain Cost Calculator', icon: '🔗', category: 'Digital & Tech', description: 'Domain pricing estimate',
        fields: [{ id: 'tld', label: 'Domain Extension', type: 'select', options: ['.com', '.in', '.org', '.io', '.co', '.tech'] }, { id: 'years', label: 'Years', type: 'number', placeholder: '2' }],
        calculate: (v) => { const prices = { '.com': 1000, '.in': 500, '.org': 1200, '.io': 3500, '.co': 2500, '.tech': 3000 }; const annual = prices[v.tld]; const total = annual * parseFloat(v.years); return { result: '₹' + total, details: `${v.tld}: ₹${annual}/year<br>${v.years} years: ₹${total}` }; }
    },
    {
        id: 'api-usage', name: 'API Usage Cost Calculator', icon: '🔌', category: 'Digital & Tech', description: 'Estimate API costs',
        fields: [{ id: 'calls', label: 'Monthly API Calls', type: 'number', placeholder: '100000' }, { id: 'costPer', label: 'Cost per 1000 calls (₹)', type: 'number', placeholder: '1' }],
        calculate: (v) => { const calls = parseFloat(v.calls), rate = parseFloat(v.costPer); const cost = (calls / 1000) * rate; return { result: '₹' + cost.toFixed(0), details: `Calls: ${calls.toLocaleString()}<br>Rate: ₹${rate}/1000<br>Cost: ₹${cost.toFixed(0)}` }; }
    },
    {
        id: 'saas-pricing', name: 'SaaS Pricing Calculator', icon: '💳', category: 'Digital & Tech', description: 'Calculate SaaS costs',
        fields: [{ id: 'users', label: 'Number of Users', type: 'number', placeholder: '10' }, { id: 'perUser', label: 'Price per User (₹)', type: 'number', placeholder: '500' }, { id: 'billing', label: 'Billing', type: 'select', options: ['Monthly', 'Annual (20% off)'] }],
        calculate: (v) => { const users = parseFloat(v.users), price = parseFloat(v.perUser); let monthly = users * price; if (v.billing === 'Annual (20% off)') monthly *= 0.8; const annual = monthly * 12; return { result: '₹' + monthly.toFixed(0) + '/month', details: `Users: ${users}<br>Monthly: ₹${monthly.toFixed(0)}<br>Annual: ₹${annual.toLocaleString()}` }; }
    },
    {
        id: 'subscription-savings', name: 'Subscription Savings Calculator', icon: '💰', category: 'Digital & Tech', description: 'Annual vs monthly savings',
        fields: [{ id: 'monthly', label: 'Monthly Price (₹)', type: 'number', placeholder: '999' }, { id: 'annual', label: 'Annual Price (₹)', type: 'number', placeholder: '9999' }],
        calculate: (v) => { const monthly = parseFloat(v.monthly) * 12, annual = parseFloat(v.annual); const savings = monthly - annual; const pct = (savings / monthly) * 100; return { result: 'Save ₹' + savings.toFixed(0), details: `Monthly plan: ₹${monthly}/year<br>Annual plan: ₹${annual}/year<br>Savings: ₹${savings} (${pct.toFixed(0)}%)` }; }
    },
    {
        id: 'ads-roi', name: 'Online Ads ROI Calculator', icon: '📈', category: 'Digital & Tech', description: 'Calculate advertising ROI',
        fields: [{ id: 'spend', label: 'Ad Spend (₹)', type: 'number', placeholder: '50000' }, { id: 'revenue', label: 'Revenue Generated (₹)', type: 'number', placeholder: '150000' }],
        calculate: (v) => { const spend = parseFloat(v.spend), revenue = parseFloat(v.revenue); const profit = revenue - spend; const roi = (profit / spend) * 100; return { result: roi.toFixed(0) + '% ROI', details: `Spend: ₹${spend.toLocaleString()}<br>Revenue: ₹${revenue.toLocaleString()}<br>Profit: ₹${profit.toLocaleString()}<br>ROI: ${roi.toFixed(0)}%` }; }
    },
    {
        id: 'cpc-calc', name: 'CPC Calculator', icon: '👆', category: 'Digital & Tech', description: 'Cost per Click',
        fields: [{ id: 'spend', label: 'Total Spend (₹)', type: 'number', placeholder: '10000' }, { id: 'clicks', label: 'Total Clicks', type: 'number', placeholder: '500' }],
        calculate: (v) => { const spend = parseFloat(v.spend), clicks = parseFloat(v.clicks); const cpc = spend / clicks; return { result: '₹' + cpc.toFixed(2) + ' CPC', details: `Spend: ₹${spend.toLocaleString()}<br>Clicks: ${clicks.toLocaleString()}<br>CPC: ₹${cpc.toFixed(2)}` }; }
    },
    {
        id: 'cpm-calc', name: 'CPM Calculator', icon: '👁️', category: 'Digital & Tech', description: 'Cost per 1000 Impressions',
        fields: [{ id: 'spend', label: 'Total Spend (₹)', type: 'number', placeholder: '10000' }, { id: 'impressions', label: 'Impressions', type: 'number', placeholder: '500000' }],
        calculate: (v) => { const spend = parseFloat(v.spend), imp = parseFloat(v.impressions); const cpm = (spend / imp) * 1000; return { result: '₹' + cpm.toFixed(2) + ' CPM', details: `Spend: ₹${spend.toLocaleString()}<br>Impressions: ${imp.toLocaleString()}<br>CPM: ₹${cpm.toFixed(2)}` }; }
    },
    {
        id: 'ctr-calc', name: 'CTR Calculator', icon: '📊', category: 'Digital & Tech', description: 'Click Through Rate',
        fields: [{ id: 'clicks', label: 'Clicks', type: 'number', placeholder: '500' }, { id: 'impressions', label: 'Impressions', type: 'number', placeholder: '50000' }],
        calculate: (v) => { const clicks = parseFloat(v.clicks), imp = parseFloat(v.impressions); const ctr = (clicks / imp) * 100; return { result: ctr.toFixed(2) + '% CTR', details: `Clicks: ${clicks.toLocaleString()}<br>Impressions: ${imp.toLocaleString()}<br>CTR: ${ctr.toFixed(2)}%` }; }
    },
    {
        id: 'conversion-rate', name: 'Conversion Rate Calculator', icon: '🎯', category: 'Digital & Tech', description: 'Calculate conversion rate',
        fields: [{ id: 'conversions', label: 'Conversions', type: 'number', placeholder: '50' }, { id: 'visitors', label: 'Total Visitors', type: 'number', placeholder: '2000' }],
        calculate: (v) => { const conv = parseFloat(v.conversions), visitors = parseFloat(v.visitors); const rate = (conv / visitors) * 100; return { result: rate.toFixed(2) + '%', details: `Conversions: ${conv}<br>Visitors: ${visitors.toLocaleString()}<br>Rate: ${rate.toFixed(2)}%` }; }
    },
    {
        id: 'email-roi', name: 'Email Campaign ROI', icon: '📧', category: 'Digital & Tech', description: 'Email marketing ROI',
        fields: [{ id: 'sent', label: 'Emails Sent', type: 'number', placeholder: '10000' }, { id: 'opens', label: 'Opens', type: 'number', placeholder: '2000' }, { id: 'clicks', label: 'Clicks', type: 'number', placeholder: '200' }, { id: 'revenue', label: 'Revenue (₹)', type: 'number', placeholder: '50000' }, { id: 'cost', label: 'Cost (₹)', type: 'number', placeholder: '5000' }],
        calculate: (v) => { const sent = parseFloat(v.sent), opens = parseFloat(v.opens), clicks = parseFloat(v.clicks), rev = parseFloat(v.revenue), cost = parseFloat(v.cost); const openRate = (opens / sent) * 100, ctr = (clicks / opens) * 100, roi = ((rev - cost) / cost) * 100; return { result: roi.toFixed(0) + '% ROI', details: `Open Rate: ${openRate.toFixed(1)}%<br>CTR: ${ctr.toFixed(1)}%<br>ROI: ${roi.toFixed(0)}%` }; }
    },
    {
        id: 'social-engagement', name: 'Social Engagement Calculator', icon: '📱', category: 'Digital & Tech', description: 'Engagement rate',
        fields: [{ id: 'followers', label: 'Followers', type: 'number', placeholder: '10000' }, { id: 'likes', label: 'Likes', type: 'number', placeholder: '500' }, { id: 'comments', label: 'Comments', type: 'number', placeholder: '50' }, { id: 'shares', label: 'Shares', type: 'number', placeholder: '20' }],
        calculate: (v) => { const followers = parseFloat(v.followers), engagement = parseFloat(v.likes) + parseFloat(v.comments) + parseFloat(v.shares); const rate = (engagement / followers) * 100; return { result: rate.toFixed(2) + '%', details: `Total Engagement: ${engagement}<br>Rate: ${rate.toFixed(2)}%<br>${rate > 3 ? '✅ Good!' : '⚠️ Below average'}` }; }
    },
    {
        id: 'influencer-pricing', name: 'Influencer Pricing Calculator', icon: '⭐', category: 'Digital & Tech', description: 'Estimate influencer rates',
        fields: [{ id: 'followers', label: 'Followers', type: 'number', placeholder: '100000' }, { id: 'engagement', label: 'Engagement Rate (%)', type: 'number', placeholder: '3' }, { id: 'platform', label: 'Platform', type: 'select', options: ['Instagram', 'YouTube', 'Twitter', 'LinkedIn'] }],
        calculate: (v) => { const followers = parseFloat(v.followers), eng = parseFloat(v.engagement); const base = { Instagram: 0.01, YouTube: 0.02, Twitter: 0.005, LinkedIn: 0.015 }; const rate = followers * base[v.platform] * (eng / 2); return { result: '₹' + rate.toFixed(0) + '/post', details: `${(followers / 1000).toFixed(0)}K followers<br>Engagement: ${eng}%<br>Est. Rate: ₹${rate.toFixed(0)}/post` }; }
    },
    {
        id: 'youtube-earnings', name: 'YouTube Earnings Calculator', icon: '▶️', category: 'Digital & Tech', description: 'Estimate YouTube revenue',
        fields: [{ id: 'views', label: 'Monthly Views', type: 'number', placeholder: '100000' }, { id: 'cpm', label: 'CPM (₹)', type: 'number', placeholder: '30' }],
        calculate: (v) => { const views = parseFloat(v.views), cpm = parseFloat(v.cpm); const earnings = (views / 1000) * cpm; return { result: '₹' + earnings.toFixed(0) + '/month', details: `Views: ${views.toLocaleString()}<br>CPM: ₹${cpm}<br>Earnings: ~₹${earnings.toFixed(0)}/month` }; }
    },
    {
        id: 'instagram-earnings', name: 'Instagram Earnings Calculator', icon: '📸', category: 'Digital & Tech', description: 'Estimate IG revenue',
        fields: [{ id: 'followers', label: 'Followers', type: 'number', placeholder: '50000' }, { id: 'posts', label: 'Sponsored Posts/Month', type: 'number', placeholder: '4' }],
        calculate: (v) => { const followers = parseFloat(v.followers), posts = parseFloat(v.posts); const perPost = followers * 0.01; const monthly = perPost * posts; return { result: '₹' + monthly.toFixed(0) + '/month', details: `Rate: ~₹${perPost.toFixed(0)}/post<br>Posts: ${posts}/month<br>Earnings: ~₹${monthly.toFixed(0)}` }; }
    },
    {
        id: 'website-monetization', name: 'Website Monetization Calculator', icon: '💵', category: 'Digital & Tech', description: 'Estimate ad revenue',
        fields: [{ id: 'pageviews', label: 'Monthly Pageviews', type: 'number', placeholder: '100000' }, { id: 'cpm', label: 'Ad CPM (₹)', type: 'number', placeholder: '20' }, { id: 'fillRate', label: 'Fill Rate (%)', type: 'number', placeholder: '80' }],
        calculate: (v) => { const pv = parseFloat(v.pageviews), cpm = parseFloat(v.cpm), fill = parseFloat(v.fillRate) / 100; const revenue = (pv / 1000) * cpm * fill; return { result: '₹' + revenue.toFixed(0) + '/month', details: `Pageviews: ${pv.toLocaleString()}<br>CPM: ₹${cpm}<br>Revenue: ~₹${revenue.toFixed(0)}` }; }
    },
    {
        id: 'app-revenue', name: 'App Revenue Calculator', icon: '📱', category: 'Digital & Tech', description: 'Estimate app earnings',
        fields: [{ id: 'downloads', label: 'Monthly Downloads', type: 'number', placeholder: '10000' }, { id: 'monetization', label: 'Monetization', type: 'select', options: ['Paid ($2)', 'Freemium (2%)', 'Ads (CPM $1)', 'Subscription (5%)'] }],
        calculate: (v) => { const downloads = parseFloat(v.downloads); let revenue; const conv = (v.monetization.match(/\d+/) || [1])[0]; if (v.monetization.includes('Paid')) revenue = downloads * 2 * 70; else if (v.monetization.includes('Freemium')) revenue = downloads * 0.02 * 100 * 70; else if (v.monetization.includes('Ads')) revenue = downloads * 30 * 1 / 1000 * 70; else revenue = downloads * 0.05 * 100 * 70; return { result: '₹' + revenue.toFixed(0) + '/month', details: `Downloads: ${downloads.toLocaleString()}<br>Model: ${v.monetization}<br>Est Revenue: ~₹${revenue.toFixed(0)}` }; }
    }
];
if (typeof window !== 'undefined') window.digitalCalculators = digitalCalculators;
