import type { HTMLAttributes } from 'react'
import './Panel.css'

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const classes = ['panel', className].filter(Boolean).join(' ')
  return <div className={classes} {...props} />
}
