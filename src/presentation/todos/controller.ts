import { Request, Response } from "express"
import { prisma } from "../../data/postgres/index.js"
import { CreateTodoDto, UpdateTodoDto} from "../../domain/dtos/index.js"

export class TodosController{
    //*DI
    constructor(){}

    public getTodos = async(req:Request,res:Response)=>{
        const todo = await prisma.todo.findMany()
        return res.json(todo) 
    }

    public getTodoById =async (req:Request,res:Response)=>{
        const id = +(req.params.id as string);
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'})
        const todo =  await prisma.todo.findFirst({
            where:{id}
        });
        (todo)
          ? res.json(todo)
          : res.status(404).json({error:`TODO with id ${id} not found`})
    }

    public createTodo = async(req:Request, resp:Response)=>{
        const [error,createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return resp.status(400).json({error})
        
        const todo = await prisma.todo.create({
            data:createTodoDto!
        })

        resp.json(todo)
    };

    public updateTodo = async (req:Request, resp:Response)=>{
        const id = +(req.params.id as string);
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        });
        if(error) return resp.status(400).json({error})


        const todo =  await prisma.todo.findFirst({
            where:{id}
        });
        if(!todo) return resp.status(404).json({error: `Todo whit ID ${id} not found`});

        
        const updatedTodo =  await prisma.todo.update({
            where:{id},
            data:updateTodoDto!.values
        });


        resp.json(updatedTodo);
    }

    public deleteTodo = async (req:Request, resp:Response)=>{
        const id = +(req.params.id as string);

        const todo =  await prisma.todo.findFirst({
            where:{id}
        });
        
        if(!todo) return resp.status(404).json({error: `Todo whit ID ${id} not found`});

        const deleted = await prisma.todo.delete({
            where:{id}
        });

        (deleted)
          ? resp.json(deleted)
          : resp.status(400).json({error:`Todo with id ${id} not found`})

    }

}