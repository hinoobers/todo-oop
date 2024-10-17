import { Todo } from "../models/todo.js";

class todoController {
    constructor() {
        this.TODOS = [];
    }

    createTodo(req, res) {
        const task = req.body.task;
        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)
        res.json({
            message: "created new todo object",
            newTodo: newTodo
        })
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

    getTodos(req, res) {
        res.json({tasks: this.TODOS})
    }

}

export const TodoController = new todoController();