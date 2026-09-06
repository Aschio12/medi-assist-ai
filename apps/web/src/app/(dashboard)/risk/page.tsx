'use client';
import { useState, useEffect } from 'react';
import { Gauge, TrendingDown, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { 
  fetchPatientRiskPrediction, 
  fetchDischargeInterventions, 
  fetchCohortRiskSummary,
  RiskPrediction,
  DischargeIntervention,
  CohortRiskSummary
} from '@/app/actions/risk_stratification';
import { RiskScoreGauge } from '@/components/risk/RiskScoreGauge';
import { ShapWaterfallChart } from '@/components/risk/ShapWaterfallChart';
import { RiskFeaturesMatrix } from '@/components/risk/RiskFeaturesMatrix';
import { DischargeInterventions } from '@/components/risk/DischargeInterventions';
import { CohortRiskDistribution } from '@/components/risk/CohortRiskDistribution';

export default function RiskStratificationPage() {
  const [prediction, setPrediction] = useState<RiskPrediction | null>(null);
  const [interventions, setInterventions] = useState<DischargeIntervention[]>([]);
  const [cohort, setCohort] = useState<CohortRiskSummary | null>(null);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const initData = async () => {
    try {
      const [predData, intervData, cohortData] = await Promise.all([
        fetchPatientRiskPrediction("PAT-98421"),
        fetchDischargeInterventions(),
        fetchCohortRiskSummary()
      ]);
      setPrediction(predData);
      setInterventions(intervData);
      setCohort(cohortData);
    } catch (err) {
      console.error("Failed to load risk analytics data:", err);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const handleToggleOrder = (id: string) => {
    setInterventions(prev => prev.map(item => {
      if (item.id === id) {
        const nextOrdered = !item.is_ordered;
        if (nextOrdered) {
          setToastNotification(`✓ Added "${item.title}" to clinical discharge care plan! Projected risk reduction: -${item.projected_risk_reduction_percent}%`);
          setTimeout(() => setToastNotification(null), 5000);
        }
        return { ...item, is_ordered: nextOrdered };
      }
      return item;
    }));
  };

  return (
    <div className="h-full w-full p-8 flex flex-col relative z-10 overflow-y-auto scrollbar-hide space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-500/20 rounded-xl border border-neon-500/30">
              <Gauge className="h-6 w-6 text-neon-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Predictive Analytics & 30-Day Readmission Risk Engine
            </h1>
          </div>
          <p className="text-zinc-400 text-sm mt-1">
            24-feature XGBoost gradient boosting ensemble, TreeSHAP feature attributions, and CMS HRRP risk mitigation bundles.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-neon-500/10 border border-neon-500/30 px-3 py-2 rounded-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-500"></span>
          </span>
          <span className="text-neon-400 font-mono text-xs font-bold uppercase tracking-wider">
            XGBoost v2.1 Model Active
          </span>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toastNotification && (
        <div className="p-4 rounded-2xl bg-neon-500/15 border border-neon-500/40 flex items-center justify-between text-xs text-neon-300 animate-fadeIn shadow-[0_0_20px_rgba(163,230,53,0.2)]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-neon-400" />
            <span className="font-medium">{toastNotification}</span>
          </div>
          <button onClick={() => setToastNotification(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Top Readmission Risk Score Gauge */}
      {prediction && <RiskScoreGauge prediction={prediction} />}

      {/* Main Grid: Left 7 Cols SHAP Waterfall & Feature Matrix, Right 5 Cols Care Bundles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: TreeSHAP Waterfall & 24D Matrix */}
        <div className="lg:col-span-7 space-y-6">
          {prediction && (
            <ShapWaterfallChart
              shapFeatures={prediction.top_shap_features}
              baseRate={prediction.base_population_rate}
              finalRisk={prediction.readmission_risk_percent}
            />
          )}

          <RiskFeaturesMatrix />
        </div>

        {/* Right: Discharge Interventions */}
        <div className="lg:col-span-5">
          <DischargeInterventions
            interventions={interventions}
            onToggleOrder={handleToggleOrder}
          />
        </div>
      </div>

      {/* Inpatient Unit Cohort Distribution */}
      {cohort && <CohortRiskDistribution cohort={cohort} />}
    </div>
  );
}
