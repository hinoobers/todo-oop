import { Todo } from "../models/todo.js";
import { fileManager } from "../utils/files.js"

class todoController {
    constructor() {
        this.initTodos();
    }

    async createTodo(req, res) {
        const task = req.body.task;
        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)
        fileManager.writeFile("./data/todos.json", this.TODOS)
        res.json({
            message: "created new todo object",
            newTodo: newTodo
        })
    }

    async initTodos() {
        const data = await fileManager.readFile("./data/todos.json");
        if(data !== null) {
            this.TODOS = data;
        } else {
            this.TODOS = [];
        }
    }

    updateTodo(req, res) {
        const id = req.params.id;
        const task = req.body.task;

        const index = this.TODOS.findIndex((todo) => todo.id === id)
        if(index < 0) {
            throw new Error("Couldn't find todo!")
            res.json({message: "Could not find todo with such index"})
        }

        this.TODOS[index] = new Todo(this.TODOS[index].id, task)
        res.json({
            message: "Updated todo",
            updatedTask: this.TODOS[index]
        })
    }

    deleteTodo(req, res) {
        const id = req.params.id;
        const index = this.TODOS.findIndex((todo) => todo.id === id)
        if(index < 0) {
            throw new Error("Couldn't find todo!")
            res.json({message: "Could not find todo with such index"})
        }

        this.TODOS.splice(index, 1)
        res.json({
            message: "Deleted todo"
        })
    }

    getTodos(req, res) {
        res.json({tasks: this.TODOS})
    }

}

export const TodoController = new todoController();