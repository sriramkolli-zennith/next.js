'use client';
import Script from 'next/script';

declare global {
  function initializeChatbot(): void;
}

const Chatbot: React.FC = () => {
  return (
    <>
      <Script src="/chatbot.js" strategy="lazyOnload" onLoad={() => initializeChatbot()} />
    </>
  );
};

export default Chatbot;