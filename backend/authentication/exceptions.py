from backend.exceptions import DefaultException

class RegistrationException(DefaultException):
    code = "registration_failure"

    def __init__(self, message, status=400):
        super().__init__(message, status, self.code)
