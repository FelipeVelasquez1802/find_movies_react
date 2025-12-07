interface MovieItemProps {
    title: string;
    imageUrl: string;
}

const MovieItem = ({title, imageUrl}: MovieItemProps) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden">
            <img
                src={imageUrl}
                alt={`Poster de ${title}`}
                className="w-full h-auto"
                width={185}
                height={278}
                loading="lazy"
            />
            <h3 className="text-black break-normal text-center p-2">
                {title}
            </h3>
        </div>
    );
}

export default MovieItem;