import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import { TRPCReactProvider } from './_trpc/client';

import type { Metadata } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CodeSync',
  description:
    'CodeSync는 비동기적인 GitHub PR 리뷰와 실시간 협업의 필요성 사이의 간극을 메웁니다. 개발팀이 공유 커서, 즉각적인 주석, AI 기반 제안과 함께 코드를 함께 리뷰할 수 있게 하며, 모든 내용은 GitHub에 자동으로 동기화됩니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
