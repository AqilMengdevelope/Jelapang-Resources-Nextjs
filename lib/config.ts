export const DEFAULT_WORDPRESS_API_URL =
  "https://cms.jelapangresources.com/wp-json";

export function getServerWordPressApiUrl(): string {
  return process.env.WORDPRESS_API_URL ?? DEFAULT_WORDPRESS_API_URL;
}

export function getClientWordPressApiUrl(): string {
  return (
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ?? DEFAULT_WORDPRESS_API_URL
  );
}
