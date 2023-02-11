import { collection, query, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../firebase";
import TodoCard from "@/components/TodoCard";
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
			<div>
				{todos.length > 0 &&
					todos.map((todo) => {
						return <TodoCard key={todo.todoId} todo={todo} />;
					})}
			</div>
		);
	}

	return (
		<>
			<div>{showContent}</div>
		</>
	);
};

export default HomePage;
