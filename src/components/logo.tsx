import { cn } from '@/lib/utils'

interface LogoProps {
    className?: string
}

export const Logo = ({ className }: LogoProps) => {
    return (
        <svg
            viewBox="0 0 100 100"
            className={cn('h-10 w-10', className)}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Keyboard key */}
            <rect
                x="35"
                y="35"
                width="30"
                height="30"
                rx="4"
                stroke="#482B13"
                strokeWidth="4"
                fill="transparent"
            />

            {/* Key letter "W" */}
            <path
                d="M43 45L46 55L50 45L54 55L57 45"
                stroke="#482B13"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
} 