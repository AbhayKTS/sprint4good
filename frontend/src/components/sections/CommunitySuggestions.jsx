const sampleByState = {
  default: [
    'Skill-share pop-up workshops at local schools or panchayat halls',
    'Doorstep services via WhatsApp booking (elder-friendly)',
    'Local produce/goods WhatsApp catalog with UPI payments',
  ],
  up: [
    'Tie up with Nagar Nigam events for stalls in Uttar Pradesh cities',
    'Use ODOP (One District One Product) awareness to market crafts',
    'Partner with SHGs for micro-loans and trust building',
  ],
  mh: ['Register on Mahaswayam for skilling/placement support', 'Vendor stalls near railway/metro nodes on weekends'],
};

const friendlyState = (location = '') => {
  const lower = location.toLowerCase();
  if (lower.includes('uttar')) return 'up';
  if (lower.includes('maharashtra')) return 'mh';
  return 'default';
};

const CommunitySuggestions = ({ location }) => {
  const key = friendlyState(location);
  const items = sampleByState[key] || sampleByState.default;
  return (
    <div className="bg-white rounded-2xl shadow-card border border-ink/5 p-5 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-ink">People near you also try</h3>
        <span className="text-xs text-muted">Demo suggestions</span>
      </div>
      <ul className="list-disc list-inside text-sm text-ink space-y-1">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommunitySuggestions;
