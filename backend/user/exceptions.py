from backend.exceptions import DefaultException

class FieldAlreadyInUse(DefaultException):
    code = "field_in_use"
    def __init__(self, detail=None, status_code=400):
        super().__init__({
            "field": detail
        }, status_code, self.code)

class UnableToUpdateUser(DefaultException):
    code = "user__field_update_failure"

    def __init__(self, detail=None, status_code=None):
        super().__init__({
            "field": detail
        }, status_code, self.code)