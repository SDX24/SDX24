export default {
  entry: ["apps/*/src/**/*.{ts,tsx}", "packages/*/src/**/*.{ts,tsx}"],
  project: ["apps/*/tsconfig.json", "packages/*/tsconfig.json"],
  ignore: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/build/**"],
  ignoreBinaries: [],
  ignoreDependencies: [],
};
