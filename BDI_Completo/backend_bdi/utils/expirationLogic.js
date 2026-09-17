/**
 * Lógica para calcular la caducidad de los medicamentos
 * Actividad 4
 */

const getExpirationStatus = (expirationDateStr) => {
    if (!expirationDateStr) return { status: 'Desconocido', daysRemaining: null };

    const expirationDate = new Date(expirationDateStr);
    const today = new Date();
    
    // Normalizar a medianoche para evitar problemas con las horas
    today.setHours(0, 0, 0, 0);
    expirationDate.setHours(0, 0, 0, 0);

    const timeDiff = expirationDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysRemaining < 0) {
        return { status: 'Vencido', daysRemaining };
    } else if (daysRemaining <= 30) {
        return { status: 'Por expirar', daysRemaining };
    } else {
        return { status: 'Vigente', daysRemaining };
    }
};

module.exports = { getExpirationStatus };
