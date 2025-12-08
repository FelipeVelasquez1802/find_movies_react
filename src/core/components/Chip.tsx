const Chip = (
    {text}: { text: string }
) => {
    return (
        <div>
        <span className="px-3 py-1 bg-gray-dark text-white text-sm rounded-full border-[0.1rem] border-gray-700">
            {text}
        </span>
        </div>
    )
}

export default Chip