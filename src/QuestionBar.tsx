import { QestionBarProps } from "./Type";
export default function QuestionBar({
  children,
}: QestionBarProps): JSX.Element {
  return <main className="main">{children}</main>;
}
