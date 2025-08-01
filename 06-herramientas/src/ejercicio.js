// EJERCICIO: Instala la dependencia dayjs con npm y úsala para mostrar la fecha
import dayjs from 'dayjs';

// Importar plugins adicionales de dayjs para más funcionalidades
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es'; // Locale en español

// Configurar dayjs con plugins y locale
dayjs.extend(relativeTime);
dayjs.locale('es');

// TODO: Usa dayjs para obtener la fecha y hora actual y mostrarla en el DOM
const now = dayjs();

// Crear contenido HTML con diferentes formatos de fecha
const dateContent = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px;">
    <h2>📅 Información de Fecha y Hora Actual</h2>
    
    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
      <h3>🕐 Fecha y Hora Completa:</h3>
      <p style="font-size: 18px; font-weight: bold; color: #2c3e50;">
        ${now.format('dddd, D [de] MMMM [de] YYYY [a las] HH:mm:ss')}
      </p>
    </div>

    <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;">
      <h3>📆 Diferentes Formatos:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Formato corto:</strong> ${now.format('DD/MM/YYYY')}</li>
        <li><strong>Formato ISO:</strong> ${now.toISOString()}</li>
        <li><strong>Formato US:</strong> ${now.format('MM/DD/YYYY')}</li>
        <li><strong>Solo hora:</strong> ${now.format('HH:mm:ss')}</li>
        <li><strong>12 horas:</strong> ${now.format('h:mm:ss A')}</li>
      </ul>
    </div>

    <div style="background: #f3e5f5; padding: 15px; border-radius: 8px; margin: 10px 0;">
      <h3>⏰ Información Adicional:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Día del año:</strong> ${now.dayOfYear()}</li>
        <li><strong>Semana del año:</strong> ${now.week()}</li>
        <li><strong>Timestamp:</strong> ${now.unix()}</li>
        <li><strong>Timezone:</strong> ${Intl.DateTimeFormat().resolvedOptions().timeZone}</li>
      </ul>
    </div>

    <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 10px 0;">
      <h3>🔄 Reloj en Tiempo Real:</h3>
      <p id="live-clock" style="font-size: 24px; font-weight: bold; color: #e65100; text-align: center;">
        ${now.format('HH:mm:ss')}
      </p>
    </div>

    <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;">
      <h3>📊 Datos Útiles:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Días hasta fin de año:</strong> ${dayjs().endOf('year').diff(now, 'day')} días</li>
        <li><strong>Días desde inicio de año:</strong> ${now.diff(dayjs().startOf('year'), 'day')} días</li>
        <li><strong>Es año bisiesto:</strong> ${now.isLeapYear() ? 'Sí' : 'No'}</li>
      </ul>
    </div>
  </div>
`;

// Actualizar el contenido del body
document.body.innerHTML = dateContent;

// Función para actualizar el reloj en tiempo real
function updateClock() {
  const clockElement = document.getElementById('live-clock');
  if (clockElement) {
    clockElement.textContent = dayjs().format('HH:mm:ss');
  }
}

// Actualizar el reloj cada segundo
setInterval(updateClock, 1000);

// Mensaje en consola para confirmar que dayjs está funcionando
console.log('✅ dayjs cargado correctamente');
console.log('🕐 Fecha actual:', now.format());
console.log('🌍 Locale configurado:', dayjs.locale());
