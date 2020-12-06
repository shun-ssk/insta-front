import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";
import firebase from "~/plugins/firebase";

const baseURL = process.env.PROD_API_BASE_URL;

const newStore = () => {
    return new Vuex.Store({
        state: {
            loadPosts: [],
            loadUsers: [],
            loadLikes: [],
            loadComment: [],
            loadFollow: [],
            loadMessages: [],
            TalkUsers: [],
            loginUser: null
        },
        mutations: {
            setUsers(state, payload) {
                state.loadUsers = payload
            },
            setPosts(state, payload) {
                state.loadPosts = payload;
            },
            setLike(state, payload){
                state.loadLikes = payload
            },
            setComment(state, payload){
                state.loadComment = payload
            },
            setFollow(state, payload){
                state.loadFollow = payload
            },
            setMessages(state, payload){
                state.loadMessages = payload
            },
            setTalkUsers(state, payload) {
                for(const message of state.loadMessages) {
                    if(message.to_user_id == payload) {
                        if(state.TalkUsers.indexOf(message.from_user_id) == -1) {
                            state.TalkUsers.push(message.from_user_id)
                        }
                    }
                }
            },
            setLoginUser(state, payload) {
                state.loginUser = payload
            },
            addPost(state, payload) {
                state.loadPosts.push(payload)
            },
            addComment(state, payload) {
                state.loadComment.push(payload)
            },
            addMessage(state, payload) {
                state.loadMessages.push(payload)
            },
            pollingMessages(state, payload) {
                state.loadMessages = state.loadMessages.concat(payload)
            },
            addTalkUser(state, payload) {
                if(state.TalkUsers.indexOf(payload) == -1) {
                    state.TalkUsers.push(payload)
                }
            },
            updatePost(state, payload) {
                for(const post of state.loadPosts) {
                    if(post.ID === payload.ID){
                        post.text = payload.text
                    }
                }
            },
            updateComment(state, payload) {
                for(const comment of state.loadComment) {
                    if(comment.ID === payload.ID) {
                        comment.text = payload.text
                    }
                }
            },
            deletePost(state, payload){
                for(const post of state.loadPosts) {
                    if(post.ID === payload.ID){
                        post.is_deleted = payload.is_deleted
                    }
                }
            },
            deleteComment(state, payload) {
                for(const comment of state.loadComment) {
                    if(comment.ID === payload.ID){
                        comment.is_deleted = payload.is_deleted
                    }
                }
            },
            follow(state, payload) {
                var push = true
                for(const follow of state.loadFollow) {
                    if(payload.ID === follow.ID){
                        follow.is_follow = payload.is_follow
                        push = false
                    }
                }
                if(push) {
                    state.loadFollow.push(payload)
                }
            },
            like(state, payload){
                var push = true
                for(const like of state.loadLikes) {
                    if(payload.ID === like.ID){
                        like.is_like = payload.is_like
                        push = false
                    }
                }
                if(push) {
                    state.loadLikes.push(payload)
                }
            },
            lock(state, payload) {
                for(const user of state.loadUsers) {
                    if(payload.ID == user.ID){
                        user.is_lock = payload.is_lock
                    }
                }
            },
            clearVuexStore(state) {
                state.loadPosts = []
                state.loadUsers = []
                state.loadComment = []
                state.loadLikes = []
                state.loadMessages = []
                state.loadFollow = []
                state.TalkUsers = []
                state.loginUser = null
            }
        },
        actions: {
            /*
            nuxtServerInit(vc) {
                return axios.get("http://localhost:8080/api/post").then(res => {
                    const postArray = [];
                    for (const key in res.data) {
                        postArray.push({ ...res.data[key], id: key})
                    }
                    vc.commit("setPosts", postArray);
                })
                .catch(err => console.log(err))
            },
            */
            setUser({commit}, payload) {
                commit("setLoginUser", payload)
            },
            setUsers(vc) {
                return axios.get( baseURL + "/api/user")
                .then(res => {
                    const userArray = [];
                    for (const key in res.data) {
                        userArray.push({...res.data[key], id: key})
                    }
                    vc.commit("setUsers", userArray)
                })
            },
            setPosts(vc){
                return axios.get( baseURL + "/api/post")
                .then(res => {
                    const postArray = [];
                    for (const key in res.data) {
                        postArray.push({ ...res.data[key], id: key})
                    }
                    vc.commit("setPosts", postArray);
                })
                .catch(err => console.log(err))
            },
            setLike(vc) {
                return axios.get( baseURL + "/api/like", {
                    headers: { "Authorizations" : Cookie.get("token") }
                })
                .then(res => {
                    const likeArray = [];
                    for(const key in res.data) {
                        likeArray.push({...res.data[key], id: key})
                    }
                    vc.commit("setLike", likeArray)
                })
            },
            setComment(vc) {
                return axios.get( baseURL + "/api/comment", {
                    headers: { "Authorizations" : Cookie.get("token") }
                })
                .then(res => {
                    const commentArray = [];
                    for(const key in res.data) {
                        commentArray.push({...res.data[key], id:key})
                    }
                    vc.commit("setComment", commentArray)
                })
            },
            setFollow(vc) {
                return axios.get( baseURL + "/api/follow", {
                    headers: { "Authorizations" : Cookie.get("token") }
                })
                .then(res => {
                    const followArray = [];
                    for(const key in res.data) {
                        followArray.push({...res.data[key], id:key})
                    }
                    vc.commit("setFollow", followArray)
                })
            },
            setMessages(vc, params) {
                console.log(params)
                return axios.get( baseURL + "/api/message/" + params, {
                    headers: { "Authorizations" : Cookie.get("token") }
                })
                .then(res => {
                    const messageArray = [];
                    for(const key in res.data) {
                        messageArray.push({...res.data[key], id:key})
                    }
                    vc.commit("setMessages", messageArray)
                    vc.dispatch("pollingMessages", [params, vc.state.loadMessages[vc.state.loadMessages.length - 1].ID])
                })
            },
            pollingMessages(vc, params) {
                console.log(params)
                return axios.post( baseURL + "/api/message/polling/" + params[0], params[1], {
                    headers: { "Authorizations" : Cookie.get("token") }
                })
                .then(res => {
                        const messageArray = [];
                        for(const key in res.data) {
                            messageArray.push({...res.data[key], id:key})
                        }
                        vc.commit("pollingMessages", messageArray)
                        vc.commit("setTalkUsers", params[0])
                        setTimeout(() => {
                            this.dispatch("pollingMessages", [params[0], vc.state.loadMessages[vc.state.loadMessages.length - 1].ID])
                        }, 5000)
                })
            },
            addPost(vc, params) {
                return axios.post( baseURL + "/api/post",params,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    headers: { "Authorizations" : Cookie.get("token") }
                })
                .then(res => {
                    vc.commit('addPost', res.data)
                })
                .catch(err => console.log(err))
            },
            addComment(vc, params) {
                return axios.post( baseURL + "/api/comment", params,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    headers: { "Authorizations" : Cookie.get("token") }   
                })
                .then(res => {
                    vc.commit('addComment', res.data)
                })
                .catch(err => console.log(err))
            },
            addMessage(vc, params) {
                return axios.post( baseURL + "/api/message", params,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    headers: { "Authorizations" : Cookie.get("token") }  
                })
                .then(res => {
                    vc.commit('addMessage', res.data)
                })
                .catch(err => console.log(err))
            },
            updatePost(vc, params) {
                return axios.post( baseURL + "/api/post/edit/" + params[0], params[1])
                .then(res => {
                    vc.commit('updatePost', res.data)
                })
                .catch(err => console.log(err))
            },
            updateComment(vc, params) {
                return axios.post( baseURL + "/api/comment/edit/" + params[0], params[1])
                .then(res => {
                    vc.commit('updateComment', res.data)
                })
                .catch(err => console.log(err))
            },
            deletePost(vc, postId) {
                return axios.get( baseURL + "/api/post/edit/" + postId)
                .then(res => {
                    vc.commit('deletePost', res.data)
                })
                .catch(err => console.log(err))
            },
            deleteComment(vc, commentID) {
                return axios.get( baseURL + "/api/comment/edit/" + commentID)
                .then(res => {
                    vc.commit('deleteComment', res.data)
                })
                .catch(err => console.log(err))
            },
            follow(vc, params) {
                return axios.post( baseURL + "/api/follow", params,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    headers: { "Authorizations" : Cookie.get("token") }
                })
                .then(res => {
                    vc.commit("follow", res.data)
                })
            },
            like(vc, params) {
                return axios.post( baseURL + "/api/like", params,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    
                })
                .then(res => {
                    vc.commit("like", res.data)
                })
            },
            lock(vc, params) {
                return axios.get( baseURL + "/api/lock/" + params, {
                    headers: { "Authorizations" : Cookie.get("token") }
                })
                .then(res => {
                    vc.commit("lock", res.data)
                })
            },
            login(vc, params) {
                return axios.post( baseURL + "/auth", params,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    headers: { "Authorizations" : `Bearer ${Cookie.get("jwt")}` }
                })
                .then(res => {
                    Cookie.set("token", res.headers['usertoken'])
                    Cookie.set("removeDate", Date.now() + 3600*1000)
                })
                .catch(e => console.log(e));
            },
            logout(vc) {
                firebase.auth().signOut()
                .then(() => {
                    vc.commit("clearVuexStore")
                    Cookie.remove("token");
                    Cookie.remove("removeDate");
                    Cookie.remove("jwt");
                }).catch((err) => {
                    alert(err)
                })
            },
            initAuth(vc) {
                const token = Cookie.get("token")
                const removeDate = Cookie.get("removeDate")
                if(!token) {
                    console.log("トークンありません")
                    return
                }
                if(!removeDate) {
                    console.log("時間が設定されてません")
                    return
                }
                if( Date.now() > removeDate) {
                    console.log("認証の時間切れ")
                    alert("認証が切れました. 再ログインしてください.")
                    vc.dispatch("logout")
                }
                console.log("認証有効")
                return
            }
        },
        getters: {
            isAuthenticated: (state) => {
                return !!state.loginUser
            },
            getLoginUser: (state) => {
                return state.loginUser
            },
            getUserName: (state) => (user_id) => {
                return state.loadUsers.find(user => user.ID == user_id).name
            },
            getUserImage: (state) => (user_id) => {
                return state.loadUsers.find(user => user.ID == user_id).image_url
            },
            getPosts: (state) => (id) => {
                return state.loadPosts.filter(post => post.user_id == id)
            },
            getComment: (state) => (postID) => {
                return state.loadComment.filter(comment => comment.post_id == postID && comment.is_deleted == false)
            },
            getMessagesArray: (state) => (talkUserID) => {
                return state.loadMessages.filter(message => message.to_user_id == talkUserID || message.from_user_id == talkUserID)
            },
            getMessageUsersArray: (state) => {
                return state.TalkUsers
            },
            loadAllPosts: (state, getters) => (userID) => {
                var usersArray = state.loadUsers.filter(user => user.is_lock == false)
                var posts = []
                for(const user of usersArray){
                    posts = posts.concat(getters.getPosts(user.ID))
                }
                return posts
            },
            loadFollowPosts: (state, getters) => (userID) => {
                var followerArray = state.loadFollow.filter(follow => follow.from_user_id == userID && follow.is_follow == true)
                var posts = getters.getPosts(userID)
                for(const follow of followerArray){
                    posts = posts.concat(getters.getPosts(follow.to_user_id))
                }
                return posts
            },
            getUserIDWithEmail: (state) => (Email) => {
                return state.loadUsers.find(user => user.email == Email).ID
            },
            isLike: (state) => (userID, postID) => {
                for(const like of state.loadLikes) {
                    if(like.post_id == postID && like.user_id == userID && like.is_like == true) {
                        return true
                    }
                }
                return false
            },
            isComment: (state) => (postID) => {
                for(const comment of state.loadComment) {
                    if(comment.post_id == postID && comment.is_deleted == false) {
                        return true
                    }
                }
                return false
            },
            isLocked: (state) => (userID) => {
                for(const user of state.loadUsers) {
                    if(user.ID == userID && user.is_lock == true){
                        return true
                    }
                }
                return false
            },
            likeNumber: (state) => (postID) => {
                var num = 0
                for(const like of state.loadLikes) {
                    if(like.post_id == postID && like.is_like == true) {
                        num++
                    }
                }
                return num
            },
            totalLikeNumber: (state, getters) => (userID) => {
                var num = 0
                for(const post of state.loadPosts) {
                    if(post.user_id == userID && post.is_deleted == false) {
                        num += getters.likeNumber(post.ID)
                    }
                }
                return num
            },
            totalPostNumber: (state) => (userID) => {
                var num = 0
                for(const post of state.loadPosts) {
                    if(post.user_id == userID && post.is_deleted == false) {
                        num++
                    }
                }
                return num
            },
            getCommentNumber: (state) => (postID) => {
                var num = 0
                for(const comment of state.loadComment) {
                    if(comment.post_id == postID && comment.is_deleted == false) {
                        num++
                    }
                }
                return num
            },
            followIDArray: (state) => (userID) => {
                var userIDArray = [];
                for(const follow of state.loadFollow) {
                    if(follow.from_user_id == userID && follow.is_follow == true) {
                        userIDArray.push(follow.to_user_id)
                    }
                }
                return userIDArray
            },
            followerIDArray: (state) => (userID) => {
                var userIDArray = [];
                for(const follow of state.loadFollow) {
                    if(follow.to_user_id == userID  && follow.is_follow == true) {
                        userIDArray.push(follow.from_user_id)
                    }
                }
                return userIDArray
            },
            likedUsers: (state) => (postID) => {
                var userIDArray = [];
                for(const like of state.loadLikes) {
                    if(like.post_id == postID && like.is_like == true) {
                        userIDArray.push(like.user_id)
                    }
                }
                return userIDArray
            },
            searchUsers: (state) => (word) => {
                var userIDArray = [];
                for(const user of state.loadUsers) {
                    if(user.name.indexOf(word) > -1) {
                        userIDArray.push(user.ID)
                    }
                }
                console.log(userIDArray)
                return userIDArray
            },
            isFollow: (state) => (ToUserID, FromUserID) => {
                for(const follow of state.loadFollow) {
                    if(follow.to_user_id == ToUserID && follow.from_user_id == FromUserID && follow.is_follow == true) {
                        return true
                    }
                }
                return false
            }
        }
    });
};

export default newStore;