import { type ReactNode } from 'react';

export interface Tab {
    id: string;
    label: string;
    content: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    className?: string;
}

const Tabs = ({ tabs, activeTab, onTabChange, className = '' }: TabsProps) => {
    return (
        <div className={className}>
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
                            px-6 py-3 font-medium text-sm transition-colors relative
                            ${activeTab === tab.id
                                ? 'text-white border-b-2 border-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }
                        `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
};

export default Tabs;