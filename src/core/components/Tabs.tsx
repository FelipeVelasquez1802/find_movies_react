import {type ReactNode} from 'react';

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
            <div className="flex relative">
                {tabs.map((tab) => (
                    <div className="flex flex-col items-center">
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                                px-6 py-3 font-medium text-md transition-colors relative
                                ${activeTab === tab.id
                                ? 'text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }
                            `}
                        >
                            {tab.label}
                        </button>
                        {activeTab === tab.id && (
                            <span className="block bg-white w-full h-[0.3rem] rounded z-10"/>
                        )}
                    </div>
                ))}
                <span className="absolute bottom-[0.1rem] block bg-gray-800 w-full h-[0.1rem] rounded"/>
            </div>

            <div className="mt-6">
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
};

export default Tabs;