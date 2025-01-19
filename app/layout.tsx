import type { Metadata } from 'next';
import './styles/global.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Poppins } from 'next/font/google';
import theme from './styles/theme';
import { StoreProvider } from '@/app/lib/store/StoreProvider';
import { Container, CssBaseline } from '@mui/material';

const poppins = Poppins({
  subsets: ['latin'], // Specify subsets (e.g., latin)
  weight: ['400', '500', '600', '700'], // Specify weights you need
});

export const metadata: Metadata = {
  title: 'Todo | Reza Nazeri | Ideall Tech',
  description: 'Entry task for Ideall Tech',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <StoreProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Container maxWidth="sm" sx={{ p: 0 }}>
                {children}
              </Container>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
