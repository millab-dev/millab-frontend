import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Stack = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={twMerge(
        'grid h-full w-full grid-cols-3 grid-rows-1',
        className
      )}
      {...props}
    >
      {React.Children.map(
        children,
        (child: React.ReactNode): React.ReactNode => {
          if (React.isValidElement(child)) {
            const modifiedClassName = twMerge(
              (child as any).props.className,
              'row-start-1 row-end-1 col-start-1 col-end-[-1] z-10'
            )

            return React.cloneElement(child, {
              className: modifiedClassName,
            } as React.HTMLAttributes<HTMLElement>)
          }
          // Skip non-valid elements (null, undefined, etc.) instead of throwing an error
          return null
        }
      )}
    </div>
  )
}

export default Stack