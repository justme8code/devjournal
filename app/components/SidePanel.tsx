export const SidePanel = () => {
    return (
        <aside className="w-80 border-l border-neutral-200 p-4 h-full max-lg:hidden sticky top-20">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Tech News</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">AI Updates</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Programming Tutorials</a></li>
            </ul>
        </aside>
    );
};