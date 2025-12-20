class APIFunctionality{
    constructor(query,queryStr){
        //mongoDb query
        this.query=query;
        // queryStr is query params
        this.queryStr=queryStr
    }
    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            }
         }:{};
         this.query=this.query.find({...keyword});
         return this
    }
}

export default APIFunctionality