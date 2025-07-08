// Data processing utilities for the ML model
export interface MarketData {
  stateName: string;
  districtName: string;
  marketName: string;
  variety: string;
  group: string;
  arrivals: number;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  reportedDate: string;
  grade: string;
  tempmax: number;
  tempmin: number;
  humidity: number;
  precip: number;
  uvindex: number;
}

export class DataProcessor {
  static parseCSVData(csvData: string): MarketData[] {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        stateName: values[0],
        districtName: values[1],
        marketName: values[2],
        variety: values[3],
        group: values[4],
        arrivals: parseFloat(values[5]) || 0,
        minPrice: parseFloat(values[6]) || 0,
        maxPrice: parseFloat(values[7]) || 0,
        modalPrice: parseFloat(values[8]) || 0,
        reportedDate: values[9],
        grade: values[10],
        tempmax: parseFloat(values[11]) || 0,
        tempmin: parseFloat(values[12]) || 0,
        humidity: parseFloat(values[13]) || 0,
        precip: parseFloat(values[14]) || 0,
        uvindex: parseFloat(values[15]) || 0,
      };
    });
  }

  static getMarketInsights(data: MarketData[]): {
    avgPrice: number;
    priceVolatility: number;
    totalArrivals: number;
    marketTrend: 'up' | 'down' | 'stable';
  } {
    if (data.length === 0) {
      return {
        avgPrice: 0,
        priceVolatility: 0,
        totalArrivals: 0,
        marketTrend: 'stable'
      };
    }

    const prices = data.map(d => d.modalPrice);
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    
    // Calculate price volatility (standard deviation)
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / prices.length;
    const priceVolatility = Math.sqrt(variance);
    
    const totalArrivals = data.reduce((sum, d) => sum + d.arrivals, 0);
    
    // Simple trend calculation based on recent vs older data
    const midPoint = Math.floor(data.length / 2);
    const recentAvg = data.slice(midPoint).reduce((sum, d) => sum + d.modalPrice, 0) / (data.length - midPoint);
    const olderAvg = data.slice(0, midPoint).reduce((sum, d) => sum + d.modalPrice, 0) / midPoint;
    
    let marketTrend: 'up' | 'down' | 'stable' = 'stable';
    if (recentAvg > olderAvg * 1.05) marketTrend = 'up';
    else if (recentAvg < olderAvg * 0.95) marketTrend = 'down';

    return {
      avgPrice: Math.round(avgPrice),
      priceVolatility: Math.round(priceVolatility),
      totalArrivals: Math.round(totalArrivals),
      marketTrend
    };
  }

  static filterDataByDateRange(data: MarketData[], startDate: Date, endDate: Date): MarketData[] {
    return data.filter(item => {
      const itemDate = new Date(item.reportedDate);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

  static groupByVariety(data: MarketData[]): Record<string, MarketData[]> {
    return data.reduce((groups, item) => {
      const variety = item.variety;
      if (!groups[variety]) {
        groups[variety] = [];
      }
      groups[variety].push(item);
      return groups;
    }, {} as Record<string, MarketData[]>);
  }
}