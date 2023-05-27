export class Customer {
    readonly id?: string;

    name: string;
    
    constructor(customer?: Customer) {
        Object.assign(this, customer);
    }
}
