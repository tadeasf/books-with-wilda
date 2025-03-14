import ClientProfileWrapper from '@/components/auth/client-profile-wrapper';

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      <div className="w-full max-w-md px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>
        <ClientProfileWrapper />
      </div>
    </div>
  );
}