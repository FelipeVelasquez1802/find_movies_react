interface ScoreProps {
    value?: string;
    className?: string;
}

const Score = (
    {
        value = "N/A",
        className = "",
    }: ScoreProps,
) => {
    return (
        <div className={`flex gap-2 bg-black text-white w-fit p-4 ${className}`}>
            <span>⭐</span>
            <span>{value}</span>
        </div>
    )
}

export default Score