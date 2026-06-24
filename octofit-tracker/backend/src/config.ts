export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.githubpreview.dev`;
  }

  return `http://localhost:8000`;
}
