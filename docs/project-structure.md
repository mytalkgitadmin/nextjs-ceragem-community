# Project Structure

## Tech Stack (overview)

- Next.js (App Router), React, TypeScript
- TanStack Query, Axios
- Tailwind CSS, Radix UI Primitives

## High-level Layout

- 프로젝트 아키텍처 : [Feature-Sliced Design (FSD)](./feature-sliced-design.md)

```
app/                         # Next.js App Router 전용 폴더
  layout.tsx
  page.tsx
src/                         # FSD 전용 폴더
  app/                       # FSD app layer
    ReactQueryProvider.tsx
  views/                     # FSD views layer
  widgets/                   # FSD widgets layer
  entities/                  # FSD entities layer
    friend/
      api/
      model/
      ui/
        Row
      index.ts
  features/                  # FSD features layer
    friend-list/
      model/
        useFriendsQuery.ts
        index.ts
      ui/
        FriendList
        index.ts
      index.ts
  shared/                    # FSD shared layer
    api/
    lib/
```
