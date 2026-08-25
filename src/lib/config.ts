/**
 * Centralized configuration with runtime validation.
 * Validates all required environment variables on app initialization
 * and provides a typed config object.
 *
 * When VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are missing or set to
 * placeholder values, the app gracefully falls back to demo mode (see
 * AuthContext.tsx). No errors are thrown so the app can still build and
 * run without real Supabase credentials.
 */

interface AppConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  phpApiUrl: string;
  aiProxyUrl: string | undefined;
  isDevelopment: boolean;
  isProduction: boolean;
}

function getEnvVar(name: string, fallback: string = ''): string {
  const value = import.meta.env[name];
  if (!value || value === 'placeholder-key' || value.includes('your-project')) {
    return fallback;
  }
  return value;
}

function createConfig(): AppConfig {
  const mode = import.meta.env.MODE;
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'https://placeholder-project.supabase.co');
  const supabaseAnonKey = getEnvVar(
    'VITE_SUPABASE_ANON_KEY',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTkwMDAwMDAwMH0.placeholder'
  );

  // Warn developers when Supabase credentials are missing or placeholder.
  // The app will continue to work in demo mode (localStorage-based auth).
  if (supabaseUrl.includes('placeholder-project')) {
    console.warn(
      '[StockFlow] VITE_SUPABASE_URL is not configured. ' +
      'The app is running in demo mode with local authentication. ' +
      'Set VITE_SUPABASE_URL in your .env file to connect to a real Supabase project.'
    );
  }

  if (supabaseAnonKey.includes('placeholder')) {
    console.warn(
      '[StockFlow] VITE_SUPABASE_ANON_KEY is not configured. ' +
      'The app is running in demo mode with local authentication. ' +
      'Set VITE_SUPABASE_ANON_KEY in your .env file to connect to a real Supabase project.'
    );
  }

  const phpApiUrl = getEnvVar('VITE_PHP_API_URL', 'http://localhost:8080');
  const aiProxyUrl = getEnvVar('VITE_AI_PROXY_URL');

  return {
    supabaseUrl,
    supabaseAnonKey,
    phpApiUrl,
    aiProxyUrl,
    isDevelopment,
    isProduction,
  };
}

export const config: AppConfig = createConfig();
