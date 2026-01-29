'use client';

import { AppShell } from '@/components/AppShell';
import { DocumentViewer } from '@/components/DocumentViewer';
import { useStore } from '@/lib/store';

export default function DocumentsPage() {
  const { state } = useStore();

  return (
    <AppShell>
      <DocumentViewer documents={state.documents} />
    </AppShell>
  );
}
