import axios from "axios";
import { Todo } from "@/types/types";
import Link from "next/link";

const fetchTodos = async () => {
	const res = await axios("https://jsonplaceholder.typicode.com/todos");
	const todos: Todo[] = await res.data;
	return todos;
};

const HomePage = async () => {
	const todos = await fetchTodos();

	let showContent;

	if (!todos) {
		showContent = <h1>No ToDo Items</h1>;
	} else {
		showContent = (
			<ul>
				{todos.length > 0 &&
					todos.map((todo) => {
						return (
							<li key={todo.id}>
								<Link href={`/${todo.id}`}>
									{todo.title}, ID: {todo.id}
								</Link>
							</li>
						);
					})}
			</ul>
		);
	}

	return (
		<>
			<div>{showContent}</div>
		</>
	);
};

export default HomePage;
