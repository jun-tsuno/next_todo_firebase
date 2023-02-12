"use client";
import { Todo } from "@/types/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Input = () => {
	const [value, setValue] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		value
			? addTodo({
					todoId: uuidv4(),
					title: value,
					isDone: false,
			  })
			: alert("Input something");
		setValue("");
	};

	const addTodo = async (task: Todo) => {
		// console.log(task);
		// await setDoc(doc(db, "todos", "2Y5ii33vGYgmhuQkO6Xx"), {
		// 	...task,
		// });
		const newTodo = await addDoc(collection(db, "todos"), {
			...task,
		});
		console.log(newTodo);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					className="bg-gray-50 w-[300px] border border-gray-300 py-2 px-1"
					type="text"
					placeholder="Add Todo..."
					onChange={handleChange}
					value={value}
				/>
				<button className="bg-gray-600 text-white w-20 py-2 ml-3" type="submit">
					ADD
				</button>
			</form>
		</>
	);
};

export default Input;
