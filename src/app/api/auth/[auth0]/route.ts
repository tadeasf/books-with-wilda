// Edge API Routes (API Routes with the "edge" runtime) cannot use the Auth0 SDK directly.
// Instead, we should use the edge-compatible API route handler from Auth0.
// For now, we'll maintain compatibility and redirect to the API routes handled by middleware.
// The middleware will handle all auth routes automatically
// We just need to export handlers that the middleware will intercept

export const dynamic = 'force-dynamic';

export async function GET() {
  // This is a placeholder - the Auth0 middleware will intercept these requests
  // and handle the routing automatically
}

// Ensure we handle all HTTP methods that Auth0 might use
export { GET as POST, GET as DELETE, GET as PUT, GET as PATCH };