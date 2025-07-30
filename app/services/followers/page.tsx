import ServiceForm from '@/components/ServiceForm';
import { FollowersIcon } from '@/components/ServiceIcons';

export default function FollowersPage() {
  return (
    <ServiceForm
      service="followers"
      title="Followers"
      description="Grow your audience with quality followers"
      icon={FollowersIcon}
    />
  );
}