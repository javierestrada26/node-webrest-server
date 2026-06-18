import { Request, Response } from "express"
import { prisma } from "../../data/postgres/index.js"
import { CreateTodoDto, UpdateTodoDto} from "../../domain/dtos/index.js"
import { TodoRepository } from "../../domain/index.js"

export class TodosController{
    //*DI
    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    public getTodos = async(req:Request,res:Response)=>{
        const todos = await this.todoRepository.getAll();
        return res.json(todos)
    }

    public getTodoById =async (req:Request,res:Response)=>{
        const id = +(req.params.id as string);
        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo)
        } catch (error) {
            res.status(400).json({error}
            )
        }

    }

    public createTodo = async(req:Request, resp:Response)=>{
        const [error,createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return resp.status(400).json({error})

        const todo = await this.todoRepository.create(createTodoDto!);

        resp.json(todo);
    };

    public updateTodo = async (req:Request, resp:Response)=>{
        const id = +(req.params.id as string);
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        });
        if(error) return resp.status(400).json({error})

        const updateTodo = await this.todoRepository.updateById(updateTodoDto!);

        return resp.json(updateTodo);
    }

    public deleteTodo = async (req:Request, resp:Response)=>{
        const id = +(req.params.id as string);

        const deleteTodo = await this.todoRepository.deleteById(id);

        resp.json(deleteTodo);

    }

}