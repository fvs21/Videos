from backend.exceptions import DefaultException


class UnableToCreateProductException(DefaultException):
    code = "product_creation_failure"

    def __init__(self, detail=None, status_code=400):
        super().__init__(detail, status_code, self.code)

class StoreDoestNotExist(DefaultException):
    code = "store_does_not_exist"

    def __init__(self, detail=None, status_code=404):
        super().__init__(detail, status_code, self.code)

class UnableToEditStore(DefaultException):
    code = "store_edit_failure"

    def __init__(self, detail=None, status_code=400):
        super().__init__(detail, status_code, self.code)