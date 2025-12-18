// ================================================
// Finance & Money Calculators (31-70)
// ================================================

const financeCalculators = [
    {
        id: 'emi-calculator',
        name: 'EMI Calculator',
        icon: '💳',
        category: 'Finance & Money',
        description: 'Calculate monthly EMI for loans',
        fields: [
            { id: 'principal', label: 'Loan Amount (₹)', type: 'number', placeholder: 'e.g., 500000' },
            { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', placeholder: 'e.g., 10', step: '0.1' },
            { id: 'tenure', label: 'Loan Tenure (months)', type: 'number', placeholder: 'e.g., 36' }
        ],
        calculate: (values) => {
            const P = parseFloat(values.principal);
            const r = parseFloat(values.rate) / 12 / 100;
            const n = parseFloat(values.tenure);
            const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
            const totalPayment = emi * n;
            const totalInterest = totalPayment - P;
            return {
                result: '₹' + emi.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Principal: ₹${P.toLocaleString()}<br>Total Interest: ₹${totalInterest.toFixed(0).toLocaleString()}<br>Total Payment: ₹${totalPayment.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'home-loan-emi',
        name: 'Home Loan EMI',
        icon: '🏠',
        category: 'Finance & Money',
        description: 'Calculate home loan EMI',
        fields: [
            { id: 'principal', label: 'Loan Amount (₹)', type: 'number', placeholder: 'e.g., 5000000' },
            { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'number', placeholder: 'e.g., 8.5', step: '0.1' },
            { id: 'tenure', label: 'Tenure (years)', type: 'number', placeholder: 'e.g., 20' }
        ],
        calculate: (values) => {
            const P = parseFloat(values.principal);
            const r = parseFloat(values.rate) / 12 / 100;
            const n = parseFloat(values.tenure) * 12;
            const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
            const totalPayment = emi * n;
            const totalInterest = totalPayment - P;
            return {
                result: '₹' + emi.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '/month',
                details: `Principal: ₹${P.toLocaleString()}<br>Total Interest: ₹${totalInterest.toFixed(0).toLocaleString()}<br>Total Payment: ₹${totalPayment.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'car-loan-emi',
        name: 'Car Loan EMI',
        icon: '🚗',
        category: 'Finance & Money',
        description: 'Calculate car loan EMI',
        fields: [
            { id: 'carPrice', label: 'Car Price (₹)', type: 'number', placeholder: 'e.g., 800000' },
            { id: 'downPayment', label: 'Down Payment (₹)', type: 'number', placeholder: 'e.g., 200000' },
            { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'number', placeholder: 'e.g., 9', step: '0.1' },
            { id: 'tenure', label: 'Tenure (years)', type: 'number', placeholder: 'e.g., 5' }
        ],
        calculate: (values) => {
            const P = parseFloat(values.carPrice) - parseFloat(values.downPayment);
            const r = parseFloat(values.rate) / 12 / 100;
            const n = parseFloat(values.tenure) * 12;
            const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
            const totalPayment = emi * n + parseFloat(values.downPayment);
            const totalInterest = emi * n - P;
            return {
                result: '₹' + emi.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '/month',
                details: `Loan Amount: ₹${P.toLocaleString()}<br>Monthly EMI: ₹${emi.toFixed(0).toLocaleString()}<br>Total Interest: ₹${totalInterest.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'personal-loan-emi',
        name: 'Personal Loan EMI',
        icon: '👤',
        category: 'Finance & Money',
        description: 'Calculate personal loan EMI',
        fields: [
            { id: 'principal', label: 'Loan Amount (₹)', type: 'number', placeholder: 'e.g., 300000' },
            { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'number', placeholder: 'e.g., 12', step: '0.1' },
            { id: 'tenure', label: 'Tenure (months)', type: 'number', placeholder: 'e.g., 24' }
        ],
        calculate: (values) => {
            const P = parseFloat(values.principal);
            const r = parseFloat(values.rate) / 12 / 100;
            const n = parseFloat(values.tenure);
            const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
            const totalPayment = emi * n;
            const totalInterest = totalPayment - P;
            return {
                result: '₹' + emi.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '/month',
                details: `Principal: ₹${P.toLocaleString()}<br>Total Interest: ₹${totalInterest.toFixed(0).toLocaleString()}<br>Total Payment: ₹${totalPayment.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'loan-interest',
        name: 'Loan Interest Calculator',
        icon: '📈',
        category: 'Finance & Money',
        description: 'Calculate total interest on loan',
        fields: [
            { id: 'principal', label: 'Principal Amount (₹)', type: 'number', placeholder: 'e.g., 100000' },
            { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: 'e.g., 10', step: '0.1' },
            { id: 'time', label: 'Time Period (years)', type: 'number', placeholder: 'e.g., 2' },
            { id: 'type', label: 'Interest Type', type: 'select', options: ['Simple', 'Compound'] }
        ],
        calculate: (values) => {
            const P = parseFloat(values.principal);
            const r = parseFloat(values.rate) / 100;
            const t = parseFloat(values.time);
            let interest, amount;
            if (values.type === 'Simple') {
                interest = P * r * t;
                amount = P + interest;
            } else {
                amount = P * Math.pow(1 + r, t);
                interest = amount - P;
            }
            return {
                result: '₹' + interest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Principal: ₹${P.toLocaleString()}<br>Interest (${values.type}): ₹${interest.toFixed(0).toLocaleString()}<br>Total Amount: ₹${amount.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'simple-interest',
        name: 'Simple Interest',
        icon: '💰',
        category: 'Finance & Money',
        description: 'Calculate simple interest',
        fields: [
            { id: 'principal', label: 'Principal (₹)', type: 'number', placeholder: 'e.g., 100000' },
            { id: 'rate', label: 'Rate of Interest (%)', type: 'number', placeholder: 'e.g., 8', step: '0.1' },
            { id: 'time', label: 'Time (years)', type: 'number', placeholder: 'e.g., 3' }
        ],
        calculate: (values) => {
            const P = parseFloat(values.principal);
            const R = parseFloat(values.rate);
            const T = parseFloat(values.time);
            const SI = (P * R * T) / 100;
            const total = P + SI;
            return {
                result: '₹' + SI.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Formula: SI = (P × R × T) / 100<br>SI = (${P} × ${R} × ${T}) / 100<br>Interest: ₹${SI.toFixed(2)}<br>Total Amount: ₹${total.toFixed(2)}`
            };
        }
    },
    {
        id: 'compound-interest',
        name: 'Compound Interest',
        icon: '📊',
        category: 'Finance & Money',
        description: 'Calculate compound interest',
        fields: [
            { id: 'principal', label: 'Principal (₹)', type: 'number', placeholder: 'e.g., 100000' },
            { id: 'rate', label: 'Rate of Interest (%)', type: 'number', placeholder: 'e.g., 8', step: '0.1' },
            { id: 'time', label: 'Time (years)', type: 'number', placeholder: 'e.g., 3' },
            { id: 'frequency', label: 'Compounding Frequency', type: 'select', options: ['Annually', 'Semi-Annually', 'Quarterly', 'Monthly'] }
        ],
        calculate: (values) => {
            const P = parseFloat(values.principal);
            const r = parseFloat(values.rate) / 100;
            const t = parseFloat(values.time);
            const n = { 'Annually': 1, 'Semi-Annually': 2, 'Quarterly': 4, 'Monthly': 12 }[values.frequency];
            const A = P * Math.pow(1 + r / n, n * t);
            const CI = A - P;
            return {
                result: '₹' + CI.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Compounding: ${values.frequency}<br>Compound Interest: ₹${CI.toFixed(2)}<br>Total Amount: ₹${A.toFixed(2)}`
            };
        }
    },
    {
        id: 'sip-calculator',
        name: 'SIP Calculator',
        icon: '📈',
        category: 'Finance & Money',
        description: 'Calculate SIP returns',
        fields: [
            { id: 'monthly', label: 'Monthly Investment (₹)', type: 'number', placeholder: 'e.g., 5000' },
            { id: 'rate', label: 'Expected Return (% p.a.)', type: 'number', placeholder: 'e.g., 12', step: '0.1' },
            { id: 'years', label: 'Investment Period (years)', type: 'number', placeholder: 'e.g., 10' }
        ],
        calculate: (values) => {
            const P = parseFloat(values.monthly);
            const r = parseFloat(values.rate) / 12 / 100;
            const n = parseFloat(values.years) * 12;
            const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
            const invested = P * n;
            const returns = FV - invested;
            return {
                result: '₹' + FV.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Total Invested: ₹${invested.toLocaleString()}<br>Estimated Returns: ₹${returns.toFixed(0).toLocaleString()}<br>Total Value: ₹${FV.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'lumpsum-calculator',
        name: 'Lumpsum Investment Calculator',
        icon: '💎',
        category: 'Finance & Money',
        description: 'Calculate lumpsum investment returns',
        fields: [
            { id: 'amount', label: 'Investment Amount (₹)', type: 'number', placeholder: 'e.g., 500000' },
            { id: 'rate', label: 'Expected Return (% p.a.)', type: 'number', placeholder: 'e.g., 12', step: '0.1' },
            { id: 'years', label: 'Investment Period (years)', type: 'number', placeholder: 'e.g., 10' }
        ],
        calculate: (values) => {
            const P = parseFloat(values.amount);
            const r = parseFloat(values.rate) / 100;
            const t = parseFloat(values.years);
            const FV = P * Math.pow(1 + r, t);
            const returns = FV - P;
            return {
                result: '₹' + FV.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Invested: ₹${P.toLocaleString()}<br>Returns: ₹${returns.toFixed(0).toLocaleString()}<br>Final Value: ₹${FV.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'mutual-fund-return',
        name: 'Mutual Fund Return Calculator',
        icon: '📊',
        category: 'Finance & Money',
        description: 'Calculate mutual fund returns',
        fields: [
            { id: 'invested', label: 'Initial Investment (₹)', type: 'number', placeholder: 'e.g., 100000' },
            { id: 'currentValue', label: 'Current Value (₹)', type: 'number', placeholder: 'e.g., 150000' },
            { id: 'years', label: 'Holding Period (years)', type: 'number', placeholder: 'e.g., 3' }
        ],
        calculate: (values) => {
            const invested = parseFloat(values.invested);
            const current = parseFloat(values.currentValue);
            const years = parseFloat(values.years);
            const absoluteReturn = ((current - invested) / invested) * 100;
            const cagr = (Math.pow(current / invested, 1 / years) - 1) * 100;
            return {
                result: cagr.toFixed(2) + '% CAGR',
                details: `Invested: ₹${invested.toLocaleString()}<br>Current Value: ₹${current.toLocaleString()}<br>Absolute Return: ${absoluteReturn.toFixed(2)}%<br>CAGR: ${cagr.toFixed(2)}%`
            };
        }
    },
    {
        id: 'fd-maturity',
        name: 'FD Maturity Calculator',
        icon: '🏦',
        category: 'Finance & Money',
        description: 'Calculate Fixed Deposit maturity amount',
        fields: [
            { id: 'principal', label: 'Principal Amount (₹)', type: 'number', placeholder: 'e.g., 100000' },
            { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'number', placeholder: 'e.g., 7', step: '0.1' },
            { id: 'tenure', label: 'Tenure (months)', type: 'number', placeholder: 'e.g., 12' },
            { id: 'frequency', label: 'Compounding', type: 'select', options: ['Quarterly', 'Monthly', 'Annually'] }
        ],
        calculate: (values) => {
            const P = parseFloat(values.principal);
            const r = parseFloat(values.rate) / 100;
            const t = parseFloat(values.tenure) / 12;
            const n = { 'Quarterly': 4, 'Monthly': 12, 'Annually': 1 }[values.frequency];
            const A = P * Math.pow(1 + r / n, n * t);
            const interest = A - P;
            return {
                result: '₹' + A.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Principal: ₹${P.toLocaleString()}<br>Interest Earned: ₹${interest.toFixed(0).toLocaleString()}<br>Maturity Amount: ₹${A.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'rd-maturity',
        name: 'RD Maturity Calculator',
        icon: '🏧',
        category: 'Finance & Money',
        description: 'Calculate Recurring Deposit maturity',
        fields: [
            { id: 'monthly', label: 'Monthly Deposit (₹)', type: 'number', placeholder: 'e.g., 5000' },
            { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'number', placeholder: 'e.g., 7', step: '0.1' },
            { id: 'tenure', label: 'Tenure (months)', type: 'number', placeholder: 'e.g., 24' }
        ],
        calculate: (values) => {
            const P = parseFloat(values.monthly);
            const r = parseFloat(values.rate) / 400; // Quarterly compounding
            const n = parseFloat(values.tenure);
            const maturity = P * ((Math.pow(1 + r, n) - 1) / (1 - Math.pow(1 + r, -1 / 3)));
            const totalDeposit = P * n;
            const interest = maturity - totalDeposit;
            return {
                result: '₹' + maturity.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Total Deposits: ₹${totalDeposit.toLocaleString()}<br>Interest Earned: ₹${interest.toFixed(0).toLocaleString()}<br>Maturity: ₹${maturity.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'savings-interest',
        name: 'Savings Interest Calculator',
        icon: '💵',
        category: 'Finance & Money',
        description: 'Calculate savings account interest',
        fields: [
            { id: 'balance', label: 'Average Monthly Balance (₹)', type: 'number', placeholder: 'e.g., 50000' },
            { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'number', placeholder: 'e.g., 4', step: '0.1' }
        ],
        calculate: (values) => {
            const balance = parseFloat(values.balance);
            const rate = parseFloat(values.rate) / 100;
            const monthlyInterest = (balance * rate) / 12;
            const yearlyInterest = balance * rate;
            return {
                result: '₹' + monthlyInterest.toFixed(2) + '/month',
                details: `Monthly Interest: ₹${monthlyInterest.toFixed(2)}<br>Yearly Interest: ₹${yearlyInterest.toFixed(2)}`
            };
        }
    },
    {
        id: 'salary-calculator',
        name: 'Salary Calculator',
        icon: '💼',
        category: 'Finance & Money',
        description: 'Calculate annual/monthly salary',
        fields: [
            { id: 'amount', label: 'Salary Amount (₹)', type: 'number', placeholder: 'e.g., 50000' },
            { id: 'type', label: 'Input Type', type: 'select', options: ['Monthly', 'Annual'] }
        ],
        calculate: (values) => {
            const amount = parseFloat(values.amount);
            const monthly = values.type === 'Monthly' ? amount : amount / 12;
            const annual = values.type === 'Annual' ? amount : amount * 12;
            const weekly = annual / 52;
            const daily = annual / 365;
            return {
                result: '₹' + annual.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '/year',
                details: `Annual: ₹${annual.toLocaleString()}<br>Monthly: ₹${monthly.toFixed(0).toLocaleString()}<br>Weekly: ₹${weekly.toFixed(0).toLocaleString()}<br>Daily: ₹${daily.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'inhand-salary',
        name: 'In-Hand Salary Calculator',
        icon: '🤝',
        category: 'Finance & Money',
        description: 'Calculate take-home salary',
        fields: [
            { id: 'gross', label: 'Gross Salary (₹/month)', type: 'number', placeholder: 'e.g., 80000' },
            { id: 'pf', label: 'PF Contribution (%)', type: 'number', placeholder: 'e.g., 12' },
            { id: 'tax', label: 'Income Tax (₹/month)', type: 'number', placeholder: 'e.g., 5000' },
            { id: 'otherDeductions', label: 'Other Deductions (₹)', type: 'number', placeholder: 'e.g., 1000' }
        ],
        calculate: (values) => {
            const gross = parseFloat(values.gross);
            const pfPercent = parseFloat(values.pf) / 100;
            const pf = gross * pfPercent;
            const tax = parseFloat(values.tax);
            const others = parseFloat(values.otherDeductions);
            const totalDeductions = pf + tax + others;
            const inHand = gross - totalDeductions;
            return {
                result: '₹' + inHand.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Gross: ₹${gross.toLocaleString()}<br>PF: ₹${pf.toFixed(0).toLocaleString()}<br>Tax: ₹${tax.toLocaleString()}<br>Others: ₹${others.toLocaleString()}<br>In-Hand: ₹${inHand.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'taxable-income',
        name: 'Taxable Income Calculator',
        icon: '📋',
        category: 'Finance & Money',
        description: 'Calculate taxable income after deductions',
        fields: [
            { id: 'gross', label: 'Gross Annual Income (₹)', type: 'number', placeholder: 'e.g., 1200000' },
            { id: 'section80c', label: '80C Deductions (₹)', type: 'number', placeholder: 'e.g., 150000' },
            { id: 'hra', label: 'HRA Exemption (₹)', type: 'number', placeholder: 'e.g., 100000' },
            { id: 'other', label: 'Other Deductions (₹)', type: 'number', placeholder: 'e.g., 50000' }
        ],
        calculate: (values) => {
            const gross = parseFloat(values.gross);
            const s80c = Math.min(parseFloat(values.section80c), 150000);
            const hra = parseFloat(values.hra);
            const other = parseFloat(values.other);
            const standardDeduction = 50000;
            const totalDeductions = s80c + hra + other + standardDeduction;
            const taxable = Math.max(0, gross - totalDeductions);
            return {
                result: '₹' + taxable.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Gross Income: ₹${gross.toLocaleString()}<br>80C: ₹${s80c.toLocaleString()}<br>HRA: ₹${hra.toLocaleString()}<br>Standard Deduction: ₹${standardDeduction.toLocaleString()}<br>Taxable Income: ₹${taxable.toLocaleString()}`
            };
        }
    },
    {
        id: 'income-tax',
        name: 'Income Tax Calculator',
        icon: '🏛️',
        category: 'Finance & Money',
        description: 'Calculate income tax (New Regime FY 2024-25)',
        fields: [
            { id: 'income', label: 'Taxable Income (₹)', type: 'number', placeholder: 'e.g., 1000000' }
        ],
        calculate: (values) => {
            const income = parseFloat(values.income);
            let tax = 0;
            // New tax regime FY 2024-25
            if (income <= 300000) tax = 0;
            else if (income <= 700000) tax = (income - 300000) * 0.05;
            else if (income <= 1000000) tax = 20000 + (income - 700000) * 0.10;
            else if (income <= 1200000) tax = 50000 + (income - 1000000) * 0.15;
            else if (income <= 1500000) tax = 80000 + (income - 1200000) * 0.20;
            else tax = 140000 + (income - 1500000) * 0.30;
            const cess = tax * 0.04;
            const totalTax = tax + cess;
            return {
                result: '₹' + totalTax.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Income: ₹${income.toLocaleString()}<br>Tax: ₹${tax.toFixed(0).toLocaleString()}<br>Cess (4%): ₹${cess.toFixed(0).toLocaleString()}<br>Total Tax: ₹${totalTax.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'gst-calculator',
        name: 'GST Calculator',
        icon: '🧾',
        category: 'Finance & Money',
        description: 'Calculate GST amount',
        fields: [
            { id: 'amount', label: 'Amount (₹)', type: 'number', placeholder: 'e.g., 10000' },
            { id: 'rate', label: 'GST Rate (%)', type: 'select', options: ['5', '12', '18', '28'] },
            { id: 'type', label: 'Amount Type', type: 'select', options: ['Exclusive (Add GST)', 'Inclusive (Extract GST)'] }
        ],
        calculate: (values) => {
            const amount = parseFloat(values.amount);
            const rate = parseFloat(values.rate);
            let gst, net, total;
            if (values.type.includes('Exclusive')) {
                gst = (amount * rate) / 100;
                net = amount;
                total = amount + gst;
            } else {
                total = amount;
                net = (amount * 100) / (100 + rate);
                gst = total - net;
            }
            return {
                result: 'GST: ₹' + gst.toFixed(2),
                details: `Net Amount: ₹${net.toFixed(2)}<br>GST (${rate}%): ₹${gst.toFixed(2)}<br>Total: ₹${total.toFixed(2)}`
            };
        }
    },
    {
        id: 'gst-inclusive',
        name: 'GST Inclusive Price',
        icon: '➕',
        category: 'Finance & Money',
        description: 'Calculate price after adding GST',
        fields: [
            { id: 'amount', label: 'Base Amount (₹)', type: 'number', placeholder: 'e.g., 1000' },
            { id: 'rate', label: 'GST Rate (%)', type: 'number', placeholder: 'e.g., 18' }
        ],
        calculate: (values) => {
            const amount = parseFloat(values.amount);
            const rate = parseFloat(values.rate);
            const gst = (amount * rate) / 100;
            const total = amount + gst;
            return {
                result: '₹' + total.toFixed(2),
                details: `Base: ₹${amount.toFixed(2)}<br>GST (${rate}%): ₹${gst.toFixed(2)}<br>Total: ₹${total.toFixed(2)}`
            };
        }
    },
    {
        id: 'gst-exclusive',
        name: 'GST Exclusive Price',
        icon: '➖',
        category: 'Finance & Money',
        description: 'Extract GST from inclusive price',
        fields: [
            { id: 'amount', label: 'Total Amount (₹)', type: 'number', placeholder: 'e.g., 1180' },
            { id: 'rate', label: 'GST Rate (%)', type: 'number', placeholder: 'e.g., 18' }
        ],
        calculate: (values) => {
            const total = parseFloat(values.amount);
            const rate = parseFloat(values.rate);
            const base = (total * 100) / (100 + rate);
            const gst = total - base;
            return {
                result: 'Base: ₹' + base.toFixed(2),
                details: `Total: ₹${total.toFixed(2)}<br>GST (${rate}%): ₹${gst.toFixed(2)}<br>Base Amount: ₹${base.toFixed(2)}`
            };
        }
    },
    {
        id: 'discount-calculator',
        name: 'Discount Calculator',
        icon: '🏷️',
        category: 'Finance & Money',
        description: 'Calculate discount and final price',
        fields: [
            { id: 'originalPrice', label: 'Original Price (₹)', type: 'number', placeholder: 'e.g., 2000' },
            { id: 'discountPercent', label: 'Discount (%)', type: 'number', placeholder: 'e.g., 25' }
        ],
        calculate: (values) => {
            const original = parseFloat(values.originalPrice);
            const percent = parseFloat(values.discountPercent);
            const discount = (original * percent) / 100;
            const final = original - discount;
            return {
                result: '₹' + final.toFixed(2) + ' (Save ₹' + discount.toFixed(2) + ')',
                details: `Original: ₹${original.toFixed(2)}<br>Discount (${percent}%): ₹${discount.toFixed(2)}<br>Final Price: ₹${final.toFixed(2)}`
            };
        }
    },
    {
        id: 'profit-calculator',
        name: 'Profit Calculator',
        icon: '📈',
        category: 'Finance & Money',
        description: 'Calculate profit and profit percentage',
        fields: [
            { id: 'costPrice', label: 'Cost Price (₹)', type: 'number', placeholder: 'e.g., 800' },
            { id: 'sellingPrice', label: 'Selling Price (₹)', type: 'number', placeholder: 'e.g., 1000' }
        ],
        calculate: (values) => {
            const cp = parseFloat(values.costPrice);
            const sp = parseFloat(values.sellingPrice);
            const profit = sp - cp;
            const profitPercent = (profit / cp) * 100;
            return {
                result: '₹' + profit.toFixed(2) + ' (' + profitPercent.toFixed(2) + '%)',
                details: `Cost Price: ₹${cp.toFixed(2)}<br>Selling Price: ₹${sp.toFixed(2)}<br>Profit: ₹${profit.toFixed(2)}<br>Profit %: ${profitPercent.toFixed(2)}%`
            };
        }
    },
    {
        id: 'loss-calculator',
        name: 'Loss Calculator',
        icon: '📉',
        category: 'Finance & Money',
        description: 'Calculate loss and loss percentage',
        fields: [
            { id: 'costPrice', label: 'Cost Price (₹)', type: 'number', placeholder: 'e.g., 1000' },
            { id: 'sellingPrice', label: 'Selling Price (₹)', type: 'number', placeholder: 'e.g., 800' }
        ],
        calculate: (values) => {
            const cp = parseFloat(values.costPrice);
            const sp = parseFloat(values.sellingPrice);
            const loss = cp - sp;
            const lossPercent = (loss / cp) * 100;
            return {
                result: '₹' + loss.toFixed(2) + ' (' + lossPercent.toFixed(2) + '% loss)',
                details: `Cost Price: ₹${cp.toFixed(2)}<br>Selling Price: ₹${sp.toFixed(2)}<br>Loss: ₹${loss.toFixed(2)}<br>Loss %: ${lossPercent.toFixed(2)}%`
            };
        }
    },
    {
        id: 'profit-margin',
        name: 'Profit Margin Calculator',
        icon: '💹',
        category: 'Finance & Money',
        description: 'Calculate profit margin percentage',
        fields: [
            { id: 'revenue', label: 'Revenue (₹)', type: 'number', placeholder: 'e.g., 100000' },
            { id: 'cost', label: 'Total Cost (₹)', type: 'number', placeholder: 'e.g., 70000' }
        ],
        calculate: (values) => {
            const revenue = parseFloat(values.revenue);
            const cost = parseFloat(values.cost);
            const profit = revenue - cost;
            const margin = (profit / revenue) * 100;
            return {
                result: margin.toFixed(2) + '% margin',
                details: `Revenue: ₹${revenue.toLocaleString()}<br>Cost: ₹${cost.toLocaleString()}<br>Profit: ₹${profit.toLocaleString()}<br>Margin: ${margin.toFixed(2)}%`
            };
        }
    },
    {
        id: 'breakeven',
        name: 'Break-even Calculator',
        icon: '⚖️',
        category: 'Finance & Money',
        description: 'Calculate break-even point',
        fields: [
            { id: 'fixedCosts', label: 'Fixed Costs (₹)', type: 'number', placeholder: 'e.g., 50000' },
            { id: 'pricePerUnit', label: 'Selling Price per Unit (₹)', type: 'number', placeholder: 'e.g., 500' },
            { id: 'costPerUnit', label: 'Variable Cost per Unit (₹)', type: 'number', placeholder: 'e.g., 300' }
        ],
        calculate: (values) => {
            const fixed = parseFloat(values.fixedCosts);
            const price = parseFloat(values.pricePerUnit);
            const variable = parseFloat(values.costPerUnit);
            const contribution = price - variable;
            const breakEvenUnits = Math.ceil(fixed / contribution);
            const breakEvenRevenue = breakEvenUnits * price;
            return {
                result: breakEvenUnits + ' units',
                details: `Fixed Costs: ₹${fixed.toLocaleString()}<br>Contribution per Unit: ₹${contribution}<br>Break-even Units: ${breakEvenUnits}<br>Break-even Revenue: ₹${breakEvenRevenue.toLocaleString()}`
            };
        }
    },
    {
        id: 'roi-calculator',
        name: 'ROI Calculator',
        icon: '📊',
        category: 'Finance & Money',
        description: 'Calculate Return on Investment',
        fields: [
            { id: 'investment', label: 'Initial Investment (₹)', type: 'number', placeholder: 'e.g., 100000' },
            { id: 'returns', label: 'Final Value (₹)', type: 'number', placeholder: 'e.g., 150000' }
        ],
        calculate: (values) => {
            const investment = parseFloat(values.investment);
            const returns = parseFloat(values.returns);
            const profit = returns - investment;
            const roi = (profit / investment) * 100;
            return {
                result: roi.toFixed(2) + '% ROI',
                details: `Investment: ₹${investment.toLocaleString()}<br>Final Value: ₹${returns.toLocaleString()}<br>Profit: ₹${profit.toLocaleString()}<br>ROI: ${roi.toFixed(2)}%`
            };
        }
    },
    {
        id: 'inflation-calculator',
        name: 'Inflation Calculator',
        icon: '📈',
        category: 'Finance & Money',
        description: 'Calculate future value with inflation',
        fields: [
            { id: 'amount', label: 'Current Amount (₹)', type: 'number', placeholder: 'e.g., 100000' },
            { id: 'rate', label: 'Inflation Rate (%)', type: 'number', placeholder: 'e.g., 6', step: '0.1' },
            { id: 'years', label: 'Years', type: 'number', placeholder: 'e.g., 10' }
        ],
        calculate: (values) => {
            const amount = parseFloat(values.amount);
            const rate = parseFloat(values.rate) / 100;
            const years = parseFloat(values.years);
            const futureValue = amount * Math.pow(1 + rate, years);
            const purchasingPower = amount / Math.pow(1 + rate, years);
            return {
                result: '₹' + futureValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Current Value: ₹${amount.toLocaleString()}<br>After ${years} years @ ${values.rate}% inflation:<br>Equivalent Amount: ₹${futureValue.toFixed(0).toLocaleString()}<br>Purchasing Power: ₹${purchasingPower.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'currency-conversion',
        name: 'Currency Converter',
        icon: '💱',
        category: 'Finance & Money',
        description: 'Convert between currencies',
        fields: [
            { id: 'amount', label: 'Amount', type: 'number', placeholder: 'e.g., 1000' },
            { id: 'from', label: 'From Currency', type: 'select', options: ['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD'] },
            { id: 'to', label: 'To Currency', type: 'select', options: ['USD', 'INR', 'EUR', 'GBP', 'AED', 'SGD'] }
        ],
        calculate: (values) => {
            const rates = { INR: 1, USD: 83.5, EUR: 90.5, GBP: 106, AED: 22.7, SGD: 62 };
            const amount = parseFloat(values.amount);
            const from = values.from;
            const to = values.to;
            const inINR = amount * rates[from];
            const result = inINR / rates[to];
            return {
                result: result.toFixed(2) + ' ' + to,
                details: `${amount} ${from} = ${result.toFixed(2)} ${to}<br>(Rates are approximate)`
            };
        }
    },
    {
        id: 'net-worth',
        name: 'Net Worth Calculator',
        icon: '💎',
        category: 'Finance & Money',
        description: 'Calculate your net worth',
        fields: [
            { id: 'savings', label: 'Savings & Deposits (₹)', type: 'number', placeholder: 'e.g., 500000' },
            { id: 'investments', label: 'Investments (₹)', type: 'number', placeholder: 'e.g., 1000000' },
            { id: 'property', label: 'Property Value (₹)', type: 'number', placeholder: 'e.g., 5000000' },
            { id: 'loans', label: 'Total Loans (₹)', type: 'number', placeholder: 'e.g., 2000000' },
            { id: 'otherLiabilities', label: 'Other Liabilities (₹)', type: 'number', placeholder: 'e.g., 100000' }
        ],
        calculate: (values) => {
            const assets = parseFloat(values.savings) + parseFloat(values.investments) + parseFloat(values.property);
            const liabilities = parseFloat(values.loans) + parseFloat(values.otherLiabilities);
            const netWorth = assets - liabilities;
            return {
                result: '₹' + netWorth.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Total Assets: ₹${assets.toLocaleString()}<br>Total Liabilities: ₹${liabilities.toLocaleString()}<br>Net Worth: ₹${netWorth.toLocaleString()}`
            };
        }
    },
    {
        id: 'monthly-expense',
        name: 'Monthly Expense Calculator',
        icon: '🧾',
        category: 'Finance & Money',
        description: 'Calculate total monthly expenses',
        fields: [
            { id: 'rent', label: 'Rent/EMI (₹)', type: 'number', placeholder: 'e.g., 15000' },
            { id: 'utilities', label: 'Utilities (₹)', type: 'number', placeholder: 'e.g., 3000' },
            { id: 'food', label: 'Food & Groceries (₹)', type: 'number', placeholder: 'e.g., 8000' },
            { id: 'transport', label: 'Transport (₹)', type: 'number', placeholder: 'e.g., 3000' },
            { id: 'others', label: 'Others (₹)', type: 'number', placeholder: 'e.g., 5000' }
        ],
        calculate: (values) => {
            const total = parseFloat(values.rent) + parseFloat(values.utilities) + parseFloat(values.food) + parseFloat(values.transport) + parseFloat(values.others);
            const yearly = total * 12;
            return {
                result: '₹' + total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '/month',
                details: `Rent/EMI: ₹${parseFloat(values.rent).toLocaleString()}<br>Utilities: ₹${parseFloat(values.utilities).toLocaleString()}<br>Food: ₹${parseFloat(values.food).toLocaleString()}<br>Transport: ₹${parseFloat(values.transport).toLocaleString()}<br>Others: ₹${parseFloat(values.others).toLocaleString()}<br><br>Monthly: ₹${total.toLocaleString()}<br>Yearly: ₹${yearly.toLocaleString()}`
            };
        }
    },
    {
        id: 'budget-planner',
        name: 'Budget Planner',
        icon: '📝',
        category: 'Finance & Money',
        description: 'Plan your monthly budget (50-30-20 rule)',
        fields: [
            { id: 'income', label: 'Monthly Income (₹)', type: 'number', placeholder: 'e.g., 60000' }
        ],
        calculate: (values) => {
            const income = parseFloat(values.income);
            const needs = income * 0.50;
            const wants = income * 0.30;
            const savings = income * 0.20;
            return {
                result: '50-30-20 Budget',
                details: `Total Income: ₹${income.toLocaleString()}<br><br>Needs (50%): ₹${needs.toLocaleString()}<br>(Rent, utilities, groceries, insurance)<br><br>Wants (30%): ₹${wants.toLocaleString()}<br>(Entertainment, dining, shopping)<br><br>Savings (20%): ₹${savings.toLocaleString()}<br>(Investments, emergency fund)`
            };
        }
    },
    {
        id: 'credit-card-interest',
        name: 'Credit Card Interest Calculator',
        icon: '💳',
        category: 'Finance & Money',
        description: 'Calculate credit card interest',
        fields: [
            { id: 'balance', label: 'Outstanding Balance (₹)', type: 'number', placeholder: 'e.g., 50000' },
            { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', placeholder: 'e.g., 36', step: '0.1' },
            { id: 'minPayment', label: 'Minimum Payment (%)', type: 'number', placeholder: 'e.g., 5' }
        ],
        calculate: (values) => {
            const balance = parseFloat(values.balance);
            const rate = parseFloat(values.rate) / 100 / 12;
            const minPayPercent = parseFloat(values.minPayment) / 100;
            const monthlyInterest = balance * rate;
            const minPayment = balance * minPayPercent;
            return {
                result: '₹' + monthlyInterest.toFixed(2) + '/month interest',
                details: `Balance: ₹${balance.toLocaleString()}<br>Monthly Interest: ₹${monthlyInterest.toFixed(2)}<br>Minimum Payment: ₹${minPayment.toFixed(2)}<br><br>⚠️ Paying only minimum means most goes to interest!`
            };
        }
    },
    {
        id: 'late-fee',
        name: 'Late Fee Calculator',
        icon: '⏰',
        category: 'Finance & Money',
        description: 'Calculate late payment fees',
        fields: [
            { id: 'amount', label: 'Bill Amount (₹)', type: 'number', placeholder: 'e.g., 10000' },
            { id: 'daysLate', label: 'Days Late', type: 'number', placeholder: 'e.g., 15' },
            { id: 'feePercent', label: 'Late Fee (% per month)', type: 'number', placeholder: 'e.g., 2' }
        ],
        calculate: (values) => {
            const amount = parseFloat(values.amount);
            const days = parseFloat(values.daysLate);
            const feePercent = parseFloat(values.feePercent) / 100;
            const dailyRate = feePercent / 30;
            const lateFee = amount * dailyRate * days;
            const total = amount + lateFee;
            return {
                result: 'Late Fee: ₹' + lateFee.toFixed(2),
                details: `Original Amount: ₹${amount.toLocaleString()}<br>Days Late: ${days}<br>Late Fee: ₹${lateFee.toFixed(2)}<br>Total Payable: ₹${total.toFixed(2)}`
            };
        }
    },
    {
        id: 'stock-profit-loss',
        name: 'Stock Profit/Loss Calculator',
        icon: '📈',
        category: 'Finance & Money',
        description: 'Calculate stock trading profit/loss',
        fields: [
            { id: 'buyPrice', label: 'Buy Price (₹)', type: 'number', placeholder: 'e.g., 1500' },
            { id: 'sellPrice', label: 'Sell Price (₹)', type: 'number', placeholder: 'e.g., 1800' },
            { id: 'quantity', label: 'Quantity', type: 'number', placeholder: 'e.g., 100' },
            { id: 'brokerage', label: 'Brokerage (%)', type: 'number', placeholder: 'e.g., 0.05', step: '0.01' }
        ],
        calculate: (values) => {
            const buy = parseFloat(values.buyPrice);
            const sell = parseFloat(values.sellPrice);
            const qty = parseFloat(values.quantity);
            const brokerage = parseFloat(values.brokerage) / 100;
            const buyValue = buy * qty;
            const sellValue = sell * qty;
            const buyBrokerage = buyValue * brokerage;
            const sellBrokerage = sellValue * brokerage;
            const totalBrokerage = buyBrokerage + sellBrokerage;
            const profit = sellValue - buyValue - totalBrokerage;
            const profitPercent = (profit / buyValue) * 100;
            return {
                result: (profit >= 0 ? '📈 ' : '📉 ') + '₹' + profit.toFixed(2),
                details: `Buy Value: ₹${buyValue.toLocaleString()}<br>Sell Value: ₹${sellValue.toLocaleString()}<br>Brokerage: ₹${totalBrokerage.toFixed(2)}<br>Net P&L: ₹${profit.toFixed(2)} (${profitPercent.toFixed(2)}%)`
            };
        }
    },
    {
        id: 'dividend-calculator',
        name: 'Dividend Calculator',
        icon: '💰',
        category: 'Finance & Money',
        description: 'Calculate dividend income',
        fields: [
            { id: 'shares', label: 'Number of Shares', type: 'number', placeholder: 'e.g., 100' },
            { id: 'dividendPerShare', label: 'Dividend per Share (₹)', type: 'number', placeholder: 'e.g., 10' },
            { id: 'sharePrice', label: 'Current Share Price (₹)', type: 'number', placeholder: 'e.g., 500' }
        ],
        calculate: (values) => {
            const shares = parseFloat(values.shares);
            const dps = parseFloat(values.dividendPerShare);
            const price = parseFloat(values.sharePrice);
            const totalDividend = shares * dps;
            const investmentValue = shares * price;
            const yield_ = (dps / price) * 100;
            return {
                result: '₹' + totalDividend.toFixed(2) + ' dividend',
                details: `Investment Value: ₹${investmentValue.toLocaleString()}<br>Total Dividend: ₹${totalDividend.toFixed(2)}<br>Dividend Yield: ${yield_.toFixed(2)}%`
            };
        }
    },
    {
        id: 'gold-price',
        name: 'Gold Price Calculator',
        icon: '🥇',
        category: 'Finance & Money',
        description: 'Calculate gold value by weight',
        fields: [
            { id: 'weight', label: 'Weight (grams)', type: 'number', placeholder: 'e.g., 10' },
            { id: 'purity', label: 'Purity', type: 'select', options: ['24K (99.9%)', '22K (91.6%)', '18K (75%)'] },
            { id: 'pricePerGram', label: 'Price per gram (24K) ₹', type: 'number', placeholder: 'e.g., 6500' }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const price24k = parseFloat(values.pricePerGram);
            const purityMap = { '24K (99.9%)': 0.999, '22K (91.6%)': 0.916, '18K (75%)': 0.75 };
            const purity = purityMap[values.purity];
            const value = weight * price24k * purity;
            return {
                result: '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Weight: ${weight}g<br>Purity: ${values.purity}<br>Value: ₹${value.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'silver-price',
        name: 'Silver Price Calculator',
        icon: '🥈',
        category: 'Finance & Money',
        description: 'Calculate silver value by weight',
        fields: [
            { id: 'weight', label: 'Weight (grams)', type: 'number', placeholder: 'e.g., 100' },
            { id: 'purity', label: 'Purity', type: 'select', options: ['999 (Pure)', '925 (Sterling)', '900'] },
            { id: 'pricePerGram', label: 'Price per gram (999) ₹', type: 'number', placeholder: 'e.g., 85' }
        ],
        calculate: (values) => {
            const weight = parseFloat(values.weight);
            const price999 = parseFloat(values.pricePerGram);
            const purityMap = { '999 (Pure)': 0.999, '925 (Sterling)': 0.925, '900': 0.90 };
            const purity = purityMap[values.purity];
            const value = weight * price999 * purity;
            return {
                result: '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Weight: ${weight}g<br>Purity: ${values.purity}<br>Value: ₹${value.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'emi-affordability',
        name: 'EMI Affordability Calculator',
        icon: '🏠',
        category: 'Finance & Money',
        description: 'Calculate affordable loan amount',
        fields: [
            { id: 'income', label: 'Monthly Income (₹)', type: 'number', placeholder: 'e.g., 80000' },
            { id: 'existingEmi', label: 'Existing EMIs (₹)', type: 'number', placeholder: 'e.g., 10000' },
            { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: 'e.g., 9', step: '0.1' },
            { id: 'tenure', label: 'Loan Tenure (years)', type: 'number', placeholder: 'e.g., 20' }
        ],
        calculate: (values) => {
            const income = parseFloat(values.income);
            const existingEmi = parseFloat(values.existingEmi);
            const r = parseFloat(values.rate) / 12 / 100;
            const n = parseFloat(values.tenure) * 12;
            const maxEmi = income * 0.4 - existingEmi; // 40% of income
            const loanAmount = maxEmi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
            return {
                result: '₹' + loanAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                details: `Max EMI (40% of income): ₹${(income * 0.4).toFixed(0).toLocaleString()}<br>Available for new EMI: ₹${maxEmi.toFixed(0).toLocaleString()}<br>Affordable Loan Amount: ₹${loanAmount.toFixed(0).toLocaleString()}`
            };
        }
    },
    {
        id: 'loan-tenure',
        name: 'Loan Tenure Calculator',
        icon: '📅',
        category: 'Finance & Money',
        description: 'Calculate loan tenure from EMI',
        fields: [
            { id: 'principal', label: 'Loan Amount (₹)', type: 'number', placeholder: 'e.g., 500000' },
            { id: 'emi', label: 'Monthly EMI (₹)', type: 'number', placeholder: 'e.g., 15000' },
            { id: 'rate', label: 'Interest Rate (% p.a.)', type: 'number', placeholder: 'e.g., 10', step: '0.1' }
        ],
        calculate: (values) => {
            const P = parseFloat(values.principal);
            const emi = parseFloat(values.emi);
            const r = parseFloat(values.rate) / 12 / 100;
            const n = Math.log(emi / (emi - P * r)) / Math.log(1 + r);
            const months = Math.ceil(n);
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            return {
                result: `${years} years ${remainingMonths} months`,
                details: `Loan Amount: ₹${P.toLocaleString()}<br>EMI: ₹${emi.toLocaleString()}<br>Tenure: ${months} months (${years}y ${remainingMonths}m)`
            };
        }
    },
    {
        id: 'monthly-savings',
        name: 'Monthly Savings Calculator',
        icon: '🐷',
        category: 'Finance & Money',
        description: 'Calculate required monthly savings',
        fields: [
            { id: 'target', label: 'Savings Goal (₹)', type: 'number', placeholder: 'e.g., 1000000' },
            { id: 'years', label: 'Time Period (years)', type: 'number', placeholder: 'e.g., 5' },
            { id: 'rate', label: 'Expected Return (%)', type: 'number', placeholder: 'e.g., 10', step: '0.1' }
        ],
        calculate: (values) => {
            const target = parseFloat(values.target);
            const years = parseFloat(values.years);
            const r = parseFloat(values.rate) / 12 / 100;
            const n = years * 12;
            const monthlyRequired = target * r / ((Math.pow(1 + r, n) - 1) * (1 + r));
            const totalInvested = monthlyRequired * n;
            const returns = target - totalInvested;
            return {
                result: '₹' + monthlyRequired.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '/month',
                details: `Target: ₹${target.toLocaleString()}<br>Monthly Investment: ₹${monthlyRequired.toFixed(0).toLocaleString()}<br>Total Invested: ₹${totalInvested.toFixed(0).toLocaleString()}<br>Returns: ₹${returns.toFixed(0).toLocaleString()}`
            };
        }
    }
];

// Export for use in main app
if (typeof window !== 'undefined') {
    window.financeCalculators = financeCalculators;
}
