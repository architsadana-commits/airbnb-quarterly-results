#!/bin/bash
# Deploy Airbnb Quarterly Results to Cloudflare Pages
# Run: bash deploy.sh

set -e

PROJECT="airbnb-quarterly-results"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Deploying $PROJECT to Cloudflare Pages ==="
echo ""

# Check if logged in
if ! wrangler whoami &>/dev/null; then
  echo "Not logged in to Cloudflare. Opening browser to authenticate..."
  wrangler login
fi

echo ""
echo "Deploying files from: $DIR"
echo ""

wrangler pages deploy "$DIR" --project-name="$PROJECT"

echo ""
echo "=== Deployment complete ==="
echo ""
echo "Next steps:"
echo "  1. Go to https://one.dash.cloudflare.com/"
echo "  2. Navigate to: Access > Applications > Add an application"
echo "  3. Choose 'Self-hosted'"
echo "  4. Set application domain to: $PROJECT.pages.dev"
echo "  5. Create policy: Allow -> Emails ending in -> @airbnb.com"
echo "  6. Save"
echo ""
echo "Your site will be at: https://$PROJECT.pages.dev"
