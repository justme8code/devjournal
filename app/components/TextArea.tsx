export const TextArea = ({
                             placeholder,
                             content,
                             onChange,
                             onKeyDown,
                             className,
                         }: {
    placeholder: string;
    content: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void,
    className?: string
}) => {
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto"; // Reset height to auto to recalculate
        e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on content
        onChange(e);
    };

    return (
        <textarea
            value={content}
            onChange={handleInput}
            placeholder={placeholder}
            className={`border-none outline-none overflow-hidden resize-none ${className}`}
            style={{ minHeight: "50px" }} // Set a minimum height
            onKeyDown={onKeyDown}
            autoFocus={true}
        />
    );
};
