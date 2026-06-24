import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
export const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
export const CODESPACE_NAME = process.env.CODESPACE_NAME;

export function getApiBaseUrl(): string {
  if (CODESPACE_NAME) {
    return `https://${CODESPACE_NAME}-8000.githubpreview.dev`;
  }

  return 'http://localhost:8000';
}
