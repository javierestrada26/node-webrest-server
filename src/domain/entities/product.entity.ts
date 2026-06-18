

export class ProductEntity{
    constructor(
        public id : number,
        public name: string,
        public price: number,
        public createAt: Date 
    ){}


    get isName(){
        return !!this.name
    }

    get isPrice(){
        return !!this.price
    }

    public static fromObject(object:{[key:string]:any}): ProductEntity{
        const {id, name, price, createAt} = object;

        if(!id) throw 'Id is required';
        if(!name) throw 'Name is required';
        if(!price) throw 'Price is required';

        return new ProductEntity(id, name, price, createAt);
    }

}

