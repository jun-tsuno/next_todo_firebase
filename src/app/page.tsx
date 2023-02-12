import {
	collection,
	query,
	getDocs,
	DocumentData,
	orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import TodoCard from "@/components/TodoCard";
import Input from "@/components/Input";

const fetchTodos = async () => {
	let todosArr: DocumentData[] = [];
	const q = query(collection(db, "todos"), orderBy("timestamp", "asc"));
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
			<div>
				<div className="text-center my-5">
					<Input />
				</div>
				{showContent}
			</div>
		</>
	);
};

export default HomePage;
