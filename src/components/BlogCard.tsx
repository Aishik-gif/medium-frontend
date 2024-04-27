import Quill, { Delta } from "quill/core";
import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: Delta;
  publishedDate: string;
  id: string;
}
export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  const cardContent = deltaToText(content);
  const mins = Math.ceil(cardContent.split(" ").length / 200);

  return (
    <div className="flex flex-col max-w-sm md:max-w-2xl lg:max-w-5xl w-full h-fit border-b border-gray-300 p-4 ">
      <Link to={`/blog/${id}`}>
        <div className="flex items-center text-sm">
          <div className="flex justify-center flex-col">
            <Avatar name={authorName} size="small" />
          </div>
          <div className="font-semibold pl-2">{authorName}</div>
          <div className="pl-2 text-slate-500">·</div>
          <div className="font-light text-slate-600 dark:text-slate-200 pl-2">
            {publishedDate}
          </div>
        </div>
        <div className="font-bold text-lg pt-3">{title}</div>
        <div className="pt-1">
          {cardContent.length > 100 ? cardContent.slice(0, 262) + "..." : cardContent}
        </div>
        <div className="text-slate-500 dark:text-slate-200 font-light text-sm pt-5">
          {mins > 1 ? `${mins} minutes` : "Less than a minute"} read
        </div>
      </Link>
    </div>
  );
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`inline-flex items-center justify-center text-xs overflow-hidden bg-gray-700 rounded-full dark:bg-slate-600 ${
        size === "small" ? "w-6 h-6" : "w-9 h-9"
      }`}
    >
      <span
        className={`font-medium text-gray-200 dark:text-gray-300 ${
          size === "small" ? "text-xs" : "text-base"
        }`}
      >
        {name.split(" ")[0].slice(0, 1).toUpperCase()}
      </span>
    </div>
  );
}

function deltaToText(delta: Delta) : string {
  const quill = new Quill(document.createElement('div'));
  quill.setContents(delta);
  return quill.getText();
}