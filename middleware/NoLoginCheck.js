import Cookie from 'js-cookie'

export default function({ redirect }) {
    const token = Cookie.get("token")
                console.log(token)
                console.log(!token)
                console.log(!!token)
    if(!!Cookie.get("token")){
        redirect("/post")
    }
}