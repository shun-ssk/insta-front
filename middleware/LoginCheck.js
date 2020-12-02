import Cookie from 'js-cookie'

export default function({ redirect }) {
    if(!Cookie.get("token")){
        return redirect("/")
    }
}