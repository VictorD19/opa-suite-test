
class User {
    constructor(
        { id,
            name,
            username,
            password,
            role,
            online,
            lastSeen,
            UpdateAt,
            isActive, }
    ) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
        this.online = online;
        this.lastSeen = lastSeen;
        this.updateAt = UpdateAt;
        this.isActive = isActive;
    }
}
export default User