from backend.exceptions import DefaultException


class UnableToCreateProductException(DefaultException):
    code = "product_creation_failure"

    def __init__(self, detail=None, status_code=400):
        super().__init__(detail, status_code, self.code)