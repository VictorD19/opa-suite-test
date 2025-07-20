
class User {
    constructor(
        { id,
            name,
            userName,
            password,
            role,
            online,
            lastSeen,
            UpdateAt,
            isActive, }
    ) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.online = online;
        this.lastSeen = lastSeen;
        this.updateAt = UpdateAt;
        this.isActive = isActive;
    }
}
export default User