import Link from "next/link";
import { formatDate } from "../utils/DateFormatter";
import { transformImageUrl } from "../utils/TransformImageUrl";
import Image from "next/image";
interface IdeaCardProps {
  idea?: any;
  isLoading?: boolean;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <Link
      href={`/ideas/${idea.slug}`}
      className="relative overflow-hidden bg-white rounded-lg shadow-md"
    >
      <div className="w-full relative aspect-4/3">
        <Image
          src={transformImageUrl(
            idea.medium_image?.[0]?.url || "/images/banner1.jpg"
          )}
          alt={idea.title}
          loading="lazy"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="p-4">
        <h2 className="text-sm text-gray-500">
          {formatDate(idea.published_at)}
        </h2>
        <h2 className="text-lg font-semibold text-gray-800">{idea.title}</h2>
      </div>
    </Link>
  );
}
