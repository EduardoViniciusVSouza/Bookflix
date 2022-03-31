
function AdminVerify(token) {
    if (token.access == 2) {
        
        return true
    }

    else return false
}

module.exports = {AdminVerify: AdminVerify}