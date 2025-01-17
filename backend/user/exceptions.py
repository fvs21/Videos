from backend.exceptions import DefaultException


class FieldAlreadyInUse(DefaultException):
    code = "field_in_use"
    def __init__(self, detail=None, status_code=400):
        super().__init__({
            "field": detail
        }, status_code, self.code)