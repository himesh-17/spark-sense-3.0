import { create } from 'zustand';
import { mockLiveData, mockHourlyData, mockDailyData, mockPeakData, mockAlerts, mockPrediction } from '../data/mockData';

export const useDashboardStore = create((set) => ({
    liveData: mockLiveData,
    hourlyData: mockHourlyData,
    dailyData: mockDailyData,
    peakData: mockPeakData,
    alerts: mockAlerts,
    prediction: mockPrediction,
    isConnected: true,
    setLiveData: (data) => set({ liveData: data }),
    setHourlyData: (data) => set({ hourlyData: data }),
    setDailyData: (data) => set({ dailyData: data }),
    setPrediction: (data) => set({ prediction: data }),
    setAlerts: (alerts) => set({ alerts }),
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
