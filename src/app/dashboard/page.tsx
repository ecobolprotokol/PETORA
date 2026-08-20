import { Suspense } from 'react';
import { ArrowRight, PawPrint, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardStats } from '@/components/domain/dashboard/dashboard-stats';
import { DashboardWidgets } from '@/components/domain/dashboard/dashboard-widgets';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="petora-surface-playful petora-dots relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-accent-foreground">
              <Sparkles className="size-4" /> Hari yang ceria untuk sahabat berbulu
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Selamat datang di Petora</h1>
            <p className="max-w-xl text-pretty leading-6 text-muted-foreground">Kelola perawatan, pelanggan, dan operasional petshop dalam satu ruang kerja yang ringan dan menyenangkan.</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button variant="default">Buat janji baru <ArrowRight data-icon="inline-end" /></Button>
              <Button variant="outline">Lihat aktivitas</Button>
            </div>
          </div>
          <div className="flex size-24 shrink-0 items-center justify-center rounded-[2rem] bg-primary text-primary-foreground shadow-xl shadow-primary/25 sm:size-32">
            <PawPrint className="size-12 sm:size-16" />
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">Loading stats...</div>}>
        <DashboardStats />
      </Suspense>
      <DashboardWidgets />
    </div>
  );
}
