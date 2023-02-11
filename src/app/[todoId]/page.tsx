import axios from "axios";
import { Todo } from "@/types/types";

type PageProps = {
	params: {
		todoId: string;
	};
};

const fetchTodo = async (todoId: string) => {
	const res = await axios(
		`https://jsonplaceholder.typicode.com/todos/${todoId}`
	);
	const todo: Todo = await res.data;
	return todo;
};

const TodoPage = async ({ params }: PageProps) => {
	const todo = await fetchTodo(params.todoId);

	return (
		<div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
			<p>
				#{todo.id}: {todo.title}
			</p>
			<p>Completed: {todo.completed ? "Yes" : "No"}</p>
			<p className="border-t border-black mt-5 text-right">
				By User: {todo.userId}
			</p>
		</div>
	);
};

export default TodoPage;

//　ページが作られる前に、ビルドの段階でパスを作っておく。
export async function generateStaticParams() {
	const res = await axios("https://jsonplaceholder.typicode.com/todos/");
	const todos: Todo[] = await res.data;

	// Prebuilding only the first 10 pages to avoid being rate
	const trimmedTodos = todos.splice(0, 5);

	// return を忘れない！！[todoId]（フォルダ＝パス）がstringの為、stringにする
	return trimmedTodos.map((todo) => {
		return { todoId: todo.id.toString() };
	});
}
