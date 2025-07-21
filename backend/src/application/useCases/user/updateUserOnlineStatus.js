class UpdateUserOnlineState {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId, isOnline) {
        // try {
        //     await this.userRepository.updateUserOnlineStatus(userId, isOnline);
        // } catch (error) {
        //     console.error("Error updating user online status:", error);
        //     throw new Error("Failed to update user online status");
        // }
    }
}

export default UpdateUserOnlineState;