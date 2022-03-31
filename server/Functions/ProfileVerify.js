
function ProfileVerify(token, profileToUpdateId) {
    if (token.profileId === profileToUpdateId) {

        return true
    }

    else return false
}

module.exports = ProfileVerify