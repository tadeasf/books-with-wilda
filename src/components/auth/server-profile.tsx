import { auth0 } from '@/lib/auth0';
import Image from 'next/image';

export default async function ServerProfile() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    user && (
      <div className="p-6 border rounded-lg">
        {user.picture && (
          <div className="mb-4 text-center">
            <Image
              src={user.picture}
              alt={user.name || 'User profile'}
              className="rounded-full mx-auto"
              width={96}
              height={96}
            />
          </div>
        )}
        
        <h2 className="text-xl font-semibold text-center">{user.name}</h2>
        {user.email && <p className="text-gray-500 text-center">{user.email}</p>}
      </div>
    )
  );
}