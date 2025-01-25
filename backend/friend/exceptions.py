from backend.exceptions import DefaultException

class FriendshipRequestException(DefaultException):
    code = "friendship_request_failure"

    def __init__(self, message: str, status_code: int = 400):
        super().__init__(message, status_code, self.code)