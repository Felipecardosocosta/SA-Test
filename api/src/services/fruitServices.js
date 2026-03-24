class Fruts {

    constructor(array){

        this.fruts = array

    }

    getAll(){
        return this.fruts
    }

    getId(id){
        return this.fruts.find(frut=> frut.id = id)
    }

    post(fruit){
        this.fruts.push(fruit)

    }
}


const FrutsServices = new Fruts([
    {id:0, name:"Maça"},
    {id:1,name:"Banana"}
])


