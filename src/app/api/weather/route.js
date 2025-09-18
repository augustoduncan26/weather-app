
//import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { city } = await request.json();
  const API_KEY = process.env.WEATHER_API_KEY;

  if (!city) {
    return NextResponse.json({ message: 'La ciudad es requerida' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);

    // NUEVO: Verificación de la respuesta
    if (!response.ok) {
        // Si la respuesta no es 200, lee el cuerpo como texto para ver el error
        const errorText = await response.text();
        console.error('API Error:', errorText);
        return NextResponse.json({ message: 'Error al consultar la API del clima. Por favor, intente de nuevo.' }, { status: response.status });
    }

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ message: data.error.message || 'Ciudad no encontrada' }, { status: 404 });
    }

    const { location, current } = data;

    const weatherData = {
      city: location.name,
      country: location.country,
      temp_c: current.temp_c,
      condition: current.condition.text,
      icon: `https:${current.condition.icon}`,
    };

    // await prisma.weatherSearch.create({
    //   data: weatherData,
    // });

    return NextResponse.json(weatherData, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}