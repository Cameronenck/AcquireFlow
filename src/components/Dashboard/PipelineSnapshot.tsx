import React, { useEffect, useRef, createElement } from 'react';
import { ChevronRight, PieChart } from 'lucide-react';
import { Deal, DealStage } from '../Pipeline/types';
import { useDeals } from '../Context/DealsContext';
export const PipelineSnapshot = ({
  setActivePage
}) => {
  const {
    deals
  } = useDeals();
  const containerRef = useRef(null);
  const pipelineItemsRef = useRef([]);
  const particlesRef = useRef([]);
  const particleContainerRef = useRef(null);
  // Filter deals by stage
  const underContractDeals = deals.filter(deal => deal.stage === 'UnderContract');
  const dueDiligenceDeals = deals.filter(deal => deal.stage === 'DueDiligence');
  const negotiationsDeals = deals.filter(deal => deal.stage === 'Negotiations');
  const closingDeals = deals.filter(deal => deal.stage === 'Closing');
  // Calculate values for each stage
  const underContractValue = underContractDeals.reduce((sum, deal) => sum + deal.value, 0);
  const dueDiligenceValue = dueDiligenceDeals.reduce((sum, deal) => sum + deal.value, 0);
  const negotiationsValue = negotiationsDeals.reduce((sum, deal) => sum + deal.value, 0);
  const closingValue = closingDeals.reduce((sum, deal) => sum + deal.value, 0);
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  const pipelineItems = [{
    stage: 'Under Contract',
    count: underContractDeals.length,
    value: formatCurrency(underContractValue),
    change: `+${underContractDeals.filter(deal => new Date(deal.lastUpdated) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}`,
    expectedClose: '15-30 days',
    accentColor: 'bg-primary',
    textColor: 'text-primary',
    bgOpacity: 'bg-opacity-10'
  }, {
    stage: 'Due Diligence',
    count: dueDiligenceDeals.length,
    value: formatCurrency(dueDiligenceValue),
    change: `+${dueDiligenceDeals.filter(deal => new Date(deal.lastUpdated) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}`,
    expectedClose: '30-45 days',
    accentColor: 'bg-primary',
    textColor: 'text-primary',
    bgOpacity: 'bg-opacity-10'
  }, {
    stage: 'Negotiations',
    count: negotiationsDeals.length,
    value: formatCurrency(negotiationsValue),
    change: `+${negotiationsDeals.filter(deal => new Date(deal.lastUpdated) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}`,
    expectedClose: '45-60 days',
    accentColor: 'bg-gray-400',
    textColor: 'text-gray-600',
    bgOpacity: 'bg-opacity-20'
  }, {
    stage: 'Closing Soon',
    count: closingDeals.length,
    value: formatCurrency(closingValue),
    change: `+${closingDeals.filter(deal => new Date(deal.lastUpdated) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}`,
    expectedClose: '< 15 days',
    accentColor: 'bg-primary',
    textColor: 'text-primary',
    bgOpacity: 'bg-opacity-10'
  }];
  // Calculate totals
  const totalPipeline = pipelineItems.reduce((sum, item) => sum + item.count, 0);
  const totalValue = formatCurrency(underContractValue + dueDiligenceValue + negotiationsValue + closingValue);
  // Navigate to Pipeline page using setActivePage
  const navigateToPipeline = () => {
    setActivePage('Pipeline');
  };
  // Handle pipeline item click
  const handlePipelineItemClick = stage => {
    console.log(`Viewing detailed information for ${stage} stage`);
    // In a real implementation, this would navigate to the detailed view
    // For demonstration, we'll show a toast notification
    showToastNotification(`Viewing details for ${stage} stage`);
  };
  // Simple toast notification function
  const showToastNotification = message => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-dark text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 3000);
  };
  // Create money particles animation
  useEffect(() => {
    if (!particleContainerRef.current) return;
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.innerHTML = '$';
      particle.className = 'absolute text-xs font-bold text-primary';
      particle.style.opacity = '0';
      particle.style.transform = 'scale(0.5)';
      particle.style.transition = 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)';
      // Random starting position from one of the pipeline items
      const randomItemIndex = Math.floor(Math.random() * pipelineItemsRef.current.length);
      const sourceItem = pipelineItemsRef.current[randomItemIndex];
      if (!sourceItem) return null;
      const sourceRect = sourceItem.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      // Position relative to the container
      const startX = sourceRect.left - containerRect.left + Math.random() * sourceRect.width;
      const startY = sourceRect.top - containerRect.top + Math.random() * sourceRect.height;
      // Target is the total value element
      const targetRect = document.querySelector('.total-value').getBoundingClientRect();
      const targetX = targetRect.left - containerRect.left + targetRect.width / 2;
      const targetY = targetRect.top - containerRect.top + targetRect.height / 2;
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particleContainerRef.current.appendChild(particle);
      // Animate to target
      setTimeout(() => {
        particle.style.opacity = '1';
        particle.style.left = `${targetX}px`;
        particle.style.top = `${targetY}px`;
        particle.style.transform = 'scale(0)';
      }, 50);
      // Remove after animation
      setTimeout(() => {
        if (particleContainerRef.current && particleContainerRef.current.contains(particle)) {
          particleContainerRef.current.removeChild(particle);
        }
      }, 1500);
      return particle;
    };
    // Create particles at intervals
    const interval = setInterval(() => {
      const particle = createParticle();
      if (particle) {
        particlesRef.current.push(particle);
      }
    }, 800);
    return () => {
      clearInterval(interval);
      particlesRef.current.forEach(particle => {
        if (particleContainerRef.current && particleContainerRef.current.contains(particle)) {
          particleContainerRef.current.removeChild(particle);
        }
      });
    };
  }, []);
  // Handle 3D hover effect
  useEffect(() => {
    const handleMouseMove = (e, item) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const multiplier = 15; // Adjust for more/less tilt
      const rotateY = x / multiplier;
      const rotateX = -y / multiplier;
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    const handleMouseLeave = item => {
      item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    };
    pipelineItemsRef.current.forEach(item => {
      if (!item) return;
      item.addEventListener('mousemove', e => handleMouseMove(e, item));
      item.addEventListener('mouseleave', () => handleMouseLeave(item));
    });
    return () => {
      pipelineItemsRef.current.forEach(item => {
        if (!item) return;
        item.removeEventListener('mousemove', handleMouseMove);
        item.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  return <div ref={containerRef} className="bg-white rounded-xl shadow-sm p-5 text-dark border border-gray-100 transition-all duration-200 relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold flex items-center">
          <PieChart size={20} className="mr-2 text-primary" />
          Pipeline Snapshot
        </h2>
        <div className="flex items-center">
          <span className="text-sm mr-2">Total Value:</span>
          <span className="bg-primary px-3 py-1 rounded-xl font-bold text-white total-value animate-pulse-subtle">
            {totalValue}
          </span>
        </div>
      </div>
      {/* 3D Pipeline Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {pipelineItems.map((item, index) => <div key={index} ref={el => pipelineItemsRef.current[index] = el} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 cursor-pointer card-3d" onClick={() => handlePipelineItemClick(item.stage)} tabIndex={0} role="button" aria-label={`View details for ${item.stage} stage`}>
            <div className="card-content">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-sm">{item.stage}</h3>
                <span className={`${item.accentColor} ${item.bgOpacity} px-2 py-0.5 rounded-lg text-xs font-medium ${item.textColor}`}>
                  {item.count} properties
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold iridescent-text">
                  {item.value}
                </span>
                <span className={`text-xs px-1.5 py-0.5 rounded-lg ${item.change.startsWith('+') ? 'bg-primary bg-opacity-10 text-primary' : item.change.startsWith('-') ? 'bg-secondary bg-opacity-10 text-secondary' : 'bg-gray-100 text-gray-800'}`}>
                  {item.change}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-[6px] mb-2 overflow-hidden">
                <div className={`h-[6px] rounded-full ${item.accentColor} liquid-progress`} style={{
              width: `${item.count / totalPipeline * 100}%`
            }}></div>
              </div>
              <div className="text-xs text-gray-500">
                Expected close: {item.expectedClose}
              </div>
            </div>
            {/* Glass reflection effect */}
            <div className="absolute inset-0 rounded-xl opacity-30 pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)'
        }}></div>
          </div>)}
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <div>
          <span className="font-bold">Total Pipeline: </span>
          <span className="font-bold text-lg">{totalPipeline} Properties</span>
        </div>
        <button onClick={navigateToPipeline} className="flex items-center px-4 py-2 bg-dark text-white rounded-xl text-sm font-medium 
            hover:shadow-md hover:translate-y-[-2px] active:scale-[0.98] active:shadow-sm 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ripple-container" aria-label="View full pipeline details">
          View Full Pipeline
          <ChevronRight size={16} className="ml-1" />
          <span className="ripple-effect"></span>
        </button>
      </div>
      {/* Particle container for money symbols */}
      <div ref={particleContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden"></div>
    </div>;
};