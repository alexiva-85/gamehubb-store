import { openLink } from '@tma.js/sdk-react';
import { type FC, type MouseEventHandler, type JSX, useCallback } from 'react';
import {
  type LinkProps as NextLinkProps,
  default as NextLink,
} from 'next/link';

import { classNames } from '@/css/classnames';

import './Link.css';

export interface LinkProps
  extends NextLinkProps,
    Omit<JSX.IntrinsicElements['a'], 'href'> {}

export const Link: FC<LinkProps> = ({
  className,
  onClick: propsOnClick,
  href,
  ...rest
}) => {
  const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      propsOnClick?.(e);

      // Compute if target path is external. In this case we would like to open link using
      // TMA method.
      let path: string;
      if (typeof href === 'string') {
        path = href;
      } else {
        const { search = '', pathname = '', hash = '' } = href;
        path = `${pathname}?${search}#${hash}`;
      }

      const targetUrl = new URL(path, window.location.toString());
      const currentUrl = new URL(window.location.toString());
      const isExternal =
        targetUrl.protocol !== currentUrl.protocol ||
        targetUrl.host !== currentUrl.host;

      if (isExternal) {
        e.preventDefault();
        try {
          // Проверяем, что мы в Telegram перед вызовом openLink
          const inTelegram = typeof window !== 'undefined' && !!(window as any).Telegram?.WebApp;
          const allowMock = (process.env.NEXT_PUBLIC_ALLOW_TG_MOCK || 'false') === 'true';
          
          if (inTelegram || allowMock) {
            openLink(targetUrl.toString());
          } else {
            // Fallback для обычного браузера
            window.open(targetUrl.toString(), '_blank', 'noopener,noreferrer');
          }
        } catch (error) {
          console.warn('Failed to open link via Telegram SDK:', error);
          // Fallback для обычного браузера
          window.open(targetUrl.toString(), '_blank', 'noopener,noreferrer');
        }
      }
    },
    [href, propsOnClick],
  );

  return (
    <NextLink
      {...rest}
      href={href}
      onClick={onClick}
      className={classNames(className, 'link')}
    />
  );
};
