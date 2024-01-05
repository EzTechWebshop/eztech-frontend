import { cn } from '@/lib/utils';
import { Heading } from '@radix-ui/themes';
import React from 'react'

type PageLogoProps = {
    className?: string;
}
export default function PageLogo({...props}: PageLogoProps) {
    const { className } = props;
  return (
    <div className={cn("", className)}>
      <Heading size={"8"}>EzTech</Heading>
    </div>
  )
}
