import React, { useEffect, useState, useRef, createElement } from 'react';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
export const MetricsCards = ({
  setActivePage
}) => {
  const [animated, setAnimated] = useState(false);
  const [particles, setParticles] = useState([]);
  const cardsRef = useRef([]);
  useEffect(() => {
    setAnimated(true);
    // Initialize refs array
    cardsRef.current = cardsRef.current.slice(0, metrics.length);
    // Update hover effect to match PipelineSnapshot cards
    const handleMouseMove = (e, card) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Use same multiplier as PipelineSnapshot (15)
      const multiplier = 15;
      const rotateY = x / multiplier;
      const rotateX = -y / multiplier;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    const handleMouseLeave = card => {
      if (!card) return;
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    };
    // Store bound handlers for cleanup
    const boundHandlers = [];
    // Apply hover effect to each card individually
    cardsRef.current.forEach(card => {
      if (!card) return;
      // Fix: Create a bound event handler function
      const boundMouseMoveHandler = e => handleMouseMove(e, card);
      const boundMouseLeaveHandler = () => handleMouseLeave(card);
      // Store the bound handlers for cleanup
      boundHandlers.push({
        card,
        moveHandler: boundMouseMoveHandler,
        leaveHandler: boundMouseLeaveHandler
      });
      card.addEventListener('mousemove', boundMouseMoveHandler);
      card.addEventListener('mouseleave', boundMouseLeaveHandler);
    });
    // Proper cleanup function using the same bound handlers
    return () => {
      boundHandlers.forEach(({
        card,
        moveHandler,
        leaveHandler
      }) => {
        if (!card) return;
        card.removeEventListener('mousemove', moveHandler);
        card.removeEventListener('mouseleave', leaveHandler);
      });
    };
  }, []);
  const createParticles = index => {
    const newParticles = [];
    const colors = ['#3ab795', '#feca57', '#ff6b6b'];
    for (let i = 0; i < 10; i++) {
      newParticles.push({
        id: `particle-${index}-${i}-${Date.now()}`,
        x: Math.random() * 60 - 30,
        y: Math.random() * -60,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setParticles([...particles, ...newParticles]);
    // Remove particles after animation completes
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1000);
  };
  // Handle card detail view navigation
  const handleCardDetailView = metricType => {
    switch (metricType) {
      case 'Active Campaigns':
        setActivePage('Campaigns');
        break;
      case 'Response Rate':
        setActivePage('Campaigns');
        break;
      case 'Properties Under Contract':
        setActivePage('Pipeline');
        break;
      case 'Total LOIs Sent':
        setActivePage('Reports');
        break;
      default:
        // For other metrics, just show a toast notification
        showToastNotification(`Viewing details for ${metricType}`);
    }
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
  const metrics = [{
    title: 'Active Campaigns',
    value: '12',
    change: '+3',
    trend: 'up',
    progress: 80,
    description: 'campaigns running',
    progressColor: 'bg-primary',
    bgColor: 'bg-white',
    textColor: 'text-dark',
    borderColor: 'border-gray-200',
    progressBgColor: 'bg-gray-100'
  }, {
    title: 'Response Rate',
    value: '18.7%',
    change: '+2.4%',
    trend: 'up',
    progress: 75,
    description: 'agents responding',
    progressColor: 'bg-primary',
    bgColor: 'bg-white',
    textColor: 'text-dark',
    borderColor: 'border-gray-200',
    progressBgColor: 'bg-gray-100'
  }, {
    title: 'Properties Under Contract',
    value: '8',
    change: '+2',
    trend: 'up',
    progress: 67,
    description: 'accepted offers',
    progressColor: 'bg-white',
    bgColor: 'bg-primary',
    textColor: 'text-white',
    borderColor: 'border-primary',
    progressBgColor: 'bg-primary-dark'
  }, {
    title: 'Total LOIs Sent',
    value: '1,247',
    change: '+145',
    trend: 'up',
    progress: 83,
    description: 'LOIs this month',
    progressColor: 'bg-dark',
    bgColor: 'bg-gray-100',
    textColor: 'text-dark',
    borderColor: 'border-gray-200',
    progressBgColor: 'bg-gray-200'
  }];
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => <div key={index} ref={el => cardsRef.current[index] = el} className={`${metric.bgColor} rounded-xl shadow-sm p-5 ${metric.textColor} border ${metric.borderColor} transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] cursor-pointer relative overflow-hidden card-3d`} onClick={() => {
      createParticles(index);
      handleCardDetailView(metric.title);
    }} style={{
      transformStyle: 'preserve-3d'
    }} aria-label={`View details for ${metric.title}`} role="button" tabIndex={0}>
          <div className="card-content relative z-10">
            <div className="flex justify-between items-start">
              <h3 className={`text-sm font-medium ${metric.bgColor === 'bg-primary' ? 'text-white' : 'text-gray-500'}`}>
                {metric.title}
              </h3>
              <div className={`flex items-center ${metric.trend === 'up' ? metric.bgColor === 'bg-primary' ? 'text-white bg-primary-dark px-2 py-0.5 rounded-full' : 'text-primary' : 'text-secondary'}`}>
                {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="ml-1 text-xs">{metric.change}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className={`text-2xl font-bold ${metric.bgColor === 'bg-primary' ? 'text-white' : 'iridescent-text'}`}>
                {metric.value}
              </span>
              <span className={`text-xs ml-2 ${metric.bgColor === 'bg-primary' ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                {metric.description}
              </span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className={metric.bgColor === 'bg-primary' ? 'text-white text-opacity-90' : ''}>
                  Progress to Goal
                </span>
                <span className={metric.bgColor === 'bg-primary' ? 'text-white font-medium' : 'font-medium'}>
                  {metric.progress}%
                </span>
              </div>
              <div className={`w-full ${metric.progressBgColor} rounded-full h-[6px] ${metric.bgColor === 'bg-primary' ? 'bg-opacity-30' : ''}`}>
                <div className={`${metric.progressColor} h-[6px] rounded-full liquid-progress transition-all duration-1000 ease-out ${animated ? '' : 'w-0'}`} style={{
              width: animated ? `${metric.progress}%` : '0%'
            }}></div>
              </div>
            </div>
            {/* View details link */}
            <div className="mt-4 text-right">
              <button className={`text-xs flex items-center justify-end w-full ${metric.bgColor === 'bg-primary' ? 'text-white text-opacity-90 hover:text-opacity-100' : 'text-primary hover:text-primary-dark'} transition-colors`} aria-label={`View ${metric.title} details`} onClick={e => {
            e.stopPropagation(); // Prevent double-triggering with parent onClick
            handleCardDetailView(metric.title);
          }}>
                <span>View Details</span>
                <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
          {/* Particles effect */}
          {particles.filter(p => p.id.includes(`particle-${index}`)).map(particle => <div key={particle.id} className="particle" style={{
        '--x': `${particle.x}px`,
        '--y': `${particle.y}px`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        background: particle.color,
        top: '50%',
        left: '50%'
      }}></div>)}
          {/* Glass reflection effect - updated to match PipelineSnapshot */}
          <div className="absolute inset-0 rounded-xl opacity-30 pointer-events-none" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)'
      }}></div>
        </div>)}
    </div>;
};