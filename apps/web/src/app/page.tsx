import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { PatientProfile } from '@/components/patient/PatientProfile';
import { VitalsChart } from '@/components/patient/VitalsChart';
import { MedicationsList } from '@/components/patient/MedicationsList';
import { RecentLabs } from '@/components/patient/RecentLabs';
import { RiskScore } from '@/components/patient/RiskScore';
import { CopilotLayout } from '@/components/copilot/CopilotLayout';
import { UserMessage } from '@/components/copilot/UserMessage';
import { AiMessage } from '@/components/copilot/AiMessage';
import { CitationBadge } from '@/components/copilot/CitationBadge';
import { ChatInput } from '@/components/copilot/ChatInput';
import { ActionChips } from '@/components/copilot/ActionChips';
import { EmergencyBanner } from '@/components/alerts/EmergencyBanner';

export default function Home() {
  return (
    <DashboardLayout>
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <EmergencyBanner />
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <PatientProfile />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <VitalsChart />
                <RecentLabs />
              </div>
              <div className="space-y-6">
                <RiskScore />
                <MedicationsList />
              </div>
            </div>
          </div>
        </main>
      </div>
      <CopilotLayout>
        <AiMessage text="Hello Dr. Jenkins. I've reviewed Robert's latest labs and vitals. How can I assist you today?" />
        <UserMessage text="Are there any concerns with prescribing a low-dose beta blocker given his current A1c?" />
        <AiMessage text="Based on the 2026 ACC/AHA guidelines, beta-blockers can potentially mask symptoms of hypoglycemia in patients with elevated A1c (7.2%). However, selective beta-1 blockers are generally safer.">
          <div className="space-y-2 mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">Verified Sources</p>
            <CitationBadge title="ACC/AHA Hypertension Guidelines (2026)" confidence={96} />
            <CitationBadge title="Endocrine Society - Beta Blockers & Diabetes" confidence={89} />
          </div>
        </AiMessage>
        <div className="mt-auto pt-4">
          <ActionChips />
        </div>
      </CopilotLayout>
      <div className="absolute bottom-0 right-0 w-96 lg:w-[450px] z-30">
        <ChatInput />
      </div>
    </DashboardLayout>
  );
}
