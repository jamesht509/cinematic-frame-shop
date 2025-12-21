import { ReactNode } from 'react';
import { HeaderHT } from './HeaderHT';
import { FooterHT } from './FooterHT';
import { CartDrawer } from '@/components/cart/CartDrawer';

interface LayoutHTProps {
  children: ReactNode;
}

export function LayoutHT({ children }: LayoutHTProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderHT />
      <main className="flex-1">{children}</main>
      <FooterHT />
      <CartDrawer />
    </div>
  );
}
