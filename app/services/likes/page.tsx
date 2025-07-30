import ServiceForm from '@/components/ServiceForm';
import { LikesIcon } from '@/components/ServiceIcons';

export default function LikesPage() {
  return (
    <ServiceForm
      service="likes"
      title="Tweet Likes"
      description="Boost your tweet engagement with authentic likes"
      icon={LikesIcon}
    />
  );
}