// global.d.ts - shared types and module declarations
declare module '*.json' {
  const value: any;
  export default value;
}

export {};

export interface StatMetric {
    title: string;
    value: string;
    change?: string;
    changeDescription?: string;
    icon: React.ReactNode; 
    iconBgColor?: string;
    changeType?: 'increase' | 'decrease' | 'neutral';
}
