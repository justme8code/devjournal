export default function Loading() {
    return (
        <div className="p-4 space-y-4 pt-20 animate-pulse">
            {/* Repeat shimmer effect for multiple items */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg w-full"></div>
            ))}
        </div>
);
}
