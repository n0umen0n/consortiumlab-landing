'use client'

import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'l' | 'm' | 's'

interface SharedProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  className?: string
  children: ReactNode
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>
type LinkButtonProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: string
  }

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function buttonClassName({
  variant = 'primary',
  size = 'm',
  fullWidth = false,
  loading = false,
  className,
}: Omit<SharedProps, 'children'>) {
  return joinClasses(
    'cf-button',
    `cf-button-${variant}`,
    `cf-button-${size}`,
    fullWidth && 'w-full',
    loading && 'is-loading',
    className
  )
}

function ButtonContent({
  loading = false,
  children,
}: Pick<SharedProps, 'loading' | 'children'>) {
  return (
    <>
      <span className="cf-button-spinner" aria-hidden={loading ? 'false' : 'true'} />
      <span className="cf-button-label">{children}</span>
    </>
  )
}

export function Button({
  variant = 'primary',
  size = 'm',
  fullWidth = false,
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={buttonClassName({ variant, size, fullWidth, loading, className })}
    >
      <ButtonContent loading={loading}>{children}</ButtonContent>
    </button>
  )
}

export function LinkButton({
  variant = 'primary',
  size = 'm',
  fullWidth = false,
  loading = false,
  className,
  children,
  href,
  target,
  rel,
  ...props
}: LinkButtonProps) {
  const linkClassName = buttonClassName({ variant, size, fullWidth, loading, className })
  const resolvedRel = target === '_blank' ? rel ?? 'noreferrer noopener' : rel

  if (href.startsWith('http')) {
    return (
      <a href={href} target={target} rel={resolvedRel} className={linkClassName} {...props}>
        <ButtonContent loading={loading}>{children}</ButtonContent>
      </a>
    )
  }

  return (
    <Link href={href} className={linkClassName} {...props}>
      <ButtonContent loading={loading}>{children}</ButtonContent>
    </Link>
  )
}
