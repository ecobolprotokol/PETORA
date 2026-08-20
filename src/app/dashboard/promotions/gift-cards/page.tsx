import { GiftCardTable } from '@/components/domain/promotion/gift-card-table';
import { GiftCardService } from '@/lib/services/gift-card.service';

export default async function GiftCardsPage(): Promise<React.ReactElement> {
  const result = await GiftCardService.listGiftCards();
  const giftCards = result.data;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gift Cards</h1>
        <p className="text-muted-foreground">Kelola gift card</p>
      </div>
      <GiftCardTable giftCards={giftCards} />
    </div>
  );
}
