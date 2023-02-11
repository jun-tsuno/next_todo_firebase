import axios from "axios";
import { Todo } from "@/types/types";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { log } from "console";
import firebase from "firebase/app";
import "firebase/firestore";

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

// 	console.log(paths);
// 	return {
// 		paths,
// 		fallback: false,
// 	};
// }

// type PageProps = {
// 	params: {
// 		todoId: string;
// 	};
// };

// const fetchTodo = async (todoId: string) => {
// 	const res = await axios(
// 		`https://jsonplaceholder.typicode.com/todos/${todoId}`
// 	);
// 	const todo: Todo = await res.data;
// 	return todo;
// };

// const TodoPage = async ({ params }: PageProps) => {
// 	const todo = await fetchTodo(params.todoId);

// 	return (
// 		<div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
// 			<p>
// 				#{todo.id}: {todo.title}
// 			</p>
// 			<p>Completed: {todo.completed ? "Yes" : "No"}</p>
// 			<p className="border-t border-black mt-5 text-right">
// 				By User: {todo.userId}
// 			</p>
// 		</div>
// 	);
// };

// export default TodoPage;

//　ページが作られる前に、ビルドの段階でパスを作っておく。
// export async function generateStaticParams() {
// 	const res = await axios("https://jsonplaceholder.typicode.com/todos/");
// 	const todos: Todo[] = await res.data;

// 	// Prebuilding only the first 10 pages to avoid being rate
// 	const trimmedTodos = todos.splice(0, 5);

// 	// return を忘れない！！[todoId]（フォルダ＝パス）がstringの為、stringにする
// 	return trimmedTodos.map((todo) => {
// 		return { todoId: todo.id.toString() };
// 	});
// }
