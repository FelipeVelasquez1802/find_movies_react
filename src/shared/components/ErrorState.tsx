import imgProblemConnect from '@/assets/img_problem_connect.svg';

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
            <img
                src={imgProblemConnect}
                alt="Connection error"
                className={isPageVariant ? "w-80 h-24" : "w-60 h-18"}
            />

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