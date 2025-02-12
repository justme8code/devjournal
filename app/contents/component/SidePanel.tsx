export const SidePanel = () => {
    return (
        <div className="w-80 border-l border-neutral-200 p-4 h-full sticky top-0">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Tech News</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">AI Updates</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Programming Tutorials</a></li>
            </ul>
        </div>
    );
};