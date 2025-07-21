class UpdateUserLastSeen {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async update(userId, lastSeen) {
        // try {
        //     await this.userRepository.updateLastSeen(userId, lastSeen);
        // } catch (error) {
        //     throw new Error(`Failed to update last seen for user ${userId}: ${error.message}`);
        // }
    }
}

export default UpdateUserLastSeen;