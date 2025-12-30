'use client';

import { openTelegramLink } from '@/lib/contacts';

interface TelegramLinkProps {
  username: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Telegram link component that uses Telegram WebView API when available
 */
export default function TelegramLink({ username, children, className }: TelegramLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openTelegramLink(username);
  };

  const url = `https://t.me/${username.replace(/^@/, '')}`;

  return (
    <a
      href={url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

