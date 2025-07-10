import { useEffect, useState } from 'react';

const getSeason = () => {
  const month = new Date().getMonth();
  if (month >= 11 || month <= 2) return 'verano';    // Dic - Mar
  if (month >= 3 && month <= 5) return 'otoño';      // Mar - Jun
  if (month >= 6 && month <= 8) return 'invierno';   // Jun - Sep
  return 'primavera';                                // Sep - Dic
};

const seasonColors = {
  verano: '#e6f7ff',
  otoño: '#fff5e6',
  invierno: '#e0ecf5',
  primavera: '#f2f7f3',
};

export default function SeasonalWrapper({ children }) {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  useEffect(() => {
    const currentSeason = getSeason();
    setBackgroundColor(seasonColors[currentSeason]);
  }, []);

  return (
    <div style={{ backgroundColor, minHeight: '100vh' }}>
      {children}
    </div>
  );
}