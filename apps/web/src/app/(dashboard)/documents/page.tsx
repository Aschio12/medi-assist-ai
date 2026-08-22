import { FileText } from 'lucide-react';
import { DocumentUploader } from '@/components/documents/DocumentUploader';

export default function DocumentsPage() {
  return (
    <div className="h-screen w-full p-8 flex flex-col overflow-hidden relative z-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
            <FileText className="h-6 w-6 text-neon-400" />
            Unstructured Data Ingestion
          </h1>
          <p className="text-zinc-400 text-sm mt-2">Upload handwritten notes, faxes, or PDF lab results for AI semantic extraction.</p>
        </div>
      </div>
      <DocumentUploader />
    </div>
  );
}
