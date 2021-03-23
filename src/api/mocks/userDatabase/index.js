const users = [
    { 
        login: "piotr",
        password: "dfdf#$4T",
        name:"piotrek", 
        role: ["admin"],
        avatarSrc: "dan-abramov", 
        eventsCount: 5
    },
    { 
        login: "jarek",
        password: "dfdf#$4T",
        name:"Jarosław",
        role: ["moderator"],
        avatarSrc: "kent-c-dodds", 
        eventsCount: 10
    },
]

export default function getUser(paramLogin) {
    return users.find( ({login}) => {
        return paramLogin === login;
    })
}