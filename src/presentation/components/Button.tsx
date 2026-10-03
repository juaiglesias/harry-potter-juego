import type { ComponentPropsWithRef } from 'react'
import './Button.css'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const classes = ['button', `button--${variant}`, className].filter(Boolean).join(' ')
  return <button className={classes} {...props} />
}
