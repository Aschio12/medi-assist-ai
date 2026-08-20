import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { PatientProfile } from '@/components/patient/PatientProfile';
import { VitalsChart } from '@/components/patient/VitalsChart';
import { RecentLabs } from '@/components/patient/RecentLabs';
import { RiskScore } from '@/components/patient/RiskScore';
import { CopilotLayout } from '@/components/copilot/CopilotLayout';
import { UserMessage } from '@/components/copilot/UserMessage';
import { AiMessage } from '@/components/copilot/AiMessage';
import { CitationBadge } from '@/components/copilot/CitationBadge';
import { ChatInput } from '@/components/copilot/ChatInput';
import { ActionChips } from '@/components/copilot/ActionChips';

export default function Home() {
  return (
    <DashboardLayout>
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 pt-4 scrollbar-hide">
          <div className="max-w-6xl mx-auto space-y-8">
            <PatientProfile />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <VitalsChart />
                <RecentLabs />
              </div>
              <div className="space-y-8">
                <RiskScore />
              </div>
            </div>
          </div>
        </main>
      </div>
      <CopilotLayout>
        <AiMessage text="System initialized. Monitoring Robert Chen's active vitals. How can I assist you today?" />
        <UserMessage text="Any concerns with his recent A1c trend?" />
        <AiMessage text="Robert's A1c has remained extremely stable at 5.4% over the last 6 months. This indicates excellent glycemic control under the current medication protocol.">
          <div className="space-y-2 mt-4">
            <p className="text-[10px] text-zinc-500 font-semibold mb-2 uppercase tracking-widest">Linked Records</p>
            <CitationBadge title="Lab Report: Oct 12, 2026" confidence={99} />
            <CitationBadge title="Endocrinology Consult Note" confidence={94} />
          </div>
        </AiMessage>
        <div className="mt-4">
          <ActionChips />
        </div>
        <div className="flex-1"></div>
        <ChatInput />
      </CopilotLayout>
    </DashboardLayout>
  );
}
