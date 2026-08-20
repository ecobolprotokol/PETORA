import Link from 'next/link';
import { ArrowRight, CalendarDays, PawPrint, ShieldCheck, Store } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const capabilities = [
  { icon: CalendarDays, title: 'Operasional terjadwal', description: 'Kelola appointment, antrean, grooming, dan pet hotel dari satu alur kerja.' },
  { icon: PawPrint, title: 'Data hewan terpadu', description: 'Riwayat pelanggan, hewan, rekam medis, resep, dan loyalty tersimpan terhubung.' },
  { icon: ShieldCheck, title: 'Kontrol akses aman', description: 'Akses berbasis peran dan cabang menjaga data operasional tetap terisolasi.' },
];

export default function Home(): React.ReactNode {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b bg-card/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight" aria-label="Petora beranda">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Store data-icon="inline-start" /></span>
            Petora
          </Link>
          <Link href="/login" className={buttonVariants({ variant: 'outline' })}>Masuk</Link>
        </div>
      </header>
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-12 px-6 py-20 lg:flex-row lg:items-center">
        <div className="flex max-w-2xl flex-col gap-7">
          <div className="flex w-fit items-center gap-2 rounded-full border bg-muted px-3 py-1 text-sm text-muted-foreground"><PawPrint data-icon="inline-start" /> Platform operasional petshop modern</div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Semua kebutuhan petcare, dalam satu sistem yang jelas.</h1>
          <p className="max-w-xl text-pretty text-lg leading-8 text-muted-foreground">Petora membantu tim petshop dan petcare menjalankan layanan harian dengan data yang terhubung, proses yang terukur, dan akses yang aman.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>Buka dashboard <ArrowRight data-icon="inline-end" /></Link>
            <Link href="/kiosk" className={cn(buttonVariants({ size: 'lg', variant: 'ghost' }))}>Buka kiosk layanan</Link>
          </div>
        </div>
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader><CardTitle>Ruang kerja Petora</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 rounded-xl border bg-muted/40 p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon /></span>
                <div className="flex flex-col gap-1"><h2 className="font-medium">{title}</h2><p className="text-sm leading-6 text-muted-foreground">{description}</p></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
