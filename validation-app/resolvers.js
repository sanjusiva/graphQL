const Query = {
    greeting:() => "Hello"
 }
 
 const Mutation ={
    signUp:(root,args,context,info) => {
       const {email,firstName,password} = args.input;
       const emailExpression = /^[A-Za-z0-9._/]+@+([A-Za-z]{2,4})+.+([A-Za-z]{2,4})$/;
       const isValidEmail =  emailExpression.test(String(email))
       if(!isValidEmail)
       throw new Error("email not in proper format")
       if(firstName.length > 15)
       throw new Error("firstName should be less than 15 characters")
       if(password.length < 8 )
       throw new Error("password should be minimum 8 characters")
       return "success";
    }
 }
 module.exports = {Query,Mutation}