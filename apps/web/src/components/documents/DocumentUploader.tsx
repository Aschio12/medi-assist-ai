'use client';
import { useState } from 'react';
import { UploadCloud, File, CheckCircle2 } from 'lucide-react';
import { ProcessingStatus } from './ProcessingStatus';
import { ExtractedDataViewer } from './ExtractedDataViewer';

export function DocumentUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsProcessing(true);
      // Mock network delay for processing
      setTimeout(() => {
        setIsProcessing(false);
        setIsDone(true);
      }, 4000);
    }
  };

  if (isDone) return <ExtractedDataViewer fileName={file?.name || 'document.pdf'} />;
  if (isProcessing) return <ProcessingStatus fileName={file?.name || 'document.pdf'} />;

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-12 border-dashed border-2 border-white/20 hover:border-neon-500/50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden group">
        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" onChange={handleUpload} accept=".pdf,.png,.jpg,.jpeg" />
        <div className="h-20 w-20 rounded-full bg-neon-500/10 flex items-center justify-center border border-neon-500/20 mb-6 group-hover:scale-110 transition-transform neon-glow">
          <UploadCloud className="h-10 w-10 text-neon-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Drag & Drop clinical documents</h3>
        <p className="text-zinc-400 text-sm max-w-md">Supports PDF, JPG, and PNG up to 50MB. HIPAA-compliant ephemeral processing.</p>
        <div className="mt-8 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-zinc-300 text-sm font-medium">Browse Files</div>
      </div>
    </div>
  );
}
