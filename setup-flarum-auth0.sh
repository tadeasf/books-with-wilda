#!/bin/bash
# Script to set up Auth0 integration with Flarum and add a link back to the main site

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up Auth0 integration for Flarum...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if Flarum container is running
if ! docker ps | grep -q books-with-wilda_flarum_1; then
    echo -e "${RED}Error: Flarum container is not running. Please start your docker-compose services first:${NC}"
    echo -e "${YELLOW}docker-compose up -d${NC}"
    exit 1
fi

echo -e "${GREEN}Flarum container found. Installing OAuth extensions...${NC}"

# Install FoF OAuth extension
echo -e "${YELLOW}Installing FoF OAuth extension...${NC}"
docker exec -it books-with-wilda_flarum_1 sh -c "cd /flarum/app && composer require fof/oauth"

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install FoF OAuth extension. Please check logs for details.${NC}"
    exit 1
fi

# Install Generic OAuth extension
echo -e "${YELLOW}Installing Generic OAuth extension...${NC}"
docker exec -it books-with-wilda_flarum_1 sh -c "cd /flarum/app && composer require blt950/oauth-generic"

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install Generic OAuth extension. Please check logs for details.${NC}"
    exit 1
fi

# Install FoF Links extension
echo -e "${YELLOW}Installing FoF Links extension...${NC}"
docker exec -it books-with-wilda_flarum_1 sh -c "cd /flarum/app && composer require fof/links"

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install FoF Links extension. Please check logs for details.${NC}"
    exit 1
fi

# Update the Provider.php file to fix username handling
echo -e "${YELLOW}Updating OAuth Provider code to fix Auth0 username handling...${NC}"

# Create a temporary file with the updated code
cat > /tmp/Provider.php.updated << 'EOL'
<?php

/*
 * This file is part of Generic OAuth
 *
 * (c) William Turnage <blt950@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace BLT950\OAuth\Generic;

use Flarum\Forum\Auth\Registration;
use FoF\OAuth\Provider as BaseProvider;
use League\OAuth2\Client\Provider\GenericProvider as OAuth2Provider;
use League\OAuth2\Client\Provider\GenericResourceOwner;

/**
 * @property OAuth2Provider $provider
 */
class Provider extends BaseProvider
{
    /**
     * @param Registration $registration
     * @param GenericResourceOwner $user
     * @param string $token
     */
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
}
EOL

# Copy the updated file to the container
docker cp /tmp/Provider.php.updated books-with-wilda_flarum_1:/flarum/app/vendor/blt950/oauth-generic/src/Provider.php

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to update Provider.php. Please check logs for details.${NC}"
else
    echo -e "${GREEN}Successfully updated Auth0 username handling code.${NC}"
fi

# Disable email verification by updating the database
echo -e "${YELLOW}Disabling email verification requirement...${NC}"
FLARUM_DB_PASSWORD=$(grep FLARUM_DB_PASSWORD .env | cut -d '=' -f2 || echo "flarum_password")

docker exec -it books-with-wilda-flarum-db-1 mysql -u flarum -p"$FLARUM_DB_PASSWORD" -e "
USE flarum;
UPDATE flarum_permissions 
SET permission = 'reply' 
WHERE permission = 'viewForum' 
AND group_id = 3;

UPDATE flarum_permissions 
SET permission = 'startDiscussion' 
WHERE permission = 'viewForum' 
AND group_id = 3;
"

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to disable email verification. You may need to do this manually.${NC}"
else
    echo -e "${GREEN}Successfully disabled email verification requirement.${NC}"
fi

# Configure the link back to the main site
echo -e "${YELLOW}Configuring link back to the main site...${NC}"

# Get the main site URL from environment variables
MAIN_SITE_URL=$(grep APP_BASE_URL .env | cut -d '=' -f2 || echo "https://books.tadeasfort.com")

# Add the link to the database
docker exec -it books-with-wilda-flarum-db-1 mysql -u flarum -p"$FLARUM_DB_PASSWORD" -e "
USE flarum;
INSERT INTO flarum_settings (key, value) 
VALUES ('fof-links.items', '[{\"title\":\"Books with Wilda\",\"url\":\"$MAIN_SITE_URL\",\"position\":\"header\",\"icon\":\"fas fa-book\"}]')
ON DUPLICATE KEY UPDATE value = '[{\"title\":\"Books with Wilda\",\"url\":\"$MAIN_SITE_URL\",\"position\":\"header\",\"icon\":\"fas fa-book\"}]';
"

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to configure link back to main site. You may need to do this manually.${NC}"
else
    echo -e "${GREEN}Successfully configured link back to main site.${NC}"
fi

# Clear cache
echo -e "${YELLOW}Clearing Flarum cache...${NC}"
docker exec -it books-with-wilda_flarum_1 sh -c "cd /flarum/app && php flarum cache:clear"

echo -e "${GREEN}✅ Extensions installed successfully!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Log in to Flarum admin panel: ${GREEN}https://books.forum.tadeasfort.com/admin${NC}"
echo -e "2. Enable all installed extensions (FoF OAuth, Generic OAuth, and FoF Links)"
echo -e "3. Configure Auth0 integration as described in ${GREEN}AUTH0_FLARUM_SETUP.md${NC}"
echo

echo -e "${YELLOW}Auth0 configuration details:${NC}"
echo -e "Auth0 Domain: ${GREEN}$(grep AUTH0_DOMAIN .env | cut -d '=' -f2)${NC}"
echo -e "Client ID: ${GREEN}$(grep AUTH0_FLARUM_CLIENT_ID .env | cut -d '=' -f2)${NC}"
echo -e "Callback URL: ${GREEN}$(grep AUTH0_FLARUM_CALLBACK_URL .env | cut -d '=' -f2)${NC}"
echo

echo -e "${YELLOW}For more details, see the AUTH0_FLARUM_SETUP.md file.${NC}"

echo -e "${GREEN}✅ Link back to main site configured!${NC}"
echo -e "${YELLOW}You should now see a 'Books with Wilda' link in the forum header.${NC}"
echo -e "${YELLOW}You can customize this link further in the admin panel under the Links section.${NC}" 
