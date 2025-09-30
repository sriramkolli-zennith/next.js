import { HTMLAttributes } from "react"

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export default function Skeleton(props: SkeletonProps) {
  return <div className={`animate-pulse w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-md ${props.className}`}></div>
}