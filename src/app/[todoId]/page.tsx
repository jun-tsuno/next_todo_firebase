import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";

interface IProps {
	params: { todoId: string };
}

const fetchTodo = async (todoId: string) => {
	const docSnap = await getDoc(doc(db, "todos", todoId));

	if (docSnap.exists()) {
		const todo = docSnap.data();
		return todo;
	} else {
		const message = "No Document";
		return message;
	}
};

// urlに含まれるtodoIdは params: {todoId}　で取得できる。
const TodoPage = async ({ params: { todoId } }: IProps) => {
	const todo: any = await fetchTodo(todoId);

	return (
		<div className="bg-green-50 p-10 w-[600px] mx-auto text-center">
			<p>{todo.title}</p>
			<p>Status: {todo.isDone ? "DONE" : "NOT DONE"}</p>
		</div>
	);
};

export default TodoPage;

// make SSG paths
// [{todoId: ----}, {todoId: -----}, ....]
// [ディレクトリ名]とkey名は合わせる ＆ "string"
export const generateStaticParams = async () => {
	let todosPaths: string[] = [];
	const q = query(collection(db, "todos"));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		const docData = doc.data();
		return todosPaths.push(docData.todoId.toString());
	});

	return todosPaths.map((ele) => {
		return { todoId: ele };
	});
};
