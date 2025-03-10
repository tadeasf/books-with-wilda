# Setting Up Auth0 Integration with Flarum

This guide explains how to set up Auth0 as a login provider for your Flarum forum.

## Prerequisites

1. A running Flarum instance (via our docker-compose setup)
2. Auth0 account with a configured application
3. Admin access to your Flarum forum

## Step 1: Configure Auth0 Application

First, ensure your Auth0 application is properly configured:

1. Log in to your [Auth0 Dashboard](https://manage.auth0.com/)
2. Go to Applications > Your Application (or create a new one)
3. In the Settings tab, configure the following:
   - **Allowed Callback URLs**: Add `http://localhost:42897/auth/auth0/callback` (development) or your production callback URL
   - **Allowed Web Origins**: Add `http://localhost:42897` (development) or your production Flarum URL
   - **Allowed Logout URLs**: Add `http://localhost:42897` (development) or your production Flarum URL
4. Save changes

## Step 2: Install Required Flarum Extensions

To integrate Auth0 with Flarum, you need to install two extensions:

1. **FoF OAuth**: The base OAuth provider by Friends of Flarum
2. **Generic OAuth**: Extension to connect to any OAuth2 provider (including Auth0)

We've provided a script to automate this installation. Run:

```bash
./setup-flarum-auth0.sh
```

If you prefer manual installation, you can access the Flarum container shell:

```bash
docker exec -it books-with-wilda_flarum_1 sh
```

Inside the container, install the extensions:

```bash
cd /flarum/app
composer require fof/oauth
composer require blt950/oauth-generic
```

## Step 3: Fix Auth0 Username Handling

Auth0 sends user identifiers that may not be compatible with Flarum's username requirements. To fix this issue, you need to modify the Generic OAuth provider code:

1. Access the Flarum container shell:
   ```bash
   docker exec -it books-with-wilda_flarum_1 sh
   ```

2. Locate the Provider.php file:
   ```bash
   cd /flarum/app/vendor/blt950/oauth-generic/src
   ```

3. Edit the Provider.php file:
   ```bash
   vi Provider.php
   ```
   
   Or if you prefer using the exec command directly:
   ```bash
   docker exec -it books-with-wilda_flarum_1 sh -c "cat > /flarum/app/vendor/blt950/oauth-generic/src/Provider.php" < modified_provider.php
   ```

4. Locate the `suggestions` method and replace it with this improved version:
   ```php
   public function suggestions(Registration $registration, $user, string $token)
   {
       /** @var GenericResourceOwner $user */

       $registrationBuilder = $registration;
       
       // Generate a valid username from nickname or sanitized ID
       $validUsername = $user->getName();
       
       // If nickname is empty or too short, use a sanitized version of the ID
       if (empty($validUsername) || strlen($validUsername) < 3) {
           $validUsername = 'user_' . preg_replace('/[^a-zA-Z0-9]/', '', substr($user->getId(), 0, 10));
       } else {
           // Make sure the nickname is valid for Flarum usernames
           $validUsername = preg_replace('/[^a-zA-Z0-9-]/', '', $validUsername);
       }
       
       // Make sure username is at least 3 characters
       if (strlen($validUsername) < 3) {
           $validUsername = 'user_' . rand(100, 999);
       }

       if($this->getSetting('force_userid')) {
           $registrationBuilder->provide('username', $validUsername);
       } else {
           $registrationBuilder->suggest('username', $validUsername);
       }

       if($this->getSetting('force_name')) {
           $registrationBuilder->provide('nickname', $user->getName());
       } else {
           $registrationBuilder->suggest('nickname', $user->getName());
       }

       if($this->getSetting('force_email')) {
           $registrationBuilder->provideTrustedEmail($user->getEmail());
       } else {
           $registrationBuilder->suggest('email', $user->getEmail());
       }

       $registrationBuilder->setPayload($user->toArray());
   }
   ```

5. Save the file and clear the Flarum cache:
   ```bash
   cd /flarum/app
   php flarum cache:clear
   ```

## Step 4: Configure the OAuth Extensions in Flarum

1. Log in to your Flarum admin panel (http://localhost:42897/admin)
2. Go to Extensions and enable both "FoF OAuth" and "Generic OAuth" extensions
3. Navigate to Administration > Settings > FoF OAuth
4. In the Generic section, configure:
   - **Client ID**: Your Auth0 Client ID (set in .env as AUTH0_FLARUM_CLIENT_ID)
   - **Client Secret**: Your Auth0 Client Secret (set in .env as AUTH0_FLARUM_CLIENT_SECRET)
   - **Scope**: `openid profile email`
   - **Authorization Endpoint**: `https://YOUR_AUTH0_DOMAIN/authorize` (Replace with your Auth0 domain)
   - **Token Endpoint**: `https://YOUR_AUTH0_DOMAIN/oauth/token` (Replace with your Auth0 domain)
   - **User Information Endpoint**: `https://YOUR_AUTH0_DOMAIN/userinfo` (Replace with your Auth0 domain)
   - **User ID**: `sub`
   - **Username**: `nickname`
   - **Email**: `email`

## Step 5: Disable Email Verification (Optional)

To disable email verification in Flarum:

1. Log in to your Flarum admin panel
2. Go to Administration > Permissions
3. Find "Email Confirmation" in the Sign Up section
4. Disable it by turning off the toggle for all groups

## Step 6: Customizing the Provider Name (Optional)

If you want to change the displayed name from "Generic" to "Auth0":

1. Go to Flarum's extension directory (in the Docker container)
2. Locate the translation file for the generic provider
3. Edit to change "Generic" to "Auth0"

## Step 7: Testing the Integration

1. Log out of Flarum admin
2. Go to your Flarum homepage
3. Click "Log In" and you should see the Auth0 login option
4. Click on it to be redirected to the Auth0 login page
5. After successful authentication, you should be redirected back to Flarum and logged in

## Troubleshooting

### Common Issues

1. **Callback URL errors**: Ensure the callback URL in Auth0 settings exactly matches what's configured in Flarum.
2. **Scope issues**: Make sure you include necessary scopes (`openid profile email`).
3. **User field mapping**: If user data isn't mapping correctly, check your field configurations in Flarum.

### Debug Mode

To enable debug mode:

1. Edit your `.env` file to set `FLARUM_DEBUG=true`
2. Restart the Flarum container:
   ```bash
   docker-compose restart flarum
   ```

## Resources

- [Auth0 Documentation](https://auth0.com/docs/)
- [Generic OAuth Extension](https://github.com/blt950/flarum-ext-oauth-generic)
- [FoF OAuth Extension](https://github.com/FriendsOfFlarum/oauth) 