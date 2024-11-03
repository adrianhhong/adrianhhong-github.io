import DateFormatter from "../shared/date-formatter";
import Link from "next/link";

type Props = {
  tag: string;
};

const Tag = ({ tag }: Props) => (
  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-sm">
    {tag}
  </span>
);

export default Tag;
