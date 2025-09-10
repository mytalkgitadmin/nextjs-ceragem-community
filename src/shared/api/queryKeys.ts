export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    aaaa: () => [...queryKeys.auth.all, 'aaaa'] as const,
  },
  user: {
    all: ['user'] as const,
    aaaa: () => [...queryKeys.user.all, 'aaaa'] as const,
  },
  profile: {
    all: ['profile'] as const,
    aaaa: () => [...queryKeys.profile.all, 'aaaa'] as const,
  },
  chat: {
    all: ['chat'] as const,
    aaaa: () => [...queryKeys.chat.all, 'aaaa'] as const,
  },
  notification: {
    all: ['notification'] as const,
    aaaa: () => [...queryKeys.notification.all, 'aaaa'] as const,
  },
} as const;
