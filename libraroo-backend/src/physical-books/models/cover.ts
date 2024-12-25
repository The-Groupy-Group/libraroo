export const Covers = {
  PAPERBACK: 'paperback',
  HARDCOVER: 'hardcover',
} as const;

export type cover = (typeof Covers)[keyof typeof Covers];
