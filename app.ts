// TYPES

let variable = "hello";
variable = 54; //number is not assignable to the variable as it's type is different.


// let's try with a number
let age = 18;

// now, if we assign
age="eighteen"; //it will give an error.


// now , let's explicitly define the type of the variable
let agewithType: number;

agewithType = 16;
agewithType = "sixteen"; //will give an error.


// we can also declare alternate variable types simultaneously
let testStringorNumber: string | number;
testStringorNumber = 10;
testStringorNumber = "10";
testStringorNumber = [10,20]; //this will give error.


// array
let names = ["john", "jane", "tom"]

names.push(3); //gives error as the array only supports string elements in this case.

let numbers = [11,22,33];
numbers.push(92); //works


// let's define the type of the array of elements

let testStringArray: string[];
testStringArray = [1,2,3]; //gives an error
testStringArray = ["sherlock", "rambo"];

// let's do the same for number array
let testNumberArray : number[];
testNumberArray = [1,2,3]; //works


// let's try union of types
let testArray : (string | number)[];
testArray= [1, "sherlock", "jane", 35]; //works

// OBJECTS

let user = {
    username: 'john';
    age:22;
    isAdmin: false;
}

user.username = "jane" //there's no problem
// but now,
user.username = 23; //gives error as the type of the value assigned is not equal to the object's element type.

// similarly,
user.isAdmin = "no"; //gives error

user.isAdmin = true;

user.phone = "+12354647" //the object property doesn't exist.

let userObject : {
    username: string,
    age: number,
    isAdmin:boolean,
}

// we have to use all the properties defined for the object
userObject = {
    username = "jane",
    age = 23,
    isAdmin = false,
}

// now, let's change this a bit to conditionally add phone number to the object.
let userObj : {
    username: string;
    age: number;
    isAdmin:boolean;
    phone?:string;
}


userObj = {
    username="sherlock",
    age=22,
    isAdmin=true,
    phone= "12323256", //it works
}

// ANY TYPE

let testAny;

testAny = 12;
testAny = "Hello";
testAny = true;
testAny = [true];


// ANY Array

let testAnyArray : any[]

testAnyArray = [1, "jane", true];

// FUNCTIONS

let sayHi = () => {  //in this case, it's always a function, returns a void.
    console.log('first')
}

sayHi = "hi"; //gives an error.

// Now,

let funcReturnString = ():string => {
    console.log("hi");
    return "sherlock";
}

// now, taking arguments and defining their type
let multiple = (num: number) => {
    return num*2;
};

// now,defining the return type of the function
let multiple2 = (num: number): number => {
    return num * 2;
}

let multiple = ( num: number): void =>{
    // Do something but don't return, because the function is given a return type of void.
}

let sum = (n1: number, n2:number, another?: number):number=>{ //here, the 'another' parameter is optional.
    return n1+n2;
}

sum(2,3);

// TYPE ALIASES : Create custom types which can be used further.

let func = (user:{ username:string, age:number, phone?:string}) => [
    console.log(user.username);
] //the parameter is too long, so it looks ugly.


type UserType = {
    username:string,
    age:number,
    phone?:string
}

let betterFunc = (user:UserType)=>{ //looks cool, very short!
    console.log(user.age); //see, we can access all the properties of the user with a type of 'UserType'
}

type myFunc = (a:number, b:string) => void //now , here I have defined the type of myFunc

// Now, let's implement it
let write: myFunc = (num, str)=>{
    // doesn't return anything, as the function has a type of myFunc, which returns Void --> nothing!
    console.log(num + "times" + str);
}

type UserType2 = {
    username: string;
    age: number;
    phone?:string;
    theme: "dark" | "light";
}


const userWithTheme : UserType2 = {
    username:"john",
    age: 45,
    theme:"dark", //only dark or light can be assigned as a value.
    phone:"211245153"
}

// INTERFACES: creates the object directly.

interface IUser {
    username:string;
    email:string;
    age:number;
}

// Interfaces can be extended to create new interface.
interface IEmployee extends IUser { //so, all the properties of the IUser interface is added to this IEmployee interface.
    employeeId: number;
}


// so we can create a employee object
const emp: IEmployee = {
    username:'tom',
    email:'tom@gmail.com',
    age: 25,
    employeeId: 1,
}

//we can also create a normal client object
const client: IUser = {
    username: 'sherlock',
    email:'sherlock@gmail.com',
    age:44, //here,as you can see, we don't need the employee Id.
}

// GENERICS

interface IAuthor {
    id:number;
    username:string;
}


interface ICategory {
    id:number;
    title:string;
}


interface IPost {
    id:number;
    title:string;
    desc:string;
    extra: IAuthor[] | ICategory[];
}


// Now, in the future, we ain't gonna come everytime and add the interface to select the extra properties from. So , we gonna use GENERICS.

interface IPostBetter<T>{
    id:number;
    title:string;
    desc:string;
    extra: T[];
}

// we pass the parameter here as string.
const testMe: IPostBetter<String> = {
    id:1,
    title:'post title',
    desc:'post desc',
    extra:['str1', 'str2'],
}

// Now, let's create one more interface
interface IPostEvenBetter<T extends object>{ //here the parameter can't be string, number or boolean, it should be only Object.
    id:number;
    title:string;
    desc:string;
    extra:T[];
}

// now let's create another post object with the latest interface.
const testMe2: IPostEvenBetter<{id:number, username:string}> = { //here the parameter is a object
    id:2,
    title:"post title",
    desc:"post desc",
    extra:[{id:2,username:'subhadeep'}],
}

// Now, we can also have the parameter of the type of IAuthor interface.
const testMe3: IPostEvenBetter<IAuthor>={
    id:3,
    title:'post title',
    desc:'post desc',
    extra:[{id:4,username:'joe'}], //we can give this object in the array, as IAuthor object type also contains the same properties.
}

const testMe4: IPostEvenBetter<ICategory>={
    id:3,
    title:'post title',
    desc:'post desc',
    extra:[{id:4,title:'Product title'}], //we can give this object in the array, as ICategory object type also contains the same properties.
}

// TYPERSCRIPT WITH REACT. Video timestamp --> 00:41:10   9l


// Now we gonna Understand the usage of Typescript in React.

// Suppose we have a PostList.jsx, the code for the same is:

import React from 'react'
import PostCard from '../postCard/PostCard'
import { PostProps } from './types/types';

async function getData(){
    const res = await fetch("API_LINK");
    if(!res.ok){
        throw new Error("failed to fetch data");
    }
    return res.json(); //returns the response in json format as an array of objects.
}


const PostList = ()=>{
    const data: PostProps[] = await getData();
    return(
        <div className='postlist'>
                <PostCard title = 'post title' body = 'post desc'/> //sending the title of the post and the desc as props to the card component.
                {data.map((post)=>(
                    <PostCard key={post.id} {...post}/>
                ))}
        </div>
    )
}


// The PostCard.jsx component.

import React from 'react';
import { PostProps } from './types/types';

const PostCard = ({title, body}: PostProps) =>{ //we define the types of the props as an object type where the elements of the object their own specified types. //we can destructure the props  object elements and define their type as a whole.
    return(
        <div className='postCard'>
        <h1>{props.title}</h1> //here we obtain the value of title prop
        <p>{props.desc}</p> //here we obtain the value of desc prop
        </div>
    )
}


export default PostCard;