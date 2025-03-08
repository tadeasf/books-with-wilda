import ClientProfileWrapper from '@/components/auth/client-profile-wrapper';

export default function ProfilePage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <ClientProfileWrapper />
    </div>
  );
}