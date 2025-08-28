import React, { useEffect, useState } from 'react';
import { ArrowRight, Calculator, ChevronDown, DollarSign, Download, Edit, Info, LineChart, Plus, RefreshCw, Save, Sliders, Trash2, TrendingUp, Undo2, Zap, HelpCircle } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
interface InvestorProfile {
  strategy: string;
  experience: string;
  capitalAvailable: number;
  timeline: string;
  riskTolerance: string;
}
interface ScenarioModelingToolProps {
  selectedMarket: string;
  investorProfile: InvestorProfile;
}
export const ScenarioModelingTool: React.FC<ScenarioModelingToolProps> = ({
  selectedMarket,
  investorProfile
}) => {
  // State for scenarios
  const [scenarios, setScenarios] = useState<any[]>([{
    id: 1,
    name: 'Base Case',
    description: 'Most likely outcome based on current trends',
    purchasePrice: 375000,
    downPayment: 20,
    interestRate: 5.75,
    loanTerm: 30,
    annualAppreciation: 3.5,
    monthlyRent: 2200,
    vacancyRate: 5,
    propertyManagement: 8,
    maintenanceCost: 5,
    holdingPeriod: 10,
    sellingCosts: 6,
    isActive: true,
    isDefault: true
  }, {
    id: 2,
    name: 'Conservative',
    description: 'Lower appreciation, higher expenses',
    purchasePrice: 375000,
    downPayment: 20,
    interestRate: 6.25,
    loanTerm: 30,
    annualAppreciation: 2.0,
    monthlyRent: 2100,
    vacancyRate: 7,
    propertyManagement: 10,
    maintenanceCost: 8,
    holdingPeriod: 10,
    sellingCosts: 6,
    isActive: false,
    isDefault: true
  }, {
    id: 3,
    name: 'Optimistic',
    description: 'Higher appreciation, lower expenses',
    purchasePrice: 375000,
    downPayment: 20,
    interestRate: 5.5,
    loanTerm: 30,
    annualAppreciation: 5.0,
    monthlyRent: 2300,
    vacancyRate: 3,
    propertyManagement: 7,
    maintenanceCost: 4,
    holdingPeriod: 10,
    sellingCosts: 5,
    isActive: false,
    isDefault: true
  }]);
  // State for editing scenario
  const [isEditing, setIsEditing] = useState(false);
  const [editingScenario, setEditingScenario] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(true);
  const [timeframe, setTimeframe] = useState(10); // years
  const [chartView, setChartView] = useState<'cashflow' | 'equity' | 'roi'>('cashflow');
  // Get active scenario
  const activeScenario = scenarios.find(s => s.isActive) || scenarios[0];
  // Calculate mortgage payment
  const calculateMortgage = (scenario: any) => {
    const principal = scenario.purchasePrice * (1 - scenario.downPayment / 100);
    const monthlyRate = scenario.interestRate / 100 / 12;
    const numberOfPayments = scenario.loanTerm * 12;
    if (monthlyRate === 0) return principal / numberOfPayments;
    const mortgage = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return mortgage;
  };
  // Generate cash flow data
  const generateCashFlowData = (scenario: any) => {
    const mortgagePayment = calculateMortgage(scenario);
    const initialInvestment = scenario.purchasePrice * (scenario.downPayment / 100);
    const monthlyRent = scenario.monthlyRent;
    const vacancyLoss = monthlyRent * (scenario.vacancyRate / 100);
    const propertyManagement = monthlyRent * (scenario.propertyManagement / 100);
    const maintenance = monthlyRent * (scenario.maintenanceCost / 100);
    const propertyTax = scenario.purchasePrice * 0.012 / 12; // Estimated 1.2% annual property tax
    const insurance = scenario.purchasePrice * 0.005 / 12; // Estimated 0.5% annual insurance
    const monthlyCashFlow = monthlyRent - vacancyLoss - propertyManagement - maintenance - mortgagePayment - propertyTax - insurance;
    const data = [];
    let propertyValue = scenario.purchasePrice;
    let totalCashFlow = 0;
    let loanBalance = scenario.purchasePrice * (1 - scenario.downPayment / 100);
    for (let year = 0; year <= scenario.holdingPeriod; year++) {
      // Calculate property value with appreciation
      if (year > 0) {
        propertyValue = propertyValue * (1 + scenario.annualAppreciation / 100);
      }
      // Calculate annual cash flow
      const annualCashFlow = monthlyCashFlow * 12;
      totalCashFlow += year > 0 ? annualCashFlow : 0;
      // Calculate loan balance (simplified)
      if (year > 0) {
        const interestPaid = loanBalance * (scenario.interestRate / 100);
        const principalPaid = mortgagePayment * 12 - interestPaid;
        loanBalance -= principalPaid;
        if (loanBalance < 0) loanBalance = 0;
      }
      // Calculate equity
      const equity = propertyValue - loanBalance;
      // Calculate ROI
      const roi = initialInvestment > 0 ? annualCashFlow / initialInvestment * 100 : 0;
      const totalRoi = initialInvestment > 0 ? (equity + totalCashFlow - initialInvestment) / initialInvestment * 100 : 0;
      data.push({
        year,
        propertyValue: Math.round(propertyValue),
        loanBalance: Math.round(loanBalance),
        equity: Math.round(equity),
        cashFlow: Math.round(annualCashFlow),
        totalCashFlow: Math.round(totalCashFlow),
        roi: Math.round(roi * 10) / 10,
        totalRoi: Math.round(totalRoi * 10) / 10
      });
    }
    return data;
  };
  // Generate comparison data for all active scenarios
  const generateComparisonData = () => {
    const activeScenarios = scenarios.filter(s => s.isActive || s.id === activeScenario.id);
    const years = Array.from({
      length: timeframe + 1
    }, (_, i) => i);
    return years.map(year => {
      const dataPoint: any = {
        year
      };
      activeScenarios.forEach(scenario => {
        const scenarioData = generateCashFlowData(scenario);
        const yearData = scenarioData.find(d => d.year === year);
        if (yearData) {
          dataPoint[`${scenario.name}_cashFlow`] = yearData.cashFlow;
          dataPoint[`${scenario.name}_equity`] = yearData.equity;
          dataPoint[`${scenario.name}_roi`] = yearData.totalRoi;
        }
      });
      return dataPoint;
    });
  };
  // Calculate financial metrics
  const calculateMetrics = (scenario: any) => {
    const data = generateCashFlowData(scenario);
    const finalYear = data[data.length - 1];
    const initialInvestment = scenario.purchasePrice * (scenario.downPayment / 100);
    const cashOnCash = finalYear.cashFlow / initialInvestment * 100;
    const totalROI = finalYear.totalRoi;
    const averageAnnualROI = totalROI / scenario.holdingPeriod;
    const irr = calculateIRR(data, initialInvestment);
    return {
      cashOnCash: Math.round(cashOnCash * 10) / 10,
      totalROI: Math.round(totalROI * 10) / 10,
      averageAnnualROI: Math.round(averageAnnualROI * 10) / 10,
      irr: Math.round(irr * 10) / 10,
      finalEquity: finalYear.equity,
      totalCashFlow: finalYear.totalCashFlow,
      initialInvestment
    };
  };
  // Simple IRR calculation (simplified for demonstration)
  const calculateIRR = (data: any[], initialInvestment: number) => {
    // This is a simplified IRR calculation
    const finalValue = data[data.length - 1].equity + data[data.length - 1].totalCashFlow;
    const years = data.length - 1;
    return Math.pow(finalValue / initialInvestment, 1 / years) - 1;
  };
  // Handle scenario activation
  const toggleScenarioActive = (id: number) => {
    setScenarios(scenarios.map(s => s.id === id ? {
      ...s,
      isActive: !s.isActive
    } : s));
  };
  // Handle scenario selection (make it the primary scenario)
  const selectScenario = (id: number) => {
    setScenarios(scenarios.map(s => s.id === id ? {
      ...s,
      isActive: true
    } : {
      ...s,
      isActive: s.id === activeScenario.id
    }));
  };
  // Handle scenario editing
  const startEditingScenario = (scenario: any) => {
    setEditingScenario({
      ...scenario
    });
    setIsEditing(true);
  };
  // Save edited scenario
  const saveEditedScenario = () => {
    if (!editingScenario) return;
    setScenarios(scenarios.map(s => s.id === editingScenario.id ? {
      ...editingScenario
    } : s));
    setIsEditing(false);
    setEditingScenario(null);
  };
  // Create new scenario
  const createNewScenario = () => {
    const newId = Math.max(...scenarios.map(s => s.id)) + 1;
    const newScenario = {
      ...activeScenario,
      id: newId,
      name: `Scenario ${newId}`,
      description: 'Custom scenario',
      isActive: false,
      isDefault: false
    };
    setScenarios([...scenarios, newScenario]);
    startEditingScenario(newScenario);
  };
  // Delete scenario
  const deleteScenario = (id: number) => {
    // Don't delete default scenarios
    const scenarioToDelete = scenarios.find(s => s.id === id);
    if (scenarioToDelete?.isDefault) return;
    setScenarios(scenarios.filter(s => s.id !== id));
  };
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  // Get chart data based on active view
  const getChartData = () => {
    const scenarioData = generateCashFlowData(activeScenario);
    return scenarioData.slice(0, timeframe + 1);
  };
  // Get comparison chart data
  const getComparisonData = () => {
    return generateComparisonData();
  };
  // Get chart config based on view
  const getChartConfig = () => {
    if (showComparison) {
      const activeScenarios = scenarios.filter(s => s.isActive || s.id === activeScenario.id);
      const colors = ['#3AB795', '#FECA57', '#FF6B6B', '#4B5563', '#9CA3AF'];
      let lines = [];
      activeScenarios.forEach((scenario, index) => {
        let dataKey = '';
        switch (chartView) {
          case 'cashflow':
            dataKey = `${scenario.name}_cashFlow`;
            break;
          case 'equity':
            dataKey = `${scenario.name}_equity`;
            break;
          case 'roi':
            dataKey = `${scenario.name}_roi`;
            break;
        }
        lines.push(<Line key={scenario.id} type="monotone" dataKey={dataKey} name={scenario.name} stroke={colors[index % colors.length]} strokeWidth={2} dot={{
          r: 3
        }} activeDot={{
          r: 5
        }} />);
      });
      return lines;
    } else {
      switch (chartView) {
        case 'cashflow':
          return <>
              <Bar dataKey="cashFlow" name="Annual Cash Flow" fill="#3AB795" />
              <Line type="monotone" dataKey="totalCashFlow" name="Cumulative Cash Flow" stroke="#FECA57" strokeWidth={2} yAxisId="right" />
            </>;
        case 'equity':
          return <>
              <Area type="monotone" dataKey="equity" name="Equity" fill="#3AB795" stroke="#3AB795" fillOpacity={0.6} />
              <Line type="monotone" dataKey="propertyValue" name="Property Value" stroke="#FECA57" strokeWidth={2} />
              <Line type="monotone" dataKey="loanBalance" name="Loan Balance" stroke="#FF6B6B" strokeWidth={2} />
            </>;
        case 'roi':
          return <>
              <Bar dataKey="roi" name="Annual ROI %" fill="#3AB795" />
              <Line type="monotone" dataKey="totalRoi" name="Cumulative ROI %" stroke="#FECA57" strokeWidth={2} yAxisId="right" />
            </>;
      }
    }
  };
  // Format chart title
  const getChartTitle = () => {
    switch (chartView) {
      case 'cashflow':
        return 'Cash Flow Projection';
      case 'equity':
        return 'Equity Growth';
      case 'roi':
        return 'Return on Investment';
    }
  };
  // Format y-axis label
  const formatYAxis = (value: number) => {
    if (chartView === 'roi') {
      return `${value}%`;
    } else {
      if (Math.abs(value) >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
      } else if (Math.abs(value) >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`;
      } else {
        return `$${value}`;
      }
    }
  };
  // Custom tooltip for charts
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">Year {label}</p>
          {payload.map((entry: any, index: number) => <p key={index} style={{
          color: entry.color
        }} className="text-sm">
              <span className="font-medium">{entry.name}: </span>
              {chartView === 'roi' ? `${entry.value}%` : formatCurrency(entry.value)}
            </p>)}
        </div>;
    }
    return null;
  };
  // Calculate metrics for active scenario
  const activeMetrics = calculateMetrics(activeScenario);
  return <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div>
            <h2 className="text-lg font-bold mb-1 flex items-center">
              <Calculator size={20} className="mr-2 text-emerald-500" />
              Scenario Modeling Tool
            </h2>
            <p className="text-gray-600 text-sm">
              Create and compare different investment scenarios for{' '}
              {selectedMarket}
            </p>
          </div>
          <div className="flex items-center mt-4 lg:mt-0 space-x-3">
            <button className="flex items-center bg-emerald-500 hover:bg-emerald-600 transition-colors px-4 py-2 rounded-lg text-white text-sm" onClick={createNewScenario}>
              <Plus size={16} className="mr-2" />
              New Scenario
            </button>
            <button className="flex items-center bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-lg text-gray-600 text-sm">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenarios List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-medium flex items-center mb-4">
            <Sliders size={18} className="mr-2 text-emerald-500" />
            Investment Scenarios
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {scenarios.map(scenario => <div key={scenario.id} className={`border rounded-lg p-3 cursor-pointer transition-colors ${scenario.isActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => selectScenario(scenario.id)}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{scenario.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {scenario.description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button className="p-1.5 text-gray-400 hover:text-emerald-500 transition-colors" onClick={e => {
                  e.stopPropagation();
                  startEditingScenario(scenario);
                }}>
                      <Edit size={14} />
                    </button>
                    {!scenario.isDefault && <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" onClick={e => {
                  e.stopPropagation();
                  deleteScenario(scenario.id);
                }}>
                        <Trash2 size={14} />
                      </button>}
                    <button className={`p-1.5 transition-colors ${scenario.isActive ? 'text-emerald-500 hover:text-emerald-600' : 'text-gray-400 hover:text-emerald-500'}`} onClick={e => {
                  e.stopPropagation();
                  toggleScenarioActive(scenario.id);
                }}>
                      <LineChart size={14} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div>
                    <span className="text-gray-500">Purchase:</span>
                    <span className="ml-1 font-medium">
                      {formatCurrency(scenario.purchasePrice)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Down:</span>
                    <span className="ml-1 font-medium">
                      {scenario.downPayment}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Rate:</span>
                    <span className="ml-1 font-medium">
                      {scenario.interestRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Appreciation:</span>
                    <span className="ml-1 font-medium">
                      {scenario.annualAppreciation}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Rent:</span>
                    <span className="ml-1 font-medium">
                      ${scenario.monthlyRent}/mo
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Hold:</span>
                    <span className="ml-1 font-medium">
                      {scenario.holdingPeriod} years
                    </span>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
        {/* Chart View */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium flex items-center">
              <LineChart size={18} className="mr-2 text-emerald-500" />
              {getChartTitle()}
            </h3>
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button className={`px-3 py-1 text-xs rounded-lg ${chartView === 'cashflow' ? 'bg-emerald-500 text-white' : 'text-gray-600'}`} onClick={() => setChartView('cashflow')}>
                  Cash Flow
                </button>
                <button className={`px-3 py-1 text-xs rounded-lg ${chartView === 'equity' ? 'bg-emerald-500 text-white' : 'text-gray-600'}`} onClick={() => setChartView('equity')}>
                  Equity
                </button>
                <button className={`px-3 py-1 text-xs rounded-lg ${chartView === 'roi' ? 'bg-emerald-500 text-white' : 'text-gray-600'}`} onClick={() => setChartView('roi')}>
                  ROI
                </button>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500" value={timeframe} onChange={e => setTimeframe(parseInt(e.target.value))}>
                  <option value="5">5 Years</option>
                  <option value="10">10 Years</option>
                  <option value="15">15 Years</option>
                  <option value="20">20 Years</option>
                  <option value="30">30 Years</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <button className={`p-1.5 rounded-lg ${showComparison ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`} onClick={() => setShowComparison(!showComparison)}>
                <LineChart size={16} />
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {showComparison ? <RechartsLineChart data={getComparisonData()} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" label={{
                value: 'Year',
                position: 'insideBottomRight',
                offset: -10
              }} />
                  <YAxis tickFormatter={formatYAxis} label={{
                value: chartView === 'roi' ? 'Return (%)' : 'Amount ($)',
                angle: -90,
                position: 'insideLeft'
              }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {getChartConfig()}
                </RechartsLineChart> : chartView === 'equity' ? <AreaChart data={getChartData()} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" label={{
                value: 'Year',
                position: 'insideBottomRight',
                offset: -10
              }} />
                  <YAxis tickFormatter={formatYAxis} label={{
                value: 'Amount ($)',
                angle: -90,
                position: 'insideLeft'
              }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {getChartConfig()}
                </AreaChart> : <BarChart data={getChartData()} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" label={{
                value: 'Year',
                position: 'insideBottomRight',
                offset: -10
              }} />
                  <YAxis tickFormatter={formatYAxis} label={{
                value: chartView === 'roi' ? 'Return (%)' : 'Amount ($)',
                angle: -90,
                position: 'insideLeft'
              }} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={formatYAxis} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {getChartConfig()}
                </BarChart>}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Financial Metrics */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-medium flex items-center mb-4">
          <DollarSign size={18} className="mr-2 text-emerald-500" />
          Financial Metrics - {activeScenario.name}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1 flex items-center">
              Initial Investment
              <Info size={14} className="ml-1 text-gray-400" />
            </div>
            <div className="text-xl font-bold">
              {formatCurrency(activeMetrics.initialInvestment)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Down payment + closing costs
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1 flex items-center">
              Cash-on-Cash Return
              <Info size={14} className="ml-1 text-gray-400" />
            </div>
            <div className="text-xl font-bold">{activeMetrics.cashOnCash}%</div>
            <div className="text-xs text-gray-500 mt-1">
              Annual cash flow / initial investment
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1 flex items-center">
              Total ROI (10 Years)
              <Info size={14} className="ml-1 text-gray-400" />
            </div>
            <div className="text-xl font-bold">{activeMetrics.totalROI}%</div>
            <div className="text-xs text-gray-500 mt-1">
              Total return on investment
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1 flex items-center">
              Annualized ROI
              <Info size={14} className="ml-1 text-gray-400" />
            </div>
            <div className="text-xl font-bold">
              {activeMetrics.averageAnnualROI}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Average annual return
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1 flex items-center">
              IRR
              <Info size={14} className="ml-1 text-gray-400" />
            </div>
            <div className="text-xl font-bold">{activeMetrics.irr}%</div>
            <div className="text-xs text-gray-500 mt-1">
              Internal rate of return
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Monthly Cash Flow</div>
            <div className="text-xl font-bold">
              {formatCurrency(activeMetrics.cashOnCash * activeMetrics.initialInvestment / 100 / 12)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Average per month</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Total Cash Flow</div>
            <div className="text-xl font-bold">
              {formatCurrency(activeMetrics.totalCashFlow)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Over {activeScenario.holdingPeriod} years
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Final Equity</div>
            <div className="text-xl font-bold">
              {formatCurrency(activeMetrics.finalEquity)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              After {activeScenario.holdingPeriod} years
            </div>
          </div>
        </div>
      </div>
      {/* Scenario Details */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-medium flex items-center mb-4">
          <Sliders size={18} className="mr-2 text-emerald-500" />
          {activeScenario.name} - Scenario Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Property Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Purchase Price</span>
                <span className="font-medium">
                  {formatCurrency(activeScenario.purchasePrice)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Down Payment</span>
                <span className="font-medium">
                  {activeScenario.downPayment}%
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Loan Amount</span>
                <span className="font-medium">
                  {formatCurrency(activeScenario.purchasePrice * (1 - activeScenario.downPayment / 100))}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Interest Rate</span>
                <span className="font-medium">
                  {activeScenario.interestRate}%
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Loan Term</span>
                <span className="font-medium">
                  {activeScenario.loanTerm} years
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Monthly Payment</span>
                <span className="font-medium">
                  {formatCurrency(calculateMortgage(activeScenario))}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3">Income & Expenses</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Monthly Rent</span>
                <span className="font-medium">
                  ${activeScenario.monthlyRent}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Vacancy Rate</span>
                <span className="font-medium">
                  {activeScenario.vacancyRate}%
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Property Management</span>
                <span className="font-medium">
                  {activeScenario.propertyManagement}%
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Maintenance</span>
                <span className="font-medium">
                  {activeScenario.maintenanceCost}%
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Property Tax (est.)</span>
                <span className="font-medium">
                  {formatCurrency(activeScenario.purchasePrice * 0.012 / 12)}{' '}
                  /mo
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Insurance (est.)</span>
                <span className="font-medium">
                  {formatCurrency(activeScenario.purchasePrice * 0.005 / 12)}{' '}
                  /mo
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3">Investment Assumptions</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Annual Appreciation</span>
                <span className="font-medium">
                  {activeScenario.annualAppreciation}%
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Annual Rent Increase</span>
                <span className="font-medium">3%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Holding Period</span>
                <span className="font-medium">
                  {activeScenario.holdingPeriod} years
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Selling Costs</span>
                <span className="font-medium">
                  {activeScenario.sellingCosts}%
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Market</span>
                <span className="font-medium">{selectedMarket}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recommendations */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
        <h3 className="font-medium flex items-center mb-4">
          <Zap size={18} className="mr-2" />
          AI-Powered Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Optimize Your Strategy</h4>
            <p className="text-sm text-white text-opacity-90">
              Based on your investment profile, increasing your down payment to
              25% would improve your cash flow by approximately $120/month.
            </p>
            <button className="mt-3 px-3 py-1.5 bg-white text-emerald-600 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
              See Optimized Scenario
            </button>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Risk Assessment</h4>
            <p className="text-sm text-white text-opacity-90">
              Your current scenario has a moderate risk profile. Consider
              running a sensitivity analysis on interest rates to evaluate
              potential impacts.
            </p>
            <button className="mt-3 px-3 py-1.5 bg-white text-emerald-600 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
              Run Sensitivity Analysis
            </button>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Financing Options</h4>
            <p className="text-sm text-white text-opacity-90">
              You may qualify for better financing terms. Our analysis shows you
              could potentially secure a 5.25% interest rate with the right
              lender.
            </p>
            <button className="mt-3 px-3 py-1.5 bg-white text-emerald-600 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
              Explore Financing Options
            </button>
          </div>
        </div>
      </div>
      {/* Edit Scenario Modal */}
      {isEditing && editingScenario && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Edit Scenario</h3>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => {
              setIsEditing(false);
              setEditingScenario(null);
            }}>
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Scenario Name
                    </label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.name} onChange={e => setEditingScenario({
                  ...editingScenario,
                  name: e.target.value
                })} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.description} onChange={e => setEditingScenario({
                  ...editingScenario,
                  description: e.target.value
                })} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Purchase Price
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        $
                      </span>
                      <input type="number" className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.purchasePrice} onChange={e => setEditingScenario({
                    ...editingScenario,
                    purchasePrice: parseInt(e.target.value) || 0
                  })} />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Down Payment (%)
                    </label>
                    <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.downPayment} onChange={e => setEditingScenario({
                  ...editingScenario,
                  downPayment: parseFloat(e.target.value) || 0
                })} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interest Rate (%)
                    </label>
                    <input type="number" step="0.01" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.interestRate} onChange={e => setEditingScenario({
                  ...editingScenario,
                  interestRate: parseFloat(e.target.value) || 0
                })} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Term (years)
                    </label>
                    <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.loanTerm} onChange={e => setEditingScenario({
                  ...editingScenario,
                  loanTerm: parseInt(e.target.value) || 0
                })} />
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Rent
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        $
                      </span>
                      <input type="number" className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.monthlyRent} onChange={e => setEditingScenario({
                    ...editingScenario,
                    monthlyRent: parseInt(e.target.value) || 0
                  })} />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vacancy Rate (%)
                    </label>
                    <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.vacancyRate} onChange={e => setEditingScenario({
                  ...editingScenario,
                  vacancyRate: parseFloat(e.target.value) || 0
                })} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Management (%)
                    </label>
                    <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.propertyManagement} onChange={e => setEditingScenario({
                  ...editingScenario,
                  propertyManagement: parseFloat(e.target.value) || 0
                })} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maintenance Cost (%)
                    </label>
                    <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.maintenanceCost} onChange={e => setEditingScenario({
                  ...editingScenario,
                  maintenanceCost: parseFloat(e.target.value) || 0
                })} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Appreciation (%)
                    </label>
                    <input type="number" step="0.1" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.annualAppreciation} onChange={e => setEditingScenario({
                  ...editingScenario,
                  annualAppreciation: parseFloat(e.target.value) || 0
                })} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Holding Period (years)
                    </label>
                    <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingScenario.holdingPeriod} onChange={e => setEditingScenario({
                  ...editingScenario,
                  holdingPeriod: parseInt(e.target.value) || 0
                })} />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors" onClick={() => {
            setIsEditing(false);
            setEditingScenario(null);
          }}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors" onClick={saveEditedScenario}>
                Save Scenario
              </button>
            </div>
          </div>
        </div>}
    </div>;
};