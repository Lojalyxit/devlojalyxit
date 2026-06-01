import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const baseClass =
  'w-full border border-muted rounded-btn px-4 py-3 font-sans font-light text-textdark bg-white ' +
  'placeholder:text-muted focus:outline-none focus:border-primary transition-colors duration-150 text-base'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Field({ label, error, className, id, ...props }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-textdark font-sans">
          {label}
        </label>
      )}
      <input id={id} className={cn(baseClass, error && 'border-danger', className)} {...props} />
      {error && <p className="text-xs text-danger font-sans">{error}</p>}
    </div>
  )
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className, id, ...props }: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-textdark font-sans">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={5}
        className={cn(baseClass, 'resize-y', error && 'border-danger', className)}
        {...props}
      />
      {error && <p className="text-xs text-danger font-sans">{error}</p>}
    </div>
  )
}
