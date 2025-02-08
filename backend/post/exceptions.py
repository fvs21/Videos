from backend.exceptions import DefaultException


class PostNotFound(DefaultException):
    code: str = "post_not_found"

    def __init__(self, detail="Post not found"):
        super().__init__(detail, status_code=404, code=self.code)