'use client';

import { useCallback, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Magnetic } from '@/components/Magnetic';

function useRipple() {
  return useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const span = document.createElement('span');
    span.className = 'btn-ripple';
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left - size / 2}px`;
    span.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(span);
    window.setTimeout(() => span.remove(), 650);
  }, []);
}

function GlowLayers() {
  return (
    <>
      <span className="btn-glow" aria-hidden="true" />
      <span className="btn-slide" aria-hidden="true" />
    </>
  );
}

function handleGlowMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
}

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  magnetic?: boolean;
}

export function PrimaryButton({ children, className = '', magnetic = true, onClick, ...props }: PrimaryButtonProps) {
  const ripple = useRipple();
  const isFullWidth = className.includes('w-full');
  const button = (
    <button
      type="button"
      {...props}
      onMouseMove={handleGlowMove}
      onClick={(e) => {
        ripple(e);
        onClick?.(e);
      }}
      className={`btn-primary group ${className}`}
    >
      <GlowLayers />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
  return magnetic && !isFullWidth ? (
    <Magnetic strength={0.3}>{button}</Magnetic>
  ) : (
    button
  );
}

interface PrimaryLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  magnetic?: boolean;
}

export function PrimaryLink({ children, className = '', magnetic = true, onClick, ...props }: PrimaryLinkProps) {
  const ripple = useRipple();
  const link = (
    <a
      {...props}
      onMouseMove={handleGlowMove}
      onClick={(e) => {
        ripple(e);
        onClick?.(e);
      }}
      className={`btn-primary group ${className}`}
    >
      <GlowLayers />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
  return magnetic ? <Magnetic strength={0.3}>{link}</Magnetic> : link;
}

interface OutlineLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function OutlineLink({ children, className = '', ...props }: OutlineLinkProps) {
  return (
    <a {...props} className={`btn-outline ${className}`}>
      {children}
    </a>
  );
}

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function OutlineButton({ children, className = '', ...props }: OutlineButtonProps) {
  return (
    <button type="button" {...props} className={`btn-outline ${className}`}>
      {children}
    </button>
  );
}
