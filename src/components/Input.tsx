"use client";
import { Todo } from "@/types/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";

const Input = () => {
	const [value, setValue] = useState("");
	const router = useRouter();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		value
			? addTodo(
					{
						todoId: uuidv4(),
						title: value,
						isDone: false,
					},
					router.refresh
			  )
			: alert("Input something");
		setValue("");
	};

	const addTodo = async (task: Todo, refresh: () => void) => {
		const docRef = doc(db, "todos", task.todoId);
		await setDoc(docRef, task);
		await updateDoc(docRef, {
			timestamp: serverTimestamp(),
		});

		refresh();
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
