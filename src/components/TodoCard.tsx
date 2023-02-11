import { DocumentData } from "firebase/firestore";
import Link from "next/link";

interface IProps {
	todo: DocumentData;
}

function TodoCard({ todo }: IProps) {
	const { todoId, title, isDone } = todo;
	return (
		<Link
			href={`/${todoId}`}
			className={
				isDone
					? "bg-green-50 py-5 my-3 mx-auto w-[700px] flex items-center border border-yellow-600 "
					: "bg-green-50 py-5 my-3 mx-auto w-[700px] flex items-center"
			}
		>
			<p className="text-2xl">{title}</p>
			<div className="ml-auto mr-5 flex items-center">
				<button className="bg-green-200 p-2 mx-5">DONE</button>
				<button className="bg-red-200 p-2">DELETE</button>
			</div>
		</Link>
	);
}

export default TodoCard;
