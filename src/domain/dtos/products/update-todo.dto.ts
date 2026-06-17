

export class UpdateProductDto{

    private constructor(
        public readonly id: number,
        public readonly name:string,
        public readonly price:number
    ){}

    get values(){
        const returnObj:{[key:string]:any} = {};

        if(this.name) returnObj.name = this.name;
        if(this.price) returnObj.price = this.price;

        return returnObj;
    }

    static create(props:{[key:string]:any}):[string?, UpdateProductDto?]{

        const {id,name, price} = props;

        if(!id || isNaN(Number(id))){
            return ['id must be a valid number']
        }

        if(price && isNaN(Number(price))){
            return ['Price must be a valid number'];
        }


        return [undefined, new UpdateProductDto(id,name, price)];
    }
}