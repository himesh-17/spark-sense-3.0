import api from './api';
import { subHours, subDays } from 'date-fns';

export const getLiveReading = (deviceId = 'ESP32-001') =>
    api.get(`/api/analytics/live?deviceId=${deviceId}`);

export const getHourlyReadings = (deviceId = 'ESP32-001', from, to) => {
    const fromDate = from || subHours(new Date(), 24).toISOString();
    const toDate = to || new Date().toISOString();
    return api.get(`/api/analytics/hourly?deviceId=${deviceId}&from=${fromDate}&to=${toDate}`);
};

export const getDailyReadings = (deviceId = 'ESP32-001', from, to) => {
    const fromDate = from || subDays(new Date(), 30).toISOString();
    const toDate = to || new Date().toISOString();
    return api.get(`/api/analytics/daily?deviceId=${deviceId}&from=${fromDate}&to=${toDate}`);
};

export const postReading = (data) => api.post('/api/readings', data);
