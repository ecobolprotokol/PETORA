import { FeedbackTable } from '@/components/domain/feedback/feedback-table';
import { FeedbackService } from '@/lib/services/feedback.service';
import type { Feedback } from '@/types/feedback';

export default async function FeedbackPage(): Promise<React.ReactElement> {
  let feedback: Feedback[] = [];
  try {
    const result = await FeedbackService.listFeedbacks({ limit: 100 });
    feedback = result.data as unknown as Feedback[];
  } catch {
    feedback = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Feedback</h1>
        <p className="text-muted-foreground">Kelola umpan balik pelanggan</p>
      </div>
      <FeedbackTable feedback={feedback} />
    </div>
  );
}
