import { TelehealthLayout } from '@/components/telehealth/TelehealthLayout';
import { VideoGrid } from '@/components/telehealth/VideoGrid';
import { AmbientScribe } from '@/components/telehealth/AmbientScribe';
import { SOAPNote } from '@/components/telehealth/SOAPNote';

export default function TelehealthPage() {
  return (
    <TelehealthLayout>
      <div className="col-span-1 lg:col-span-2 space-y-6 flex flex-col h-full">
        <VideoGrid />
        <AmbientScribe />
      </div>
      <div className="col-span-1 h-full">
        <SOAPNote />
      </div>
    </TelehealthLayout>
  );
}
