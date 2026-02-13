export default function AIIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M9.5 2l1.5 4.5L15.5 8l-4.5 1.5L9.5 14l-1.5-4.5L3.5 8l4.5-1.5L9.5 2z" />
            <path d="M18 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
            <path d="M5.5 15l.75 2.25L8.5 18l-2.25.75L5.5 21l-.75-2.25L2.5 18l2.25-.75L5.5 15z" />
        </svg>
    );
}
