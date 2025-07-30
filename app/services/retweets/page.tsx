import ServiceForm from '@/components/ServiceForm';
import { RetweetsIcon } from '@/components/ServiceIcons';

export default function RetweetsPage() {
  return (
    <ServiceForm
      service="retweets"
      title="Retweets"
      description="Amplify your reach with strategic retweets"
      icon={RetweetsIcon}
    />
  );
}