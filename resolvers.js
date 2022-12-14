const db = require('./db')
const Query = {
    test: () => 'Test Success, GraphQL server is up & running !!',
    students:() => db.students.list(),
    studentById:(root,args,context,info) => {
        return db.students.get(args.id);
     },
    greetPeople:(root,args,context,info)=>{
        return `Hi ${args.name}`
    },
    setFavouriteFood:(root,args,context,info)=>{
        return `My favourite food is ${args.food}`
    },
    greetingWithAuth:(root,args,context,info) => {

        //check if the context.user is null
        if (!context.user) {
            console.log("user: ",context);
           throw new Error('Unauthorized');
        }
        return "Hello from TutorialsPoint, welcome back : "+context.user.firstName;
     }
 }

const Student = {
    fullName:(root,args,context,info) => {
       return root.firstName+" "+root.lastName
    },
    college:(root) => {
        return db.colleges.get(root.collegeId);
     }
 }

const Mutation={
    createNewStudent:(root,args,context,info)=>{
        return db.students.create({collegeId:args.collegeId,firstName:args.firstName,lastName:args.lastName})
    },

    // access the college details through student details. 
    addStudent_returnsObject:(root,args,context,info) => {
        const id = db.students.create({
           collegeId:args.collegeId,
           firstName:args.firstName,
           lastName:args.lastName
        })
  
        return db.students.get(id)
     }
}
 module.exports = {Query,Student,Mutation}
