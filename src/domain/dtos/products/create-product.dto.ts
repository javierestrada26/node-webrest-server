

export class CreateProductDto{


    private constructor(
        public readonly name:string,
        public readonly price: number
    ){}


        static create(props:{[key:string]:any}):[string?, CreateProductDto?]{

        const {name, price} = props;

        if(!name) return ['Text property is required',undefined];
        if(!price) return ['Price property is required',undefined];

        return [undefined, new CreateProductDto(name,price)];
    }
}