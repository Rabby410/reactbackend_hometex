const GlobalFunction ={
    logOut(){
        localStorage.removeItem('email')
            localStorage.removeItem('phone')
            localStorage.removeItem('name')
            localStorage.removeItem('photo')
            localStorage.removeItem('token')
    }
}

export default GlobalFunction;