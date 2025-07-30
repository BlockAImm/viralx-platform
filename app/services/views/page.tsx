import ServiceForm from '@/components/ServiceForm';
import { ViewsIcon } from '@/components/ServiceIcons';

export default function ViewsPage() {
  return (
    <ServiceForm
      service="views"
      title="Tweet Views"
      description="Increase visibility and impressions for your tweets"
      icon={ViewsIcon}
    />
  );
}