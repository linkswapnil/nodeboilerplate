import fetch from 'node-fetch';

const todos = {
	getTodos: () => {
		return new Promise(async (resolve, reject) => {
			const url = 'https://jsonplaceholder.typicode.com/todos';
			try {
				const response = await fetch(url);
				const data = await response.json();
				resolve(data);
			} catch (err) {
				reject(err);
			}
		});
	}
};

export default todos;
