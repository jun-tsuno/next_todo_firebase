import { collection, query, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";

const fetchTodos = async () => {
	let todosArr: DocumentData[] = [];
	const q = query(collection(db, "todos"));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		todosArr.push(doc.data());
	});
	return todosArr;
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
							<li key={todo.todoId}>
								{todo.title}, ID: {todo.todoId}
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
