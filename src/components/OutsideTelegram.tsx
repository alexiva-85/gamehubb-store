'use client';

import { useState } from 'react';
import { Button, Section, Text, Title } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page';

type OutsideTelegramProps = {
  onMockMode?: () => void;
};

export function OutsideTelegram({ onMockMode }: OutsideTelegramProps) {
  const [showMock, setShowMock] = useState(false);
  const botUrl = process.env.NEXT_PUBLIC_TG_BOT_URL;
  const allowMock = process.env.NEXT_PUBLIC_ALLOW_TG_MOCK === 'true';

  const handleMockMode = () => {
    setShowMock(true);
    onMockMode?.();
  };

  return (
    <Page>
      <Section>
        <Title>Open this app in Telegram</Title>
        <Text>
          This is a Telegram Mini App. Please open it from the bot.
        </Text>
        {botUrl && (
          <Button
            href={botUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="l"
          >
            Open bot
          </Button>
        )}
      </Section>

      {allowMock && (
        <Section>
          <Title>For developers</Title>
          {!showMock ? (
            <Button onClick={handleMockMode} size="m">
              Continue in mock mode
            </Button>
          ) : (
            <Text>Mock mode enabled. Reloading...</Text>
          )}
        </Section>
      )}
    </Page>
  );
}

