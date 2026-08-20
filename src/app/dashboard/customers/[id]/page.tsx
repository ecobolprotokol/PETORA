import { CustomerService } from '@/lib/services/customer.service';
import { CustomerForm } from '@/components/domain/customer/customer-form';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PetCard } from '@/components/domain/pet/pet-card';
import { PetService } from '@/lib/services/pet.service';
import Link from 'next/link';

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = await CustomerService.getById(id);
  if (!customer) {
    notFound();
  }

  const petsResult = await PetService.list({ customer_id: id, limit: 10 });
  const pets = petsResult.data;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{customer.name}</h1>
          <p className="text-muted-foreground">Customer details</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/customers/${customer.id}/edit`}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Edit
          </Link>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Phone:</span> {customer.phone || '-'}</div>
              <div><span className="text-muted-foreground">Email:</span> {customer.email || '-'}</div>
              <div><span className="text-muted-foreground">Address:</span> {customer.address || '-'}</div>
              <div><span className="text-muted-foreground">City:</span> {customer.city || '-'}</div>
              <div><span className="text-muted-foreground">Postal Code:</span> {customer.postal_code || '-'}</div>
              <div><span className="text-muted-foreground">Gender:</span> {customer.gender || '-'}</div>
              <div><span className="text-muted-foreground">Birth Date:</span> {customer.birth_date || '-'}</div>
              <div><span className="text-muted-foreground">Emergency Contact:</span> {customer.emergency_contact || '-'}</div>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Pets</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
              {pets.length === 0 && (
                <p className="text-muted-foreground text-sm">No pets found</p>
              )}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
              {customer.tags.length === 0 && (
                <p className="text-muted-foreground text-sm">No tags</p>
              )}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Status</h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-muted-foreground">Status:</span> {customer.is_active ? 'Active' : 'Inactive'}</div>
              <div><span className="text-muted-foreground">Guest:</span> {customer.is_guest ? 'Yes' : 'No'}</div>
              <div><span className="text-muted-foreground">Referral:</span> {customer.referral_code || '-'}</div>
            </div>
          </Card>
          {customer.notes && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Notes</h3>
              <p className="text-sm text-muted-foreground">{customer.notes}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
