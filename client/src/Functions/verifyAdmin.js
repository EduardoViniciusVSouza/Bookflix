import jwt_decode from "jwt-decode";

function verifyAdmin() {
    const decodedToken = jwt_decode(localStorage.getItem("token"));


    if (decodedToken.profileJson.access == 2 && decodedToken) {
        return true
      } else {
        return false
      }

    
}

export default verifyAdmin