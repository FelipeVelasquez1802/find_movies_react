interface ErrorStateProps {
    title?: string;
    message?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    variant?: 'page' | 'section';
}

const ErrorState = ({
    title = "Oops....",
    message = "Something went wrong.",
    buttonText = "Refresh",
    onButtonClick = () => window.location.reload(),
    variant = 'section'
}: ErrorStateProps) => {
    const isPageVariant = variant === 'page';

    return (
        <div className={`flex flex-col items-center justify-center gap-6 ${isPageVariant ? 'flex-1' : 'py-20'}`}>
            <svg
                width={isPageVariant ? "200" : "150"}
                height={isPageVariant ? "120" : "90"}
                viewBox="0 0 200 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={isPageVariant ? "text-white" : "text-gray-400"}
            >
                <path
                    d="M20 60 L70 60"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <rect
                    x="70"
                    y="45"
                    width="20"
                    height="30"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    rx="2"
                />
                <line x1="75" y1="50" x2="75" y2="70" stroke="currentColor" strokeWidth="1.5" />
                <line x1="80" y1="50" x2="80" y2="70" stroke="currentColor" strokeWidth="1.5" />
                <line x1="85" y1="50" x2="85" y2="70" stroke="currentColor" strokeWidth="1.5" />

                <line x1="90" y1="50" x2="95" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="90" y1="60" x2="95" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="90" y1="70" x2="95" y2="75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                <rect
                    x="110"
                    y="45"
                    width="20"
                    height="30"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    rx="2"
                />
                <line x1="115" y1="50" x2="115" y2="70" stroke="currentColor" strokeWidth="1.5" />
                <line x1="120" y1="50" x2="120" y2="70" stroke="currentColor" strokeWidth="1.5" />
                <line x1="125" y1="50" x2="125" y2="70" stroke="currentColor" strokeWidth="1.5" />

                <path
                    d="M130 60 L180 60"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>

            <div className="text-center">
                <h1 className={`font-bold mb-4 ${isPageVariant ? 'text-white text-4xl' : 'text-gray-900 text-2xl'}`}>
                    {title}
                </h1>
                <p className={`mb-8 ${isPageVariant ? 'text-gray-400 text-lg' : 'text-gray-600 mb-6'}`}>
                    {message}
                </p>
                <button
                    onClick={onButtonClick}
                    className="px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default ErrorState;