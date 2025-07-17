# CodeSync

<div align="center">
  <img src="https://github.com/your-org/codesync/assets/logo.png" alt="CodeSync Logo" width="128" height="128">
  
  <h3>GitHub Pull Request를 실시간 협업 코드 리뷰 세션으로 변환하세요</h3>
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  <!-- [![npm version](https://img.shields.io/npm/v/@codesync/core.svg)](https://www.npmjs.com/package/@codesync/core) -->
  
  [문서](https://codesync.dev/docs) • [데모](https://demo.codesync.dev) • [블로그](https://codesync.dev/blog)
</div>

---

## 개요

CodeSync는 비동기적인 GitHub PR 리뷰와 실시간 협업의 필요성 사이의 간극을 메웁니다. 개발팀이 공유 커서, 즉각적인 주석, AI 기반 제안과 함께 코드를 함께 리뷰할 수 있게 하며, 모든 내용은 GitHub에 자동으로 동기화됩니다.

### 주요 기능

- **실시간 협업** - 다중 커서, 공유 선택 영역, 즉각적인 참여자 표시
- **AI 기반 제안** - 클릭 한 번으로 상황에 맞는 코드 개선 제안 받기
- **GitHub 동기화** - 모든 토론이 자동으로 PR 코멘트로 동기화
- **리뷰 분석** - 절약된 시간과 협업 지표 추적
- **보안 우선 설계** - GitHub 권한과 OAuth 범위 준수

## 데모

<div align="center">
  <img src="https://github.com/your-org/codesync/assets/demo.gif" alt="CodeSync Demo" width="800">
</div>

## 빠른 시작

### 사전 요구사항

- Node.js 20.x 이상
- PostgreSQL 15+
- pnpm 10.x 이상

### 설치

```bash
git clone https://github.com/joseph0926/codesync.git

pnpm install

cp .env.example .env

pnpm db:migrate

pnpm dev # http://localhost:3000
```

## 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                         브라우저                             │
│  Next.js 15 App Router • React 19 • Monaco Editor          │
│  실시간 WebSocket 클라이언트 • Tailwind CSS v4              │
└────────────────────────┬───────────────────────────────────┘
                         │ tRPC + WebSocket
┌────────────────────────┴───────────────────────────────────┐
│                      API 서버                               │
│  Fastify • tRPC • Prisma ORM                               │
│  GitHub API 연동 • OpenAI 연동                              │
└────────────┬───────────────────────────┬───────────────────┘
             │                           │
      ┌──────┴──────┐            ┌───────┴────────┐
      │ PostgreSQL  │            │     Redis      │
      │   세션      │             │   Presence     │
      │   지표      │             │   Pub/Sub      │
      └─────────────┘            └────────────────┘
```

## 기술 스택

- **프론트엔드**: Next.js 15, React 19, TypeScript, Tailwind CSS v4, Motion
- **백엔드**: tRPC, Prisma, Fastify
- **실시간**: WebSocket, Redis Pub/Sub
- **데이터베이스**: PostgreSQL, Redis

## 설정

### 환경 변수

```bash
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

DATABASE_URL=postgresql://user:pass@localhost:5432/codesync

REDIS_URL=redis://localhost:6379
```
