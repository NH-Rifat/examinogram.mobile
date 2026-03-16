export const env = {
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? "https://api.examinogram.com",
  APP_ENV: (process.env.EXPO_PUBLIC_APP_ENV ?? "development") as
    | "development"
    | "staging"
    | "production",
};
