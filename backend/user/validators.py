class UserValidator:
    @staticmethod
    def validate_username(username: str) -> bool:
        if len(username) < 3 or len(username) > 20:
            return False
        if '@' in username or ' ' in username:
            return False
        return True