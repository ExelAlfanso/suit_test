import Image from "next/image";
import { formatDate } from "../utils/DateFormatter";
import { transformImageUrl } from "../utils/TransformImageUrl";
interface IdeaCardProps {
  idea: any;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
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
        />
      </div>
      <div className="p-4">
        <h2 className="text-sm text-gray-500">
          {formatDate(idea.published_at)}
        </h2>
        <h2 className="text-lg font-semibold text-gray-800">{idea.title}</h2>
      </div>
    </div>
  );
}
