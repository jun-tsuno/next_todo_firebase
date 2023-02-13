"use client";
import { DocumentData, updateDoc, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";

interface IProps {
	todo: DocumentData;
}

function TodoCard({ todo }: IProps) {
	const { todoId, title, isDone } = todo;
	const router = useRouter();

	// refresh()で更新後ページをリロードする。
	const deleteTask = async (refresh: () => void) => {
		await deleteDoc(doc(db, "todos", todoId));

		refresh();
	};

	const updateTask = async (refresh: () => void) => {
		await updateDoc(doc(db, `todos/${todoId}`), {
			isDone: !isDone,
		});

		refresh();
	};

	return (
		<div
			className={
				isDone
					? "bg-green-50 py-5 my-3 mx-auto w-[700px] flex items-center border border-yellow-600 "
					: "bg-green-50 py-5 my-3 mx-auto w-[700px] flex items-center"
			}
		>
			<p className="text-2xl">{title}</p>
			<div className="ml-auto mr-5 flex items-center">
				<button className="bg-blue-200 p-2 mx-5">
					<Link href={`/${todoId}`}>See Detail</Link>
				</button>
				<button
					className="bg-green-200 p-2 mx-5"
					onClick={() => updateTask(router.refresh)}
				>
					DONE
				</button>
				<button
					className="bg-red-200 p-2"
					onClick={() => deleteTask(router.refresh)}
				>
					DELETE
				</button>
			</div>
		</div>
	);
}

export default TodoCard;
