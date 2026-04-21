import { create } from 'zustand';
import { format } from 'date-fns';
import { mockLiveData, mockHourlyData, mockDailyData, mockPeakData, mockAlerts, mockPrediction } from '../data/mockData';

export const useDashboardStore = create((set) => ({
    liveData:   mockLiveData,
    hourlyData: mockHourlyData,
    dailyData:  mockDailyData,
    peakData:   mockPeakData,
    alerts:     mockAlerts,
    prediction: mockPrediction,
    isConnected: true,
    lastUpdated: null,       // timestamp of last successful live fetch

    setLiveData:   (data) => set({ liveData: data, lastUpdated: new Date() }),
    setHourlyData: (data) => set({ hourlyData: data }),
    setDailyData:  (data) => set({ dailyData: data }),
    setPrediction: (data) => set({ prediction: data }),
    setAlerts:     (alerts) => set({ alerts }),

    /**
     * Appends the current live reading as a new point to the rolling 24-h chart.
     * Keeps the last 60 points so the chart stays performant.
     */
    addLiveToChart: (reading) => set((state) => {
        const point = {
            time:    format(new Date(), 'HH:mm:ss'),
            power:   parseFloat((reading.power || 0).toFixed(1)),
            voltage: parseFloat((reading.voltage || 0).toFixed(1)),
            current: parseFloat((reading.current || 0).toFixed(2)),
        };
        const updated = [...state.hourlyData, point].slice(-60);
        return { hourlyData: updated };
    }),
}));


export const useAnalyticsStore = create((set) => ({
    mode: 'hourly',         // 'hourly' | 'daily'
    dateRange: { from: null, to: null },
    chartData: [],
    summaryMetrics: null,
    setMode: (mode) => set({ mode }),
    setDateRange: (range) => set({ dateRange: range }),
    setChartData: (data) => set({ chartData: data }),
    setSummaryMetrics: (metrics) => set({ summaryMetrics: metrics }),
}));

export const useUIStore = create((set) => ({
    sidebarOpen: true,
    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
