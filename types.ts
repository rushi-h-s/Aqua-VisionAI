export interface FishAnalysis {
    id: string;
    imageName: string;
    imageData: string; // Base64
    timestamp: number;
    status: 'analyzing' | 'complete' | 'error';
    result?: AnalysisResult;
    error?: string;
}

export interface AnalysisResult {
    species: string;
    freshnessScore: number; // 0-100
    safetyScore: number; // 0-100
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    sustainabilityStatus: 'Sustainable' | 'Concern' | 'Avoid' | 'Unknown';
    culinaryUse: string;
    reasoning: string;
    storageRecommendation: string;
    // New fields
    origin: string;
    isFraud: boolean;
    fraudReason: string;
}

export interface DashboardStats {
    avgFreshness: number;
    avgSafety: number;
    avgSustainability: number;
    totalAnalyzed: number;
    gradeDistribution: { name: string; value: number }[];
}

export enum AppView {
    DASHBOARD = 'DASHBOARD',
    ANALYZE = 'ANALYZE',
    HISTORY = 'HISTORY'
}