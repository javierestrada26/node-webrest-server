import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto} from "../../domain/dtos/index.js"
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain/index.js"



export class TodosController{
    //*DI
    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    public getTodos = (req:Request,res:Response)=>{

        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({error}))
    }

    public getTodoById =(req:Request,res:Response)=>{
        const id = +(req.params.id as string);

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))

    }

    public createTodo = (req:Request, resp:Response)=>{
        const [error,createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return resp.status(400).json({error})
        
        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => resp.json(todo))
            .catch(error => resp.status(400).json({error}))
    };

    public updateTodo = (req:Request, resp:Response)=>{
        const id = +(req.params.id as string);
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        });
        if(error) return resp.status(400).json({error})

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo=> resp.json(todo))
            .catch(error => resp.status(400).json({error}))
    }

    public deleteTodo = (req:Request, resp:Response)=>{
        const id = +(req.params.id as string);

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => resp.json(todo))
            .catch(error => resp.status(400).json({error}))

    }

}