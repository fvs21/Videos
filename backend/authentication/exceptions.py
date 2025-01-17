from backend.exceptions import DefaultException

class RegistrationException(DefaultException):
    code = "registration_failure"

    def __init__(self, detail=None, status=400):
        super().__init__(detail, status, self.code)

class AuthenticationException(DefaultException):
    code = "login_failure"

    def __init__(self, detail=None, status_code=400):
        super().__init__(detail, status_code, self.code)

class UserDoesNotExistException(DefaultException):
    code = "user_not_found"

    def __init__(self, detail="User was not found", status_code=404):
        super().__init__(detail, status_code, self.code)