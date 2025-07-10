import { useEffect, useState } from 'react';

const getSeason = () => {
  const month = new Date().getMonth();
  if (month >= 11 || month <= 2) return 'verano';
  if (month >= 3 && month <= 5) return 'otoño';
  if (month >= 6 && month <= 8) return 'invierno';
  return 'primavera';
};

const promocionesPorEstacion = {
  verano: {
    titulo: '☀️ Verano PiConecta',
    texto: 'Descubre productos para disfrutar al aire libre y ofertas con energía solar.',
    color: '#ffe680',
  },
  otoño: {
    titulo: '🍂 PiRaíces de otoño',
    texto: 'Promociona productos locales y artesanales en esta temporada de cosecha.',
    color: '#f4e4d4',
  },
  invierno: {
    titulo: '❄️ PiInvierno Activo',
    texto: 'Encuentra experiencias indoor, tecnología y moda funcional para el frío.',